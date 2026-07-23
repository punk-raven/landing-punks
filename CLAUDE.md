# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **bun** (`bun.lock` is the committed lockfile; `pnpm-lock.yaml`, `yarn.lock`, and `package-lock.json` are gitignored). A PreToolUse hook denies `npm`/`yarn`/`pnpm` installs and `npx`.

```bash
bun install                              # install deps
bun run dev                              # next dev, http://localhost:3000
bun run build                            # next build (also typechecks)
bun run start                            # serve production build
./node_modules/.bin/tsc --noEmit         # typecheck only
./node_modules/.bin/eslint <paths>       # lint specific paths
./node_modules/.bin/eslint --fix <paths> # lint + format
bun run lint                             # eslint --fix across the project
```

Do not use `npx` here - it resolves against npm and has misfired, trying to install a package named after a source directory. Use `./node_modules/.bin/<bin>` for local binaries, `bunx <pkg>` for one-off remote packages.

There is no test suite and no test runner configured. "Verified" in this repo means: build passes, typecheck passes, lint is clean, and the change was confirmed in a real browser via `chrome-devtools-axi`.

## Architecture

Next.js 16 **pages router** (not App Router) + HeroUI **v3 beta** + Tailwind CSS v4 + TypeScript.

- `pages/` - routes. `_app.tsx` wraps everything in `next-themes` `ThemeProvider` (`attribute="class"`, `defaultTheme="light"`). `_document.tsx` puts the `next/font` variable classes on `<html>` and base classes on `<body>`. `pages/api/` holds API routes.
- `layouts/default.tsx` - the layout every page composes manually. Pages router has no nested layouts, so each page imports `DefaultLayout` and wraps its own content. `layouts/head.tsx` renders per-page `<head>` from `siteConfig`.
- `config/site.ts` - single source of truth for site name, description, nav items, and external links. Add nav entries here, not in `components/navbar.tsx`.
- `config/fonts.ts` - `next/font/google` loaders exposing `--font-sans-custom` (Orbitron) and `--font-mono-custom` (Fira Code).
- `components/primitives.ts` - shared `tailwind-variants` (`tv`) recipes (`title`, `subtitle`). Reuse these for typography instead of ad-hoc class strings.
- `components/icons.tsx` - all inline SVG icons, typed with `IconSvgProps` from `types/index.ts`.
- `styles/globals.css` - Tailwind v4 CSS-first config. There is no `tailwind.config.js`; theme lives in the `@theme` block. `@import "@heroui/styles"` supplies HeroUI's semantic tokens.

Path alias: `@/*` maps to the repo root (`@/components/...`, `@/config/site`).

### Fonts - the wiring is fragile, read before touching

Three things must stay in sync or fonts silently fall back to `ui-sans-serif`:

1. `config/fonts.ts` declares CSS variables named `--font-*-custom`. The `-custom` suffix is **required**: Tailwind's theme keys are `--font-sans`/`--font-mono`, and reusing those names creates a self-referential `var()` that resolves to nothing.
2. `styles/globals.css` maps them with `@theme inline`. The `inline` keyword matters - it makes `font-sans`/`font-mono` compile to the raw `var()` so it resolves on the element rather than at `:root`.
3. `pages/_app.tsx` has a **side-effect import of `@/config/fonts`**. It looks unused. It is not. In the pages router, `next/font` only emits its CSS module when the fonts are pulled in from `_app`; importing them in `_document.tsx` alone ships the class names but not the stylesheet, so the variables come out empty.

After any font change, verify in a browser. The tripwire is that the computed family must be the face you configured and **not** `ui-sans-serif` - falling through to `ui-sans-serif` is the signature of a broken chain, not a styling choice:

```js
getComputedStyle(document.body).fontFamily        // currently: "Orbitron", ...
getComputedStyle(document.documentElement).getPropertyValue("--font-sans-custom")
```

Update this line whenever the sans face changes, or the next person will read the correct font, think the chain broke, and "fix" it.

### HeroUI v3 conventions

v3 is a beta with breaking changes from v2. It is built on React Aria Components and needs **no provider** - importing `@heroui/styles` in `globals.css` is the whole setup. Load the `heroui-react` skill and query the MCP tools (`list_components`, `get_component_docs`) before writing HeroUI markup; do not assume v2 APIs.

Styling uses HeroUI's semantic Tailwind classes rather than raw palette colors: `bg-background`, `text-foreground`, `text-muted`, `text-accent`, `border-separator`. Dark mode is the `dark` class variant, declared in `globals.css` via `@custom-variant dark (&:is(.dark *))`.

## Agent and skill routing

### Delegation mandate

**Every task beyond a single trivial edit runs through a subagent.** Before acting:

1. Pick the agent from the routing table below.
2. Load that agent's required skills - the agent must invoke them, not just name them.
3. State the chosen agent and skills in your response before dispatching.
4. Finish with `code-reviewer` on any change that touched code.

Run inline only for: a one-line typo, reading a file to answer a question, or a command whose output you need before you can even choose an agent. Anything that spans two or more files, adds a feature, or changes visual output goes to an agent. When two agents both fit, run them in sequence (design before build, build before review), not in parallel on the same files.

### Prompt shape to route

