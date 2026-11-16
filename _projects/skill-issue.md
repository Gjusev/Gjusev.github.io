---
name: "skill-issue"
title: "skill-issue"
summary: "Do your skills help the agent, or just take up context? Local harness that runs a task with and without a skill and shows the evidence."
description: "Do your skills help the agent, or just take up context? Local harness that runs a task with and without a skill and shows the evidence."
language: "TypeScript"
stars: 1
homepage: "https://www.npmjs.com/package/skill-issue-tool"
license: "MIT"
pushed: "2026-11-13"
topics: ["agent-skills", "ai-agents", "benchmarking", "claude-code", "codex", "evaluation"]
video: null
still: "/assets/projects/skill-issue/still-social-preview.webp"
still_size: [1280, 640]
image: "/assets/projects/skill-issue/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

Skill Issue is a local evidence harness for that question. It runs one bounded task from the same starting bytes in two variants: a baseline with no target skill, and a variant with it. An independent verifier, the run trace, the resulting file changes, and any reported time or token measurements stay together in one inspectable experiment.

There is no hosted backend, account, or telemetry. You choose the task and keep the resulting evidence on your machine.

## Results

| Before Skill Issue | After Skill Issue |
| --- | --- |
| "This skill feels useful." | A task, starting workspace, exact skill revision, verifier, trace and changed files are kept together. |
| One success becomes "the skill is better." | The report labels the result as observed evidence and says when repetitions are insufficient for that claim. |
| Baseline and skill runs drift because the environment changed. | Both variants start from the same bytes and an external verifier checks the stated success criterion. |

## Try it

```bash
npm install -g skill-issue-tool
skill-issue --version
```

{% endraw %}
