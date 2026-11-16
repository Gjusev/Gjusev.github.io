---
name: "clef-router"
title: "clef-router"
summary: "Route prompts between cheap and frontier LLMs with Cloudflare's Clef decision model. OpenAI-compatible proxy + library."
description: "Route prompts between cheap and frontier LLMs with Cloudflare's Clef decision model. OpenAI-compatible proxy + library."
language: "Python"
stars: 3
homepage: "https://pypi.org/project/clef-router/"
license: "Apache-2.0"
pushed: "2026-10-01"
topics: ["cloudflare", "cost-optimization", "decision-model", "llm", "model-routing", "openai"]
video: null
still: "/assets/projects/clef-router/still-social-preview-art.webp"
still_size: [1280, 640]
image: "/assets/projects/clef-router/og.jpg"
diagram: "/assets/projects/clef-router/diagram-how-it-works.svg"
diagram_size: null
figures: []
---
{% raw %}
## What it is

GitHub READMEs do not reliably render repository MP4s with native controls, so
the video is presented as a clickable poster frame; it opens the generated
[`brag.mp4`](https://github.com/Gjusev/clef-router/blob/HEAD/brag-output/brag.mp4) directly.

## How it works

One forward pass scores every option of every question, so a decision costs a
single small request. The policy is fail-safe on purpose:

1. When the `team` answer names a tier, that tier wins, unless its confidence
   is below `min_confidence` (default 0.45), which escalates to frontier.
2. With no usable `team` answer, the `urgency` probability routes: 0.5 or
   higher goes frontier.
3. Anything the router cannot parse escalates. It never silently picks the
   cheap tier without evidence.

## Results

| | |
| --- | --- |
| **Purpose** | Choose an affordable or frontier completion tier before your app calls the model. |
| **Interface** | OpenAI-compatible proxy, Python client, async client, and CLI. |
| **Decision model** | [Cloudflare Clef](https://huggingface.co/Cloudflare/clef), using one joint forward pass. |
| **Safety policy** | Low confidence, urgent prompts, unknown answers, and parse failures escalate to frontier. |
| **Evidence** | Committed fixtures, reproducible local evaluation, and public Kaggle CPU/T4 runs. |

## Try it

```bash
pip install clef-router
export CLEF_ACCOUNT_ID=your_cloudflare_account_id
export CLEF_API_TOKEN=your_cloudflare_api_token
```

{% endraw %}
