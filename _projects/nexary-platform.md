---
name: "nexary-platform"
title: "nexary-platform"
summary: "On-premise enterprise AI platform: multi-provider LLM chat, hybrid RAG (dense + BM25 + cross-encoder rerank), SYSLOG-auditable, runs inside customer networks"
description: "On-premise enterprise AI platform: multi-provider LLM chat, hybrid RAG (dense + BM25 + cross-encoder rerank), SYSLOG-auditable, runs inside customer networks"
language: "TypeScript"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-10-30"
topics: []
video: "/assets/projects/nexary-platform/demo.mp4"
still: "/assets/projects/nexary-platform/still-feature_chat_mockup_light.webp"
still_size: [1024, 1024]
image: "/assets/projects/nexary-platform/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

An on-premise AI platform export for multi-provider chat, document retrieval and auditable operations. Provider egress is optional configuration; the deployment keeps application data in customer-controlled infrastructure.

## How it works

Regulated teams need to inspect where data goes, retrieve exact identifiers as well as concepts, and export activity to existing operations tooling.

**Status:** public portfolio export. The production Linux deployment was previously verified; this export has not been re-verified as a fresh end-to-end private-cloud install. The OCR service is separate, and no customer data or credentials are included.

## Results

| Control | Retrieve | Operate |
| :--- | :--- | :--- |
| Customer-network deployment and SSO | Dense retrieval + BM25 + reranking | Audit events and SYSLOG export |
| Docker Compose, PostgreSQL and MinIO | Qdrant and PostgreSQL full text | Health endpoints and runbooks |

## Try it

```bash
cp .env.example .env
docker compose -f docker-compose.private-cloud.yml up -d --build
```

{% endraw %}
