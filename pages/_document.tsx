import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

import { fontSans, fontMono } from "@/config/fonts";

export default function Document() {
  return (
    <Html className={clsx(fontSans.variable, fontMono.variable)} lang="en">
      <Head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
