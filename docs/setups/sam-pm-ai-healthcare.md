---
slug: sam-pm-ai-healthcare
name: "Sam"
role: "Product Manager"
industry: "AI Healthcare"
archetype: "Org Layer"
rubric_version: "0.1"
scored_on: "2026-08-10"
scored_by: "self"
status: "scored — Q18-19 (upkeep) outstanding"
scores:
  context_depth: 3
  portability: 0
  interoperability: 1
  automation: 2
  access_surface: 1
  reliability: 1
  governance: 2
upkeep:
  maintenance_load: ""      # pending Q18
  time_to_value: ""         # pending Q19
  monthly_cost_usd: null    # unknown to the operator — see Governance
source: "self"
consent: "public"
---

# Sam — PM, AI Healthcare

**FLEX-7 37.5 / 100** · Context **75** · Flexibility **16** · Scalability **41**

## The one-line version
> The best context in the directory, reachable from one laptop, through one
> vendor, with nowhere for the output to land.

## Layer 1 — Context — L3
The strongest layer by a distance, and unusual in that it isn't personal context
at all — it's organizational.

Contents: OKRs, company strategy, product and service descriptions, plus a
**coaching arm** that helps the team evaluate ideas and coach each other. That
last part is rarer than it sounds: most context files carry *facts*, this one
also carries *method*.

Structure: a global directory applied across all teams, plus team-specific
directories per product squad. Real scope separation, not one flat file.
Strategy docs, PRDs, and product data feed the system rather than being pasted
per session.

Gap: all maintenance is manual. Stated goal is to automate it. That single gap
is what holds it at L3 instead of L4.

## Layer 2 — Models — L0
100% Claude, company seat, no second provider configured. No continuity plan for
an outage.

Model selection within Claude is left to the end user — no default, no
recommendation. This is *delegation*, not routing: nothing decides based on task
type, so two squads running the same workflow can get different quality and a bad
output can't be attributed to a model choice.

## Layer 3 — Harness — Automation L2
Entirely the Claude ecosystem — Claude Code, Claude Design. 30–40% of non-meeting
time, likely more. A substantial library of **skills** for report automation and
research: real reusable units where one invocation does many steps. All
hand-fired. No triggers, cron, hooks, or subagents.

## Layer 4 — Surface — L1
Laptop-primary. No voice in use, though it's available in the Claude app
interface. Capability present, unadopted.

## Layer 5 — Memory & Output — drags Interoperability to L1
Everything lives in the Claude app's conversation history, and previous
conversations are sometimes hard to find.

This is the layer that changed on the second round of answers. Input-side
connective tissue is genuinely L2-grade — structured directories feeding the
ecosystem natively. But the output side has no destination: results don't reach a
durable, searchable store, they stay in chat. Work product from a session is
effectively bridged by hand or not at all, which is the L1 anchor. Averaged
across a strong input side and an absent output side: **L1**.

The lost-conversation friction is not a UI complaint. It's the symptom of a
missing memory layer, and it's why nothing compounds — every session starts from
the same context and returns nothing to it.

## Score

| Dimension | L | Pts | Evidence |
|---|---|---|---|
| Context Depth | 3 | 15.0 | Layered global + per-squad directories; OKRs/strategy/product docs feed in; encodes method as well as facts. Not L4 — updates are manual. |
| Portability | 0 | 0.0 | Single vendor, single account, no alternative configured, no exercised fallback. |
| Interoperability | 1 | 3.75 | Structured input side; outputs stay in chat history and are hard to retrieve. No durable store, no MCP/API bridge outward. |
| Automation Leverage | 2 | 7.5 | Real skills library, one invocation → many steps. Entirely hand-fired; no unattended execution. |
| Access Surface | 1 | 2.5 | Laptop-primary; voice available but unused. |
| Reliability & Evaluation | 1 | 3.75 | No checkpoint catches a bad output before a colleague sees it ("not confident that exists"). Has compared Claude models informally — real quality attention, but a one-time act, not a saved eval set or a standing check. |
| Governance & Cost Control | 2 | 5.0 | See below. |

