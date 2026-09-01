# Greenscape Pro — AI Agent Strategy
Prepared for the isthispossible.ai take-home project

## Summary

Lead volume is not Greenscape Pro's problem — Meta ROAS sits at 4–4.5x and the pipeline is full. The real money is leaking in three places: a slow, manual proposal process losing 35–40% of qualified leads to faster competitors; 1,400+ dormant closed-lost leads sitting untouched in GHL; and daily manual overhead (approvals, customer status updates) eating the founder's and office manager's time. The five agents below are ranked by where the leak is biggest and most defensible with the numbers we have, not by re-stating what Marcus said on the call.

---

## 1. Proposal Drafting & Turnaround Agent

**Purpose:** Draft a proposal automatically from site-walk notes and the pricing spreadsheet, so Marcus stops being the bottleneck on every single deal.

**What it does:**
- Ingests Marcus's site-walk notes (voice memo or text) and matches scope items to the pricing spreadsheet
- Auto-generates a draft proposal in the existing Google Doc template/format
- Flags any proposal over $30,000 for Carlos's 3D render step before it goes out
- Routes the draft to Marcus for a single approve/edit step (human-in-the-loop) before sending
- Logs turnaround time per proposal so the team can see the metric improve

**What it replaces:** Marcus personally pulling notes, plugging line items into a Google Doc, exporting to PDF, and sending — for every one of ~150+ proposals a year.

**Estimated ROI:** Proposal turnaround is currently 6–9 days after the site walk. In that window, 35–40% of qualified leads go to faster competitors. Cutting turnaround to 1–2 days should recover a meaningful share of those — conservatively, even 5 extra closes a year at the $28,000 average project value is $140,000+ in recovered revenue, against a $95,000/month payroll base.

**Why #1:** This lands on the same problem Marcus flagged as his top priority ("speed up quoting — it's killing us"), but the case for it isn't his framing — it's the fact that the proposal stage is the single largest, most precisely quantified leak in the entire funnel (35–40% loss rate, explicitly measured). This is the rare case where the founder's instinct and the data actually line up, so it stays #1 rather than getting deprioritized just to look independent.

---

## 2. Dormant Lead Reactivation Agent

**Purpose:** Mine the 1,400+ closed-lost leads sitting in GHL and run a systematic re-engagement sequence instead of the current sporadic manual attempts.

**What it does:**
- Segments the closed-lost list by lost reason, deal size, and time since last contact
- Runs a personalized SMS/email re-engagement sequence per segment
- Detects warm replies and routes them to Brittany for follow-up
- Tracks reactivation rate as an ongoing metric, not a one-time campaign

**What it replaces:** The current sporadic, manual re-engagement attempts on a 1,400-lead backlog that's otherwise just sitting dead in the CRM.

**Estimated ROI:** Even a conservative 2% reactivation rate against the $28,000 average project value is roughly $780,000 in recoverable pipeline value sitting untouched today.

**Why #2:** This is the pain point nobody surfaced on the discovery call — Marcus's stated priorities are all about the live pipeline, not the graveyard of past leads. It's also a case where sequencing matters: this should ship after #1, not before, or reactivated leads just pile up against the same slow proposal bottleneck and the win doesn't stick.

---

## 3. Customer Project-Status Update Agent

**Purpose:** Keep customers informed automatically during the 2–6 week build, instead of relying on inconsistent manual updates.

**What it does:**
- Pulls CompanyCam photos and Jobber daily check-ins per active job
- Sends scheduled customer-facing status updates (SMS/email) at set intervals
- Escalates to a human when a job goes quiet longer than the normal cadence
- Gives Jenna a dashboard view instead of fielding "what's happening" calls cold

**What it replaces:** The current mix of CompanyCam auto-pings, occasional crew-lead texts, and Marcus's personal Loom updates (which only happen on ~30% of jobs) — a gap that reportedly generates a customer call to Jenna asking for a status update on a near-daily basis.

**Estimated ROI:** Recovers a real slice of Jenna's daily time currently spent fielding status calls, and protects the premium, "photographs well" brand positioning that the whole business is built on — inconsistent communication is a disproportionate risk for a company that doesn't compete on price.

**Why #3:** Real, recurring, and measurable in time saved — but smaller in dollar terms than #1 and #2, which each touch closed/lost revenue directly rather than service quality.

---

## 4. Internal Approvals Triage Agent

**Purpose:** Let Marcus stop being a human rubber stamp for every small internal decision.

**What it does:**
- Screens routine change-orders, refunds, and add-on pricing requests against pre-set thresholds
- Auto-approves anything within guardrails
- Escalates only genuine exceptions to Marcus, with context attached
- Logs every decision for a lightweight audit trail

**What it replaces:** The 5–10 daily Slack pings Jenna sends Marcus for small approvals — one of the three tasks Marcus explicitly said he'd fire himself from.

**Estimated ROI:** Harder to quantify in dollars directly, but this is pure founder-time recovery — time that's currently being spent on approvals under a few hundred dollars instead of sales, proposals, or strategy.

**Why #4:** High founder-relief value, low revenue-recovery value — it makes Marcus's day better but doesn't move the top-line numbers the way #1–#3 do.

---

## 5. Crew Coaching & Upsell Detection Agent

**Purpose:** Catch missed upsells and unbilled add-on work by reviewing field data crews generate anyway.

**What it does:**
- Reviews Jobber check-ins and CompanyCam photo notes for signs of extra scope (unbilled add-ons, upsell opportunities)
- Flags candidates to Marcus for review, not automatic billing
- Optionally surfaces coaching notes for crew leads over time

**What it replaces:** Nothing formal exists today — this is closing a gap, not automating an existing task.

**Estimated ROI:** Real, but the least quantifiable of the five — depends heavily on how much revenue is actually being left on the table, which isn't measured anywhere in the current data.

**Why #5, not higher:** Marcus named this as his #3 stated priority, but it's the most execution-risky of the five — it requires judgment calls on messy, unstructured field data, and there's no baseline number to size the opportunity against. It stays in the top 5 because the underlying problem (crews doing free work) is real, but it ranks last because it's the least defensible on evidence.

---

## What I Cut: Marketing & Content Agent

Marcus's stated #4 priority ("we should be posting daily, we don't") didn't make the top 5. The client data says explicitly that lead volume is not the problem — Meta ROAS is already sitting at 4–4.5x and paid spend is generating plenty of pipeline. Pouring more content into a funnel that's already losing 35–40% of leads at the proposal stage doesn't recover revenue — it just grows the leak. This is worth revisiting once #1 and #2 are live and the funnel is actually converting what it already has.

## Why #1 Isn't Just the Founder's Framing

Marcus said "speed up quoting" was killing him, and the #1 agent here happens to match that. But the reasoning isn't "the founder said so" — it's that the proposal stage is the one part of the funnel with a precisely measured loss rate (35–40%) tied directly to turnaround time (6–9 days). Everything else on Marcus's list (coaching, marketing) is a hunch without a number behind it. This is a case where independent analysis and founder instinct converge, which is worth stating plainly rather than manufacturing disagreement for its own sake.
