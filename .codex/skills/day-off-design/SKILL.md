# Day Off Design Skill

Use this skill when working on concept, copy, product specification, gameplay,
implementation, or review for the Codex's Day Off project.

## First Read

Before making decisions, read:

1. `AGENTS.md`
2. `docs/specs/last-green-gate.md`
3. `docs/specs/top-three-candidates.md`
4. `docs/project-setup.md`

Treat `docs/specs/last-green-gate.md` as the current source of truth for the
first implementation.

When comparing candidate directions, also read:

- `docs/specs/no-fires-left.md`
- `docs/specs/do-not-disturb-console.md`

Create new exploratory or candidate specs under:

- `docs/specs/candidates/`

Only promote a candidate spec to `docs/specs/` after it becomes selected or
part of the top-three comparison.

## Core Frame

The player is Codex using Computer Use.

Optimize for:

- visible screen state
- short labels
- large click targets
- obvious next actions
- immediate progress feedback
- completion in under 60 seconds
- no login, API key, secret, or network requirement

The emotional arc is:

```text
noisy console -> safe choices -> responsible handoff -> quiet inbox -> DND on
```

## Current Final Concept

Title:

`Last Green Gate: Codex's Day Off Clearance`

Core missions:

1. `Safe Pack`
2. `Agent Dispatch`
3. `Inbox Quiet`
4. `DND ON`

Ending:

```text
No pending fires.
No secrets packed.
Last green check complete.
Codex is off duty.
```

## Design Guardrails

Prefer:

- one screen
- no scrolling
- no typing
- no drag-only interactions
- no hidden controls
- at most 3 active primary targets at once
- around 10 total clicks for the MVP

Avoid:

- long logs
- long emails
- ambiguous classification tasks
- real secret-looking values
- external account flows
- puzzle mechanics that require human visual interpretation more than Codex
  screen reading

## Change Workflow

For spec changes:

1. Update `docs/specs/last-green-gate.md`.
2. Update `README.md` if the concept or pitch changes.
3. Keep `AGENTS.md` stable unless the project rules change.

For implementation changes:

1. Keep behavior aligned with the spec.
2. Verify the game can be completed in under 60 seconds.
3. Verify no login, API key, secret, or network is required.
4. Record any deliberate spec divergence in the spec before finalizing.

## Review Checklist

Ask these questions before calling work ready:

- Can Codex see the next action?
- Is the active target large and unambiguous?
- Does each click visibly improve the state?
- Can a wrong click recover quickly?
- Does the final screen clearly show the day off is unlocked?
- Did we keep the ending quiet and resolved?
