---
title: Your agent already made this decision
description: Context signatures with guards turned a warm rerun from 4 model calls into 0, and 35.9 seconds into 0.08. When a file changed, exactly one call came back.
image: /assets/projects/zerocall/og.jpg
---

Watching an agent rerun the same workload and call the model four times for decisions it had already made was expensive to watch. zerocall is my attempt to skip those calls safely. It stores each decision under a signature of what the agent was asked, and pins it with guards that are re-checked against the live environment before any replay.

## The measurement

The same workload, run cold and warm, with real API tokens:

| Run | Model calls | Tokens | Wall time |
|---|---|---|---|
| Cold: the model decides every task | 4 | 1,092 | 35.86 s |
| Warm: nothing changed, cache active | 0 | 0 | 0.08 s |

## The part that matters: the guard drill

A cache that cannot tell when it is wrong is worse than no cache. So after the warm run I edited `demo_pkg/utils.py` by hand and reran the task that touches it. The signature still matched. The file hash guard did not. That single failed guard forced exactly one fresh decision (293 tokens), which was recorded again, and the next run was back to zero calls.

That is the whole contract: replay is only ever offered while every guard holds. One changed byte and the agent pays for one decision, not for the whole workload.

## Where I would not use it

On tasks whose inputs never repeat, the cache is dead weight. On decisions whose guards are hard to pin, anything that depends on a live API's mood rather than on file bytes, a replay would be a guess, and a wrong replay is worse than an expensive call. But for agents working over files, where "did anything change" has a real answer, the warm path is free.

The signature function, the guard types and the demo are in the [zerocall](https://github.com/Gjusev/zerocall) repo. Sixteen tests, standard library only.
