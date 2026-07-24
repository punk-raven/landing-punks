import { tntProblem } from "@/content/tnt";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "the-problem";

/**
 * A2. The problem. Three parallel failures, which is the one shape a card grid
 * is genuinely right for (§5.4 warns against cards for everything else).
 *
 * The third card is de-numbered: the source opens it with a competitor price per
 * audio-hour, and Part C holds that until it is re-verified on the day of
 * publication. See the comment on the card in `content/tnt.ts`.
 */
export const TntProblem = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`}>
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {tntProblem.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {tntProblem.body}
    </p>

    <ul className="mt-12 grid gap-6 md:grid-cols-3">
      {tntProblem.cards.map((card) => (
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
