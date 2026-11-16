---
name: "falschinfo-radar"
summary: "German nutrition misinformation radar: finds myth videos by reach, extracts the exact false claim, ranks, drafts the correction, application project with the Heißhunger e-book"
description: "German nutrition misinformation radar: finds myth videos by reach, extracts the exact false claim, ranks, drafts the correction, application project with the."
language: "TypeScript"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-09-24"
topics: []
video: "/assets/projects/falschinfo-radar/demo.mp4"
still: "/assets/projects/falschinfo-radar/still-radar-dashboard.webp"
still_size: [1280, 800]
image: "/assets/projects/falschinfo-radar/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

**An application project for More Nutrition: a misinformation radar that finds German nutrition-myth videos with reach, reliably extracts the specific false claim, ranks them, and drafts the correction, plus a 35-page e-book built from the founder's own material.** Published with Christian Wolf's permission.

## How it works

The brief: show you can ship end-to-end as a "vibe coder". I chose two
deliverables that solve one real problem the creator faces weekly, nutrition misinformation with reach. The radar automates finding it,
pinpointing the exact false statement (not just "this video is bad"), and
producing the skeleton of a public correction.

## Results

| Inbox | Correction plan |
| :---: | :---: |
|  |  |

## Try it

```bash
cd web
cp .env.example .env        # DATABASE_URL, OPENAI_API_KEY, YOUTUBE_API_KEY, ...
npm install
npx tsx scripts/migrate.ts  # idempotent schema bootstrap
npm run dev -- -p 3002
```

{% endraw %}
