/**
 * TNT page content - `docs/copy/tnt-website-copy.md` Part A, sections A0 to A13,
 * hand-transcribed the same way `content/home.ts` and `content/about.ts`
 * transcribe their sources.
 *
 * The copy document is a brief, not page content. Everything that names a slot
 * rather than filling it is stripped on the way in: `*Source: ...*` attribution
 * lines, the `**Eyebrow**` / `**Section heading**` / `**Body**` / `**SLA table**`
 * field labels, Part B (the homepage block, already built) and Part C. There is
 * deliberately no markdown renderer - explicit transcription is what keeps the
 * apparatus off the page.
 *
 * THREE RULES BIND EVERY STRING BELOW.
 *
 *   1. Every statistic is held. Decision Q5 holds every figure on the site until
 *      a named owner verifies it, and no owner has been named. Part C gates the
 *      same figures independently and per row: the latency numbers and the SLA
 *      table must be "marked as target or benchmarked first"; competitor pricing
 *      must be "re-verified on the day you publish"; the monthly cost tiers must
 *      keep "the 30 min per user per month assumption visible".
 *
 *      So A6 (Speed) and A7 (Cost) carry the argument and the model, and not the
 *      numbers. Each de-numbered passage has a comment at the point of the
 *      change saying what came out and what replaced it. Nothing is rounded,
 *      approximated or hedged into existence - "sub-second" and "a fraction of
 *      the cost" are inventions of exactly the kind this rule exists to stop.
 *
 *      What Part C marks safe IS used: 22 scheduled languages, the Tier A / Tier
 *      B split, MIT licensing, and the API shape as a designed contract. Say "22
 *      scheduled languages", exactly, never "22+".
 *
 *   2. Nothing may read as shipped. TNT is at planning stage - `/about` C7 puts
 *      it at "a complete technical specification, a costed deployment plan and a
 *      documented API contract". The status chip in the hero says so, A9 says the
 *      contract is designed rather than live, and there is no social proof of any
 *      kind anywhere on the page (Part C: "Do not add").
 *
 *   3. Infrastructure framing. TNT is a layer of PunkRaven's stack, not a
 *      standalone product line, and its buyers are contact centres, consumer
 *      apps, government, media and education - never a legal audience.
 */

import type { ProductStatus } from "@/components/status-chip";

import { siteConfig } from "@/config/site";

/* Types ---------------------------------------------------------------------- */

export interface TntHeroContent {
  eyebrow: string;
  headline: string;
  /** Four short text claims. No logos, no testimonials, no "trusted by". */
  proof: string[];
  status: ProductStatus;
  /** What "planning stage" means concretely, next to the chip. */
  statusLine: string;
  subheadline: string;
}

/**
 * §5.5 - one sentence, nine Indic scripts, in the hero.
 *
 * `text` is EMPTY on every line and must stay empty until a native reader
 * supplies it. Decision Q6: the strings come from the user and nothing may be
 * machine-translated. `components/ui/script-column.tsx` renders nothing at all
 * while they are empty - no placeholder, no transliteration, no English stand-in
 * and no reserved space.
 *
 * `font` is the `next/font/google` family that covers the script, checked
 * against Next.js's own font data. Note Odia's family is `Noto_Sans_Oriya` - the
 * Unicode block name; the language-name spelling does not exist and fails the
 * loader.
 * Do NOT add these to `config/fonts.ts`: they are nine extra font payloads on
 * every page for one block on one page. Load them page-scoped here, and only
 * once there is something for them to render.
 */
export interface ScriptLine {
  /** `next/font/google` family name, for when the strings arrive. */
  font: string;
  /** BCP-47 tag with the script subtag, for the `lang` attribute. */
  lang: string;
  /** Script name in English. */
  script: string;
  /** The sentence in this script. Empty until a native reader supplies it. */
  text: string;
}

export interface ProblemCard {
  body: string;
  heading: string;
}

/** A3 - one engine, or the seam between them. */
export interface EngineCard {
  body: string;
  heading: string;
  /** Model identifier, set in the data face. The seam card has none. */
  model?: string;
}

/** A4 - a quality tier, and whether it is the one we are confident about. */
/**
 * A script token, one per Noto family wired page-scoped in `config/fonts-tnt.ts`.
 * A chip's native span resolves its face straight from this as
 * `var(--font-noto-<token>)`, so the set here must stay in step with the
 * `--font-noto-*` variables that module declares.
 */
