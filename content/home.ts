import type { ProductStatus } from "@/components/status-chip";

/**
 * Homepage content - `docs/copy/punkraven-company-copy.md` Part B, sections B0
 * to B8, hand-transcribed per spec §3.1.
 *
 * The copy documents are briefs, not page content. Everything that names a slot
 * rather than filling it has been stripped on the way in: `*Source: ...*`
 * attribution lines, `**Section heading**` / `**Body**` / `**Primary CTA**`
 * field labels, the Part D claim-status table, Part E copy notes, Part A
 * (marked not for publication), the `> **Status note:**` blockquote, and the
 * variants not chosen. There is deliberately no markdown renderer - §3.1 asks
 * for explicit transcription so the apparatus cannot leak onto the page.
 *
 * Variants chosen per §3.2:
 *   TNT     - `tnt-website-copy.md` Part B, Variant B (Compact section)
 *   LawMan  - `lawman-summary.md` Part 2, Variant A (standard section)
 *   LawSafe - written out in full inside company-copy B4
 *
 * Two rules bind every string below:
 *
 *   §2b.5 - no latency, cost or accuracy figure appears on this page. They live
 *     on `/tnt` where their derivations and estimate qualifiers live with them.
 *     TNT's Variant B ships an inline proof line reading "22 languages - about
 *     a second for a 30 second clip - 2-5x cheaper than two managed APIs"; the
 *     latency and cost halves are barred here, so the line is de-numbered down
 *     to the language and licensing claims. §3.2 and §2b.5 genuinely conflict
 *     on that line and §2b wins - it is a hard rule.
 *
 *   §2a.1 - order is argument. TNT, then LawMan, then LawSafe, in the stack
 *     display, the product blocks and the status table. Leading with LawSafe
 *     re-categorises the company in the reader's head.
 */

export interface HomeHeroContent {
  eyebrow: string;
  headline: string;
  /**
   * There is no `primaryCta` here. B7 carried this page's `#early-access`
   * target and was removed, so the hero's request button went with it.
   */
  secondaryCta: string;
  secondaryCtaHref: string;
  subheadline: string;
}

export interface ProblemCard {
  body: string;
  heading: string;
}

export interface StackLayer {
  description: string;
  name: string;
  /** The layer's job - "the language layer", "the first application". */
  role: string;
  status: ProductStatus;
}

export interface ProductBlockContent {
  body: string[];
  cta: { href: string; label: string };
  eyebrow: string;
  heading: string;
  /** Short claim under the body. Structural claims only - see §2b.5 above. */
  proof?: string;
  status: ProductStatus;
}

export interface Principle {
  body: string;
  heading: string;
}

export interface StatusRow {
  exists: string;
  project: string;
  status: ProductStatus;
}

/* B0. Page metadata --------------------------------------------------------- */

export const homeMeta = {
  title: "PunkRaven - self-hosted AI infrastructure",
  description:
    "A technology company building self-hosted AI infrastructure: speech across all 22 scheduled Indian languages, and reasoning that grounds every claim in a real source. Honest about what it does not know.",
  ogTitle: "Self-hosted AI infrastructure for Indian languages.",
  ogDescription:
    "Self-hosted speech and grounded reasoning for Indian languages and high-stakes domains. Runs inside your own network, and says plainly what it cannot verify.",
};

/* B1. Hero ------------------------------------------------------------------ */

export const hero: HomeHeroContent = {
  eyebrow: "Applied AI infrastructure",
  headline: "Speech and reasoning, self-hosted.",
  subheadline:
    "PunkRaven builds self-hosted AI infrastructure: a speech layer that transcribes and translates all 22 scheduled Indian languages, and a reasoning layer that grounds every claim in a real, retrieved source. That reasoning layer attaches a citation to what it retrieves, and abstains when the sources do not support an answer. Alongside the two layers we are building one application of our own, LawSafe, a separate product rather than something stacked on top of them. Everything runs inside your own network, it is pre-launch, and it says plainly when it cannot verify what it is about to tell you.",
  secondaryCta: "See what we are building",
  secondaryCtaHref: "#what-we-build",
};

/* B2. The problem ----------------------------------------------------------- */

