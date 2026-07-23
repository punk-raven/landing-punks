# Build instructions - PunkRaven website

**For Claude Code.** Read this file completely before writing any code. It is the
specification; the four copy documents are the content. Where they disagree, this file wins
on structure and the copy documents win on wording.

---

## 0. Read first

```
docs/copy/punkraven-company-copy.md    <- company positioning, homepage, about page
docs/copy/lawman-summary.md            <- Lawman landing page + homepage variants
docs/copy/lawsafe-product-vision.md    <- LawSafe vision (NOT copy - see §3)
docs/copy/tnt-website-copy.md          <- T&T landing page + homepage variants
```

Move the four files into `docs/copy/` before starting. They are the source of truth for all
text on the site.

---

## 1. What you are building

A static marketing site for **PunkRaven**, a pre-launch Indian **technology company** building
applied AI infrastructure: a speech layer for Indian languages, a grounded reasoning layer,
and one application built on both. Five pages:

| Route | Page | Primary source |
|---|---|---|
| `/` | Homepage | `punkraven-company-copy.md` Part B |
| `/about` | About | `punkraven-company-copy.md` Part C |
| `/tnt` | T&T product page | `tnt-website-copy.md` Part A |
| `/lawman` | Lawman product page | `lawman-summary.md` Part 1 |
| `/lawsafe` | LawSafe product page | `lawsafe-product-vision.md` (needs adaptation, §3.4) |

Plus a shared header, footer, and one early-access form endpoint.

**Audience:** technical and institutional buyers, prospective engineers, partners, funders.
Not end consumers. Assume the reader is skeptical, technically literate, and has seen a
hundred AI landing pages this year.

**The single job of the site:** make a skeptical technical reader believe this infrastructure
company is real and serious - without letting them conclude that anything has shipped, or
that this is a legal services business.

**PunkRaven is not a legal-tech company.** Two of its three projects work on law, which makes
law the first domain it went deep on, not its identity. The category is applied AI
infrastructure. §2 makes this a build rule, not a preference.

---

## 2. Two gates - read this section twice

### 2a. The category gate

**PunkRaven is a technology company. The site must never read as a legal services business.**
This is a positioning and a compliance requirement: a software company that builds tools sits
in a different regulatory position from a firm providing legal services, and the LawSafe
source document is careful about Bar Council of India norms for exactly that reason.

1. **Infrastructure before application, in every ordering on the site.** Nav, homepage
   blocks, footer product list, stack display, sitemap: **T&T, then Lawman, then LawSafe.**
   Never lead with LawSafe. Order is the primary signal of what kind of company this is.
2. **The stack display on `/` is two-tier, not three-layer.** T&T and Lawman are grouped as
   *the infrastructure*; LawSafe sits above a divider as *the first application*. See §5.4.
3. **Name T&T's non-legal buyers on the company pages.** Contact centres, consumer apps,
   government services, media, education. They appear in the copy for a reason - they are the
   proof that the capability is horizontal. Do not cut them for space.
4. **`/` and `/about` may not describe PunkRaven as legal, legal-tech, or law-adjacent.**
   The footer disclaimer stating that PunkRaven does not provide legal services and is not a
   law firm is mandatory on every page.
5. **Do not name domains the company has not committed to.** The copy says the architecture
   makes the domain corpus a parameter. It must not promise healthcare, finance, or
   government verticals. Structural claim only, no roadmap.
6. **The cold-read test, at the end of every phase:** show `/` and `/about` to someone who
   has not read the source documents and ask what industry this company is in. If the answer
   is "legal," the phase has failed regardless of what else passes.

### 2b. The claim gate

Two of the four source documents carry explicit warnings that they describe unbuilt products.
`tnt-website-copy.md` has a claim-status table in Part C. `lawman-summary.md` opens with a
status note. `punkraven-company-copy.md` has one in Part D.

**Hard rules. Do not violate these even if the copy you are transcribing seems to invite it.**

1. **Never render a claim marked "needs verification" or "do not publish" in any Part C or
   Part D table.** Before building each page, read that page's claim-status table and treat
   it as a build gate.
