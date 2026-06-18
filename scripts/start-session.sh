#!/bin/sh
set -eu

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

usage() {
  printf '%s\n' "Usage: scripts/start-session.sh [session-id]" >&2
  exit 2
}

if [ "$#" -gt 1 ]; then
  usage
fi

if [ "$#" -eq 1 ]; then
  SESSION_ID="$1"
else
  SESSION_ID=$(date -u '+%Y%m%dT%H%M%SZ')
fi

case "$SESSION_ID" in
  "")
    usage
    ;;
  *[!A-Za-z0-9._-]*)
    printf '%s\n' "Session id may only use A-Z, a-z, 0-9, dot, underscore, and dash." >&2
    exit 2
    ;;
esac

mkdir -p .codex/session
printf '%s\n' "$SESSION_ID" > .codex/session/current

printf '%s\n' "Active session: $SESSION_ID"
printf '%s\n' "Commit policy: run git add -A before git commit."
