# O-100-MRR

A directory of real personal AI setups, scored on a rubric that measures whether
a setup would survive a bad week — not how impressive it looks on camera.

**Thesis:** everything comes back to context. Portability, automation, and voice
control applied to a system that doesn't know your goals, constraints, and
background just gets you to the wrong answer faster, in more places.

## Contents

| Path | What's in it |
|---|---|
| [`docs/research/00-landscape.md`](docs/research/00-landscape.md) | What people actually run — 5 layers, 6 archetypes, and the two things nobody has |
| [`docs/research/01-flex7-rubric.md`](docs/research/01-flex7-rubric.md) | **FLEX-7** — the scoring rubric, anchors, weights, and a worked example |
| [`docs/product/next-steps.md`](docs/product/next-steps.md) | The plan: calibrate → content → corpus → app |
| [`docs/setups/`](docs/setups/) | Scored setups. `_TEMPLATE.md` to add one |
| [`data/setup.schema.json`](data/setup.schema.json) | Data model — markdown frontmatter is the source of truth |

## FLEX-7 at a glance

Seven weighted dimensions, each scored 0–4 against concrete anchors:

| # | Dimension | Wt |
|---|---|---|
| 1 | Context Depth | 20 |
| 2 | Portability | 15 |
| 3 | Interoperability | 15 |
| 4 | Automation Leverage | 15 |
| 5 | Access Surface | 10 |
| 6 | Reliability & Evaluation | 15 |
| 7 | Governance & Cost Control | 10 |

Every setup gets three numbers — **Context / Flexibility / Scalability** — plus a
separate upkeep axis, because a 95 that eats 20 hours a week is worse than an 80
that runs itself.

**The Context Gate:** Context Depth ≤ 1 caps the total at 60, no matter how good
the rest is.

**The evidence rule:** an unevidenced dimension cannot score above 2. Owning five
API keys is not portability.

## Status

Rubric is **v0.1 — uncalibrated**. Do not publish scores until the calibration
protocol in §6 of the rubric doc is complete.
