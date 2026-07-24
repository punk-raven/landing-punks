import { tntObjections } from "@/content/tnt";
import { Section } from "@/components/section";
import { prose, title } from "@/components/primitives";

const HEADING_ID = "questions";

/**
 * A11. Objections and answers.
 *
 * Rendered open, as a `<dl>`, rather than as an accordion. Four of the six
 * answers state a limit - code-mixed speech is only partly handled, telephony
 * audio is harder, the CPU variant is too slow for live traffic, twelve of the
 * languages have higher error rates - and a company whose thesis is calibrated
 * honesty does not put its limits behind a click.
 */
export const TntObjections = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {tntObjections.heading}
    </h2>

    <dl className="mt-10 flex max-w-measure flex-col">
      {tntObjections.items.map((item) => (
        <div key={item.question} className="border-t border-separator py-6">
          <dt className={title({ size: "sm" })}>{item.question}</dt>
          <dd className={prose({ className: "mt-3 text-muted" })}>
            {item.answer}
          </dd>
        </div>
      ))}
    </dl>
  </Section>
);
