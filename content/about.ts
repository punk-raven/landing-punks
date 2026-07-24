import type { ProductStatus } from "@/components/status-chip";

/**
 * About page content - `docs/website-content.md` section 4.2, blocks C0 to C8,
 * hand-transcribed the same way `content/home.ts` transcribes the homepage.
 *
 * The content document is a brief, not page content. Everything that names a
 * slot rather than filling it has been stripped on the way in: `*Source: ...*`
 * attribution lines, the `**Eyebrow**` / `**Headline**` / `**Section heading**`
 * / `**Body**` / `**CTA**` field labels, the `*Optional section*` marker on C8,
 * and the claim-status table and copy notes. There is deliberately no markdown
 * renderer - explicit transcription is what keeps the apparatus off the page.
 *
 * Four rules bind every string below.
 *
 *   Section 2.1, "PunkRaven is a technology company" - the rule that overrides
 *     the others. A reader who finishes this page must not think this is a law
 *     firm, a legal marketplace or a legal-tech company. Law appears only as the
 *     hardest available test of a grounded system - authoritative sources, exact
 *     language, expensive failure - never as what the company is for.
 *
 *   Order is argument - T&T, then Lawman, then LawSafe, in C5 and in C7.
 *     Infrastructure before application. Leading with LawSafe re-categorises the
 *     company in the reader's head, so do not sort or reorder these arrays.
 *
 *   Section 2.3, no figures - the company page makes structural claims, not
 *     measured ones. Two passages in the source are written with figures and are
 *     de-numbered here; each carries a comment at the point of the change saying
 *     what was removed and why. Every held figure is gated on a verification
 *     owner who has not been named.
 *
 *   Section 2.3 also fixes the single permitted figure: "22 scheduled
 *     languages", never "22+ languages". The other digits in this file are the
 *     2024 statute year in C3, which is a fact about the corpus rather than a
 *     metric.
 *
 * Section 2.5 caps a sentence at 40 words and a paragraph at 5 sentences, which
 * is why several passages below are split across more array entries than the
 * source has paragraphs. Do not re-join them.
 */

export interface AboutHeroContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
}

/** C3 - a definition: the term, then what we mean by it concretely. */
export interface Definition {
  body: string;
  term: string;
}

/** C5 - one layer of the stack, with its status label. */
export interface BuildingBlock {
  body: string[];
  /** The product page this block's role links out to. */
  href: string;
  name: string;
  /** The block's job, and the anchor text of its contextual link. */
  role: string;
  status: ProductStatus;
}

/** C6 - a commitment: what we will not do, then why. */
export interface Commitment {
  body: string;
  heading: string;
}

/** C7 - where one project actually stands today. */
export interface StatusLine {
  detail: string;
  project: string;
  status: ProductStatus;
}

/** C8 - half the name, and the disposition it stands for. */
export interface NameGloss {
  body: string;
  term: string;
}

/* C0. Page metadata --------------------------------------------------------- */

/**
 * Sections 6.2 and 6.3. Title 44 chars, description 148. Both are marked "Keep"
 * in the SEO table, so neither string moves without a reason recorded there. The
 * C1 headline below is the page's H1, per section 6.3.
 *
 * There is no `og:title` and no OG image in the source table, so neither is
 * invented here: `layouts/head.tsx` falls the OG pair back to the document title
 * and meta description on its own.
 */
export const aboutMeta = {
  title: "About PunkRaven - why we build our own layers",
  description:
    "PunkRaven is a technology company building indigenous AI infrastructure for India. What indigenous means to us, how we build, and what we will not do.",
};

/* C1. About hero ------------------------------------------------------------ */

export const aboutHero: AboutHeroContent = {
  eyebrow: "About PunkRaven",
  headline: "We build the layers India keeps importing.",
  subheadline:
    "We build AI infrastructure for Indian languages and high-stakes domains: a speech layer across all 22 scheduled Indian languages, a reasoning layer that grounds every claim in a real retrieved source, and one application built on both to prove they work. Both layers are built to run on hardware you control, and to say plainly when they cannot verify what they are about to tell you.",
};

/* C2. Why we exist ---------------------------------------------------------- */

