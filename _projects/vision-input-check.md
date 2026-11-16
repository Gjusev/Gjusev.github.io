---
name: "vision-input-check"
title: "vision-input-check"
summary: "Regression tests for images sent to vision LLM APIs: pixel-identical vs lossy input variants, variance-aware scoring, CI gates."
description: "Regression tests for images sent to vision LLM APIs: pixel-identical vs lossy input variants, variance-aware scoring, CI gates."
language: "Python"
stars: 1
homepage: null
license: "Apache-2.0"
pushed: "2026-10-05"
topics: ["ci-cd", "evaluation", "image-processing", "llm", "machine-learning", "pytest"]
video: null
still: "/assets/projects/vision-input-check/still-social-preview.webp"
still_size: [1280, 640]
image: "/assets/projects/vision-input-check/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

[Quick start](#quick-start-no-credentials) · [Metrics](#what-it-measures) ·
[Your suite](#run-your-own-suite) · [Run on Kaggle](https://www.kaggle.com/code/gjusev/vision-input-check-demo)

Changing image encoding can change what a vision API gets right. This Python
CLI runs a labeled image suite through **eight delivery variants**, repeats each
request, and turns answer correctness into regression metrics and CI gates.

## How it works

1. **Variants.** Each fixture image is re-encoded into two classes:
   identical (`original`, `png-reencode`, `exif-strip`) and lossy
   (`jpeg-75`, `jpeg-40`, `resize-50`, `grayscale`, `webp`). Before an
   identical variant is used, the tool verifies the pixels really did not
   change: dimensions, band set, per-pixel diff. The variant name alone is
   never trusted as proof.
2. **Runs.** Every fixture/variant pair is asked `--runs` times (default 3).
   A provider answers, an exact assertion judges each raw answer, and there
   is no LLM judge.
3. **Metrics.** Cell accuracy is correct answers over N. The variant
   aggregate is the mean over eligible fixtures. Delta is the variant
   aggregate minus the original aggregate over the same fixtures. A fixture
   whose `original` mixes pass and fail is flaky: it gets excluded from
   strict metrics and the denominators say so.
4. **Gates** compare the strict aggregates against your thresholds.

The demo value of `identical_delta_min` is -1/6 because one seeded failure
in six fixtures moves the aggregate by exactly one fixture. That number is
the tool demonstrating itself.

## Results

| Metric | Definition | Interpretation |
|---|---|---|
| Cell accuracy | Correct answers / repeats for one fixture/variant | Reliability for that transformed input |
| Variant accuracy | Mean cell accuracy over eligible fixtures | Accuracy for a delivery transformation |
| Delta vs. original | Variant accuracy − original accuracy over the same fixtures | Change from the baseline |
| `identical_delta_min` | Lowest aggregate delta among non-original identical variants | Worst correctness drop with unchanged pixels |
| `lossy_accuracy_min` | Lowest aggregate accuracy among lossy variants | Worst accuracy under delivery degradation |
| `flaky_count` | Fixtures whose original mixes pass and fail | Baselines excluded from strict aggregates |

## Try it

```bash
pip install vision-input-check
vision-check demo
```

{% endraw %}
