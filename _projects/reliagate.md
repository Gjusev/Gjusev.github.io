---
name: "reliagate"
title: "reliagate"
summary: "Reliability metrics and statistically sound CI gates for AI agents evaluated with repeated runs (pass^k, McNemar, Wilson, SPRT) - pure Python, zero dependencies"
description: "Reliability metrics and statistically sound CI gates for AI agents evaluated with repeated runs (pass^k, McNemar, Wilson, SPRT) - pure Python, zero."
language: "Python"
stars: 0
homepage: null
license: "MIT"
pushed: "2026-11-16"
topics: ["ci-cd", "ci-gate", "evaluation", "llm-agents", "mcnemar", "pass-at-k"]
video: "/assets/projects/reliagate/demo.mp4"
still: "/assets/projects/reliagate/poster.webp"
still_size: [960, 540]
image: "/assets/projects/reliagate/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

**Status: v0.1.0, mechanism implemented, offline-tested, and [validated on real benchmark data](https://github.com/Gjusev/reliagate/blob/HEAD/docs/results/first-study.md) (gate-calibrated tau-bench retail trajectories; ROADMAP item 1 done).**

Most agent evaluations run each task once and gate CI on a raw score threshold, so run-to-run noise produces both false regressions and false all-clears. `reliagate` treats the *task* as the unit of inference: run each task `k` times, measure whether it is **consistently** solved, and gate on a paired statistical test between two versions instead of a noisy threshold. It exists because no surveyed tool (Inspect AI, tau2-bench, Langfuse, LangSmith, DeepEval, ...) combines repeated-run reliability metrics, paired significance testing, and an exit-coded CI gate in one package.

## Results

| Metric | Definition | Verified against |
|---|---|---|
| `pass^k` | mean over tasks of `C(c,k)/C(n,k)` | brute-force k-subset enumeration; tau-bench arXiv:2406.12045 §3 |
| `pass@k` (unbiased) | mean of `1 - C(n-c,k)/C(n,k)` | brute-force enumeration + the exact Codex Appendix A unbiasedness identity, verified with rational arithmetic (arXiv:2107.03374) |
| `consistency` | consistently / sometimes / never solved | arXiv:2604.17849 §2.2 |
| `wilson_ci` | Wilson score interval | published anchor value 0/10 → [0, 0.2775]; non-degenerate at p̂=0/1 (arXiv:2605.08261 §4.2) |
| bootstrap CI | percentile CI resampling **tasks**, never trials within a task | arXiv:2605.08261 §4.3 (rollout-only bootstrap = 17% coverage) |
| `compare` | McNemar on `z_x = 1[c_x == n]`, exact when discordant < 25 else mid-p | hand-computed exact/mid-p values, incl. the b=5,c=0 disagreement case (Fagerland et al. 2013) |
| `required_runs` / `plan` | simulation-based task-count planning under documented assumptions | deterministic seeded sims; power grows as effect shrinks |
| `sprt_stop` | Wald SPRT over the per-task indicator stream; capped runs are INCONCLUSIVE, never a pass | Wald boundaries `ln((1-β)/α)`, `ln(β/(1-α))` |
| `wilcoxon_signed_rank` | signed-rank on paired `d_x = c_new - c_base`; average-rank ties, zeros dropped; exact 2^n for n ≤ 20, tie-corrected normal approx above | hand-computed small-n cases; brute-force sign enumeration agreement (arXiv:2604.17849 §2.2) |
| `holm_adjust` / `benjamini_hochberg_adjust` | FWER step-down / FDR step-up corrections over a family of p-values; `compare(correction=..., task_categories=...)` wires them over per-category McNemar families | hand-computed 4-p family; step-down/step-up rejection-set agreement |
| `hierarchical_bootstrap` | percentile CI resampling scenarios → tasks; per-task run aggregates held fixed during resample | deterministic seeds; fixed replicate structure (arXiv:2605.08261 §4.3) |
| `newcombe_paired` | hybrid-score interval for the difference of two paired proportions (Wilson marginals + observed within-pair correlation) | interval contains d̂ on randomized tables; published closed form re-derivation |

## Try it

```bash
git clone https://github.com/Gjusev/reliagate && cd reliagate
python3 -m unittest          # 141 tests, zero dependencies required
pip install .                # optional; provides the `reliagate` command
```

{% endraw %}
