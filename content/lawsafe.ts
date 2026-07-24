/**
 * LawSafe page content - adapted from `docs/copy/lawsafe-product-vision.md` via
 * `docs/copy/lawsafe-page-copy.md`, then rewritten against
 * `docs/website-content.md` section 4.5, with the SEO strings from 6.2 and 6.3,
 * the question-shaped headings and extractable answers from 7.1 and 7.2, and the
 * outbound contextual links from 8.2.
 *
 * THIS PAGE IS ADAPTED, NOT TRANSCRIBED, AND THAT DISTINCTION IS THE PHASE.
 * The other three pages hand-transcribe a copy document. The LawSafe source is a
 * founder's vision document written for the team and for early stakeholders: it
 * is long, first-person-plural, and carries material that must not go on a
 * public page. Spec §3.4 names the six sections to build from, names what to
 * exclude, and says to convert first-person aspiration into second-person
 * utility. Phase 6 additionally requires the adapted copy to be drafted and
 * reviewed before it is built, which is what `lawsafe-page-copy.md` is.
 *
 * The register below is third person, matching `/lawman`: "LawSafe explains and
 * connects", never "we envision an India where".
 *
 * WHAT IS EXCLUDED, AND ON WHOSE AUTHORITY.
 *
 *   §0 A Note on the Name, in full. The internal beta codename it introduces
 *     must never appear on a public surface - §3.4 and the company copy's Part E
 *     both say so, and the Phase 6 gate is that it is absent. It is not written
 *     out anywhere in this repository outside the source document itself, this
 *     line included. Note that deleting §0 does NOT remove it from the source:
 *     it also sits in that document's top metadata line and in its closing
 *     italic, so the check is a case-insensitive grep for the codename over the
 *     whole tree, not a section delete.
 *
 *   §7 Strategic Differentiation, in full. It names competitors, discusses
 *     moats, and quotes consultation pricing. Investor material.
 *
 *   The three general-purpose models and two legal research products named in
 *     §6's first principle, with the hallucination rates attached to them. These
 *     survive the §7 cut because they sit inside a section that IS included - a
 *     section-level exclusion misses them. §3.4 bars naming competitors, and the
 *     company copy's Part D marks those figures "verify the study and figures
 *     directly before publishing". Principle 1 below keeps the argument and
 *     drops both. `/about` C4 already carries the same argument de-numbered.
 *
 *   Every market-sizing figure. §3.4 excludes them regardless of verification.
 *
 *   §4's scope list - forty-plus practice areas in one sentence - reduced to the
 *     six §3.4 prescribes. All six are source-backed.
 *
 *   The Legal Intelligence Engine, the Case & Knowledge Store, the Backend &
 *     Records System and the Admin Dashboard. §3.4 says product surfaces only,
 *     no architecture detail. The engine is cut for a second reason as well: on
 *     this site LAWMAN is the reasoning system, and the company copy's Part E
 *     names Lawman and LawSafe as the pair readers most easily confuse. Giving
 *     LawSafe an engine of its own would undo the stack.
 *
 * EVERY STATISTIC IN THE SOURCE IS HELD. Decided at review, and consistent with
 * handover decision 5, with `/tnt` and with `/about`: no owner has been named to
 * verify them. Spec §3.4 asks for §2's statistics with years attached and the
 * Phase 6 gate reads "every statistic carries a year"; holding all of them
 * satisfies that gate vacuously, and the alternative - publishing the two
 * government-sourced figures with years and attribution inline - was offered at
 * review and declined. The full list of held figures, with the source the vision
 * document gives for each, is in `docs/copy/lawsafe-page-copy.md`. Nothing below
 * contains a number, and §2b.3 bars inventing one. The count of scheduled
 * languages is not a held figure - 2.3 requires it written exactly as "22
 * scheduled Indian languages".
 *
 * The highest-risk single string in the source is the Tele-Law pre-litigation
 * session count: it is a government programme's figure, and on a LawSafe page it
 * reads as LawSafe's own offering. Holding it removes that risk entirely. If it
 * is ever published it has to be unmistakably attributed.
 *
 * THE WORD §2b.8 BARS APPEARS TWICE BELOW AND ONLY INSIDE THE BOUNDARY BLOCK -
 * once in the question-shaped heading 7.1 asks for, and once in the sentence
 * directly beneath it that disclaims it. `content/lawman.ts` holds the same
 * discipline. LawSafe explains and connects; a qualified advocate advises. The
 * check is `grep -in advice content/lawsafe.ts`: exactly two of its hits are
 * copy rather than comment, and both are the `boundaryHeading` and `boundary`
 * of `lawsafeHero`.
 *
 * NOTHING HERE MAY READ AS SHIPPED. LawSafe is `In design` - the status §2b.6
 * assigns it, carried by the chip in the hero and again in words at the close.
 * The advocate panel is the sharpest case: verification is a design commitment,
 * and the company copy's Part D says explicitly "do not imply a live verified
 * panel exists". `whatItDoes` states that it does not.
 *
 * No social proof of any kind, and none may be added - there are no users and no
 * advocates (§2b.2).
 */

