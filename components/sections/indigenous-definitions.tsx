import { indigenous } from "@/content/about";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "what-indigenous-means";

/**
 * C3. What indigenous means here.
 *
 * A real `<dl>`, because the copy is a glossary: five terms and what each one
 * means concretely. The markup says so, and a screen-reader user gets the
 * term/definition pairing rather than five unrelated headings.
 *
 * Treated as rule-topped, unfilled entries on purpose. C6 further down the page
 * is also a list of six bold lead-ins, and the two must not read as the same
 * component: this one is definitions and takes a hairline above each term, C6 is
 * commitments and takes a filled card. The distinction is what stops the page
 * turning into one long undifferentiated list.
 */
export const IndigenousDefinitions = () => (
  <Section
    elevation="sunken"
    id={HEADING_ID}
    labelledBy={`${HEADING_ID}-heading`}
    spacing="lg"
  >
    <h2
      className={title({ className: "max-w-[26ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {indigenous.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {indigenous.body}
    </p>

    <dl className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
      {indigenous.items.map((item) => (
        <div key={item.term} className="border-t border-separator pt-5">
          <dt className={title({ size: "sm" })}>{item.term}</dt>
          <dd className={prose({ className: "mt-3 text-muted" })}>
            {item.body}
          </dd>
        </div>
      ))}
    </dl>
  </Section>
);