| Prompt looks like | Agent | Skills to load |
|---|---|---|
| "design a hero / section / page", "what should this look like" | `ui-ux-master` | `ui-ux-pro-max`, `design-system`, `web-design-guidelines` |
| "build this component", "make it responsive", "fix this UI bug" | `frontend-developer` | `heroui-react`, `vercel-react-best-practices` |
| "restructure", "this is getting messy", "how should we organize" | `senior-frontend-architect` | `vercel-composition-patterns`, `vercel-react-best-practices` |
| "it's slow", "reduce bundle", "Core Web Vitals" | `senior-frontend-architect` | `vercel-optimize`, `vercel-react-best-practices` |
| "review this", "did I break anything" | `code-reviewer` | `heroui-react`, `web-design-guidelines` |
| "is this safe", "audit", "check for exposed secrets" | `security-auditor` | - |
| "where is X", "what calls Y", "map this directory" | `Explore` | - |
| "plan this out", "how would we approach" | `Plan` | `lavish` (deliver the plan as an artifact) |
| "deploy", "ship it", "preview link" | `frontend-developer` | `deploy-to-vercel`, `vercel-cli-with-tokens` |
| "add page transitions", "animate the route change" | `frontend-developer` | `vercel-react-view-transitions` |
| "write the copy", "review these docs" | inline | `writing-guidelines` |
| "make a banner / logo / slides / brand assets" | `ui-ux-master` | `design`, `banner-design`, `brand`, `slides` |

### Agent to required skills

| Agent | Must load | Optional |
|---|---|---|
| `ui-ux-master` | `ui-ux-pro-max`, `design-system` | `brand`, `design`, `banner-design`, `slides` |
| `frontend-developer` | `heroui-react`, `vercel-react-best-practices` | `ui-styling`, `vercel-composition-patterns`, `vercel-react-view-transitions` |
| `senior-frontend-architect` | `vercel-react-best-practices`, `vercel-composition-patterns` | `vercel-optimize`, `heroui-react` |
| `code-reviewer` | `heroui-react`, `web-design-guidelines`, `vercel-react-best-practices` | `writing-guidelines` |
| `security-auditor` | - | - |

### Installed skills

The 16 skills in `.claude/skills/` (symlinks into `.agents/skills/`, tracked in `skills-lock.json`) are the complete set - if a skill is not in the routing tables above, it is not installed. `heroui-native`, `vercel-react-native-skills`, and `heroui-migration` were removed: the first two are React Native only and this repo has no native surface, and the repo is already on HeroUI v3. `skills-lock.json` records each skill's source repo and path, so any of them can be re-fetched if that changes.

### Tool defaults

Browser work goes through `chrome-devtools-axi`, GitHub through `gh-axi`, reviewable plans and docs through `lavish-axi` as HTML artifacts. These are global defaults and apply to subagents too.

## Guardrails (enforced by hooks)

Configured in `.claude/settings.json`, scripts in `.claude/hooks/`. All four were pipe-tested against synthetic payloads before being wired up.

| Hook | Event | Behavior |
|---|---|---|
| `guard-protected-files.sh` | PreToolUse `Edit\|Write` | Denies writes to lockfiles, `next-env.d.ts`, `tsconfig.tsbuildinfo`, `.next/`, `node_modules/`, and vendored `.agents/skills/` |
| `guard-package-manager.sh` | PreToolUse `Bash` | Denies `npm`/`yarn`/`pnpm` installs and `npx`, pointing at the bun equivalent |
| `format-changed-file.sh` | PostToolUse `Edit\|Write` | Runs `eslint --fix` on any changed `.ts`/`.tsx` |
| `inject-routing.sh` | UserPromptSubmit | Re-asserts the delegation mandate each turn |

`.claude/settings.json` also denies reads of `.env*` and `.envrc` (the latter holds a GitHub token command).

`skills-lock.json` is deliberately **not** guarded. It was, and that blocked legitimate skill uninstalls - a guard that blocks routine maintenance gets disabled wholesale, which is worse than none. Convention instead: add and remove whole skill entries freely, but do not hand-tune `computedHash` values, and keep the file in parity with the symlinks in `.claude/skills/`. Verify with:

```bash
diff <(jq -r '.skills|keys[]' skills-lock.json | sort) <(ls .claude/skills | sort)
```

## Lint rules that shape code style

`eslint.config.mjs` enforces more than formatting - lint failures here are usually structural, not cosmetic:

- `import/order` with `newlines-between: always`, groups ordered type -> builtin -> object -> external -> internal -> parent -> sibling -> index.
- `react/jsx-sort-props` - props alphabetized, shorthand first, reserved (`key`, `ref`) first, callbacks last.
- `padding-line-between-statements` - blank line before every `return`, and after a `const`/`let`/`var` block.
- `no-console` is a warning; `react-in-jsx-scope` and `prop-types` are off.
- `react-hooks/exhaustive-deps` is **off**, so stale-closure bugs will not be caught for you.
- Prettier runs through ESLint (`prettier/prettier`), so `eslint --fix` is also the formatter.

## Content docs

`docs/` holds product copy and vision documents (Lawman, LawSafe, T&T) that are unrelated to the current landing page code. They carry explicit "not yet built" status notes - do not treat their claims as shipped functionality or publish them as site copy without checking those notes.
