import React from "react";
import NextHead from "next/head";

import { siteConfig } from "@/config/site";

export const Head = () => {
  return (
    <NextHead>
      <title>{siteConfig.name}</title>
      <meta key="title" content={siteConfig.name} property="og:title" />
      <meta content={siteConfig.description} property="og:description" />
      <meta content={siteConfig.description} name="description" />
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
