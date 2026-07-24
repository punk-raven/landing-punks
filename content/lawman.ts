/**
 * Lawman page content - written against `docs/website-content.md` §4.4, with §6
 * supplying the title, meta description and H1, §7 the extractable answer block
 * and the question-shaped column headings, and §8.2 the one outbound contextual
 * link this page is cleared to carry. `docs/copy/lawman-summary.md` is the
 * underlying brief and its Part 2 is the homepage block, already built in
 * `content/home.ts`; nothing from it is duplicated here.
 *
 * TWO SPECS ARE CITED IN THIS FILE AND THEY DO NOT SHARE A NUMBERING. A bare
 * `§n.n` is `docs/website-content.md`, the current document. References written
 * `§2b.n`, and the `§3.3` and `§5.2` in the section components, are the older
 * `docs/punkraven-site-build-instructions.md` and are deliberately left at their
 * own numbers rather than renumbered onto the newer document.
 *
 * The copy documents are briefs, not page content. The `**Headline:**` /
 * `**Subheadline:**` / `**Primary CTA:**` field labels and the trailing copy
 * notes are stripped on the way in. There is deliberately no markdown renderer -
 * explicit transcription is what keeps the apparatus off the page.
 *
 * FIVE RULES BIND EVERY STRING BELOW.
 *
 *   1. Nothing may read as shipped. `lawman-summary.md` opens with a status note
 *      - "Lawman is fully specified but not yet built. All copy below describes
 *      the intended product" - and §4.4 keeps it. The copy underneath is written
 *      in the present indicative ("Lawman does not answer from memory",
 *      "Citations are verified") and that is left alone: it describes design
 *      intent, and rewriting it into the conditional would soften abstention,
 *      which the source's own copy notes forbid. The status carries the
 *      distinction instead, and it renders twice - in the hero beside the chip,
 *      and again at the close. `/about` C7 words the same state as "Fully
 *      specified, and not yet built"; this page uses those words.
 *
 *   2. No numbers. The source contains zero figures in its body copy,
 *      deliberately - its own copy notes say accuracy figures, benchmark scores,
 *      model names and stack details "are deliberately absent - the numbers do
 *      not exist yet", and §4.4 bars all four from this route. So there is
 *      nothing here to hold and nothing to invent, and §2b.3 bars inventing any.
 *
 *   3. Research and drafting, never the word §2.3 bars (§2b.8 in the older
 *      document). That word appears exactly once in this file, inside the
 *      sentence that disclaims it, in the second comparison column, and it must
 *      stay that way - `grep -in` over this file returning one hit is the
 *      acceptance gate, and this note is worded to keep it. The boundary is
 *      stated again in the hero, worded without that word, so the disclaimer is
 *      not buried at the bottom of the page.
 *
 *   4. No voice capability is asserted. `lawman-summary.md` says Lawman works
 *      "by voice or text" and `tnt-website-copy.md` claims speech for T&T; §10.4
 *      conflict 7 logs the overlap as a wording risk that resolves with open
 *      question Q1, and until it does, neither page may imply two independent
 *      speech stacks. Both voice clauses are dropped rather than reworded. The
 *      §8.2 link from "Built in Indian languages" to `/tnt` is gated on the same
 *      question and is not rendered.
 *
 *   5. Infrastructure framing. Lawman is the reasoning layer of PunkRaven's
 *      stack (`/about` C5 names it exactly that), not a legal service and not
 *      the citizen-facing product - that is LawSafe (§2.8). PunkRaven builds
 *      software.
 *
 * No social proof of any kind appears below, and none may be added: there are no
 * customers (§2b.2). The hero carries no proof strip for that reason - the
 * source supplies none, and the four claims on `/tnt`'s hero come from its own
 * document rather than from a house pattern.
 */

import type { ProductStatus } from "@/components/status-chip";

import { siteConfig } from "@/config/site";

/* Types ---------------------------------------------------------------------- */

export interface LawmanHeroContent {
  /**
   * The boundary, stated where a reader meets the product rather than at the
   * foot of the page. Worded without the word §2.3 bars, so the single
   * disclaiming sentence in the comparison below stays the only occurrence.
   */
  boundary: string;
  eyebrow: string;
  headline: string;
  status: ProductStatus;
  /** What "specified" means concretely, next to the chip. */
  statusLine: string;
  subheadline: string;
}

/**
 * A paragraph with one emphasised clause inside it and one outbound link after
 * it. The source bolds exactly one sentence in the whole of its running prose -
 * the constraint the entire system is designed around - and dropping that
 * emphasis loses the hinge of the section. Modelled as separate fields rather
 * than as an HTML string so nothing on this page ever needs
 * `dangerouslySetInnerHTML`.
 *
 * The link is §8.2's one cleared outbound link from this page. It is part of the
 * sentence, not a trailing "read more", so it is carried in the same shape.
 */
