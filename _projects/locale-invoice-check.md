---
name: "locale-invoice-check"
summary: "Matched-pair EN/DE/ES invoice extraction regression harness with deterministic CI gates"
description: "Matched-pair EN/DE/ES invoice extraction regression harness with deterministic CI gates"
language: "Python"
stars: 1
homepage: null
license: "Apache-2.0"
pushed: "2026-10-05"
topics: ["ci-cd", "document-ai", "evaluation", "invoice-processing", "llm", "machine-learning"]
video: null
still: "/assets/projects/locale-invoice-check/still-social-preview.webp"
still_size: [1280, 640]
image: "/assets/projects/locale-invoice-check/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

[Quick start](#quick-start-no-credentials) · [Metrics](#what-it-measures) ·
[Python API](#python-api) · [Run on Kaggle](https://www.kaggle.com/code/gjusev/locale-invoice-check-demo)

An invoice parser can read `1,234.56` correctly and misread `1.234,56`. This Python CLI makes that regression reproducible: render the **same synthetic
invoice data as English, German, and Spanish PNGs**, run your extractor, and
compare field accuracy with deterministic CI gates.

## How it works

On **September 29, 2026**, OpenAI introduced
[GPT-6.1 Sol](https://openai.com/index/introducing-gpt-6-1-sol/), highlighting
document understanding and professional workflows. That motivates a narrower
deployment question: does your extractor preserve accuracy when invoice
conventions change? This package supplies the experiment, not evidence of a
defect in that model.

## Results

| field_accuracy      | EN     | DE     | ES     |
|---------------------|--------|--------|--------|
| invoice_number      | 100.0% | 100.0% | 100.0% |
| invoice_date        | 100.0% | 100.0% | 100.0% |
| net_amount          | 100.0% | 0.0%   | 0.0%   |
| tax_amount          | 100.0% | 0.0%   | 0.0%   |
| total_amount        | 100.0% | 0.0%   | 0.0%   |

## Try it

```bash
pip install locale-invoice-check
locale-check demo
```

{% endraw %}
