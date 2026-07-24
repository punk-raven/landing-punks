import { whereWeAre } from "@/content/about";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { StatusChip } from "@/components/status-chip";
import { prose, subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";

const HEADING_ID = "where-we-are";

/**
 * C7. Where we are.
 *
 * Status first, ask second - which is why this section survived early access
 * being withdrawn across the site at Phase 7 where a pure CTA band would not
 * have. The "Request early access" link is gone for good and the id moved off
 * `early-access` onto the section's own subject; the button here is a `mailto:`
 * and nothing behind it is gated, waitlisted or dated.
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

    <p className={prose({ className: "mt-10 max-w-measure text-muted" })}>
      {whereWeAre.closing}
    </p>

    {/* The one conversion action on the site. It is a `mailto:`, not a link to
        a `/contact` route: that route is proposed and not built, and the
        alternatives were linking a 404 or reintroducing the withdrawn early
        access. */}
    <div className="mt-8">
      <ButtonLink
        href={`mailto:${siteConfig.links.email}`}
        size="lg"
        variant="primary"
      >
        {whereWeAre.ctaLabel}
      </ButtonLink>
    </div>
  </Section>
);