export interface EmphasisParagraph {
  afterLead: string;
  afterLink: string;
  before: string;
  emphasis: string;
  linkHref: string;
  linkText: string;
}

/** A bold lead-in and the explanation that follows it - the house voice. */
export interface LeadIn {
  body: string;
  lead: string;
}

/**
 * One column of the "When to use" comparison. `items` are whole sentences, not
 * lead-and-body pairs, because both columns have to render through identical
 * markup - see the note on `whenToUse` below.
 */
export interface ComparisonColumnContent {
  heading: string;
  items: string[];
}

/* Page metadata - §6.2 and §6.3 ---------------------------------------------- */

/**
 * The title is §6.2's, unchanged and already correct at 53 characters. The
 * description is §6.2's replacement: the previous one ran 205 characters and
 * truncated. This one states grounding, verification and abstention, which are
 * the three things the page actually claims.
 *
 * No `ogTitle` and no `ogDescription`: there is no source for them, and
 * `layouts/head.tsx` falls the OG pair back to the document title and meta
 * description on its own, exactly as it does for `/about`.
 */
export const lawmanMeta = {
  title: "Lawman - Indian law, answered with the source attached",
  description:
    "Lawman is an AI system for Indian law. It grounds every claim in a retrieved source, checks the reference before you see it, and abstains when it cannot.",
};

/* Hero ----------------------------------------------------------------------- */

export const lawmanHero: LawmanHeroContent = {
  eyebrow: "Lawman",
  /** §6.3: the page's one H1, and it is the hero headline. */
  headline: "Indian law, answered with the source attached.",
  subheadline:
    "Lawman is an AI system built for one thing - Indian law. It grounds every legal claim in a real, retrieved source. When it cannot verify a claim, it says so instead of inventing one.",
  boundary:
    "It is a research and drafting instrument, not counsel. Lawman researches and drafts; a qualified person reviews and signs.",
  status: "specified",
  /**
   * The source's status note, turned from an instruction to the builder into a
   * statement to the reader. The first clause is `/about` C7's wording verbatim.
   * The second is what the note's "all copy below describes the intended
   * product" means for someone reading the page, and it is the reason the
   * present tense below is safe.
   */
  statusLine:
    "Fully specified, and not yet built. Everything on this page describes the intended product, not running software.",
};

/* What is Lawman ------------------------------------------------------------- */

/**
 * `answer` IS §7.2'S EXTRACTABLE ANSWER BLOCK, PUBLISHED VERBATIM, AND IT LEADS
 * THE SECTION. §7.6 is explicit that those blocks are composed from published
 * copy and are meant to *be* published copy rather than a parallel
 * machine-facing version. It is self-contained on purpose: an extractor that
 * lifts this paragraph alone still carries the status, and an extractor that
 * truncates takes the top. Nothing may be moved above it.
 *
 * §7.1 asks for a question-shaped heading here and notes the section is already
 * named for it, so the heading is left as the source wrote it rather than
 * converted.
 */
export const whatLawmanIs = {
  heading: "What is Lawman",
  answer:
    "Lawman is PunkRaven's reasoning layer, built for Indian law as its first body of authority. It retrieves the governing material before answering, attributes each claim to its source, verifies every reference against the source text, and abstains when the sources do not support an answer. Lawman is specified and not yet built.",
  specialisation:
    "It is specialised in Indian law - statutes, case law, court procedure, and the rules and circulars that change week to week. It is not a general-purpose chatbot pointed at legal questions.",
  constraint: {
    before: "It is a system designed around a single constraint: ",
    emphasis:
      "a legal answer is only worth having if you can trace it back to the authority it came from.",
    afterLead:
      " Everything in Lawman follows from that - how it is trained, how it retrieves, how it checks itself, and what it does when it is unsure. It is the same discipline behind ",
    linkText: "how PunkRaven builds",
    linkHref: "/about",
    afterLink: " every layer of the stack.",
  } satisfies EmphasisParagraph,
  /** The source's "by voice or text" is dropped here. See rule 4 above. */
  closing:
    "Lawman researches, explains, and drafts. It works in Indian languages, and it reads the documents legal work actually arrives in. It is built to run on infrastructure you control, so confidential material never has to leave your hands.",
};

/* Why Lawman is required ----------------------------------------------------- */

/**
 * Five failure modes of the alternative, each named before any fix is offered.
 * They are the argument for the section below them, so the order is the source's
 * and the last one - "it does not know when to stop" - stays last: it is the one
 * the whole product is built around.
 *
 * Nothing here is amber. These are failures of general-purpose systems, stated
 * as fact, not claims this page is uncertain about.
 */