export const whyWeExist = {
  heading: "Rented intelligence is not the same as having any.",
  /**
   * `body[0]` is the section lead and is set at subtitle size; the rest are body
   * paragraphs. The section is one argument in three moves - the country has the
   * demand, it does not have the stack, we build the missing part.
   */
  body: [
    /**
     * De-numbered per section 2.3. The source opens on an internet-user count
     * and an Indic-consumption percentage. Both are held pending a verification
     * owner, and section 2.3 bars figures from this page regardless. Both are
     * replaced with the structural claim they were evidence for - the audience
     * is large and it is not reading in English - which is what the paragraph
     * actually argues.
     */
    "India is online at enormous scale, and the great majority of its internet users read, watch and search in an Indic language rather than in English.",
    "The country runs on more languages than almost anywhere on earth. It generates document and audio volume at a scale few countries match. It has a domestic software industry with the talent to work on any of it.",
    "What it does not have is a stack of its own. Almost every Indian product that needs to hear, read or reason reaches for a foreign API. With it come that vendor's language priorities, that vendor's pricing power, and that vendor's willingness to sound certain about things it has no basis for.",
    "The gap is not ambition or talent. It is that the layers underneath were built for somewhere else. The part in the middle - the part that decides whether the thing works in Marathi, or on a body of law that changed last year - is nobody's product, so it becomes everybody's bug.",
    "We build that part. It is slower, it is harder to fund, and it is the only version of this that ends with India owning something.",
  ],
};

/* C3. What indigenous means here -------------------------------------------- */

export const indigenous = {
  heading: "Indigenous is a build decision, not a flag on a foreign API.",
  body: "The word gets used loosely. Here is what we mean by it, concretely, in things you can check.",
  /**
   * Section 7.1 asks for a question-shaped heading above the answer, additively:
   * the declarative section heading above stays, the question is added beneath
   * it, and `answer` is written self-contained so an extractor lifting that one
   * paragraph alone still gets a complete answer. The two belong together - the
   * question is not a heading for the definition list below it.
   */
  question: 'What does "indigenous AI" mean?',
  answer:
    "Indigenous, here, is a build decision rather than a label. It means systems built for the language rather than translated into it, a domain learned properly rather than approximated, open weights on a deployment you own, and economics that stay in the country. Sovereignty is a property of the architecture, not a promise in a contract.",
  items: [
    {
      term: "Built for the language, not translated into it.",
      /* "22 scheduled languages" is the one figure section 2.3 permits on this
         page, and it must stay exactly that - never "22+ languages". The count
         is verifiable, so inflating or rounding it invites a challenge that
         cannot be won. */
      body: "Our speech layer covers all 22 scheduled languages in single checkpoints, so complete coverage costs nothing extra in memory or money. We do not filter by language. We state the quality tier instead, tier by tier, so a user in a smaller language gets a usable product rather than no product.",
    },
    {
      term: "The domain is learned properly, not approximated.",
      /* The 2024 statute year stays: it is a fact about which corpus the
         reasoning layer is grounded against, not a measurement of anything we
         built, so the no-numbers rule does not reach it. */
      body: "A model built elsewhere for everyone has a thin, stale and frequently invented picture of any specific Indian body of knowledge. Our reasoning layer is grounded against the live authoritative corpus for the domain it serves, starting with Indian law. That includes the Bharatiya Nyaya Sanhita, Bharatiya Nagarik Suraksha Sanhita and Bharatiya Sakshya Adhiniyam, which replaced the colonial-era codes in 2024. The corpus is a parameter of the architecture, not a permanent identity.",
    },
    {
      term: "The weights are open and the deployment is yours.",
      body: "We build on MIT-licensed model weights and ship as a single deployable unit. That is what makes genuine self-hosting possible - not a data-residency promise in a contract, but an architecture in which nothing calls out.",
    },
    {
      term: "The economics stay here.",
      body: "Per-call pricing to an offshore vendor is a tax on every Indian product that grows, forever, with no renegotiation. Compute you control on infrastructure you choose is not.",
    },
    {
      term: "Sovereign by construction, not by assurance.",
      body: "The difference matters. A promise about where your data goes is only as good as the company making it. A system with no outbound path is a property you can verify yourself.",
    },
  ] satisfies Definition[],
};

/* C4. How we build ---------------------------------------------------------- */

