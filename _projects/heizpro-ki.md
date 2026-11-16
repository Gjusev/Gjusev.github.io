---
name: "heizpro-ki"
description: ""
language: "TypeScript"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-09-24"
topics: []
video: "/assets/projects/heizpro-ki/demo.mp4"
image: "/assets/projects/heizpro-ki/still-dashboard-preview.webp"
image_size: [1249, 1221]
diagram: null
figures: ["/assets/projects/heizpro-ki/figure-simulator-preview.webp"]
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
