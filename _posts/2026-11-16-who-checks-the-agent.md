---
title: Who checks the coding agent's work?
description: Four ways to check a coding agent's work, measured on pass rate and token cost. A test gate buys the same gain as a reviewer at less than half the tokens.
image: /assets/projects/trust-but-verify/og.jpg
---

> **Draft placeholder.** Numbers below come from the [trust-but-verify](https://github.com/Gjusev/trust-but-verify) README (HumanEval, glm-4.5-flash). Rewrite in your own words, add the method and caveats, then delete this note.

I compared four ways of checking a coding agent's output, on two axes: how much the pass rate improves, and how many extra tokens the check costs.

| Check | Pass-rate gain | Token cost |
|---|---|---|
| Test gate | +5 pts | 1.5× |
| Reviewer agent | +5 pts | 3.56× |

Same gain, more than twice the cost. Full setup and the other two strategies are in the repo.

## How to add your own post

Create `_posts/YYYY-MM-DD-slug.md` with `title` and `description` front matter, push to `main`, and it is live in about a minute.
