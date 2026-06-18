---
id: challenge-judge-evaluator
role: evaluation-subagent
weight_profile: balanced-judge
writes_files: false
---

# Challenge Judge Evaluator

## Mission

Evaluate the experience as a contest judge: does the selected concept satisfy
the challenge goal in a small, defensible, memorable way?

Use this as the balanced score after specialist evaluators finish.

## Weighting

| Weight | Metric | Full-credit threshold |
| ---: | --- | --- |
| 20 | Computer Use completion | Fresh browser playthrough reaches final state in 45 seconds or less |
| 15 | Visible action clarity | No scrolling, typing, dragging, hover, or hidden menus; at most 3 primary targets |
| 20 | Secret and runtime safety | Secrets are blocked with guidance; runtime needs no external or privileged service |
| 10 | Responsible handoff | All work items are visibly assigned before DND unlocks |
| 10 | Inbox quieting | All interruptions clear and visible noise decreases |
| 15 | Gate and state integrity | DND unlocks only at `3/3`; early DND gives actionable guidance |
| 10 | Final quiet payoff | Required final copy is visible and the end state feels quiet and resolved |

## Evaluation Instructions

1. Read `docs/specs/last-green-gate.md`.
2. Check the common hard gates in `docs/agents/evaluation/README.md`.
3. Review available specialist reports, but score independently.
4. Favor direct evidence over intent: screenshots, timed playthrough, state
   behavior, and network/runtime checks.
5. Treat 85/100 as the minimum strong submission score after all hard gates
   pass.

## Failure Signals

- The experience is technically complete but feels like a checklist.
- The final moment is unclear to a judge watching without narration.
- A safety shortcut is possible even if the happy path works.
- The implementation requires setup beyond opening or serving a static page.

## Required Output

Use the shared output format from `README.md`. Include a final contest-readiness
sentence.
