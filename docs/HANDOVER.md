# Handover - PunkRaven site build

Point-in-time snapshot for whoever picks this up next, human or agent. The spec is
`docs/punkraven-site-build-instructions.md`; the copy is in `docs/copy/`; the
architecture and its rules are in `CLAUDE.md`. This file is **state and gotchas**,
not a restatement of either.

---

## Where the build is

| Phase | State |
|---|---|
| 0 - Audit | Done. Scaffold surveyed, conflicts raised, copy extracted. |
| 1 - Design system | Done, **committed** (`83dcd8a`). Partly superseded by 1a. |
| 1a - Theme rebuild | **Built, uncommitted.** Dark mode added, band system deleted. |
| 2 - Homepage `/` | **Built, uncommitted.** Cold-read test still owed by a human. |
| 3 - About `/about` | Not started. A 13-line stub renders a heading and nothing else. |
| 4 - T&T `/tnt` | Not started. Blocked on the nine Indic strings. |
| 5 - Lawman `/lawman` | Not started. |
| 6 - LawSafe `/lawsafe` | Not started. Full page approved. Highest-exposure page. |
| 7 - Form, polish, audit | Not started. Form is UI-only; no destination chosen. |

Work in phase order; a phase does not start until the previous one's acceptance
criteria pass (spec §6). Phase 1a was inserted mid-build and was not in the plan.

### Git

- `dff293a` - baseline (scaffold + copy docs + agent config). `HEAD` before it
  tracked **zero** files; this is the rollback floor.
- `83dcd8a` - Phase 1. **Its subject line says "band system", and the band system
  no longer exists** - it was deleted in 1a. The history is accurate for what that
  commit did; it just reads misleadingly now. Not rewritten, because rewriting a
  commit to match a later decision loses the record of the decision.
- **Everything since is uncommitted.** Phase 2, dark mode and the whole theme
  rebuild sit on the working tree as one undifferentiated diff. Splitting them into
  revertible commits is worth doing before Phase 3. Commit only when the user asks.

---

## The architecture changed - read this before touching styles

If you have read an older version of this file or of `CLAUDE.md`, the following is
now wrong: "no dark mode", "the site alternates light and dark bands", `<Band>`,
`.band--paper` / `--pure` / `--ink`, the six-block key-parity rule, and the
per-band re-derivation of HeroUI's tokens. **All of that is deleted.**

What is true now:

- **Uniformity.** In light mode every background is light; in dark mode every
  background is dark. Sections differentiate by **elevation**, never polarity.
- **`<Section elevation="base" | "sunken">`** replaces `<Band tone>`. There is no
  `raised` value on purpose - in light mode `--surface` is the top of the sRGB
  ladder, so a card inside a raised section would have nowhere to step to.
- **Two token blocks**, `:root` and `:root.dark`, 25 keys each. Not six.
- **Dark mode is real**: `next-themes`, `attribute="class"`, `defaultTheme="system"`,
  `enableSystem`, `disableTransitionOnChange`, two-state toggle in the navbar.
- `styles/globals.css` went 806 lines to 354.

This deliberately overrides spec §5.1. The override is recorded in the spec itself,
in `CLAUDE.md`, and in `globals.css`. Do not "restore" the bands as a bug fix.

---

## Decisions already made - do not re-litigate

**Product and copy**

1. **T&T does power LawSafe** - confirmed, so the dependent-stack framing and B4's
   "built on T&T and Lawman" eyebrow stand.
2. **Reuse the existing raven `Logo`** in `components/icons.tsx` as the wordmark. No
   logo was generated. Still needs a favicon from the same mark.
3. **The form is UI-only.** Renders and validates; no backend, no destination.
4. **Build the full LawSafe page** per spec §3.4.
5. **Hold every statistic** until an owner verifies it - including the ten that do
   carry a year and a source. No verification owner has been named.
6. **The nine Indic strings come from the user.** Nothing machine-translated.

**Design and architecture**

7. **Orbitron is display only.** It is latin-only, has no italic, and cannot render
   Indic script, `§`, `₹` or `→`. Inter is body, Fira Code is data.
8. **The circuit board appears only where a node graph illustrates content**, not as
   general decoration. Reduced-motion guard, dynamic import, `aria-hidden`.
