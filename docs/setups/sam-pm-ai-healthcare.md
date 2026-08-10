---
slug: sam-pm-ai-healthcare
name: "Sam"
role: "Product Manager"
industry: "AI Healthcare"
archetype: "Org Layer"
rubric_version: "0.1"
scored_on: "2026-08-10"
scored_by: "self"
status: "partial — Q12-19 outstanding"
scores:
  context_depth: 3
  portability: 0
  interoperability: 2       # PROVISIONAL — pending Q12
  automation: 2
  access_surface: 1
  reliability: null         # pending Q13-14
  governance: null          # pending Q15-17
upkeep:
  maintenance_load: ""      # pending Q18
  time_to_value: ""         # pending Q19
  monthly_cost_usd: null
source: "self"
consent: "public"
---

# Sam — PM, AI Healthcare

## The one-line version
> Org-grade context — OKRs, strategy, product docs, and a coaching layer, scoped
> global-plus-squad — running single-vendor on a single laptop.

## Layer 1 — Context
The strongest layer by a distance, and unusual in that it isn't personal context
at all — it's organizational.

Contents: OKRs, company strategy, product and service descriptions, plus a
**coaching arm** that helps the team evaluate ideas and coach each other. That
last part is rarer than it sounds: most context files carry *facts*, this one
also carries *method*.

Structure: a global directory applied across all teams, plus team-specific
directories per product squad. Real scope separation, not one flat file.

Strategy docs, PRDs, and product data all feed the system rather than being
pasted per session.

Gap: all maintenance is manual. Stated goal is to automate it.

## Layer 2 — Models
100% Claude. No second provider configured.

Model selection within Claude is left to the end user — no default, no
recommendation. Worth noting this is *delegation*, not routing: nothing decides
based on task type, so two squads running the same workflow can get different
quality and there's no way to attribute a bad output to a model choice.

Continuity plan for a primary-provider outage: none. ("Wait for Claude to come
back on.")

## Layer 3 — Harness
Entirely the Claude ecosystem — Claude Code, Claude Design. 30–40% of non-meeting
time, likely more.

Custom work: a substantial library of **skills** for specific report automations
and research. No subagent setup yet.

## Layer 4 — Surface
Mainly laptop. No voice in use, though it's available in the Claude app
interface — capability present, unadopted.

## Layer 5 — Memory & Output
*Pending Q12.*

## Score — PARTIAL

**4.5 of 7 dimensions evidenced. Reliability and Governance outstanding.**

| Dimension | L | Pts | Evidence |
|---|---|---|---|
| Context Depth | 3 | 15.0 | Layered global + per-squad directories; strategy/OKR/product docs feed in; includes method not just facts. Not L4 — no self-maintenance, updates are manual. |
| Portability | 0 | 0.0 | Single vendor, single account, no alternative configured, no exercised fallback. Textbook L0 anchor. |
| Interoperability | 2* | 7.5 | Common format across a coherent ecosystem; docs move without transformation. No MCP/API/automation bridge to outside tools evidenced. **Provisional pending Q12.** |
| Automation Leverage | 2 | 7.5 | A real library of skills — named reusable units where one invocation does many steps. All hand-fired; no triggers, cron, or hooks; no subagents. |
| Access Surface | 1 | 2.5 | Laptop-primary. Voice available but unused. Capability ≠ adoption. |
| Reliability & Evaluation | — | — | Pending Q13–14 |
| Governance & Cost Control | — | — | Pending Q15–17 |

**Running total: 32.5 of 75 points available so far.**

- **Context 75** · **Flexibility 25** · **Scalability TBD**

### The ceiling

The 25 remaining points sit in Reliability (15) and Governance (10). Even at a
perfect L4 on both, the final score lands at **57.5**.

So the outcome is already determined in one respect: **this setup cannot break
60.** Not because the context is weak — the context is the best thing in the
directory so far — but because a zero on Portability and a one on Access Surface
are unrecoverable from anywhere else. The Context Gate never even comes into
play.

### The mirror

Set against the router setup scored at 60:

| | Friend | Sam |
|---|---|---|
| Context | 50 | **75** |
| Flexibility | **91** | 25 |
| Scalability | 34 | TBD |

Near-perfect photo negatives. He built excellent plumbing and it's unclear
whether anything good flows through it. This setup has the best content in the
directory, reachable from one machine, through one vendor, with no fallback.

## The best idea in here
The **coaching arm** — context that teaches the team how to evaluate ideas, not
just what the company sells. Almost nobody encodes method. It's also the piece
that generalizes: it would keep working after a vendor swap.

Runner-up: global + per-squad scoping. That's the L3 context anchor implemented
at organizational scale, which is a harder problem than the personal version most
setups solve.

## The weakest link
**Concentration risk.** Not personal inconvenience — a business continuity gap.
An org-wide system serving multiple product squads, at an AI healthcare company,
with no configured alternative and no exercised fallback. A provider outage or a
price change stops several teams, not one person.

The cheapest fix in the whole directory is here: the context is already in
portable markdown, so an exercised fallback is a config change and an afternoon,
and it moves Portability from 0 to 2–3. That's up to 11 points — more than any
other single change available.

## Open items
Q12 (outputs), Q13–14 (reliability), Q15–17 (governance), Q18–19 (upkeep).

Q15 is the one to answer carefully. PHI/PII rules at an AI healthcare company are
both the highest-stakes item on the list and the credential this whole project
rests on.

## Safety note
Before publishing, strip anything that reveals employer internal tooling, vendor
relationships, or data-handling specifics beyond what's already public. "I keep
PHI out of consumer models" is fine. Naming an approved-vendor list is not.
