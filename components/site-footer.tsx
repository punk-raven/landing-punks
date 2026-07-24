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
 * than decorative. `/tnt`, `/lawman` and `/about` each end on a sunken CTA, so
 * the footer meets a section at its own elevation with no rung between them;
 * the rule is the only thing dividing the two regions. `globals.css` states the
 * rule for exactly this case - where a boundary is the sole definition of a
 * region, use `--border` (3.09:1 or better on every rung) and never
 * `--separator`, which is a decorative hairline at about 1.5:1 and would leave
 * the two regions merged.
 *
 * On the pages that end on `base` - the homepage since its closing CTA was
 * removed - it is redundant with the elevation step, and harmless. Do not
 * downgrade it to `--separator` on the strength of those pages.
 *
 * The disclaimer is not optional decoration: spec §2a.4 makes it mandatory on
 * every page, because a software company that builds tools sits in a different
 * regulatory position from a firm providing legal services. Do not move it
 * behind a link, and do not drop it from a page.
 */
export const SiteFooter = () => (
  <Section
    as="footer"
    className="border-t border-border"
    elevation="sunken"
    spacing="sm"
  >
    <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-center gap-2">
        <Logo aria-hidden="true" size={24} />
        {/* Uppercase as CSS, not as content - see the note in the navbar. */}
        <span className="font-display text-sm font-semibold uppercase tracking-tight">
          {siteConfig.name}
        </span>
      </div>

      {/* The page links and the social cluster are separate rows, and the
          social one is not inside the <nav>: it is the same four accounts the
          header carries, not site navigation, and folding icon links into a
          "Footer" landmark makes that list read as four more pages.

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

    <p className="max-w-measure font-body text-sm leading-relaxed text-muted">
      {siteConfig.name} builds software. It does not provide legal services and
      is not a law firm.
    </p>
  </Section>
);