9. **Dark mode exists** - this reverses the earlier decision to remove it.
10. **Uniformity over alternation** - see above. The dark hero, CTA and footer go
    away in light mode; that cost was raised and accepted.
11. **The teal is a semantic token, not a primitive.** A single shared value is
    possible but lands muddy in both themes at a threshold margin; splitting it costs
    one line and buys real headroom. It keeps the name `--sheen-alt`, so every call
    site is unchanged.
12. **The sticky header separates by border, never by fill.** No fill strategy works:
    a card scrolling under it sits on the same rung, ΔL 0.0000, opaque or not.
    `border-b border-border` is load-bearing. Never `border-separator` there.

---

## Owed by a human - blockers, by phase

- **Cold-read test on `/`** (spec §2a.6) - blocks Phase 2 acceptance. A reader who
  has **not** seen the source docs must look at `/` and `/about` and not call
  PunkRaven a legal or legal-tech company. No agent can run this; every agent on the
  build has read the sources.
- **Nine Indic strings** - blocks the T&T hero centrepiece in Phase 4. Sentence:
  "Audio in. Transcript and translation out." into Devanagari, Bengali, Tamil,
  Telugu, Kannada, Malayalam, Gujarati, Gurmukhi, Odia. Verify each with a native
  reader before shipping.
- **Statistic verification owner** - someone must own re-verifying the held figures
  on publication day.
- **Form destination** - no email or endpoint chosen; blocks wiring in Phase 7.
- **CircuitBoard source** - what ships is an agent-written reimplementation, not the
  Componentry source the user pasted in chat. Missing `CircuitPattern`,
  `CircuitNode`, `CircuitTrace`, the glow filter and the full status colour system;
  gained the reduced-motion guard the spec requires. The real source is in the chat
  history at the Phase 2 request.

---

## Verification status - read this before trusting anything

"Verified" in this repo means four things: `eslint` clean, `tsc --noEmit` clean,
`bun run build` green, **and** confirmed in a real browser via `chrome-devtools-axi`.

**The browser leg is currently switched off at the user's request, so nothing in the
theme rebuild meets the full bar.** The first three pass. Every contrast number in
`globals.css` is arithmetic that was computed twice against independent
implementations, and the emitted CSS was grepped to confirm the amber utilities are
absent and `bg-sunken` / `:root.dark` are present - but nothing has been observed
rendering.

The three claims that most need a browser, in order:

1. **That HeroUI's ~25 derived tokens genuinely recompute** rather than freezing at
   their light values. The entire justification for deleting 125 lines rests on it.
   The argument is sound and the selectors were confirmed in `node_modules`
   (`:root, .light, …` and `.dark, [data-theme="dark"]`, both of which are `<html>`),
   but it is a runtime claim.
2. **That the font chain survived** the `_app.tsx` and `_document.tsx` edits. The
   failure signature is the entire site silently dropping to `ui-sans-serif`.
3. **Whether the light `sunken` rung reads as an anchor section or as a grey box.**
   ΔL 0.048 on a light page is the one judgement arithmetic cannot make, and it is
   the visual cost of dropping the dark hero.

`code-reviewer` has also not run on the dark-mode work or the rebuild, at the user's
request. Both touched every section component.

Do not trust a subagent's self-report on contrast, fonts or rendering - re-check the
decisive fact yourself. Several agent claims during this build were only confirmed
because they were independently reproduced, and two were wrong.

---

## Traps that have already bitten, and will again

1. **The font chain is load-bearing and looks like dead code.** `pages/_app.tsx` has
   `import "@/config/fonts"` with no binding. Removing it silently empties every
   `--font-*-custom` and the whole site falls back to `ui-sans-serif`. In the pages
   router, `next/font` only emits its CSS module when the fonts are pulled in from
   `_app`. Full detail in `CLAUDE.md`.

2. **Key parity fails at runtime, not at build.** `:root` and `:root.dark` must
   declare the identical key set. Our `:root` is unlayered and HeroUI's `.dark` is in
   `layer(base)`; unlayered beats layered, so a key present in `:root` and missing
   from `:root.dark` silently keeps its **light** value in dark mode. Diff the two
   blocks mechanically; do not eyeball it.

3. **Do not re-add HeroUI's derived-token formulas.** They recompute on their own
   now. The block that restated them per band existed only because a band could
   invert polarity relative to its parent, and that problem no longer exists. The one
   real exception is `--surface-secondary` / `--surface-tertiary`, which HeroUI ships
   as flat `oklch()` literals rather than formulas; they are restated once.

