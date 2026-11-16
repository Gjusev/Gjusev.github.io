---
name: "agency-bench"
title: "agency-bench"
summary: "Offline harness-cost benchmark for LLM agent harnesses - mechanism repro of System Optimizations for Cost-Efficient Agent Harnesses (arXiv:2611.12122): harness knobs move cost, not success"
description: "Offline harness-cost benchmark for LLM agent harnesses - mechanism repro of System Optimizations for Cost-Efficient Agent Harnesses (arXiv:2611.12122)."
language: "Python"
stars: 0
homepage: null
license: "MIT"
pushed: "2026-11-16"
topics: ["agent-harness", "arxiv", "benchmark", "cost-optimization", "evaluation", "harness"]
video: "/assets/projects/agency-bench/demo.mp4"
still: "/assets/projects/agency-bench/poster.webp"
still_size: [960, 540]
image: "/assets/projects/agency-bench/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

**Offline harness-cost benchmark for LLM agent harnesses**: a mechanism-level, deterministic repro/test repo for [arXiv:2611.12122](https://arxiv.org/abs/2611.12122), *"System Optimizations for Cost-Efficient Agent Harnesses"* (Park et al., UC Berkeley, 2026). Independent and unofficial, not affiliated with the authors.

## How it works

The paper's core observation: an agent **harness** (system prompt, tools, loop, telemetry) barely moves task *accuracy*, that's the model's job, but harness-side variance moves *cost* by **up to 2.6×** on the same model and task. The paper then builds *Agency*, an interposition layer that cuts cost up to **35%** across real benchmarks at accuracy ratio **0.97**.

This repo reproduces the **measurement mechanism**, not the paper's numbers: run identical tasks under different harness configurations, account tokens / LLM calls / estimated $ / wall time per run, and show that harness knobs move cost while success stays constant, fully offline, with deterministic scripted stub agents standing in for a real LLM.

- Every token count is **estimated** (`ceil(chars/4)`) and deterministic, labeled as an estimate, never provider-reported usage.
- Dollar figures use an **illustrative price table** (`cost.PriceTable`), with cache re-reads billed at a 0.1× discount, mirroring the paper's cost model.
- No network, no API key, zero dependencies (stdlib only, PEP 668-safe).

## Results

| variant | paper technique | knob |
|---|---|---|
| `baseline` |, | unmodified harness |
| `compact-output` | tool output compaction | near-lossless: collapse runs of structurally identical lines, keep signal lines verbatim |
| `batched` | tool call batching | independent calls share one LLM call/turn |
| `indexed` | metadata-assisted search | agent gets the precomputed location index |
| `agency-lite` | all of the above + context GC | past tool outputs compacted to markers |

## Try it

```bash
git clone https://github.com/Gjusev/agency-bench.git
cd agency-bench
python3 -m unittest            # 61 tests, offline, <1s
python3 eval/run_bench.py      # the offline comparison table
```

{% endraw %}
