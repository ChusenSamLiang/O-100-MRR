# FLEX-7: A Scoring Rubric for Personal AI Setups

**Version 0.1 — draft, not yet calibrated. See "Before you publish scores."**

Scores a personal AI setup out of 100 across 7 weighted dimensions, and derives
two headline indices: **Flexibility** and **Scalability**.

---

## 1. Design decisions (and why)

The rubric research is unanimous on a few points, and each one shaped a choice
here:

| Finding | Source | What we did |
|---|---|---|
| Analytic rubrics (score each criterion separately, then sum) beat holistic ones for diagnosis and comparison | [DePaul](https://resources.depaul.edu/teaching-commons/teaching-guides/feedback-grading/rubrics/Pages/types-of-rubrics.aspx), [Syracuse](https://effectiveness.syr.edu/assessment/assessment-resources/rubric-library/types-of-rubrics/) | 7 independently-scored dimensions, summed — never one gut "8/10" |
| Weight criteria by relative importance | [Smowl](https://smowl.net/en/blog/assessment-rubrics/) | Weights sum to 100; Context carries the most |
| Vague modifiers ("adequate", "somewhat", "limited") destroy inter-rater reliability unless you name what's missing | [ericae.net](https://ericae.net/rubrics-and-inter-rater-reliability-explained/) | Every anchor names a concrete artifact or observable behavior |
| Write the *proficient* anchor first, then describe one level up and one down | [UCD](https://www.ucd.ie/teaching/t4media/designing_feedback_rubrics.pdf) | L2 was written first for each dimension |
| Anchor points need **explicit evidentiary requirements**, not just descriptors | [AITG framework](https://arxiv.org/pdf/2603.13278) | Each dimension has an "Evidence required" line; unevidenced claims cap at L2 |
| An entity can be L3 in one dimension and L1 in another — assess independently | [Databricks](https://www.databricks.com/blog/ai-governance-maturity-model) | No dimension may be inferred from another; the profile shape *is* the finding |
| Pilot on real samples, revise ambiguous wording, train scorers before operational use | [UIC](https://teaching.uic.edu/cate-teaching-guides/assessment-grading-practices/rubrics/) | See calibration protocol, §6 |

Two additions that the education-rubric literature doesn't cover, taken from
maturity-model practice:

- **Cost/effort is not a scoring dimension.** A setup that scores 95 and eats 20
  hours a week of upkeep is a worse setup than an 80 that runs itself. Upkeep is
  reported *alongside* the score as a second axis, never folded into it.
- **Context gates the total.** Your own takeaway — everything comes back to
  context — is encoded as a hard cap, not just a heavy weight. See §4.

## 2. The seven dimensions

Weights sum to 100. Each dimension is scored 0–4, contributing
`(level / 4) × weight` points.

| # | Dimension | Weight | The question it answers |
|---|---|---|---|
| 1 | **Context Depth** | 20 | Does the system know the who/what/where/when/why/how? |
| 2 | **Portability** | 15 | What breaks if your main vendor doubles its price tomorrow? |
| 3 | **Interoperability** | 15 | Do the pieces connect, or are they islands you bridge by hand? |
| 4 | **Automation Leverage** | 15 | How much runs without you in the chair? |
| 5 | **Access Surface** | 10 | From how many places can you start work? |
| 6 | **Reliability & Evaluation** | 15 | Would you know if it silently got worse? |
| 7 | **Governance & Cost Control** | 10 | Would this survive contact with an auditor or a bad invoice? |

### Level scale (applies to all dimensions)

| L | Name | Meaning |
|---|---|---|
| 0 | **Absent** | Not present. Not considered. |
| 1 | **Ad hoc** | Exists in the person's head or in one-off chat messages. Not written down. |
| 2 | **Repeatable** | Written down, reused deliberately. Manual to operate. *(proficient baseline)* |
| 3 | **Systematized** | Structured, versioned, layered. Survives handoff to someone else. |
| 4 | **Compounding** | Improves itself with use — feedback loops, self-updating artifacts, gets better without effort. |

---

## 3. Anchors

### 1. Context Depth — weight 20
*Does the system know the who/what/where/when/why/how?*

- **L0** — No persistent context. Every session re-explains from scratch.
- **L1** — Context exists but lives in the person: pasted into chats ad hoc, no file.
- **L2** — One committed context file (`CLAUDE.md` / `AGENTS.md` / a system prompt doc) covering role, project, and constraints. Reused, not rewritten.
- **L3** — **Layered** context with clear separation of scope: global vs. project vs. personal/uncommitted (`CLAUDE.local.md` pattern). Includes goals, constraints, and background — not just tool instructions. Versioned in git. A stranger could read it and understand the work.
- **L4** — Context is maintained by the system itself: decisions and PRDs flow back into the files, stale entries get pruned, repeated work has graduated into named skills or commands. The context improves as a byproduct of working.

> **Evidence required:** the actual files, or a directory listing. "I have good
> context" is L1 until a file is shown.

### 2. Portability — weight 15
*What breaks if your main vendor doubles its price tomorrow?*

- **L0** — Single vendor, single account, no alternative configured.
- **L1** — Accounts with several providers, but the workflow only actually runs on one.
- **L2** — Can manually switch providers; switching costs an afternoon of reconfiguration.
- **L3** — A routing layer abstracts the model choice (OpenRouter, Claude Code Router, or equivalent). Swapping a model is a config edit. Context files are in portable formats (markdown, not a proprietary DB).
- **L4** — Routing is *task-aware*: throwaway work (summarizing, naming, compaction) goes to cheap models, reasoning to frontier models, automatically. A provider outage degrades quality without stopping work.

> **Evidence required:** the router config, or a described fallback that has
> actually been exercised. Holding five API keys is L1, not L3.

### 3. Interoperability — weight 15
*Do the pieces connect, or are they islands you bridge by hand?*

- **L0** — Isolated tools. Every handoff is copy-paste.
- **L1** — Two tools connected by a manual export/import ritual.
- **L2** — Core tools share a common format (markdown files, a git repo) so output moves without transformation.
- **L3** — Real connective tissue: MCP servers, APIs, or an automation layer (n8n, Zapier) so outputs land where they're needed. Standard formats over proprietary ones (`AGENTS.md` over tool-specific config).
- **L4** — Any component can be replaced without touching the others. New tools plug in via existing interfaces rather than requiring new glue.

> **Evidence required:** name the connections. A list of tools owned is not
> interoperability.

### 4. Automation Leverage — weight 15
*How much runs without you in the chair?*

- **L0** — Every action is a manual prompt.
- **L1** — Saved prompts and templates. Still hand-fired every time.
- **L2** — Named reusable units: slash commands, saved workflows, skills. Fired by hand, but one invocation does many steps.
- **L3** — Unattended execution: scheduled triggers, cron, hooks, or event-driven runs. Work happens while you sleep. Human review is at a deliberate gate, not on every step.
- **L4** — Multi-step delegation with judgment placed correctly — subagents handle labor, the main loop reviews. New automations are cheap to add because the pattern is established.

> **Evidence required:** at least one thing that ran without the person
> initiating it, in the last 7 days.

### 5. Access Surface — weight 10
*From how many places can you start work?*

- **L0** — One device, one app.
- **L1** — Same tool on desktop and mobile, used mostly on desktop.
- **L2** — Two or more genuine entry points used regularly (e.g. terminal + phone).
- **L3** — Hands-free or ambient capture is real: voice input works across apps, so ideas get captured at the moment they occur rather than being lost. Work can be initiated away from the desk.
- **L4** — The setup is available wherever the person is — voice, mobile, chat surfaces, scheduled — and the surface doesn't change the quality of the result. Multitasking through a headset is a normal Tuesday.

> **Evidence required:** describe a task actually completed away from the
> primary machine.

### 6. Reliability & Evaluation — weight 15
*Would you know if it silently got worse?*

- **L0** — No idea whether output quality has changed. Never checked.
- **L1** — Notices problems only when something visibly breaks or a result is obviously wrong.
- **L2** — A deliberate review habit: a defined human checkpoint before output ships. Known failure modes are written down somewhere.
- **L3** — Automated checks in the loop — tests, linters, verification steps, or a second model reviewing the first. Failures are caught before a human sees them. There's a rollback path (git, checkpoints).
- **L4** — Actual evals: a saved set of representative tasks re-run when the setup changes, with results compared. Model or prompt swaps are decided on evidence rather than vibes.

> **Evidence required:** name the check. "I read the output carefully" is L2.
> This is the single most commonly overstated dimension — see §5.

### 7. Governance & Cost Control — weight 10
*Would this survive contact with an auditor or a bad invoice?*

- **L0** — Keys in plaintext or pasted in chats. No idea what it costs. No thought given to what data goes where.
- **L1** — Aware of the risks, handles them by memory and caution.
- **L2** — Secrets kept out of committed files (`.local` / `.env` / a manager). A rough sense of monthly spend. An informal rule about what never gets pasted into a model.
- **L3** — Explicit data boundaries: which providers may see which classes of data, written down and enforced by setup (local models or redaction for sensitive classes). Spend is monitored with a ceiling or alert. Secrets are in a manager, rotatable.
- **L4** — Auditable: logs of what ran, on what data, through which provider. Sensitive-data handling is enforced by the harness rather than by the operator remembering. Cost is attributed per workflow, so expensive automations are visible.

> **Evidence required:** name the boundary and where it's enforced.
> **Note for regulated fields (health, finance, legal):** L0–L1 here is not a low
> score, it's a liability. Flag it in review rather than just scoring it.

---

## 4. Computing the score

```
raw = Σ (level_i / 4) × weight_i           → 0–100

FLEX-7 SCORE = raw, subject to the Context Gate
```

**The Context Gate.** If Context Depth ≤ 1, the total is capped at **60**,
regardless of the rest.

Rationale, and the thesis of the whole project: portability, automation, and
voice control applied to a system that doesn't know your goals, constraints, and
background just gets you to the wrong answer faster and in more places. A setup
without context isn't a system, it's a collection of subscriptions. The cap makes
that argument visible in the number instead of leaving it in the commentary.

### Derived indices (the two headline numbers)

```
Flexibility  = (Portability + Interoperability + Access Surface)      / 40 × 100
Scalability  = (Automation + Reliability + Governance)                / 40 × 100
```

Both 0–100. Context Depth sits under both as the foundation and is reported on
its own. This gives every setup a three-number fingerprint —
**Context / Flexibility / Scalability** — which is far more interesting than a
single score and much better content.

### The second axis: upkeep (never folded into the score)

Reported alongside, not inside:

- **Maintenance Load** — hours per week to keep it running. `Low <1h` / `Medium 1–3h` / `High >3h`
- **Time to Value** — how long before a new user of this setup gets a real result. `Same day` / `A week` / `A month+`
- **Monthly Cost** — actual spend.

Plot score against maintenance load and you get four quadrants that name
themselves — and are a very good recurring visual:

| | Low upkeep | High upkeep |
|---|---|---|
| **High score** | **Compounding** — the goal | **Hand-fed** — impressive, exhausting |
| **Low score** | **Lean** — honest, fine | **Fragile** — cost without benefit |

## 5. Worked example: the router setup

Scoring your friend's setup as described — multiple provider tokens, a routing
harness across models and services, Wispr Flow connected everywhere for
phone/headset operation. Applying the evidence rules strictly, including for the
things we don't know.

| Dimension | L | Reasoning | Points |
|---|---|---|---|
| Context Depth | 2 | *Inferred, not verified.* You suspected the context files were the real asset — but that was your read, not something demonstrated. Unevidenced claims cap at L2. **This is the number to go verify.** | 10.0 |
| Portability | 4 | Multiple providers behind a router, explicitly designed not to depend on one model. Textbook L4. | 15.0 |
| Interoperability | 3 | Harness routes across both models *and* services; voice layer reaches every app. | 11.25 |
| Automation Leverage | 2 | Everything described is human-initiated — impressive invocation, no evidence of unattended runs. | 7.5 |
| Access Surface | 4 | Phone + headset, multitasking away from the desk. The strongest dimension. | 10.0 |
| Reliability & Eval | 1 | No mention of how he knows the router picked well, or what happens when a provider degrades. | 3.75 |
| Governance & Cost | 1 | "A handful of API tokens from various models" is key sprawl, and multi-provider routing multiplies the number of places data lands. Cost visibility across providers is the classic gap. | 2.5 |

**FLEX-7 Score: 60 / 100** — Context Gate not triggered (Context = 2).

- **Context 50 · Flexibility 91 · Scalability 34**

That split is the story. This is a genuinely excellent *front end* — near-perfect
on the axes that govern how freely you can move — sitting on top of an unproven
back end. Nobody is checking whether the routing decisions are any good, and
nobody is watching where the data or the money goes.

And it makes the honest point that will make the content land: **the most
impressive setup you heard about all weekend scores a 60.** Not because it's bad
— because "impressive" and "durable" are different axes, and only one of them
gets filmed. If the context files are as good as you suspect, verifying that one
dimension moves it to 75. That's the episode.

## 6. Before you publish scores

The literature is blunt that an uncalibrated rubric produces disagreement, and
disagreement in public is a credibility problem. Minimum viable calibration:

1. **Score 5 real setups yourself**, including your own and one from each
   archetype in `00-landscape.md`.
2. **Re-score the same 5 a week later without looking at the first scores.**
   Anywhere you drift by 2+ levels, the anchor wording is ambiguous — rewrite it.
   This is a self-consistency check standing in for inter-rater reliability while
   you're a solo rater.
3. **Have one other person score two of them.** Disagreements of 2+ levels are
   rubric bugs, not opinion.
4. **Publish v1.0 only after that pass.** Keep it versioned — scores must say
   which rubric version produced them, or the directory becomes incomparable over
   time.

Known weaknesses to watch in the pilot:

- Reliability & Evaluation will be over-claimed. Hold the line on "name the check."
- Access Surface may be over-weighted for content reasons — it's the most
  *filmable* dimension and the least consequential. If pilot scores cluster high
  there, cut it to 5 and move the weight to Reliability.
- Level 4 across the board should be rare. If more than ~1 in 10 setups hit 4 on
  a dimension, the L4 anchor is too generous.

## Sources

- [Types of Rubrics — DePaul Teaching Commons](https://resources.depaul.edu/teaching-commons/teaching-guides/feedback-grading/rubrics/Pages/types-of-rubrics.aspx)
- [Analytic Rubrics — Syracuse](https://effectiveness.syr.edu/assessment/assessment-resources/rubric-library/types-of-rubrics/)
- [Rubrics and Inter-Rater Reliability Explained](https://ericae.net/rubrics-and-inter-rater-reliability-explained/)
- [Designing Grading & Feedback Rubrics — UCD](https://www.ucd.ie/teaching/t4media/designing_feedback_rubrics.pdf)
- [Assessment rubrics and weighting — Smowl](https://smowl.net/en/blog/assessment-rubrics/)
- [Rubrics — UIC Center for Advancement of Teaching Excellence](https://teaching.uic.edu/cate-teaching-guides/assessment-grading-practices/rubrics/)
- [Appropriate Criteria: Key to Effective Rubrics — Frontiers in Education](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2018.00022/full)
- [The AI Transformation Gap Index (AITG) — arXiv](https://arxiv.org/pdf/2603.13278) — anchor points at 1/3/5/7/9 with explicit evidentiary requirements
- [AI Governance Maturity Model — Databricks](https://www.databricks.com/blog/ai-governance-maturity-model) — independent per-dimension assessment
- [The AI Maturity Model: 6 Dimensions, 5 Levels](https://dancumberlandlabs.com/blog/ai-maturity-model/)
- [Scaling evaluation with rubrics and calibration — Label Studio](https://labelstud.io/blog/how-to-scale-evaluation-for-rag-and-agent-workflows/)