export const whyLawman = {
  heading: "Why Lawman is required",
  intro:
    "General-purpose AI fails at Indian legal work in ways that are not cosmetic.",
  items: [
    {
      lead: "It invents authority.",
      body: "Fabricated sections and judgments arrive confident and correctly formatted. In law, that is not a rough draft - it is exposure.",
    },
    {
      lead: "It does not know current law.",
      body: "Legal facts move constantly. A general model's knowledge is frozen at the moment it was trained, and it cannot tell you which parts have gone stale.",
    },
    {
      lead: "It does not know Indian law specifically.",
      body: "Indian statutory structure, court hierarchy, procedure, and drafting convention are not well represented in models built elsewhere for everyone.",
    },
    {
      lead: "It cannot be trusted with your files.",
      body: "Confidential material cannot be handed to an external service by anyone carrying a duty of confidence.",
    },
    {
      lead: "It does not know when to stop.",
      body: "A general model would rather produce a plausible answer than admit it has none. That instinct is exactly backwards for legal work.",
    },
  ] satisfies LeadIn[],
  closing:
    "Lawman exists because each of these has to be solved deliberately, at the level of how the system is built - not patched over with a disclaimer.",
};

/* How it works --------------------------------------------------------------- */

/**
 * Ten design decisions. Structurally this is the same shape as `whyLawman` above
 * - a bold lead-in and an explanation - and the two sections are adjacent, so
 * they are given different treatments in the components rather than rendering as
 * one list of fifteen. See the notes in `components/sections/lawman-why.tsx` and
 * `components/sections/lawman-how-it-works.tsx`.
 *
 * The last entry, "a human still signs", is not a disclaimer bolted on the end.
 * It is the design decision that makes the rest of the list coherent, and it is
 * the same boundary the site footer states on every route.
 */
export const howLawmanWorks = {
  heading: "How it works",
  items: [
    {
      lead: "Grounded, never freehand.",
      body: "Lawman does not answer from memory. It retrieves the governing material first, then answers from what it found, and attributes the claim to its source. An uncited legal claim is treated as a defect, not a stylistic choice.",
    },
    {
      lead: "Every reference is checked before you see it.",
      body: "Citations are verified against the actual source text automatically. A reference that does not hold up does not reach the answer.",
    },
    {
      lead: "Skill in the model, facts in the sources.",
      body: "Lawman is trained to reason, to use legal language correctly, and to cite properly. The facts themselves always come from live retrieved material. That separation is why its knowledge does not go stale as the law moves.",
    },
    {
      lead: "It works step by step, and checks its own work.",
      body: "Complex questions get broken down. Lawman plans an approach, gathers what each step needs, and verifies before moving on - rather than producing one confident block of text in a single pass.",
    },
    {
      lead: "Trained to abstain.",
      body: 'Lawman is deliberately taught to say "I could not verify this" when its sources do not support an answer. Abstention is a designed behaviour, not a failure mode. A wrong legal answer is worse than none.',
    },
    {
      lead: "Fails closed.",
      body: "Verification runs in layers. If any layer cannot confirm a claim, the system withholds it rather than shipping it unverified.",
    },
    {
      /**
       * The source's "by voice or in writing" is dropped. See rule 4 at the top
       * of this file: the speech claim overlaps T&T's and is gated on Q1, and
       * the §8.2 link to `/tnt` that would sit in this entry is gated with it.
       */
      lead: "Built in Indian languages.",
      body: "Questions asked in an Indian language are researched against the same material and answered in that language.",
    },
    {
      lead: "Reads real legal documents.",
      body: "Scanned judgments, filings, and the print quality that Indian court output actually arrives in - not just clean digital text.",
    },
    {
      lead: "Runs where you decide.",
      body: "Lawman is built to be deployed on your own infrastructure. Public law can live on shared systems; confidential material never has to.",
    },
    {
      lead: "A human still signs.",
      body: "Lawman researches and drafts; a qualified person reviews and takes responsibility. That review step is part of how the system is designed to be used.",
    },
  ] satisfies LeadIn[],
};

/* When to use Lawman --------------------------------------------------------- */

