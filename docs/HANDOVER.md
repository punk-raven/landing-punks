# Handover - PunkRaven site build

Point-in-time snapshot for whoever picks this up next, human or agent. The spec is
`docs/punkraven-site-build-instructions.md`; the copy is in `docs/copy/`; the
architecture and its rules are in `CLAUDE.md`. This file is **state, decisions and
gotchas** - not a restatement of either.

---

## Where the build is

| Phase | State |
|---|---|
| 0 - Audit | Done. |
| 1 - Design system | Done, committed. **Superseded by 1a** - the band system it built is gone. |
| 1a - Theme rebuild | Done, committed. Dark mode added, band system deleted, uniform light/dark. |
| 2 - Homepage `/` | Done, committed. Cold-read test still owed by a human. |
| 3 - About `/about` | Done, committed. |
| 4 - T&T `/tnt` | Done, committed. **Cannot fully close** - §5.5 needs the nine Indic strings. |
| 5 - Lawman `/lawman` | Done, committed. |
| 6 - LawSafe `/lawsafe` | Done, **uncommitted**. Adapted per §3.4; draft reviewed before build. |
| 7 - Form, polish, audit | In progress, uncommitted. **No form** - early access was withdrawn. |

All five routes exist: `/`, `/about`, `/tnt`, `/lawman`, `/lawsafe`.

### Git

Branch **`feat/uniform-theme-and-homepage`**, cut from `main` because `main` was the
default branch. `main` still sits at `83dcd8a`; fast-forward it whenever you like.

```
feat(tnt): build the T&T page with every unverified figure held   240a031
feat(about): build the About page                                 97816ad
fix(a11y): keep the separator in product heading accessible names 623185b
fix(theme): tint the light sunken rung so it reads as a material  ee0e82e
docs: bring the handover, spec and build plan up to date          9046ac0
feat: homepage and a uniform light/dark theme                     2da1a07
chore(agents): drop the delegation mandate hook                   141717b
```

`83dcd8a` (Phase 1) is titled "corvid tokens, three type roles, **band system**". The
band system no longer exists. History is accurate for what that commit did; it just
reads misleadingly now. Not rewritten - amending a commit to match a later decision
destroys the record of the decision.

Phase 5 and the homepage-notes removal are the most recent commits; check `git log`
for anything after `240a031`.

---

## The architecture, if you have read an older version of anything

These are **wrong** now: "no dark mode", "the site alternates light and dark bands",
`<Band>`, `.band--paper` / `--pure` / `--ink`, the six-block key-parity rule, and the
per-band re-derivation of HeroUI's tokens. All deleted.

What is true:

- **Uniformity.** In light mode every background is light; in dark mode every
  background is dark. Sections differentiate by **elevation**, never polarity.
- **`<Section elevation="base" | "sunken">`** replaces `<Band tone>`. There is no
  `raised` value on purpose - in light mode `--surface` is the top of the sRGB ladder,
  so a card inside a raised section would have nowhere to step to.
- **Two token blocks**, `:root` and `:root.dark`, 25 keys each. Not six.
- **Dark mode is real**: `next-themes`, `attribute="class"`, `defaultTheme="system"`,
  two-state toggle in the navbar.
- `styles/globals.css` is 354 lines, down from 806.

This deliberately overrides spec §5.1, which is annotated in place with a SUPERSEDED
block. Do not "restore" the bands as a bug fix.

### Two ladders, both hue 264

| | sunken | base | raised (`--surface`) |
|---|---|---|---|
| light | `#CFD8EA` | `#E4E8EF` | `#F4F8FF` |
| dark | `#05080F` | `#0E121A` | `#191D25` |

ΔL 0.048 between adjacent rungs; each rung shifts ΔL ~0.748 between themes, so every
section visibly changes on toggle. Chroma **ramps with depth** (0.027 at the sunken
rung, ~0.010 at the top) - that is deliberate and load-bearing, see "Traps" below.

---

## Decisions already made - do not re-litigate

**Product and copy**

1. **T&T powers LawSafe** - confirmed, so the dependent-stack framing stands.
2. **Reuse the existing raven `Logo`** as the wordmark. Still needs a favicon.
3. **The form is UI-only.** Renders and validates; no backend, no destination.
4. **Build the full LawSafe page** per spec §3.4.
5. **Hold every statistic** until an owner verifies it. No owner has been named.
6. **The nine Indic strings come from the user.** Nothing machine-translated.

