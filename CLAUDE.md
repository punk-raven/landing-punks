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

- `pages/` - routes. `_app.tsx` imports the fonts and global CSS and renders the page; there is **no theme provider** (see "No dark mode" below). `_document.tsx` puts the `next/font` variable classes on `<html>` and base classes on `<body>`. There is no `pages/api/` - the site is static and the scaffold's `hello.ts` was deleted; add the directory back only when a route actually needs a server.
- `layouts/default.tsx` - the layout every page composes manually. Pages router has no nested layouts, so each page imports `DefaultLayout` and wraps its own content. Its `width` prop defaults to `"bands"` (the page supplies its own `<Band>` sections); pass `"prose"` or `"band"` to have the layout supply the measure instead. `layouts/head.tsx` renders per-page `<head>` from `siteConfig`.
- `config/site.ts` - single source of truth for site name, description, nav items, and external links. Add nav entries here, not in `components/navbar.tsx`.
- `config/fonts.ts` - `next/font/google` loaders for the three type roles: `--font-display-custom` (Orbitron), `--font-body-custom` (Inter), `--font-data-custom` (Fira Code).
- `components/primitives.ts` - shared `tailwind-variants` (`tv`) recipes: `title`, `subtitle`, `eyebrow`, `prose`, `measure`, `band`, `sectionRule`, `statusChip`, `button`. Reuse these instead of ad-hoc class strings.
- `components/band.tsx` - the alternating light/dark section wrapper. `components/status-chip.tsx` - the product status chip. `components/button.tsx` - re-exports HeroUI's `Button` unchanged (there is no wrapper; the house style reaches it through the `.button` BEM class instead) and adds `ButtonLink`, a link dressed as a button, which is what the site's CTA actually is. `components/site-footer.tsx` - footer, carries the mandatory "not a law firm" disclaimer.
- `components/icons.tsx` - all inline SVG icons, typed with `IconSvgProps` from `types/index.ts`.
- `styles/globals.css` - Tailwind v4 CSS-first config. There is no `tailwind.config.js`; theme lives in the `@theme` block. `@import "@heroui/styles"` supplies HeroUI's semantic tokens, which are then rethemed to the PunkRaven palette.

Path alias: `@/*` maps to the repo root (`@/components/...`, `@/config/site`).

### Fonts - the wiring is fragile, read before touching

Three roles, per the design spec (`docs/punkraven-site-build-instructions.md` §5.3):

| Role | Face | Variable | Tailwind utility | Used for |
|---|---|---|---|---|
| Display | Orbitron | `--font-display-custom` | `font-display` | headings, hero, wordmark |
| Body | Inter | `--font-body-custom` | `font-body` (and the default `font-sans`) | all running text |
| Data | Fira Code | `--font-data-custom` | `font-data` (and `font-mono`) | tables, code, confidence values, status chips, eyebrows |

Body is the default for prose: `--font-sans` maps to Inter, so anything unstyled inherits it. Headings opt in to `font-display`. Do not make Orbitron the global sans - it ships only `latin`/`normal`, has no italic and no Latin Extended-A, and missing glyphs fall through per character to a metric-adjusted fallback at `size-adjust: 124%`, which reads as a rendering bug mid-word.

Three things must stay in sync or fonts silently fall back to `ui-sans-serif`:

1. `config/fonts.ts` declares CSS variables named `--font-*-custom`. The `-custom` suffix is **required**: the Tailwind theme keys are `--font-display`/`--font-body`/`--font-data`/`--font-sans`/`--font-mono`, and reusing those names creates a self-referential `var()` that resolves to nothing.
2. `styles/globals.css` maps them with `@theme inline`. The `inline` keyword matters - it makes the utilities compile to the raw `var()` so they resolve on the element rather than at `:root` (the next/font classes live on `<html>`, not `:root`).
3. `pages/_app.tsx` has a **side-effect import of `@/config/fonts`**. It looks unused. It is not. In the pages router, `next/font` only emits its CSS module when the fonts are pulled in from `_app`; importing them in `_document.tsx` alone ships the class names but not the stylesheet, so the variables come out empty.

After any font change, verify in a browser. The tripwire is that the computed family must be the face you configured and **not** `ui-sans-serif` - falling through to `ui-sans-serif` is the signature of a broken chain, not a styling choice:

```js
getComputedStyle(document.body).fontFamily            // currently: Inter, "Inter Fallback", ...
getComputedStyle(document.querySelector("h1")).fontFamily  // currently: Orbitron, "Orbitron Fallback", ...
getComputedStyle(document.documentElement).getPropertyValue("--font-body-custom")
```