2. **No customer logos, testimonials, case studies, "trusted by" strips, or star ratings.**
   There are no customers. This is stated explicitly in the T&T design notes. If a layout
   feels like it needs a social-proof band, leave the space empty or cut the band.
3. **No fabricated numbers, ever.** Only numbers that appear in a source document may appear
   on the site. Do not invent metrics, uptime figures, team sizes, funding, or dates.
4. **Every performance and cost figure must carry its footnote.** T&T's latency and cost
   tables are engineering estimates at planning stage. They render only with the qualifier
   attached and visible - not in a tooltip, not behind a hover.
5. **No latency, cost, or accuracy numbers on `/` or `/about`.** Those pages make structural
   claims only. The numbers live on `/tnt` where their derivations live.
6. **Every product must carry a visible status label.** `Planning` for T&T, `Specified` for
   Lawman, `In design` for LawSafe. On the homepage block, on the product page hero, and in
   the nav flyout if you build one.
7. **The only primary CTA on the site is "Request early access."** Never "Get your API key,"
   "Start building," "Sign up," or "Try it free." There is no endpoint to hand out.
8. **Never present Lawman or LawSafe as legal advice.** "Research and drafting," never
   "advice." This is a legal-exposure issue, not a stylistic one.

---

## 3. Content pipeline

### 3.1 The copy docs are not page content

They are *copy documents*: structured briefs containing section labels, source attributions,
variant options, and editorial notes. Do not render them as markdown pages.

**Strip all of this before it reaches the site:**

- `*Source: doc 08 §5.1*` attribution lines under every block
- Field labels like `**Section heading**`, `**Body**`, `**Primary CTA**` - these name the
  slot, they are not content
- `Part C - Claim status` and `Part D - Claim status` tables
- `Copy notes` / `Section design notes` sections
- `Part A - Positioning` in the company doc (marked "not for publication")
- Variant blocks you did not choose
- The `> **Status note:**` blockquotes at the top of files
- Any parenthetical marked `*Optional section*`

**Recommended approach:** hand-transcribe the chosen copy into typed content entries or
component props, using whatever content convention the existing scaffold already has. Do
**not** build a markdown renderer that pipes these files straight to HTML - the apparatus
will leak. The content volume is small enough that explicit transcription is faster and
safer than a pipeline.

### 3.2 Variant selection - pick one, never render several

| Document | Location | Use this variant | Not these |
|---|---|---|---|
| `tnt-website-copy.md` | Part B | **Variant B (Compact)** for the homepage block | A is a full band, too heavy for a 3-product homepage; C is nav-flyout only |
| `lawman-summary.md` | Part 2 | **Variant A (standard section)** for the homepage block | B is too thin next to T&T's Variant B; C's table duplicates the homepage stack display |
| `tnt-website-copy.md` | Part B | **Variant C (One-liner)** in the footer product list and nav flyout | — |
| `lawman-summary.md` | Part 2 | **Variant B (condensed)** in the footer product list and nav flyout | — |

### 3.3 Full page mapping

**`/` homepage** - `punkraven-company-copy.md` Part B, sections B1 through B8 in order.
B4 pulls the T&T and Lawman blocks from their own docs per §3.2; the LawSafe block is written
out in full inside B4 itself.

**`/about`** - Part C, sections C1 through C8 in order. C8 (the name) is marked optional; keep
it, it is short and it humanises an otherwise dry page.

**`/tnt`** - `tnt-website-copy.md` Part A, sections A1 through A13 in order. This is the most
complete document of the four; follow it closely. Note A9 contains a request/response pair
that must render as syntax-highlighted code blocks, and A13's footer notes are mandatory, not
optional.

**`/lawman`** - `lawman-summary.md` Part 1, in order: Hero, What is Lawman, Why Lawman is
required, How it works, When to use Lawman, Closing CTA. The "When to use / Do not use"
section is unusual and valuable - render it as a genuine two-column comparison, not as one
list with a heading. A company publishing the cases where its product is the wrong tool is
the most persuasive thing on that page. Do not soften or shorten the "Do not use" column.

**`/lawsafe`** - see §3.4.

### 3.4 LawSafe needs adaptation, not transcription

