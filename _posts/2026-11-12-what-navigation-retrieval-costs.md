---
title: 74 comparisons instead of 3,000
description: A retrieval walk that scores 74 vectors instead of 3,000 keeps the same top-1 accuracy. What the pruning costs, measured, and when the tree is worth it.
image: /assets/projects/treeseek/og.jpg
---

Flat retrieval scores every vector in the corpus. On my test corpus that is 3,000 comparisons per query, and it is the reason retrieval gets expensive at scale. treeseek walks instead: the query descends a two-level k-means tree and only scores the passages in the branch it picked. 74 comparisons, one per branch decision and one per candidate passage in the final subtree.

## What it bought

| Retriever | Recall@1 | Hit@5 | Vectors compared per query |
|---|---|---|---|
| flat | 0.613 | 0.812 | 3,000 |
| treeseek | 0.650 | 0.750 | 74 |

Top-rank accuracy went up slightly; a walk is good at not being distracted by near-misses living in other topics. The comparison count fell 40×.

## What it cost

Hit@5 dropped six points, and all eight queries that flat solved and treeseek missed trace to one mechanism: a branch taken is a branch never revisited. My favorite failure is the query "Age of Reason Was: Who has read Rushdie's" (topic alt.atheism). The walk descended into a mixed subtree of medicine, baseball and politics. No atheism passage existed in that subtree, so none could appear at any rank. Close in meaning, wrong topic, and greedy descent has no undo.

## When the tree is worth it

When the corpus has real topic structure and top-1 matters more than top-5 recall. When queries arrive as short subject lines, the way they do in triage and routing. When it is not worth it: when recall matters more than cost, or when the corpus is a tangle without clusters; then the tree prunes knowledge it cannot afford to lose.

The run, per-query CSVs and the build cost are in the [treeseek](https://github.com/Gjusev/treeseek) repo. It is a measured comparison against flat retrieval, not a reproduction of DecisionRAG; the navigation idea is theirs.
