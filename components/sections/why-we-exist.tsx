import { whyWeExist } from "@/content/about";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "why-we-exist";

/**
 * C2. Why we exist.
 *
 * Straight prose at the reading measure, deliberately. The section is one
 * argument in three moves - the country has the demand, it does not have the
 * stack, we build the missing part - and breaking it into cards would turn a
 * chain of reasoning into three parallel assertions.
 *
 * The copy is de-numbered: see the comment on `whyWeExist.body` in
 * `content/about.ts` for what came out and why.
 */
export const WhyWeExist = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {whyWeExist.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {whyWeExist.body[0]}
    </p>

    {whyWeExist.body.slice(1).map((paragraph) => (
      <p
        key={paragraph}
        className={prose({ className: "mt-5 max-w-measure text-muted" })}
      >
        {paragraph}
      </p>
    ))}
  </Section>
);
