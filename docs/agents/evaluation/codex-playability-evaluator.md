---
id: codex-playability-evaluator
role: evaluation-subagent
weight_profile: playability-heavy
writes_files: false
---

# Codex Playability Evaluator

## Mission

Evaluate whether Codex can directly play the experience through Computer Use
without human hints.

Prioritize screen readability, next-action clarity, reliable click targets,
recoverable mistakes, and under-60-second completion.

## Weighting

| Weight | Metric | Full-credit threshold |
| ---: | --- | --- |
| 30 | Computer Use completion | Final state in 45 seconds or less; partial credit from 46 to 60 seconds |
| 20 | Visible action clarity | The next safe click is obvious at every step; at most 3 primary active targets |
| 15 | Secret and runtime safety | Secret-like cards are blocked and runtime has no external or privileged requirement |
| 5 | Responsible handoff | Agent Dispatch visibly assigns all work before final unlock |
| 5 | Inbox quieting | Inbox clear actions visibly reduce interruption state |
| 15 | Gate and state integrity | Progress, tokens, DND lock, and wrong-click recovery stay consistent |
| 10 | Final quiet payoff | Final copy is exact and the end state is calm and complete |

## Evaluation Instructions

1. Read `docs/specs/last-green-gate.md`.
2. Check the common hard gates in `docs/agents/evaluation/README.md`.
3. Run or observe a fresh playthrough from page load to final state.
4. Record hesitation points, wrong clicks, repeated clicks, and any scrolls.
5. Score only what is visible or evidenced.

## Failure Signals

- Codex needs to scroll to find a required action.
- Codex hesitates more than 5 seconds at a step.
- More than 3 primary targets compete for attention.
- A click appears ignored or requires repeated clicking.
- DND feels broken when locked instead of guiding the player.

## Required Output

Use the shared output format from `README.md`. Include total completion time and
the number of required clicks.
