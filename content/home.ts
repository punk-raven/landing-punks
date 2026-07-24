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
 *   T&T     - `tnt-website-copy.md` Part B, Variant B (Compact section)
 *   Lawman  - `lawman-summary.md` Part 2, Variant A (standard section)
 *   LawSafe - written out in full inside company-copy B4
 *
 * Two rules bind every string below:
 *
 *   §2b.5 - no latency, cost or accuracy figure appears on this page. They live
 *     on `/tnt` where their derivations and estimate qualifiers live with them.
 *     T&T's Variant B ships an inline proof line reading "22 languages - about
 *     a second for a 30 second clip - 2-5x cheaper than two managed APIs"; the
 *     latency and cost halves are barred here, so the line is de-numbered down
 *     to the language and licensing claims. §3.2 and §2b.5 genuinely conflict
 *     on that line and §2b wins - it is a hard rule.
 *
 *   §2a.1 - order is argument. T&T, then Lawman, then LawSafe, in the stack
 *     display, the product blocks and the status table. Leading with LawSafe
 *     re-categorises the company in the reader's head.
 */

export interface HomeHeroContent {
  eyebrow: string;
  headline: string;
  /** Four text claims, §2b.2: no logos, no testimonials, no "trusted by". */
  proof: string[];
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
  title: "PunkRaven - applied AI infrastructure, built in India",
  description:
    "A technology company building India's AI layers: speech across all 22 scheduled languages, and reasoning that grounds every claim in a real source. Self-hosted, and honest about what it does not know.",
  ogTitle: "India should not have to rent its intelligence.",
  ogDescription:
    "Indigenous AI infrastructure for Indian languages and high-stakes domains. Built in India, deployed inside your boundary.",
};

/* B1. Hero ------------------------------------------------------------------ */

export const hero: HomeHeroContent = {
  eyebrow: "Applied AI infrastructure - built in India",
  headline: "India should not have to rent its intelligence.",
  subheadline:
    "PunkRaven is a technology company building the AI layers Indian software keeps importing - speech across all 22 scheduled languages, and reasoning that grounds every claim in a real, retrieved source. We build the infrastructure, and we build on it ourselves to prove it works. Everything runs on hardware you control, and says plainly when it cannot verify what it is about to tell you.",
  secondaryCta: "See what we are building",
  secondaryCtaHref: "#what-we-build",
  proof: [
    "All 22 scheduled Indian languages",
    "MIT-licensed weights, self-hosted",
    "Every claim carries its source, or is withheld",
    "Runs inside your own network",
  ],
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
      heading: "Rented intelligence is a permanent tax",
      body: "Per-call pricing to an offshore vendor scales against every product that grows, the weights are never yours, and your users' most sensitive material leaves the country to be processed.",
    },
  ] satisfies ProblemCard[],
};

/* B3. What we build --------------------------------------------------------- */

export const stack = {
  heading: "Two layers of infrastructure. One application, to prove they work.",
  body: "PunkRaven builds the parts of the stack that are hard to buy and harder to fake: the layer that understands Indian speech, and the layer that reasons over authoritative material without inventing any. Both are products in their own right, with buyers who have nothing in common. Then we build on them ourselves, because a company that will not ship on its own infrastructure is asking you to take a risk it will not take.",
  /**
   * §5.4: two tiers, not three equal layers. The infrastructure group carries
   * the vertical weight; the application sits below a visible divider.
   */
  infrastructureLabel: "The infrastructure",
  applicationLabel: "Built on it",
  infrastructure: [
    {
      name: "T&T",
      role: "the language layer",
      description:
        "Audio in, transcript and translation out, across all 22 scheduled Indian languages, through one self-hosted API. MIT-licensed weights, so nothing leaves your infrastructure.",
      status: "planning",
    },
    {
      name: "Lawman",
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
    eyebrow: "T&T",
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
    cta: { label: "Explore T&T", href: "/tnt" },
  },
  {
    /* lawman-summary.md Part 2, Variant A (standard section). */
    eyebrow: "Lawman",
    heading:
      "AI built for Indian law - that shows its source, or admits it has none.",
    body: [
      "Lawman researches statutes, case law, and current rules and procedure, and grounds every legal claim in real retrieved material. References are checked before you see them. When the sources do not support an answer, Lawman says so instead of inventing one.",
      "Works in Indian languages, by voice or text. Reads real legal documents. Runs on infrastructure you control.",
    ],
    status: "specified",
    cta: { label: "Learn more", href: "/lawman" },
  },
  {
    /* Written out in full inside company-copy B4. */
    eyebrow: "LawSafe - built on T&T and Lawman",
    heading: "The first thing we built on our own stack.",
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
      body: "Uncertainty is returned to you, not smoothed over. T&T scores recognition and translation separately for every segment and states which quality tier the language sits in. Lawman treats an uncited claim as a defect rather than a stylistic choice. We would rather tell you a language is harder than quietly pretend all 22 are equivalent.",
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
    "PunkRaven is pre-launch. T&T has a complete technical specification and is at planning stage. Lawman is fully specified and not yet built. LawSafe is in design. Nothing on this site is a description of running production software, and where we have given a number it is an engineering estimate for planning rather than a benchmarked result.",
    "We are opening early access to teams who have a real workload, an interest in what we are building, and the patience to build alongside it.",
  ],
  caption: "Where each project stands",
  columns: {
    project: "Project",
    stage: "Stage",
    exists: "What exists today",
  },
  rows: [
    {
      project: "T&T",
      status: "planning",
      exists: "Full technical specification and costed deployment plan",
    },
    {
      project: "Lawman",
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
 * The closing CTA band was removed from the homepage on request, so its copy is
 * deleted rather than parked here unrendered - the same rule this file applies
 * to B8 below. `git log` for `pages/index.tsx` recovers both the copy and
 * `components/sections/cta-band.tsx` if the section comes back.
 */

/* B8. Footer notes - not built ----------------------------------------------
 *
 * The five notes are dropped from the homepage rather than parked here, so this
 * file does not carry copy nothing renders. Where each one went:
 *
 *   1. "not a law firm"        -> components/site-footer.tsx, on every route.
 *                                 This is the §2a.4 mandatory one and it was
 *                                 always carried there independently.
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
 * longer states at product level that Lawman and LawSafe are research and
 * drafting instruments rather than advice. The footer's §2a.4 disclaimer is a
 * COMPANY-level claim - "PunkRaven builds software, it is not a law firm" - and
 * is not the same statement. The product-level one still appears on `/about`
 * (C6), `/lawman` (the "Do not use" column) and `/tnt` (A13), so the site as a
 * whole is covered; the homepage on its own is not.
 *
 * If that gap matters, the fix is one sentence appended to the footer
 * disclaimer in `components/site-footer.tsx`, which would restore it on every
 * route at once. Deliberately not done here without a decision, because it
 * changes a spec-mandated disclosure on four pages.
 *
 * Restore the whole section from `punkraven-company-copy.md` B8 if the decision
 * is reversed.
 */
