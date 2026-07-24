import {
  Fira_Code as FontData,
  Inter as FontBody,
  Orbitron as FontDisplay,
} from "next/font/google";

// Three type roles, per spec §5.3. Each one exposes a `--font-*-custom`
// variable; the `-custom` suffix is required, because Tailwind's own theme keys
// are --font-display / --font-body / --font-data and reusing those names
// creates a self-referential var() that resolves to nothing. styles/globals.css
// maps these through an `@theme inline` block.
//
// DISPLAY - headings, hero, wordmark.
// Orbitron is a display face: variable 400-900, and it ships exactly one subset
// (latin) and one style (normal). There is no latin-ext and no italic to opt
// into - passing either to this loader is a BUILD ERROR, not a fallback. Its
// glyph set is near-ASCII: no section sign, rupee, arrows, (c)/(R)/(TM), and no
// Latin Extended-A. Missing glyphs fall through per character to the
// metric-adjusted fallback at size-adjust 124%, which reads as a rendering bug
// mid-word. Weights floor at 400 - no light/thin. That is why it is the display
// role only and never the running-text face.
//
// §5.6 asks for the display face to be the only preloaded one.
export const fontDisplay = FontDisplay({
  display: "swap",
  preload: true,
  subsets: ["latin"],
  variable: "--font-display-custom",
});

// BODY - all running text, and the default face for prose.
// Inter carries latin-ext and a real italic, neither of which Orbitron has, so
// it can set the accented Latin and emphasis that the display face drops.
export const fontBody = FontBody({
  display: "swap",
  preload: false,
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-custom",
});

// DATA - tables, code, API contract, confidence values, status chips, eyebrows.
export const fontData = FontData({
  display: "swap",
  preload: false,
  subsets: ["latin"],
  variable: "--font-data-custom",
});
