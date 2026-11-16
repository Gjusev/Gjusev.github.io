---
name: "treeseek"
title: "treeseek"
summary: "Retrieval that walks a topic tree: 74 vector comparisons per query instead of 3000, same Recall@1. Measured against flat dense retrieval on 20 Newsgroups."
description: "Retrieval that walks a topic tree: 74 vector comparisons per query instead of 3000, same Recall@1. Measured against flat dense retrieval on 20 Newsgroups."
language: "Python"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-11-02"
topics: ["embeddings", "hierarchical-clustering", "information-retrieval", "python", "rag", "retrieval"]
video: "/assets/projects/treeseek/demo.mp4"
still: "/assets/projects/treeseek/poster.webp"
still_size: [960, 540]
image: "/assets/projects/treeseek/og.jpg"
diagram: "/assets/projects/treeseek/diagram-treeseek-descent.webp"
diagram_size: [1600, 820]
figures: [{"src": "/assets/projects/treeseek/figure-treeseek-results.webp", "size": [1600, 640]}]
---
{% raw %}
## What it is

**Retrieval that walks a topic tree instead of scanning every vector: 74 comparisons per query instead of 3000, same top-1 accuracy.**

treeseek is a measured comparison of hierarchical navigation retrieval against flat dense retrieval. The query descends a two-level k-means tree and only scores the passages in the branch it picks. It costs 40x fewer comparisons, and the price is visible in the numbers: a branch that isn't taken is never revisited.

## How it works

k-means groups the embeddings into a two-level tree: root, 20 top clusters, 61 subclusters, then passages (mean subtree size 49). The tree is unsupervised and never sees newsgroup labels. `flat` scores all 3000 passage vectors. `nav` scores the 20 top centroids, descends into the best one, scores that cluster's subcluster centroids, descends again, and returns top-k from that subtree only.

Centroids are means of unit vectors, so one dot product against a centroid equals the mean member cosine exactly. Each branch decision costs one comparison.

## Results

| retriever | Recall@1 | Recall@5 | Hit@5 | vectors compared per query |
|---|---:|---:|---:|---:|
| flat | 0.613 | 0.518 | **0.812** | 3000 |
| **treeseek (nav)** | **0.650** | **0.523** | 0.750 | **74** |

## Try it

```sh
python -m pip install -r requirements.txt
python run.py --build
python run.py --eval --retriever both
python -m pytest
```

{% endraw %}