**Design and architecture**

7. **Orbitron is display only** - latin-only, cannot render Indic script, `§`, `₹`, `→`.
8. **The circuit board appears only where a node graph illustrates content.**
9. **Dark mode exists** - reversing the earlier decision to remove it.
10. **Uniformity over alternation** - overrides §5.1. The dark hero is gone in light
    mode; that cost was raised and accepted.
11. **The teal is a semantic token, not a primitive.** Keeps the name `--sheen-alt`, so
    call sites are unchanged.
12. **The sticky header separates by border, never by fill.** No fill works: a card
    scrolling under it sits on the same rung, ΔL 0.0000, opaque or not.
13. **Homepage B8 (footer notes) is not built.** See the next section.

**Taken at the Phase 6 copy review** - the artifact is `.lavish/lawsafe-page-copy.html`

14. **Every statistic on `/lawsafe` is held.** The alternative offered was publishing the
    NJDG pending-case counts and the free legal aid unawareness figure with years and
    attribution inline, holding the other nine; it was declined. Decision 5 stands
    unchanged.
15. **`/lawsafe`'s page title and meta description are approved** as authored. They were
    authored because the vision doc has no metadata table - the same gap
    `lawman-summary.md` has.
16. **"What the likely timelines and costs look like" is cut** from what the app returns.
    It was the closest thing on the page to a promise about an outcome. Do not restore it
    without a decision.

**Taken at the start of Phase 7**

17. **Early access is withdrawn, site-wide.** No form was built and none should be. All
    seven "Request early access" buttons are gone, `siteConfig.links.earlyAccess` is gone,
    the `primaryCta` field is gone from all four content files, and the four sections that
    used `#early-access` as a fragment target now carry ids named for their own subject.
    `components/sections/lawman-cta.tsx` and `lawsafe-cta.tsx` are renamed
    `*-closing.tsx`: they lost their only button, and a component called `Cta` that renders
    no call to action is what the next reader believes. `/tnt`'s A12 keeps its name because
    it keeps its secondary link to `/about`.

    **This is a deliberate deviation from two spec items.** §2b.7 makes "Request early
    access" the only primary CTA the site may use, and the §7 checklist requires it on
    every page; the site now has no primary CTA anywhere. §6's Phase 7 asks for the form,
    which does not exist. Restoring any of it starts with putting the constant back in
    `config/site.ts`, where a comment says so.

    **Consequence worth knowing:** `/tnt`'s A12 still says "we would like to hear about the
    workload" and `/about` C7 still says "we would like to talk". Both invitations now have
    no button behind them. The email in `siteConfig.links.email` is the only contact
    mechanism left, and it is reachable only through the social cluster.

---

## The one open disclosure question

**B8 was removed from the homepage on request.** Spec §3.3 lists the homepage as "B1
through B8", but unlike `/tnt`'s A13 - which §3.3 explicitly calls mandatory, not
optional - B8 carried no such marking.

Four of its five notes are carried elsewhere on `/` and were verified to be:
the §2a.4 "not a law firm" disclaimer is in `components/site-footer.tsx` on every
route; pre-launch status is in B6's status table; "figures are estimates" qualified
figures the page does not render (§2b.5 bars them from `/`); MIT weights appear four
times in B3 and B4.

**The fifth is a genuine gap.** `/` no longer states at product level that Lawman and
LawSafe are research and drafting instruments and not legal advice. The footer's
disclaimer is a *company*-level claim and is not the same statement. The product-level
one still appears on `/about` (C6), `/lawman` (the "Do not use" column) and `/tnt`
(A13), so the site as a whole is covered - the homepage alone is not.

The fix is one sentence appended to the footer disclaimer, which would restore it on
every route at once. **Deliberately not done without a decision**, because it edits a
spec-mandated disclosure on four pages. Full reasoning is in the comment where B8's
content used to live in `content/home.ts`.

Removing B8 also left the sunken CTA meeting the sunken footer with no rung between
them, and parity cannot fix that - flipping either one only moves the collision
earlier. The footer now draws its own `--border` top edge, per the repo's own rule
that a sole boundary uses `--border` and never `--separator`.

---

## Owed by a human - blockers

