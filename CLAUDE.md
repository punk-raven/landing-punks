# CLAUDE.md

Guidance for Claude Code working in this repository.

## Delegate every task to a subagent

**Every task runs through a subagent. Do not do the work inline.** The main thread scopes the work, writes the brief, dispatches, verifies the result, and reports. It does not read the codebase into its own context to make the edit itself.

- **Fan out where the work is separable.** Independent tracks - a code change, a read-only audit, a research pass - go to separate agents in parallel. Work that shares a resource does not: `chrome-devtools-axi` drives one Chrome session, so browser work is serial and belongs to one agent at a time.
- **Brief fully. Subagents inherit nothing.** Not the conversation, not the decisions, not the file paths already established. Anything the agent needs, including pasted source and prior decisions, goes in the brief or it gets re-derived from scratch and comes back wrong.
- **State the verification bar in the brief**, because the agent has no way to know it otherwise. See "Verified means four things" below.
- **Do not trust a self-report on anything measurable.** Contrast ratios, computed fonts, rendered output, box dimensions, benchmark numbers: re-check the decisive fact in the main thread before acting on it. Reports have been wrong, and the ones that were caught were caught by reproducing the number rather than by reading the report more carefully.
- **Sequence when a result gates the next step.** An audit that must measure the final state runs after the change that alters it, not alongside.

Exceptions, and they are narrow: a single-line edit whose target is already open, and answering a question about work already done in this conversation.

## Commands

Package manager is **bun**. `bun.lock` is the committed lockfile; the npm/yarn/pnpm lockfiles are gitignored.

```bash
bun install                              # install deps
bun run dev                              # next dev, http://localhost:3000
bun run build                            # next build (also typechecks)
bun run start                            # serve production build
./node_modules/.bin/tsc --noEmit         # typecheck only
./node_modules/.bin/eslint <paths>       # lint specific paths
bun run lint                             # eslint --fix across the project
```

`npx` is blocked by a hook and resolves against npm anyway. Use `./node_modules/.bin/<bin>` for local binaries, `bunx <pkg>` for one-off remote packages.

There is no test suite. **"Verified" means all four of**: build passes, typecheck passes, lint is clean, and the change was confirmed in a real browser via `chrome-devtools-axi`. Port 3000 is often occupied; `PORT=3001 bun run start` is the usual second choice.

## Architecture

Next.js 16 **pages router** (not App Router) + HeroUI **v3 beta** + Tailwind CSS v4 + TypeScript. Path alias `@/*` maps to the repo root.

- `pages/` - routes. `_app.tsx` imports fonts and global CSS and wraps the page in next-themes' `ThemeProvider`. `_document.tsx` puts the `next/font` variable classes on `<html>`. No `pages/api/` - the site is static; add it back only when a route needs a server.
- `layouts/default.tsx` - the layout every page composes manually (pages router has no nested layouts). `width` defaults to `"sections"`; pass `"prose"` or `"band"` to have the layout supply the measure. `layouts/head.tsx` renders per-page `<head>`.
- `config/site.ts` - single source of truth for site name, description, nav items, external links. Add nav entries here, not in `components/navbar.tsx`; the header and footer both render from that one list.
- `config/fonts.ts` - `next/font/google` loaders for the three type roles.
- `components/primitives.ts` - shared `tv` recipes: `title`, `subtitle`, `eyebrow`, `prose`, `measure`, `section`, `sectionRule`, `statusChip`, `iconButton`, `button`. Reuse these instead of ad-hoc class strings.
- `components/section.tsx` - the section wrapper (`<Section elevation="base" | "sunken">`). `components/button.tsx` re-exports HeroUI's `Button` unchanged and adds `ButtonLink`, a link dressed as a button.
- `components/icons.tsx` - all inline SVG icons, typed with `IconSvgProps`.
- `styles/globals.css` - Tailwind v4 CSS-first config. No `tailwind.config.js`; theme lives in `@theme`.

## Fonts - fragile wiring, read before touching

| Role | Face | Variable | Utility |
|---|---|---|---|
| Display | Orbitron | `--font-display-custom` | `font-display` |
| Body | Inter | `--font-body-custom` | `font-body`, default `font-sans` |
| Data | Fira Code | `--font-data-custom` | `font-data`, `font-mono` |

