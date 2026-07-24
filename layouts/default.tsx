import type { HeadProps } from "./head";
import type { ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";

import { Head } from "./head";

import { measure } from "@/components/primitives";
import { SiteFooter } from "@/components/site-footer";
import { Navbar } from "@/components/navbar";

export interface DefaultLayoutProps {
  children: ReactNode;
  /**
   * Per-page `<head>` - title, meta description and OG pair. Each page's
   * `Page metadata` table in `docs/copy/` maps straight onto this (spec §7).
   * Omit it and the head falls back to `siteConfig`.
   */
  head?: HeadProps;
  /**
   * `sections` - the page lays itself out with `<Section>` elements, which own
   * their own elevation and measure. This is the default and what spec §5.4 asks
   * for: full-bleed sections alternating by elevation down the page.
   *
   * `prose` / `band` - the page is a single column and wants the layout to
   * supply the measure: 68ch for prose, 1120px for the full content width.
   */
  width?: VariantProps<typeof measure>["width"] | "sections";
}

export default function DefaultLayout({
  children,
  head,
  width = "sections",
}: DefaultLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Head {...head} />
      {/* First tabbable thing on the page - it lets a keyboard or screen-reader
          user jump the sticky header and the whole nav list. Visually hidden
          until focused, then it parks itself above the header (z-50 > z-40). */}
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-surface-foreground focus:shadow-lg"
        href="#main"
      >
        Skip to content
      </a>
      <Navbar />
      {/* tabIndex={-1} so the skip link actually moves focus here. Without it
          the hash changes and the page scrolls, but focus stays on the link and
          the next Tab drops the user back into the nav they just skipped. */}
      <main className="grow" id="main" tabIndex={-1}>
        {width === "sections" ? (
          children
        ) : (
          <div className={measure({ className: "py-16 sm:py-24", width })}>
            {children}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
