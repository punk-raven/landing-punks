import { howLawmanWorks } from "@/content/lawman";
import { Section } from "@/components/section";
import { prose, title } from "@/components/primitives";

const HEADING_ID = "how-lawman-works";

/**
 * How it works - ten design decisions.
 *
 * Filled cards on a two-column grid, where the section above is a narrow
 * single-column definition list. The two sections are adjacent and the same
 * shape in the source, and the split is what stops the page reading as one list
 * of fifteen items; see the note in `lawman-why.tsx`. These ten are independent
 * of one another - a reader can enter the grid anywhere and take one - which is
 * what a card is for and what the accumulating argument above is not.
 *
 * The order is the source's and is not alphabetical or grouped. It runs from
 * what the system does before it answers, through what it does while answering,
 * to what it does when it cannot - ending on the human who signs. That last card
 * is a design decision rather than a disclaimer, and it is the same boundary the
 * site footer states on every route: PunkRaven builds software, LawMan
 * researches and drafts, a qualified person takes responsibility.
 */
export const LawmanHowItWorks = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {howLawmanWorks.heading}
    </h2>

    <ul className="mt-10 grid gap-4 md:grid-cols-2">
      {howLawmanWorks.items.map((item) => (
        <li
          key={item.lead}
          className="rounded-md border border-separator bg-surface p-6 text-surface-foreground"
        >
          <h3 className={title({ size: "sm" })}>{item.lead}</h3>
          <p className={prose({ className: "mt-3 text-muted" })}>{item.body}</p>
        </li>
      ))}
    </ul>
  </Section>
);