Inter is the default for prose; headings opt in to `font-display`. **Do not make Orbitron the global sans** - it is latin-only with no italic, and missing glyphs fall through per character to a fallback at `size-adjust: 124%`, which reads as a rendering bug mid-word. It also cannot render `§`, `₹` or `→`.

Three things must stay in sync or every font silently falls back to `ui-sans-serif`:

1. The **`-custom` suffix is required** in `config/fonts.ts`. Reusing the Tailwind theme key names (`--font-display` etc.) creates a self-referential `var()` that resolves to nothing.
2. `globals.css` maps them with **`@theme inline`**. The `inline` keyword makes utilities compile to a raw `var()` that resolves on the element rather than at `:root` - and the next/font classes live on `<html>`, not `:root`.
3. `pages/_app.tsx` has a **side-effect `import "@/config/fonts"`**. It looks unused. It is not: in the pages router `next/font` only emits its CSS module when fonts are pulled in from `_app`. Deleting it empties every `--font-*-custom`.

After any font change, verify in a browser. Computed family must be the configured face, **not** `ui-sans-serif`:

```js
getComputedStyle(document.body).fontFamily                 // Inter, "Inter Fallback", ...
getComputedStyle(document.querySelector("h1")).fontFamily  // Orbitron, "Orbitron Fallback", ...
```

### Indic scripts - not wired

None of the three faces above covers any Indic script. All nine Noto families are available in `next/font/google`: `Noto_Sans_Devanagari`, `_Bengali`, `_Tamil`, `_Telugu`, `_Kannada`, `_Malayalam`, `_Gujarati`, `_Gurmukhi`, and **`Noto_Sans_Oriya`** for Odia - the Google Fonts family uses the Unicode block name, and `Noto_Sans_Odia` does not exist and will fail the loader.

Load them **page-scoped in the page that needs them**, never in `config/fonts.ts` - nine extra families on every route for one block on one route.

## Sections and dark mode

**Elevation, never polarity. In light mode every background is light; in dark mode every background is dark.** A page is segmented with `<Section elevation="base" | "sunken">`. `base` is the page default; `sunken` is one OKLCh-L rung below it (ΔL 0.048, above the 0.045 perceptibility floor) and is the anchor treatment shared by the hero, the closing section and the footer. Cards go to `--surface`, one rung above base. There is no `raised` elevation on purpose: in light mode `--surface` is the top of the sRGB ladder, so a filled card inside a raised section would have nowhere to go.

Pages alternate elevation section by section, with no doubles unless two adjacent sections are deliberately one region.

