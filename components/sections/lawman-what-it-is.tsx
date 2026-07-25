import NextLink from "next/link";

import { whatLawmanIs } from "@/content/lawman";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "what-lawman-is";

/**
 * What is LawMan. Prose at the reading measure, and the shortest section on the
 * page - four paragraphs whose order is the argument: what the thing is, what it
 * is specialised in, the single constraint everything follows from, then what it
 * does with it.
 *
 * THE FIRST PARAGRAPH IS §7.2'S EXTRACTABLE ANSWER BLOCK AND NOTHING MAY BE PUT
 * ABOVE IT. It is published verbatim and it is self-contained, so an extractor
 * that lifts it alone still carries the status and an extractor that truncates
 * takes the top. It renders at `subtitle` size for that reason: it is the answer
 * to the heading, not an introduction to one.
 *
 * The third paragraph carries the one emphasised clause in the whole of the
 * source's running prose. It is rendered as a `<strong>` at the same size as the
 * text around it and in `--foreground` rather than the muted body colour, so the
 * emphasis reads as weight and contrast rather than as a colour change. It also
 * carries §8.2's one cleared outbound link from this page, anchored on "how
 * PunkRaven builds" and pointing at `/about`. That is the page's only outbound
 * contextual link: the §8.2 link to `/tnt` is gated on open question Q1 and is
 * not rendered anywhere on this route.
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
      {whatLawmanIs.answer}
    </p>

    <p className={prose({ className: "mt-5 max-w-measure text-muted" })}>
      {whatLawmanIs.specialisation}
    </p>

    <p className={prose({ className: "mt-5 max-w-measure text-muted" })}>
      {whatLawmanIs.constraint.before}
      <strong className="font-medium text-foreground">
        {whatLawmanIs.constraint.emphasis}
      </strong>
      {whatLawmanIs.constraint.afterLead}
      <NextLink
        className="font-medium text-accent underline underline-offset-4"
        href={whatLawmanIs.constraint.linkHref}
      >
        {whatLawmanIs.constraint.linkText}
      </NextLink>
      {whatLawmanIs.constraint.afterLink}
    </p>

    <p className={prose({ className: "mt-5 max-w-measure text-muted" })}>
      {whatLawmanIs.closing}
    </p>
  </Section>
);
