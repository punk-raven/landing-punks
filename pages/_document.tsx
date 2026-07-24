import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

import { fontBody, fontData, fontDisplay } from "@/config/fonts";

export default function Document() {
  return (
    <Html
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
