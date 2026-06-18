# Top Three Candidate Specs

## Purpose

This document preserves the three strongest project directions for the
Codex's Day Off challenge.

The current selected implementation candidate is still:

1. `Last Green Gate: Codex's Day Off Clearance`

The other two candidates are kept as detailed alternates because they scored
highly on emotional payoff and Computer Use clarity.

## Scoring Criteria

Candidates were compared on:

- 60-second Computer Use success probability
- clarity of next action
- Codex-centered emotional payoff
- safety and no-secret alignment
- visual state change
- 1-pager pitch strength
- implementation simplicity

## Ranking

| Rank | Project | Main strength | Main risk | Spec |
| --- | --- | --- | --- | --- |
| 1 | `Last Green Gate` | Best balance of safety, handoff, quiet inbox, and final unlock | Can feel like a checklist if visuals are weak | [last-green-gate.md](last-green-gate.md) |
| 2 | `No Fires Left` | Strongest emotional payoff through visible calming and lights-out closure | Fire metaphor can become noisy or visually busy | [no-fires-left.md](no-fires-left.md) |
| 3 | `Do Not Disturb Console` | Clearest final action and most direct "Codex can rest" signal | Can look like a settings panel if the gameplay is too thin | [do-not-disturb-console.md](do-not-disturb-console.md) |

## Rank 1: Last Green Gate

Summary:

Codex gets one last green check by leaving secrets behind, assigning the final
work, quieting the inbox, and opening the Day Off gate.

Why it scored highest:

- It combines the best mechanics from the other candidates.
- It has a clear three-token progression.
- It supports a strong final unlock without needing many cards.
- It keeps safety, delegation, and relief in one compact loop.

Recommended use:

- First implementation.
- Primary 1-pager direction.
- Baseline for UX, copy, and verification gates.

## Rank 2: No Fires Left

Summary:

Codex turns a noisy, alert-filled workspace into a calm, lights-out office by
clearing the final visible fires.

Why it scored highly:

- The emotional payoff is immediate and visual.
- Red alerts disappearing are easy for Codex and judges to understand.
- The phrase `No fires left` is compact and memorable.

Recommended use:

- Alternate implementation if the team wants a stronger emotional theme.
- Visual treatment inspiration for the final state of `Last Green Gate`.

## Rank 3: Do Not Disturb Console

Summary:

Codex clears the final console tasks so the locked DND switch can turn on.

Why it scored highly:

- The final action is obvious.
- The core state is simple: noisy console to quiet console.
- It gives Codex a direct "I am off duty now" moment.

Recommended use:

- Alternate implementation if the team wants the simplest possible end-state.
- Interaction pattern inspiration for `Last Green Gate` final unlock.

## Shared Rules Across All Three

- Static web demo or static HTML bundle.
- No login, API key, secret, external account, or runtime network requirement.
- Under 60 seconds.
- One screen preferred.
- No drag-only interactions.
- No typing.
- No hidden controls.
- Large click targets.
- Recoverable wrong clicks.
- Final state must be calmer than initial state.
