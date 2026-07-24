import type { ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";

import { Head } from "./head";

import { measure } from "@/components/primitives";
import { SiteFooter } from "@/components/site-footer";
import { Navbar } from "@/components/navbar";

export interface DefaultLayoutProps {
  children: ReactNode;
  /**
   * `bands` - the page lays itself out with `<Band>` sections, which own their
   * own background and measure. This is the default and what spec §5.4 asks
   * for: alternating light and dark bands, full-bleed.
   *
   * `prose` / `band` - the page is a single column and wants the layout to
   * supply the measure: 68ch for prose, 1120px for a full band.
   */
  width?: VariantProps<typeof measure>["width"] | "bands";
}

export default function DefaultLayout({
  children,
  width = "bands",
}: DefaultLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Head />
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
        {width === "bands" ? (
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