- **Cold-read test.** Now covers all five routes. A reader who has **not** seen the
  source docs must come away describing a technology company, not a legal or legal-tech
  one. No agent can run this; every agent on the build has read the sources. This is the
  acceptance gate for Phases 2 to 6, and `/lawsafe` raises the stakes on it - it is a
  citizen-facing legal product on a technology company's site.
- **Nine Indic strings** - blocks §5.5 on `/tnt`. Sentence: "Audio in. Transcript and
  translation out." into Devanagari, Bengali, Tamil, Telugu, Kannada, Malayalam,
  Gujarati, Gurmukhi, Odia. Verify each with a native reader. The scaffold is built and
  renders nothing; see "The §5.5 scaffold" below.
- **A latency benchmark for T&T.** Higher value than the Indic strings if a
  latency-sensitive buyer matters: `/tnt`'s A6 currently tells a reader that latency
  will be published once measured, so that reader leaves with nothing actionable.
- **Statistic verification owner** - nobody owns re-verifying the held figures.
- **Form destination** - blocks Phase 7.
- **CircuitBoard source** - what ships is an agent reimplementation, not the Componentry
  source pasted in chat. Missing `CircuitPattern`, `CircuitNode`, `CircuitTrace`, the
  glow filter and the status colour system; gained the reduced-motion guard.
- **A URL for "Read the technical plan"** - referenced in `/tnt` A0 and A12, no source
  gives one, so it renders nowhere. A13 note 4 still asserts the planning documents are
  public, which is now the only unlinked claim on that page.
- **Approve or replace three authored strings on `/lawman`** - its source doc has no
  metadata table, so the page title, meta description, and the comparison heading
  "When to use Lawman, and when not to." were authored. All flagged in-file.

---

## The §5.5 scaffold - exact state

Renders **nothing**: no placeholders, no transliterations, no reserved space, and the
nine Noto families are deliberately **not loaded** - nine font payloads for zero output.

To fill it, in order:

1. Nine strings, each checked by a native reader of that script.
2. Paste into `heroScriptSentence.lines[].text` in `content/tnt.ts`. That is the whole
   content edit; the markup does not change.
3. Load the nine families **page-scoped in `pages/tnt/index.tsx`**, never in
   `config/fonts.ts`, and apply each variable to its row. Each line already carries its
   `next/font/google` family name and a BCP-47 tag.

The guard covers more than empty strings: a string rendered before step 3 falls through
to a browser default face, which is the failure §5.3 forbids. **Odia's family is
`Noto_Sans_Oriya`** - the Unicode block name. `Noto_Sans_Odia` does not exist and fails
the loader.

---

## Verification status - read before trusting anything

"Verified" here means four things: `eslint` clean, `tsc --noEmit` clean, `bun run build`
green, **and** confirmed in a real browser via `chrome-devtools-axi`.

All four currently pass. Browser verification was switched off by the user for part of
this build and later switched back on; everything since has been checked on screen.

Confirmed in a browser, not merely argued:

- **HeroUI's ~25 derived tokens genuinely recompute** rather than freezing at their
  light values. `--surface-hover` mixes toward `#dde1e9` in dark and toward `#0f131b` in
  light: both operands *and* the mix direction invert, which a frozen value cannot do.
  This was the entire justification for deleting 125 lines of re-derivation.
- **The font chain survives** the `_app`/`_document` edits: body resolves to Inter, `h1`
  to Orbitron, chips to Fira Code, on every page in both themes.
- Every page at 360px with no horizontal overflow, using device emulation.

**Do not trust a subagent's self-report on contrast, fonts or rendering.** Re-check the
decisive fact yourself. Several claims during this build were confirmed only because
they were independently reproduced, and two were wrong.

`code-reviewer` has **not** run on any of this, at the user's request.

---

## Traps that have already bitten, and will again

1. **The font chain is load-bearing and looks like dead code.** `pages/_app.tsx` has
   `import "@/config/fonts"` with no binding. Removing it silently empties every
   `--font-*-custom` and the whole site falls back to `ui-sans-serif`. In the pages
   router `next/font` only emits its CSS module when fonts are pulled in from `_app`.

2. **Key parity fails at runtime, not at build.** `:root` and `:root.dark` must declare
   the identical key set. Our `:root` is unlayered and HeroUI's `.dark` is in
   `layer(base)`; unlayered beats layered, so a key present in `:root` and missing from
   `:root.dark` silently keeps its **light** value in dark mode. Diff them mechanically.

