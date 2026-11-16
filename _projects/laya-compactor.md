---
name: "laya-compactor"
description: "Cut 70% of RAG context tokens with zero answer-quality loss, measured: one local forward pass scores every retrieved chunk and the budget decides"
language: "Python"
stars: 1
homepage: null
license: "Apache-2.0"
pushed: "2026-09-30"
topics: ["context-compaction", "information-retrieval", "langchain", "laya", "llamaindex", "llm"]
video: "/assets/projects/laya-compactor/demo.mp4"
image: "/assets/projects/laya-compactor/still-brag-poster.webp"
image_size: [1600, 900]
diagram: "/assets/projects/laya-compactor/diagram-eval-summary.svg"
figures: []
---
{% raw %}
## What it is

Query-aware context compaction for RAG and agents. Score an entire retrieval
batch in one local forward pass, then keep only the documents worth sending to
your LLM.

[Quick start](#quick-start) · [How it works](#how-it-works) ·
[Benchmarks](#measured-results) · [Integrations](#integrations) ·
[Limitations](#status-and-limitations)

## How it works

RAG pipelines often retrieve more text than the final model needs. Sending all
of it raises token cost and can bury the useful evidence; truncating from the
head or tail ignores the query.

- **Query-aware:** each document is scored against the question that triggered
  retrieval.
- **One shared forward pass:** the whole batch is scored with laya's
  `predict_batch`, rather than one model request per document.
- **Local after download:** scoring runs with the open-source
  [laya](https://github.com/NandhaKishorM/laya) checkpoint; there is no
  per-compaction API call.
- **Verbatim output:** documents are either kept whole or removed. Their text is
  never rewritten or summarized.
- **Auditable cuts:** every removed document includes its score and a concrete
  reason, such as a low relevance score or an exhausted token budget.

The project is in early development and publishes its losses alongside its
wins. Read [Status and limitations](#status-and-limitations) before using it in
a production path.

## Results

| Dataset | What the result says |
| --- | --- |
| **SQuAD · single-hop** | laya-compactor matched full context at **0.345 exact match** with **973 vs 3,214 average input tokens**. |
| **HotpotQA · multi-hop** | It reached **0.200 vs 0.230 exact match**, retained **94.5% of gold documents**, and used **979 vs 1,440 average input tokens**. |
| **Against truncation** | At the same budget, laya-compactor beat both head and tail truncation on exact match and gold-document retention for HotpotQA. |

## Try it

```bash
pip install laya-compactor
```

{% endraw %}
