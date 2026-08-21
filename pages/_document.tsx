import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

import { fontBody, fontData, fontDisplay } from "@/config/fonts";

export default function Document() {
  // Cloudflare Web Analytics site token. It is public by design - the beacon
  // ships it to the browser - and is set via NEXT_PUBLIC_CF_BEACON_TOKEN so no
  // token value lives in the repo. Unset means the beacon is not rendered.
  const cfBeaconToken = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

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
      <Head>
        {cfBeaconToken ? (
          <script
            defer
            data-cf-beacon={JSON.stringify({ token: cfBeaconToken })}
            src="https://static.cloudflareinsights.com/beacon.min.js"
          />
        ) : null}
      </Head>
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
