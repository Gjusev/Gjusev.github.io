---
title: A small model that refuses
description: A 260M visual model with calibrated odds and a validated refusal gate. On held-out real screenshots it scores 0.839; a model 15× larger scores 0.731 zero-shot.
image: /assets/projects/MK-SH-V/og.jpg
---

Big models guess with confidence. For a decision that leads to an action, the guess is the expensive part: the wrong write that went through because nothing said stop. MK-SH-V is my attempt at the other end of that trade. It is a 260M visual decision model that returns calibrated probabilities, a choice, and a refusal when its confidence sits below a gate whose risk was validated before release.

## What it does

Hand it a document or a screenshot, a question and the valid options. One encoder pass reads pixels and text together, each option is scored by a shared head, and the softmax runs over the valid options only. A photographed receipt asked "is the total at least 45.662 IDR?" comes back true at 0.978. Asked which of three ranges the total (302.016) falls into, it picked the wrong bin at 0.757, cleared the gate, and answered wrong. On real receipts about a quarter of the answers the gate lets through are wrong, and I published that too.

## The gate

The gate is a threshold on confidence, fitted on a calibration split by a rule frozen in advance: the smallest threshold whose 95% Clopper-Pearson upper bound on selective risk stays within a 5% budget. Frozen in advance means I could not tune it after seeing the test. The value it ships with (0.55) was fixed by protocol, not by taste. On the held-out synthetic test it answers 98.3% of the cases with a 3.2% risk bound.

## Small against big

On held-out real screenshots, MK-SH-V scores 0.839. A roughly 15× larger open model, run zero-shot on the same test, scores 0.731. A small trained model with a real calibration pass beats a much bigger generalist on a narrow job, and unlike the generalist it can say "below my gate, this one is yours" and hand the decision back.

The weights, the inference policy and a live demo (with a small booth game where every refusal comes from the model's real probabilities) are linked from the [MK-SH-V](https://github.com/Gjusev/MK-SH-V) repo.
