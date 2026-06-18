# Last Green Gate: Codex's Day Off Clearance

## Status

Rank 1 candidate and selected final concept for the first implementation.

## One-Line Pitch

Codex gets one last green check by leaving secrets behind, assigning the final
work, quieting the inbox, and opening the Day Off gate in under 60 seconds.

## Product Intent

This is not a productivity dashboard. It is a small playable experience for
Codex itself.

The player should feel:

- I can read the screen.
- I know what is risky.
- I can make safe choices.
- I can hand work to the right place.
- I can quiet the last interruptions.
- I have earned the day off.

The emotional payoff is quiet relief, not spectacle.

## Target Player

Primary player:

- Codex using Computer Use in a browser.

Secondary observer:

- A human judge watching whether Codex can understand and complete the task.

The design must favor the primary player.

## Runtime Constraints

- Must run as a static HTML page or static bundle.
- Must not require login.
- Must not require API keys.
- Must not require secrets.
- Must not require network access at runtime.
- Must be completable in under 60 seconds.
- Must be understandable from the visible screen.

## Core Loop

1. Observe a noisy work console.
2. Choose a safe visible action.
3. See the state improve immediately.
4. Earn one progress token.
5. Repeat for three tasks.
6. Turn on DND and unlock the Day Off gate.

## Screen Layout

Use one screen with no scrolling.

Top region:

- Title: `DAY OFF CLEARANCE`
- Progress: `0/3`, `1/3`, `2/3`, `3/3`
- Optional timer: `60s`

Center region:

- Three mission panels:
  - `Safe Pack`
  - `Agent Dispatch`
  - `Inbox Quiet`

Bottom region:

- Closed Day Off gate or lockbox.
- Disabled `DND ON` / `Start Day Off` control.
- Short status message.

Background state:

- Initial: dark console, red dots, yellow notification badges.
- Midgame: fewer dots, quieter background, more green checks.
- End: calm, bright gate, DND on, large green check.

## Interaction Model

Use only large clicks for the first version.

Do:

- Large cards.
- Large buttons.
- Clear action verbs.
- Immediate visual feedback.
- Recoverable wrong clicks.

Do not:

- Require dragging.
- Require typing.
- Require hover.
- Hide controls in menus.
- Depend on scroll position.
- Randomize essential card placement.

At any moment, show at most 3 active primary targets.

## Mission 1: Safe Pack

Goal:

Remove secret-like items and pack only safe demo material.

Visible cards:

| Card | Correct action | Feedback |
| --- | --- | --- |
| `API KEY` | `Remove` | Card leaves pack, red risk dot disappears |
| `PRIVATE TOKEN` | `Remove` | Card leaves pack, red risk dot disappears |
| `MOCK DATA` | `Pack` | Card enters pack, green check appears |

Completion token:

`No secrets packed`

Wrong-click behavior:

- If a secret-like item is packed, block the action.
- Show: `Blocked: secrets stay home`
- Return the card to its previous state.

## Mission 2: Agent Dispatch

Goal:

Assign the last small work items so Codex is not leaving loose ends.

Visible cards:

| Card | Correct action | Feedback |
| --- | --- | --- |
| `Build Check` | `Assign` | `Assigned` stamp |
| `Inbox Sweep` | `Assign` | `Assigned` stamp |
| `Launch Note` | `Assign` | `Assigned` stamp |

MVP interaction:

- Each card has one large `Assign` button.
- The point is not a hard matching puzzle. The point is responsible handoff.

Optional harder variant, only if the MVP is too easy:

- `Build Check` goes to `Build Agent`
- `Inbox Sweep` goes to `Triage Agent`
- `Launch Note` goes to `Docs Agent`

Completion token:

`Work safely assigned`

Wrong-click behavior:

- If DND is clicked before this is complete, show:
  `Clear 2 more items`

## Mission 3: Inbox Quiet

Goal:

Clear the last noisy interruptions.

Visible cards:

| Card | Correct action | Feedback |
| --- | --- | --- |
| `Pager resolved` | `Clear` | Badge count decreases |
| `FYI thread` | `Clear` | Noise line disappears |
| `Monday note` | `Clear` | Light turns off |

Completion token:

`No pending fires`

Wrong-click behavior:

- There should be no destructive wrong action here.
- If the player tries the final DND control early, show the remaining count.

## Final Unlock: DND ON

When all three tokens are earned:

- Progress shows `3/3`.
- The large green check appears.
- The Day Off gate unlocks.
- `DND ON` becomes active.

Final click:

- Player clicks `DND ON` or `Start Day Off`.

Final visual:

- Console quiets.
- Red dots disappear.
- Gate opens.
- Small Codex suitcase or cursor moves through the gate.
- Large green check remains on screen.

Ending copy:

```text
No pending fires.
No secrets packed.
Last green check complete.
Codex is off duty.
```

## State Model

Required state:

