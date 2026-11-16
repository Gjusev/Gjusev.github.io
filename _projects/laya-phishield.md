---
name: "laya-phishield"
title: "laya-phishield"
summary: "Explainable phishing email detection: atomic semantic signals from a local System 1 decision model plus deterministic header/URL checks, combined by logistic regression"
description: "Explainable phishing email detection: atomic semantic signals from a local System 1 decision model plus deterministic header/URL checks, combined by logistic."
language: "Python"
stars: 1
homepage: null
license: "Apache-2.0"
pushed: "2026-09-30"
topics: ["email-security", "explainable-ai", "fraud-detection", "laya", "phishing-detection"]
video: null
still: "/assets/projects/laya-phishield/still-social-preview.webp"
still_size: [1280, 640]
image: "/assets/projects/laya-phishield/og.jpg"
diagram: "/assets/projects/laya-phishield/diagram-how-it-works-phish.webp"
diagram_size: [747, 1600]
figures: []
---
{% raw %}
## What it is

Most phishing classifiers answer one broad question: *“Is this phishing?”* That can produce a useful score, but it gives an analyst little evidence to review.

`laya-phishield` decomposes that decision into eight narrow yes/no signals. A deterministic pre-pass catches header and URL artifacts, [laya](https://github.com/NandhaKishorM/laya) evaluates the semantic signals locally in one forward pass, and a logistic head combines everything into an auditable verdict.

## How it works

- **Explainable by construction.** Each verdict includes signal probabilities, deterministic flags, and the features that contributed most to the score.
- **Local and inexpensive.** Detection runs on a local laya decision model; email content does not need to be sent to a hosted LLM API.
- **Harder to fool with obfuscation.** Header, domain, punycode, homoglyph, SPF, and DKIM checks complement semantic analysis.
- **Operationally flexible.** Scan `.eml`, `.mbox`, or `.jsonl` files, call the HTTP API, or use the Streamlit demo.
- **Measured honestly.** Near-duplicates are removed before a per-class temporal split, and the documented tail-recall limitation is kept visible.

## Results

| Signal | What it asks |
|---|---|
| `asks_credentials` | Does the email ask the recipient to confirm a password or account login? |
| `urgency_pressure` | Does it demand immediate action or threaten consequences for delay? |
| `payment_gift_request` | Does it request money, gift cards, a transfer, or cryptocurrency? |
| `brand_impersonation` | Does it borrow a known brand while using an unrelated sender domain? |
| `requests_pii` | Does it request identity, card, or other sensitive personal data? |
| `too_good_to_be_true` | Does it promise an unearned prize, inheritance, or windfall? |
| `suspicious_instructions` | Does it ask the recipient to keep secrets or bypass normal procedure? |
| `external_link_risk` | Does it point to a host unrelated to the claimed sender or brand? |

## Try it

```bash
uv tool install laya-phishield        # or: uv pip install laya-phishield
```

{% endraw %}
