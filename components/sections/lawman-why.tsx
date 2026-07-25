import { whyLawman } from "@/content/lawman";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "why-lawman-is-required";

/**
 * Why LawMan is required - five failure modes of the alternative.
 *
 * A single-column `<dl>` at the reading measure, hairline above each entry. The
 * section immediately below it is the same shape in the source - a bold lead-in
 * and an explanation, ten times - and if the two rendered through the same
 * component the page would read as one undifferentiated list of fifteen. So they
 * are deliberately split: this one is a narrow linear read, the mechanism
 * section below is a wide card grid. `/about` makes the same split between C3
 * and C6 for the same reason.
 *
 * The narrow column is the right half of that pair for this section
 * specifically. These five are an argument that has to be read in order and
 * accumulates - each one is a reason the last one was not enough - where the
 * ten below are independent design decisions a reader can enter anywhere.
 *
 * Nothing here is amber. These are failures of general-purpose systems, stated
 * as fact, not claims we are uncertain about (§5.2).
 */
export const LawmanWhy = () => (
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
      {whyLawman.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {whyLawman.intro}
    </p>

    <dl className="mt-10 flex max-w-measure flex-col">
      {whyLawman.items.map((item) => (
        <div key={item.lead} className="border-t border-separator py-6">
          <dt className={title({ size: "sm" })}>{item.lead}</dt>
          <dd className={prose({ className: "mt-3 text-muted" })}>
            {item.body}
          </dd>
        </div>
      ))}
    </dl>

    {/* Not muted, and not another `<dd>`: this is the conclusion the five
        entries above add up to, so it sits outside the list at full foreground
        contrast. */}
    <p className={prose({ className: "mt-4 max-w-measure" })}>
      {whyLawman.closing}
    </p>
  </Section>
);
