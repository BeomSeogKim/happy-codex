# Session Commit Policy

This repository uses Git hooks to keep each commit aligned to one active work
session.

## Install

Run once per checkout:

```sh
scripts/install-git-hooks.sh
```

The installer sets:

```sh
git config core.hooksPath .githooks
```

## Start A Session

Start or replace the active local session:

```sh
scripts/start-session.sh
```

You can also provide a stable id:

```sh
scripts/start-session.sh 2026-06-18-last-green-gate
```

The active session id is written to `.codex/session/current`. That file is
local-only and ignored by Git.

## Commit

Stage the whole session before committing:

```sh
git add -A
git commit -m "docs: describe last green gate"
```

The hooks enforce three rules:

- An active session must exist.
- No unstaged tracked files or untracked non-ignored files may be left outside
  the commit.
- The commit message must have a `Session: <id>` trailer. If the trailer is
  missing, the hook appends it automatically.

Partial commits are blocked by design. If a file should not be part of the
session, remove it, stash it, or add an intentional ignore rule before
committing.