3. **Do not re-add HeroUI's derived-token formulas.** They recompute on their own now -
   verified on screen. The one real exception is `--surface-secondary` /
   `--surface-tertiary`, which HeroUI ships as flat `oklch()` literals rather than
   formulas; they are restated once.

4. **The chroma ramp on the light ladder is a fix, not a preference.** With every light
   rung near-neutral the sunken rung read as a flat grey box and the hierarchy inverted -
   `--surface` cards stood off it harder than it stood off `--background`. Do not
   "normalise" the ladder back to a constant chroma. The gamut is why it only works at
   the bottom: at L 0.978 the sRGB ceiling on hue 264 is chroma 0.0100; at L 0.8817 it
   is 0.0575.

5. **`--separator` is a decorative hairline (~1.5:1) and is not a boundary.** Where a
   rule is the *sole* thing dividing two regions or defining a component, use
   `--border`. This has been got wrong twice: the homepage notes list had invisible
   bullet markers, and the footer needed a real edge once B8 was removed.

6. **The amber erodes silently.** Reserved for uncertainty, status and unverified claims
   only. Protected by *not* being in `@theme` - there is no `bg-uncertain` utility, and
   adding the key back is how it degrades. Reachable only through `statusChip` and
   `sectionRule`.

7. **`.next` and the dev server.** Do not `rm -rf .next` while `next dev` runs - it 500s
   until restarted. The dev server also serves a stale CSS chunk after a `globals.css`
   edit; verify against `bun run start` or restart first.

8. **Subagents do not inherit the conversation.** Pasted source must be passed through
   in the brief or it gets re-derived from scratch. This already cost us the real
   CircuitBoard.

9. **Package manager is bun; `npx` is blocked** by a guard hook, as are npm/yarn/pnpm
   installs. A second guard hook denies writes to lockfiles, `.next/`, `node_modules/`
   and vendored `.agents/skills/`.

10. **`*/` inside a CSS comment terminates it early.** A comment listing token names as
    `--color-ink*/--color-paper*` will not parse. Cost one build failure.

11. **The format-on-write hook runs between edits.** Adding an import in one edit and
    using it in the next means the import is unused when the hook fires and gets
    stripped. Add both in one edit, or expect `tsc` to catch it.

---

## The copy is a minefield - findings that still apply

The copy docs are structured briefs, not page content. Strip attribution lines, field
labels, claim-status tables, `Copy notes`, Part A, unchosen variants and
`*Optional section*` markers (spec §3.1). **Hand-transcribe. Do not build a markdown
renderer.**

How Phase 6 handled the LawSafe traps - all four were live and all four were hit:

- **Deleting LawSafe `§0` does NOT remove the codename.** Four occurrences; two sit
  outside `§0` - the file's top metadata line and the closing italic. A section-delete
  passes a naive grep and still leaks. **Grep the whole tree, case-insensitively, before
  shipping.** It is now absent from `components`, `pages`, `content`, `config`, `layouts`
  and `styles`, including in comments. It still appears in the source doc, in this file,
  and in two `.lavish` artifacts, all of which are internal and one of which is the
  instruction to check.
- **Competitor names survive the `§7` cut.** `§3.4` excludes LawSafe `§7`, but `§6` is
  included and its first principle names three general-purpose models and two legal
  research products with fabrication rates. The principle is kept; the names and the
  percentages are gone.
- **LawSafe `§4`'s scope list is 49 practice areas in one sentence.** Cut to the six the
  spec prescribes - rental agreement, cheque bounce, consumer complaint, wrongful
  termination, succession, cyber fraud. All six are source-backed.
- **Highest-risk single string:** LawSafe `§2` cites Tele-Law's pre-litigation session
  count - a government programme's figure that reads as LawSafe's own offering. Held with
  every other statistic, so it does not render at all.
- **Claim gates use no literal "needs verification" string.** A grep finds nothing and
  passes pages that should fail. Read each Part C/D table by hand.
- **`/about` C5 still owes nothing** - the non-legal buyers landed. But Part D misdirects
  by saying they appear in "B5 and C5"; they are in C5 and in `/`'s T&T block.

Confirmed clean across all four docs: no social proof of any kind, no "22+" phrasing,
and `lawman-summary.md` has zero numeric figures in body copy (deliberately - add none).

---

## Per-page notes

