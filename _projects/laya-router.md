---
name: "laya-router"
description: "OpenAI-compatible proxy that routes prompts to cheap or frontier LLMs using a local System 1 decision model (laya)"
language: "Python"
stars: 2
homepage: null
license: "Apache-2.0"
pushed: "2026-09-30"
topics: ["cost-optimization", "laya", "llm-routing", "openai-api", "proxy", "system-one"]
video: null
image: "/assets/projects/laya-router/still-social-preview-art.webp"
image_size: [1600, 841]
diagram: "/assets/projects/laya-router/diagram-how-it-works.svg"
figures: []
---
{% raw %}
## What it is

`laya-router` is an OpenAI-compatible proxy. Point an existing SDK at it, keep the rest of the request unchanged, and a local [laya](https://github.com/NandhaKishorM/laya) System 1 model decides which upstream tier should answer.

Routing runs on your machine and costs **$0 in API charges**. It is deliberately conservative: complex or uncertain requests are escalated to the frontier tier; the cheap tier handles the rest.

## How it works

The decision pipeline has three layers, from cheapest to most cautious:

1. **Fast path** -- trivial greetings and zero-content prompts match a regex and go directly to the cheap tier without model inference.
2. **Local laya decision** -- one forward pass labels the prompt `simple`, `standard`, or `complex` and returns a calibrated confidence.
3. **Confidence gate** -- complex, unknown, or low-confidence requests go to the frontier tier. The default favors answer quality when the router is unsure.

## Results

| Measured on the published backtest | What it means |
| --- | --- |
| **80.6%** routed to the cheap tier | Fewer requests pay frontier prices |
| **54.9%** estimated cost reduction | Compared with always using the frontier tier |
| **79.3%** cheap win/tie rate | Blind-judge result among cheap-routed prompts |
| **$0** per routing decision | The decision model is local |

## Try it

```bash
pip install laya-router
export LAYA_ROUTER_UPSTREAM_API_KEY=sk-...
laya-router
# Serving OpenAI-compatible endpoints at http://127.0.0.1:8000/v1
```

{% endraw %}
