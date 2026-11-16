---
name: "laya-evals"
title: "laya-evals"
summary: "LLM-as-judge and calibration auditing for System 1 decision models: rubric scoring in CI plus reliability diagrams, ECE and coverage/accuracy thresholds by option count"
description: "LLM-as-judge and calibration auditing for System 1 decision models: rubric scoring in CI plus reliability diagrams, ECE and coverage/accuracy thresholds by."
language: "Python"
stars: 1
homepage: null
license: "Apache-2.0"
pushed: "2026-10-01"
topics: ["ai-evaluation", "calibration", "ci-cd", "laya", "llm-evals", "system-one"]
video: "/assets/projects/laya-evals/demo.mp4"
still: "/assets/projects/laya-evals/still-social-preview.webp"
still_size: [1200, 630]
image: "/assets/projects/laya-evals/og.jpg"
diagram: "/assets/projects/laya-evals/diagram-pipeline.svg"
diagram_size: null
figures: []
---
{% raw %}
## What it is

An answer confidence is only safe to automate on if it has been calibrated against gold labels. That meaning can change with the question shape: in our measured runs, a 3-option XNLI question reached a 90% target at a **0.8074** gate, while a 20-option MASSIVE question needed **0.9944**. One global `min_confidence` is not a policy.

`laya-evals` couples a cheap, batched rubric judge with the evidence needed to decide when to trust it.

## Results

| Capability | Why it matters |
| --- | --- |
| **Batched rubric judge** | Ask `choice`, ordered `score`, and boolean `noul` questions in one laya pass. |
| **Calibration audit** | Compute ECE, Brier score, reliability bins, and coverage/accuracy curves from `(confidence, outcome)` pairs. |
| **Threshold advisor** | Select the lowest gate that meets a target accuracy, separately for each question shape. |
| **Judge comparison** | Compare against gold or another judge with agreement, Cohen’s kappa, weighted kappa, accuracy, and cost-per-1k fields. |
| **CI regression gate** | Fail builds when accuracy drops or calibration worsens; deliberately exclude unstable wall-clock measurements. |

## Try it

```bash
pip install laya-evals
# or: uv add laya-evals
```

{% endraw %}
