/**
 * Lawman page content - `docs/copy/lawman-summary.md` Part 1, hand-transcribed
 * the same way `content/home.ts`, `content/about.ts` and `content/tnt.ts`
 * transcribe their sources. Part 2 is the homepage block and is already built in
 * `content/home.ts`; nothing from it is duplicated here.
 *
 * The copy document is a brief, not page content. The `**Headline:**` /
 * `**Subheadline:**` / `**Primary CTA:**` field labels and the trailing copy
 * notes are stripped on the way in. There is deliberately no markdown renderer -
 * explicit transcription is what keeps the apparatus off the page.
 *
 * FOUR RULES BIND EVERY STRING BELOW.
 *
 *   1. Nothing may read as shipped. The source opens with a status note -
 *      "Lawman is fully specified but not yet built. All copy below describes
 *      the intended product." The copy underneath is written in the present
 *      indicative ("Lawman does not answer from memory", "Citations are
 *      verified") and that is left alone: it describes design intent, and
 *      rewriting it into the conditional would soften abstention, which the
 *      source's own notes forbid. The status carries the distinction instead,
 *      and it renders twice - in the hero beside the chip, and again at the
 *      close. `/about` C7 words the same state as "Fully specified, and not yet
 *      built"; this page uses those words.
 *
 *   2. No numbers. The source contains zero figures in its body copy,
 *      deliberately - its own copy notes say accuracy figures, benchmark scores,
 *      model names and stack details "are deliberately absent - the numbers do
 *      not exist yet". So there is nothing here to hold and nothing to invent,
 *      and §2b.3 bars inventing any.
 *
 *   3. Research and drafting, never the word §2b.8 bars. That word appears
 *      exactly once in this file, inside the sentence that disclaims it, and it
 *      must stay that way - `grep -in` over this file returning one hit is the
 *      Phase 5 acceptance gate. Lawman researches, explains and drafts; a
 *      qualified human reviews and signs.
 *
 *   4. Infrastructure framing. Lawman is the reasoning layer of PunkRaven's
 *      stack (`/about` C5 names it exactly that), not a legal service and not a
 *      standalone legal product. PunkRaven builds software.
 *
 * No social proof of any kind appears below, and none may be added: there are no
 * customers (§2b.2). The hero carries no proof strip for that reason - the
 * source supplies none, and the four claims on `/tnt`'s hero come from its own
 * document rather than from a house pattern.
 */

import type { ProductStatus } from "@/components/status-chip";

/* Types ---------------------------------------------------------------------- */

export interface LawmanHeroContent {
  eyebrow: string;
  headline: string;
  primaryCta: string;
  status: ProductStatus;
  /** What "specified" means concretely, next to the chip. */
  statusLine: string;
  subheadline: string;
}

/**
 * A paragraph with one emphasised clause inside it. The source bolds exactly one
 * sentence in the whole of Part 1's running prose - the constraint the entire
 * system is designed around - and dropping that emphasis loses the hinge of the
 * section. Modelled as three fields rather than as an HTML string so nothing on
 * this page ever needs `dangerouslySetInnerHTML`.
 */
