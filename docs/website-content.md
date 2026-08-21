# PunkRaven website - content definition

**Status:** authoritative. This is the specification any future copy or page work reads first.
**Written:** 2026-07-24.
**Scope:** the five routes in `pages/`, plus the routes this document proposes.

This document defines *what the site says and why*. It does not define how it is built - that
is `CLAUDE.md` (engineering) and `docs/punkraven-site-build-instructions.md` (the original
build spec, still binding on structure).

`docs/copy/*` stay as raw source. This document is derived from them and from the built pages,
and it wins where a page and a copy doc disagree about what is currently published. See
[10. Governance](#10-governance).

**Contents**

1. [Positioning and audience](#1-positioning-and-audience)
2. [Voice and tone rules](#2-voice-and-tone-rules)
3. [Site map and information architecture](#3-site-map-and-information-architecture)
4. [Per-page content specification](#4-per-page-content-specification)
5. [Messaging hierarchy](#5-messaging-hierarchy)
6. [SEO specification](#6-seo-specification)
7. [AI-search / AEO requirements](#7-ai-search--aeo-requirements)
8. [Internal linking map](#8-internal-linking-map)
9. [Content gaps and backlog](#9-content-gaps-and-backlog)
10. [Governance](#10-governance)

**Open questions carried by this document** (each is also flagged in place): Q1 the TNT
dependency, Q2 the verification owner, Q3 the production domain, Q4 the conversion path, Q5
the Indic script strings, Q6 the technical plan URL. All six are listed in
[9. Content gaps and backlog](#9-content-gaps-and-backlog).

---

## 1. Positioning and audience

**Amendment, 2026-07-25 (user request).** The site's "India" framing was dialed back and the
copy reframed product-first. Rhetorical nationalism - "India should own its intelligence", "rent
its intelligence", "the layers India keeps importing", "indigenous" as a label, "sovereign by
construction" - is cut or reframed to the concrete product properties it stood for: self-hosted
infrastructure that runs inside the customer's own network, speech and translation across the 22
scheduled Indian languages, and grounded reasoning that states plainly what it cannot verify.
India stays where it is a fact - the 22 scheduled Indian languages, Indian law, the Bar Council
of India, Rule 36 - and as one or two grounding mentions, never as a rallying cry. Sections 1, 2
and 5 reflect the new frame; sections 4, 6 and 7 are updated where they quoted a changed string.

Derived by applying the `product-marketing` framework to `docs/copy/*`. There is no
`.agents/product-marketing.md` in this repo; one was **not** created, because this task is
scoped to a single file. If that document is ever written, it must be derived from this
section rather than independently, or the two will drift.

### 1.1 What PunkRaven is

| Field | Value | Source |
|---|---|---|
| Category | Applied AI infrastructure for Indian languages and high-stakes domains | `punkraven-company-copy.md` A1 |
| One-liner | PunkRaven builds AI infrastructure for Indian languages and high-stakes domains | `punkraven-company-copy.md` A1 |
| What it is not | A legal services company, a law firm, a legal-tech company, a legal marketplace | `punkraven-company-copy.md` A1, E; `punkraven-site-build-instructions.md` §2a |
| Product type | Self-hosted software and model infrastructure, plus one consumer application | `punkraven-company-copy.md` A2 |
| Business model | Not stated in any source document. **Assumption-free position: do not state one.** | See [9. Gaps](#9-content-gaps-and-backlog) |
| Stage | Pre-launch. Nothing has shipped. | `punkraven-company-copy.md` B6, C7 |
| Built in | India | `punkraven-company-copy.md` B0, B1 |

**The shape of the company** is two infrastructure layers and one application built on both to
prove they work (`punkraven-company-copy.md` A2). That shape is the pitch, and its *order* is
the argument: infrastructure before application, everywhere.

| Layer | Project | What it is | Status |
|---|---|---|---|
| Infrastructure | **TNT** | Speech to text and translation across all 22 scheduled Indian languages, self-hosted, behind one API | Planning |
| Infrastructure | **LawMan** | Grounded, citation-verified reasoning over a body of authoritative material, currently Indian law | Specified |
| Application | **LawSafe** | Chat-first legal understanding for any citizen, then a verified advocate | In design |

Source: `punkraven-company-copy.md` A2 for the table; statuses from B6 and C7, and they are
rendered as status chips in `content/home.ts` `whereWeAre` and `content/about.ts` `whereWeAre`.

**Why law came first, and why it is not the identity.** Law is the hardest available test of a
grounded system: the sources are authoritative, the language is exact, and a fluent invention
is a liability rather than a rough draft (`punkraven-company-copy.md` B3, C5). LawMan's design
separates skill from facts, which makes the domain corpus a parameter rather than a hard-coded
identity (`lawman-summary.md`, "How it works"; `punkraven-company-copy.md` A2). That makes the
technology-company claim architectural, not aspirational.

### 1.2 Audience and ICP

**Who the site is for:** technical and institutional buyers, prospective engineers, partners,
and funders. **Not the citizen** - LawSafe's own surface serves the citizen
(`punkraven-company-copy.md` A4; `punkraven-site-build-instructions.md` §1).

| Segment | Who | Trigger | Which route serves them |
|---|---|---|---|
| Primary - speech buyer | Contact centres, consumer and social apps, government and public services, media and education | Indian-language audio at volume, and a reason to keep it on their own infrastructure | `/tnt` |
| Primary - reasoning buyer | Firms, in-house teams, institutions with a body of authoritative material | Confidential material that cannot leave their network; a corpus that changes | `/lawman` |
| Secondary - regulated buyer | Any team with a data-residency constraint | Audio or documents that are not allowed offshore | `/tnt` A8 deployment, `/lawman` "Runs where you decide" |
| Secondary - engineer | Prospective hires | Wants to know the company is real and the engineering is serious | `/about`, and the proposed `/careers` |
| Secondary - partner / funder | Institutional readers | Wants the category and the stage stated plainly | `/`, `/about` |
| **Not the site's audience** | The Indian citizen with a legal problem | Has a specific wrong and no idea what to do | LawSafe's own product surface, not this site. `/lawsafe` describes the product to a *buyer or observer*, not to a claimant. |

Sources: buyers from `punkraven-company-copy.md` A2 and `tnt-website-copy.md` A10; audience
statement from `punkraven-company-copy.md` A4; the citizen exclusion from A4.

**The site's single job:** make a skeptical technical reader believe this is a serious
infrastructure company, without letting them conclude that anything has shipped or that this is
a law firm (`punkraven-company-copy.md` A4).

### 1.3 Problems, and why alternatives fall short

| Problem | Why the alternative fails | Source |
|---|---|---|
| Indian languages are somebody else's long tail | The largest Indian languages get decent coverage; the other twelve scheduled languages get an apology | `punkraven-company-copy.md` B2 card 1 |
| Fluent and wrong is the default failure mode | A misheard word is translated confidently into something never said; a fabricated reference arrives correctly formatted; neither surfaces as an error | `punkraven-company-copy.md` B2 card 2 |
| A metered offshore API is a cost that never stops | Per-call pricing to an offshore vendor scales against every product that grows; the weights are never yours; sensitive material leaves the country | `punkraven-company-copy.md` B2 card 3 |
| The seam between recognition and translation is nobody's product | Sold separately, so punctuation, sentence splitting, number formatting and protected terms become the buyer's bug | `tnt-website-copy.md` A2 card 1 |
| General models do not know current law and cannot say which parts went stale | Knowledge frozen at training time; fabricated authority; cannot be trusted with confidential files; does not know when to stop | `lawman-summary.md`, "Why LawMan is required" |

### 1.4 The three differentiators, in priority order

1. **Calibrated honesty as an engineering property.** Every PunkRaven system returns what it
   does not know. TNT scores recognition and translation confidence separately per segment and
   publishes a quality tier per language. LawMan verifies each citation against source text
   before the answer is shown, and abstains when it cannot. This belief appears identically in
   all three product documents, which makes it the company's thesis rather than any one
   product's feature. (`punkraven-company-copy.md` A3.1)
2. **Runs where your data is allowed to be.** MIT-licensed weights and single-unit deployment
   mean the systems run inside the customer's boundary. Nothing calls out. Nobody can reprice a
   per-call licence under you. (`punkraven-company-copy.md` A3.2)
3. **Built for the language, not translated into it.** All 22 scheduled languages, not the four
   that are easy. Domain structure learned properly rather than a foreign model asked politely
   about it. Scanned documents at the print quality Indian institutions actually produce.
   (`punkraven-company-copy.md` A3.3)

### 1.5 The proof, and what it is not

**Proof that is available and safe to publish** (each row is marked "Safe" in
`punkraven-company-copy.md` Part D or `tnt-website-copy.md` Part C):

| Proof | Claim | Source |
|---|---|---|
| Coverage | All 22 scheduled Indian languages in single checkpoints, with a Tier A / Tier B honesty split | `tnt-website-copy.md` A4; Part C row 1 |
| Licensing | `ai4bharat/indic-conformer-600m-multilingual` and `ai4bharat/indictrans2`, both MIT-licensed | `tnt-website-copy.md` A13; Part C row 2 |
| Contract | `POST /v1/transcribe-translate`, with per-segment `asr_confidence`, `mt_confidence`, `quality_tier`, `timings_ms`, `version` | `tnt-website-copy.md` A5, A9; Part C row 3, safe as a *designed contract* only |
| Architecture | Two engines, one queue, one deployment unit; the seam shipped as product | `tnt-website-copy.md` A3 |
| Architecture | Grounded retrieval, citation verification, trained abstention, fail-closed layering | `lawman-summary.md`, "How it works"; Part D row 6, safe **framed as design** |
| Deployment | One 24 GB GPU class card, 8 vCPU, 32 GB RAM; a CPU-only batch variant exists | `tnt-website-copy.md` A11 |
| Constraint | Written commitments about what the company will not do | `punkraven-company-copy.md` C6 |
| Stage | Per-project status, stated on every surface | `punkraven-company-copy.md` B6, C7 |

**Proof that does not exist, and must not be manufactured:** customers, logos, testimonials,
case studies, star ratings, benchmarks, uptime, team size, funding, launch dates
(`punkraven-company-copy.md` Part D last three rows; `punkraven-site-build-instructions.md`
§2b.2, §2b.3).

**Every number is currently held.** The built site publishes no latency, cost, accuracy or
market figure anywhere, on any route, including `/tnt`. `content/tnt.ts` de-numbers A6 and A7
and replaces the tables with the argument plus a `Figures held` estimate note;
`content/about.ts` de-numbers C2 and C4. The reason is that Part C and Part D gate those
figures on a verification owner, and **no owner has been named** (Q2). Anyone restoring a
figure restores the gate with it.

---

## 2. Voice and tone rules

Concrete and testable. Every rule below is either grep-able or countable.

### 2.1 The rule that overrides the others

**PunkRaven is a technology company.** The parent pages describe infrastructure and
engineering. They never describe the company as a legal service, a law firm, a legal
marketplace, or a legal-tech company (`punkraven-company-copy.md` Part E).

**The cold-read test:** show `/` and `/about` to someone who has not read the source documents
and ask what industry the company is in. If the answer is "legal", the copy has failed
regardless of what else passes (`punkraven-site-build-instructions.md` §2a.6).

**Lead with the product; name India where it is a fact.** The copy describes what the systems do
first. India is the market and the language and legal domain, not a rallying cry. "22 scheduled
Indian languages", "Indian law", "Bar Council of India" and "Rule 36" are load-bearing facts and
stay. National-pride framing - "own its intelligence", "rent its intelligence", "the layers India
keeps importing", "indigenous" as a label, "sovereign by construction" - does not lead, and is
reframed to the concrete property it stood for: self-hosted, built for the language,
domain-trained, open weights, honest about what it cannot verify. See the 2026-07-25 amendment in
[1. Positioning and audience](#1-positioning-and-audience).

### 2.2 Allowed claims

A claim may be published if it is (a) a structural or architectural property of a designed
system, (b) a licence or coverage fact traceable to a model card via a source doc, or (c) a
statement of stage. Everything in [1.5](#15-the-proof-and-what-it-is-not) is allowed.

Framing rules that make an allowed claim stay allowed:

| Claim type | Allowed framing | Banned framing |
|---|---|---|
| LawMan citation verification, abstention, fail-closed | "is built to", "is designed to", "is trained to" | "does", "has", "reliably", any observed-behaviour phrasing |
| Self-hosting, "nothing calls out" | A design property of the architecture | Case-study phrasing, "customers run it inside" |
| LawSafe advocate verification | A design commitment | Any implication that a verified panel exists today |
| API request/response shape | "the contract" | "the sandbox", "try it", any implication of a live endpoint |
| Domain portability | "the corpus is a parameter" (structural) | Naming healthcare, finance or a government vertical as a roadmap |

### 2.3 Banned claims and banned strings

Grep this list before publishing any page.

| Banned | Why | Source |
|---|---|---|
| "early access", "request early access", "get early access", "join the waitlist" | Withdrawn site-wide at Phase 7. Every button, the `earlyAccess` constant and the unbuilt form went together. There is nothing to act on. | commits `cb02018`, `e525cd9`; `config/site.ts` `links`; `content/home.ts` `whereWeAre` |
| Any launch date, ship date, "coming in Q_", "later this year" | No date appears in any source document | `punkraven-site-build-instructions.md` §2b.3 |
| "Get your API key", "Start building", "Sign up", "Try it free" | There is no endpoint to hand out | `punkraven-site-build-instructions.md` §2b.7 |
| Customer names, logos, testimonials, case studies, "trusted by", ratings | There are no customers | `punkraven-company-copy.md` C6, Part D; `tnt-website-copy.md` design notes |
| Any latency, cost, accuracy, market-size or population figure | All held pending a verification owner (Q2) | `content/tnt.ts` header rules; `punkraven-company-copy.md` Part E |
| "NyayaSetu" | Internal codename, must never appear publicly | `lawsafe-product-vision.md` §0; build instructions §3.4 |
| "22+ languages", "all Indian languages", "every Indian language" | The number is exact and verifiable; inflating it invites a challenge you cannot win. Write **"22 scheduled languages"**. | `tnt-website-copy.md` design notes; `punkraven-company-copy.md` Part E |
| "advice", "legal advice", "we advise" | Legal exposure, not style. "Research and drafting", never "advice". The word may appear only inside the sentence disclaiming it. | `lawman-summary.md` copy notes; build instructions §2b.8 |
| "legal tech", "legaltech", "law firm", "legal services" | Permitted **only** in the footer disclaimer and in the `/about` C6 commitment | build instructions §7 |
| Competitor names: Lexis+, Westlaw, Vakilsearch, LegalKart, LawRato, GPT-4, Llama 2, PaLM 2 | Named-competitor failure rates without verified figures; investor material, not customer material | `lawsafe-page-copy.md` L5 note; build instructions §3.4 |
| Em dash `-` (U+2014) | Repo-wide rule. Use a spaced hyphen ` - `. | `CLAUDE.md`, "Other traps" |
| Exclamation points | House voice is declarative | `punkraven-company-copy.md` Part E |
| "streamline", "optimize", "seamless", "revolutionary", "cutting-edge", "unlock", "empower", "leverage" | Buzzwords without substance; a technical reader clocks them | `copywriting` skill, writing style rules |

### 2.4 Register

| Rule | Test |
|---|---|
| Company pages (`/`, `/about`) speak as **"we"** | First person plural is correct on `/` and `/about` only |
| Product pages (`/tnt`, `/lawman`, `/lawsafe`) speak in the **third person, product as subject** | "LawMan retrieves...", "TNT returns...". `lawsafe-page-copy.md` states this conversion explicitly: the vision doc's "we envision an India where" becomes third-person product utility, matching `/lawman`. |
| Second person for the reader's situation, not the company's ambition | "your infrastructure", "the languages your product already has users in" |
| Sentence case everywhere | All-caps permitted **only** on eyebrows and status chips, set small with wide tracking in the data face (`build instructions` §5.3) |
| Bold lead-in phrase, then the explanation | The pattern used in B5, C3, C6 and `lawman-summary.md` "How it works" |
| Name the failure mode before the fix | Every problem section on the site does this |
| Limits stated plainly, never softened | `tnt-website-copy.md` A11 answers "Partly, and we say so plainly" |
| **Never soften abstention** | Abstention is a designed behaviour and the core differentiator. Framing it as a limitation inverts the entire positioning. (`lawman-summary.md` copy notes; `punkraven-company-copy.md` Part E) |

### 2.5 Sentence and paragraph discipline

| Metric | Target | Hard ceiling |
|---|---|---|
| Sentence length, median | 15 to 22 words | No sentence over 40 words |
| Paragraph length | 2 to 4 sentences | 5 sentences |
| Ideas per section | One | One |
| Body copy measure | 68ch (`--container-measure`) | Set by the `measure` recipe, not the copy |
| Type sizes per page | 4 | 4 (`build instructions` §5.3) |

### 2.6 Jargon policy

Domain terms are allowed when they are load-bearing and the page defines them on first use.
`quality_tier`, `asr_confidence`, `mt_confidence`, voice activity detection, inverse text
normalisation, retrieval, abstention and fail-closed all qualify: the reader is technical, and
`tnt-website-copy.md` A3 and A5 already carry the definitions. Marketing abstractions do not
qualify. The test: if removing the term loses information, keep it; if removing it loses only
tone, cut it.

### 2.7 Ordering is an editorial rule, not a layout preference

**TNT, then LawMan, then LawSafe.** In the nav, the homepage blocks, the footer product list,
the stack display, the sitemap, and inside `/about` C5. Leading with LawSafe re-categorises the
company in the reader's head (`punkraven-company-copy.md` Part E; build instructions §2a.1).
`config/site.ts` `navItems` is the single list that enforces it.

### 2.8 Two easily-confused names

**LawMan reasons. LawSafe is what a citizen opens.** These two are the pair readers most easily
confuse, and the company copy names them as such (`punkraven-company-copy.md` Part E). Any page
mentioning both must make the distinction in the same sentence or the adjacent one.

---

## 3. Site map and information architecture

### 3.1 Current state

Five routes, flat, one level deep. Next.js pages router, static. Header nav and footer nav both
render from `config/site.ts` `navItems`, so they can never disagree.

```
PunkRaven (/)                              [EXISTS] L0
├── TNT (/tnt)                             [EXISTS] L1  infrastructure - speech
├── LawMan (/lawman)                       [EXISTS] L1  infrastructure - reasoning
├── LawSafe (/lawsafe)                     [EXISTS] L1  application
└── About (/about)                         [EXISTS] L1  company
```

Flat is correct here. Five pages, three of which are the products, does not justify a
`/products` parent; the `site-architecture` 3-click rule is satisfied at one click, and a nav
of five items sits inside the 4-to-7 guideline.

### 3.2 Proposed additions

Every row below is **proposed**, not built. Nothing in `pages/` corresponds to it today.

| Route | Status | Purpose | Primary intent | Level | Nav placement |
|---|---|---|---|---|---|
| `/contact` | **Proposed** | The site currently has **no conversion action of any kind**. This is the single largest structural gap. A plain page that says what to send and where. Must not reintroduce early access. | Transactional / navigational: "how do I reach PunkRaven" | L1 | Header, rightmost; footer Company column |
| `/languages` | **Proposed** | The 22 scheduled languages, named, with the Tier A / Tier B split stated. The most citable asset the company owns and the highest-intent informational page available to it. | Informational: "Indian language speech recognition coverage", "does X support Santali" | L2 under `/tnt` | Contextual link from `/tnt` A4 only |
| `/careers` | **Proposed** | "Prospective engineers" is a named audience with no page. `/about` C6 (what we will not do) is the most quotable recruiting material on the site and currently has no destination attached. | Navigational: "PunkRaven careers", "PunkRaven jobs" | L1 | Footer only |
| `/notes` (engineering writing) | **Proposed** | The company has an argument and no place to make it at length. This is the only route that can generate net-new organic demand; the five product pages capture existing demand only. | Informational, awareness stage | L1 | Header once it has 5+ entries, footer before that |
| `/privacy`, `/terms` | **Proposed** | E-E-A-T trust signals and table stakes. Non-claim-bearing. | Navigational | L1 | Footer, Legal column |
| `/llms.txt` | **Proposed** | See [7. AEO](#7-ai-search--aeo-requirements) | Machine | Root file | Not in nav |
| `/robots.txt` | **Proposed** | Does not exist. `public/` contains only `favicon.ico`. AI crawlers and search crawlers both need it, and its absence also means no sitemap reference. | Machine | Root file | Not in nav |
| `/sitemap.xml` | **Proposed** | Does not exist. | Machine | Root file | Not in nav |

**Explicitly rejected routes**, so they do not get proposed again:

| Route | Why not |
|---|---|
| `/pricing`, `/pricing.md` | Every cost figure is held (Q2). A pricing page with no prices is worse than no pricing page. Revisit when a verification owner exists. |
| `/customers`, `/case-studies` | There are no customers. |
| `/docs`, `/api` | No live endpoint. `/tnt` A9 already carries the contract, framed as a contract. |
| `/blog` | Use `/notes`. "Blog" sets an expectation of cadence this company has no reason to promise. Naming preference only; the URL pattern is the same. |
| `/products` hub | Three products, five routes. A hub adds a click and removes nothing. |
| Any vertical page (healthcare, finance, government) | Bars a domain the company has not committed to (build instructions §2a.5). |

### 3.3 Navigation specification

**Header** (from `config/site.ts` `navItems`, in this order): Home, TNT, LawMan, LawSafe,
About. Plus the social cluster and the theme toggle. **Proposed:** add Contact as the rightmost
item once `/contact` exists; it is the only nav item that should ever be visually distinguished
as an action.

**Footer.** Currently a flat repeat of `navItems` plus the social cluster plus the mandatory
disclaimer. **Proposed** column grouping once the backlog lands:

| Column | Links |
|---|---|
| Infrastructure | TNT, LawMan |
| Built on it | LawSafe |
| Company | About, Careers, Contact |
| Legal | Privacy, Terms |

The two-tier grouping in the footer restates the category argument for free, in the one place
on every page where a reader scans product names side by side.

**Breadcrumbs.** Not needed at one level. Required if `/languages` lands under `/tnt`, in which
case: `Home > TNT > Languages`.

**Mandatory on every route:** the footer disclaimer, "PunkRaven builds software. It does not
provide legal services and is not a law firm" (build instructions §2a.4, and it is rendered
unconditionally in `components/site-footer.tsx`).

---

## 4. Per-page content specification

Section IDs below map to the source copy documents so a change can be traced in both
directions. Every page listed is **existing** unless the heading says otherwise.

### 4.1 `/` - Homepage [EXISTS: `pages/index.tsx`]

| Field | Value |
|---|---|
| Page goal | Establish the category. A reader must leave knowing this is an applied AI infrastructure company, that nothing has shipped, and that law is a proving ground rather than the identity. |
| Target audience | Cold technical and institutional reader, arriving on the brand name or from a referral |
| Primary intent | Navigational and category-defining: "what is PunkRaven" |
| Secondary intent | Informational: "Indian language AI infrastructure", "self-hosted Indic speech and reasoning" |
| Primary CTA | **None today.** Early access was withdrawn and the closing CTA band was removed. See Q4. The proposed CTA is a single link to `/contact` reading "Tell us about the workload" - the ask the source already makes in prose (B7 body), with a destination attached. |
| Secondary CTA | "See what we are building" (in-page anchor to `#what-we-build`), and the three product-block links |

Section-by-section:

| ID | Block | Eyebrow | Heading | Body / proof | CTA |
|---|---|---|---|---|---|
| B1 | Hero | Applied AI infrastructure - built in India | India should not have to rent its intelligence. | Subheadline: the two layers named, plus "we build on it ourselves to prove it works", plus "runs on hardware you control" and "says plainly when it cannot verify". Proof strip, four items, no logos: 22 scheduled languages / MIT-licensed weights, self-hosted / every claim carries its source or is withheld / runs inside your own network. | Secondary only |
| B2 | The problem | none | Most software built for India was built somewhere else and pointed at India. | Body plus three problem cards: long-tail languages, fluent-and-wrong, rented intelligence as a permanent tax | none |
| B3 | Stack display | none | Two layers of infrastructure. One application, to prove they work. | **Two tiers, not three equal layers.** Upper group "The infrastructure" carrying TNT and LawMan with more vertical weight; a visible divider; below it "Built on it" carrying LawSafe. Each band: name, layer role, one sentence, status chip. Closes on the supporting line about why law came first. | none |
| B4 | Product blocks | TNT / LawMan / LawSafe, in that order | Per product | TNT uses `tnt-website-copy.md` Part B **Variant B** verbatim. LawMan uses `lawman-summary.md` Part 2 **Variant A** verbatim. LawSafe uses the block written out in `punkraven-company-copy.md` B4. Never mix variants. | Explore TNT `/tnt`; Learn more `/lawman`; Explore LawSafe `/lawsafe` |
| B5 | How we build | none | The same six rules, in every system we ship. | Six principle blocks: grounded or silent / confidence is part of the contract / runs where your data is allowed to be / built for the language not translated into it / skill in the model, facts in the sources / we say what we have not built yet | none |
| B6 | Where we are | none | Early, and saying so. | Body plus a three-row status table (TNT Planning, LawMan Specified, LawSafe In design) with what exists today per row. **The source's second sentence, "We are opening early access to teams who...", is cut and must not return while the site has no way to ask.** | none |
| B7 | Closing CTA | - | **Removed on request.** Restoring it means restoring a destination first. | - | - |
| B8 | Footer notes | - | **Not built.** Four of the five notes are carried elsewhere; note 5 ("neither is legal advice") is a real, flagged loss on this route only. See [9. Gaps](#9-content-gaps-and-backlog) G4. | - | - |

**Must NOT appear on `/`:** any number that is not a plain structural fact (§2b.5 bars latency,
cost and accuracy figures from this route entirely); a logo strip; a testimonial; the word
"legal" describing PunkRaven; any product ahead of the stack display; LawSafe ahead of TNT or
LawMan; a benchmark; a launch date.

### 4.2 `/about` - About [EXISTS: `pages/about/index.tsx`]

| Field | Value |
|---|---|
| Page goal | Convert a reader who already grasps the category into someone who believes the company is serious. This is where the build decisions are defined concretely and where the constraints are published. |
| Target audience | Engineer, partner, funder, and the buyer doing diligence after a product page |
| Primary intent | Navigational: "about PunkRaven", "who builds PunkRaven" |
| Secondary intent | Informational: "indigenous AI India", "self-hosted AI infrastructure India" |
| Primary CTA | **None today.** Proposed: `/contact`, reading "Tell us what you are working on" (the C7 prose already makes this ask). |

| ID | Block | Heading | Notes |
|---|---|---|---|
| C1 | Hero | We build the layers underneath. | Eyebrow "About PunkRaven" |
| C2 | Why we exist | A foreign API comes with someone else's priorities. | **De-numbered.** The source opens with 886M internet users and 98 per cent Indic consumption; both are held pending Q2 and replaced with the structural claim they were evidence for. Do not restore the figures without the owner. |
| C3 | What we build, concretely | A set of build decisions, not a label. | Five bolded lead-ins: built for the language / domain learned properly / weights open and deployment yours / economics yours to plan / says plainly what it cannot verify. Names BNS, BNSS and BSA as the codes that replaced the colonial-era ones in 2024 - this is the one date on the page and it is a matter of public record. The export key stays `indigenous`; only the values changed. |
| C4 | How we build | Systems that know what they do not know. | **De-numbered.** Stanford RegLab's *Large Legal Fictions* is still attributed; the 58-88 / 17 / 34 per cent figures and the two commercial product names are cut. Naming a competitor's failure rate without the verified figure behind it is worse than dropping it. |
| C5 | What we are building | Two layers, and the first thing we built on them. | TNT, LawMan, LawSafe in that order. **TNT's non-legal buyers must be named here** and must not be cut for space: contact centres, consumer apps, government services, media, education. They are the proof the capability is horizontal. |
| C6 | What we will not do | The constraints define us as much as the features. | Six commitments. The most quotable section on the site; it should be visually distinct. |
| C7 | Where we are | Pre-launch, and specific about it. | Three status lines with chips, ordered TNT, LawMan, LawSafe |
| C8 | The name | Why PunkRaven | Punk is the refusal; Raven is the disposition. Marked optional in the source; kept, because it humanises an otherwise dry page. First thing to cut if the page runs long. |

**Must NOT appear on `/about`:** figures of any kind; the word "legal" describing the company;
named competitors; a domain the company has not committed to; NyayaSetu; a customer.

### 4.3 `/tnt` - TNT [EXISTS: `pages/tnt/index.tsx`]

| Field | Value |
|---|---|
| Page goal | Convince a technical buyer with Indian-language audio that the seam is the product and that the deployment story is real, without publishing a number that has not been measured. |
| Target audience | Contact centres, consumer and social apps, government and public services, media and education. **Never a legal audience.** |
| Primary intent | Commercial investigation: "Indian language speech to text", "self-hosted transcription and translation India" |
| Secondary intent | Informational: "22 scheduled languages ASR", "IndicConformer", "IndicTrans2", "code-mixed Hinglish transcription" |
| Primary CTA | **None today.** Proposed: `/contact`, reading "Tell us about the workload" - which is verbatim what A12's body and micro-copy already ask for. |
| Secondary CTA | "Read about the company" to `/about`. "Read the technical plan" is specified in A0 and A12 but **is not rendered and must not be**, because no URL for the plan set exists (Q6). |

| ID | Block | Heading | Notes |
|---|---|---|---|
| A1 | Hero | Audio in. Transcript and translation out. All 22 scheduled Indian languages. | Status chip `Planning` plus a status line. Proof strip is four items; the source's second item, "~1 second for a 30 second clip", is **held** and replaced with "Confidence and quality tier on every response", which is a designed property rather than a measurement. |
| - | Indic script block | (nine scripts, one sentence) | **Blocked.** Every string is empty until a native reader of that script supplies and checks it (Q5). A mangled script on a page about language coverage is a self-inflicted wound. |
| A2 | The problem | Indian-language speech is still the hard part | Three cards. Card 3's Rs 90-180 figure is **held**. |
| A3 | What TNT is | One service. Two engines. One queue. | Recognition card, translation card, seam card, plus the no-text-to-speech callout |
| A4 | Language coverage | All 22 scheduled languages. No add-on pricing. | Tier A named in full (ten plus the English pivot); Tier B stated as the remaining 12 including Kashmiri, Santali, Manipuri and Bodo. **The tier split must never be flattened into "22 languages supported".** |
| A5 | Honest confidence | Confidence is part of the contract, not a footnote | The five response fields |
| A6 | Speed | We will publish latency once we have measured it. | **Rewritten.** All figures held. What survives: latency is one number per lane, the four lanes, the p50/p95/p99 structure, and the source's own closing line. Carries a `Figures held` note. |
| A7 | Cost | Compute you control, not a licence you cannot renegotiate. | **Rewritten.** Every rupee figure held, including the 2-5x multiplier, because a ratio is not safer than its operands. The economic argument survives intact: MIT licensing changes the *shape* of the curve. The "30 minutes of audio per active user per month" assumption stays visible. Carries a `Figures held` note. |
| A8 | Deployment | Runs where your data is allowed to be | Three stages: pilot, growth, on-premise. Monthly costs held. The regulated-buyer callout stays. |
| A9 | The API | One call. One contract. | Request and response as syntax-highlighted code. Framed as the contract, never as a live sandbox. One value inside the payload is held. |
| A10 | Who it is for | Built for teams whose users do not speak English | Four audience rows, all non-legal |
| A11 | Objections | Questions people actually ask | Six real Q&A pairs. **The highest-value AEO block on the site.** Do not shorten the code-mixing or telephony answers; their honesty is the point. |
| A12 | Closing | Bring speech to the languages your product already has users in | Body plus micro-copy |
| A13 | Footer notes | - | **Mandatory, not optional.** Four notes, kept verbatim including the conversion-rate note, which currently qualifies figures the page does not show. Abbreviating a mandatory note to match a temporary state is how a disclosure quietly shrinks. |

**Must NOT appear on `/tnt`:** any restored figure without its verification owner; a legal
audience; "22+"; a flattened tier claim; a live-endpoint implication; a logo strip; a
"Read the technical plan" button with no URL behind it.

### 4.4 `/lawman` - LawMan [EXISTS: `pages/lawman/index.tsx`]

| Field | Value |
|---|---|
| Page goal | Establish that grounded, citation-verified reasoning is an engineering discipline rather than a prompt, using Indian law as the least forgiving available test. |
| Target audience | Firms, in-house teams, institutions. Secondarily, any technical reader evaluating the reasoning layer for a different corpus. |
| Primary intent | Commercial investigation: "AI for Indian law", "legal research AI India", "self-hosted legal AI" |
| Secondary intent | Informational: "AI legal hallucination", "citation verification AI", "retrieval-augmented legal research" |
| Primary CTA | **None today.** Proposed: `/contact`, reading "Tell us about the corpus" - the ask `punkraven-company-copy.md` B7 already makes for research over a body of authoritative material. |

| Block | Heading | Notes |
|---|---|---|
| Hero | Indian law, answered with the source attached. | Eyebrow "LawMan". Status chip `Specified` plus a status line. |
| What is LawMan | (source has no heading; the section defines the entity) | The single constraint: a legal answer is only worth having if you can trace it back to the authority it came from. Everything else follows from it. |
| Why LawMan is required | (five failure modes) | Invents authority / does not know current law / does not know Indian law specifically / cannot be trusted with your files / does not know when to stop |
| How it works | (ten mechanisms) | Grounded never freehand / every reference checked / skill in the model, facts in the sources / step by step and checks its own work / trained to abstain / fails closed / built in Indian languages / reads real legal documents / runs where you decide / a human still signs |
| When to use LawMan | Two genuine columns | **"Do not use LawMan when" renders at equal visual weight to "Use LawMan when". Do not soften or shorten it.** A company publishing the cases where its product is the wrong tool is the most persuasive thing on the page. The word "advice" appears exactly once on this route, inside the sentence disclaiming it. |
| Closing | Specified, not shipped. | Authored heading, on the record: the source line was "Get early access - built in India, for Indian law", and the verb went with early access. The remainder is kept as supporting text. An owner may replace the heading; it must not be replaced with anything that reads as shipped. |

**Must NOT appear on `/lawman`:** the word "advice" outside the disclaiming sentence; any
accuracy figure or benchmark score; model names or stack details (the source deliberately
omits them, and the components are not the pitch); any framing of abstention as a limitation;
a second status chip below the hero.

### 4.5 `/lawsafe` - LawSafe [EXISTS: `pages/lawsafe/index.tsx`]

This is the one page adapted rather than transcribed, and it is the highest-exposure page on
the site. Source of record is `docs/copy/lawsafe-page-copy.md`, itself adapted from
`lawsafe-product-vision.md` under build instructions §3.4.

| Field | Value |
|---|---|
| Page goal | Show that the two infrastructure layers reach a real consumer product, without the page reading as a legal service, a marketplace, or a live roster of advocates. |
| Target audience | The buyer, partner or observer evaluating PunkRaven. **Not the citizen with a legal problem** - that person is LawSafe's user, and this page is not LawSafe. |
| Primary intent | Navigational and informational: "LawSafe PunkRaven", "AI legal help India app" |
| Secondary intent | Informational: "how to understand my legal rights India", "Bar Council verified advocate matching" |
| Primary CTA | **None today.** Proposed: `/contact`. This page must never carry a CTA that reads as an offer of legal help. |

| Block | Heading | Notes |
|---|---|---|
| Hero (vision §1) | Understanding your rights should be as easy as sending a message. | Eyebrow "LawSafe - built on TNT and LawMan" **but see Q1** - that eyebrow asserts a dependency Part D marks unverified. Status chip `In design` plus a status line. Carries a **boundary line**: LawSafe explains and connects; it does not give legal advice, does not represent anyone, and does not decide anything. |
| Why LawSafe exists (§2) | India does not have a shortage of law. It has a shortage of access to it. | **Every statistic held.** The argument runs qualitatively: the backlog is the visible symptom, the deeper problem is that most people never reach the courthouse door. Concrete wrongs named: a cheque that bounced, a deposit a landlord will not return, a fraudulent transaction, a denied insurance claim, harassment online. |
| Who it is for (§3) | Three cards | Citizen / small business, founder and independent professional / the advocate. Card 3 is not decoration: it is the answer to "are you disintermediating lawyers". |
| What it does (§4) | One promise: grounded understanding first, a verified human when you need one. | Four blocks: the app, the shortlist, what it is built on, scope. **"No panel exists yet - verification is a design commitment, not a live roster" must stay.** Scope is six to eight examples, never the forty-plus list. The answer structure is: what the law says, which provision applies, the realistic options, what to do next. The "likely timelines and costs" clause was cut at review as the closest thing on the page to a promise about outcomes; it does not come back. |
| Principles (§6) | North star: trust per interaction | Six numbered principles plus a "what LawSafe will not do" list. Grounded or silent / assistance never a verdict / a neutral bridge never a tout (BCI norms including Rule 36) / vernacular-first / privacy is not a setting (DPDP Act, 2023) / verified humans at the end of the line. |
| Closing (§5) | The measure is not downloads. | One paragraph, no horizon labels. A five-year plan on a page for a product in design invites a reader to ask what year one looks like. Ends on the status line. |

**Must NOT appear on `/lawsafe`:** NyayaSetu; any competitor; any market-size figure; the
forty-plus practice-area list; the Tele-Law figures (a government programme's numbers read as
LawSafe's own offering on this page, which is the single highest-risk string in the source);
the word "advice" outside the boundary line; any implication that advocates are onboarded
today; any first-person aspiration carried over from the vision doc.

**Watch item carried from review:** the small-business card names company incorporation, IP
registration and compliance. Those are service categories rather than committed verticals, so
build instructions §2a.5 is not engaged, but this is the highest-exposure page on the site and
the line is worth a second look whenever the card is revisited.

---

## 5. Messaging hierarchy

Three levels. A page may sharpen the level above it. **A page may never contradict it.**

### 5.1 Level 1 - company

> **Self-hosted AI infrastructure: speech and grounded reasoning.**
> PunkRaven builds AI infrastructure for Indian languages and high-stakes domains: two layers,
> and one application alongside them. Everything runs on hardware you
> control, and says plainly when it cannot verify what it is about to tell you.

**Amendment, 2026-07-24 (owner ruling).** LawSafe is an entirely separate application, **not**
built on TNT and LawMan. The Level-1 message above previously read "one application built on
both to prove they work"; it is reframed to "one application alongside them", and the site copy
(`content/home.ts` `stack` and the LawSafe product block) is reframed from a dependent stack to
siblings. The two infrastructure layers are *intended to join the application after its MVP* -
that is a roadmap claim and **must not appear in site copy**. This ruling resolves
[10.4](#104-known-source-conflicts) conflict 1.

**Amendment, 2026-07-25 (user request).** The Level-1 headline previously read "India should not
have to rent its intelligence." It is reframed product-first because the site over-used "India"
and read as nationalism rather than as product description. The supporting paragraph is unchanged;
India stays named where it is a fact. Full rationale in the amendment at
[1. Positioning and audience](#1-positioning-and-audience).

Three supporting pillars, in priority order, each of which every product page must be
consistent with:

| Pillar | Company statement | How TNT expresses it | How LawMan expresses it | How LawSafe expresses it |
|---|---|---|---|---|
| Calibrated honesty | Grounded, or silent. Confidence is part of the contract. | `asr_confidence`, `mt_confidence`, `quality_tier` per segment; low-confidence spans flagged | Citations verified before display; trained abstention; fails closed | Grounded or silent; every substantive answer carries its legal basis |
| A deployment you control | Runs where your data is allowed to be. | MIT weights, one deployment unit, nothing calls out | Deployable on your own infrastructure; confidential material never leaves | Privacy is not a setting; DPDP Act, 2023 |
| Built for Indian reality | Built for the language, not translated into it. | All 22 scheduled languages in single checkpoints, tiers stated | Indian statutory structure, court hierarchy, procedure and drafting convention; reads scanned output | Vernacular-first; English is a barrier, not a bridge |

### 5.2 Level 2 - product

| Product | One-line message | The single differentiator it owns | What it must not claim |
|---|---|---|---|
| **TNT** | Audio in. Transcript and translation out. All 22 scheduled Indian languages. | The seam between recognition and translation, shipped as product rather than left as a tutorial. | Any latency or cost number; a live endpoint; text-to-speech; a flattened language claim |
| **LawMan** | Indian law, answered with the source attached. | A legal answer is only worth having if you can trace it back to the authority it came from. | Advice; accuracy scores; model or stack names; observed behaviour |
| **LawSafe** | Understanding your rights should be as easy as sending a message. | Understanding first, transaction second - free at the first mile, in the language the person actually speaks. | Advice; a live advocate panel; any statistic; any outcome, timeline or cost promise |

### 5.3 Level 3 - page

Each page inherits its product message and adds only section-level specificity. See
[4. Per-page content specification](#4-per-page-content-specification).

### 5.4 How the levels nest, and the three places they could contradict each other

| Risk | The rule that prevents it |
|---|---|
| A product page implies the company is a legal business | Two of three products work on law. Law is stated on the company pages only as the hardest available test, never as what the company is for. TNT's non-legal buyers are named on `/about` C5 to prove the capability is horizontal. |
| A page implies something shipped | Status chip on every product block and every product hero, a status line beside it, and a status table on `/` and `/about`. Anything in the present tense about a system is a design property, not a report. |
| A page promises a domain the company has not committed to | The portability claim is structural only: "the corpus is a parameter". No named second vertical, anywhere. |

**The dependency claim is the one live inconsistency inside the message hierarchy.** B3, B4 and
the `/lawsafe` eyebrow present the three products as a dependent stack ("LawSafe - built on TNT
and LawMan"), and `lawsafe-page-copy.md` L4 states it outright. `punkraven-company-copy.md`
Part D marks the same claim **"Inference, not stated in any source doc"** and requires
confirmation, and build instructions §8.1 lists it as an open decision. Until Q1 is resolved,
treat "built on TNT and LawMan" as **provisional**. If it is false, B3 reframes from a stack to
a family of related products and the `/lawsafe` eyebrow changes with it.

---

## 6. SEO specification

### 6.1 Current technical state

| Item | State |
|---|---|
| `robots.txt` | **Missing.** `public/` contains only `favicon.ico`. |
| `sitemap.xml` | **Missing.** |
| Canonical tags | **Missing.** `layouts/head.tsx` emits no `<link rel="canonical">`. |
| `og:url` | **Missing.** |
| `og:image` | **Missing**, deliberately. `twitter:card` is `summary` rather than `summary_large_image`, because claiming a large image slot with nothing in it renders as a broken card. |
| JSON-LD | **None on any route.** |
| `og:title` / `og:description` | Present, per-page, keyed for de-duplication |
| Viewport | Correct. No `maximum-scale`, no `user-scalable=0`. |
| Production domain | **Unknown.** `punkraven.com` is inferred from `engineering@punkraven.com` in `config/site.ts` and is an **assumption** (Q3). Canonicals, `og:url` and the sitemap all block on it. |

### 6.2 Title tags and meta descriptions

Character counts are of the string as written. Titles target 50 to 60; descriptions target 150
to 160.

| Route | Title tag | Chars | Verdict |
|---|---|---|---|
| `/` | `PunkRaven - self-hosted AI infrastructure` | 41 | **Changed.** Reframed off the "India" banner under the 2026-07-25 amendment, alongside the descriptions; the previous title was `PunkRaven - applied AI infrastructure, built in India` at 53 chars. Carried in `content/home.ts`. 41 is below the 50 to 60 target, recorded here and not resolved. |
| `/about` | `About PunkRaven - why we build our own layers` | 45 | Keep. Current. |
| `/tnt` | `TNT - speech and translation, 22 scheduled Indian languages` | 59 | **Changed, shipped.** Replaced `TNT - speech to text and translation for all 22 scheduled Indian languages` at 74 chars, which truncated. Carried in `content/tnt.ts`. |
| `/lawman` | `LawMan - Indian law, answered with the source attached` | 54 | Keep. Current. |
| `/lawsafe` | `LawSafe - describe what happened, understand where you stand` | 60 | Keep. Current. |
| `/contact` *(proposed)* | `Contact PunkRaven - tell us about the workload` | 46 | New |
| `/languages` *(proposed)* | `All 22 scheduled Indian languages, with the quality tiers stated` | 64 | New. Over by 4; acceptable, the tail is the least load-bearing part. |
| `/careers` *(proposed)* | `Careers at PunkRaven - build the layers underneath` | 50 | New |

| Route | Meta description | Chars | Verdict |
|---|---|---|---|
| `/` | `A technology company building self-hosted AI infrastructure: speech across all 22 scheduled Indian languages, and reasoning that grounds every claim in a real source. Honest about what it does not know.` | 202 | **Defect.** This is what `content/home.ts` ships, and `layouts/head.tsx` prefers the page meta over the site default, so it is what `/` returns. It exceeds the 150 to 160 target by 42 characters and will truncate in search results. The approved 153-char string, reframed off the "India" banner per the 2026-07-25 amendment, is still carried in `config/site.ts` as the site-level fallback: `PunkRaven builds self-hosted AI infrastructure: speech across all 22 scheduled Indian languages, and reasoning that grounds every claim in a real source.` Flagged, not fixed. |
| `/about` | `PunkRaven is a technology company building self-hosted AI infrastructure for Indian languages and high-stakes domains. How we build, and what we will not do.` | 157 | **Changed, shipped.** Reframed off "indigenous" per the 2026-07-25 amendment. Carried in `content/about.ts`. |
| `/tnt` | `Self-hosted transcription and translation for all 22 scheduled Indian languages through one API. MIT-licensed weights, no per-call fee. Planning stage.` | 151 | **Changed, shipped.** Replaced a description that ran 188 chars. Carried in `content/tnt.ts`. |
| `/lawman` | `LawMan is an AI system for Indian law. It grounds every claim in a retrieved source, checks the reference before you see it, and abstains when it cannot.` | 153 | **Changed, shipped.** Replaced a description that ran 205 chars. Carried in `content/lawman.ts`. |
| `/lawsafe` | `LawSafe lets any Indian describe a legal problem in their own language and see where they stand, then reach a verified advocate. In design, no panel yet.` | 153 | **Deviation, deliberate and documented in `content/lawsafe.ts`.** It replaces the 214-char original and also departs from this section's previously approved `LawSafe lets any Indian describe a legal problem in their own language and understand where they stand, then reach a Bar Council-verified advocate. In design.` at 158 chars. The reason given at the deviation comment: the no-panel qualification is carried inside the meta description itself, so a search result cannot surface a verified-advocate promise without the caveat travelling with it. |
| `/contact` *(proposed)* | `Tell PunkRaven about the workload: the languages, the volume, and whether the work is live or batch. We will say plainly whether we are useful to you yet.` | 154 | New |
| `/languages` *(proposed)* | `Every one of the 22 scheduled Indian languages TNT covers, split into production-grade Tier A and the higher-error-rate Tier B, with nothing rounded up.` | 152 | New |
| `/careers` *(proposed)* | `PunkRaven is pre-launch and building AI infrastructure in India. What we will not do, what we are building, and what the engineering actually looks like.` | 153 | New |

Every description above states the stage or is stage-neutral. None reintroduces a held figure,
an early-access ask, or a date.

### 6.3 H1, URL, canonical, keywords

One H1 per page, and it is the hero headline. Canonicals are self-referencing and absolute;
all of them block on Q3.

| Route | H1 | Canonical | Primary keyword | Secondary keywords |
|---|---|---|---|---|
| `/` | Speech and reasoning, self-hosted. | `https://<domain>/` | PunkRaven | applied AI infrastructure India, Indian language AI infrastructure, self-hosted AI India, indigenous AI India |
| `/about` | We build the layers underneath. | `https://<domain>/about` | About PunkRaven | indigenous AI infrastructure, sovereign AI India, AI that admits uncertainty |
| `/tnt` | Audio in. Transcript and translation out. All 22 scheduled Indian languages. | `https://<domain>/tnt` | Indian language speech to text and translation | self-hosted transcription India, 22 scheduled languages ASR, IndicConformer, IndicTrans2, Indic speech API, self-hosted speech translation |
| `/lawman` | Indian law, answered with the source attached. | `https://<domain>/lawman` | AI for Indian law | citation-verified legal AI, grounded legal research AI, self-hosted legal AI India, AI legal hallucination |
| `/lawsafe` | Understanding your rights should be as easy as sending a message. | `https://<domain>/lawsafe` | LawSafe | know your legal rights India, Bar Council verified advocate, vernacular legal help India |
| `/contact` *(proposed)* | Tell us about the workload. | `https://<domain>/contact` | contact PunkRaven | - |
| `/languages` *(proposed)* | All 22 scheduled Indian languages, and the quality tier of each. | `https://<domain>/languages` | 22 scheduled Indian languages speech recognition | Santali speech to text, Kashmiri ASR, Manipuri transcription, Bodo speech recognition, Indic language coverage |
| `/careers` *(proposed)* | Build the layers underneath. | `https://<domain>/careers` | PunkRaven careers | AI infrastructure jobs India |

**No keyword cannibalisation risk exists today.** The five routes target five disjoint intents.
The one risk to watch is `/lawman` and `/lawsafe` both drifting toward "legal AI India"; the
separation rule is that `/lawman` targets the *practitioner and institutional* intent and
`/lawsafe` targets the *citizen-facing product* intent, and neither should adopt the other's
modifiers.

### 6.4 Technical SEO requirements

| Requirement | Detail |
|---|---|
| `robots.txt` | Allow all. Must explicitly allow `GPTBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended` and `Bingbot`. Blocking any of them means that engine cannot cite the site. Reference the sitemap. |
| `sitemap.xml` | All five existing routes, plus any proposed route that ships. Static generation is fine; the route list is `config/site.ts` `navItems` plus additions. |
| Canonical | Self-referencing, absolute, on every route. Blocks on Q3. |
| `og:url` | Absolute, matching the canonical. Blocks on Q3. |
| `og:image` | 1200x630. Do **not** ship `summary_large_image` before the image exists. |
| Heading hierarchy | One H1, no skipped levels. Already enforced. |
| Alt text | Every image. Decorative SVG gets `aria-hidden="true"`. Already enforced. |
| Core Web Vitals | LCP under 2.5s, INP under 200ms, CLS under 0.1. A static site with near-zero client JS should clear all three by construction. |
| Mobile | No horizontal scroll 360px to 1920px. Already enforced. |
| Internationalisation | **Not applicable yet.** The site is English-only. If Indic-language versions ever ship, hreflang, self-referencing canonicals per locale and `x-default` all become mandatory, and a locale must not be created that cannot be made genuinely helpful. |

---

## 7. AI-search / AEO requirements

Applying the `ai-seo` skill. The split it draws matters here: Google's AI features run on core
Search, so for AI Overviews the answer is "write for people and organise for clarity". The
extractable-structure work below is what materially helps ChatGPT, Claude, Perplexity and
Copilot, and it does not hurt Google.

**PunkRaven's structural advantage:** the Princeton GEO research ranks *cite sources* (+40 per
cent) and *add statistics* (+37 per cent) as the two highest-yield optimisations. PunkRaven
cannot use the second one - every statistic is held (Q2). It can use the first one heavily, and
it already does: `/tnt` names model checkpoints and licences, `/about` attributes the Stanford
RegLab study, `/lawsafe` cites the BCI Rule 36 and DPDP Act, 2023 by name. **Entity density and
source attribution are the levers available to this site. Statistics are not.**

### 7.1 Question-shaped headings

Today's headings are declarative statements, which is correct for the house voice and wrong for
extraction. The fix is **additive**: keep the declarative H2, add a question-shaped H3 above
the answer block where a real question exists. Do not convert the H2s.

| Route | Question-shaped heading to add | Where |
|---|---|---|
| `/` | What is PunkRaven? | B1, immediately under the hero |
| `/` | What does PunkRaven build? | B3, on the stack display |
| `/about` | What makes PunkRaven's AI different? | C3 |
| `/tnt` | Which Indian languages does TNT support? | A4 |
| `/tnt` | How is TNT different from calling Whisper and a translation API? | A11, already question-shaped in the source |
| `/tnt` | Can TNT run entirely on our own hardware? | A11, already question-shaped |
| `/lawman` | What is LawMan? | The "What is LawMan" section, already named for it |
| `/lawman` | When should you not use LawMan? | The comparison section |
| `/lawsafe` | What is LawSafe? | Under the hero |
| `/lawsafe` | Does LawSafe give legal advice? | Adjacent to the boundary line. **The single most important extractable answer on the site.** |

### 7.2 Extractable answer blocks

Each block below is 40 to 60 words, self-contained, and works with no surrounding context.
These are the strings an AI system will lift. Every one is composed from existing published
copy, so none of them is a new claim.

**What is PunkRaven?** (46 words)
> PunkRaven is a technology company building applied AI infrastructure in India: a speech layer
> covering all 22 scheduled Indian languages, and a reasoning layer that grounds every claim in
> a real retrieved source. It is pre-launch. Its systems run inside the customer's own network
> and state plainly what they cannot verify.

**What is TNT?** (48 words)
> TNT is PunkRaven's self-hosted speech pipeline. It turns Indian-language audio into a clean
> transcript and a translation through one API call, across all 22 scheduled Indian languages,
> using MIT-licensed model weights so nothing leaves the customer's infrastructure. Every
> segment returns a recognition and a translation confidence score. TNT is at planning stage.

**What is LawMan?** (47 words)
> LawMan is PunkRaven's reasoning layer, built for Indian law as its first body of authority. It
> retrieves the governing material before answering, attributes each claim to its source,
> verifies every reference against the source text, and abstains when the sources do not support
> an answer. LawMan is specified and not yet built.

**What is LawSafe?** (50 words)
> LawSafe is PunkRaven's first application: a chat-first way for any Indian to describe a legal
> problem in their own language and get a grounded, cited explanation of where they stand, then
> reach a Bar Council-verified advocate when a human is genuinely needed. LawSafe is in design.

**Does LawSafe give legal advice?** (42 words)
> No. LawSafe explains and connects. It does not give legal advice, does not represent anyone,
> and does not decide anything. Where a matter needs professional judgement, a qualified
> advocate provides it. PunkRaven builds software and is not a law firm.

**Which Indian languages does TNT support?** (52 words)
> TNT covers all 22 scheduled Indian languages in single model checkpoints, so complete coverage
> costs nothing extra. Coverage is tiered honestly rather than flattened: ten languages plus the
> English pivot are production grade, and the remaining twelve, including Kashmiri, Santali,
> Manipuri and Bodo, carry higher error rates. Every response states its tier.

### 7.3 Entity definitions

AI systems resolve entities before they resolve claims. These must be stated identically
wherever they appear, and the two easily-confused ones must never be defined in isolation.

| Entity | Canonical definition | Never |
|---|---|---|
| PunkRaven | A technology company building applied AI infrastructure for Indian languages and high-stakes domains, based in India, pre-launch | A legal-tech company |
| TNT | PunkRaven's speech layer: self-hosted transcription and translation across all 22 scheduled Indian languages behind one API. Planning stage. | A translation vendor |
| LawMan | PunkRaven's reasoning layer: grounded, citation-verified reasoning over a body of authoritative material, currently Indian law. Specified, not built. | A chatbot; the citizen-facing product |
| LawSafe | PunkRaven's first application: chat-first legal understanding for a citizen, then a verified advocate. In design. | The reasoning system; a law firm; a live marketplace |
| 22 scheduled languages | The 22 languages in the Eighth Schedule of the Constitution of India | "22+"; "all Indian languages" |

### 7.4 Schema types per page

None of this exists today. All of it is **proposed**. Every type below is chosen so it can be
populated without a held figure or an invented claim.

| Route | Schema | Notes |
|---|---|---|
| Site-wide | `Organization` | `name`, `url`, `email`, `sameAs` (GitHub, X, Instagram from `config/site.ts`), `foundingLocation` India, `description`. **No `aggregateRating`, no `review`, no `numberOfEmployees`, no `foundingDate`** - none is known. |
| Site-wide | `WebSite` | `name`, `url`. No `SearchAction`; there is no site search. |
| `/` | `WebPage` | Plus the `Organization` node |
| `/about` | `AboutPage` | |
| `/tnt`, `/lawman`, `/lawsafe` | `WebPage` with `about` referencing a `SoftwareApplication` node | `name`, `applicationCategory`, `description`, `operatingSystem` where honest. **No `offers`, no `aggregateRating`, no `softwareVersion`, no `datePublished` implying release.** A `Product` type is wrong here: there is no price, no availability and no rating, and `Product` invites all three. |
| `/tnt` | `FAQPage` | A11's six objections are genuine Q&A and map cleanly. The highest-value structured-data opportunity on the site. |
| `/lawsafe` | `FAQPage` | Only if the question-shaped headings in [7.1](#71-question-shaped-headings) land. "Does LawSafe give legal advice?" is the answer worth structuring. |
| `/lawman` | No `FAQPage` | The "When to use / Do not use" comparison is not Q&A and forcing it into one would misrepresent it. |
| `/languages` *(proposed)* | `WebPage` plus `ItemList` | The 22 languages as a list with tier annotations |
| Any route, if breadcrumbs land | `BreadcrumbList` | Only if `/languages` nests under `/tnt` |

### 7.5 `llms.txt`

**Recommended, at `/llms.txt`.** The case for it here is stronger than for most sites: the
company's entire positioning is calibrated honesty, and an AI system that summarises PunkRaven
from page copy alone is likely to drop the status qualifiers, which is precisely the failure
this company exists to argue against. A file that states the stage in machine-readable form is
the cheapest available defence against being described as shipped.

Proposed content, composed entirely from published copy:

```markdown
# PunkRaven

> PunkRaven is a technology company building applied AI infrastructure in India: a speech
> layer covering all 22 scheduled Indian languages, and a reasoning layer that grounds every
> claim in a real retrieved source. PunkRaven is pre-launch. Nothing described here is running
> production software.

PunkRaven is not a law firm and does not provide legal services. Two of its three projects
work on law because law is the hardest available test of a grounded system, not because law is
the company's category.

## Status - read this before summarising anything below
- TNT: planning stage. A complete technical specification, a costed deployment plan and a
  documented API contract exist. A running service does not.
- LawMan: fully specified, not yet built.
- LawSafe: in design. What exists is the product vision and its scope.
- There are no customers, no benchmarks, and no published performance or cost figures.

## Infrastructure
- [TNT](/tnt): self-hosted transcription and translation for all 22 scheduled Indian
  languages behind one API. MIT-licensed weights. Coverage is tiered: ten languages plus the
  English pivot are production grade, the remaining twelve carry higher error rates.
- [LawMan](/lawman): grounded, citation-verified reasoning over a body of authoritative
  material, currently Indian law. Retrieves before answering, verifies every reference against
  the source text, and abstains when the sources do not support an answer. A research and
  drafting instrument, not legal advice.

## Built on it
- [LawSafe](/lawsafe): chat-first legal understanding for a citizen, then a Bar
  Council-verified advocate. Explains and connects; does not advise, represent or decide.

## Company
- [About](/about): what makes PunkRaven's systems different, how we build, and what we will not do.
```

Two notes on the file. It **must** carry the status block, and the status block **must** sit
above the product descriptions, because an extractor that truncates takes the top. And it
carries no figures, for the same reason the pages do not.

### 7.6 What not to do

Taken directly from the `ai-seo` skill's prohibitions, and each one has a specific way of going
wrong here:

- Do not write separate copy "for AI". The answer blocks in [7.2](#72-extractable-answer-blocks)
  are composed from published copy and are meant to be published copy.
- Do not chunk pages into fragments. The declarative H2 structure stays; questions are added
  above answers, not substituted for headings.
- Do not chase third-party mentions inauthentically. The `ai-seo` skill notes brands are 6.5x
  more likely to be cited via third-party sources than their own domain, which for a pre-launch
  company with no press is a reason to publish something worth citing (see `/notes` in the
  backlog), not a reason to seed forums.
- Do not add a `/pricing.md`. Every cost figure is held.

---

## 8. Internal linking map

### 8.1 Current state

| Source | Target | Anchor text | Type | Status |
|---|---|---|---|---|
| All 5 routes | All 5 routes | Home, TNT, LawMan, LawSafe, About | Header nav | Exists |
| All 5 routes | All 5 routes | Home, TNT, LawMan, LawSafe, About | Footer nav | Exists |
| `/` B4 | `/tnt` | Explore TNT | Contextual | Exists |
| `/` B4 | `/lawman` | Learn more | Contextual | Exists |
| `/` B4 | `/lawsafe` | Explore LawSafe | Contextual | Exists |
| `/` B1 | `#what-we-build` | See what we are building | In-page | Exists |
| `/tnt` A12 | `/about` | Read about the company | Contextual | Exists |

That is seven contextual links across five pages, six of which originate on `/`. **Four of the
five routes have no outbound contextual link at all.** No page is orphaned, because the nav
covers every route from every route, but the contextual graph is a star with the homepage at
the centre and no edges between the leaves.

### 8.2 Proposed additions

Anchor text is descriptive in every row. No "click here", no "read more".

| Source | Target | Anchor text | Placement | Depends on |
|---|---|---|---|---|
| `/` B4 LawMan block | `/lawman` | Explore LawMan | Replaces "Learn more", which is a weak anchor and the only one of the three that does not name its target | - |
| `/about` C5 | `/tnt` | the language layer | Inside the TNT paragraph | - |
| `/about` C5 | `/lawman` | the reasoning layer | Inside the LawMan paragraph | - |
| `/about` C5 | `/lawsafe` | the first application | Inside the LawSafe paragraph | - |
| `/about` C7 | `/contact` | Tell us what you are working on | Closing | Q4 |
| `/tnt` A4 | `/languages` | the full language list, tier by tier | End of the coverage section | `/languages` shipping |
| `/tnt` A12 | `/contact` | Tell us about the workload | Closing, primary | Q4 |
| `/lawman` "What is LawMan" | `/about` | how PunkRaven builds | Inside the paragraph about the single constraint | - |
| `/lawman` "Built in Indian languages" | `/tnt` | the speech layer underneath it | Inline | **Q1** - this asserts the dependency |
| `/lawman` closing | `/contact` | Tell us about the corpus | Closing, primary | Q4 |
| `/lawsafe` "What it is built on" | `/tnt` | TNT | Inline, already named in the copy | **Q1** |
| `/lawsafe` "What it is built on" | `/lawman` | LawMan | Inline, already named in the copy | **Q1** |
| `/lawsafe` closing | `/contact` | Tell us what you are building | Closing | Q4 |
| `/contact` | `/tnt`, `/lawman`, `/lawsafe` | the three project names | Form context or body | Q4 |
| `/languages` | `/tnt` | how TNT handles the seam | Body | `/languages` shipping |
| `/careers` | `/about` | what we will not do | Body, linking C6 specifically | `/careers` shipping |
| `/notes/<slug>` | The relevant product page | Product name, in context | Every entry | `/notes` shipping |

**The three rows marked Q1 are gated.** Linking `/lawsafe` to `/tnt` and `/lawman` with anchor
text asserting the build relationship publishes an inference that Part D flags as unverified.
Ship them when Q1 is resolved in the affirmative; if it resolves the other way, the anchor text
becomes "the speech layer" and "the reasoning layer" as siblings rather than as dependencies.

### 8.3 Link priority

Most inbound contextual links should point at `/tnt` and `/lawman`, in that order, because
inbound link count is one of the ways a crawler infers which pages the site considers primary,
and the category argument says the infrastructure is primary. `/lawsafe` should never carry
more inbound contextual links than either infrastructure page. This is the linking-graph
expression of §2a.1's ordering rule.

---

## 9. Content gaps and backlog

Ranked by impact. "Impact" here means impact on the site's single job: making a skeptical
technical reader believe this is a serious infrastructure company without concluding that
anything shipped or that this is a law firm.

| # | Gap | Why it matters | Intent served | Blocked by |
|---|---|---|---|---|
| **G1** | **No conversion action anywhere on the site.** Five routes, zero CTAs. Every page ends on prose asking the reader to get in touch, with nothing to click. `/tnt` A12 says "we would like to hear about the workload"; `/about` C7 says "we would like to talk". Neither is actionable. | The site can persuade and cannot capture. Every other item on this list is downstream of it. | Transactional | Q4. A decision, not a build: early access was withdrawn deliberately, and the fix must not reintroduce it. `engineering@punkraven.com` already exists in `config/site.ts` and is currently exposed only as an unlabelled icon. |
| **G2** | **No verification owner for any figure.** Every latency, cost, accuracy, population and market figure on the site is held. `/tnt` A6 and A7 exist as arguments with the numbers removed. | A reader evaluating TNT for a latency-sensitive workload leaves without the number they came for. The `ai-seo` skill ranks statistics as the second-highest citation lever (+37 per cent) and this site cannot use it. | Commercial investigation | Q2. Naming an owner is the whole task; the copy is already written and held. |
| **G3** | **No `robots.txt`, no `sitemap.xml`, no canonical tags, no JSON-LD.** | Nothing about the site is discoverable or machine-legible beyond raw HTML. The AI-crawler allowlist in particular is a prerequisite for citation, not an optimisation. | All | Q3 for canonicals and the sitemap. `robots.txt` and JSON-LD are unblocked and can ship today. |
| **G4** | **`/` no longer states that LawMan and LawSafe are research and drafting instruments rather than advice.** B8 was dropped, and that note was the one thing in it not carried elsewhere. The footer disclaimer is a *company-level* claim and is not the same statement. | The homepage is the most-linked route and the one most likely to be summarised in isolation. `/about` C6, `/lawman` and `/tnt` A13 still carry the product-level statement, so the site as a whole is covered; the homepage on its own is not. | Trust / compliance | Nothing. The fix is one sentence appended to the footer disclaimer, which restores it on all five routes at once. It changes a spec-mandated disclosure on four pages, so it needs a decision rather than an edit. |
| **G5** | **`/lawsafe` publishes an unverified dependency claim.** "Built on TNT and LawMan" appears in the hero eyebrow, in `/` B4, and in `lawsafe-page-copy.md` L4, while `punkraven-company-copy.md` Part D marks the same claim an inference. | It is the load-bearing claim of the entire stack narrative. If false, `/` B3 reframes from a stack to a family. | Positioning | Q1. A question for the team, not research. |
| **G6** | **The Indic script block on `/tnt` is empty.** Nine scripts, nine empty strings, blocked until a native reader of each supplies and checks the sentence. | It is the one element on the site that *demonstrates* the central claim rather than asserting it, and the spec calls it the deliberate risk worth taking. | Proof | Q5. Nine native readers, one sentence each. |
| **G7** | **No `/languages` page.** The 22 scheduled languages are named once, inside `/tnt` A4, on a long page. | The highest-intent informational asset the company owns, and the one topic where its honesty policy is a *ranking* advantage: nobody else publishes a tier split. Directly serves long-tail queries for the twelve languages the market rounds down. | Informational, awareness | Nothing. All content exists in `tnt-website-copy.md` A4. |
| **G8** | **No `/contact` page.** See G1. | Also the only place a `mailto:` belongs as content rather than as an icon. | Transactional | Q4 |
| **G9** | **No long-form writing anywhere.** The site captures existing demand across five pages and generates none. | The company has an argument - calibrated honesty as an engineering property - and no venue for it. The `ai-seo` skill's finding that brands are cited via third-party sources more than their own domain is a reason to publish something worth citing. Pillars in [9.1](#91-content-pillars) below. | Awareness | Editorial capacity. Nothing else. |
| **G10** | **No `llms.txt`.** | See [7.5](#75-llmstxt). The status block is the point. | Machine | Nothing |
| **G11** | **No `/careers`.** Prospective engineers are a named audience with no destination. `/about` C6 is the best recruiting copy on the site and links nowhere. | Recruitment | Navigational | Whether the company is hiring. Do not ship a careers page with no roles. |
| **G12** | **No `og:image`.** Every share renders as a text-only summary card. | Distribution | - | A designed image. `twitter:card` must stay `summary` until it exists. |
| **G13** | **No `/privacy`, no `/terms`.** | E-E-A-T trust signals, and table stakes for an institutional buyer doing diligence. | Trust | Legal review |
| **G14** | **"Read the technical plan" has no destination.** It is specified as the secondary CTA in `tnt-website-copy.md` A0 and A12, and A13 asserts "the complete planning document set is public", but no URL for it exists in any source document. | The page claims public documentation and provides no route to it, which is the one kind of overclaim this site is least able to afford. | Commercial investigation | Q6 |

### 9.1 Content pillars

Applying the `content-strategy` skill. Four pillars, derived product-led and audience-led. The
search-led and competitor-led inputs are unavailable - there is no keyword data and no
competitive analysis in this repo, and the copy docs bar naming competitors. **That absence is
a real limitation of this section and is stated rather than papered over.**

| Pillar | Why PunkRaven owns it | Searchable or shareable | Feeds |
|---|---|---|---|
| **1. Indian-language speech and translation** | The only pillar with an unambiguous existing-demand audience and a product page already built | Searchable | `/tnt`, `/languages`, long-tail per language |
| **2. Grounded reasoning and calibrated honesty** | The company thesis, stated identically in all three product documents. The most defensible thing PunkRaven has to say. | Both. Shareable leans harder. | `/lawman`, `/about` C4 |
| **3. Sovereign and self-hosted AI deployment** | MIT weights plus single-unit deployment is a verifiable architectural property, not a promise | Searchable | `/tnt` A8, `/lawman`, regulated-buyer intent |
| **4. Access to justice in India** | LawSafe's problem space. **Lowest priority and highest risk** - it is the pillar most likely to re-categorise the company as legal-tech, and every figure in it is held. | Shareable | `/lawsafe` only |

Pillar 4 must never outweigh pillars 1 through 3 in volume or prominence. That is the content
expression of the category gate.

### 9.2 Open questions

| ID | Question | Owner | Blocks |
|---|---|---|---|
| **Q1** | Does TNT actually power LawSafe's voice and multilingual support? Presented as a dependent stack in `/` B3 and B4 and in the `/lawsafe` eyebrow; marked "Inference, not stated in any source doc" in `punkraven-company-copy.md` Part D; listed as open decision 1 in build instructions §8. | Team | G5, the `/lawsafe` linking rows, `/` B3 framing |
| **Q2** | Who owns re-verifying the held figures? No owner has been named, and the hold has propagated to every route. | Team | G2, `/tnt` A6 and A7, `/about` C2 and C4, any statistic anywhere |
| **Q3** | What is the production domain? `punkraven.com` is **inferred** from `engineering@punkraven.com` and is an assumption. | Team | Canonicals, `og:url`, `sitemap.xml`, absolute URLs in `llms.txt` |
| **Q4** | What is the conversion path, now that early access is withdrawn? A labelled email link, a form, or deliberately nothing. | Team | G1, G8, every proposed CTA in this document |
| **Q5** | Who supplies and checks the nine Indic script strings for the `/tnt` hero? | Team | G6 |
| **Q6** | Is there a public URL for the TNT planning document set? A13 asserts the documents are public. | Team | G14, `/tnt` secondary CTA |

---

## 10. Governance

### 10.1 What each document is

| Document | Role | May be edited |
|---|---|---|
| `docs/copy/*.md` | **Raw source. Frozen.** The five copy documents are the traceable origin of every line on the site. They are briefs, not page content: they carry slot labels, source attributions, variant options, claim-status tables and editorial notes, none of which reaches a page. | Only when the underlying source material changes. Never to reflect a decision made downstream. |
| `docs/punkraven-site-build-instructions.md` | The original build specification. Still binding on structure, the category gate (§2a), the claim gate (§2b) and the design system. Carries an in-place SUPERSEDED block where the build deviated. | Only by adding a further superseded block. Do not rewrite history in it. |
| `docs/website-content.md` | **This file. The content definition, and the single source of truth for what the site currently says and should say.** Where a copy doc and a built page disagree about what is published, this document records which won and why. | Yes, per [10.3](#103-what-must-be-updated-when-copy-changes) |
| `content/*.ts` | The published strings. Each file carries a header stating the rules that bind it and inline comments at every point of deviation from its source. | Yes, and every deviation gets a comment |
| `config/site.ts` | Site name, nav order, external links. The single list the header and footer both render from. | Yes |
| `CLAUDE.md` | Engineering rules: fonts, elevation, tokens, HeroUI, accessibility floor, hooks. Not content. | Yes |

### 10.2 Precedence

1. **The category gate and the claim gate** (build instructions §2a and §2b) beat everything.
   A change that violates either is wrong regardless of how well it reads.
2. **This document** defines what the site says.
3. **The copy documents** define the wording, where this document does not override it.
4. **The build instructions** define the structure.

Where a copy document's wording and this document's rules conflict, the rule wins and the
conflict gets recorded in [10.4](#104-known-source-conflicts).

### 10.3 What must be updated when copy changes

| Change | Also update |
|---|---|
| A page's copy | `content/<page>.ts`, and [4. Per-page content specification](#4-per-page-content-specification) if a section is added, removed or renamed |
| A page title or meta description | `content/<page>.ts` meta export, and the tables in [6.2](#62-title-tags-and-meta-descriptions) |
| A new route | `config/site.ts` `navItems` (which updates header and footer at once), [3.2](#32-proposed-additions), [4](#4-per-page-content-specification), [6.2](#62-title-tags-and-meta-descriptions), [6.3](#63-h1-url-canonical-keywords), [8](#8-internal-linking-map), the sitemap and `llms.txt` |
| A removed route | Everything in the row above, **plus a 301 redirect**. Removing a URL without one loses any inbound link equity and breaks anyone's bookmark. |
| A restored figure | The verification owner must be named first (Q2), the relevant claim-status row re-read, the estimate qualifier rendered visibly adjacent rather than in a tooltip, and [1.5](#15-the-proof-and-what-it-is-not) and [9.2](#92-open-questions) updated |
| A restored CTA | `config/site.ts` links first, so label and destination stay defined in one place. Then [4](#4-per-page-content-specification), [8](#8-internal-linking-map), G1 and Q4. |
| A new claim of any kind | Trace it to a specific line in `docs/copy/*` before writing it. If it has no trace, it is an assumption and must be labelled as one in [9.2](#92-open-questions) rather than published. |
| A resolved open question | The Q row in [9.2](#92-open-questions), the gap row in [9](#9-content-gaps-and-backlog) it blocks, and every section that cites it |

### 10.4 Known source conflicts

Recorded so they are not rediscovered. These are conflicts **between source documents**, or
between a source document and the built site.

| # | Conflict | Resolution |
|---|---|---|
| 1 | `lawsafe-page-copy.md` L1 and L4 state that LawSafe is built on TNT and LawMan as fact. `punkraven-company-copy.md` Part D marks the same claim "Inference, not stated in any source doc" and requires confirmation. `punkraven-company-copy.md` B4 itself asserts it in the LawSafe eyebrow while Part D of the same file flags it. | **Resolved by owner ruling, 2026-07-24.** LawSafe is an entirely separate application, NOT built on TNT and LawMan. `content/home.ts` and [5.1](#51-level-1---company) are reframed to siblings ("one application alongside them"). The two layers are intended to join the application after MVP, which is a roadmap claim that must NOT appear in site copy. Q1 is closed. |
| 2 | Build instructions §2b.7 makes "Request early access" the only permitted primary CTA and §7 checklists it on every page. The repo withdrew early access site-wide at Phase 7 and now has no primary CTA anywhere. | **Repo wins.** The deviation is recorded in `config/site.ts` and `pages/index.tsx`. Q4 governs what replaces it. |
| 3 | `tnt-website-copy.md` A0 gives the URL slug as "`/` or `/tnt`". Build instructions §4.2 fixes five routes with TNT at `/tnt`. | **Build instructions win.** `/tnt` is the route. |
| 4 | `tnt-website-copy.md` A13 asserts "the complete planning document set is public", while A0 and A12's secondary CTA "Read the technical plan" has no URL in any source document. | **Unresolved.** Q6. The button is not rendered; the note is kept verbatim because it is mandatory. |
| 5 | Build instructions §3.4 asks for LawSafe's §2 statistics "with years attached" and Phase 6's gate reads "every statistic carries a year". `lawsafe-page-copy.md` holds every figure instead, satisfying the gate vacuously. | **Hold wins**, consistent with `/tnt` and `/about`. Recorded in `lawsafe-page-copy.md` decision 1. Revisit under Q2. |
| 6 | `lawsafe-product-vision.md` §3 names company incorporation, IP registration and MCA compliance as served needs. `punkraven-company-copy.md` Part E says do not name domains the company has not committed to. | **Left standing.** They are service categories rather than committed verticals, so §2a.5 is not engaged. Flagged in `lawsafe-page-copy.md` as worth a second look. |
| 7 | `lawman-summary.md` says LawMan works "in Indian languages, by voice or text", which implies a speech capability that TNT also claims. | **Not a contradiction, but a wording risk.** Neither page should imply two independent speech stacks. Resolves with Q1. |
| 8 | Build instructions §5.1 specifies a palette, an alternating light/dark band system and no dark-mode toggle. The build has a toggle, a uniform theme, and re-derived tokens. | **Already resolved in place.** The SUPERSEDED block in §5.1 records it. Content is unaffected. |
| 9 | `punkraven-company-copy.md` B0 lists "Request early access" as the homepage primary CTA and B7 carries a full closing CTA band. Neither exists. | **Repo wins.** B7 was removed on request; see `pages/index.tsx`. |
| 10 | `lawsafe-product-vision.md` §6.6 states in the present tense that every lawyer on the platform is Bar Council-verified. There is no platform. | **Resolved in the adaptation.** `lawsafe-page-copy.md` L4 adds "No panel exists yet - verification is a design commitment, not a live roster", and that sentence is load-bearing. |

### 10.5 Pre-publish checklist

Run before any copy change ships.

- [ ] No em dash (U+2014) anywhere in `docs/`, `content/`, `components/` or `pages/`. Grep for the literal character; use a spaced hyphen ` - ` instead.
- [ ] `grep -rin 'nyayasetu' content/ components/ pages/` returns nothing
- [ ] `grep -rin 'early access' content/ components/ pages/ config/` returns only the comments explaining the withdrawal
- [ ] `grep -rin '22+\|all Indian languages' content/` returns nothing
- [ ] `grep -rin 'legal tech\|legaltech\|law firm\|legal services' content/ components/` returns only the footer disclaimer and `/about` C6
- [ ] The word "advice" appears only inside sentences that disclaim it
- [ ] Every product block and product hero shows a status chip
- [ ] No figure appears that is not traceable to a source document **and** cleared by a named verification owner
- [ ] Nav, homepage blocks, footer product list and any sitemap all order TNT, then LawMan, then LawSafe
- [ ] The footer disclaimer renders on every route
- [ ] The cold-read test passes on `/` and `/about`