export type ScriptToken =
  | "deva"
  | "beng"
  | "taml"
  | "telu"
  | "knda"
  | "mlym"
  | "gujr"
  | "guru"
  | "orya"
  | "olck"
  | "aran";

/** One language chip: English `name` in the data face, `native` in its script. */
export interface LanguageChip {
  name: string;
  native: string;
  script: ScriptToken;
}

export interface LanguageTier {
  /** True for the tier with the higher error rate - the amber marker (§5.2). */
  isUncertain: boolean;
  label: string;
  languages: LanguageChip[];
  /** Tier A only: the English pivot, a Latin-only chip with no native span. */
  pivot?: string;
}

/** A6 - a latency lane. The lanes are structure; their figures are held. */
export interface LatencyLane {
  body: string;
  lane: string;
}

/** A7 - one way of paying for the same audio-hour. */
export interface CostRegime {
  approach: string;
  body: string;
}

/** A7 - one rung of the scale model. The cost column is held; see below. */
export interface ScaleRow {
  audio: string;
  infrastructure: string;
  users: string;
}

/** A8 - a deployment stage. Its monthly cost is held. */
export interface DeploymentStage {
  body: string;
  stage: string;
}

export interface Audience {
  line: string;
  segment: string;
}

export interface Objection {
  answer: string;
  question: string;
}

/* A0. Page metadata ---------------------------------------------------------- */

/**
 * A0 supplies a page title, a meta description, an OG title, an OG description,
 * both CTAs and the slug. Two of those cannot be used as written.
 *
 *   - The page title and OG title say "22 Indian languages", dropping
 *     "scheduled". The site says "22 scheduled languages" everywhere, because
 *     the number is exact only with that word attached. The copy doc's own
 *     Variant C carries the same defect. Corrected here.
 *   - The meta description ends "2-5x cheaper than stitching two managed cloud
 *     APIs together". That is the derived cost estimate Part C holds for
 *     re-verification, and a meta description is published copy like any other.
 *     Replaced with the licensing claim and the stage, which are safe.
 *
 * The title and description are also held to a length that survives a result
 * snippet, per section 6.2 of `docs/website-content.md`. The pair this file
 * shipped first ran 74 and 188 characters and truncated in both Google and the
 * AI answer engines; these run 59 and 151. The description ends on the stage,
 * which is the one qualifier an extractor is most likely to drop and the one
 * this page can least afford to lose. They live here rather than in the page,
 * because governance section 10.3 puts a title or a meta description in the
 * content module so that the page and the head cannot disagree.
 *
 * A0 supplies no OG image, so none is claimed - `layouts/head.tsx` emits a
 * `summary` card rather than `summary_large_image` for exactly that reason.
 */
export const tntMeta = {
  title: "TNT - speech and translation, 22 scheduled Indian languages",
  description:
    "Self-hosted transcription and translation for all 22 scheduled Indian languages through one API. MIT-licensed weights, no per-call fee. Planning stage.",
  ogTitle:
    "Audio in. Transcript and translation out. 22 scheduled Indian languages.",
  ogDescription:
    "One self-hosted service. MIT-licensed weights. No per-call vendor fee.",
};

/* A1. Hero ------------------------------------------------------------------- */

export const tntHero: TntHeroContent = {
  eyebrow: "Self-hosted speech infrastructure",
  headline:
    "Audio in. Transcript and translation out. All 22 scheduled Indian languages.",
  subheadline:
    "TNT is a self-hosted speech pipeline that turns Indian-language audio into a clean transcript and a translation through a single API call. Two engines, one queue, one deployment unit. MIT-licensed weights, so there is no per-call vendor fee and no data leaving your infrastructure.",
  /**
   * Part C's own mitigation: "label the page in development, early access
   * opening near the hero". The wording is taken from `/about` C7 so the two
   * pages describe the same state in the same terms.
   *
   * A0's secondary CTA, "Read the technical plan", is NOT rendered. There is no
   * destination for it: no source document gives a URL for the plan set, and
   * `siteConfig.links.github` points at this website's repository, not at the
   * TNT planning documents. A button labelled "Read the technical plan" that
   * goes nowhere is worse than no button. It returns when a URL exists.
   */
  status: "planning",
  statusLine:
    "Planning stage. A complete technical specification, a costed deployment plan and a documented API contract exist. A running service does not.",
  proof: [
    "22 scheduled languages, always on",
    /**
     * A1's second proof item is "~1 second for a 30 second clip". Held: Part C
     * requires that figure to be marked as a target or benchmarked first, and
     * a four-word proof strip is the one place a qualifier cannot fit. Replaced
     * with the confidence contract from A5, which is a designed property of the
     * response rather than a measurement.
     */
    "Confidence and quality tier on every response",
    "MIT-licensed models, self-hosted",
    "One API: POST /v1/transcribe-translate",
  ],
};

