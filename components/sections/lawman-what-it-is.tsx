import { whatLawmanIs } from "@/content/lawman";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "what-lawman-is";

/**
 * What is Lawman. Prose at the reading measure, and the shortest section on the
 * page - three paragraphs whose order is the argument: what it is specialised
 * in, the single constraint everything follows from, then what it does with it.
 *
 * The middle paragraph carries the one emphasised clause in the whole of Part 1.
 * It is rendered as a `<strong>` at the same size as the text around it and in
 * `--foreground` rather than the muted body colour, so the emphasis reads as
 * weight and contrast rather than as a colour change.
 */
export const LawmanWhatItIs = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {whatLawmanIs.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {whatLawmanIs.opening}
    </p>

    <p className={prose({ className: "mt-5 max-w-measure text-muted" })}>
      {whatLawmanIs.constraint.before}
      <strong className="font-medium text-foreground">
        {whatLawmanIs.constraint.emphasis}
      </strong>
      {whatLawmanIs.constraint.after}
    </p>

    <p className={prose({ className: "mt-5 max-w-measure text-muted" })}>
      {whatLawmanIs.closing}
    </p>
  </Section>
);