export const howWeBuild = {
  heading: "Systems that know what they do not know.",
  /**
   * `body[0]` is the lead, as in C2. The order of the rest is the argument: the
   * published evidence that the alternative fails, then the failure mode named,
   * then what we do instead, then what that costs us.
   */
  body: [
    "There is one belief underneath everything PunkRaven builds, and it is unfashionable: a system that admits uncertainty is more valuable than one that never appears uncertain.",
    /**
     * De-numbered per section 2.3. The source carries three figures here - a
     * hallucination range for general-purpose models, plus a rate each for two
     * named commercial retrieval-augmented products - and all of them are marked
     * "verify the study and figures directly before publishing", which nobody
     * has. The attribution to Stanford RegLab's study stays, and so does the
     * argument it supports, because that argument is the reason the section
     * exists. The two commercial products are not named: naming a competitor's
     * failure rate without the verified figure behind it is the one form of this
     * claim that is worse than dropping it.
     */
    "The industry has already demonstrated the alternative, and the clearest published evidence comes from the domain we chose first. Stanford RegLab's Large Legal Fictions study found general-purpose models inventing answers to legal questions often enough that no practitioner could rely on them, and its follow-up found that even purpose-built retrieval-augmented tools still fabricated.",
    "The failure mode is not domain-specific. It is that these systems are wrong fluently, with no signal to the reader that anything has gone missing, and that is as true of a transcript as it is of a citation.",
    "So we design in the opposite direction. A claim either traces to retrieved material or is withheld. Every transcript segment is built to carry a confidence score you can act on. Every language carries an honest quality tier.",
    "Abstention is a designed behaviour, deliberately trained, not a failure mode we apologise for. Verification is built to run in layers and fail closed: if a layer cannot confirm a claim, the system withholds it rather than shipping it unverified.",
    "This costs us things. Our demos are less impressive. Our systems will sometimes say they cannot help. We think that is the correct trade in every domain where a wrong answer is expensive, and those are the only domains we intend to work in.",
  ],
};

/* C5. What we are building -------------------------------------------------- */

/**
 * Section 8.2 puts this route's three outbound contextual links here, with the
 * layer role as the anchor text - "the language layer" to `/tnt`, "the reasoning
 * layer" to `/lawman`, "the first application" to `/lawsafe`. Because the role
 * string IS the anchor text, the link lives on the block heading rather than
 * inside the prose; moving it into a paragraph would mean inventing a second
 * phrase to anchor. They are the only edges this route has out to the product
 * pages, and section 8.3 wants the infrastructure pages carrying more of them
 * than the application, which the T&T-then-Lawman order gives.
 */
export const whatWeAreBuilding = {
  heading: "Two layers, and the first thing we built on them.",
  body: "PunkRaven is a product company, and the product is a stack. The two infrastructure layers are the company. The application on top is how we prove them.",
  infrastructureLabel: "The infrastructure",
  applicationLabel: "Built on it",
  infrastructure: [
    {
      name: "T&T",
      role: "the language layer",
      href: "/tnt",
      status: "planning",
      body: [
        "A self-hosted speech pipeline that turns Indian-language audio into a clean transcript and a translation through one API call. Two engines, one queue, one deployment unit.",
        "The part in the middle - voice activity detection, punctuation, sentence splitting, number formatting, protected-term handling - is the part everyone else leaves to you, and it is where most avoidable quality loss happens. Shipping it as product rather than as a tutorial is the reason T&T exists.",
        /**
         * The non-legal buyers. Section 4.2 marks this sentence mandatory and
         * bars cutting it for space: it is one of the named mitigations against
         * a reader concluding this is a legal-tech company, and it is the proof
         * on the company page that the language layer is horizontal and has
         * nothing to do with law.
         */
        "Its buyers are contact centres, consumer apps, government services, media and education - anyone whose users do not speak English.",
      ],
    },
    {
      name: "Lawman",
      role: "the reasoning layer",
      href: "/lawman",
      status: "specified",
      body: [
        "A system designed not to answer from memory. It is built to retrieve the governing material first, answer from what it found, attribute the claim to its source, and verify each reference against the actual source text before you see it. Skill lives in the model; facts live in the sources.",
        /* Section 2.1, law is the proving ground and not the identity - law is
           introduced here as the hardest available test, never as the company's
           purpose. */
        "Its first body of authority is Indian law, chosen because it is the least forgiving test available. The sources are authoritative, the language is exact, and a confident invention is not a rough draft but a liability.",
      ],
    },
  ] satisfies BuildingBlock[],
  application: [
    {
      name: "LawSafe",
      role: "the first application",
      href: "/lawsafe",
      status: "in-design",
      body: [
        "Not the company's purpose - its proof. A chat-first way for any Indian to describe a legal problem in their own language and understand where they stand, then reach a Bar Council-verified advocate who specialises in that issue. Understanding first, transaction second.",
        "It exists because a company that will not build a product on its own infrastructure is asking customers to take a risk it will not take itself.",
      ],
    },
  ] satisfies BuildingBlock[],
};