/**
 * §5.5. The sentence, and the nine slots for it.
 *
 * BLOCKED. Every `text` is empty and must stay empty until a native reader of
 * that script supplies and checks the string (decision Q6). The spec is blunt
 * about why: "a mangled script on a page about language coverage is a
 * self-inflicted wound."
 */
export const heroScriptSentence = {
  english: "Audio in. Transcript and translation out.",
  lines: [
    {
      script: "Devanagari",
      lang: "hi-Deva",
      font: "Noto_Sans_Devanagari",
      text: "",
    },
    { script: "Bengali", lang: "bn-Beng", font: "Noto_Sans_Bengali", text: "" },
    { script: "Tamil", lang: "ta-Taml", font: "Noto_Sans_Tamil", text: "" },
    { script: "Telugu", lang: "te-Telu", font: "Noto_Sans_Telugu", text: "" },
    { script: "Kannada", lang: "kn-Knda", font: "Noto_Sans_Kannada", text: "" },
    {
      script: "Malayalam",
      lang: "ml-Mlym",
      font: "Noto_Sans_Malayalam",
      text: "",
    },
    {
      script: "Gujarati",
      lang: "gu-Gujr",
      font: "Noto_Sans_Gujarati",
      text: "",
    },
    {
      script: "Gurmukhi",
      lang: "pa-Guru",
      font: "Noto_Sans_Gurmukhi",
      text: "",
    },
    /* Odia's family is Noto_Sans_Oriya - the Unicode block name. There is no
       `Noto Sans Odia` in next/font/google and asking for one fails the loader. */
    { script: "Odia", lang: "or-Orya", font: "Noto_Sans_Oriya", text: "" },
  ] satisfies ScriptLine[],
};

/* A2. The problem ------------------------------------------------------------ */

export const tntProblem = {
  heading: "Indian-language speech is still the hard part",
  body: "Most teams building Indian-language products end up bolting a managed speech-to-text API onto a managed translation API and hoping the seam holds. It rarely does. The transcript arrives with no punctuation and no sentence boundaries, the translator expects clean sentences, and the quality loss happens invisibly in between. You pay two vendors per call, your audio leaves the country, and the languages you actually need are the ones with the worst coverage.",
  cards: [
    {
      heading: "Two vendors, two bills, one broken seam",
      body: "Speech-to-text and machine translation are sold separately. The layer that joins them - punctuation, sentence splitting, number formatting, protected terms - is nobody's product, so it becomes your bug.",
    },
    {
      heading: "Errors compound silently",
      body: "A transcription mistake does not surface as an error. It is passed downstream and translated fluently into something confidently wrong. Most APIs will not tell you which parts they were unsure about.",
    },
    {
      /**
       * De-numbered. The source card opens "Managed transcription plus managed
       * translation runs roughly Rs 90-180 per audio-hour." Part C holds that
       * figure with "re-verify competitor pricing on the day you publish", and
       * nobody owns that re-verification. The claim the figure was evidence for
       * - that per-call pricing scales against you and the weights are never
       * yours - is structural, survives without it, and is what the card is
       * actually about.
       */
      heading: "Per-call pricing that scales against you",
      body: "Managed transcription and managed translation are both billed per call, and a stitched pipeline pays both. Every minute of growth is a bigger bill, the price is set by someone you cannot renegotiate with, and the model weights are never yours.",
    },
  ] satisfies ProblemCard[],
};

/* A3. What TNT is ------------------------------------------------------------ */

