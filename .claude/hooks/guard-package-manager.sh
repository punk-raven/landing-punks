#!/usr/bin/env bash
# PreToolUse guard for Bash.
# bun.lock is the committed lockfile and every other lockfile is gitignored.
# Installing with npm/yarn/pnpm produces a second, untracked dependency graph
# that drifts from what CI and teammates resolve.
set -uo pipefail

payload="$(cat)"
cmd="$(printf '%s' "$payload" | jq -r '.tool_input.command // empty')"
[ -z "$cmd" ] && exit 0

deny() {
  jq -nc --arg reason "$1" '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: $reason
    }
  }'
  exit 0
}

if printf '%s' "$cmd" | grep -Eq '(^|[;&|]|\s)(npm|yarn|pnpm)\s+(i|install|ci|add|remove|uninstall|update|up)(\s|$)'; then
  deny "This repo installs with bun (bun.lock is committed; other lockfiles are gitignored). Use 'bun install', 'bun add <pkg>', or 'bun remove <pkg>'."
fi

if printf '%s' "$cmd" | grep -Eq '(^|[;&|]|\s)npx\s'; then
  deny "npx resolves against npm and has misfired in this repo (it tried to install a package named after a source directory). Run local binaries directly: './node_modules/.bin/<bin>', or use 'bunx <pkg>' for one-off remote packages."
fi

exit 0