A section does **not** re-declare tokens. `--foreground`, `--muted`, `--accent`, `--border` and the amber are global and legible on every rung in both themes, so nested content including HeroUI components needs nothing at the call site. Dark mode is delivered with `next-themes` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`), `suppressHydrationWarning` on `<Html>`, and a two-state toggle in `components/navbar.tsx`.

Two elevation ladders in `globals.css`, both hue 264. Dark holds chroma constant at 0.018, which is `--ink`'s own chroma; below ~0.012 the dark theme reads as graphite. **Light ramps chroma with depth** - 0.0267 at the sunken rung, 0.0104 and 0.0103 above it. That ramp is a fix, not a preference: with every light rung near-neutral the sunken rung read as a flat grey box and the hierarchy inverted, because a `--surface` card at ΔL 0.096 stood off it harder than it stood off `--background` at ΔL 0.048. **Do not normalise the ladder back to constant chroma.** The gamut is why it only works at the bottom: at L 0.978 the sRGB ceiling on hue 264 is chroma 0.0100, at L 0.8808 it is 0.0575.

Light `--paper-0/1/2` at L 0.8808 / 0.9300 / 0.9781, dark `--night-0/1/2` at L 0.1342 / 0.1820 / 0.2303. `--paper-sub` and `--night-sup` sit outside their ladder and exist for `--default`, which is one global value driving HeroUI's ghost, outline, secondary and tertiary buttons and would be invisible seated on the ladder. Each rung's theme flip is ΔL ~0.748, so every section visibly changes on toggle.

The ladder primitives are **not** in `@theme inline` - no `bg-night-2` or `bg-paper-1` utility. They are polarity-named, and a `bg-ink` utility is precisely how a dark block gets authored into a light page. The only two colour keys in the theme are `--color-sunken` (so the `section` recipe can write `bg-sunken`) and `--color-sheen-alt`.

**There should be no `dark:` utility anywhere in the codebase**, and `grep -rn 'dark:' components pages layouts` returning nothing is a real check. Every token flips at `:root`. The variant is still declared - `@custom-variant dark (&:where(.dark, .dark *))` - only because leaving Tailwind v4's `prefers-color-scheme` default in place would disagree with an explicit user choice, which is a live trap.

### The one contract rule - it fails silently at runtime, not at build

**`:root` (the semantic block) and `:root.dark` must declare the identical key set** - currently 24 keys plus `color-scheme`. Our `:root` is unlayered and HeroUI's `.dark` is in `layer(base)`; unlayered always wins over layered, so a key declared in `:root` but omitted from `:root.dark` silently keeps its **light** value in dark mode. Diff the two blocks mechanically; do not eyeball it. `:root.dark` is (0,2,0) rather than `.dark` (0,1,0) so it beats the light block regardless of source order.

**HeroUI's ~25 derived tokens need NO restatement, and the old re-derivation block must not come back.** HeroUI declares `--accent-hover`, `--field-*`, `--border-*`, `--separator-*`, `--background-*`, `--default-*`, `--*-soft*` and `--scrollbar-thumb` on `:root, .light, .default, [data-theme="light"], [data-theme="default"]` and on `.dark, [data-theme="dark"]` - **both of which are `<html>`**, the same element our tokens win on. A `var()` inside a custom property is substituted on the element that declares it, using that element's winning values, so every derived token recomputes against our operands on its own. Copying HeroUI's formulas in is ~125 lines of dead code.

The single exception, verified in `node_modules/@heroui/styles/dist/themes/default/variables.css`: `--surface-secondary` and `--surface-tertiary` ship as flat `oklch()` literals per theme rather than formulas, so they do not track `--surface`. They are restated once, as 6% and 8% mixes, alongside `--uncertain-surface`. All three are declared once and adapt to both themes on their own; adding a `.dark` copy would be dead code.

## Design tokens

`globals.css` holds the palette as raw custom properties, then rethemes HeroUI's semantic tokens onto it. No names collide with HeroUI's.

**`--uncertain` is the amber, and it carries exactly one meaning: uncertainty.** Status chips, estimate qualifiers, low-confidence markers. Never a heading, hover state, decorative border or CTA. It is named `uncertain` rather than `amber`/`warning` so decorative use reads as wrong at the call site. For warmth, use `--sheen`.

It is deliberately **not** mapped onto HeroUI's `--warning`: that means "something is wrong", the amber means "this is not certain".

The three amber tokens are **not** exposed through `@theme inline`, so **there is no `bg-uncertain` / `text-uncertain` / `border-uncertain` utility**. That is the mechanical enforcement: with theme keys present, Tailwind would generate amber on demand anywhere in the codebase. Only `statusChip` and `sectionRule` reach it, through arbitrary values. Needing it elsewhere is a signal to stop, not to add the key back.

In light mode the amber is split by measured contrast: `--uncertain` (`#9B5F00`) is the non-text amber at 3:1 (3.64 / 4.24 / 4.89 across the three light rungs, and 3.65 on its own chip fill) and `--uncertain-strong` (`#864F00`) is the text-safe one at 4.5:1 (4.68 / 5.46 / 6.30 across the rungs, and 4.70 on its own chip fill). In dark **one value serves both roles**: `#DB8914` measures 7.25 / 6.78 / 6.10 across the dark rungs and 5.90 on its own chip fill, so no split is needed.

Margins are thin - the non-text amber clears 3:1 by 0.64 at worst, the text amber clears 4.5:1 by 0.18. **Re-measure, do not eyeball, if either amber or the sunken rung moves.** The full table is in `globals.css` and has been reproduced against an independent WCAG 2.x implementation.

`--uncertain-surface` is near-isoluminant with the light sunken rung (ΔL 0.0017) - stated, not hidden. The chip separates by hue (warm on a hue-264 cool field) and by its `--uncertain` border at 3.64:1, which is the boundary that carries the requirement. The dark chip fill sits the same way against `--night-2` (ΔL 0.0135, 1.03:1) and is carried by the same border at 6.11:1.

`--separator` is a decorative hairline and deliberately below the 3:1 floor (1.39-1.87 light, 1.55-1.84 dark). The ΔL 0.048 elevation step, not the rule, does the separating. **Anywhere a boundary is the sole definition of a component, use `--border`, never `--separator`** - the sticky header's `border-b border-border` and the footer's own top edge are both this case.