export const tntWhatItIs = {
  heading: "One service. Two engines. One queue.",
  body: "TNT packages an Indian-language speech recogniser and translator into a single deployable unit behind one API. The part in the middle - the part everyone else leaves to you - is built in.",
  /**
   * The parameter counts below (600M, 1B, 200M, 320M) are model-card facts,
   * published by the model authors, in the same class as the 22-language
   * coverage and the MIT licensing that Part C marks Safe. They are not
   * measurements of anything we built, and 600M is inside the checkpoint name
   * the card prints anyway - suppressing it in the prose while rendering it in
   * the identifier would be theatre. Kept, and listed in the figure audit.
   */
  cards: [
    {
      heading: "Recognition",
      model: "ai4bharat/indic-conformer-600m-multilingual",
      body: "A single 600M-parameter checkpoint covering all 22 scheduled languages, with two decoding heads. The fast head serves live traffic; the accurate head re-decodes stored audio in the background so the answer you keep is better than the answer you saw.",
    },
    {
      heading: "Translation",
      model: "ai4bharat/indictrans2",
      body: "A 1B model plus distilled 200M and 320M variants, covering English to Indic, Indic to English, and Indic to Indic. The small models run the live lane, the large model runs the quality lane.",
    },
    {
      heading: "The seam",
      body: "Voice activity detection, chunking with overlap stitching, punctuation restoration, inverse text normalisation, sentence splitting and do-not-translate glossary markup. This is not off-the-shelf. It is where most avoidable quality loss happens, and it is the reason TNT exists as a product rather than a tutorial.",
    },
  ] satisfies EngineCard[],
  callout:
    "No text-to-speech. The module is deliberately scoped as a foundation, with a documented output contract so speech synthesis, summarisation or an answering model can attach to it later without a rewrite.",
};

/* A4. Language coverage ------------------------------------------------------ */

