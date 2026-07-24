# CLAUDE.md

Guidance for Claude Code working in this repository.

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

There is no test suite. **"Verified" means all four of**: build passes, typecheck passes, lint is clean, and the change was confirmed in a real browser via `chrome-devtools-axi`.

## Architecture

Next.js 16 **pages router** (not App Router) + HeroUI **v3 beta** + Tailwind CSS v4 + TypeScript. Path alias `@/*` maps to the repo root.

- `pages/` - routes. `_app.tsx` imports fonts and global CSS and wraps the page in next-themes' `ThemeProvider`. `_document.tsx` puts the `next/font` variable classes on `<html>`. No `pages/api/` - the site is static; add it back only when a route needs a server.
- `layouts/default.tsx` - the layout every page composes manually (pages router has no nested layouts). `width` defaults to `"sections"`; pass `"prose"` or `"band"` to have the layout supply the measure. `layouts/head.tsx` renders per-page `<head>`.
- `config/site.ts` - single source of truth for site name, description, nav items, external links. Add nav entries here, not in `components/navbar.tsx`.
- `config/fonts.ts` - `next/font/google` loaders for the three type roles.
- `components/primitives.ts` - shared `tv` recipes: `title`, `subtitle`, `eyebrow`, `prose`, `measure`, `section`, `sectionRule`, `statusChip`, `button`. Reuse these instead of ad-hoc class strings.
- `components/section.tsx` - the section wrapper (`<Section elevation="base" | "sunken">`). `components/button.tsx` re-exports HeroUI's `Button` unchanged and adds `ButtonLink`, a link dressed as a button, which is what the site's CTA actually is. `components/site-footer.tsx` carries the mandatory "not a law firm" disclaimer.
- `components/icons.tsx` - all inline SVG icons, typed with `IconSvgProps`.
- `styles/globals.css` - Tailwind v4 CSS-first config. No `tailwind.config.js`; theme lives in `@theme`.

## Fonts - fragile wiring, read before touching

| Role | Face | Variable | Utility |
|---|---|---|---|
| Display | Orbitron | `--font-display-custom` | `font-display` |
| Body | Inter | `--font-body-custom` | `font-body`, default `font-sans` |
| Data | Fira Code | `--font-data-custom` | `font-data`, `font-mono` |

Inter is the default for prose; headings opt in to `font-display`. **Do not make Orbitron the global sans** - it is latin-only with no italic, and missing glyphs fall through per character to a fallback at `size-adjust: 124%`, which reads as a rendering bug mid-word.

Three things must stay in sync or every font silently falls back to `ui-sans-serif`:

1. The **`-custom` suffix is required** in `config/fonts.ts`. Reusing the Tailwind theme key names (`--font-display` etc.) creates a self-referential `var()` that resolves to nothing.
2. `globals.css` maps them with **`@theme inline`**. The `inline` keyword makes utilities compile to a raw `var()` that resolves on the element rather than at `:root` - and the next/font classes live on `<html>`, not `:root`.
3. `pages/_app.tsx` has a **side-effect `import "@/config/fonts"`**. It looks unused. It is not: in the pages router `next/font` only emits its CSS module when fonts are pulled in from `_app`. Deleting it empties every `--font-*-custom`.

After any font change, verify in a browser. Computed family must be the configured face, **not** `ui-sans-serif`:

```js
getComputedStyle(document.body).fontFamily                 // Inter, "Inter Fallback", ...
getComputedStyle(document.querySelector("h1")).fontFamily  // Orbitron, "Orbitron Fallback", ...
```

### Indic scripts - checked, not yet wired

Spec §5.5 sets one sentence in nine Indic scripts on `/tnt`. None of the three faces above covers any Indic script. All nine Noto families are available in `next/font/google`: `Noto_Sans_Devanagari`, `_Bengali`, `_Tamil`, `_Telugu`, `_Kannada`, `_Malayalam`, `_Gujarati`, `_Gurmukhi`, and **`Noto_Sans_Oriya`** for Odia - the Google Fonts family uses the Unicode block name, and `Noto Sans Odia` does not exist and will fail the loader.

Load them **page-scoped in `/tnt`**, never in `config/fonts.ts` - nine extra families on every page for one block on one page.

## Sections and dark mode

