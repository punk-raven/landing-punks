import { whereWeAre } from "@/content/home";
import { Section } from "@/components/section";
import { StatusChip } from "@/components/status-chip";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "where-we-are";

/**
 * B6. Where we are.
 *
 * This is the "we have not built this yet" section that spec §5.2 lists as one of
 * the four places amber is allowed - it arrives here through the status chip in
 * the Stage column, which is the whole point of the chip. Rows are ordered T&T,
 * Lawman, LawSafe (§2a.1).
 *
 * A real `<table>`: three projects against three attributes is genuinely
 * tabular, and a screen-reader user gets the row and column headers with it.
 * The wrapper scrolls rather than the page if the viewport is narrower than the
 * table can wrap to (§5.6: no horizontal scroll on the document at 360px).
 */
export const StatusTable = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`}>
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {whereWeAre.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {whereWeAre.body[0]}
    </p>
    <p className={prose({ className: "mt-4 max-w-measure text-muted" })}>
      {whereWeAre.body[1]}
    </p>

    <div className="mt-10 overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{whereWeAre.caption}</caption>
        <thead>
          <tr className="border-b border-separator">
            <th
              className="py-3 pr-4 font-data text-xs font-medium uppercase tracking-[0.14em] text-muted"
              scope="col"
            >
              {whereWeAre.columns.project}
            </th>
            <th
              className="py-3 pr-4 font-data text-xs font-medium uppercase tracking-[0.14em] text-muted"
              scope="col"
            >
              {whereWeAre.columns.stage}
            </th>
            <th
              className="py-3 font-data text-xs font-medium uppercase tracking-[0.14em] text-muted"
              scope="col"
            >
              {whereWeAre.columns.exists}
            </th>
          </tr>
        </thead>
        <tbody>
          {whereWeAre.rows.map((row) => (
            <tr key={row.project} className="border-b border-separator">
              <th
                className="py-4 pr-4 align-top font-display text-base font-semibold tracking-tight"
                scope="row"
              >
                {row.project}
              </th>
              <td className="py-4 pr-4 align-top">
                <StatusChip size="sm" status={row.status} />
              </td>
              <td className="py-4 align-top font-body text-sm leading-relaxed text-muted">
                {row.exists}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Section>
);
