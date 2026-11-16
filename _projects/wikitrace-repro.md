---
name: "wikitrace-repro"
title: "wikitrace-repro"
summary: "Offline repro/test harness for WikiTrace (arXiv:2611.14320): evidence-linked agent memory, degradation detection, link-walking pre-action check"
description: "Offline repro/test harness for WikiTrace (arXiv:2611.14320): evidence-linked agent memory, degradation detection, link-walking pre-action check"
language: "Python"
stars: 0
homepage: null
license: "MIT"
pushed: "2026-11-16"
topics: ["agent-memory", "arxiv", "evidence-linked", "llm-agents", "offline", "python"]
video: "/assets/projects/wikitrace-repro/demo.mp4"
still: "/assets/projects/wikitrace-repro/poster.webp"
still_size: [960, 540]
image: "/assets/projects/wikitrace-repro/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

Offline repro/test harness for **WikiTrace**: evidence-linked memory that
reduces memory-induced degradation in LLM agents.

The paper's finding: an agent's memory can make it **fail a task it would
solve without memory**. Lessons are distilled from runs labeled only
success/failure and stored *without the run itself*, so a wrong lesson
cannot be verified. WikiTrace links every lesson (insight) to the diagnosis
of why its run succeeded/failed and to the raw trajectory, and the agent
walks those links whenever a lesson is incomplete, conflicts with another,
or comes from a failure, before acting.

## Results

| Claim | Status |
|---|---|
| Evidence-chain mechanism (lesson → diagnosis → trajectory) implemented, offline-tested | ✅ this repo |
| Mandatory evidence links enforced at write time | ✅ this repo |
| Degradation detector (incomplete / conflicting / failure-sourced) | ✅ this repo |
| Link-walking pre-action check | ✅ this repo |
| Offline synthetic bench showing degradation drop on stub data | ✅ this repo, **harness validation, not benchmark results** |
| Paper's benchmark numbers (ALFWorld, ScienceWorld, PlanCraft, AppWorld, tau3) | ❌ **not reproduced**: needs real-model runs (see ROADMAP) |

{% endraw %}
