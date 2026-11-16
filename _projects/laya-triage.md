---
name: "laya-triage"
summary: "Multilingual support ticket triage with a local System 1 decision model: hierarchical intent routing, urgency/frustration/churn signals, confidence-based escalation"
description: "Multilingual support ticket triage with a local System 1 decision model: hierarchical intent routing, urgency/frustration/churn signals, confidence-based."
language: "Python"
stars: 1
homepage: null
license: "Apache-2.0"
pushed: "2026-10-02"
topics: ["customer-support", "laya", "multilingual", "system-one", "ticket-triage"]
video: null
still: "/assets/projects/laya-triage/still-social-preview.webp"
still_size: [1280, 640]
image: "/assets/projects/laya-triage/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

`laya-triage` turns a ticket in any supported language into an operational routing decision:

It is built on [laya](https://github.com/NandhaKishorM/laya), the Apache-2.0 System 1 decision engine. Inference runs locally after the checkpoints are downloaded on first use.

## Results

| Output | Meaning |
|---|---|
| `department`, `cluster`, `intent` | Hierarchical route across 77 BANKING77 intents, 12 clusters, and 8 departments |
| `urgency`, `frustration` | Expected scores from 0 to 3 |
| `churn_risk`, `refund_requested` | Probability-like yes/no outputs |
| `confidences` | Calibrated answer confidence for every decision |
| `escalate`, `escalation_reasons` | Explicit human handoff when routing confidence is below the threshold |

## Try it

```bash
git clone https://github.com/Gjusev/laya-triage.git
cd laya-triage

uv venv
uv pip install -e ".[app]"
```

{% endraw %}
