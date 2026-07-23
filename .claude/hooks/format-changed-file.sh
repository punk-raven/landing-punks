#!/usr/bin/env bash
# PostToolUse formatter for Edit|Write.
# ESLint is the formatter here: prettier runs through it via prettier/prettier,
# and import/order + jsx-sort-props + padding-line-between-statements are all
# autofixable. Running it per-file keeps diffs clean without a whole-repo pass.
set -uo pipefail

payload="$(cat)"
file="$(printf '%s' "$payload" | jq -r '.tool_response.filePath // .tool_input.file_path // empty')"
[ -z "$file" ] && exit 0

case "$file" in
  *.ts|*.tsx) ;;
  *) exit 0 ;;
esac

root="${CLAUDE_PROJECT_DIR:-$PWD}"
bin="$root/node_modules/.bin/eslint"
[ -x "$bin" ] || exit 0

"$bin" --fix "$file" >/dev/null 2>&1 || true
exit 0
