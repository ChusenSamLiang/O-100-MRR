# Next Steps

Three things were asked for: research the setups, research a rubric, and outline
how to get to a simple app. The research is in `docs/research/`. This is the
outline.

## The core strategic call

**Don't build the app yet. Build the corpus first.**

The app is a directory of scored setups. A directory with three entries is a
worse product than a Notion page, and the rubric is uncalibrated (v0.1, §6 of the
rubric doc) — anything built on it now would need reworking after the anchors get
fixed. Meanwhile the content works with zero entries: the first episode is you
scoring a setup you heard about at a party.

So the sequence is **content → corpus → app**, and each stage funds the next. The
markdown files in `docs/setups/` are deliberately schema-shaped
(`data/setup.schema.json`) so they become the app's seed data without a migration.

Given the repo is named O-100-MRR: the thing people will pay for is almost
certainly *"score my setup"* — an assessment, not a directory. The directory is
the marketing. Structure accordingly.

## Phase 0 — Calibrate the rubric (this week, ~4 hours)

Nothing else is worth doing until the rubric holds still.

- [ ] Fill in your own entry from the intake in `docs/setups/sam-pm-ai-healthcare.md`
- [ ] Ask your friend the one question: *can I see your context files?* It moves
      that entry from 60 to ~75 and validates the whole thesis
- [ ] Score 5 setups total — yours, your friend's, and one each from three
      archetypes in `00-landscape.md`
- [ ] Re-score all 5 a week later, blind. Rewrite any anchor that drifts 2+ levels
- [ ] Cut Access Surface to weight 5 if pilot scores cluster at L4 there
- [ ] Tag the result `rubric v1.0` and never change a published version in place

**Exit criteria:** 5 scored entries, self-consistency within 1 level, v1.0 tagged.

## Phase 1 — Content machine (weeks 1–4)

Prove the format is watchable before building software to serve it.

**The repeatable episode structure** — the research on "rate my setup" formats
says the durable pattern is: score → one specific compliment → one actionable
improvement → an engagement prompt. Adapted:

1. **Hook (0–3s)** — the score, stated flat. *"The most impressive AI setup I saw
   this month scores a 60."*
2. **The setup (3–20s)** — what they actually run, one layer at a time
3. **The split (20–40s)** — Context / Flexibility / Scalability. The gap between
   the last two is where every story lives
4. **The fix (40–55s)** — the one change that moves the score most
5. **The ask** — *"score yours"* / *"what would you rate mine?"*

**Recurring formats that write themselves:**

| Format | Why it works |
|---|---|
| *"This setup scores 91 on flexibility and 34 on scalability"* | The two-number split creates built-in tension |
| *"They failed the Context Gate"* | A hard cap is inherently dramatic; teaches the thesis |
| *"Everyone forgets dimension 7"* | Governance, your credential, nobody else's angle |
| *"I scored my own setup and got a 64"* | Credibility. Post this early |
| Quadrant chart: score vs. upkeep | One visual, infinite episodes, very screenshot-able |

**Success metric before Phase 2:** 3+ inbound "score mine" requests. If nobody
asks to be scored, the app has no users and the plan changes rather than
proceeds.

> Note: you have a `tiktok-image-post` skill in this workspace for carousel/photo
> copy — worth running the rubric explainer through it as a slideshow, since the
> 7 dimensions map cleanly to 7 slides.

## Phase 2 — The app (weeks 4–8)

**Scope it to exactly two things** and resist the rest:

1. **A public directory** — browse scored setups, filter by archetype/role/tool,
   compare two side by side
2. **A self-assessment** — 7 questions, get your three numbers and a shareable
   result card

The share card *is* the growth loop. It has to be worth posting: score, the
Context/Flexibility/Scalability split, archetype label, quadrant position.

**Stack** — Next.js on Vercel + Supabase. Both are already wired into this
workspace as MCP servers, which removes the setup tax, and the read-heavy
directory is a natural fit for Postgres + row-level security on submissions.

**Build order:**
- [ ] Seed from markdown — a script that parses `docs/setups/*.md` frontmatter
      against `setup.schema.json` into Supabase. Markdown stays the source of
      truth; the DB is a read model
- [ ] Directory index + detail pages (static, fast, SEO-shaped — the long tail is
      "<tool> AI setup")
- [ ] Scoring engine as one pure function: `scores → {total, flexibility,
      scalability, gate_applied, quadrant}`. One implementation, shared by app,
      seed script, and any future API
- [ ] Self-assessment flow: 7 questions, one per dimension, each offering the L0–L4
      anchors verbatim as choices. The anchors *are* the UI — no new copy needed
- [ ] Share card generation (OG image with the three numbers)
- [ ] Submission form → moderation queue. Never auto-publish; the evidence rule is
      the product's integrity and it can't be enforced by strangers

**Deliberately out of scope for v1:** accounts, comments, upvotes, tool
affiliate links, an API, anything that watches your actual setup.

## Phase 3 — Monetization hypotheses (week 8+)

Ranked by how well they fit what you'd have built:

1. **Setup Teardown** — paid 1:1 scoring with a written report and a fix list.
   Highest margin, zero build cost, validates demand before anything is
   automated. Your healthcare-governance angle prices this above a generic
   consultant.
2. **Team edition** — score a team's setup, not a person's. Governance and
   portability are procurement questions, and companies have budget where
   individuals don't. This is where MRR actually is.
3. **Templates** — the context-file scaffolds behind high-scoring setups, sold as
   a pack. Natural upsell from a low self-assessment score.
4. Sponsorship — real but slow, and it compromises the rubric's neutrality.
   Deliberately last.

## Open questions for you

1. **Is the product the directory or the assessment?** Everything above assumes
   the directory is marketing and the assessment is product. If you think the
   directory itself is the business, Phase 2's build order changes.
2. **Are you scoring named people or anonymized setups?** Named is far better
   content and much harder to source, since a public 60/100 with their name on it
   is a real ask. Anonymized is easier but weaker.
3. **How exposed do you want your employer to be?** The healthcare-governance
   angle is your best differentiator and also the one with professional risk.
   Worth deciding the line now rather than mid-episode.

## Immediate next actions

1. Answer the intake in `docs/setups/sam-pm-ai-healthcare.md`
2. Text your friend and ask to see his context files
3. Score three more setups from the archetype list
4. Film the "the best setup I saw scores a 60" episode — the worked example in
   `01-flex7-rubric.md` §5 is the script
