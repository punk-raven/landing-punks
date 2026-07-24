import { whereWeAre } from "@/content/about";
import { Section } from "@/components/section";
import { StatusChip } from "@/components/status-chip";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "where-we-are";

/**
 * C7. Where we are.
 *
 * IT NO LONGER CARRIES A BUTTON. Early access was withdrawn across the site at
 * Phase 7, so the "Request early access" link is gone and the id moved off
 * `early-access` onto the section's own subject. The heading and the closing
 * line are unchanged: C7 was always the status section first and the ask
 * second, so it survives the removal intact where a pure CTA band would not
 * have.
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
  </Section>
);
