import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

import { fontBody, fontData, fontDisplay } from "@/config/fonts";

export default function Document() {
  return (
    // suppressHydrationWarning: next-themes' blocking script writes the theme
    // class onto <html> before React hydrates, so the server markup and the
    // first client render legitimately disagree on this element's className.
    // The next/font variable classes survive it - next-themes only adds and
    // removes its own class, it does not rewrite className wholesale.
    <Html
      suppressHydrationWarning
      className={clsx(
        fontDisplay.variable,
        fontBody.variable,
        fontData.variable,
      )}
      lang="en"
    >
      <Head />
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
