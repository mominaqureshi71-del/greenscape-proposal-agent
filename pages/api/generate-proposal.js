import Anthropic from "@anthropic-ai/sdk";
import { getServiceClient } from "../../lib/supabaseClient";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const RENDER_THRESHOLD = 30000; // matches the brief: $30k+ proposals get flagged for a 3D render

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { clientName, projectAddress, siteWalkNotes, pricingItems } = req.body;

  if (!clientName || !siteWalkNotes) {
    return res
      .status(400)
      .json({ error: "clientName and siteWalkNotes are required" });
  }

  try {
    // 1. Ask Claude to draft the proposal from the notes + pricing sheet
    const pricingText = (pricingItems || [])
      .map((item) => `- ${item.name}: $${item.price}`)
      .join("\n");

    const prompt = `You are drafting a landscaping/hardscape project proposal for Greenscape Pro, a premium design-build company in Phoenix, AZ.

Client: ${clientName}
Project address: ${projectAddress || "N/A"}

Site walk notes:
${siteWalkNotes}

Available pricing sheet items (use these, don't invent new prices):
${pricingText || "No structured pricing items provided - estimate reasonably based on the notes and flag that pricing needs manual review."}

Write a clear, professional proposal draft with:
1. A short project summary (2-3 sentences)
2. An itemized scope of work with line-item pricing
3. A total estimate
4. Standard next steps / timeline language

Keep the tone premium but approachable, matching a design-build company that competes on quality, not price. Output plain text, ready to drop into a document template.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const draftContent = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    // 2. Try to pull a total estimate out of the pricing items (simple sum;
    // falls back to 0 if none were provided - Marcus can adjust in his review)
    const totalEstimate = (pricingItems || []).reduce(
      (sum, item) => sum + (Number(item.price) || 0),
      0
    );
    const needsRender = totalEstimate >= RENDER_THRESHOLD;

    // 3. Save to Supabase
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from("proposals")
      .insert({
        client_name: clientName,
        project_address: projectAddress,
        site_walk_notes: siteWalkNotes,
        scope_items: pricingItems || [],
        draft_content: draftContent,
        total_estimate: totalEstimate,
        needs_render: needsRender,
        status: "pending_approval",
      })
      .select()
      .single();

    if (error) throw error;

    // 4. Ping Slack for Marcus's approval
    if (process.env.SLACK_WEBHOOK_URL) {
      const renderNote = needsRender
        ? "\n:warning: Over $30k - flag for Carlos's 3D render step before sending."
        : "";
      await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `*New proposal draft ready for review*\nClient: ${clientName}\nEstimate: $${totalEstimate.toLocaleString()}${renderNote}\nProposal ID: ${data.id}`,
        }),
      });
    }

    return res.status(200).json({ proposal: data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Something went wrong" });
  }
}