export const problem = {
  heading:
    "Most software built for India was built somewhere else and pointed at India.",
  body: "The models handle a few of our languages well and treat the rest as an edge case. Systems trained on other countries' material do not know our domains, and cannot tell you which parts of what they know have gone stale. The infrastructure sits offshore on per-call pricing no Indian buyer can renegotiate. And when these systems do not know something, they rarely say so - they produce something fluent and wrong, which in a compliance record, a medical note or a legal matter is worse than producing nothing at all.",
  cards: [
    {
      heading: "Our languages are the long tail somewhere else",
      body: "The largest Indian languages get decent coverage. The other twelve scheduled languages get an apology. If your users speak Santali, Kashmiri, Manipuri or Bodo, you are building for people the market has decided to round down.",
    },
    {
      heading: "Fluent and wrong is the default failure",
      body: "A misheard word gets translated confidently into something that was never said. A fabricated reference arrives correctly formatted. Neither surfaces as an error, and most systems will not tell you which parts they were unsure about.",
    },
    {
      heading: "A metered offshore API is a cost that never stops",
      body: "Per-call pricing to an offshore vendor scales against every product that grows, the weights are never yours, and your users' most sensitive material leaves the country to be processed.",
    },
  ] satisfies ProblemCard[],
};

/* B3. What we build --------------------------------------------------------- */

export const stack = {
  heading: "Two layers of infrastructure. One application alongside them.",
  /**
   * Owner ruling, 2026-07-24: LawSafe is a separate application, NOT built on
   * TNT and LawMan. The previous closing sentence ("Then we build on them
   * ourselves...") argued the company ships on its own infrastructure, which
   * implied a dependency that does not exist. Reframed to siblings: the
   * application is built alongside the two layers, not on top of them. The
   * second sentence carries the §2.8 LawMan/LawSafe distinction, required
   * wherever both are named together.
   */
  body: "PunkRaven builds the parts of the stack that are hard to buy and harder to fake: the layer that understands Indian speech, and the layer that reasons over authoritative material without inventing any. Both are products in their own right, with buyers who have nothing in common. Alongside them we are building one application of our own. LawMan reasons; LawSafe is what a person opens.",
  /**
   * §5.4: two tiers, not three equal layers. The infrastructure group carries
   * the vertical weight; the application sits below a visible divider.
   */
  infrastructureLabel: "The infrastructure",
  applicationLabel: "Alongside it",
  infrastructure: [
    {
      name: "TNT",
      role: "the language layer",
      description:
        "Audio in, transcript and translation out, across all 22 scheduled Indian languages, through one self-hosted API. MIT-licensed weights, so nothing leaves your infrastructure.",
      status: "planning",
    },
    {
      name: "LawMan",
      role: "the reasoning layer",
      description:
        "Retrieves the governing material first, answers from what it found, verifies every reference against the source text, and abstains when the sources do not support an answer. Built for Indian law as its first body of authority.",
      status: "specified",
    },
  ] satisfies StackLayer[],
  application: [
    {
      name: "LawSafe",
      role: "the first application",
      description:
        "A chat-first way for any Indian to describe a legal problem in their own language and understand where they stand, then reach a verified advocate when a human is genuinely needed.",
      status: "in-design",
    },
  ] satisfies StackLayer[],
  supporting:
    "Law came first because it is the hardest available test of a grounded system: the sources are authoritative, the language is exact, and a fluent invention is not a rough draft but a liability. Getting it right there is what makes the rest credible. The same two layers serve any domain where being confidently wrong is expensive.",
};

/* B4. Product blocks -------------------------------------------------------- */