Update these lines whenever a face changes, or the next person will read the correct font, think the chain broke, and "fix" it.

#### Indic script coverage - checked, not yet wired

Spec §5.3 makes script coverage a hard requirement and §5.5 sets one sentence in nine Indic scripts on `/tnt`. None of the three faces above covers any Indic script, so a sibling family is needed. Checked against `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json` (Next.js 16.2.6) - **all nine are available in `next/font/google`**, each with weights 100-900 plus `variable`, style `normal` only, and the script's own subset alongside `latin`/`latin-ext`:

| Script | `next/font/google` family | Subset key |
|---|---|---|
| Devanagari | `Noto_Sans_Devanagari` | `devanagari` |
| Bengali | `Noto_Sans_Bengali` | `bengali` |
| Tamil | `Noto_Sans_Tamil` | `tamil` |
| Telugu | `Noto_Sans_Telugu` | `telugu` |
| Kannada | `Noto_Sans_Kannada` | `kannada` |
| Malayalam | `Noto_Sans_Malayalam` | `malayalam` |
| Gujarati | `Noto_Sans_Gujarati` | `gujarati` |
| Gurmukhi | `Noto_Sans_Gurmukhi` | `gurmukhi` |
| Odia | `Noto_Sans_Oriya` | `oriya` |

Note the Odia family is named **Oriya** in Google Fonts (the Unicode block name); `Noto Sans Odia` does not exist and will fail the loader. There is no italic in any of them.

These are **not loaded globally, on purpose** - nine extra families is nine extra font payloads on every page for one block on one page. Load them page-scoped in `/tnt` (Phase 4), not in `config/fonts.ts`.

### No dark mode - light and dark bands instead

Spec §5.1: "Do not build a full dark-mode toggle; the site alternates light and dark bands by design." `next-themes` and `components/theme-switch.tsx` were removed for this reason. Do not reintroduce them, and do not write `dark:` variants - `globals.css` deliberately pins `@custom-variant dark` to a `.dark` class that is never applied, so `dark:` is inert and OS dark mode cannot leak in.

Use `<Band tone="paper" | "pure" | "ink">` instead. Each tone class re-declares the semantic tokens (`--background`, `--foreground`, `--muted`, `--accent`, `--focus`, `--uncertain-strong`, ...) **on the band element itself**, so anything nested inside - including HeroUI components - adapts with no extra classes. That is also why every theme mapping is `@theme inline`: the utilities must compile to a raw `var()` that resolves on the element, not at `:root`.

**Two rules govern the band token blocks in `globals.css`, and breaking either one fails silently at runtime rather than loudly at build time.**

1. **All three band classes declare the identical key set.** Same keys, different values. Bands nest in practice - the sticky `.band--paper` header sits over the `.band--ink` hero - and a key a band omits does not fall back to a sane default, it inherits the enclosing band's. When `.band--paper` declared four keys and `.band--ink` declared seventeen, `.band--paper` inside `.band--ink` rendered `--link` and `--focus` at `--sheen-lift` (2.98:1 on paper, fails AA and SC 1.4.11) and `--uncertain` at `#D98A1F` (2.53:1, the value the measurement table documents as failing). Adding a token means adding it to all three blocks. `:root` is folded into the `.band--paper` selector because the document default *is* a paper band.
2. **HeroUI's derived tokens have to be re-derived per band.** HeroUI declares `--accent-hover`, `--default-hover`, `--surface-hover`, `--accent-soft*`, `--field-hover`, `--field-focus`, `--field-border-hover`, `--field-border-focus`, `--separator-secondary/-tertiary`, `--border-secondary/-tertiary`, `--background-secondary/-tertiary/-inverse` and `--scrollbar-thumb` **only on `:root`**. A `var()` inside a custom property is substituted on the element that *declares* the property, so those freeze at the `:root` values and inherit into a band unchanged - inside `.band--ink`, `--accent-hover` was still computed from `--sheen` and white, and the primary CTA hover measured 3.76:1 on the dark hero. The shared `:root, .band--paper, .band--pure, .band--ink` block restates HeroUI's formulas verbatim so they recompute against the band's own operands. Copy the formula from `node_modules/@heroui/styles/dist/themes/default/variables.css`; do not invent one, and do not fork a formula per band.

`--default` / `--default-foreground` belong to rule 1 and are easy to miss: HeroUI's `ghost`, `outline`, `secondary` and `tertiary` button variants are built entirely from them, and without a band declaration they stay near-white-on-near-black (1.25:1 and 1.06:1 on an ink band).