**Elevation, never polarity. In light mode every background is light; in dark mode every background is dark.** A page is segmented with `<Section elevation="base" | "sunken">`. `base` is the page default; `sunken` is one OKLCh-L rung below it (ΔL 0.048, above the 0.045 perceptibility floor) and is the anchor treatment shared by the hero, stack display, principles, CTA and footer. Cards go to `--surface`, one rung above base. There is no `raised` elevation on purpose: in light mode `--surface` is the top of the sRGB ladder, so a filled card inside a raised section would have nowhere to go.

This deliberately overrides spec §5.1's alternating light/dark bands. The dark hero, CTA and footer go away in light mode; that cost was accepted.

A section does **not** re-declare tokens. `--foreground`, `--muted`, `--accent`, `--border` and the amber are global and legible on every rung in both themes, so nested content including HeroUI components needs nothing at the call site. Dark mode is delivered with `next-themes` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`), `suppressHydrationWarning` on `<Html>`, and a two-state toggle in `components/navbar.tsx`.

Two elevation ladders in `globals.css`, both hue 264 with chroma held constant (0.010 light, 0.018 dark - 0.018 is `--ink`'s own chroma; below ~0.012 the dark theme reads as graphite and §5.1 fails). Light `--paper-0/1/2` at L 0.8817 / 0.9300 / 0.9781, dark `--night-0/1/2` at L 0.1342 / 0.1820 / 0.2303. `--paper-sub` and `--night-sup` sit outside their ladder and exist for `--default`, which is one global value driving HeroUI's ghost, outline, secondary and tertiary buttons and would be invisible seated on the ladder. Each rung's theme flip is ΔL ~0.748, so every section visibly changes on toggle.

The ladder primitives are **not** in `@theme inline` - no `bg-night-2` or `bg-paper-1` utility. They are polarity-named, and a `bg-ink` utility is precisely how a dark block gets authored into a light page. The only two colour keys in the theme are `--color-sunken` (so the `section` recipe can write `bg-sunken`) and `--color-sheen-alt`.

**There should be no `dark:` utility anywhere in the codebase**, and `grep -rn 'dark:' components pages layouts` returning nothing is a real check. Every token flips at `:root`. The variant is still declared - `@custom-variant dark (&:where(.dark, .dark *))` - only because leaving Tailwind v4's `prefers-color-scheme` default in place would disagree with an explicit user choice, which is a live trap.

### The one contract rule - it fails silently at runtime, not at build

**`:root` (the semantic block) and `:root.dark` must declare the identical key set** - currently 24 keys plus `color-scheme`. Our `:root` is unlayered and HeroUI's `.dark` is in `layer(base)`; unlayered always wins over layered, so a key declared in `:root` but omitted from `:root.dark` silently keeps its **light** value in dark mode. Diff the two blocks mechanically; do not eyeball it. `:root.dark` is (0,2,0) rather than `.dark` (0,1,0) so it beats the light block regardless of source order.

**HeroUI's ~25 derived tokens need NO restatement, and the old re-derivation block must not come back.** HeroUI declares `--accent-hover`, `--field-*`, `--border-*`, `--separator-*`, `--background-*`, `--default-*`, `--*-soft*` and `--scrollbar-thumb` on `:root, .light, .default, [data-theme="light"], [data-theme="default"]` and on `.dark, [data-theme="dark"]` - **both of which are `<html>`**, the same element our tokens win on. A `var()` inside a custom property is substituted on the element that declares it, using that element's winning values, so every derived token recomputes against our operands on its own. Copying HeroUI's formulas in is ~125 lines of dead code. The block that re-derived them per band existed only because a band could invert polarity relative to its parent; with uniformity that problem does not exist.

The single exception, verified in `node_modules/@heroui/styles/dist/themes/default/variables.css`: `--surface-secondary` and `--surface-tertiary` ship as flat `oklch()` literals per theme rather than formulas, so they do not track `--surface`. They are restated once, as 6% and 8% mixes, alongside `--uncertain-surface`. All three are declared once and adapt to both themes on their own; adding a `.dark` copy would be dead code.

## Design tokens

`globals.css` holds the PunkRaven palette as raw custom properties, then rethemes HeroUI's semantic tokens onto it. No names collide with HeroUI's.

**`--uncertain` is the amber, reserved for uncertainty, status and unverified claims only** (spec §5.2): status chips, estimate qualifiers, low-confidence markers, the "not built yet" section. Never a heading, hover state, decorative border or CTA. It is named `uncertain` rather than `amber`/`warning` so decorative use reads as wrong at the call site. For warmth, use `--sheen`.

It is deliberately **not** mapped onto HeroUI's `--warning`: that means "something is wrong", the amber means "we are not certain about this".

In light mode the amber is split by measured contrast: `--uncertain` (`#9B5F00`) is the non-text amber at 3:1 (3.65 / 4.24 / 4.89 across the three light rungs) and `--uncertain-strong` (`#864F00`) is the text-safe one at 4.5:1 (4.70 / 5.46 / 6.30, and 4.70 on its own chip fill). In dark **one value serves both roles**: `#DB8914` measures 7.25 / 6.78 / 6.10 across the dark rungs and 5.90 on its own chip fill, so no split is needed. The spec's own `#D98A1F` measures 2.53:1 on light paper and its suggested fallback `#B4700F` only 3.65:1, which clears the non-text threshold but fails the 4.5:1 a small status chip needs. The full measurement table is in `globals.css`; re-run it if a value changes.