export interface EmphasisParagraph {
  after: string;
  before: string;
  emphasis: string;
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

/* Page metadata -------------------------------------------------------------- */

/**
 * AUTHORED, NOT TRANSCRIBED. `lawman-summary.md` is the only one of the four
 * source documents with no page-metadata table - it has no page title, no meta
 * description and no OG fields anywhere in it. The two strings below were
 * written from the page's own copy, in the house voice, and an owner should
 * approve or replace them rather than assume they came from the brief.
 *
 * The title is built on the hero headline; the description compresses the three
 * things the page actually claims - grounded, verified, abstains - and closes on
 * the status, so the snippet cannot read as shipped capability either.
 *
 * No `ogTitle` and no `ogDescription`: there is no source for them, and
 * `layouts/head.tsx` falls the OG pair back to the document title and meta
 * description on its own, exactly as it does for `/about`.
 */
export const lawmanMeta = {
  title: "Lawman - Indian law, answered with the source attached",
  description:
    "Lawman is an AI system built for Indian law. It grounds every legal claim in a real retrieved source, checks the reference before you see it, and says when it cannot verify one. Fully specified, and not yet built.",
};

/* Hero ----------------------------------------------------------------------- */

export const lawmanHero: LawmanHeroContent = {
  eyebrow: "Lawman",
  headline: "Indian law, answered with the source attached.",
  subheadline:
    "Lawman is an AI system built for one thing - Indian law. It grounds every legal claim in a real, retrieved source. When it cannot verify a claim, it says so instead of inventing one.",
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
  primaryCta: "Request early access",
};

/* What is Lawman ------------------------------------------------------------- */

export const whatLawmanIs = {
  heading: "What is Lawman",
  opening:
    "Lawman is an AI legal intelligence system specialised in Indian law - statutes, case law, court procedure, and the rules and circulars that change week to week.",
  constraint: {
    before:
      "It is not a general-purpose chatbot pointed at legal questions. It is a system designed around a single constraint: ",
    emphasis:
      "a legal answer is only worth having if you can trace it back to the authority it came from.",
    after:
      " Everything in Lawman follows from that - how it is trained, how it retrieves, how it checks itself, and what it does when it is unsure.",
  } satisfies EmphasisParagraph,
  closing:
    "Lawman researches, explains, and drafts. It works in Indian languages, by voice or text. It reads the documents legal work actually arrives in. And it is built to run on infrastructure you control, so confidential material never has to leave your hands.",
};

/* Why Lawman is required ----------------------------------------------------- */

/**
 * Five failure modes of the alternative, each named before any fix is offered.
 * They are the argument for the section below them, so the order is the source's
 * and the last one - "it does not know when to stop" - stays last: it is the one
 * the whole product is built around.
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
      lead: "Built in Indian languages.",
      body: "Questions asked in an Indian language are researched against the same material and answered in that language, by voice or in writing.",
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
 * The section the page exists for. Spec §3.3: "A company publishing the cases
 * where its product is the wrong tool is the most persuasive thing on that page.
 * Do not soften or shorten the 'Do not use' column."
 *
 * THE TWO COLUMNS ARE PEERS, AND THE DATA SHAPE IS PART OF HOW THAT IS ENFORCED.
 * Both are plain `ComparisonColumnContent` with a heading and a list of whole
 * sentences - there is no `tone`, no `variant`, no `emphasis` field, and nothing
 * else that could carry a difference from here into the markup. The Phase 5
 * acceptance gate is that the second column renders at equal visual weight to
 * the first, and the cheapest way to guarantee that is to leave no channel
 * through which they could diverge. Adding one to this interface would open it.
 *
 * The `heading` on the second column is authored only to the extent of dropping
 * the source's trailing colon, which belongs to a copy document rather than to a
 * page.
 *
 * The first item in the second column is the one sentence on this page that uses
 * the word §2b.8 bars, and it uses it to disclaim it. It must survive verbatim,
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
      heading: "Use Lawman when",
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
      heading: "Do not use Lawman when",
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
 * TWO DELIBERATE DIVERGENCES FROM IT, BOTH ON THE RECORD.
 *
 *   The label is "Request early access", not "Get early access". §2b.7 makes
 *     "Request early access" the only primary CTA on the site, the same document
 *     supplies "Request early access" in this page's own hero, and `/`, `/about`
 *     and `/tnt` all use it. Two labels for one ask on one page is a worse
 *     outcome than diverging from a line the source itself contradicts eight
 *     screens earlier.
 *
 *   The heading is authored. Removing the verb from the source line leaves
 *     "built in India, for Indian law", which is kept below as supporting text
 *     rather than lost - so the section still needs a heading, and the source
 *     supplies none. "Specified, not shipped." is the status one last time, in
 *     the site's own status vocabulary, at the point where a reader is deciding
 *     whether to ask for access. An owner may replace it; it should not be
 *     replaced with anything that reads as shipped.
 *
 * There is no status chip in this section and no second `StatusChip` on the
 * page. The heading here says in words what the chip in the hero says as a
 * label, and pairing the chip with a heading that already reads "Specified"
 * would have a screen reader announce the same word twice in a row.
 */
export const lawmanClosingCta = {
  heading: "Specified, not shipped.",
  primaryCta: "Request early access",
  supporting: "Built in India, for Indian law.",
};
