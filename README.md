# Codex's Day Off

A static 60-second web experience where Codex earns a day off by safely clearing
the final work console.

## Current Concept

**Last Green Gate: Codex's Day Off Clearance**

Codex starts on duty in a noisy work console. To unlock the day off, Codex must:

1. Remove secret-like items and pack only safe demo material.
2. Assign the remaining work to the right helper agents.
3. Clear the last noisy inbox items.
4. Turn on Do Not Disturb and pass through the Day Off gate.

The final feeling should be calm:

> No pending fires. No secrets packed. Last green check complete.

## Challenge Constraints

- Runs as a static web demo or static HTML bundle.
- No login.
- No API key.
- No secret.
- Codex must be able to directly play and finish it with Computer Use in under
  60 seconds.

## Repository Structure

- [AGENTS.md](AGENTS.md): root guidance for Codex and other agents.
- [docs/project-setup.md](docs/project-setup.md): project setup, roles, and
  planned workflow.
- [docs/session-commit-policy.md](docs/session-commit-policy.md): local Git hook
  policy for committing complete work sessions.
- [docs/specs/top-three-candidates.md](docs/specs/top-three-candidates.md):
  comparison of the top three candidate projects.
- [docs/specs/candidates/](docs/specs/candidates/): workspace for new candidate
  and exploratory spec documents.
- [docs/specs/last-green-gate.md](docs/specs/last-green-gate.md): detailed
  specification for the rank 1 implementation candidate.
- [docs/specs/no-fires-left.md](docs/specs/no-fires-left.md): detailed
  specification for the rank 2 candidate.
- [docs/specs/do-not-disturb-console.md](docs/specs/do-not-disturb-console.md):
  detailed specification for the rank 3 candidate.
- [.codex/skills/day-off-design/SKILL.md](.codex/skills/day-off-design/SKILL.md):
  repo-local skill for future concept, spec, and implementation work.

## Current Status

The project is in specification and setup mode. No app implementation has been
created yet.
