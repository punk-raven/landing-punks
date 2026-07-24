import { commitments } from "@/content/about";
import { Section } from "@/components/section";
import { prose, title } from "@/components/primitives";

const HEADING_ID = "what-we-will-not-do";

/**
 * C6. What we will not do.
 *
 * Filled cards, where C3 above is an unfilled definition list. Both sections are
 * a column of bold lead-ins and the two must not read as the same component:
 * C3 defines terms, this one makes promises, and a promise gets a card it can
 * be pointed at.
 *
 * The fifth card is the not-a-law-firm commitment, and it is the reason this
 * section is not optional. The site footer carries the same disclaimer on every
 * route; this is where the company states it as a choice rather than a legal
 * notice.
 *
 * No amber anywhere in here. These are commitments we stand behind, not
 * uncertain claims, and spec §5.2 gives the amber exactly one meaning.
 */
export const Commitments = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {commitments.heading}
    </h2>

    <ul className="mt-10 grid gap-4 md:grid-cols-2">
      {commitments.items.map((commitment) => (
        <li
          key={commitment.heading}
          className="rounded-md border border-separator bg-surface p-6 text-surface-foreground"
        >
          <h3 className={title({ size: "sm" })}>{commitment.heading}</h3>
          <p className={prose({ className: "mt-3 text-muted" })}>
            {commitment.body}
          </p>
        </li>
      ))}
    </ul>
  </Section>
);
