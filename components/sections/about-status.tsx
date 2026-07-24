import { siteConfig } from "@/config/site";
import { whereWeAre } from "@/content/about";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { StatusChip } from "@/components/status-chip";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "early-access";

/**
 * C7. Where we are, and the page's only call to action.
 *
 * The section id is `early-access` because `siteConfig.links.earlyAccess`
 * resolves to `#early-access` until Phase 7 builds the form. That keeps the
 * homepage and this page pointing at the same constant, and keeps the CTA from
 * ever shipping a link that lands nowhere on the page it is on.
 *
 * "Request early access" is the only primary CTA on the site. There is no
 * secondary button here: the homepage CTA band offers "Read about the company",
 * which from this page would be a link to itself.
 *
 * The three status lines are a list, not the homepage's table. Two columns of
 * three rows do not need table semantics, and the chips carry the actual claim -
 * a reader who scans nothing else has to come away knowing none of this is
 * shipped.
 */
export const AboutStatus = () => (
  <Section
    elevation="sunken"
    id={HEADING_ID}
    labelledBy={`${HEADING_ID}-heading`}
    spacing="lg"
  >
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {whereWeAre.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {whereWeAre.intro}
    </p>

    {/* Two shared columns, sized to the widest project-and-chip pair rather
        than to a fixed width. A fixed first column is what breaks here: the
        chip is as wide as its label, "In design" is wider than "Planning", and
        the moment the pair overruns the track it lands on top of the detail
        text beside it. `subgrid` makes the three rows share one measurement, so
        the details still line up without any row pinning a width. */}
    <ul className="mt-10 max-w-measure sm:grid sm:grid-cols-[max-content_minmax(0,1fr)] sm:gap-x-8">
      {whereWeAre.statusLines.map((line) => (
        <li
          key={line.project}
          className="flex flex-col gap-2 border-t border-separator py-4 sm:col-span-2 sm:grid sm:grid-cols-subgrid sm:items-baseline sm:gap-x-8"
        >
          <span className="flex items-center gap-3">
            <span className="font-display text-base font-semibold tracking-tight">
              {line.project}
            </span>
            <StatusChip size="sm" status={line.status} />
          </span>
          <span className="font-body text-sm leading-relaxed text-muted">
            {line.detail}
          </span>
        </li>
      ))}
    </ul>

    <p className="mt-10 max-w-measure font-body text-base leading-[1.75] text-pretty text-muted">
      {whereWeAre.closing}
    </p>

    <div className="mt-8">
      <ButtonLink href={siteConfig.links.earlyAccess} size="lg">
        {whereWeAre.primaryCta}
      </ButtonLink>
    </div>
  </Section>
);