export const products: ProductBlockContent[] = [
  {
    /* tnt-website-copy.md Part B, Variant B (Compact section). */
    eyebrow: "TNT",
    heading: "Audio in. Transcript and translation out.",
    body: [
      "A self-hosted speech pipeline for all 22 scheduled Indian languages. One API call returns a punctuated transcript, a translation, and an honest confidence score for both. MIT-licensed models, so nothing leaves your infrastructure and there is no per-call vendor fee.",
      /**
       * The non-legal buyers, from `tnt-website-copy.md` A10. §2a.3 requires
       * them on a company page: they are the proof that the capability is
       * horizontal rather than legal. The company doc's Part D claims they
       * appear in B5 and C5; in the copy as written they appear only in C5, so
       * without this sentence the homepage - the page where the category gate
       * is actually decided - names none of them.
       */
      "Its buyers are contact centres, consumer and social apps, government and public services, media and education - any team whose users do not speak English.",
    ],
    /**
     * De-numbered per §2b.5. Variant B's line is "22 languages - about a
     * second for a 30 second clip - 2-5x cheaper than two managed APIs"; the
     * latency and cost halves are barred from this page, so only the language
     * and licensing claims survive. Both are structural and both are safe.
     */
    proof: "22 scheduled languages - MIT-licensed weights, self-hosted",
    status: "planning",
    cta: { label: "Explore TNT", href: "/tnt" },
  },
  {
    /* lawman-summary.md Part 2, Variant A (standard section). */
    eyebrow: "LawMan",
    heading:
      "AI built for Indian law - that shows its source, or admits it has none.",
    body: [
      "LawMan researches statutes, case law, and current rules and procedure, and grounds every legal claim in real retrieved material. References are checked before you see them. When the sources do not support an answer, LawMan says so instead of inventing one.",
      "Works in Indian languages, by voice or text. Reads real legal documents. Runs on infrastructure you control.",
    ],
    status: "specified",
    /**
     * B4's LawMan anchor, content spec 8.2. The source document's label is
     * "Learn more" - the only one of the three product anchors that does not
     * name its target, and a crawler reads the anchor text as the description
     * of the destination. The substitution is a linking decision rather than a
     * copy change, and it is the one place this file departs from a straight
     * transcription; it lives here so the anchor and its destination stay
     * defined together.
     */
    cta: { label: "Explore LawMan", href: "/lawman" },
  },
  {
    /*
     * Written out in full inside company-copy B4.
     *
     * Owner ruling, 2026-07-24: LawSafe is a separate application, NOT built on
     * TNT and LawMan. The eyebrow and heading below must NOT revert to a
     * dependency claim ("built on TNT and LawMan", "built on our own stack").
     * LawSafe is the application layer, sibling to the two infrastructure
     * layers, not a product sitting on top of them.
     */
    eyebrow: "LawSafe - the application layer",
    heading: "The first application we are building.",
    body: [
      "Most Indians who are wronged never reach a courtroom, and often should not have to. They do not know their rights, do not know free legal aid exists, and cannot tell whether their problem is even a legal one. LawSafe lets a person describe what happened in plain language - typed or spoken, in their own language - and get a grounded, cited explanation of where they stand and what their options are. When the matter genuinely needs a human, it connects them to a Bar Council-verified advocate who specialises in exactly that issue.",
    ],
    proof:
      "Understanding first, transaction second - free at the first mile, in the language the person actually speaks.",
    status: "in-design",
    cta: { label: "Explore LawSafe", href: "/lawsafe" },
  },
];

/* B5. How we build ---------------------------------------------------------- */

export const principles = {
  heading: "The same six rules, in every system we ship.",
  body: "These are not values on a wall. Each one is a constraint that shows up in the architecture, and each one costs us something we have decided to pay.",
  items: [
    {
      heading: "Grounded, or silent.",
      body: "Our systems answer from retrieved current material and attribute the claim to its source. When the sources do not support an answer, the system says so instead of inventing one. A wrong answer is worse than no answer, and we would rather ship a product that sometimes declines than one that is never uncertain.",
    },
    {
      heading: "Confidence is part of the contract, not a footnote.",
      body: "Uncertainty is returned to you, not smoothed over. TNT scores recognition and translation separately for every segment and states which quality tier the language sits in. LawMan treats an uncited claim as a defect rather than a stylistic choice. We would rather tell you a language is harder than quietly pretend all 22 are equivalent.",
    },
    {
      heading: "Runs where your data is allowed to be.",
      body: "MIT-licensed weights and single-unit deployment mean our systems can run entirely inside your network. No audio leaves your infrastructure. No confidential document reaches a third party. No vendor can change per-call pricing under you.",
    },
    {
      heading: "Built for the language, not translated into it.",
      body: "All 22 scheduled languages, not the ten that are comfortable. Domain structure and convention learned properly rather than a foreign model asked politely about them. Scanned documents at the print quality Indian institutions actually produce.",
    },
    {
      heading: "Skill in the model, facts in the sources.",
      body: "Our systems are built to reason, to use domain language correctly and to cite properly. The facts always come from live retrieved material. That separation is why the knowledge does not go stale - and why the domain is a parameter rather than something welded into the model.",
    },
    {
      heading: "We say what we have not built yet.",
      body: "Every performance and cost figure we publish is labelled as an estimate or a measurement. There are no customer logos on this site, because there are no customers yet. A company whose products are built to admit uncertainty does not get to overclaim on its own homepage.",
    },
  ] satisfies Principle[],
};