`lawsafe-product-vision.md` is an internal founder's vision document, not website copy. It is
long, first-person-plural, and contains material that must not go on a public page.

**Build the LawSafe page from these sections only:**

- §1 Vision Statement → hero
- §2 Why We Exist → the problem section (keep the statistics, add years inline, verify first)
- §3 Who We Serve → three audience cards (citizen / small business / advocate)
- §4 What The Product Is → what it does, **product surfaces only, no architecture detail**
- §6 Guiding Principles → principles section
- §5 The Future We Are Building Toward → closing, heavily condensed

**Exclude entirely:**

- §0 A Note on the Name - **NyayaSetu is an internal codename and must never appear publicly**
- §7 Strategic Differentiation - names competitors and discusses moats; this is investor
  material, not customer material
- Market sizing figures (USD 2.64bn, Tracxn counts, CAGR) - investor framing
- The full scope list in §4 - it runs to a paragraph of forty-plus practice areas. Reduce to
  six to eight representative examples: rental agreement, cheque bounce, consumer complaint,
  wrongful termination, succession, cyber fraud.

**Rewrite the register.** The vision doc says "we envision an India where..." Public copy says
what the product does for the reader. Convert first-person aspiration into second-person
utility, and keep the house voice described in §7.

---

## 4. Working with the existing scaffold

**The project is already scaffolded. Do not re-scaffold it, do not migrate it to another
framework, and do not add a framework to it.** Adopt what is there.

### 4.1 Survey before you build

First task, before any code: read the existing project and write a short summary of what you
found. Specifically —

- Framework and version, from `package.json`
- Routing convention - file-based or config-based, and where pages live
- Styling approach already in place - plain CSS, CSS modules, Tailwind, CSS-in-JS, or a
  component library
- Whether a design token layer already exists, and in what form
- Whether any layout, header, footer, or button component already exists
- TypeScript or not, and how strict
- What is already wired: fonts, metadata handling, form endpoint, deploy target

Report that summary before proceeding. Everything below adapts to it.

### 4.2 What is fixed regardless of stack

- **Five routes:** `/`, `/about`, `/tnt`, `/lawman`, `/lawsafe`
- **Static output.** This is a content site. Nothing here needs client-side rendering or a
  data layer. If the scaffold defaults to server rendering, build these five routes static.
- **Near-zero client JavaScript.** The only interactive elements are the nav toggle, the
  form, and one scroll reveal. A company selling self-hosted, dependency-light
  infrastructure should not ship a 300kb bundle to say so.
- **The colour and status semantics in §5.** These are not negotiable regardless of how they
  are expressed in the existing styling system.

### 4.3 Reconciling the design system with what is there

The design in §5 is a token system with one semantic colour rule. Express it in whatever the
scaffold already uses:

| If the scaffold uses | Do this |
|---|---|
| Plain CSS or CSS modules | Add `tokens.css` with the custom properties from §5.1 and import it once at the root |
| Tailwind | Put the §5.1 values in the theme config as named tokens. **Name the amber token something like `uncertain`, not `amber` or `warning`** - the name should make misuse feel wrong |
| An existing token file | Extend it. Do not duplicate or shadow it; if it already defines a conflicting accent, flag the conflict rather than silently overriding |
| A component library with its own theme | Theme it to §5.1 rather than fighting it, and only hand-build the components in §4.4 that the library does not cover |

**On Tailwind specifically:** if it is already installed, keep it. The original argument for
plain CSS here was about protecting the semantic colour rule, and a well-named theme token
protects it just as well. Do not rip out a working setup over a style preference.

### 4.4 Components needed

By role, not by filename - map these to the existing convention and reuse anything the
scaffold already provides:

**Layout:** base layout wrapper, header, nav (with mobile state), footer
**UI:** button, **status chip** (see §5.2 - the most important small component on the site),
callout, section rule
**Sections:** hero, stack display, product block, principle list, problem cards, SLA/figures
table, two-column comparison, FAQ, CTA band

The status chip and the stack display are the two components worth building carefully. Every
other section is a straightforward content block.