/* C6. What we will not do --------------------------------------------------- */

/**
 * Section 4.2 calls this the most quotable section on the site. The fifth
 * commitment is the not-a-law-firm statement, and section 2.3 permits "law
 * firm", "legal services" and "advice" here and in the footer disclaimer only.
 */
export const commitments = {
  heading: "The constraints define us as much as the features.",
  items: [
    {
      heading: "We will not ship a system that sounds certain when it is not.",
      body: "Abstention is the product working, not the product failing.",
    },
    {
      heading: "We will not publish a benchmark we have not run.",
      body: "Estimates are labelled as estimates, every time, including when it would be more persuasive not to.",
    },
    {
      heading:
        "We will not put a customer logo on this site before there is a customer.",
      body: "A trust row of placeholder logos is the fastest way to lose a technical reader.",
    },
    {
      heading: "We will not make your data the business model.",
      body: "Self-hosting is not an enterprise tier we upsell. It is how the systems are built.",
    },
    {
      heading:
        "We will not represent ourselves as a law firm or a legal services provider.",
      body: "PunkRaven builds software. Lawman and LawSafe are research and drafting instruments; advice comes from a qualified advocate, and every surface we build makes that boundary explicit.",
    },
    {
      heading:
        "We will not let commercial pressure override the grounded-or-silent rule.",
      body: "If that rule ever becomes negotiable, the rest of this page is marketing.",
    },
  ] satisfies Commitment[],
};

/* C7. Where we are ---------------------------------------------------------- */

export const whereWeAre = {
  heading: "Pre-launch, and specific about it.",
  /**
   * The source states the three project stages in one running sentence. It is
   * split into `statusLines` so each one can carry its status chip - the label
   * that says, on every surface it appears on, that none of this has shipped.
   * Ordered T&T, Lawman, LawSafe, like everything else on the page.
   */
  intro:
    "We are a young company doing the unglamorous half of the work first, on the theory that the layers underneath are the only part that is hard to copy.",
  statusLines: [
    {
      project: "T&T",
      status: "planning",
      detail:
        "A complete technical specification, a costed deployment plan and a documented API contract. At planning stage.",
    },
    {
      project: "Lawman",
      status: "specified",
      detail: "Fully specified, and not yet built.",
    },
    {
      project: "LawSafe",
      status: "in-design",
      detail: "In design.",
    },
  ] satisfies StatusLine[],
  closing:
    "If you have Indian-language audio, a body of authoritative material that has to be reasoned over without leaving your infrastructure, or a reason to care whether this country builds its own stack, we would like to talk. That includes the case where the honest answer is that we are not ready for you yet.",
  /**
   * The one conversion action on the site. Section 4.2 points the primary CTA at
   * `/contact`, which is proposed and not built, so rather than link a 404 or
   * reintroduce the withdrawn early access the button opens a mail client at the
   * address `config/site.ts` already carries - and the label says so, because
   * the reader should know what the click does before making it.
   */
  ctaLabel: "Email us about what you are working on",
  /**
   * A function rather than a literal so the address stays single-sourced in
   * `config/site.ts`: no content file imports site config, and hardcoding the
   * address here would put a second copy of it in the repo.
   */
  ctaNote: (email: string) =>
    `Opens a mail client, addressed to ${email}. There is no form behind it.`,
};

/* C8. The name -------------------------------------------------------------- */

/**
 * Marked optional in the source and the first thing to cut if the page runs
 * long. Kept: it is four lines, it is the only place the brand is explained, and
 * both halves of the gloss restate the page's argument rather than decorating it
 * - the refusal of a default stack, and the refusal to sound more certain than
 * the evidence allows.
 */
export const theName = {
  heading: "Why PunkRaven",
  items: [
    {
      term: "Punk",
      body: "is the refusal - that the default stack is the only stack, that Indian languages are someone else's long tail, that a confident answer is the same thing as a correct one.",
    },
    {
      term: "Raven",
      body: "is the disposition - watchful, unusually clever, and remembered for its memory.",
    },
  ] satisfies NameGloss[],
  closing:
    "We build our own layers, and we are honest about what we can actually see.",
};