import type { ProductStatus } from "@/components/status-chip";

import { siteConfig } from "@/config/site";

/* Types ---------------------------------------------------------------------- */

export interface LawsafeHeroContent {
  /** The not-advice boundary, stated before anything else on the page. */
  boundary: string;
  /** 7.1's question-shaped heading, directly above the boundary. */
  boundaryHeading: string;
  eyebrow: string;
  headline: string;
  status: ProductStatus;
  /** What "in design" means concretely, next to the chip. */
  statusLine: string;
  /** 7.2's extractable answer, published as the hero's supporting paragraph. */
  whatIsAnswer: string;
  /** 7.1's question-shaped heading, directly above that answer. */
  whatIsHeading: string;
}

/**
 * A run of body text. A run carrying an `href` renders as an internal link, so
 * a body can hold the outbound contextual links 8.2 asks for without this file
 * becoming JSX. Only `whatItDoes`'s "Where it sits" needs it.
 */
export interface BodySegment {
  href?: string;
  text: string;
}

/** A bold lead-in and the explanation that follows it - the house voice. */
export interface LeadIn {
  body: string | BodySegment[];
  /**
   * A qualification that has to carry weight rather than sit in the muted body
   * colour. Only `whatItDoes`'s shortlist uses it, and only to say that no
   * verified panel exists yet.
   */
  caveat?: string;
  lead: string;
}

export interface AudienceCard {
  body: string;
  segment: string;
}

/* Page metadata -------------------------------------------------------------- */

/**
 * The title is 6.2's approved string, kept. The description is 6.2's
 * replacement at 156 characters - the previous one, written here before 6.2
 * landed, ran 214 and truncated in a search result. Both close on the stage, so
 * a search snippet cannot read as shipped either.
 *
 * No `ogTitle` and no `ogDescription`: there is no source for them, and
 * `layouts/head.tsx` falls the OG pair back to the document title and meta
 * description on its own, exactly as it does for `/about` and `/lawman`.
 */
export const lawsafeMeta = {
  title: "LawSafe - describe what happened, understand where you stand",
  description:
    "LawSafe lets any Indian describe a legal problem in their own language and understand where they stand, then reach a Bar Council-verified advocate. In design.",
};

/* Hero - vision §1 ----------------------------------------------------------- */