Measures come from `--container-measure` (68ch) and `--container-band` (1120px), consumed via the `measure` recipe. Named `measure`, not `prose`, because Tailwind ships a hardcoded `max-w-prose` at 65ch that a `--container-prose` key does **not** override.

## HeroUI v3

v3 is a beta with breaking changes from v2, built on React Aria Components, and needs **no provider** - importing `@heroui/styles` is the whole setup. **Load the `heroui-react` skill and query its MCP tools before writing HeroUI markup; do not assume v2 APIs.**

Style with HeroUI's semantic classes (`bg-background`, `text-foreground`, `text-muted`, `text-accent`, `border-border`) rather than raw palette colors. They are rethemed onto the palette and declared once per theme, so a dark-mode variant is never needed on top of them.

To restyle a component, override its BEM class in `@layer components` (HeroUI's documented path) rather than fighting its computed class string - `.button { @apply rounded-md font-body }` is the example, and it also covers `ButtonLink`, which never goes through the React component. It cannot beat call sites: `buttonVariants` emits only BEM names, so a call-site utility lands in `@layer utilities` and outranks it.

`--radius` stays at HeroUI's `0.5rem`. The whole radius scale derives from it, and a `0.375rem` base emits subpixel radii that render as a smear. Set shape on the component, not the base.

## Accessibility floor

- **Interactive targets are 44×44.** The `iconButton` recipe is `size-11` and carries `touch-manipulation`. The box is grown for real rather than expanded with an `after:-inset-*` overlay: the clusters use `gap-1`, so an overlay would meet its neighbour inside that gap and the later sibling would paint over it. Growing the box changes the optical alignment of any nudged row - re-derive the nudge rather than leaving it.
- **`prefers-reduced-motion` is honoured**, by a global block in `globals.css` and by an explicit guard in `components/ui/circuit-board.tsx`.
- **Focus is visible on every interactive element**, via a global `:focus-visible` rule at `2px solid var(--focus)` with `outline-offset: 2px`.
- **No horizontal scroll from 360px to 1920px** on any route.
- Icons are `aria-hidden="true"`; the accessible name comes from the control's `aria-label`.

## Guardrails (enforced by hooks)

Configured in `.claude/settings.json`, scripts in `.claude/hooks/`.

| Hook | Event | Behavior |
|---|---|---|
| `guard-protected-files.sh` | PreToolUse `Edit\|Write` | Denies writes to lockfiles, `next-env.d.ts`, `tsconfig.tsbuildinfo`, `.next/`, `node_modules/`, vendored `.agents/skills/` |
| `guard-package-manager.sh` | PreToolUse `Bash` | Denies npm/yarn/pnpm installs and `npx` |
| `format-changed-file.sh` | PostToolUse `Edit\|Write` | Runs `eslint --fix` on changed `.ts`/`.tsx` |

`.claude/settings.json` also denies reads of `.env*` and `.envrc`.

**The format hook runs between edits.** Adding an import in one edit and using it in the next means the import is unused when the hook fires and gets stripped. Add both in one edit, or expect `tsc` to catch it.

`skills-lock.json` is deliberately **not** guarded - guarding it blocked legitimate skill uninstalls, and a guard that blocks routine maintenance gets disabled wholesale. Convention: add and remove whole entries freely, never hand-tune `computedHash`, keep parity with `.claude/skills/`:

```bash
diff <(jq -r '.skills|keys[]' skills-lock.json | sort) <(ls .claude/skills | sort)
```

## Lint rules that shape code style

Failures here are usually structural, not cosmetic:

- `import/order` with `newlines-between: always`; groups type -> builtin -> object -> external -> internal -> parent -> sibling -> index.
- `react/jsx-sort-props` - alphabetized, shorthand first, reserved first, callbacks last.
- `padding-line-between-statements` - blank line before every `return` and after a `const`/`let`/`var` block.
- `react-hooks/exhaustive-deps` is **off**, so stale-closure bugs will not be caught for you.
- Prettier runs through ESLint, so `eslint --fix` is also the formatter.

## Other traps

- **Do not `rm -rf .next` while `next dev` runs** - it 500s until restarted. The dev server also serves a stale CSS chunk after a `globals.css` edit; verify against `bun run start` or restart first.
- **`*/` inside a CSS comment terminates it early.** A comment listing token names as `--color-ink*/--color-paper*` will not parse. This has cost one build failure.
- **No em dashes**, in code, comments or copy. Spaced hyphens ` - `.