export const tntLanguages = {
  heading: "All 22 scheduled languages. No add-on pricing.",
  body: [
    "Both models cover the full scheduled list in single checkpoints, so complete coverage costs nothing extra in memory or money. TNT never filters by language.",
    "What it does instead is tell you the truth about quality.",
  ],
  /**
   * The AEO pair from section 7 of `docs/website-content.md`: a question-shaped
   * H3 (7.1) over a self-contained 52-word answer (7.2), both verbatim. The
   * addition is additive by design - the declarative H2 above it is the house
   * voice and is not converted.
   *
   * It sits ABOVE the tier lists, not below them. An extractor that truncates
   * takes the top, and the one thing this answer exists to carry downstream is
   * that the coverage is tiered rather than uniform. Composed entirely from
   * copy already on this page, so it is not a new claim.
   */
  question: "Which Indian languages does TNT support?",
  answer:
    "TNT covers all 22 scheduled Indian languages in single model checkpoints, so complete coverage costs nothing extra. Coverage is tiered honestly rather than flattened: ten languages plus the English pivot are production grade, and the remaining twelve, including Kashmiri, Santali, Manipuri and Bodo, carry higher error rates. Every response states its tier.",
  tiers: [
    {
      label: "Tier A - production grade",
      languages: [
        { name: "Hindi", native: "हिन्दी", script: "deva" },
        { name: "Bengali", native: "বাংলা", script: "beng" },
        { name: "Marathi", native: "मराठी", script: "deva" },
        { name: "Tamil", native: "தமிழ்", script: "taml" },
        { name: "Telugu", native: "తెలుగు", script: "telu" },
        { name: "Kannada", native: "ಕನ್ನಡ", script: "knda" },
        { name: "Malayalam", native: "മലയാളം", script: "mlym" },
        { name: "Gujarati", native: "ગુજરાતી", script: "gujr" },
        { name: "Punjabi", native: "ਪੰਜਾਬੀ", script: "guru" },
        { name: "Odia", native: "ଓଡ଼ିଆ", script: "orya" },
      ],
      /* The English pivot is Tier A's own chip - Latin only, no native span. */
      pivot: "English - Pivot",
      isUncertain: false,
    },
    {
      label: "Tier B - supported, higher error rate",
      languages: [
        { name: "Assamese", native: "অসমীয়া", script: "beng" },
        { name: "Bodo", native: "बड़ो", script: "deva" },
        { name: "Dogri", native: "डोगरी", script: "deva" },
        { name: "Kashmiri", native: "कॉशुर", script: "deva" },
        { name: "Konkani", native: "कोंकणी", script: "deva" },
        { name: "Maithili", native: "मैथिली", script: "deva" },
        { name: "Manipuri", native: "মৈতৈলোন", script: "beng" },
        { name: "Nepali", native: "नेपाली", script: "deva" },
        { name: "Sanskrit", native: "संस्कृतम्", script: "deva" },
        { name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ", script: "olck" },
        { name: "Sindhi", native: "सिन्धी", script: "deva" },
        { name: "Urdu", native: "اردو", script: "aran" },
      ],
      /* §5.2, "low-confidence markers": this tier is the page's clearest one.
         The amber marks the tier we are less certain about, and nothing else. */
      isUncertain: true,
    },
  ] satisfies LanguageTier[],
  pullQuote:
    "Every response carries a quality_tier field. We would rather tell you a language is Tier B than quietly pretend all 22 are equivalent. Word error rates are higher and translations are rougher. Gate these by confidence threshold rather than removing them, and your users in those languages get a usable product instead of no product.",
};

/* A5. Honest confidence ------------------------------------------------------ */

export const tntConfidence = {
  heading: "Confidence is part of the contract, not a footnote",
  body: "A fluent wrong answer is worse than a flagged uncertain one. TNT returns a confidence score for every segment, separately for recognition and for translation, and flags low-confidence spans instead of hiding them. Per-stage timings come back with every response too, so a performance regression is visible to you on the day it happens rather than in a support ticket three weeks later.",
  /** `field` is set in the data face; `body` is the sentence around it. */
  features: [
    {
      field: "asr_confidence",
      body: "and mt_confidence on every segment of every response",
    },
    {
      field: "Low-confidence spans",
      body: "flagged, never silently smoothed over",
    },
    {
      field: "quality_tier",
      body: "states whether the language is Tier A or Tier B",
    },
    {
      field: "timings_ms",
      body: "breaks down ingest, VAD, recognition, seam and translation",
    },
    {
      field: "version",
      body: "lets you refetch the improved result after background re-decoding",
    },
  ],
};

/* A6. Speed ------------------------------------------------------------------ */

/**
 * REWRITTEN, and this is the largest de-numbering on the page.
 *
 * The source section is built out of four figures and a table: a heading reading
 * "About a second, for a thirty second clip", a body giving roughly one to two
 * seconds for a 30 second clip and about a second behind the speaker in
 * streaming, and a four-row SLA table of p50 / p95 / p99 values. Part C holds all
 * of it: "either mark as target on the page, or benchmark first". No benchmark
 * has been run and no verification owner exists, so nothing here can be marked
 * "target" honestly either - a target implies someone has committed to it.
 *
 * What is kept is everything the figures were evidence for: that latency is not
 * one number but one per lane, that the tail matters more than the median, and
 * the source's own closing line, which turns out to be the argument for
 * withholding rather than a decoration on the table. The lane names, the clip
 * length that DEFINES the live lane, and the percentile names are structure, not
 * measurements, and they stay.
 *
 * The cost of this is real and is stated in the report rather than papered over:
 * a reader evaluating TNT for a latency-sensitive workload leaves this section
 * without the number they came for.
 */
export const tntSpeed = {
  heading: "We will publish latency once we have measured it.",
  body: [
    "TNT is at planning stage. The pipeline is specified and costed, and nothing has been benchmarked on real hardware under real load, so there are no latency figures on this page. Publishing an estimate as though it were a measurement is the exact failure this company was set up not to commit.",
    "What we can say is what those figures will describe, because that part is a design decision rather than a result. Latency is not one number. It is one per lane, and each lane degrades differently under load.",
  ],
  lanes: [
    {
      lane: "Live",
      body: "A clip of thirty seconds or less, transcribed and translated in a single response on a warm GPU.",
    },
    {
      lane: "Streaming",
      body: "Partial text arriving behind the speaker while they are still talking.",
    },
    {
      lane: "Async batch",
      body: "A queue, measured per audio-hour rather than per request, at whatever utilisation the hardware is held at.",
    },
    {
      lane: "Cold start",
      body: "A serverless worker with nothing warm behind it, which is the number a pilot deployment actually feels.",
    },
  ] satisfies LatencyLane[],
  closing: [
    "Each lane will be published at p50, p95 and p99. The median is the number that flatters a demo; the tail is the number that wakes somebody up.",
    "An SLA you measure is an SLA you can defend. An SLA you guess at is a liability.",
  ],
};

/* A7. Cost ------------------------------------------------------------------- */

/**
 * REWRITTEN. The source heading is "2-5x cheaper than stitching two managed APIs
 * together", followed by a three-row cost-per-audio-hour table, a four-row
 * monthly cost table and a footnote fixing the rupee at $1 = Rs 86.
 *
 * Every rupee figure is held twice over. Part C holds the comparison on
 * competitor list prices - "re-verify competitor pricing on the day you publish"
 * - and holds the monthly tiers as "derived from a stated usage model". The
 * multiplier in the heading is the ratio of two held numbers, so it is held with
 * them; a ratio is not safer than its operands.
 *
 * What survives is the whole economic argument, which does not depend on the
 * figures at all: MIT licensing (Part C: Safe) means the bill is compute you
 * control rather than a per-call licence, and that changes the SHAPE of the
 * curve, not just its height. The three regimes and the four scale rungs are
 * kept as structure, with the cost column removed - and Part C's required
 * assumption, 30 minutes of audio per active user per month, is kept visible
 * exactly as it demands, because it is what makes the audio column arithmetic
 * rather than a claim.
 */
export const tntCost = {
  heading: "Compute you control, not a licence you cannot renegotiate.",
  body: [
    "The weights are MIT-licensed. That is the whole economic premise, and everything else follows from it: no per-call fee, no vendor with the unilateral ability to reprice you, and no floor under your unit economics that somebody else sets.",
    "It also changes the shape of the curve rather than just its height. A managed stack bills per call, so the bill tracks volume forever. A self-hosted one bills for hardware time, so the bill tracks utilisation - and utilisation is something you can work on.",
  ],
  regimesLabel: "Three ways to pay for the same audio-hour",
  regimes: [
    {
      approach: "Managed speech-to-text plus managed translation",
      body: "Two per-call meters running on the same audio, plus the seam between them, which you build and maintain yourself.",
    },
    {
      approach: "TNT, self-hosted",
      body: "GPU time on infrastructure you chose, at whatever utilisation you hold it at. One deployment unit, one bill, no per-call meter.",
    },
    {
      approach: "TNT, pure batch at high utilisation",
      body: "The same GPU time spread across a full queue. The cheapest lane, and the one that gets cheaper the more work you feed it.",
    },
  ] satisfies CostRegime[],
  scaleLabel: "How the deployment changes as the workload grows",
  scaleCaption: "Deployment shape by active user count",
  scaleColumns: {
    users: "Active users",
    audio: "Audio per month",
    infrastructure: "Infrastructure",
  },
  scaleRows: [
    {
      users: "10",
      audio: "5 hours",
      infrastructure: "Serverless, scale to zero",
    },
    { users: "100", audio: "50 hours", infrastructure: "Serverless" },
    {
      users: "1,000",
      audio: "500 hours",
      infrastructure: "Serverless, or a part-time dedicated GPU",
    },
    {
      users: "10,000",
      audio: "5,000 hours",
      infrastructure: "One dedicated GPU plus peak capacity",
    },
  ] satisfies ScaleRow[],
  /* Part C: "keep the 30 min per user per month assumption visible". It is the
     only reason the audio column is arithmetic rather than a claim, so it sits
     with the table rather than in a footnote. */
  scaleAssumption:
    "At an assumed 30 minutes of audio per active user per month. That assumption is the whole of the audio column - change it and every row moves with it.",
};

/* A8. Deployment ------------------------------------------------------------- */

export const tntDeployment = {
  heading: "Runs where your data is allowed to be",
  body: "One container, one queue, one GPU to start. No Kubernetes until you have more than one node, and a single Docker Compose box with a queue gets you further than most teams expect.",
  /**
   * The hardware requirements below - one 24 GB GPU, 8 vCPU, 32 GB RAM - are the
   * documented deployment spec, a design property in the same class as "runs
   * entirely inside your network", which Part C marks safe as a design property.
   * They are a statement of what the system is built to run on, not a measured
   * result, and A8 and A11 both collapse into vagueness without them.
   *
   * The monthly cost on each stage is a different matter and is held: it never
   * appears on the page, only in the technical plan.
   */
  stages: [
    {
      stage: "Pilot",
      body: "Serverless GPU with scale to zero. Idle cost is near zero; cold starts sit behind an async job API.",
    },
    {
      stage: "Growth",
      body: "One reserved 24 GB GPU on an Indian cloud or a Mumbai region. Data residency friendly.",
    },
    {
      stage: "On-premise",
      body: "Your own hardware. One 24 GB GPU, 8 vCPU, 32 GB RAM. Nothing calls out.",
    },
  ] satisfies DeploymentStage[],
  callout:
    "Because the weights are MIT-licensed and the whole pipeline is one deployment unit, TNT can run entirely inside your network. No audio leaves your infrastructure, no third party sees a transcript, and there is no vendor who can change per-call pricing under you.",
};

/* A10. Who it is for --------------------------------------------------------- */

export const tntAudiences = {
  heading: "Built for teams whose users do not speak English",
  items: [
    {
      segment: "Contact centres",
      line: "Every call transcribed in the language it was spoken and translated for QA, compliance and coaching. Batch pricing, not live pricing.",
    },
    {
      segment: "Consumer and social apps",
      line: "Voice notes, comments and user video captioned and translated across the 22 scheduled languages your users actually type in.",
    },
    {
      segment: "Government and public services",
      line: "Records, grievances and field recordings, processed on infrastructure inside your own boundary.",
    },
    {
      segment: "Media and education",
      line: "Lecture and interview archives turned into searchable, translated text with word-level timestamps.",
    },
  ] satisfies Audience[],
};

/* A11. Objections and answers ------------------------------------------------ */

export const tntObjections = {
  heading: "Questions people actually ask",
  items: [
    {
      question:
        "How is this different from just calling Whisper and a translation API?",
      answer:
        "Two things. Whisper-class models are strong on the largest Indian languages and weak on the rest; IndicConformer covers all 22 in one checkpoint. And the layer between recognition and translation still has to be built by someone. With two managed APIs, that someone is you, and you find out how much it mattered only after quality complaints start arriving.",
    },
    {
      question: "Do you support code-mixed speech, like Hinglish?",
      answer:
        "Partly, and we say so plainly. Both underlying models are biased toward single languages, so embedded English words can be transcribed phonetically and then mistranslated. TNT ships an English passthrough list and post-edit rules that handle common cases. Fully solving it needs fine-tuning on your own audio, which is a documented upgrade path rather than a surprise.",
    },
    {
      question: "What about telephony audio?",
      answer:
        "8 kHz narrowband audio is harder and accuracy drops. If call audio is your main workload, plan on fine-tuning against your own recordings. The plan documents what that costs and when it is worth doing.",
    },
    {
      question: "Can we run it entirely on our own hardware?",
      answer:
        "Yes. One 24 GB GPU class card, 8 vCPU, 32 GB RAM. A CPU-only variant exists for batch workloads, though it is too slow for live traffic.",
    },
    {
      question: "What is the licence situation?",
      answer:
        "Both models are MIT-licensed. That is what makes commercial self-hosting possible without a per-call vendor fee, and it is the foundation the whole cost model rests on.",
    },
    {
      question: "Is 22-language coverage real, or a marketing number?",
      answer:
        "Real, and tiered. Ten languages plus English are production grade. The other twelve work with higher error rates. Every response tells you which tier it just gave you.",
    },
  ] satisfies Objection[],
};

/* A12. Final call to action -------------------------------------------------- */

export const tntClosingCta = {
  heading: "Bring speech to the languages your product already has users in",
  body: "TNT is being built as one deployable unit with a documented contract, an honest confidence signal and a cost model that survives contact with growth. If you have Indian-language audio and a reason to keep it on your own infrastructure, we would like to hear about the workload.",
  /**
   * The primary call to action, and the first conversion action on any route.
   *
   * A12 names it "Tell us about the workload" and points it at `/contact`.
   * `/contact` is marked Proposed in the site map and does not exist, so the
   * destination is the address already in `config/site.ts`, which is otherwise
   * exposed only as an unlabelled icon. The label names the click rather than
   * implying a page, and `microCopyAddress` prints the address so the reader
   * knows where it goes before pressing it. This is not early access: there is
   * no list, no form, no queue and no date, and none of those may come back
   * with it.
   */
  primaryCta: "Email us about the workload",
  primaryCtaHref: `mailto:${siteConfig.links.email}`,
  /* A0 and A12 both give "Read the technical plan" as the secondary CTA. It is
     not rendered anywhere on this page - there is no URL for the plan set. See
     the note on `tntHero.status` above. */
  secondaryCta: "Read about the company",
  secondaryCtaHref: "/about",
  microCopy:
    "Tell us the languages, the audio volume, and whether you need live or batch. That is enough for us to tell you what it would cost.",
  microCopyAddress: `The address is ${siteConfig.links.email}.`,
};