`.band--ink` also sets `color-scheme: dark` so native controls, scrollbars and Chrome's autofill match the band.

### Design tokens

`styles/globals.css` holds the PunkRaven palette (spec §5.1) as raw custom properties, then rethemes HeroUI's semantic tokens onto it rather than shadowing them. Nothing collides: no PunkRaven token name appears in `node_modules/@heroui/styles/dist/themes/default/variables.css`.

The one rule that matters: **`--uncertain` is the amber, and it is reserved for uncertainty, status and unverified claims only** (spec §5.2) - status chips, estimate qualifiers, low-confidence markers, the "we have not built this yet" band. Never a heading, a hover state, a decorative border, or a CTA. It is named `uncertain` rather than `amber`/`warning`/`signal` so that decorative use reads as wrong at the call site. If you want warmth for its own sake, use `--sheen`.

`--uncertain` is deliberately **not** mapped onto HeroUI's `--warning`. HeroUI's warning means "something is wrong"; the PunkRaven amber means "we are not certain about this". Collapsing them breaks the rule.

Measured contrast drove the token split - the spec's `#D98A1F` is 2.53:1 on `--paper` and its suggested fallback `#B4700F` is 3.65:1, which clears the 3:1 non-text threshold but not the 4.5:1 text threshold that a small status chip needs. So `--uncertain` (`#B4700F`) is the non-text amber and `--uncertain-strong` is the text-safe one, band-scoped: `#995F0D` on paper (4.81:1) and `#D98A1F` on ink (6.73:1). The full measurement table is in the comment block in `globals.css`; re-run it if a value changes.

The three amber tokens are deliberately **not** exposed through `@theme inline`, so **there is no `bg-uncertain` / `text-uncertain` / `border-uncertain` utility**. That is the mechanical enforcement of §5.2's "protect it": with the theme keys present, Tailwind generated an amber utility on demand anywhere on the site, and it degraded quietly - `--uncertain` and `--uncertain-strong` are the same value on an ink band, so amber text authored on a dark band measured 6.73:1 there and dropped to 3.65:1 the moment it landed on a light one. The only two things allowed to have amber are the `statusChip` and `sectionRule` recipes in `components/primitives.ts`, which read `var(--uncertain)` / `var(--uncertain-strong)` / `var(--uncertain-surface)` through arbitrary values. If you need amber somewhere else, that is a signal to re-read §5.2, not to add the theme key back.

Measures come from `--container-measure` (68ch prose) and `--container-band` (1120px), consumed via the `measure` recipe. It is named `measure`, not `prose`, because Tailwind ships a hardcoded `max-w-prose` at 65ch that a `--container-prose` theme key does **not** override - `max-w-prose` would silently render the wrong width.

### HeroUI v3 conventions

v3 is a beta with breaking changes from v2. It is built on React Aria Components and needs **no provider** - importing `@heroui/styles` in `globals.css` is the whole setup. Load the `heroui-react` skill and query the MCP tools (`list_components`, `get_component_docs`) before writing HeroUI markup; do not assume v2 APIs.

Styling uses HeroUI's semantic Tailwind classes rather than raw palette colors: `bg-background`, `text-foreground`, `text-muted`, `text-accent`, `border-separator`. Those tokens are rethemed to the PunkRaven palette in `globals.css` and re-declared per band, so they are the right thing to reach for. There is no `dark` variant - see "No dark mode" above.

To restyle a HeroUI component, override its BEM class in `@layer components` in `globals.css` (HeroUI's documented path) rather than fighting its computed class string. `.button { @apply rounded-md font-body }` is the existing example. It is a **house default, and it also covers links dressed as buttons** (`ButtonLink`), which never go through the React component and so never see its class string at all. It does not exist to beat call sites: `buttonVariants` emits only BEM class names, so a utility passed from a call site lands in `@layer utilities` and outranks `@layer components` unconditionally.

`--radius` is left at HeroUI's `0.5rem`. HeroUI derives its whole radius scale from it (`--radius-sm = --radius * 0.5`, `--radius-md = * 0.75`, `--radius-lg = * 1`, ...), so a `0.375rem` base emitted 4.5px for `rounded-md` and 3px for `rounded-sm` - subpixel radii that render as a soft smear. At `0.5rem`, `rounded-md` is exactly 6px and `rounded-sm` exactly 4px. Set the shape on the component, not on the base.

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