/**
 * The vision statement is "To make understanding your legal rights as easy as
 * sending a message - and acting on them as simple as booking a ride." The
 * second half is cut: booking a ride is a transaction metaphor, and the whole
 * positioning of this product is understanding first and transaction second.
 * The first half converts to the reader's own rights rather than the company's
 * ambition.
 *
 * THE EYEBROW IS BARE "LawSafe", AND THAT IS CONFLICT 1 (10.4). It used to read
 * "LawSafe - built on T&T and Lawman". That dependency is an inference which
 * `punkraven-company-copy` Part D flags as unverified and on which Q1 is open;
 * 4.5 flags the eyebrow that asserts it and 5.4 says treat it as provisional. So
 * the eyebrow names the product and nothing else, and `whatItDoes`'s "Where it
 * sits" names T&T and Lawman as siblings rather than as layers LawSafe runs on.
 * If Q1 resolves in the affirmative, the eyebrow and that block change back
 * together. Do not restore "built on" to either one alone.
 *
 * The two question-shaped H2s are 7.1's, and both stay in the hero. 7.1 calls
 * "Does LawSafe give legal advice?" the single most important extractable
 * answer on the site, and `whatIsAnswer` is 7.2's 50-word answer to the first.
 * The subheadline that used to sit here - the LawSafe block from the company
 * copy's B4 - is replaced by that answer, so the paragraph a search engine
 * extracts and the paragraph a reader sees are the same paragraph.
 *
 * The boundary line sits in the hero rather than at the foot of the page. This
 * is the site's highest-exposure page - a citizen-facing legal product - and
 * §2b.8 is a legal-exposure rule rather than a stylistic one, so the statement
 * that LawSafe is not counsel appears before a reader has scrolled once. It is
 * also the human-review requirement the definition of done asks for on both
 * legal product pages.
 *
 * 7.2's version of the boundary closes on a sentence naming the category of
 * business PunkRaven is not. That sentence is dropped: 2.3 permits that phrase
 * in the footer disclaimer and in `/about` C6 and nowhere else, and 10.5 greps
 * for it. The footer renders on this route, so the statement is still made.
 */
export const lawsafeHero: LawsafeHeroContent = {
  eyebrow: "LawSafe",
  headline: "Understanding your rights should be as easy as sending a message.",
  whatIsHeading: "What is LawSafe?",
  whatIsAnswer:
    "LawSafe is PunkRaven's first application: a chat-first way for any Indian to describe a legal problem in their own language and get a grounded, cited explanation of where they stand, then reach a Bar Council-verified advocate when a human is genuinely needed. LawSafe is in design.",
  status: "in-design",
  statusLine:
    "What exists today is the product vision and its scope, not a build.",
  boundaryHeading: "Does LawSafe give legal advice?",
  boundary:
    "No. LawSafe explains and connects. It does not give legal advice, does not represent anyone, and does not decide anything. Where a matter needs professional judgement, a qualified advocate provides it.",
};

/* Why LawSafe exists - vision §2 --------------------------------------------- */

/**
 * The source section is built on eleven statistics. All of them are held, so
 * this is the section that changes most in adaptation: it argues from the shape
 * of the problem rather than from its measurements.
 *
 * The argument survives the de-numbering because it was never really a
 * quantitative one. The source's own hinge sentence is "the backlog is only the
 * visible symptom" - the point is the people who never reach a court at all, and
 * that is a structural claim. The three examples in the third paragraph are the
 * source's own and do the work the numbers would have done: they are recognisable
 * rather than large.
 *
 * There is no stat row and no chart in the renderer for the same reason: a
 * figure-shaped layout with no figures in it advertises the absence.
 *
 * The closing line is the source's founding conviction, kept close to verbatim.
 * It is the one sentence in the section that should carry weight on the page.
 */
export const whyLawsafeExists = {
  heading:
    "India does not have a shortage of law. It has a shortage of access to it.",
  paragraphs: [
    "The courts are backlogged, and that backlog is the visible symptom. The deeper problem is that most people who are wronged never reach the courthouse door in the first place, and often should not have to.",
    "They do not know their rights. They do not know free legal aid exists. They are intimidated by lawyers and by cost, and stuck on the question of whether their problem is even a legal one.",
    "So the wrong gets absorbed. A cheque that bounced. A deposit a landlord will not return. A fraudulent transaction, a denied insurance claim, harassment online. The cost and friction of finding out what you could do exceeds the wrong itself, so nobody finds out.",
  ],
  closing:
    "If a person can describe their problem, they deserve to understand their rights - immediately, affordably, and in their own words.",
};

/* Who it is for - vision §3 -------------------------------------------------- */

