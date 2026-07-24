import { tntSpeed } from "@/content/tnt";
import { EstimateNote } from "@/components/estimate-note";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "speed";

/**
 * A6. Speed - and the largest de-numbering on the site.
 *
 * The source section is a heading, a body and a four-row SLA table built out of
 * fourteen latency figures, none of which has been benchmarked. Part C holds all
 * of them: "either mark as target on the page, or benchmark first". "Target"
 * would be no more honest here - a target is a commitment somebody has made, and
 * nobody has. So the section keeps the argument and drops the numbers, and says
 * out loud that it is doing so.
 *
 * What renders instead is the shape of the eventual measurement: four lanes,
 * because latency is one number per lane, and p50 / p95 / p99, because the
 * median flatters and the tail is what actually hurts. Those are design
 * decisions, not results.
 *
 * The rendering is deliberately NOT an SLA table with empty cells. A table of
 * blanks reads as a broken component; a list of lanes reads as a specification.
 *
 * Base elevation, shared with A7 below it - the two held-figure sections sit on
 * one rung as a single region of the page, so the reader meets the amber twice
 * in one place rather than twice at random.
 */
export const TntSpeed = () => (
  <Section
    elevation="base"
    id={HEADING_ID}
    labelledBy={`${HEADING_ID}-heading`}
  >
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {tntSpeed.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {tntSpeed.body[0]}
    </p>
    <p className={prose({ className: "mt-4 max-w-measure text-muted" })}>
      {tntSpeed.body[1]}
    </p>

    <dl className="mt-10 grid max-w-measure gap-x-8 sm:grid-cols-[max-content_minmax(0,1fr)]">
      {tntSpeed.lanes.map((lane) => (
        <div
          key={lane.lane}
          className="border-t border-separator py-4 sm:col-span-2 sm:grid sm:grid-cols-subgrid sm:items-baseline sm:gap-x-8"
        >
          <dt className="font-display text-base font-semibold tracking-tight">
            {lane.lane}
          </dt>
          <dd className="mt-2 font-body text-sm leading-relaxed text-muted sm:mt-0">
            {lane.body}
          </dd>
        </div>
      ))}
    </dl>

    <p className={prose({ className: "mt-10 max-w-measure text-muted" })}>
      {tntSpeed.closing[0]}
    </p>
    <p className={prose({ className: "mt-6 max-w-measure" })}>
      {tntSpeed.closing[1]}
    </p>

    <EstimateNote className="mt-10" note={tntSpeed.estimate} />
  </Section>
);
