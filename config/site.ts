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
  /**
   * The product order is §2a.1's, the same one the homepage, `/about` and the
   * product blocks use: T&T, Lawman, LawSafe - infrastructure before the
   * applications built on it. Reordering this list reorders the argument on
   * every page at once, which is why it is one list. About comes last because
   * it is the page a reader reaches for after the products, not before them.
   */
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "T&T",
      href: "/tnt",
    },
    {
      label: "Lawman",
      href: "/lawman",
    },
    {
      label: "LawSafe",
      href: "/lawsafe",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    /**
     * The organisation, not this repository. Every other repo under it is as
     * much the point as the site, so the icon goes to the account root.
     */
    github: "https://github.com/punk-raven",
    instagram: "https://www.instagram.com/punkraveone",
    x: "https://x.com/punkraveone",
    /**
     * Bare address. `components/social-links.tsx` adds the `mailto:` scheme, so
     * this stays usable as display text if a future page wants to print it.
     */
    email: "engineering@punkraven.com",
    /**
     * THERE IS NO `earlyAccess` HERE ANY MORE, AND THAT IS DELIBERATE.
     *
     * Spec §2b.7 makes "Request early access" the only primary CTA the site is
     * allowed to use, and §6's Phase 7 asks for the form behind it. Early access
     * was withdrawn instead: every "Request early access" button is gone from
     * every page, the constant that pointed them all at one destination is gone
     * with them, and no form was built.
     *
     * That is a deliberate deviation from the §7 checklist item reading "Primary
     * CTA is 'Request early access' on every page", recorded in
     * `docs/HANDOVER.md`. Restoring it means restoring the constant here first,
     * so that the label and the destination stay defined in one place.
     */
  },
};
