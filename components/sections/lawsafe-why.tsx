import { whyLawsafeExists } from "@/content/lawsafe";
import { Section } from "@/components/section";
import { prose, title } from "@/components/primitives";

const HEADING_ID = "why-lawsafe-exists";

/**
 * Why LawSafe exists - vision §2, with every figure held.
 *
 * Prose at the reading measure, and nothing else. The source section is built on
 * eleven statistics and this one has none, so there is no chart, no stat row and
 * no pull-quote to carry it - a figure-shaped layout with no figures in it
 * advertises the absence. Three paragraphs and a closing line is what the
 * argument actually is once the measurements come out.
 *
 * The closing line is set at foreground weight rather than muted. It is the
 * source's founding conviction and the hinge of the page: everything after it
 * describes a product built to act on it.
 */
export const LawsafeWhy = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
    <h2
      className={title({ className: "max-w-[28ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {whyLawsafeExists.heading}
    </h2>

    {whyLawsafeExists.paragraphs.map((paragraph, index) => (
      <p
        key={paragraph}
        className={prose({
          className: `max-w-measure text-muted ${index === 0 ? "mt-8" : "mt-5"}`,
        })}
      >
        {paragraph}
      </p>
    ))}

    <p className={prose({ className: "mt-8 max-w-measure font-medium" })}>
      {whyLawsafeExists.closing}
    </p>
  </Section>
);
