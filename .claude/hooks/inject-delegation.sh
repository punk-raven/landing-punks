#!/usr/bin/env bash
# UserPromptSubmit: re-assert the delegation rule every turn.
# CLAUDE.md is read once at session start and drifts out of attention on a long
# session. This is the enforcement half of the rule documented there.
#
# The injected text stays short on purpose and names the CLAUDE.md section as
# the source of truth. The predecessor of this hook restated the whole policy
# inline, the policy was later dropped from CLAUDE.md, and the hook went on
# injecting a rule the documentation said no longer applied (commit 141717b).
set -uo pipefail

root="${CLAUDE_PROJECT_DIR:-$PWD}"
memory="$root/CLAUDE.md"

# Self-silencing check: if the section is gone from CLAUDE.md, so is the rule,
# and this hook must stop talking. Deleting the heading is all it takes - the
# drift that killed the previous hook cannot happen here.
heading="## Delegate every task to a subagent"
grep -qF -- "$heading" "$memory" 2>/dev/null || exit 0

context='Delegation rule still applies (CLAUDE.md > "Delegate every task to a subagent"). Every task runs through a subagent: the main thread scopes, briefs, dispatches, verifies and reports rather than reading the codebase in to make the edit itself. Subagents inherit nothing, so brief fully and state the verification bar. Do not trust a self-report on anything measurable - re-check the decisive fact yourself. The exceptions are narrow; read the section for them.'

# jq builds the JSON so a quote or newline in the text above cannot break it.
jq -nc --arg context "$context" '{
  hookSpecificOutput: {
    hookEventName: "UserPromptSubmit",
    additionalContext: $context
  }
}'

exit 0
