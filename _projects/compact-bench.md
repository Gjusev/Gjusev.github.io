---
name: "compact-bench"
title: "compact-bench"
summary: "Deterministic offline benchmark for the three context regimes (FHA / EOCC / SAC) of 'You don't need long context' (arXiv:2611.05306) - does aggressive compaction keep accuracy while collapsing peak context"
description: "Deterministic offline benchmark for the three context regimes (FHA / EOCC / SAC) of 'You don't need long context' (arXiv:2611.05306) - does aggressive."
language: "Python"
stars: 0
homepage: null
license: "MIT"
pushed: "2026-11-16"
topics: ["arxiv", "benchmark", "compaction", "context-compaction", "context-engineering", "evaluation"]
video: "/assets/projects/compact-bench/demo.mp4"
still: "/assets/projects/compact-bench/poster.webp"
still_size: [960, 540]
image: "/assets/projects/compact-bench/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

A deterministic, zero-dependency benchmark harness for the **three context
regimes** of *"You don't need long context"* (Belcak et al., NVIDIA,
[arXiv:2611.05306](https://arxiv.org/abs/2611.05306)):

The paper's core claim: aggressive compaction sacrifices little to no task
accuracy while collapsing peak context (Opus 4.5 on SWE-bench Verified:
70.2 SAC vs 70.0 FHA with peak context 32K→8K), so long-context models may
be unnecessary. compact-bench tests that **mechanism** on small, fully
deterministic tasks, offline, with a scripted stub agent, no API needed.

## Results

| Regime | Meaning |
|---|---|
| **FHA**: Full-History Accumulation | every action + observation stays in context (baseline) |
| **EOCC**: End-of-Conversation Compaction | when context crosses a token threshold, reset to task + bounded handoff state |
| **SAC**: Single-Action Compaction | after *every* action, reset to task + state (one action per context) |

{% endraw %}
