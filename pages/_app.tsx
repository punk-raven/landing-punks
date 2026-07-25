import type { AppProps } from "next/app";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";

// Side-effect import: next/font only emits its CSS module when the fonts are
// pulled in from _app. _document alone does not ship it (pages router), so
// removing this line silently empties every --font-*-custom variable and the
// whole site falls back to ui-sans-serif. It is load-bearing. Do not delete it.
import "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // Dark mode is class-based: next-themes writes `.dark` on <html>, which is
  // what `@custom-variant dark` and the `:root.dark` semantic block in
  // styles/globals.css key off. There is exactly one token block per theme -
  // sections differentiate by elevation, never by polarity - so the class on
  // <html> is the only switch in the system.
  //
  // `disableTransitionOnChange` is not optional - without it every colour
  // transition on the page fires at once on toggle.
  return (
    <ThemeProvider
      disableTransitionOnChange
      enableSystem
      attribute="class"
      defaultTheme="system"
    >
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}