/**
 * Three audiences, in the source's own order, and the third is the one to keep.
 * A consumer legal product that also says it serves lawyers is making a claim
 * about how it makes money, and the source is explicit that advocates are served
 * rather than sold to: the platform delivers matched work, not advertising. 4.5
 * says the third card is not decoration - do not demote it or fold it into the
 * second.
 *
 * The advocate card drops the source's "for the verified advocate, we are a
 * source of dignified, relevant work" - it is the one line in the section
 * written for a stakeholder audience rather than for the person reading it. It
 * also reads "is designed to serve them" rather than "serves them", because
 * there is no platform yet.
 */
export const whoItIsFor = {
  heading: "Who it is for",
  items: [
    {
      segment: "The citizen with an ordinary legal problem",
      body: "The person the system fails most is not the general counsel with a panel of firms. It is the individual with a genuine legal need and nowhere obvious to turn: a rental agreement, a cheque bounce, a consumer complaint, a matrimonial matter, a will, an incident of cyber fraud. Every income band, and every one of India's languages.",
    },
    {
      /**
       * CONFLICT 3 (10.4). This card used to name a company incorporated, IP
       * registered and compliance handled. Those are service categories the
       * company has not committed to, named on the highest-exposure page on the
       * site: `lawsafe-product-vision.md` §3 lists them as served needs, the
       * company copy's Part E bars naming domains the company has not committed
       * to, and 4.5 carries the watch item. The card now describes the shape of
       * the need and names none of the three. They appear on this page only in
       * this comment, explaining why they are absent. Keep it that way.
       */
      segment: "The small business, founder and independent professional",
      body: "The MSME owner, the D2C founder, the freelancer, the artist. They sign agreements they have not had vetted, absorb dues they are owed, and carry obligations nobody has explained to them. Traditional firms are too expensive and too slow for work of that size.",
    },
    {
      segment: "The advocate",
      body: "India's legal profession is bimodal: a small elite at the top, and a very large number of junior and small-town advocates who struggle to find clients and to whom the profession's advertising restrictions offer few ethical routes to be discovered. LawSafe is designed to serve them by delivering correctly matched, context-rich work - the person arrives already understanding their problem, with a structured summary in hand - so the advocate spends time on law rather than on triage.",
    },
  ] satisfies AudienceCard[],
};

/* What it does - vision §4 --------------------------------------------------- */

/**
 * Product surfaces only (§3.4). Of the five surfaces the source lists, one is a
 * surface a person touches; the rest are architecture and are cut. What replaces
 * them is the site's own two-tier framing from §2a.2, and the reason this page
 * can be on a technology company's site without re-categorising it.
 *
 * "What the likely timelines and costs look like" was in the source's list of
 * what the app returns and was CUT AT REVIEW. It was the closest thing on the
 * page to a promise about an outcome, and the product is in design. 4.5 says it
 * does not come back. The answer structure is now what the law says, which
 * provision applies, the realistic options, and what to do next.
 *
 * THE SHORTLIST'S CAVEAT IS CONFLICT 2 (10.4) AND IS NEITHER OPTIONAL NOR
 * SOFTENING. `lawsafe-product-vision.md` line 88 asserts in the present tense
 * that every lawyer on the platform is Bar Council-verified, and this block used
 * to repeat it as "Every advocate is Bar Council-verified before they appear".
 * There is no platform. 2.2's framing table allows "is designed to" and bans any
 * implication that a verified panel exists today; the company copy's Part D says
 * of advocate verification "Safe as intent; do not imply a live verified panel
 * exists"; and 4.5 makes the correcting sentence mandatory. So the body states
 * verification as a precondition of the design and the caveat immediately after
 * it says no panel exists. The two must stay adjacent and in that order - the
 * body alone is a present-tense claim about a roster that does not exist, which
 * is the single most damaging false statement available on this site.
 *
 * "Where it sits" is CONFLICT 1 (10.4). 4.5 calls this block "what it is built
 * on"; that label is itself the unverified dependency claim, so the block keeps
 * its job and loses the assertion. T&T and Lawman are named and linked as
 * PunkRaven's two pieces of infrastructure - siblings, the fallback framing 8.2
 * prescribes - rather than as layers LawSafe runs on. The two outbound links 8.2
 * wants from this page are still here; only the dependency claim is withheld.
 * The last sentence is 2.8's required distinction between the two names readers
 * most easily confuse.
 */
