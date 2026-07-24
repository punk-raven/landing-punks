import { tntCost } from "@/content/tnt";
import { Section } from "@/components/section";
import { eyebrow, prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "cost";

/**
 * A7. Cost - the second structurally numeric section, and held like the first.
 *
 * The source heading is a multiplier over two prices, one of them a competitor
 * list price; Part C holds the comparison until that price is re-verified on
 * publication day and holds the monthly tiers as derived estimates. A ratio is
 * not safer than the numbers it is a ratio of, so the multiplier goes with them.
 *
 * The economics survive intact, because they never rested on the figures: MIT
 * licensing (Part C: safe) means the bill is compute you control, which changes
 * the shape of the curve rather than its height. That is the section's actual
 * claim and it is unaffected by holding the rupees.
 *
 * The scale table keeps its user tiers, its audio volumes and its infrastructure
 * shapes, and drops the cost column. Part C requires the "30 minutes per active
 * user per month" assumption to stay visible, so it sits with the table rather
 * than in a footnote - it is the only reason the audio column is arithmetic
 * rather than a claim.
 *
 * Base elevation, one rung below the sunken deployment section above it.
 */
export const TntCost = () => (
  <Section
    elevation="base"
    id={HEADING_ID}
    labelledBy={`${HEADING_ID}-heading`}
  >
    <h2
      className={title({ className: "max-w-[26ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {tntCost.heading}
    </h2>

    <p className={subtitle({ className: "mt-6" })}>{tntCost.body[0]}</p>
    <p className={prose({ className: "mt-4 text-muted" })}>{tntCost.body[1]}</p>

    <h3 className={eyebrow({ className: "mt-12" })}>{tntCost.regimesLabel}</h3>

    <ul className="mt-5 grid gap-6 md:grid-cols-3">
      {tntCost.regimes.map((regime) => (
        <li
          key={regime.approach}
          className="rounded-md border border-separator bg-surface p-6 text-surface-foreground"
        >
          <h4 className={title({ size: "sm" })}>{regime.approach}</h4>
          <p className={prose({ className: "mt-3 text-muted" })}>
            {regime.body}
          </p>
        </li>
      ))}
    </ul>

    <h3 className={eyebrow({ className: "mt-12" })}>{tntCost.scaleLabel}</h3>

    {/* The wrapper scrolls rather than the page if the viewport is narrower
        than the table can wrap to (§5.6: no horizontal scroll at 360px). */}
    <div className="mt-5 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{tntCost.scaleCaption}</caption>
        <thead>
          <tr className="border-b border-separator">
            <th
              className="py-3 pr-4 font-data text-xs font-medium uppercase tracking-[0.14em] text-muted"
              scope="col"
            >
              {tntCost.scaleColumns.users}
            </th>
            <th
              className="py-3 pr-4 font-data text-xs font-medium uppercase tracking-[0.14em] text-muted"
              scope="col"
            >
              {tntCost.scaleColumns.audio}
            </th>
            <th
              className="py-3 font-data text-xs font-medium uppercase tracking-[0.14em] text-muted"
              scope="col"
            >
              {tntCost.scaleColumns.infrastructure}
            </th>
          </tr>
        </thead>
        <tbody>
          {tntCost.scaleRows.map((row) => (
            <tr key={row.users} className="border-b border-separator">
              <th
                className="py-4 pr-4 align-top font-data text-sm font-medium"
                scope="row"
              >
                {row.users}
              </th>
              {/* nowrap so the unit stays with its number - "50" and "hours"
                  split across two lines at 360px otherwise. The wrapper
                  scrolls if that ever costs more width than there is. */}
              <td className="py-4 pr-4 align-top font-data text-sm whitespace-nowrap text-muted">
                {row.audio}
              </td>
              <td className="py-4 align-top font-body text-sm leading-relaxed text-muted">
                {row.infrastructure}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <p className="mt-5 font-body text-sm leading-relaxed text-muted">
      {tntCost.scaleAssumption}
    </p>
  </Section>
);
