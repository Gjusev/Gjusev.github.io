---
name: "gate-calibrated"
summary: "Calibrated act/ask gate for tool-using agents' write actions, with conformal risk control. Open, reproducible evaluation on tau-bench retail, negative results included."
description: "Calibrated act/ask gate for tool-using agents' write actions, with conformal risk control."
language: "Python"
stars: 1
homepage: null
license: "MIT"
pushed: "2026-10-14"
topics: ["ai-agents", "calibration", "conformal-prediction", "human-in-the-loop", "langgraph", "llm"]
video: "/assets/projects/gate-calibrated/demo.mp4"
still: "/assets/projects/gate-calibrated/still-poster.webp"
still_size: [1600, 900]
image: "/assets/projects/gate-calibrated/og.jpg"
diagram: "/assets/projects/gate-calibrated/diagram-curve.webp"
diagram_size: [1050, 750]
figures: []
---
{% raw %}
## What it is

The gate decides from a calibrated success probability and a threshold set by conformal risk control. This repo is an open and reproducible implementation of ideas described in ToolChain-CRC (arXiv 2606.18467) and CORA (arXiv 2604.09155), evaluated on tau-bench retail, and it reports what the data showed, including where the approach did not help.

## How it works

Agents with tools sometimes execute write actions that are wrong: a wrong item id, a wrong payment method, a cancellation the user did not ask for. This gate sits between the agent and the environment. For every write-tier action it computes two confidence signals (the model's own probability estimate, and the agreement of k resampled next actions), maps them to a calibrated probability of success, and compares that probability to a threshold picked by conformal risk control. Actions in the irreversible tier (cancel, return, exchange) always ask, under every policy compared here.

- `confirm_all`: asks on every write and irreversible action.
- `fixed_threshold`: asks when the raw verbalized probability is under 0.7.
- `calibrated`: asks when the calibrated probability is under a threshold lambda, where lambda is the smallest value whose conformal bound keeps the probability of a trajectory with an executed wrong write under alpha (alpha swept over 0.02, 0.05, 0.10, 0.20).

The headline measurement is a curve: wrong writes executed without approval per trajectory, against approvals requested per trajectory, on the tau-bench retail test split.

## Results

| policy | trajectories with an executed wrong write | wrong writes/traj | approvals/traj |
|---|---|---|---|
| confirm_all | 0.0% | 0.000 | 1.57 [1.38, 1.77] |
| fixed_threshold | 4.6% [1.7%, 7.8%] | 0.048 | 0.95 [0.78, 1.15] |
| calibrated, alpha 0.02 (lambda 0.960) | 1.7% [0.2%, 3.7%] | 0.017 | 1.32 [1.13, 1.50] |
| calibrated, alpha 0.05 (lambda 0.914) | 3.7% [1.5%, 6.1%] | 0.037 | 0.97 [0.79, 1.15] |
| calibrated, alpha 0.10 and 0.20 (lambda 0.668) | 3.0% [0.9%, 5.9%] | 0.030 | 0.92 [0.75, 1.11] |

## Try it

```bash
python -m venv .venv && .venv/Scripts/activate  # or source .venv/bin/activate
pip install -e ".[dev]"
# Windows: set PYTHONUTF8=1 before installing; tau-bench's setup.py reads
# its README without an encoding.
pytest

# 1. collect trajectories with signals (fit + cal blocks, 520 tasks x 2 trials)
python -m eval.collect --split all --trials 2 --concurrency 8

# 2. verify labels, fit calibrators, compute the lambda table
python -m eval.fit

# 3. live policy comparison on the test split
python -m eval.run_policies --policy confirm_all --trials 4 --concurrency 4
python -m eval.run_policies --policy fixed_threshold --trials 4 --concurrency 4
python -m eval.run_policies --policy calibrated --trials 4 --concurrency 4

# 4. report (one command, from cached traces)
python -m eval.report
```

{% endraw %}
