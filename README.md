# Greenscape Pro — Proposal Drafting Agent

Drafts a proposal from site-walk notes and a pricing sheet, saves it to a database, and pings Slack for approval before it goes to the client.

## Why this agent

Greenscape Pro's proposal turnaround is currently 6-9 days after a site walk, and 35-40% of qualified leads are lost to faster competitors in that window. This agent cuts the draft step from hours of manual writing down to seconds, with a human (Marcus) still approving every proposal before it's sent.

## Stack

- **Frontend/Backend:** Next.js (Pages Router), deployed on Vercel
- **Database:** Supabase (Postgres)
- **LLM:** Claude (Anthropic API) — drafts the proposal text from notes + pricing
- **Integration:** Slack incoming webhook — pings a channel for approval whenever a draft is ready

## How it works

1. User enters client info, site-walk notes, and pricing line items
2. `/api/generate-proposal` sends the notes + pricing to Claude, which drafts the proposal
3. The draft is saved to the `proposals` table in Supabase
4. If the total is $30k+, it's flagged (matching Greenscape's rule that anything over $30k gets Carlos's 3D render step first)
5. A Slack message is sent to the team's channel with the client name, estimate, and a link to the draft
6. Marcus reviews and edits before sending to the client

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill in your keys:
   - Supabase Project URL + publishable key + secret key (Project Settings -> API Keys)
   - Anthropic API key (console.anthropic.com -> API Keys)
   - Slack incoming webhook URL
3. In the Supabase dashboard, open the SQL Editor and run `supabase-schema.sql` to create the `proposals` table
4. `npm run dev` and open http://localhost:3000

## Deploying

1. Push this repo to GitHub
2. Import it in Vercel (vercel.com -> Add New Project)
3. Add the same environment variables from `.env.local` into Vercel's project settings
4. Deploy

## What I'd build next with more time

- Pull site-walk notes directly from a voice memo (Whisper transcription) instead of typed text
- Auto-generate the actual PDF/branded document, not just plain text
- Track proposal turnaround time automatically to measure the agent's real impact
- Two-way Slack integration: let Marcus approve/edit directly from Slack instead of switching to the app