Put the four copy documents in `docs/copy/` inside the repo, unmodified, so the source of
every line on the site stays traceable.

---

## 5. Design system

Follow this exactly. It is derived from the subject, not from a template. Do not substitute a
cream-and-serif palette, a near-black-plus-acid-green palette, or a hairline-rule broadsheet
layout - all three are the current defaults for AI-built sites and a technical reader clocks
them instantly.

### 5.1 Palette - corvid, not generic dark

A raven is not black. It is a blue-shifted near-black with a violet and teal iridescence.
That is the palette, and it is specific to this company in a way a grey-and-blue SaaS palette
is not.

```css
:root {
  --ink:        #0F131B;  /* raven black, blue-shifted. Body text on light, bg on dark */
  --ink-soft:   #39404E;  /* secondary text */
  --paper:      #F3F5F8;  /* cool paper. Deliberately NOT cream */
  --paper-pure: #FFFFFF;  /* card surfaces */
  --sheen:      #5B4FCF;  /* violet iridescence. Primary accent, links, CTA */
  --sheen-alt:  #17968F;  /* teal iridescence. Secondary accent, diagram strokes */
  --signal:     #D98A1F;  /* amber. SEE 5.2 - SEMANTIC ONLY */
  --rule:       #C7CEDA;  /* hairlines, borders */
}
```

Dark sections (hero, CTA band, footer) invert to `--ink` background with `--paper` text.
Do not build a full dark-mode toggle; the site alternates light and dark bands by design.

### 5.2 The amber rule - the one thing that makes this site theirs

**`--signal` amber is reserved exclusively for uncertainty, status, and unverified claims.**
It is never decorative. It never appears on a heading, a hover state, a border for visual
interest, or a CTA.

It appears only on:

- Status chips: `Planning`, `Specified`, `In design`
- The estimate qualifier under any figure table
- Low-confidence markers in the T&T confidence explainer
- The "we have not built this yet" band on `/` and `/about`

The result: the single warm colour on an otherwise cool site always means *we are not certain
about this*. The company's entire thesis is calibrated honesty; the site's colour system
should encode it rather than describe it. **This is the signature element. Protect it.** If
you find yourself reaching for amber to make something look good, use `--sheen` instead.

### 5.3 Type

**Typefaces are already decided by the brand system. Do not choose them.** Ask the team for
the faces and load them; do not substitute, and do not pick a fallback family without
confirming it. Three roles to fill:

```
Display   headings, hero, wordmark
Body      prose, all running text
Data      tables, code, API contract, confidence values, status chips, eyebrows
```

If the brand system does not name a distinct data face, use the body family's tabular figures
rather than introducing a third family - but the API contract block on `/tnt` and the SLA and
cost tables still need a monospaced or tabular treatment, so raise it if nothing covers that.

**Script coverage is a hard requirement, not a preference.** §5.5 sets a short sentence in
nine Indic scripts. Before building it, confirm the chosen faces actually cover Devanagari,
Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, Gurmukhi and Odia. If they do not,
stop and flag it - a company whose central claim is 22-language coverage cannot render Indic
script in a browser default fallback. Either the brand system needs a sibling family for
those scripts, or §5.5 gets cut.

**Typographic discipline, whatever the faces are:**
- Set a real scale at a 1.25 ratio, and do not exceed four sizes per page
- Everything in sentence case. No all-caps except eyebrows and status chips, set small with
  wide tracking in the data face
- Headings tighter than default tracking, body looser than default leading - this is a
  reading site

### 5.4 Layout

Single column, max content width 68ch for prose and 1120px for full bands. Generous vertical
rhythm - this is a reading site, not a dashboard. Alternate light `--paper` and dark `--ink`
bands to segment the page; do not use cards for everything.

**The stack display (homepage B3) is the second most important element on the site**, and it
is where the category gate is won or lost. Render it as **two tiers, not three equal layers**:

- An upper group labelled **The infrastructure**, containing T&T and Lawman as two bands
- A visible divider
- Below it, **Built on it**, containing LawSafe as a single band

