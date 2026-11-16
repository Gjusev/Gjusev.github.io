---
name: "trust-but-verify"
title: "trust-but-verify"
summary: "Four ways to check a coding agent's work, measured on pass rate and token cost. Test gate: +5 pts at 1.5x tokens; reviewer: +5 pts at 3.56x. HumanEval, glm-4.5-flash."
description: "Four ways to check a coding agent's work, measured on pass rate and token cost. Test gate: +5 pts at 1.5x tokens; reviewer: +5 pts at 3.56x."
language: "Python"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-11-02"
topics: ["benchmark", "code-generation", "humaneval", "llm-agents", "python", "verification"]
video: "/assets/projects/trust-but-verify/demo.mp4"
still: "/assets/projects/trust-but-verify/poster.webp"
still_size: [960, 540]
image: "/assets/projects/trust-but-verify/og.jpg"
diagram: "/assets/projects/trust-but-verify/diagram-tbv-arms.webp"
diagram_size: [1600, 760]
figures: [{"src": "/assets/projects/trust-but-verify/figure-tbv-results.webp", "size": [1600, 710]}]
---
{% raw %}
## What it is

**Four ways to check a coding agent's work before it submits, measured side by side on pass rate and token cost.**

On the hard subset, all three verification designs bought the same +5 pass-rate points. The test gate did it at 1.50x the token cost of no verification; self-checking cost 2.73x and a separate reviewer 3.56x.

## How it works

- Task set: HumanEval sorted by numeric task id, in fixed 20-task slices picked with `--offset`. The dataset is cached in `data/HumanEval.jsonl`, so reruns need no network.
- Scoring: prompt, completion and the task's own test block are written to a temp file and run as `python -I` in a temp working directory with a 10 s timeout. Exit code 0 is a pass. Every arm goes through the same scoring path.
- Cost accounting: call count, input tokens and output tokens come from the usage fields of each API response (`prompt_tokens`, `completion_tokens`), summed per task and arm, so reviewer tokens count against the reviewer arm. The cost multiplier is the average total tokens per task divided by the none arm's value. Tokens are the cost proxy. The USD figure in RESULTS.md is an estimate from list prices, and a budget guard stops a real run at 80 percent of a 2 USD cap.
- Determinism: temperature 0, thinking disabled, one run per arm, no repeats.

## Results

| arm | pass rate | avg calls/task | avg tokens/task | cost vs none |
|---|---:|---:|---:|---:|
| none | 85.0% (17/20) | 1.00 | 325 | 1.00x |
| selfcheck | 90.0% (18/20) | 2.00 | 887 | 2.73x |
| reviewer | 90.0% (18/20) | 2.15 | 1155 | 3.56x |
| **gate** | **90.0% (18/20)** | **1.25** | **487** | **1.50x** |

{% endraw %}
