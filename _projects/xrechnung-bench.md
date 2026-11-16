---
name: "xrechnung-bench"
title: "xrechnung-bench"
summary: "Open benchmark: local vision models -> valid XRechnung 3.0.2, checked with the official KoSIT validator"
description: "Open benchmark: local vision models -> valid XRechnung 3.0.2, checked with the official KoSIT validator"
language: "Python"
stars: 0
homepage: null
license: "MIT"
pushed: "2026-11-16"
topics: ["benchmark", "document-ai", "e-invoice", "einvoice", "en16931", "german"]
video: "/assets/projects/xrechnung-bench/demo.mp4"
still: "/assets/projects/xrechnung-bench/poster.webp"
still_size: [960, 540]
image: "/assets/projects/xrechnung-bench/og.jpg"
diagram: null
diagram_size: null
figures: []
---
{% raw %}
## What it is

An open benchmark measuring whether **local vision models** can convert German
invoices (PDF/scans) into **valid XRechnung 3.0.2**: checked with the official
**KoSIT validator**, scored per EN 16931 business term (BT), with arithmetic
consistency and an abstention/coverage protocol.

**Author:** Youssef Ouhaghi · License: MIT · Status: v0.1, offline-tested, no results yet

## How it works

Existing document-AI benchmarks measure markdown fidelity or generic field QA. None of them closes the loop to **legal usability**: a German e-invoice is only
usable if the official KoSIT validator accepts the reconstructed XML. This
benchmark ties vision quality to that check:

1. **BT-keyed field accuracy**: exact match per EN 16931 field (amounts with
   ±0.01 Decimal tolerance, ISO dates, IBAN, VAT ids), 360 synthetic documents
   with exact ground truth derived from the source XML.
2. **KoSIT pass rate (signature metric)**: model output is structured JSON;
   a deterministic builder turns it into XRechnung CII XML; the official
   validator (v1.6.3 + configuration release 2026-08-31) accepts or rejects it.
3. **Arithmetic consistency**: line sums, VAT math, totals chain (BR-CO-10…16
   equivalents), computed from the model's own numbers, no ground truth needed.
4. **Abstention protocol**: models may answer `null` / `"not_found"` /
   `{"value": x, "uncertain": true}`; we report **accuracy-on-answered vs
   coverage** and hallucination rate, never raw accuracy alone.

## Results

| Component | State |
|---|---|
| Corpus generator (360 docs, deterministic seeds) | ✅ implemented, offline-tested (XML + ground truth) |
| KoSIT gate in the generate pipeline | ✅ implemented, **skipped on this box (no Java), runs on the main PC** |
| PDF rendering + scan degradations (T0, T3) | ✅ implemented, reportlab/Pillow optional, skipped offline, pure-python PNG fallback |
| Model adapters (6 local + 1 API reference) | ✅ interface + stubs with explicit GPU-dep errors; **no inference run yet** |
| Scoring (fields, arithmetic, abstention, leaderboard) | ✅ implemented and unit-tested |
| **Actual model runs / leaderboard numbers** | ❌ **not yet, runs happen on GPU, see docs/MAIN-PC.md** |

## Try it

```bash
git clone https://github.com/Gjusev/xrechnung-bench && cd xrechnung-bench
python3 -m unittest discover -s tests      # offline test suite, stdlib only
./xbench models                            # list adapters
./xbench generate                          # 360-doc corpus: XML + ground truth + manifest
./xbench run --model fake                  # canned-JSON adapter, offline smoke
./xbench score                             # leaderboard (real models need GPU)
```

{% endraw %}