export const whatItDoes = {
  heading:
    "One promise: grounded understanding first, a verified human when you need one.",
  items: [
    {
      lead: "The app",
      body: "Chat-first, and deliberately as familiar as any assistant the person already uses. No forms, no legalese, no intimidation. A person describes the situation in natural language, typed or spoken, and gets back a structured answer: what the law says, which provision applies, what the realistic options are, and what to do next.",
    },
    {
      lead: "The shortlist",
      body: "When the matter needs a human, the app is designed to surface advocates who specialise in precisely that issue, with their credentials shown. Verification against the Bar Council roll is designed as a precondition of appearing at all, not a badge added afterwards.",
      caveat:
        "No panel exists yet - verification is a design commitment, not a live roster.",
    },
    {
      lead: "Where it sits",
      body: [
        {
          text: "LawSafe is the application layer. Alongside it PunkRaven builds two pieces of infrastructure: ",
        },
        { href: "/tnt", text: "the speech layer" },
        { text: ", which covers the 22 scheduled Indian languages, and " },
        { href: "/lawman", text: "the reasoning layer" },
        {
          text: ", which grounds every claim in a retrieved source and attaches the source to it. Lawman reasons; LawSafe is what a person opens.",
        },
      ],
    },
    {
      lead: "Scope, deliberately drawn",
      body: "Law is vast and trust is fragile. The focus at first is the matters that ordinary people and small businesses actually meet: rental agreements, cheque bounce, consumer complaints, wrongful termination, succession, cyber fraud. Better to be exceptional across the problems that touch the most lives than mediocre across all of law.",
    },
  ] satisfies LeadIn[],
};

/* Principles - vision §6 ----------------------------------------------------- */

/**
 * The source's seven numbered principles become six plus a separate list of what
 * the product will not do, because the seventh is not a principle in the same
 * grammatical sense - it is four refusals, and they read as refusals.
 *
 * EVERY PRINCIPLE IS WORDED "IS DESIGNED TO", NOT AS PRESENT-TENSE CAPABILITY,
 * which is what 2.2's framing table requires of a product in design. Two of them
 * used to break that rule and no longer do: principle 4 claimed LawSafe
 * "inherits T&T's coverage", which is conflict 1's dependency wearing different
 * clothes, and principle 6 claimed "every advocate on the platform is a real,
 * Bar Council-verified advocate", which is conflict 2 on a platform that does
 * not exist. Do not revert either.
 *
 * Principle 1 is where the competitor names and the hallucination rates lived.
 * Both are gone; the rule they justified is not. Principle 2 is the human-review
 * requirement in the definition of done, stated as a design posture rather than
 * as a disclaimer.
 *
 * Principle 4 is the one place where a number would be permitted - "22 scheduled
 * Indian languages" is exact, sourced through T&T and required by the definition
 * of done to be written exactly that way, never "22+" and never "all Indian
 * languages". The source's own 98% Indic-language figure is held with the rest.
 *
 * SUPACE, SUVAS, Kerala's court AI policy, the Madras High Court's decision in
 * PN Vignesh and the March 2025 BCI directives are all cut as condensation
 * rather than as risk. Bar Council of India Rule 36 and the Digital Personal
 * Data Protection Act, 2023 are kept: they are the two instruments the product's
 * constraints actually derive from, and naming them is what makes principles 3
 * and 5 checkable rather than decorative.
 *
 * No amber anywhere in this section, exactly as `/about` C6 has none. These are
 * commitments, not uncertain claims, and §5.2 gives the amber one meaning.
 */