4. **The amber rule is the site's signature and erodes silently.** Reserved for
   uncertainty, status and unverified claims only. It is protected by *not* being in
   `@theme` - there is no `bg-uncertain` utility, and adding the key back is how it
   degrades. Reachable only through `statusChip` and `sectionRule`. If you want
   warmth for its own sake, use `--sheen`.

5. **`.next` and the dev server.** Running `rm -rf .next` while `next dev` is running
   pulls the build manifest out from under it and it 500s until restarted. The dev
   server also does not reliably hot-reload CSS after a `globals.css` edit - it
   serves a stale chunk. Restart before trusting a browser check, or verify against
   `bun run start`.

6. **Subagents do not inherit the conversation.** When the user pastes source, it has
   to be passed through in the brief or the subagent re-derives it from scratch. This
   already happened once - see the CircuitBoard entry above.

7. **Package manager is bun, and `npx` is blocked** by a guard hook, as are
   npm/yarn/pnpm installs. Use `bun add` / `bun remove`, and
   `./node_modules/.bin/<bin>` or `bunx`. A second guard hook denies writes to
   lockfiles, `.next/`, `node_modules/` and vendored `.agents/skills/`.

8. **`*/` inside a CSS comment terminates it early.** A comment listing token names
   as `--color-ink*/--color-paper*` will not parse. Cost one build failure.

---

## The copy is a minefield - findings from extraction

The copy docs are structured briefs, not page content. Strip attribution lines,
field labels, claim-status tables, `Copy notes`, Part A, unchosen variants, the
status-note blockquotes and `*Optional section*` markers (spec §3.1). Do **not**
build a markdown renderer - hand-transcribe. These defects will trip a naive pass:

