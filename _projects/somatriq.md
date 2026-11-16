---
name: "somatriq"
summary: "Somatriq, self-hosted personal biometric intelligence platform"
description: "Somatriq, self-hosted personal biometric intelligence platform"
language: "Python"
stars: 1
homepage: null
license: "NOASSERTION"
pushed: "2026-09-24"
topics: []
video: "/assets/projects/somatriq/demo.mp4"
still: "/assets/projects/somatriq/still-dashboard-desktop.webp"
still_size: [1440, 900]
image: "/assets/projects/somatriq/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

A self-hosted system for preserving raw wearable measurements and turning them into explainable daily features, longitudinal analysis and personal experiments. **Python calculates the statistics; AI explains structured results.**

## How it works

A recovery score should come with its inputs, missingness and algorithm version. Somatriq keeps the raw evidence so a change in interpretation does not erase what the device actually measured.

**Status:** active prototype. Server, analytics and web features are implemented; mobile sync lifecycle, hardware acceptance and deployment validation remain open. Dashboard screenshots use synthetic data. Somatriq is independent of WHOOP and is not a medical device.

## Results

| Preserve | Understand | Experiment |
| :--- | :--- | :--- |
| Immutable raw frames and canonical observations | Recovery, HRV, sleep and longitudinal context | Behavior journals and N-of-1 experiments |
| Idempotent ingestion and export | Visible coverage and versioned calculations | Deterministic statistics with uncertainty |

## Try it

```bash
git clone https://github.com/Gjusev/somatriq.git
cd somatriq
uv sync
uv run pytest -q
cd apps/web
npm ci
npm run typecheck
npm run build
```

{% endraw %}
