---
name: "hard-mode"
summary: "Your beautiful demo meets real life. Local Playwright runner + agent skill that test a web app under difficult UI scenarios with reproducible evidence."
description: "Your beautiful demo meets real life. Local Playwright runner + agent skill that test a web app under difficult UI scenarios with reproducible evidence."
language: "TypeScript"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-10-09"
topics: ["accessibility", "agent-skills", "claude-code", "codex", "playwright", "testing"]
video: null
still: "/assets/projects/hard-mode/still-compare.webp"
still_size: [1600, 1500]
image: "/assets/projects/hard-mode/og.jpg"
diagram: null
diagram_size: null
figures: [{"src": "/assets/projects/hard-mode/figure-report-gallery.webp", "size": [1600, 1263]}]
---
{% raw %}
## What it is

hard-mode is a local testing tool for web apps. A Playwright runner drives your running app through five uncomfortable but ordinary situations, records what happens, and keeps the evidence: screenshots, pixel measurements, focus traces. When you fix something, you rerun the exact same configuration and get a before/after comparison.

Everything runs on your machine. The runner never edits your app's code and sends nothing anywhere.

## Results

| Before using Hard Mode | After the same scenario is rerun |
| --- | --- |
| "The page looks fine on my screen." | A report records that the long title clipped, where it clipped, and the screenshot that proves it. |
| A `div` styled like an Export button looks clickable. | The keyboard trace shows the control is unreachable; after the fix the same trace resolves the finding. |

## Try it

```bash
git clone <this repo> && cd hard-mode
npm install
npm run build
npx playwright install chromium
npm run demo
```

{% endraw %}