Each band shows name, layer role, one-sentence description, status chip. The two
infrastructure bands should read as the substantial part of the display - more vertical
weight, not less. A visitor scanning this element for three seconds should come away with
"they build AI infrastructure and shipped something on it," not "they make legal software."

On desktop, a thin `--sheen-alt` connector on the left edge running through the two
infrastructure bands only, indicating those two are one system. On mobile, stack plainly,
keep the divider and the two group labels, drop the connector.

Resist the urge to animate this. One scroll-triggered reveal of the bands in sequence is
enough. Ambient particles, gradient meshes, and floating orbs will make an honest site look
dishonest.

### 5.5 One deliberate risk

On the T&T page hero, render the same short sentence in nine Indic scripts, each set in a face
that genuinely supports that script (see §5.3), in a quiet stacked column at low contrast
(`--ink-soft` on `--paper`), with the English at full contrast at the top. Not a carousel, not
animated - just present, all at once.

It is the only decorative element on the site, it takes about fifteen lines of markup, and it
demonstrates the central claim instead of asserting it. Verify every string with a native
reader before shipping; a mangled script on a page about language coverage is a
self-inflicted wound.

### 5.6 Quality floor - not negotiable, not announced

- Responsive to 360px
- Visible keyboard focus rings using `--sheen`, never `outline: none`
- `prefers-reduced-motion` respected on every transition
- Semantic HTML: real `<nav>`, `<main>`, `<article>`, one `<h1>` per page, no heading skips
- Colour contrast: WCAG AA minimum. Check `--signal` amber on `--paper` specifically - it is
  the most likely failure. Darken to `#B4700F` if it does not pass.
- Fonts self-hosted with `font-display: swap` and preloaded for the display face only
- Every image `alt`-texted; decorative SVG gets `aria-hidden="true"`
- Lighthouse: 95+ on all four categories on a static build

---

## 6. Build phases

Work in order. Do not start a phase before the previous one's acceptance criteria pass.

### Phase 0 - Audit
Run the survey in §4.1 and report it. Identify what the scaffold already provides that
overlaps with §4.4, and flag anything in this spec that conflicts with what exists.

**Accepts when:** the summary is written, and every conflict between this spec and the
existing project has been raised rather than silently resolved.

### Phase 1 - Design system into the existing project
Install the §5.1 tokens per §4.3. Get the brand typefaces from the team and wire them per
§5.3 - do not proceed on a placeholder family. Build or adapt the base layout, header,
footer, button and status chip.

**Accepts when:** a page renders in the actual brand faces with correct tokens; the Indic
script coverage check in §5.3 has been run and its result recorded; the amber token is named
so that decorative use reads as wrong; header and footer are responsive to 360px; keyboard
focus is visible; no console errors; existing pages in the scaffold have not regressed.

### Phase 2 - Homepage
Sections B1-B8. Build `Hero`, `ProblemCards`, `StackDisplay`, `ProductBlock`,
`PrincipleList`, `CTABand`.

**Accepts when:** every section from Part B is present in order; product blocks ordered T&T →
Lawman → LawSafe; the stack display is two-tier per §5.4; all three status chips render; no
numbers appear anywhere on the page; no logo strip exists; the only primary CTA reads
"Request early access"; **the §2a cold-read test passes.**

