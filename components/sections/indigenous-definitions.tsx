import { indigenous } from "@/content/about";
import { Section } from "@/components/section";
import { subtitle, title } from "@/components/primitives";
import { BouncyAccordion } from "@/components/ui/bouncy-accordion";

const HEADING_ID = "what-indigenous-means";

/**
 * C3. What indigenous means here.
 *
 * The declarative `<h2>` is the section heading; the body beneath it runs full
 * width, matching the other section bodies on the site.
 *
 * Everything else is one full-width bouncy accordion (the same `BouncyAccordion`
 * the TNT FAQ uses). Section 7.1's question-shaped row is its first item and is
 * open by default, so `indigenous.answer` renders without a click and an
 * extractor lifting that one self-contained paragraph still gets a complete
 * answer. The five glossary terms follow as their own rows: one stacked row per
 * term, the term as the trigger and its definition as the panel body, so a
 * reader expands the ones they care about rather than scanning open definitions.
 * The accordion supplies its own ARIA (button trigger in a heading,
 * `role="region"` panel) plus its own text styling.
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

    <p className={subtitle({ className: "mt-6" })}>{indigenous.body}</p>

    <BouncyAccordion
      className="mt-10"
      defaultValue={indigenous.question}
      items={[
        {
          content: indigenous.answer,
          id: indigenous.question,
          title: indigenous.question,
        },
        ...indigenous.items.map((item) => ({
          content: item.body,
          id: item.term,
          title: item.term,
        })),
      ]}
    />
  </Section>
);
