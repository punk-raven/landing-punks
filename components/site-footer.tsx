import { Heart } from "lucide-react";
import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/social-links";
import { Section } from "@/components/section";
import { Logo } from "@/components/icons";

/**
 * Site footer. Sunken elevation, the same anchor treatment as the hero and the
 * CTA - one rung below the page default, in whichever theme is active.
 *
 * The top edge is `--border`, not `--separator`, and it is structural rather
 * than decorative, and it is currently redundant on every route. All five now
 * end on `base` - `/` on the status table, `/about` on the name, `/tnt` on its
 * notes, `/lawman` and `/lawsafe` on their closing sections - so the ΔL 0.048
 * step to the sunken footer already divides the two regions on its own.
 *
 * KEEP IT ANYWAY, AND DO NOT DOWNGRADE IT TO `--separator` ON THAT EVIDENCE.
 * The footer is the one component whose top edge is not guaranteed by the page
 * above it: any page that ends on a sunken section puts the footer against its
 * own elevation with no rung between them, and then the rule is the only thing
 * dividing them. That was the homepage's shape until its closing CTA band was
 * removed, and it is one section away from being true again. `globals.css`
 * states the rule for exactly this case - where a boundary is the sole
 * definition of a region, use `--border` (3.09:1 or better on every rung) and
 * never `--separator`, a decorative hairline at about 1.5:1 that would leave
 * the two regions merged.
 *
 * The §2a.4 legal-services disclaimer no longer lives here. By owner decision it
 * was moved into the homepage hero (`components/sections/hero.tsx`) and now
 * appears on `/` only, not on every route. This footer keeps just the copyright
 * and credit line. Restore the disclaimer here if that decision is reversed.
 */
export const SiteFooter = () => (
  <Section
    as="footer"
    className="border-t border-border"
    elevation="sunken"
    spacing="sm"
  >
    <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2.5">
        <Logo aria-hidden="true" size={40} />
        {/* Uppercase as CSS, not as content - see the note in the navbar. */}
        <span className="font-display text-lg font-semibold uppercase tracking-tight">
          {siteConfig.name}
        </span>
      </div>

      {/* The page links and the social cluster are separate rows, and the
          social one is not inside the <nav>.

          THIS DELIBERATELY DIFFERS FROM THE HEADER, where the same `SocialLinks`
          component does sit inside `<nav aria-label="Main">`. The rule is not
          "icon links never go in a nav landmark" - it is that the site should
          expose its navigation ONCE. The header's nav is that one exposure and
          carries the whole bar, controls included, which is why its disclosure
          menu is inside it too. This footer row is a duplicate of the header's
          cluster, so putting it in a second "Footer" landmark would have a
          screen reader enumerate the same four accounts again as though they
          were four more pages. The `<nav aria-label="Footer">` above is worth
          keeping because the page links it holds are a genuine second route to
          the five routes; the icons are not.

          `sm:items-end` right-aligns both rows against the wordmark opposite.
          The icon row is nudged by its own padding, hence the -mr-3: the 44px
          targets carry 12px either side of a 20px icon. Re-derived from -2 when
          the target grew from 36px to 44px. */}
      <div className="flex flex-col gap-4 sm:items-end">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 sm:justify-end">
            {siteConfig.navItems.map((item) => (
              <li key={item.href}>
                <NextLink
                  className="font-body text-sm text-muted transition-colors hover:text-foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="-ml-3 sm:-ml-0 sm:-mr-3">
          <SocialLinks />
        </div>
      </div>
    </div>

    <hr className="my-8 border-0 border-t border-separator" />

    <div className="font-body text-muted">
      {/* Year is stamped at build time by `new Date().getFullYear()`; this page
          is statically prerendered. The heart uses `text-foreground`, which is
          near-black in light and near-white in dark, so it flips theme at
          `:root` with no per-variant override. It is aria-hidden, so a reader
          gets "Made with by Punks at PunkRaven". */}
      <p className="text-center text-xs leading-relaxed">
        Copyright {new Date().getFullYear()}. All Rights Reserved. Made with{" "}
        <Heart
          aria-hidden="true"
          className="inline-block align-[-2px] text-foreground"
          fill="currentColor"
          size={14}
        />{" "}
        by Punks at {siteConfig.name}.
      </p>
    </div>
  </Section>
);
