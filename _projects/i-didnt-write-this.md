---
name: "i-didnt-write-this"
title: "i-didnt-write-this"
summary: "Vibe-coded it? Now understand it. Turn one feature of your JS/TS project into an interactive, evidence-backed lesson."
description: "Vibe-coded it? Now understand it. Turn one feature of your JS/TS project into an interactive, evidence-backed lesson."
language: "JavaScript"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-10-09"
topics: ["agent-skills", "ai-agents", "claude", "code-comprehension", "code-learning", "codex"]
video: null
still: "/assets/projects/i-didnt-write-this/still-social-preview.webp"
still_size: [1280, 640]
image: "/assets/projects/i-didnt-write-this/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

An agent skill that turns **one feature** of your JavaScript or TypeScript
project into an interactive, evidence-backed lesson: follow the data through
the real source, predict what it does, and locate a fault. Every answer can
be checked against an actual recorded execution of your code.

Everything runs locally. No accounts, no cloud, no telemetry.

## Results

| Before I Didn't Write This | After I Didn't Write This |
| --- | --- |
| "Can you explain the discount logic?" returns a summary you must trust. | The lesson asks you to predict the branch, then links the answer to source snippets and a recorded execution. |
| Reading files linearly leaves the path through the feature implicit. | The trace follows the real data flow through one bounded feature and makes every exercise checkable. |
| A guessed explanation can sound convincing. | Validation rejects a lesson whose evidence no longer matches the code it was built from. |

## Try it

```sh
npx skills@latest add Gjusev/i-didnt-write-this
```

{% endraw %}
