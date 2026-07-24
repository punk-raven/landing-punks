import NextLink from "next/link";

import { siteConfig } from "@/config/site";
import { Section } from "@/components/section";
import { Logo } from "@/components/icons";

/**
 * Site footer. Sunken elevation, the same anchor treatment as the hero and the
 * CTA - one rung below the page default, in whichever theme is active.
 *
 * The disclaimer is not optional decoration: spec §2a.4 makes it mandatory on
 * every page, because a software company that builds tools sits in a different
 * regulatory position from a firm providing legal services. Do not move it
 * behind a link, and do not drop it from a page.
 */
export const SiteFooter = () => (
  <Section as="footer" elevation="sunken" spacing="sm">
    <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-center gap-2">
        <Logo aria-hidden="true" size={24} />
        {/* Uppercase as CSS, not as content - see the note in the navbar. */}
        <span className="font-display text-sm font-semibold uppercase tracking-tight">
          {siteConfig.name}
        </span>
      </div>

      <nav aria-label="Footer">
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
          <li>
            <a
              className="font-body text-sm text-muted transition-colors hover:text-foreground"
              href={siteConfig.links.github}
              rel="noopener noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <hr className="my-8 border-0 border-t border-separator" />

    <p className="max-w-measure font-body text-sm leading-relaxed text-muted">
      {siteConfig.name} builds software. It does not provide legal services and
      is not a law firm.
    </p>
  </Section>
);
