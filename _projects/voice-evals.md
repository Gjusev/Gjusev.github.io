---
name: "voice-evals"
summary: "Reproducible evaluation for voice agents: replay scoring, scripted live probes over WebSocket, and CI gates for WER, latency, barge-in behavior and task outcomes."
description: "Reproducible evaluation for voice agents: replay scoring, scripted live probes over WebSocket, and CI gates for WER, latency, barge-in behavior and task."
language: "Python"
stars: 1
homepage: "https://pypi.org/project/voice-evals/"
license: "Apache-2.0"
pushed: "2026-10-04"
topics: ["benchmark", "evaluation", "latency", "llm", "pytest", "stt"]
video: "/assets/projects/voice-evals/demo.mp4"
still: "/assets/projects/voice-evals/still-voice-evals-demo-poster.webp"
still_size: [1280, 720]
image: "/assets/projects/voice-evals/og.jpg"
diagram: "/assets/projects/voice-evals/diagram-evaluation-flow.svg"
diagram_size: null
figures: []
---
{% raw %}
## What it is

**Reproducible evaluation for voice agents.** Score recorded calls, run scripted conversations over WebSocket, and turn transcription, latency, interruptions and task outcomes into CI gates.

[Watch the demo](#watch-the-demo) · [Quick start](#quick-start) · [Kaggle notebooks](#reproduce-in-kaggle) · [Live probe](#live-probe) · [Documentation](#documentation)

## How it works

[View full-size diagram](https://github.com/Gjusev/voice-evals/blob/HEAD/docs/assets/evaluation-flow.svg) · [Mermaid source](https://github.com/Gjusev/voice-evals/blob/HEAD/docs/assets/evaluation-flow.mmd)

**One evaluator, two entry points.** A scored probe exports the same replay format used for offline calls. Replay reproduces the legacy scores from that recording; a new live call can vary with the agent, provider and network.

## Results

| You have… | Start here | What you get |
| --- | --- | --- |
| Recorded transcripts and timings | `voice-eval run calls.jsonl` | Metrics, per-call details and configurable gates |
| A live WebSocket voice agent | `voice-eval probe scenario.json` | A scripted call, interruption observations and replayable artifacts |
| No agent or credentials yet | [Offline quick start](#quick-start) or [Kaggle](#reproduce-in-kaggle) | A complete offline run you can reproduce yourself |

## Try it

```bash
git clone https://github.com/Gjusev/voice-evals.git
cd voice-evals
python -m pip install voice-evals
voice-eval run evals/data/demo_calls.jsonl
```

{% endraw %}
