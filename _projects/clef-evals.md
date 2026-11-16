---
name: "clef-evals"
title: "clef-evals"
summary: "Calibration-first evaluation toolkit for Cloudflare's Clef decision models. Judge cheap, audit confidence."
description: "Calibration-first evaluation toolkit for Cloudflare's Clef decision models. Judge cheap, audit confidence."
language: "Python"
stars: 1
homepage: "https://pypi.org/project/clef-evals/"
license: "Apache-2.0"
pushed: "2026-10-01"
topics: ["brier-score", "calibration", "ci-gate", "clef", "cloudflare", "ece"]
video: null
still: "/assets/projects/clef-evals/still-social-preview-v2.webp"
still_size: [1200, 630]
image: "/assets/projects/clef-evals/og.jpg"
diagram: "/assets/projects/clef-evals/diagram-pipeline.svg"
diagram_size: null
figures: []
---
{% raw %}
## What it is

Most evaluation harnesses stop at accuracy. `clef-evals` also verifies whether a
model's stated probabilities deserve to be trusted. Run typed Clef decisions
against your dataset, measure Expected Calibration Error (ECE), Brier score,
latency and cost, then make regressions fail CI before they reach users.

## Results

| Evaluate | Understand | Enforce |
| --- | --- | --- |
| Choice, binary and custom decision tasks through sync or async judges. | Accuracy, ECE, binary and multiclass Brier, latency percentiles, token use and estimated input cost. | A CLI gate and reusable GitHub Action that compare a fresh run with a committed baseline. |

## Try it

```bash
pip install clef-evals
export CLEF_ACCOUNT_ID=your_account_id
export CLEF_API_TOKEN=your_api_token
```

{% endraw %}
