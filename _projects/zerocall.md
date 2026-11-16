---
name: "zerocall"
title: "zerocall"
summary: "Skip the model call when nothing changed: guarded decision reuse for tool-using agents. Warm rerun: 4 model calls to 0, 1092 tokens to 0. Python, stdlib only."
description: "Skip the model call when nothing changed: guarded decision reuse for tool-using agents. Warm rerun: 4 model calls to 0, 1092 tokens to 0. Python, stdlib only."
language: "Python"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-11-02"
topics: ["ai-agents", "caching", "llm-agents", "python", "token-efficiency", "tool-use"]
video: "/assets/projects/zerocall/demo.mp4"
still: "/assets/projects/zerocall/poster.webp"
still_size: [960, 540]
image: "/assets/projects/zerocall/og.jpg"
diagram: "/assets/projects/zerocall/diagram-zerocall-flow.webp"
diagram_size: [1600, 620]
figures: [{"src": "/assets/projects/zerocall/figure-zerocall-results.webp", "size": [1600, 520]}]
---
{% raw %}
## What it is

**Your agent already made this decision. Skip the model call, as long as nothing it depended on has changed.**

zerocall is a small Python library for tool-using agents. It stores each decision under a context signature, pins it with guards, and replays it only while every guard still holds. If the environment drifts, the guard fails and the agent decides again, so you never get a stale replay.

## How it works

`signature(task, target, intent)` hashes what the agent is being asked to do. When a decision is recorded, guards pin the state it relied on, such as a file hash, a directory listing or an allowlisted check. On lookup every guard is re-evaluated against the live environment, and a single failure means the decision is not reused.

## Results

| | Model calls | Tokens | Wall time |
| --- | ---: | ---: | ---: |
| Cold run | 4 | 1092 | 35.86 s |
| **Warm run, same workload** | **0** | **0** | **0.08 s** |

{% endraw %}
