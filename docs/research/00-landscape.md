# Landscape: What People Are Actually Running (Aug 2026)

Research pass on publicly-shared personal AI setups. Goal: find the recurring
*shapes*, not the tool-of-the-week, so the directory has stable categories.

## The five layers every shared setup has

Almost every setup people describe publicly decomposes into the same five layers.
This is the spine of our data model.

| Layer | What it is | Common choices |
|---|---|---|
| **1. Context** | The files that tell the system who/what/why | `CLAUDE.md`, `AGENTS.md`, `CLAUDE.local.md`, PRDs, Obsidian/Notion vaults, style guides |
| **2. Models** | Which brains, and who picks | Direct API keys, OpenRouter, Claude Code Router, local via Ollama |
| **3. Harness** | The thing that holds it together | Claude Code, Cursor, n8n, custom CLI, Raycast |
| **4. Surface** | Where you invoke it from | Terminal, IDE, phone, voice (Wispr Flow), Slack, cron/triggers |
| **5. Memory & Output** | Where results land | Notion DB, Obsidian, git repo, Linear, Google Docs |

The thing your friend intuited — *"his context files must be important"* — is the
consensus finding in the research. The line that keeps recurring: **a well-crafted
prompt in a poorly engineered context still fails; a poorly crafted prompt in a
well-engineered context often succeeds.**
([Sourcegraph](https://sourcegraph.com/blog/context-engineering))

The mental model people use: *the LLM is the CPU, the context window is RAM, and
your job is to be the operating system* — loading exactly the right working set
per task. ([Karo Zieminski](https://karozieminski.substack.com/p/context-engineering-product-builders-guide-2026))

## Six archetypes (use these as directory categories)

### A. The Router
Multiple provider keys behind a routing layer so no single vendor owns the
workflow. Claude Code Router is the canonical example — you launch `ccr code`
instead of `claude` and nothing else changes.

The real argument is **cost shape, not independence**: a session is not one
workload. Summarizing a diff, naming a branch, and compacting context are
throwaway tasks; planning a refactor is a reasoning task. Paying frontier output
rates for all of it is the wasteful default. Supports OpenRouter, DeepSeek,
Ollama, Gemini, and any OpenAI-compatible endpoint.
([morphllm](https://www.morphllm.com/claude-code-router), [Rakesh Tembhurne](https://rakesh.tembhurne.com/blog/ai-tools/claude-code-router-multi-model))

*This is your friend's setup.* See the worked score in `01-flex7-rubric.md`.

### B. The Layered Context Stack
Discipline about *which* context file gets what. The 2026 convention that has
settled out:
- `CLAUDE.md` — single-agent, project root, committed
- `AGENTS.md` — the cross-tool standard (Claude, Cursor, Cline interop)
- `CLAUDE.local.md` — personal shortcuts, WIP notes, sensitive paths, **never
  committed**

Repeatable work graduates into skills (`SKILL.md`) and slash commands; isolated
jobs go to subagents. ([obviousworks](https://www.obviousworks.ch/en/designing-claude-md-right-the-2026-architecture-that-finally-makes-claude-code-work/), [alexop.dev](https://alexop.dev/posts/understanding-claude-code-full-stack/))

### C. The Voice/Ambient Operator
Dictation as the primary input across every app — Gmail, Slack, iMessage,
Notion, terminal, editor. Wispr Flow is the dominant tool; the pitch is that it
understands dev jargon rather than being a writer's tool. Unlocks
multitasking-through-headset — the "futuristic" bit your friend showed you.
([Wispr Flow](https://wisprflow.ai/use-cases))

### D. The Delegation Hierarchy
Cheap models do the labor, expensive models do the judgment. Simon Willison's
version, stated plainly: *"For all coding tasks use your judgement to decide an
appropriate lower power model and run that in a subagent."* Implementation goes
to a subagent with a model override; review and synthesis stay in the main loop.
([Simon Willison](https://simonwillison.net/tags/claude/))

### E. The Automation Pipeline
Unattended runs on triggers. Typical shape: n8n watches an inbox → pulls
newsletters → Claude extracts and summarizes → writes to a Notion database with
tags. Meeting tools (Granola) extract decisions and action items automatically.
([prodfolks](https://prodfolks.substack.com/p/my-2026-ai-stack))

### F. The Minimalist Four
The counter-position, and worth featuring for contrast: one tool for chat, one
for research, one for creative, one for private/offline. Deliberately refuses
orchestration. Often scores better on maintenance load than the elaborate setups
— a genuinely useful finding for the content angle.
([aitechin](https://aitechin.substack.com/p/your-2026-ai-toolkit-20-tools-to))

### G. The Org Layer *(added from intake — not found in public sources)*
Context scoped for a **company**, not a person: a global directory applied across
all teams plus team-specific directories per squad, carrying OKRs, strategy,
product docs — and sometimes method (how to evaluate an idea, how to coach) on
top of facts.

This archetype is absent from every public setup reviewed, which is itself the
finding. Published setups are overwhelmingly individual; the shared-context
problem is harder and nobody films it. It also fails differently: single-vendor
concentration is a personal annoyance for an individual and a business-continuity
gap for six squads.

Worth treating as a first-class category — it's the archetype with budget behind
it, and it's the on-ramp to the team edition in `docs/product/next-steps.md`.
See `docs/setups/sam-pm-ai-healthcare.md`.

## What almost nobody has (the content gap)

Across everything reviewed, two layers are consistently **missing** from
publicly-shared setups:

1. **Evaluation.** People describe what they built, never how they know it still
   works. No regression checks, no "what happens when the router picks wrong."
2. **Governance.** Key sprawl across five providers, no data boundary, no cost
   ceiling, no audit trail. Rarely mentioned, never scored.

This is the whole opening for the rubric and for your channel. Everyone rates
setups on how *impressive* they look. Nobody rates them on whether they'd
survive a bad week. Given you're a PM at an AI healthcare company, the
governance axis is a credential you can actually spend — it's the thing your
audience can't get from a generic tech creator.

## Sources

- [Designing CLAUDE.md correctly: The 2026 architecture](https://www.obviousworks.ch/en/designing-claude-md-right-the-2026-architecture-that-finally-makes-claude-code-work/)
- [Claude Code Router: Route Claude Code to Any Model](https://www.morphllm.com/claude-code-router)
- [Building a Claude Code Router: Multi-Model Orchestration](https://rakesh.tembhurne.com/blog/ai-tools/claude-code-router-multi-model)
- [Context Engineering: A Practical Guide for AI Agents — Sourcegraph](https://sourcegraph.com/blog/context-engineering)
- [Context Engineering for Product Builders: The 2026 Operating Manual](https://karozieminski.substack.com/p/context-engineering-product-builders-guide-2026)
- [Context Engineering Best Practices — Packmind](https://packmind.com/context-engineering-ai-coding/context-engineering-best-practices/)
- [Understanding Claude Code's Full Stack — alexop.dev](https://alexop.dev/posts/understanding-claude-code-full-stack/)
- [Simon Willison — Claude tag](https://simonwillison.net/tags/claude/)
- [Wispr Flow use cases](https://wisprflow.ai/use-cases)
- [my 2026 ai stack — prodfolks](https://prodfolks.substack.com/p/my-2026-ai-stack)
- [Your 2026 AI Toolkit: 20 Tools](https://aitechin.substack.com/p/your-2026-ai-toolkit-20-tools-to)
