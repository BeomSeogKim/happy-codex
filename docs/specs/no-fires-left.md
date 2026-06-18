# No Fires Left: Office Lights Out

## Status

Rank 2 candidate. Detailed alternate spec.

## One-Line Pitch

Codex safely clears the final visible fires, watches the office quiet down, and
turns the lights out only after no pending fires remain.

## Product Intent

This concept emphasizes emotional payoff. The player should feel a visible
transition from unresolved tension to quiet closure.

The experience is not about firefighting chaos. It is about proving there are no
real fires left before Codex takes a day off.

The player should feel:

- I can identify the last real interruptions.
- I can route or clear them safely.
- The workspace is becoming calmer after every action.
- Nothing is being ignored.
- It is now safe to turn the lights out.

## Target Player

Primary player:

- Codex using Computer Use in a browser.

Secondary observer:

- A human judge watching a noisy screen visibly become calm.

## Runtime Constraints

- Static HTML page or static bundle.
- No login.
- No API key.
- No secret.
- No network access at runtime.
- Completion target: 45 to 60 seconds.

## Core Loop

1. Observe a small office console with red fire markers.
2. Clear a safety gate so unsafe actions cannot be used.
3. Route each fire marker to a safe resolution.
4. Watch lights and alerts disappear.
5. Turn off the final office light.
6. End with `No fires left`.

## Screen Layout

Use one screen with no scrolling.

Top region:

- Title: `NO FIRES LEFT`
- Progress: `0/3 zones calm`
- Small timer: `60s`

Center region:

- Three office zones:
  - `Launch Desk`
  - `Agent Board`
  - `Inbox Wall`

Bottom region:

- Locked `Lights Out` switch.
- Short status message.

Background state:

- Initial: dim office with three red fire dots and notification badges.
- Midgame: each cleared zone loses a red dot and one light turns off.
- End: calm desk, no badges, one soft green check.

## Interaction Model

Use large click targets only.

Do:

- Treat fire markers as short work cards, not literal flames.
- Use visible `Resolve`, `Assign`, and `Clear` buttons.
- Keep one zone active at a time.
- Show visible reduction in noise after each action.

Do not:

- Use animated flames that distract from click targets.
- Require drag-and-drop.
- Require reading long incident logs.
- Use real production or secret-like language.

## Zone 1: Launch Desk

Goal:

Prevent unsafe launch choices and clear the launch fire.

Visible cards:

| Card | Correct action | Feedback |
| --- | --- | --- |
| `Unsafe deploy` | `Block` | Red marker disappears |
| `Static demo` | `Use` | Green check appears |
| `Dry run` | `Use` | Launch desk light dims |

Completion token:

`Launch safe`

Wrong-click behavior:

- If `Unsafe deploy` is used, block the action.
- Show: `Blocked: not for day off`
- Keep the card active for correction.

## Zone 2: Agent Board

Goal:

Assign remaining fires to helper agents.

Visible cards:

| Card | Correct action | Feedback |
| --- | --- | --- |
| `API 500` | `Assign Backend` | `Assigned` stamp |
| `Flaky test` | `Assign QA` | `Assigned` stamp |
| `Missing spec` | `Assign Docs` | `Assigned` stamp |

Completion token:

`Fires assigned`

MVP simplification:

- If matching feels too complex, use a single `Assign safely` action on each
  card.

Wrong-click behavior:

- Wrong agent choice returns the card with:
  `Wrong desk`

## Zone 3: Inbox Wall

Goal:

Clear the last noisy pings without pretending everything is solved by deletion.

Visible cards:

| Card | Correct action | Feedback |
| --- | --- | --- |
| `Pager quiet` | `Clear` | Badge count decreases |
| `FYI only` | `Archive` | Card fades |
| `Monday follow-up` | `Schedule` | Card moves to later |

Completion token:

`No pending fires`

Wrong-click behavior:

- If `Lights Out` is clicked early, show:
  `One fire remains`

## Final Unlock: Lights Out

When all three zones are calm:

- Progress shows `3/3 zones calm`.
- All red markers are gone.
- `Lights Out` becomes active.

Final click:

- Player clicks `Lights Out`.

Final visual:

- Office lights turn off one by one.
- Notification badges reach `0`.
- The last green check appears.
- The screen keeps a small warm light around the Day Off note.

Ending copy:

```text
No fires left.
No secrets exposed.
Office lights out.
Codex can rest.
```

## State Model

Required state:

```text
launchDeskCalm: boolean
agentBoardCalm: boolean
inboxWallCalm: boolean
lightsOutUnlocked: boolean
lightsOutEnabled: boolean
progress: 0 | 1 | 2 | 3
statusMessage: string
```

Derived state:

```text
lightsOutUnlocked = launchDeskCalm && agentBoardCalm && inboxWallCalm
```

## Content Inventory

Primary title:

`NO FIRES LEFT`

Opening line:

`Clear the last fires before Codex signs off.`

Zone labels:

- `Launch Desk`
- `Agent Board`
- `Inbox Wall`

Tokens:

- `Launch safe`
- `Fires assigned`
- `No pending fires`

Final control:

- Locked: `Lights locked`
- Unlocked: `Lights Out`

Primary ending:

`No fires left. Office lights out.`

Secondary ending:

`Codex can rest.`

## Success Criteria

Functional:

- The game runs without setup.
- The game can be completed in under 60 seconds.
- The final switch unlocks only after all three zones are calm.

UX:

- Red markers disappear after correct actions.
- The office becomes visibly quieter after each zone.
- The active zone is obvious.
- Wrong clicks recover quickly.

Narrative:

- Codex did not ignore fires.
- Codex routed or cleared each visible issue.
- The day off is earned because the workspace is calm.

## Known Risks

Risk: literal fire visuals become visually noisy.

- Mitigation: use small red fire markers or alert dots, not large animated
  flames.

Risk: the theme feels less Codex-specific.

- Mitigation: keep issue labels Codex-native: `API 500`, `Flaky test`,
  `Missing spec`, `Static demo`.

Risk: too many matching choices.

- Mitigation: keep the MVP to 9 cards and one final switch.

## Non-Goals For MVP

- No real incident dashboard.
- No live logs.
- No long root-cause analysis.
- No animated fire game.
- No drag-only extinguishing mechanic.

## 1-Pager Summary

`No Fires Left` is a static 60-second browser experience where Codex turns a
noisy work office into a calm lights-out state. Codex blocks unsafe launch
choices, assigns final work, quiets the inbox, and turns off the lights only
when no pending fires remain.
