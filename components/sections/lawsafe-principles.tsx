import { lawsafePrinciples } from "@/content/lawsafe";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "lawsafe-principles";

/**
 * Principles - vision §6. The north star, six principles, and the four things
 * the product will not do.
 *
 * An `<ol>` for the six, because the source numbers them, with the numerals not
 * printed - the same decision `PrincipleList` makes on `/`. Two columns at `md`.
 *
 * The refusals are a `<ul>` of filled cards below a rule, deliberately a
 * different component from the six above them. They are a different kind of
 * statement: the principles say what the product does, the refusals say what it
 * will never do even when it would pay to. `/about` C6 gives its commitments
 * cards for the same reason.
 *
 * No amber in this section, and none may be added. Every line here is a
 * commitment rather than an uncertain claim, and §5.2 gives the amber exactly
 * one meaning.
 */
export const LawsafePrinciples = () => (
  <Section
    elevation="sunken"
    id={HEADING_ID}
    labelledBy={`${HEADING_ID}-heading`}
    spacing="lg"
  >
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {lawsafePrinciples.northStar.heading}
    </h2>

    <p className={subtitle({ className: "mt-6" })}>
      {lawsafePrinciples.northStar.body}
    </p>

    <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
      {lawsafePrinciples.items.map((principle) => (
        <li key={principle.lead}>
          <h3 className={title({ size: "sm" })}>{principle.lead}</h3>
          <p className={prose({ className: "mt-3 text-muted" })}>
            {principle.body}
          </p>
        </li>
      ))}
    </ol>

    <h3 className={title({ className: "mt-16", size: "sm" })}>
      {lawsafePrinciples.willNotDo.heading}
    </h3>

    <ul className="mt-6 grid items-stretch gap-4 md:grid-cols-2">
      {lawsafePrinciples.willNotDo.items.map((item) => (
        <li
          key={item}
          className="h-full rounded-md border border-separator bg-surface p-5 text-surface-foreground"
        >
          <p className={prose({ className: "text-muted" })}>{item}</p>
        </li>
      ))}
    </ul>
  </Section>
);
