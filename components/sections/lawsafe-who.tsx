import { whoItIsFor } from "@/content/lawsafe";
import { Section } from "@/components/section";
import { prose, title } from "@/components/primitives";

const HEADING_ID = "who-lawsafe-is-for";

/**
 * Who it is for - vision §3. A `<dl>`, the same shape `/tnt`'s A10 audiences
 * use, because three segments and a paragraph each is a description list.
 *
 * Unfilled, on the sunken rung, rather than the filled cards `/about` C6 uses.
 * C6 makes promises and a promise gets a card it can be pointed at; this section
 * describes readers, and three filled cards on the anchor rung would out-weight
 * the section above them, which is the one carrying the argument.
 *
 * Three columns at `md`, so no card is visually subordinate to another. The
 * third - the advocate - is the one a reader least expects on a consumer legal
 * product and the one that says most about how the platform makes money. Do not
 * demote it to a footnote or fold it into the second.
 */
export const LawsafeWho = () => (
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
      {whoItIsFor.heading}
    </h2>

    <dl className="mt-10 grid items-stretch gap-x-10 gap-y-8 md:grid-cols-3">
      {whoItIsFor.items.map((item) => (
        <div
          key={item.segment}
          className="h-full border-t border-separator pt-5"
        >
          <dt className={title({ size: "sm" })}>{item.segment}</dt>
          <dd className={prose({ className: "mt-3 text-muted" })}>
            {item.body}
          </dd>
        </div>
      ))}
    </dl>
  </Section>
);
