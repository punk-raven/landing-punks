import type { AppProps } from "next/app";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Side-effect import: next/font only emits its CSS module when the fonts are
// pulled in from _app. _document alone does not ship it (pages router).
import "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      <Component {...pageProps} />
    </NextThemesProvider>
  );
}
