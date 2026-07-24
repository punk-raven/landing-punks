export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  /**
   * Sentence-cased on purpose. This string is the page `<h1>`, the `<title>`
   * and `og:title`, and spec §5.3 allows all-caps only on eyebrows and status
   * chips. All-caps here would also make some screen readers spell the name out
   * letter by letter. The wordmark in the navbar and footer applies `uppercase`
   * as CSS, which is presentation and leaves the accessible name intact.
   */
  name: "PunkRaven",
  description: "PunkRaven",
  /**
   * The single source of truth for site navigation - the desktop bar, the
   * mobile disclosure menu and the footer all render from this one list.
   */
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/punk-raven/landing-punks",
    /**
     * The only primary CTA on the site (spec §2b.7: "Request early access",
     * never "Get your API key" / "Start building" / "Sign up" / "Try it free").
     *
     * It points at the closing CTA band until the early-access form exists in
     * Phase 7 of §6. One constant so that phase changes the destination in one
     * place rather than hunting call sites - and so no CTA ever ships pointing
     * at a route that 404s.
     */
    earlyAccess: "#early-access",
  },
};