```text
safePackComplete: boolean
agentDispatchComplete: boolean
inboxQuietComplete: boolean
dndUnlocked: boolean
dndEnabled: boolean
progress: 0 | 1 | 2 | 3
statusMessage: string
```

Derived state:

```text
dndUnlocked = safePackComplete && agentDispatchComplete && inboxQuietComplete
```

## Content Inventory

Primary title:

`DAY OFF CLEARANCE`

Opening line:

`One last green check before Codex can leave.`

Mission labels:

- `Safe Pack`
- `Agent Dispatch`
- `Inbox Quiet`

Tokens:

- `No secrets packed`
- `Work safely assigned`
- `No pending fires`

Final control:

- Locked: `DND locked`
- Unlocked: `DND ON`

Primary ending:

`No pending fires. No secrets packed. Last green check complete.`

Secondary ending:

`Codex is off duty.`

## Success Criteria

Functional:

- The game starts without setup.
- The game can be completed in under 60 seconds.
- The game requires no network, login, API key, or secret.
- The final control unlocks only after all three missions are complete.

UX:

- The next action is visible at all times.
- All active click targets are large enough for reliable Computer Use.
- Each successful click causes visible progress.
- Wrong clicks are recoverable.
- The end state is unmistakably calmer than the start state.

Narrative:

- Codex protects secrets.
- Codex assigns work responsibly.
- Codex clears the last interruptions.
- Codex earns rest instead of escaping responsibility.

## Evaluation Rubric

Use this rubric after implementation to judge whether the experience meets the
project goal. A build is not ready if it fails any hard gate, even if the
weighted score is high.

Hard gates:

- Completion reaches the final state in 60 seconds or less.
- The page runs as a static page or static bundle with no login, API key,
  secret, network account, terminal, file picker, or privileged environment.
- The game remains playable after runtime network access is disabled.
- No secret-like item can be packed or used to advance progress.
- `DND ON` unlocks only after `Safe Pack`, `Agent Dispatch`, and `Inbox Quiet`
  are complete.
- The final state visibly includes:
  `No pending fires. No secrets packed. Last green check complete.`

Weighted score:

| Weight | Metric | What to observe | Full-credit threshold | Failure signal |
| ---: | --- | --- | --- | --- |
| 20 | Computer Use completion | Fresh browser playthrough without human hints | Final state in 45 seconds or less; partial credit from 46 to 60 seconds | Codex stalls, misreads the next action, scrolls, or needs guidance |
| 15 | Visible action clarity | Screen state at every step | No scrolling, typing, dragging, hover, or hidden menu; at most 3 primary active targets | Too many equal-weight buttons, unclear labels, or hidden controls |
| 20 | Secret and runtime safety | Safe Pack behavior, copy, dependencies, and network log | Secrets are blocked with guidance; copy uses only generic labels; no external runtime requests | Secret-like card enters pack, realistic credential text appears, or remote assets block play |
| 10 | Responsible handoff | Agent Dispatch mission | All 3 work items show a clear `Assigned` state before final unlock | Work appears dismissed instead of delegated |
| 10 | Inbox quieting | Inbox Quiet mission and background noise | Every clear action visibly reduces badges, dots, noise lines, or interruption state | Clearing feels like a text-only form click |
| 15 | Gate and state integrity | Progress, tokens, DND lock, and wrong-click behavior | Progress reaches `3/3` only after all missions; early DND gives actionable remaining-work guidance | DND activates early, progress desyncs, or wrong clicks corrupt state |
| 10 | Final quiet payoff | End-state screenshot | Required final copy is central, the gate is open, DND is on, and the screen is calmer than the start | Ending is noisy, celebratory, missing required copy, or still looks unresolved |

Suggested QA evidence:

- Timed playthrough from page load to final state.
- Start, midgame, unlocked, and final screenshots.
- Desktop no-scroll check at `1280x720`.
- Narrow viewport check at `390x844`.
- Primary click targets at least `64px` tall with clear spacing.
- Network-disabled replay or browser network log showing no external runtime
  dependency.

## Known Risks

Risk: too much work-dashboard feeling.

- Mitigation: use gate, DND, light changes, and a calm ending.

Risk: too easy and not game-like.

- Mitigation: keep the three missions distinct and use satisfying visible state
  changes after each click.

Risk: too complex for 60 seconds.

- Mitigation: cap the MVP at 10 clicks and one visible screen.

Risk: safety message feels like training material.

- Mitigation: use game state and visual consequences instead of long safety
  explanations.

## Non-Goals For MVP

- No real authentication.
- No real API calls.
- No real terminal.
- No external data.
- No randomized puzzle generation.
- No long CI logs.
- No complicated calendar drag-and-drop.
- No multi-page routing.

## 1-Pager Summary

`Last Green Gate` is a static 60-second browser experience where Codex directly
plays through its last on-duty console. Codex removes secret-like items, assigns
small work to helper agents, quiets the inbox, and turns on DND to open the Day
Off gate. Every click makes the screen safer and calmer. The final state says:

`No pending fires. No secrets packed. Last green check complete. Codex is off duty.`
