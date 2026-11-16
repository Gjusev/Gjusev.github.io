---
name: "somem-repro"
title: "somem-repro"
summary: "Independent stdlib-only reproduction of SoMem, Can LLM Agents Organize Their Own Memory? (arXiv:2611.11929): linked-document agent memory with immutable evidence, offline-tested"
description: "Independent stdlib-only reproduction of SoMem, Can LLM Agents Organize Their Own Memory?"
language: "Python"
stars: 0
homepage: null
license: "MIT"
pushed: "2026-11-16"
topics: ["agent-memory", "arxiv", "llm", "llm-agents", "longmem-eval", "memory"]
video: "/assets/projects/somem-repro/demo.mp4"
still: "/assets/projects/somem-repro/poster.webp"
still_size: [960, 540]
image: "/assets/projects/somem-repro/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

Reproduction/test repo for **SoMem**: *Can LLM Agents Organize Their Own
Memory?* (Fu et al., CityU HK + Tencent Jarvis Lab, [arXiv:2611.11929](https://arxiv.org/abs/2611.11929)). Official code: [Qi202/SoMem](https://github.com/Qi202/SoMem) (MIT).

**Independent, unofficial reimplementation.** No affiliation with the paper
authors. Per our search (2026-11-15, see NOTES.md) this is the first
third-party repro of the mechanism.

## How it works

The official repo is a full framework (Python 3.12+, PyTorch/sentence-transformers,
two paid model endpoints, full-benchmark downloads, and an explicit disclaimer
that manuscript scores have **not** been rerun with the public recipes). This
repro implements the core mechanism in a **stdlib-only** package that is fully
offline-testable, and wires a single-endpoint LLM path for real runs on a
LongMemEval-S subset. See NOTES.md for the full existing-implementation check.

## Try it

```bash
git clone https://github.com/Gjusev/somem-repro.git
cd somem-repro
python3 -m unittest                      # 31 tests, zero dependencies, no network
python3 eval/run_eval.py --fixture data/fixtures/tiny_longmemeval.json --quiet
```

{% endraw %}