/**
 * The section the page exists for. §4.4, and §3.3 in the older document: "render
 * it as a genuine two-column comparison, not as one list with a heading. A
 * company publishing the cases where its product is the wrong tool is the most
 * persuasive thing on that page. Do not soften or shorten the 'Do not use'
 * column."
 *
 * THE TWO COLUMNS ARE PEERS, AND THE DATA SHAPE IS PART OF HOW THAT IS ENFORCED.
 * Both are plain `ComparisonColumnContent` with a heading and a list of whole
 * sentences - there is no `tone`, no `variant`, no `emphasis` field, and nothing
 * else that could carry a difference from here into the markup. The acceptance
 * gate is that the second column renders at equal visual weight to the first,
 * and the cheapest way to guarantee that is to leave no channel through which
 * they could diverge. Adding one to this interface would open it.
 *
 * BOTH HEADINGS ARE QUESTIONS, AND SYMMETRICALLY SO. §7.1 asks this section for
 * "When should you not use Lawman?" as an extractable heading. Phrasing only the
 * second column as a question would have made it the odd one out on a pair that
 * has to read as peers, so the first is phrased the same way. Turning either
 * back into a statement breaks §7.1 and unbalances the pair.
 *
 * The first item in the second column is the one sentence on this page that uses
 * the word §2.3 bars, and it uses it to disclaim it. It must survive verbatim,
 * and the word must not appear anywhere else in this file or in any component
 * that renders it.
 */
export const whenToUse = {
  /**
   * AUTHORED HEADING. The source labels the section "When to use Lawman", which
   * names only half of what is under it. An `<h2>` that says "when to use" over
   * a two-column comparison frames the second column as a caveat before a reader
   * has read a word of it, which is the exact failure the acceptance gate is
   * written against. Extended to name both halves.
   */
  heading: "When to use Lawman, and when not to",
  columns: [
    {
      heading: "When should you use Lawman?",
      items: [
        "You need to find the governing provision or authority on a point and see where it comes from.",
        "You need to know the current position on something that has been amended, notified, or recently decided.",
        "You need to understand what the position was at a particular point in time, not only what it is today.",
        "You are working through material in an Indian language, or across several of them.",
        "You need to work with documents that cannot be sent to an outside service.",
        "You are drafting and want a first pass that already carries its references.",
        "You want an answer with the underlying material laid out so you can check it yourself.",
      ],
    },
    {
      heading: "When should you not use Lawman?",
      items: [
        "You need legal advice. Lawman is a research and drafting instrument. It is not counsel and does not replace professional judgement.",
        "The output will go out unreviewed. Consequential work needs a qualified human sign-off.",
        "The question is outside Indian law. Lawman is specialised, and specialisation is the point.",
        "You want a confident answer more than a correct one. Lawman will tell you when it cannot verify something, and that is the behaviour it was built for.",
      ],
    },
  ] satisfies [ComparisonColumnContent, ComparisonColumnContent],
};

/* Closing CTA ---------------------------------------------------------------- */

/**
 * The source's closing CTA is a single line: "Get early access - built in India,
 * for Indian law."
 *
 * THE SOURCE'S VERB IS GONE FROM IT. Early access was withdrawn across the site
 * at Phase 7, so `siteConfig.links.earlyAccess` no longer exists and the
 * source's ask goes with it. What is left of the source line is kept below as
 * supporting text, and there is no waitlist, no beta and no launch date to put
 * in its place.
 *
 * ONE DELIBERATE DIVERGENCE REMAINS, ON THE RECORD.
 *
 *   The heading is authored. Removing the verb from the source line leaves
 *     "built in India, for Indian law", which is kept below as supporting text
 *     rather than lost - so the section still needs a heading, and the source
 *     supplies none. "Specified, not shipped." is the status one last time, in
 *     the site's own status vocabulary, at the point where a reader has finished
 *     the argument. An owner may replace it; it must not be replaced with
 *     anything that reads as shipped.
 *
 * THE SITE'S FIRST CONVERSION ACTION IS A `mailto:`. §4.4 names the primary CTA
 * "Tell us about the corpus" pointing at `/contact`, but `/contact` is proposed
 * in §3.2 and does not exist, and linking a dead route is worse than not linking
 * one. The address is `siteConfig.links.email`, the label names what the click
 * actually does, and the address is printed as text underneath so it is usable
 * without a mail client. When `/contact` ships, the destination moves there and
 * the label becomes §4.4's.
 *
 * There is no status chip in this section and no second `StatusChip` on the
 * page. The heading here says in words what the chip in the hero says as a
 * label, and pairing the chip with a heading that already reads "Specified"
 * would have a screen reader announce the same word twice in a row.
 */
export const lawmanClosingCta = {
  heading: "Specified, not shipped.",
  supporting: "Built in India, for Indian law.",
  body: "Lawman is a specification, not a service you can call today. If you hold a body of authoritative material that has to be reasoned over this way, we would like to hear about it: what the corpus is, where it is allowed to live, and who signs off on the output.",
  ctaLabel: "Email us about the corpus",
  ctaHref: `mailto:${siteConfig.links.email}`,
  microCopy: `That opens a mail client addressed to ${siteConfig.links.email}.`,
};
