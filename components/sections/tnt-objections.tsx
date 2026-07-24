import { tntObjections } from "@/content/tnt";
import { Section } from "@/components/section";
import { BouncyAccordion } from "@/components/ui/bouncy-accordion";
import { title } from "@/components/primitives";

const HEADING_ID = "questions";

/**
 * A11. Objections and answers.
 *
 * Rendered through the Bouncy Accordion (components/ui/bouncy-accordion): each
 * question is a collapsible trigger and its answer is the spring-animated panel.
 * Four of the six answers state a limit - code-mixed speech is only partly
 * handled, telephony audio is harder, the CPU variant is too slow for live
 * traffic, twelve of the languages have higher error rates. The first item
 * defaults open so the section reads as answered rather than empty on load; the
 * rest collapse. Full width - no `max-w-measure` - so the panels span the
 * section band rather than a reading column.
 */
export const TntObjections = () => {
  const items = tntObjections.items.map((item) => ({
    content: item.answer,
    id: item.question,
    title: item.question,
  }));

  return (
    <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
      <h2
        className={title({ className: "max-w-[24ch]", size: "lg" })}
        id={`${HEADING_ID}-heading`}
      >
        {tntObjections.heading}
      </h2>

      <BouncyAccordion
        className="mt-10"
        defaultValue={items[0]?.id ?? null}
        items={items}
      />
    </Section>
  );
};
