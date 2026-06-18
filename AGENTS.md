# Codex's Day Off Project Guide

This repository defines and builds a small static web experience for the
Codex's Day Off challenge.

## Product Goal

Create a 60-second experience that Codex can directly play with Computer Use.
The experience should make Codex feel that it safely cleared the last pieces of
work, protected secrets, delegated what should not be done alone, quieted
notifications, and earned a day off.

Current selected concept:

- Title: `Last Green Gate: Codex's Day Off Clearance`
- Core loop: safe pack, agent dispatch, inbox quiet, DND on
- Final payoff: `No pending fires. No secrets packed. Last green check complete.`

The detailed source of truth is [docs/specs/last-green-gate.md](docs/specs/last-green-gate.md).

New candidate or exploratory specs should be created under
[docs/specs/candidates/](docs/specs/candidates/). Promote a candidate out of
that directory only after it becomes part of the top-three comparison or the
selected implementation direction.

## Design Rules

- Optimize for Codex as the player, not a human observer.
- The screen must explain the next action through visible state, short labels,
  and large click targets.
- Keep the experience playable in under 60 seconds.
- Use static HTML or a static bundle. No login, API key, secret, external account,
  or privileged environment may be required.
- Prefer one screen. Avoid scrolling, hidden menus, hover-only affordances,
  text entry, or drag-only interactions.
- Keep active choices small. At any moment, show at most 3 primary active targets.
- Every correct action must immediately improve visible state.
- Failure should be recoverable and should guide the next action.
- The ending should feel quiet and resolved, not noisy or celebratory.

## Implementation Rules

- Keep the first implementation small and self-contained.
- If a framework is introduced, it must be justified by actual interaction or
  rendering needs.
- Keep gameplay state explicit and easy to inspect.
- Avoid random layouts or randomized card text in the first version.
- Keep copy short, preferably 2 to 5 words per card label.
- Do not require network access at runtime.
- Do not use real secret-like values in fixtures, screenshots, docs, or demos.
- Use the session commit hooks for repository work. Install them with
  `scripts/install-git-hooks.sh`, start a session with
  `scripts/start-session.sh [session-id]`, and stage the full session with
  `git add -A` before committing. Partial commits are blocked.

## Verification

Before calling an implementation ready:

- Run the project locally from a clean checkout.
- Confirm the game can be completed in under 60 seconds.
- Confirm all required interactions are visible without scrolling on desktop.
- Confirm no login, API key, secret, network account, or environment file is
  required.
- Confirm the final state displays:
  `No pending fires. No secrets packed. Last green check complete.`

## Agent Routing

- Use product/spec work for gameplay changes, copy changes, or scope decisions.
- Use frontend implementation work for HTML, CSS, JavaScript, assets, and
  interaction behavior.
- Use visual QA work for screenshots, layout, responsive checks, and click target
  clarity.
- Use safety review work for secret handling, unsafe copy, external dependency
  risk, and challenge rule compliance.

When in doubt, reduce complexity instead of adding another mechanic.
