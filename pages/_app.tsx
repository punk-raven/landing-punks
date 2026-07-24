import type { AppProps } from "next/app";

// Side-effect import: next/font only emits its CSS module when the fonts are
// pulled in from _app. _document alone does not ship it (pages router), so
// removing this line silently empties every --font-*-custom variable and the
// whole site falls back to ui-sans-serif. It is load-bearing. Do not delete it.
import "@/config/fonts";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  // No theme provider. Spec §5.1: the site alternates light and dark bands by
  // design and has no dark-mode toggle - see `.band--*` in styles/globals.css.
  return <Component {...pageProps} />;
}
