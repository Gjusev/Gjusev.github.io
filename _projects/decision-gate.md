---
name: "decision-gate"
title: "decision-gate"
summary: "Implementation test of Decision Gate for LLM Agents (arXiv:2610.38620): allow/ask/block gating of tool calls, rules + LLM conformity layer. Tracks false blocks and dangerous allows."
description: "Implementation test of Decision Gate for LLM Agents (arXiv:2610.38620): allow/ask/block gating of tool calls, rules + LLM conformity layer."
language: "Python"
stars: 0
homepage: null
license: "NOASSERTION"
pushed: "2026-11-16"
topics: ["agent-safety", "arxiv", "decision-gate", "guardrails", "llm-agents", "paper-implementation"]
video: "/assets/projects/decision-gate/demo.mp4"
still: "/assets/projects/decision-gate/poster.webp"
still_size: [960, 540]
image: "/assets/projects/decision-gate/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

Implementation test of [Think Before You Act: Decision Gate for LLM Agents](https://arxiv.org/abs/2610.38620):
a cheap gate sits between the agent and its tools and returns allow / ask /
block for every action before it executes.

{% endraw %}
