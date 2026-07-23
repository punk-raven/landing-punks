import { Fira_Code as FontMono, Orbitron as FontSans } from "next/font/google";

// Orbitron is a display face: variable 400-900, and it ships exactly one
// subset (latin) and one style (normal). There is no latin-ext and no italic
// to opt into - passing either to this loader is a BUILD ERROR, not a
// fallback. Its glyph set is near-ASCII: no section sign, rupee, arrows,
// (c)/(R)/(TM), and no Latin Extended-A. Missing glyphs fall through per
// character to the metric-adjusted fallback at size-adjust 124%, which reads
// as a rendering bug mid-word. Weights floor at 400 - no light/thin.
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans-custom",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono-custom",
});
