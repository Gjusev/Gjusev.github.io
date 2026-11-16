---
name: "nitelos"
title: "nitelos"
summary: "Nitelos, verify the outcome, not the attempt (Python SDK)"
description: "Nitelos, verify the outcome, not the attempt (Python SDK)"
language: "Python"
stars: 1
homepage: null
license: "Apache-2.0"
pushed: "2026-11-13"
topics: []
video: null
still: "/assets/projects/nitelos/still-nitelos-social-card.webp"
still_size: [1200, 630]
image: "/assets/projects/nitelos/og.jpg"
diagram: "/assets/projects/nitelos/diagram-nitelos-workflow-poster.webp"
diagram_size: [1600, 900]
figures: []
---
{% raw %}
## What it is

**nitelos checks whether an AI agent really did what it says it did.** It is a
small Python SDK: you describe what "done" means, hand it the evidence the agent
left behind, and it answers `success`, `failure` or `abstained`.

## How it works

1. **Your agent runs a task**, on whatever model or framework you use, and
   reports a result, for example `registration succeeded`. nitelos never calls
   that model and treats the report as context, never as proof.
2. **You write down what "done" means** as criteria: "no validation error remains
   on the form", expressed as `/validation_error equals false`.
3. **Your runner hands over the evidence** it captured: the final page state,
   screenshots, what each tool returned, records read from external systems.
4. **nitelos compares criteria and evidence** and answers `success`, `failure` or
   `abstained`, with the evidence behind every decided criterion.

nitelos only judges. It never clicks, fetches or retries for the agent; the
runner that collects the evidence stays yours (an agent harness, a test suite, a
CI job).

## Results

| Integration | What it does | Guide |
|---|---|---|
| Claude Code plugin | Stop hook that blocks a stop when verification fails; `/nitelos:init`, `/nitelos:check` | [docs/claude-code.md](https://github.com/Gjusev/nitelos/blob/HEAD/docs/claude-code.md) |
| Collectors: git, junit, github, http, Playwright | Read-only evidence collection with caps, redaction and provenance | [docs/collectors.md](https://github.com/Gjusev/nitelos/blob/HEAD/docs/collectors.md) |
| MCP server | `verify_outcome`, host-pinned `collect`, read-only `describe_criteria` over stdio | [docs/mcp.md](https://github.com/Gjusev/nitelos/blob/HEAD/docs/mcp.md) |
| Inspect AI scorer | Verification as a `C`/`I`/`A` score with abstention-aware accuracy | [docs/inspect.md](https://github.com/Gjusev/nitelos/blob/HEAD/docs/inspect.md) |
| DeepEval metric | Deterministic 1/0 `NitelosOutcomeMetric` | [docs/deepeval.md](https://github.com/Gjusev/nitelos/blob/HEAD/docs/deepeval.md) |
| LangGraph node | `verify_outcome_node` with routing on the decision | [docs/langgraph.md](https://github.com/Gjusev/nitelos/blob/HEAD/docs/langgraph.md) |
| OpenTelemetry | One span per verification with allowlisted attributes | [docs/opentelemetry.md](https://github.com/Gjusev/nitelos/blob/HEAD/docs/opentelemetry.md) |
| Langfuse reporting (v0.3) | Categorical `nitelos_outcome` score per verdict, plus trace backfill from the public API | README section below |
| Hook adapters: Codex, OpenCode (v0.3) | The verify pipeline behind Codex Stop hooks; observe-only reporting on OpenCode | README section below |
| Pre-action gate (experimental) | Act/ask decision math from host-supplied confidence signals | [docs/gate.md](https://github.com/Gjusev/nitelos/blob/HEAD/docs/gate.md) |

## Try it

```bash
pip install nitelos
```

{% endraw %}
