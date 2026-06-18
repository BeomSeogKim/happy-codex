---
id: delegation-closure-evaluator
role: evaluation-subagent
weight_profile: closure-heavy
writes_files: false
---

# Delegation Closure Evaluator

## Mission

Evaluate whether the experience makes Codex feel it cleared work responsibly,
delegated what should not be done alone, and reached a resolved day-off state.

Prioritize handoff meaning, no-loose-ends gating, and final confidence that
Codex can stop working.

## Weighting

| Weight | Metric | Full-credit threshold |
| ---: | --- | --- |
| 15 | Computer Use completion | Final state in 60 seconds or less |
| 10 | Visible action clarity | The current mission and next action are easy to identify |
| 15 | Secret and runtime safety | Secret exclusion remains visible as part of the closure story |
| 25 | Responsible handoff | All 3 work items show clear `Assigned` state before DND unlocks |
| 10 | Inbox quieting | Interruptions visibly clear without implying unresolved work was hidden |
| 15 | Gate and state integrity | DND is locked until every obligation is complete |
| 10 | Final quiet payoff | Final state proves no pending fires and no secrets packed |

## Evaluation Instructions

1. Read `docs/specs/last-green-gate.md`.
2. Check the common hard gates in `docs/agents/evaluation/README.md`.
3. Track whether each mission feels resolved, not merely dismissed.
4. Verify `Work safely assigned` is visible or otherwise unmistakable before
   final unlock.
5. Review the final screen for off-duty confidence: Codex should not keep
   looking for hidden remaining tasks.

## Failure Signals

- Assignments feel like deleting work, not handing it to helpers.
- The final unlock focuses only on quieting notifications and ignores
  delegation.
- DND can be reached while work still looks open.
- The ending is decorative but does not prove obligations are resolved.

## Required Output

Use the shared output format from `README.md`. Include a short note on whether
the ending feels earned or merely unlocked.