**Total: 37.5 / 100**

### Governance, scored carefully — L2

The data side is better than the number suggests. PHI/PII isn't in the system at
all — Claude has no access to it. That's a boundary enforced by architecture
rather than by an operator remembering, which is normally an L3 trait. Single
company seat means no key sprawl and no personal shadow accounts.

Three things hold it at L2:

1. **No spend visibility whatsoever.** "I have the company seat, idk how to
   calculate the cost." L3 requires a monitored ceiling or alert. Seat-based
   billing hides cost per workflow, so an expensive automation is invisible.
2. **The boundary may be emergent, not documented.** "Claude doesn't have access
   to it" describes the current wiring, not a written policy. Wiring changes; a
   policy is what stops the change from happening quietly.
3. **Q16 needs clarifying.** "Not available" is ambiguous — it could mean no
   approved-vendor list exists, or that it exists and isn't visible to you. Those
   are very different findings and I'm not going to guess between them.

Not knowing the approved-vendor position is itself the signal here. At an AI
healthcare company that's worth resolving regardless of the score.

## The finding that matters

Set against the router setup:

| | Friend | Sam |
|---|---|---|
| **Total** | **60** | 37.5 |
| Context | 50 | **75** |
| Flexibility | **91** | 16 |
| Scalability | 34 | **41** |

He wins the headline number and loses two of three indices.

The lopsidedness is the whole point. **Context Depth 3 at organizational scale is
the hardest thing on this rubric to build.** It took strategy work, squad-level
scoping, and the judgment to encode coaching method alongside product facts.
There is no weekend project that produces it.

Everything missing here is comparatively easy. A fallback provider is an
afternoon. An output store is a day. Voice is already installed and switched off.
None of it requires organizational buy-in or original thinking.

So the two setups are not 60-good and 37.5-good. One has the easy parts and is
missing the hard part; the other has the hard part and is missing the easy parts.
**The second position is strictly better to be in**, and the score doesn't say so
— which is a finding about the rubric as much as about the setups. Flag for the
v1.0 calibration pass: consider reporting difficulty-to-acquire alongside score.

## The road to 67.5

Ranked by points per unit of effort. All four together: **37.5 → 67.5**, which
clears the Context Gate ceiling and beats the router setup's 60.

| Fix | Effort | Δ |
|---|---|---|
| **Turn on voice.** Already installed. Capture ideas away from the desk. Surface 1→3 | ~0 | **+5.0** |
| **Give output a home.** Skills write reports to a repo or database instead of chat. Fixes the lost-conversation pain directly. Interop 1→3 | ~1 day | **+7.5** |
| **Configure and actually exercise one fallback provider.** Context is already portable markdown, so this is config, not migration. Portability 0→3 | ~1 afternoon | **+11.25** |
| **One named check before output ships**, plus find out the cost. Reliability 1→2, Governance 2→3 | ~1 week | **+6.25** |

The fallback is the single highest-value change available to anyone in this
directory, and it's the cheapest one on this list per point gained. It also
retires the only item here that's a business-continuity issue rather than a
personal one: an org-wide system serving several squads at an AI healthcare
company, with no configured alternative.

## The best idea in here
The **coaching arm** — context that teaches the team how to evaluate ideas, not
just what the company sells. Almost nobody encodes method. It's also the piece
that generalizes: it keeps working after a vendor swap, which is more than can be
said for most of what people film.

## The weakest link
Nothing compounds. Context flows in, output flows into a chat log nobody can
search, and no result ever returns to the files. The system is a very
well-briefed consultant with amnesia.

## Open items
Q18–19 (upkeep — hours per week, and time-to-value for a new PM). Q16 needs the
ambiguity resolved.

## Safety note
Before publishing, strip anything revealing employer internal tooling, vendor
relationships, or data-handling specifics beyond what's already public. "PHI
isn't connected to any model" is fine to say. Naming an approved-vendor list is
not.