`--uncertain-surface` is isoluminant with the light sunken rung (ΔL 0.0009) - stated, not hidden. The chip separates by hue (warm on a hue-264 cool field) and by its `--uncertain` border at 3.65:1, which is the boundary that carries the requirement.

The three amber tokens are **not** exposed through `@theme inline`, so **there is no `bg-uncertain` / `text-uncertain` / `border-uncertain` utility**. That is the mechanical enforcement of "protect it": with theme keys present Tailwind generated amber on demand anywhere on the site. Only `statusChip` and `sectionRule` may have amber, read through arbitrary values. Needing it elsewhere is a signal to re-read §5.2, not to add the key back.

`--separator` is a decorative hairline and deliberately below the 3:1 floor (1.40-1.87 light, 1.55-1.84 dark). The ΔL 0.048 elevation step, not the rule, does the separating. **Anywhere a boundary is the sole definition of a component, use `--border`, never `--separator`** - the sticky header's `border-b border-border` and the stack display's application-tier block are both this case.

Measures come from `--container-measure` (68ch) and `--container-band` (1120px), consumed via the `measure` recipe. Named `measure`, not `prose`, because Tailwind ships a hardcoded `max-w-prose` at 65ch that a `--container-prose` key does **not** override.

## HeroUI v3

v3 is a beta with breaking changes from v2, built on React Aria Components, and needs **no provider** - importing `@heroui/styles` is the whole setup. **Load the `heroui-react` skill and query its MCP tools before writing HeroUI markup; do not assume v2 APIs.**

Style with HeroUI's semantic classes (`bg-background`, `text-foreground`, `text-muted`, `text-accent`, `border-border`) rather than raw palette colors. They are rethemed onto the PunkRaven palette and declared once per theme, so a dark-mode variant is never needed on top of them.

To restyle a component, override its BEM class in `@layer components` (HeroUI's documented path) rather than fighting its computed class string - `.button { @apply rounded-md font-body }` is the example, and it also covers `ButtonLink`, which never goes through the React component. It cannot beat call sites: `buttonVariants` emits only BEM names, so a call-site utility lands in `@layer utilities` and outranks it.

`--radius` stays at HeroUI's `0.5rem`. The whole radius scale derives from it, and a `0.375rem` base emits subpixel radii that render as a smear. Set shape on the component, not the base.

## Guardrails (enforced by hooks)

Configured in `.claude/settings.json`, scripts in `.claude/hooks/`.

| Hook | Event | Behavior |
|---|---|---|
| `guard-protected-files.sh` | PreToolUse `Edit\|Write` | Denies writes to lockfiles, `next-env.d.ts`, `tsconfig.tsbuildinfo`, `.next/`, `node_modules/`, vendored `.agents/skills/` |
| `guard-package-manager.sh` | PreToolUse `Bash` | Denies npm/yarn/pnpm installs and `npx` |
| `format-changed-file.sh` | PostToolUse `Edit\|Write` | Runs `eslint --fix` on changed `.ts`/`.tsx` |

`.claude/settings.json` also denies reads of `.env*` and `.envrc`.

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

## Content docs

`docs/` holds product copy and vision documents (Lawman, LawSafe, T&T) unrelated to the current landing page code. They carry explicit "not yet built" status notes - do not treat their claims as shipped functionality or publish them as site copy without checking those notes.
