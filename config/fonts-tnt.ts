import {
  Noto_Nastaliq_Urdu as FontAran,
  Noto_Sans_Bengali as FontBeng,
  Noto_Sans_Devanagari as FontDeva,
  Noto_Sans_Gujarati as FontGujr,
  Noto_Sans_Gurmukhi as FontGuru,
  Noto_Sans_Kannada as FontKnda,
  Noto_Sans_Malayalam as FontMlym,
  Noto_Sans_Ol_Chiki as FontOlck,
  Noto_Sans_Oriya as FontOrya,
  Noto_Sans_Tamil as FontTaml,
  Noto_Sans_Telugu as FontTelu,
} from "next/font/google";

/**
 * A4 (Language coverage) native-script endonyms only. None of the three site
 * faces in `config/fonts.ts` covers any Indic script, so unwired native text
 * renders as tofu or falls through mid-word. These eleven Noto families cover
 * the ten Tier A and twelve Tier B scripts between them.
 *
 * Loaded PAGE-SCOPED, never in `config/fonts.ts`: eleven extra families on
 * every route to letter twenty-two scripts on one route is not the trade. The
 * cost lands only on `/tnt`, because `pages/tnt/index.tsx` is the sole importer
 * and applies `notoVariableClasses` on a wrapper around the language section.
 * In the pages router `next/font` emits its CSS only when the loader is pulled
 * in from `_app` or the page, which is why this module is imported there.
 *
 * Each face is a single static weight (400) on the one subset its script needs,
 * to hold the bundle down. The CSS variable per token is `--font-noto-<token>`,
 * and `tnt-languages.tsx` resolves it straight from a chip's `script` field -
 * no lookup table. `orya` uses `Noto_Sans_Oriya`, the Unicode block name - the
 * language-name spelling is not a real next/font/google family and fails the
 * loader.
 */
export const fontDeva = FontDeva({
  display: "swap",
  preload: false,
  subsets: ["devanagari"],
  variable: "--font-noto-deva",
  weight: "400",
});

export const fontBeng = FontBeng({
  display: "swap",
  preload: false,
  subsets: ["bengali"],
  variable: "--font-noto-beng",
  weight: "400",
});

export const fontTaml = FontTaml({
  display: "swap",
  preload: false,
  subsets: ["tamil"],
  variable: "--font-noto-taml",
  weight: "400",
});

export const fontTelu = FontTelu({
  display: "swap",
  preload: false,
  subsets: ["telugu"],
  variable: "--font-noto-telu",
  weight: "400",
});

export const fontKnda = FontKnda({
  display: "swap",
  preload: false,
  subsets: ["kannada"],
  variable: "--font-noto-knda",
  weight: "400",
});

export const fontMlym = FontMlym({
  display: "swap",
  preload: false,
  subsets: ["malayalam"],
  variable: "--font-noto-mlym",
  weight: "400",
});

export const fontGujr = FontGujr({
  display: "swap",
  preload: false,
  subsets: ["gujarati"],
  variable: "--font-noto-gujr",
  weight: "400",
});

export const fontGuru = FontGuru({
  display: "swap",
  preload: false,
  subsets: ["gurmukhi"],
  variable: "--font-noto-guru",
  weight: "400",
});

export const fontOrya = FontOrya({
  display: "swap",
  preload: false,
  subsets: ["oriya"],
  variable: "--font-noto-orya",
  weight: "400",
});

export const fontOlck = FontOlck({
  display: "swap",
  preload: false,
  subsets: ["ol-chiki"],
  variable: "--font-noto-olck",
  weight: "400",
});

export const fontAran = FontAran({
  display: "swap",
  preload: false,
  subsets: ["arabic"],
  variable: "--font-noto-aran",
  weight: "400",
});

/** All eleven `.variable` classes, for the wrapper around the A4 section. */
export const notoVariableClasses = [
  fontDeva.variable,
  fontBeng.variable,
  fontTaml.variable,
  fontTelu.variable,
  fontKnda.variable,
  fontMlym.variable,
  fontGujr.variable,
  fontGuru.variable,
  fontOrya.variable,
  fontOlck.variable,
  fontAran.variable,
].join(" ");