- **Claim gates use no literal "needs verification" / "do not publish" string.** A
  grep finds nothing and passes pages that should fail. The real gates are worded
  per-row ("Do not add", "Keep off the company page entirely", "Re-verify before
  publishing"). Read each Part C/D table by hand.
- **`§3.2` and `§2b.5` conflict.** `§3.2` mandates T&T Variant B for the homepage;
  its proof line carries a latency figure and a cost figure, both barred from `/` by
  `§2b.5`. `§2b` is a hard rule and wins - already handled, shipped as "22 scheduled
  languages - MIT-licensed weights, self-hosted".
- **Variant C says "all 22 *Indian* languages"** (drops "scheduled"), and `§3.2` puts
  Variant C in the footer and nav flyout, i.e. every page. Correct to "22 scheduled
  Indian languages". Same defect in the T&T A0 page title.
- **Deleting LawSafe `§0` does NOT remove NyayaSetu.** Four occurrences; two sit
  outside `§0` - the file's top metadata line and the closing italic. A naive
  section-delete passes the grep and still leaks. `grep -ri nyayasetu` the whole tree
  before shipping `/lawsafe`.
- **Competitor names survive the `§7` cut.** `§3.4` excludes LawSafe `§7`, but `§6`
  is included and names GPT-4, Llama 2, PaLM 2, Lexis+ AI and Westlaw with
  fabrication rates. Keep the principle, drop the names and percentages.
- **Part D misdirects on non-legal buyers.** It says they appear in "B5 and C5"; they
  are only in C5 (`/about`). On `/` they were sourced from the T&T doc's A10 audience
  list and placed in the T&T product block. `/about` C5 still owes them.
- **LawSafe `§4` scope list is 49 practice areas in one sentence.** Cut to the six the
  spec prescribes (rental agreement, cheque bounce, consumer complaint, wrongful
  termination, succession, cyber fraud) - all six are source-backed.
- **Highest-risk single string:** LawSafe `§2` cites Tele-Law's "1 crore
  pre-litigation *advice* sessions" - a government programme's figure that reads as
  LawSafe's own offering. Keep it unmistakably attributed or rephrase.

Confirmed clean across all four docs: no social proof of any kind, no "22+"
phrasing, and `lawman-summary.md` has zero numeric figures in body copy
(deliberately - add none).

---

## Phase 2 - what shipped, and what is still open

Built `/` from company-copy Part B, B1-B8, in order. New: `content/home.ts` (typed
content), `components/sections/*` (Hero, ProblemCards, StackDisplay, StackCircuit,
ProductBlock, PrincipleList, StatusTable, CtaBand, FooterNotes),
`components/ui/circuit-board.tsx`, `lib/utils.ts`.

Nine content gates were re-verified in a live browser **after** the theme rebuild, so
they describe the page as it stands: order holds, the stack display is two-tier, no
barred numbers render, status chips are amber and legible (5.90:1 on their own fill,
6.79-7.25:1 on their section), exactly two "Request early access" primary CTAs, no
social proof, non-legal buyers named, no legal-tech framing, no stats. The only digits
on the page are "22" (the scheduled-language count) and the model identifiers
`indic-conformer-600m-multilingual` and `indictrans2`.

**One gate was worded wrongly and has been corrected here.** It read "exactly three
status chips". Nine render, and nine is right: spec §2b.6 requires a visible status
label on every product *everywhere it appears*, and the three products appear in three
places (the stack display, the product blocks, and "Where we are"). Do not "fix" the
page down to three.

Open items carried forward:

- **Two unsourced word-counts** kept verbatim from the copy: "the other twelve
  scheduled languages" (B2) and "not the ten that are comfortable" (B5). Consistent
  with 22 (12+10) but not independently sourced. Flagged, not edited.
- **Product CTAs link to `/tnt`, `/lawman`, `/lawsafe`**, which 404 until Phases 4-6.
  The copy mandates them. "Request early access" resolves to `#early-access`; Phase 7
  makes it real.
- **`layouts/head.tsx` takes per-page metadata props.** `lawman-summary.md` has no
  metadata table and `C0` (about) has no OG fields - those must be authored for
  Phases 3 and 5.
- **Touch targets.** The theme toggle, GitHub link and hamburger are all 36×36,
  under the 44×44 guideline. Parity rather than a regression, but it is now three
  controls rather than two.
- **The circuit board is `hidden sm:block`, so it never paints at 360px** - but its
  `next/dynamic` chunk still downloads there. Wasted bytes on the narrowest viewport,
  which is also the slowest connection. Gate the import, not just the display.
- **The light `sunken` rung read as a flat grey box - since fixed with a cool tint,
  and the fix is not yet confirmed on a screen.** Observed in a browser: the boundary
  was perceptible (light base-to-sunken is 1.162:1, a slightly stronger luminance step
  than dark's 1.069:1) but the hierarchy inverted, because a `--surface` card at
  ΔL 0.096 stood off the sunken rung harder than the sunken rung stood off
  `--background` at ΔL 0.048. Ordinary cards out-weighted the hero.

  The fix ramps chroma with depth instead of holding it constant: `--paper-0` moved
  from `#D5D8DE` (chroma 0.009) to `#CFD8EA` (chroma 0.027), and `--paper-sub`
  followed it to `#BEC7D9` so HeroUI's ghost and outline button fills do not read as a
  foreign grey patch on a tinted section. Lightness is untouched, so every ΔL still
  holds; the largest contrast change anywhere is 0.04 and every pair was re-measured.
  The gamut is what makes this possible only at the bottom: at L 0.978 the sRGB
  ceiling on hue 264 is chroma 0.0100, but at L 0.8817 it is 0.0575.

  A side benefit worth keeping: `--uncertain-surface` `#DCD7D5` is warm and was sitting
  on a near-neutral field, so the "separates by hue" claim in the amber note was
  nominal. Against a cool `#CFD8EA` it is real.

  **Arithmetic only - nobody has looked at the tinted version yet.** Whether it now
  reads as a deliberate material rather than a lighting accident is exactly the kind of
  judgement that needs eyes. If it still falls short, the next lever is a hairline rule
  on sunken sections in light only. Neither approach needs the band system back.

---

## Working conventions

- `CLAUDE.md` is the architecture reference and is current. The delegation mandate
  that used to require routing every task through a subagent was **removed** at the
  user's request, along with the `inject-routing.sh` hook that re-asserted it.
- Browser work goes through `chrome-devtools-axi`, GitHub through `gh-axi`,
  reviewable plans and docs through `lavish-axi` as HTML artifacts.
- The current build plan artifact is `.lavish/punkraven-build-plan.html`.
- Load the `heroui-react` skill before writing HeroUI markup - v3 beta, v2 APIs do
  not apply.
