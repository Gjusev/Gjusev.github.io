---
name: "MK-SH-V"
title: "MK-SH-V"
summary: "MK-SH-V: a 260M visual decision model. Calibrated probabilities, a choice, and a refusal below a validated gate, over document pages and screenshots."
description: "MK-SH-V: a 260M visual decision model. Calibrated probabilities, a choice, and a refusal below a validated gate, over document pages and screenshots."
language: "Python"
stars: 5
homepage: null
license: "Apache-2.0"
pushed: "2026-10-31"
topics: ["abstention", "calibration", "decision-model", "document-understanding", "gui-agents", "selective-prediction"]
video: "/assets/projects/MK-SH-V/demo.mp4"
still: "/assets/projects/MK-SH-V/still-hf-cover.webp"
still_size: [1568, 392]
image: "/assets/projects/MK-SH-V/og.jpg"
diagram: null
diagram_size: null
figures: [{"src": "/assets/projects/MK-SH-V/figure-cord-receipt-1.webp", "size": [675, 900]}]
---
{% raw %}
## What it is

A small open **visual decision model**. Give it a document page or a
screenshot, a question and the options; it returns calibrated probabilities
and a choice, or it refuses when its confidence sits below a gate whose risk
was validated on held-out data. The visual sibling of
[MK-SH-1](https://github.com/Gjusev/MK-SH-1).

## How it works

Three real cases, run through the released weights and the shipped policy:

The receipt's total is 302.016 IDR. The E41 release refused the second
question at 0.507; this one reads the total and answers it. The third row is
where it stops: the right range is "above 200.000", and the model picked
"below 100.000" with a confidence that clears the gate. On real receipts
about a quarter of the answers the gate lets through are wrong (see [the gate,
held out](#the-refusal-gate-held-out)); the gate's risk budget is validated
on the synthetic test only.

How a decision is made: one encoder pass reads the image and the text
together, each option is marked inline and scored by a shared head, and the
softmax runs over the valid options only. The temperature T only rescales
confidence, so it never changes a choice. The gate tau was fitted on a
calibration split (E48, by the E42 protocol) as the smallest threshold whose
Clopper-Pearson 95 % upper bound on selective risk stays within a 5 % budget. Images whose longest side is under 1,024 px are first enlarged to it
(Lanczos), exactly as in training and calibration (E46). It is **not** a chat
model and generates no text.

## Results

| 0.839 | τ = 0.55 | 98.3 % |
|:---|:---|:---|
| accuracy on real screenshots, held out; a ~15× larger model run zero-shot scores 0.731 | the refusal gate, fitted on a calibration split by a rule frozen in advance | answered on the held-out synthetic test, with a 95 % Clopper-Pearson risk bound of 3.2 % |

## Try it

```bash
pip install "mksh-v @ git+https://github.com/Gjusev/mk-sh-v"
```

{% endraw %}