/* B6. Where we are ---------------------------------------------------------- */

export const whereWeAre = {
  heading: "Early, and saying so.",
  body: [
    "PunkRaven is pre-launch. TNT has a complete technical specification and is at planning stage. LawMan is fully specified and not yet built. LawSafe is in design. Nothing on this site is a description of running production software, and where we have given a number it is an engineering estimate for planning rather than a benchmarked result.",
    /**
     * The source's second sentence here read "We are opening early access to
     * teams who have a real workload, an interest in what we are building, and
     * the patience to build alongside it." It is CUT, and it must not come back
     * while the site has no way to ask.
     *
     * Early access was withdrawn site-wide at Phase 7 - every button, the
     * `earlyAccess` constant and the form that was never built. This sentence
     * survived that removal because it is prose rather than a CTA, and it was
     * the worst of what survived: the other two danglers (`/tnt` A12, `/about`
     * C7) say the company would like to hear from you, which is merely
     * unactionable. This one announced an open programme, on the page whose
     * whole subject is not overclaiming, with nothing on the site to act on it.
     *
     * Restoring early access means restoring this sentence too.
     */
  ],
  caption: "Where each project stands",
  columns: {
    project: "Project",
    stage: "Stage",
    exists: "What exists today",
  },
  rows: [
    {
      project: "TNT",
      status: "planning",
      exists: "Full technical specification and costed deployment plan",
    },
    {
      project: "LawMan",
      status: "specified",
      exists: "Complete system design, pending build",
    },
    {
      project: "LawSafe",
      status: "in-design",
      exists: "Product vision and scope",
    },
  ] satisfies StatusRow[],
};

/* B7. Final call to action - removed ----------------------------------------
 *
 * The copy document's B7 band was removed from the homepage on request and its
 * copy deleted rather than parked here unrendered - the same rule this file
 * applies to B8 below. `git log` for `pages/index.tsx` recovers that copy and
 * `components/sections/cta-band.tsx` if it is ever wanted back.
 *
 * The closing ask that briefly occupied the slot (content spec 4.1 "Primary
 * CTA", the "Tell us about the work." section) has since been removed too, by
 * owner decision. Its copy, its section component under `components/sections/`
 * and its `mailto:` CTA are all gone; `git log` for `pages/index.tsx` recovers
 * them if the decision reverses. The homepage now ends on B6, the status table.
 */

/* B8. Footer notes - not built ----------------------------------------------
 *
 * The five notes are dropped from the homepage rather than parked here, so this
 * file does not carry copy nothing renders. Where each one went:
 *
 *   1. "not a law firm"        -> components/sections/hero.tsx, on `/` only.
 *                                 This is the §2a.4 mandatory one. It was
 *                                 carried in the footer on every route until an
 *                                 owner decision moved it into the homepage hero
 *                                 and off the footer, so it now appears on `/`.
 *   2. pre-launch status       -> B6's status table, per project rather than as
 *                                 a blanket note.
 *   3. figures are estimates   -> nothing on `/` renders a figure (§2b.5 bars
 *                                 them), so the note qualified nothing. `/tnt`
 *                                 keeps the equivalent note in A13, where the
 *                                 figures actually live.
 *   4. model weights, MIT      -> stated four times already in B3 and B4.
 *   5. "neither is legal advice" -> NOT carried anywhere else on this page.
 *
 * Note 5 is the one real loss and it is flagged, not quietly absorbed. `/` no
 * longer states at product level that LawMan and LawSafe are research and
 * drafting instruments rather than advice. The §2a.4 disclaimer now in the hero
 * is a COMPANY-level claim - "PunkRaven builds software, it is not a law firm" -
 * and is not the same statement. The product-level one still appears on `/about`
 * (C6), `/lawman` (the "Do not use" column) and `/tnt` (A13), so the site as a
 * whole is covered; the homepage on its own is not.
 *
 * If that gap matters, the fix is one sentence appended to the hero disclaimer
 * in `components/sections/hero.tsx`. That reaches `/` only now that the
 * disclaimer is homepage-scoped, which is the page this note is about.
 *
 * Restore the whole section from `punkraven-company-copy.md` B8 if the decision
 * is reversed.
 */
