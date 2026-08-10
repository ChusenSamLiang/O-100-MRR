---
slug: friend-multi-model-router
name: "Anonymous (weekend conversation)"
role: ""
industry: ""
archetype: "Router"
rubric_version: "0.1"
scored_on: "2026-08-10"
scored_by: "sam"
scores:
  context_depth: 2       # UNVERIFIED — inferred, capped at 2
  portability: 4
  interoperability: 3
  automation: 2
  access_surface: 4
  reliability: 1
  governance: 1
upkeep:
  maintenance_load: ""
  time_to_value: ""
  monthly_cost_usd: null
source: "interview — informal, weekend conversation"
consent: "anonymized — confirm before publishing"
---

# Anonymous — The Router

## The one-line version
> Refuses to depend on any single model: a handful of provider tokens behind a
> routing harness, driven by voice from a phone and headset.

## Layer 1 — Context
**Unknown — this is the gap.** The whole reason this entry exists is the
suspicion that the context files are the real asset and everything else is
plumbing. Not yet verified. Capped at L2 until the files are seen.

## Layer 2 — Models
API tokens across several providers. Explicit goal: no single model owns the
work.

## Layer 3 — Harness
Custom setup that routes between models and services.

## Layer 4 — Surface
Wispr Flow connected across services — commands fire from the phone, work
happens through the headset while doing something else.

## Layer 5 — Memory & Output
Unknown.

## The best idea in here
Treating the model as a *swappable component* rather than the product. Once
routing exists, model choice becomes a per-task decision instead of an identity.

## The weakest link
Nothing watches the router. No stated way to tell whether a routing decision was
good, no fallback that's been exercised, no visibility on cost or data placement
across providers. The front end is excellent; the back end is unproven.

## Score

**FLEX-7 60/100** · Context 50 · **Flexibility 91** · **Scalability 34**

| Dimension | L | Evidence |
|---|---|---|
| Context Depth | 2* | Inferred, not shown. Capped per evidence rule. |
| Portability | 4 | Multiple providers behind a router, by design. |
| Interoperability | 3 | Routes across models *and* services; voice reaches every app. |
| Automation Leverage | 2 | All described actions human-initiated. |
| Access Surface | 4 | Phone + headset; working away from the desk is routine. |
| Reliability & Evaluation | 1 | No stated check on routing quality or provider degradation. |
| Governance & Cost Control | 1 | Multi-provider key sprawl; no stated data boundary or spend ceiling. |

\* Unverified.

## Follow-up
One question moves this entry the most: **can I see your context files?** If they
are as strong as suspected, Context goes to 3–4 and the total moves to ~75.
