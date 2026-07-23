#!/usr/bin/env bash
# UserPromptSubmit: re-assert the delegation mandate every turn.
# CLAUDE.md is read once at session start and drifts out of attention on long
# sessions. This is the enforcement half of the routing tables documented there.
set -uo pipefail

cat <<'EOF'
{"hookSpecificOutput":{"hookEventName":"UserPromptSubmit","additionalContext":"Delegation mandate (see CLAUDE.md > Agent and skill routing): any task beyond a single trivial edit runs through a subagent. Pick the agent from the routing table, load that agent's required skills, and state the chosen agent + skills before dispatching. Design/UI work routes to ui-ux-master then frontend-developer; multi-file or architectural work to senior-frontend-architect; every code change ends with code-reviewer. Never edit HeroUI markup without loading the heroui-react skill first - this repo is on v3 beta and v2 APIs do not apply."}}
EOF
