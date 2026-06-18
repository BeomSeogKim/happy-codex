#!/bin/sh
set -eu

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

git config core.hooksPath .githooks

chmod +x .githooks/pre-commit
chmod +x .githooks/commit-msg
chmod +x scripts/install-git-hooks.sh
chmod +x scripts/start-session.sh

printf '%s\n' "Git hooks installed: core.hooksPath=.githooks"
printf '%s\n' "Start a session with: scripts/start-session.sh [session-id]"