export const lawsafePrinciples = {
  northStar: {
    heading: "Trust per interaction.",
    body: "Not users, not sessions, not revenue. The question under every decision is whether an interaction left a person more accurately informed than before. Growth that erodes trust is not growth.",
  },
  items: [
    {
      lead: "Grounded, or silent.",
      body: "LawSafe is designed to answer from current, citable Indian law or not to answer at all. It would rather say a human lawyer is needed than invent a confident falsehood. Every substantive answer carries its legal basis, so it can be checked.",
    },
    {
      lead: "Assistance, never a verdict.",
      body: "It informs and connects. It does not adjudicate, and it does not replace the judgement of a qualified advocate. Every experience is designed to make plain where information ends and professional representation begins.",
    },
    {
      lead: "A neutral bridge, never a tout.",
      body: "LawSafe is designed to operate within Bar Council of India norms, including Rule 36. Advocates cannot advertise, bid, or buy a ranking. Matching is on genuine specialisation and verified credentials, or it does not happen.",
    },
    {
      lead: "Vernacular-first.",
      body: "English is a barrier, not a bridge, for most of the people this is built for. LawSafe is designed for the 22 scheduled Indian languages, with the quality tier of each stated rather than hidden, and so that a first-time reader feels respected.",
    },
    {
      lead: "Privacy is not a setting.",
      body: "People will describe the most vulnerable facts of their lives. Every word is confidential by default, and the system is designed for the letter and the spirit of the Digital Personal Data Protection Act, 2023.",
    },
    {
      lead: "Verified humans at the end of the line.",
      body: "LawSafe is designed so that the only human it hands a person to is a real advocate, verified against the Bar Council roll. No anonymous legal influencers, and nobody unqualified at the other end. When a person is handed to a human, that human is credentialed and accountable.",
    },
  ] satisfies LeadIn[],
  willNotDo: {
    heading: "What LawSafe will not do",
    items: [
      "Give a definitive legal opinion dressed as certainty.",
      "Draft or file anything for use in court without a qualified advocate in the loop.",
      "Sell user data, or monetise attention.",
      "Let commercial pressure override the grounded-or-silent rule.",
    ],
  },
};

/* Closing - vision §5 -------------------------------------------------------- */

/**
 * The source runs three horizons - five year, ten year, generational - across
 * five paragraphs and four more held figures. §3.4 says heavily condensed, so
 * this is one paragraph and no horizon labels: a five-year plan on a page for a
 * product in design invites a reader to ask what year one looks like, and the
 * honest answer is the status line directly under it.
 *
 * The World Justice Project figures, the eCourts Phase III budget and the NITI
 * Aayog ODR programme are cut with the rest of the numbers.
 *
 * THE CTA IS A `mailto:`, NOT A FORM AND NOT A WAITING LIST. 4.5 names
 * `/contact` as the proposed primary CTA and 8.2 gives the anchor "Tell us what
 * you are building". `/contact` is Proposed and does not exist (3.2), so the
 * button is built from `siteConfig.links.email` and labelled for what actually
 * happens, with the micro-copy below it saying so in words. It is not a signup,
 * not a lawyer-onboarding flow, not a citizen waiting list and not an offer of
 * legal help - 4.5 forbids the last of those outright. There is no
 * `earlyAccess` constant to point it at either; see `config/site.ts`.
 *
 * The status is repeated here in words rather than as a second `StatusChip`.
 * `/lawman` does the same and for the same reason: the chip in the hero and a
 * chip here would have a screen reader announce the status twice on one page. It
 * comes last, after the button, so the page ends on the stage rather than on the
 * call to action.
 */
export const lawsafeClosingCta = {
  heading: "The measure is not downloads.",
  supporting:
    "It is whether the relationship between people and their own legal system changes. Checking a legal position before signing, complaining, or giving up should become a reflex - the way people check a map before a journey. Fewer avoidable disputes should reach the courts, because the confusion behind them was resolved upstream. If more people can actually exercise rights they already have on paper, that is the result worth having.",
  cta: {
    ariaLabel: `Email ${siteConfig.links.email} about what you are building`,
    href: `mailto:${siteConfig.links.email}`,
    label: "Email us what you are building",
    note: `It opens a mail client addressed to ${siteConfig.links.email}.`,
  },
  statusLine:
    "LawSafe is in design. What exists today is the product vision and its scope.",
};
