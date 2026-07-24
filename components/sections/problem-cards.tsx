import { problem } from "@/content/home";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "the-problem";

/**
 * B2. The problem.
 *
 * The only place on the page where a card grid is the right shape - the copy is
 * written as three parallel failures, and spec §5.4 warns against using cards
 * for everything else.
 */
export const ProblemCards = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`}>
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {problem.heading}
    </h2>

    <p className={subtitle({ className: "mt-6" })}>{problem.body}</p>

    <ul className="mt-12 grid gap-6 md:grid-cols-3">
      {problem.cards.map((card) => (
        <li
          key={card.heading}
          className="rounded-md border border-separator bg-surface p-6 text-surface-foreground"
        >
          <h3 className={title({ size: "sm" })}>{card.heading}</h3>
          <p className={prose({ className: "mt-3 text-muted" })}>{card.body}</p>
        </li>
      ))}
    </ul>
  </Section>
);
