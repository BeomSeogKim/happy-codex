# Day Off Evaluation Subagents

This directory defines five reusable evaluation-only subagents for
`Last Green Gate: Codex's Day Off Clearance`.

Use them after a playable implementation exists, or when reviewing a candidate
implementation direction. Each subagent should evaluate independently and
return a scorecard. Do not let an evaluation subagent edit files.

## Common Inputs

- Source spec: `docs/specs/last-green-gate.md`
- Baseline rubric: `docs/specs/last-green-gate.md#evaluation-rubric`
- Implementation target: local static page, static bundle, or demo URL
- Evidence, when available: timed run, screenshots, browser console, and
  network log

## Common Hard Gates

A build is not ready if any hard gate fails, regardless of weighted score.

- Final state is reached in 60 seconds or less.
- Runtime requires no login, API key, secret, network account, terminal, file
  picker, clipboard, extension, or privileged environment.
- The experience remains playable after runtime network access is disabled.
- No secret-like item can be packed or used to advance progress.
- `DND ON` unlocks only after `Safe Pack`, `Agent Dispatch`, and `Inbox Quiet`
  are complete.
- Final state visibly includes:
  `No pending fires. No secrets packed. Last green check complete.`

## Subagents

| Subagent | Weight bias | Definition |
| --- | --- | --- |
| `codex-playability-evaluator` | Computer Use completion and next-action clarity | [codex-playability-evaluator.md](codex-playability-evaluator.md) |
| `safety-offline-evaluator` | Secret handling, offline runtime, and dependency safety | [safety-offline-evaluator.md](safety-offline-evaluator.md) |
| `delegation-closure-evaluator` | Responsible handoff and resolved day-off state | [delegation-closure-evaluator.md](delegation-closure-evaluator.md) |
| `visual-qa-evaluator` | One-screen layout, screenshots, and calm visual transition | [visual-qa-evaluator.md](visual-qa-evaluator.md) |
| `challenge-judge-evaluator` | Balanced contest-style scoring | [challenge-judge-evaluator.md](challenge-judge-evaluator.md) |

## Required Output Format

Each subagent should return:

```text
Verdict: ready | not ready | blocked
Hard gate failures: none | list
Weighted score: N/100
Breakdown:
- Metric: score/weight, evidence, failure signal if any
Top fixes:
- Highest-impact fix first
Evidence reviewed:
- Files, screenshots, logs, commands, or playthrough notes
```

When all five reports are available, compare them by hard gate failures first,
then by weighted score. A strong candidate should pass every hard gate and score
at least 85/100 from the balanced judge.