**`/`** - B1 to B7. Nine content gates re-verified after the theme rebuild. Nine status
chips render, not three: §2b.6 requires a status label on every product everywhere it
appears, and three products appear in three places. Do not "fix" it down to three. Two
unsourced word-counts kept verbatim from the copy - "the other twelve scheduled
languages" and "not the ten that are comfortable" - consistent with 22 but not
independently sourced.

**`/about`** - C1 to C8. Two passages de-numbered because Part E bars numbers from the
company page: C2's user figures and C4's Stanford RegLab rates. The RegLab attribution
and argument are kept; the two commercial products are deliberately unnamed. The
weakest line is C2's "the great majority of its internet users", which converts a
precise unverified claim into a vaguer one - worth a second opinion.

**`/tnt`** - A1 to A13. Every unverified figure held; nothing rounded or hedged into
existence. A7 survives intact because its argument rests on MIT licensing rather than on
the rupees. A6 is honestly a different section than the copy doc wrote. The response
example shows confidence values `0.87 / 0.93 / 0.88` which a hostile reader could take
as accuracy figures - reversible with `<0.00-1.00>` placeholders. Model parameter counts
extend the Part C table rather than follow it; also reversible.

**`/lawman`** - Part 1 in order. Its three spec gates all pass and were measured:
the "Do not use" column is byte-identical to "Use Lawman when" on every property, the
word "advice" appears exactly once (in the disclaiming sentence), and the source's
status note surfaces as a chip. `ComparisonColumns` has **no** per-column styling API -
no `tone`, no `variant`, no `isNegative` - so there is no channel through which a later
edit could make the negative column recede. Keep it that way.

---

**`/lawsafe`** - the only adapted page on the site, and the only one whose copy was
drafted and reviewed before it was built (Phase 6 requires that). The draft is
`docs/copy/lawsafe-page-copy.md`; the reviewable artifact is
`.lavish/lawsafe-page-copy.html`. Six sections in §3.4's order. Every figure in the
source is held, so the problem section argues structurally rather than quantitatively -
the full held-figure table, with the source the vision doc gives for each, is in the
draft. The not-advice boundary sits in the **hero**, not the footer, because this is a
citizen-facing legal product and §2b.8 is a legal-exposure rule; it also carries the
human-review requirement. The word "advice" appears once in `content/lawsafe.ts`, inside
that sentence. The advocate panel is stated as not existing yet, which the company copy's
Part D requires. The source's "Legal Intelligence Engine" is cut twice over: §3.4 bars
architecture detail, and on this site Lawman is the reasoning system.

One line worth a second opinion if it is ever revisited: the second audience card names
company incorporation, IP registration and compliance. Those are service categories
rather than committed verticals, so §2a.5 is not engaged, but this is the most exposed
page on the site.

## Out of scope but pending

- **`/tnt` and `/lawman` are not in `config/site.ts` `navItems`.** Spec §3.2 wants the
  product list in the footer and a nav flyout. With three product pages after Phase 6
  this becomes real work - Phase 7.
- **Touch targets** - theme toggle, GitHub link and hamburger are all 36×36, under the
  44×44 guideline. Parity, not a regression, but it is now three controls.
- ~~**The circuit board is `hidden sm:block`**~~ - fixed in Phase 7. `StackDisplay` now
  gates the *render* on a `matchMedia("(min-width: 40rem)")` hook, so the chunk is not
  fetched at 360px at all. Verified: zero framer-motion, lucide or `stack-circuit`
  requests at 360px, board still draws at 1200px.
- **No OG image anywhere.** `head.tsx` falls back to title and description and emits
  `twitter:card=summary`, correctly. `/` has a distinct OG line and the others do not.

---

## Working conventions

- `CLAUDE.md` is the architecture reference and is current.
- The delegation mandate that required routing every task through a subagent was
  **removed** at the user's request, along with the `inject-routing.sh` hook.
- Browser work goes through `chrome-devtools-axi`, GitHub through `gh-axi`, reviewable
  plans and docs through `lavish-axi` as HTML artifacts.
- The build plan artifact is `.lavish/punkraven-build-plan.html`. **It predates Phases 3
  to 5 and is stale** - refresh it or ignore it.
- Load the `heroui-react` skill before writing HeroUI markup - v3 beta, v2 APIs do not
  apply.
- **No em dashes anywhere**, in copy or code comments. Spaced hyphens ` - `.
