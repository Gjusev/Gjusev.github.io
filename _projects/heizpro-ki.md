---
name: "heizpro-ki"
title: "heizpro-ki"
summary: "A German voice agent that answers the phone for a heating company while the team is out on jobs."
description: "A German voice agent that answers the phone for a heating company while the team is out on jobs."
language: "TypeScript"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-09-24"
topics: []
video: "/assets/projects/heizpro-ki/demo.mp4"
still: "/assets/projects/heizpro-ki/still-dashboard-preview.webp"
still_size: [1249, 1221]
image: "/assets/projects/heizpro-ki/og.jpg"
diagram: null
diagram_size: null
figures: [{"src": "/assets/projects/heizpro-ki/figure-simulator-preview.webp", "size": [1249, 1221]}]
---
{% raw %}
## What it is

**Talk to it live: [mischa.mokka-dev.de](https://mischa.mokka-dev.de)**

A heating company was missing inbound calls while out on jobs. Answering services are expensive, chatbots don't answer phones. So this: a voice agent that picks up, holds a real-time German conversation, qualifies the lead (who, what, where, how urgent), and writes a structured record the human can call back on.

## Try it

```bash
cd heizung-agent
pnpm install
cp .env.example .env   # ELEVENLABS + OPENAI keys
pnpm dev
```

{% endraw %}
