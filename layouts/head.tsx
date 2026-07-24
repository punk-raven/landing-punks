import NextHead from "next/head";

import { siteConfig } from "@/config/site";

export interface HeadProps {
  /** Meta description. Falls back to the site description. */
  description?: string;
  /** OG description, where the page wants a different pitch to the meta one. */
  ogDescription?: string;
  /** OG title, where the page wants a different line to the document title. */
  ogTitle?: string;
  /** Document title. Falls back to the site name. */
  title?: string;
}

/**
 * Per-page `<head>`.
 *
 * Spec §7 requires each page's `Page metadata` table to be wired into `<head>`
 * plus OG tags, and those tables give a different OG title and OG description
 * from the document title and meta description - the homepage's OG title is
 * the hero line, not the page title. So both pairs are separate props, and
 * each falls back through the other to `siteConfig` rather than being required.
 *
 * Every `<meta>` that a page may want to override carries a `key`, so Next
 * de-duplicates on it instead of emitting two tags.
 */
export const Head = ({
  description,
  ogDescription,
  ogTitle,
  title,
}: HeadProps = {}) => {
  const pageTitle = title ?? siteConfig.name;
  const pageDescription = description ?? siteConfig.description;

  return (
    <NextHead>
      <title>{pageTitle}</title>
      <meta key="description" content={pageDescription} name="description" />

      <meta key="og:title" content={ogTitle ?? pageTitle} property="og:title" />
      <meta
        key="og:description"
        content={ogDescription ?? pageDescription}
        property="og:description"
      />
      <meta key="og:type" content="website" property="og:type" />
      <meta
        key="og:site_name"
        content={siteConfig.name}
        property="og:site_name"
      />

      {/* Summary card, not `summary_large_image`: there is no OG image in the
          repo yet, and claiming a large image slot with nothing to put in it
          renders as a broken card. */}
      <meta key="twitter:card" content="summary" name="twitter:card" />
      <meta
        key="twitter:title"
        content={ogTitle ?? pageTitle}
        name="twitter:title"
      />
      <meta
        key="twitter:description"
        content={ogDescription ?? pageDescription}
        name="twitter:description"
      />

      {/* No `maximum-scale` and no `user-scalable=0`: blocking pinch-zoom is a
          WCAG 2.1 SC 1.4.4 failure and Lighthouse flags it directly, which the
          spec §7 95+ target cannot absorb. */}
      <meta
        key="viewport"
        content="viewport-fit=cover, width=device-width, initial-scale=1"
        name="viewport"
      />
      <link href="/favicon.ico" rel="icon" />
    </NextHead>
  );
};
