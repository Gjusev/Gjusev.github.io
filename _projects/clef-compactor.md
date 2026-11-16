---
name: "clef-compactor"
title: "clef-compactor"
summary: "Query-aware RAG context compaction with Cloudflare Clef: keep the evidence, cut noisy retrieval context."
description: "Query-aware RAG context compaction with Cloudflare Clef: keep the evidence, cut noisy retrieval context."
language: "Python"
stars: 2
homepage: null
license: "Apache-2.0"
pushed: "2026-10-01"
topics: []
video: "/assets/projects/clef-compactor/demo.mp4"
still: "/assets/projects/clef-compactor/still-readme-hero-v2.webp"
still_size: [1600, 900]
image: "/assets/projects/clef-compactor/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

**Query-aware RAG context compaction with [Cloudflare Clef](https://blog.cloudflare.com/clef-decision-models/).**
Score an entire retrieval batch against the query, retain the chunks that earn their place, and send a smaller, auditable context to your LLM.

[Quick start](#quick-start) · [Watch the demo](#demo) · [How it works](#how-it-works) · [Benchmarks](#benchmarks) · [Kaggle notebook](https://www.kaggle.com/code/gjusev/clef-compactor-evals)

## How it works

Retrieval can be noisy. If a retriever returns 12 chunks, your LLM normally reads, and you pay for, all 12, even when several are off-topic. clef-compactor asks Clef whether each chunk is needed for the user's query, ranks the answers, then fills your token budget with the strongest evidence.

## Results

| What it does | Why it matters |
| --- | --- |
| **Keeps text verbatim** | Citations and provenance remain intact, nothing is summarized or rewritten. |
| **Explains every cut** | Dropped chunks are marked `irrelevant` or `budget_exhausted`. |
| **Batches requests** | One Cloudflare call scores up to 64 chunks. |
| **Fits your stack** | Sync and async clients, CLI, OpenAI-compatible handler, LangChain, and LlamaIndex adapters. |

## Try it

```bash
pip install clef-compactor

# PowerShell
$env:CLEF_ACCOUNT_ID = "your_account_id"
$env:CLEF_API_TOKEN = "your_api_token"

# bash / zsh
export CLEF_ACCOUNT_ID=your_account_id
export CLEF_API_TOKEN=your_api_token
```

{% endraw %}