### Phase 3 - About
Sections C1-C8. Mostly prose - the discipline here is typographic, not structural. C6 ("What
we will not do") should be visually distinct; it is the most quotable section on the site.

**Accepts when:** all sections present; NyayaSetu appears nowhere; the three statistics in C2
and C4 either carry an inline year and source or have been removed pending verification.

### Phase 4 - T&T page
`tnt-website-copy.md` Part A, A1-A13. The heaviest page. Build `SLATable`, `FAQ`, and code
blocks for A9.

**Accepts when:** the cost table (A7), SLA table (A6) and scale table both carry the estimate
qualifier visibly adjacent, not hidden; A13 footer notes render in full; the Tier A / Tier B
language split is presented honestly rather than flattened into "22 languages supported."

### Phase 5 - Lawman page
`lawman-summary.md` Part 1. Build `ComparisonColumns` for the "When to use / Do not use"
section.

**Accepts when:** the "Do not use Lawman when" column renders at equal visual weight to "Use
Lawman when"; the word "advice" appears only in the phrase disclaiming it; the status note
from the top of the source document is reflected in a visible page-level status.

### Phase 6 - LawSafe page
Per §3.4. This phase requires judgement, not transcription. Draft the adapted copy as a
markdown file first, get it reviewed, then build.

**Accepts when:** NyayaSetu absent; no competitor named; no market-size figure present; the
scope list is six to eight examples rather than forty; every statistic carries a year.

### Phase 7 - Form, polish, audit
Early-access form (name, email, organisation, which project, workload description). Any
static-form backend is fine. Store nothing sensitive.

**Accepts when:** §7 checklist passes end to end.

---

## 7. Definition of done

Run through this before calling the site finished. Grep where you can.

**Category integrity - check this block first**
- [ ] Cold-read test passed: a reader unfamiliar with the source docs, shown `/` and
      `/about`, does not describe PunkRaven as a legal or legal-tech company
- [ ] Nav, homepage blocks, footer product list and sitemap all order T&T → Lawman → LawSafe
- [ ] The `/` stack display is two-tier: infrastructure group, divider, application below
- [ ] T&T's non-legal buyers (contact centres, consumer apps, government, media, education)
      appear on at least one company page
- [ ] Footer states on every page that PunkRaven does not provide legal services and is not
      a law firm
- [ ] No domain named that the company has not committed to - no healthcare, finance or
      government vertical promised anywhere
- [ ] `grep -ri "legal tech\|legaltech\|law firm\|legal services" src/` returns only the
      disclaimer and the C6 commitment, nothing else

**Claim integrity**
- [ ] `grep -ri "nyayasetu" src/` returns nothing
- [ ] No customer logo, testimonial, case study, or "trusted by" band anywhere
- [ ] Every product block and product hero shows a status chip
- [ ] Every latency, cost and accuracy figure has a visible estimate qualifier
- [ ] No number appears on `/` or `/about` that is not a plain structural fact
- [ ] No figure appears anywhere that is not traceable to a source document
- [ ] Primary CTA is "Request early access" on every page
- [ ] Each page's claim-status table has been re-read and every "needs verification" row is
      either verified or the claim is cut

**Language and legal**
- [ ] "22 scheduled languages" everywhere - never "22+" or "all Indian languages"
- [ ] Tier A / Tier B distinction preserved wherever coverage is discussed
- [ ] Lawman and LawSafe described as research and drafting, never advice
- [ ] The human-review requirement is stated on both legal product pages

**Design**
- [ ] `--signal` amber appears only in the four semantic contexts listed in §5.2
- [ ] The stack display reads top-down and shows all three layers with roles
- [ ] Indic script block on `/tnt` verified by a native reader per script
- [ ] Under four type sizes per page; no all-caps outside eyebrows and chips

**Quality**
- [ ] 360px through 1920px with no horizontal scroll
- [ ] Keyboard-navigable end to end with visible focus
- [ ] `prefers-reduced-motion` honoured
- [ ] AA contrast throughout, amber-on-paper specifically checked
- [ ] Lighthouse 95+ across all four categories
- [ ] Metadata from each doc's `Page metadata` table wired into `<head>` plus OG tags

---

## 8. Open decisions - ask before assuming

Flag these to the human rather than guessing:

1. **Does T&T actually power LawSafe's voice and multilingual support?** The company copy
   presents the three as a dependent stack. This is a reasonable architectural inference but
   **it is not stated in any source document.** If it is wrong, `/` section B3 needs
   reframing from a stack to a family of related products.
2. **Domain and brand assets.** No logo, wordmark, or favicon exists in the inputs. Build with
   a text wordmark set in the brand display face; do not generate a logo.
3. **Form backend and where submissions go.** No email address appears in any source document.
4. **Should `/lawsafe` exist yet?** It is the least specified of the three and its document is
   an internal vision doc. A single homepage block plus a "coming" state may be more honest
   than a full page.
5. **Statistic verification owner.** Several figures in the LawSafe doc are from 2023-2025 and
   move. Someone must own re-verifying them on publication day, per the claim-status tables.
