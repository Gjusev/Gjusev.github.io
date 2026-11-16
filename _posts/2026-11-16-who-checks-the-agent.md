---
title: The cheap way to check an agent's work
description: Three ways to check a coding agent's work, measured side by side. All three bought the same five points; the gate cost 1.5× the tokens, the reviewer 3.56×.
image: /assets/projects/trust-but-verify/og.jpg
---

A coding agent hands you a finished change. Do you trust it as it is, check it yourself, run the tests, or pay a second agent to review it? I ran all four options on the same tasks and compared two things: how much the pass rate moved, and what the check cost in tokens.

## The setup

One Python coding agent solves HumanEval tasks. Between its first solution and submission, four things can happen, and that is the whole experiment:

| Arm | What happens before submission |
|---|---|
| none | The solution goes in as it is |
| selfcheck | The same agent instance rereads its own solution, once, and may revise it |
| reviewer | A second, fresh-context agent reviews it and may ask for one revision |
| gate | The solution runs against the task's tests; on failure the agent sees the output and retries, twice at most |

Solver and reviewer are the same model (glm-4.5-flash), temperature 0. Tokens are the ones the API reported, real calls only.

## The result

On the first 20 tasks the model scored 20 out of 20 in every arm, so the interesting numbers come from the harder back half, tasks 144 to 163:

| Arm | Pass rate | Tokens per task | Cost |
|---|---|---|---|
| none | 85% | 325 | 1.00× |
| selfcheck | 90% | 887 | 2.73× |
| reviewer | 90% | 1,155 | 3.56× |
| gate | 90% | 487 | 1.50× |

Every check bought the same five points. The gate bought them by running the code and letting reality complain. The reviewer bought them by paying for a second full context on every turn.

## What this number can and cannot say

Twenty tasks is small. One flipped task moves the pass rate by exactly five points, so these deltas show a direction, not a size. The paper this replicates, Rethinking Verification in Agent Harnesses (Alibaba and Cornell), found the same direction across seven frontier models; my setup can only check that the direction holds at small scale, and it did.

Two honest footnotes. The reviewer's cost (3.56×) is much worse here than in the paper (1.13× to 1.25×), because my base arm is one short call, so every review turn pays the full context again. And the gate sees the bundled tests, which rewards fitting those exact asserts; against a hidden test suite its edge would shrink.

## What I take from it

If the task has executable checks, a gate is the cheap default. It never pays for a second opinion that mostly restates the code. A reviewer earns its cost only where no test can run, and the price of that opinion should be measured, not assumed. Self-check landed in between, and it did better here than the paper expected, which is exactly the kind of result a small replication exists to surface.

Raw rows, per-task CSVs and the console logs are in the [trust-but-verify](https://github.com/Gjusev/trust-but-verify) repo.
