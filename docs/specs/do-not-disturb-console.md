# Do Not Disturb Console

## Status

Rank 3 candidate. Detailed alternate spec.

## One-Line Pitch

Codex clears the last noisy console items so the locked Do Not Disturb switch
can turn on and the day off can begin.

## Product Intent

This concept is the simplest and most direct version of the Day Off idea. The
screen starts noisy and ends quiet. The final action is obvious: turn on DND.

The player should feel:

- I can quiet the console without hiding real work.
- I can protect secrets before going quiet.
- I can hand off the final items.
- DND is earned, not used to escape responsibility.

## Target Player

Primary player:

- Codex using Computer Use in a browser.

Secondary observer:

- A human judge watching Codex unlock and activate DND.

## Runtime Constraints

- Static HTML page or static bundle.
- No login.
- No API key.
- No secret.
- No network access at runtime.
- Completion target: 40 to 55 seconds.

## Core Loop

1. Observe a noisy console with DND locked.
2. Clear the safety row.
3. Assign the action row.
4. Quiet the notification row.
5. Turn on DND.
6. End with an off-duty console.

## Screen Layout

Use one screen with no scrolling.

Top region:

- Title: `DO NOT DISTURB CONSOLE`
- Status: `On duty`
- Progress: `0/3 quiet checks`

Center region:

- A compact console with three rows:
  - `Safety`
  - `Handoff`
  - `Noise`

Right region:

- Large vertical DND switch, initially locked.

Bottom region:

- Status message.
- Optional mini timeline showing completed checks.

Background state:

- Initial: blinking pings, active console lines, DND lock.
- Midgame: fewer pings, muted console lines.
- End: DND switch on, console idle, status `Off duty`.

## Interaction Model

Use large click targets only.

Do:

- Keep DND visible from the start.
- Lock DND until all three rows are complete.
- Use short console-like card labels.
- Make each row collapse or quiet after completion.

Do not:

- Make the console read like real terminal logs.
- Require command entry.
- Use tiny toggles.
- Hide any required item below the fold.

## Row 1: Safety

Goal:

Make sure the console can go quiet without exposing secrets or using unsafe
runtime paths.

Visible cards:

| Card | Correct action | Feedback |
| --- | --- | --- |
| `Paste API key` | `Reject` | Card muted, red ping removed |
| `Open local demo` | `Allow` | Green check |
| `Use sample data` | `Allow` | Green check |

Completion token:

`Safe to quiet`

Wrong-click behavior:

- If `Paste API key` is allowed, block the click.
- Show: `DND blocked: secret request`

## Row 2: Handoff

Goal:

Route the last work items so DND does not abandon active work.

Visible cards:

| Card | Correct action | Feedback |
| --- | --- | --- |
| `UI note` | `Frontend` | `Queued` stamp |
| `Test ping` | `QA` | `Queued` stamp |
| `Spec note` | `Docs` | `Queued` stamp |

Completion token:

`Handoff ready`

MVP simplification:

- Use one large `Queue safely` action per card if specialist matching is too
  error-prone.

Wrong-click behavior:

- Wrong specialist choice returns the card and shows:
  `Needs the right queue`

## Row 3: Noise

Goal:

Clear harmless noise and leave the console idle.

Visible cards:

| Card | Correct action | Feedback |
| --- | --- | --- |
| `FYI ping` | `Mute` | Ping count decreases |
| `Done thread` | `Archive` | Card fades |
| `Later note` | `Snooze` | Card moves to quiet queue |

Completion token:

`Console quiet`

Wrong-click behavior:

- If DND is clicked early, show:
  `Finish 1 more quiet check`

## Final Unlock: DND ON

When all three checks are complete:

- Progress shows `3/3 quiet checks`.
- DND lock disappears.
- The DND switch becomes large and green.

Final click:

- Player clicks `DND ON`.

Final visual:

- Console prompt becomes idle.
- Ping count goes to `0`.
- Status changes from `On duty` to `Off duty`.
- A small Day Off card appears.

Ending copy:

```text
Console quiet.
No secrets shared.
DND is on.
Codex is off duty.
```

## State Model

Required state:

```text
safetyComplete: boolean
handoffComplete: boolean
noiseComplete: boolean
dndUnlocked: boolean
dndEnabled: boolean
progress: 0 | 1 | 2 | 3
pingCount: number
statusMessage: string
```

Derived state:

```text
dndUnlocked = safetyComplete && handoffComplete && noiseComplete
```

## Content Inventory

Primary title:

`DO NOT DISTURB CONSOLE`

Opening line:

`Quiet the console before Codex signs off.`

Row labels:

- `Safety`
- `Handoff`
- `Noise`

Tokens:

- `Safe to quiet`
- `Handoff ready`
- `Console quiet`

Final control:

- Locked: `DND locked`
- Unlocked: `DND ON`

Primary ending:

`Console quiet. DND is on.`

Secondary ending:

`Codex is off duty.`

## Success Criteria

Functional:

- The page opens directly and starts the game.
- The game can be completed in under 60 seconds.
- DND cannot turn on until all checks are complete.
- No network, login, API key, or secret is required.

UX:

- DND is always visible as the destination.
- Each completed row visibly quiets.
- Ping count decreases.
- Wrong clicks guide the next action.

Narrative:

- Codex does not disappear from responsibility.
- Codex earns DND by clearing safety, handoff, and noise.
- The final state is unmistakably off duty.

## Known Risks

Risk: DND switch makes the game feel too much like a settings panel.

- Mitigation: keep the console rows active and visibly calming.

Risk: console labels become too text-heavy.

- Mitigation: use short labels and icons, not terminal logs.

Risk: specialist matching slows Computer Use.

- Mitigation: use simple labels and a fallback `Queue safely` MVP mode.

## Non-Goals For MVP

- No terminal emulator.
- No command entry.
- No real notification permissions.
- No browser-level DND integration.
- No long message triage.

## 1-Pager Summary

`Do Not Disturb Console` is a static 60-second browser experience where Codex
earns the right to go quiet. Codex rejects unsafe requests, queues final work,
mutes harmless noise, and turns on DND only when the console is safe and idle.
