---
name: "forecast-arena"
title: "forecast-arena"
summary: "Testing AI forecasting models against reality. Reproducible benchmarks, real world datasets and honest results."
description: "Testing AI forecasting models against reality. Reproducible benchmarks, real world datasets and honest results."
language: "Python"
stars: 2
homepage: null
license: "MIT"
pushed: "2026-11-16"
topics: ["benchmark", "chronos", "electricity-prices", "forecasting", "foundation-models", "time-series"]
video: "/assets/projects/forecast-arena/demo.mp4"
still: "/assets/projects/forecast-arena/still-actual_vs_pred_day_ahead_price_de-lu_2026-10-25.webp"
still_size: [1600, 493]
image: "/assets/projects/forecast-arena/og.jpg"
diagram: "/assets/projects/forecast-arena/diagram-accuracy_day_ahead_price_h1.webp"
diagram_size: [1600, 844]
figures: []
---
{% raw %}
## What it is

**Real data. Real predictions. Real results.** An open benchmark that tests
whether time series foundation models actually beat traditional methods on real,
messy operational data, with reproducible code, leakage-guarded protocols, and
the failures published next to the wins.

Vendors report wins on academic benchmarks. We re-test that claim on two systems
Germany runs on: **Deutsche Bahn train delays** and **day-ahead electricity prices**.

## How it works

- **Rolling-origin evaluation**: chronological splits, no shuffling, identical
  origins and inputs for every model.
- **Leakage guards by construction**: models only ever receive history
  truncated at the origin ([ADR-0001](https://github.com/Gjusev/forecast-arena/blob/HEAD/docs/adr/0001-completed-hour-forecasting-protocol.md),
  [ADR-0002](https://github.com/Gjusev/forecast-arena/blob/HEAD/docs/adr/0002-pre-auction-day-ahead-protocol.md)).
- **Pre-registered event thresholds**: disruption / negative-price / spike
  thresholds frozen on training data before holdout evaluation.
- **Honest metrics**: MAE, RMSE, MASE vs seasonal naive, sMAPE where valid
  (never MAPE on prices), interval coverage, detection precision/recall,
  inference runtime.
- **Significance**: Diebold-Mariano tests vs the best baseline with a
  multiple-testing caveat stated.

## Results

| Model | MAE | Skill vs naive | 80%-interval coverage |
|---|---|---|---|
| Timestral 209M | **1.84** | +33.2% | 0.78 |
| Timestral 28M | 1.87 | +32.4% | 0.77 |
| Chronos-2 | 1.89 | +31.4% | 0.76 |
| TimesFM 3.0 | 1.90 | +31.4% | 0.79 |
| LightGBM | 1.92 | +30.7% |, |
| XGBoost | 1.93 | +30.2% |, |

## Try it

```bash
uv run --extra dashboard python dashboard/app.py   # -> http://localhost:7860
```

{% endraw %}
