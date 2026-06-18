# Project Setup

This document defines the working structure for the Codex's Day Off project.

## Objective

Build a small, polished, static web experience that Codex can play directly.
The experience should be easy to inspect, easy to run, and easy to complete in
under 60 seconds.

## Source Of Truth

Use this priority order when making decisions:

1. [docs/specs/last-green-gate.md](specs/last-green-gate.md)
2. [docs/specs/top-three-candidates.md](specs/top-three-candidates.md)
3. [AGENTS.md](../AGENTS.md)
4. [README.md](../README.md)
5. Any later implementation notes or QA reports

If the implementation diverges from the spec, update the spec or restore the
implementation. Do not leave the difference implicit.

## Spec Authoring Directory

Create new candidate, exploratory, or variant specs in:

```text
docs/specs/candidates/
```

Use this directory for ideas that are not yet selected as the implementation
direction or promoted into the top-three comparison. Once a candidate is
selected or ranked, move or copy the durable spec to `docs/specs/` and update
the relevant index document.

For exploration work, the top three candidate specs are:

1. [Last Green Gate](specs/last-green-gate.md)
2. [No Fires Left](specs/no-fires-left.md)
3. [Do Not Disturb Console](specs/do-not-disturb-console.md)

## Implementation Layout

The current implementation uses the no-build static layout:

```text
index.html
assets/
  app.js
  styles.css
projects/
  last-green-gate/
docs/
  specs/
```

Keep the no-build version unless a build step clearly improves interaction or
rendering. `index.html` is the deployable entry point. `projects/last-green-gate/`
is an isolated evaluation copy of the selected implementation.

## Core Roles

Product/spec agent:

- Owns gameplay scope, copy, scenario structure, and challenge alignment.
- Keeps the experience centered on Codex as the player.

Frontend agent:

- Owns HTML, CSS, JavaScript, responsive layout, and interaction behavior.
- Keeps click targets large and state transitions visible.

Visual QA agent:

- Runs the local app, captures screenshots, and checks desktop and mobile views.
- Verifies that text does not overlap and that the next action is clear.

Safety/review agent:

- Checks for login, API key, secret, network, unsafe copy, or misleading UI risk.
- Verifies challenge compliance before submission.

## Project Gates

Session commit gate:

- Git hooks are installed with `scripts/install-git-hooks.sh`.
- An active session exists from `scripts/start-session.sh [session-id]`.
- All changed and untracked non-ignored files are staged with `git add -A`.
- Commit messages carry a `Session: <id>` trailer.

Specification gate:

- Final concept documented.
- Core interaction loop documented.
- Card labels, states, and ending copy documented.

Implementation gate:

- Static demo runs locally.
- No credentials or network are needed.
- Full game completes in under 60 seconds.

Visual QA gate:

- Main viewport is nonblank.
- All active targets are visible without scrolling on desktop.
- Text fits in cards and buttons.
- Final state is visually distinct from initial state.

Submission gate:

- 1-pager pitch is available.
- Demo URL or static bundle is available.
- The run path is clear and requires no setup beyond opening the demo.

## Current Final Direction

Name:

`Last Green Gate: Codex's Day Off Clearance`

One-line pitch:

`Codex gets one last green check by leaving secrets behind, assigning the final work, quieting the inbox, and opening the Day Off gate in under 60 seconds.`
