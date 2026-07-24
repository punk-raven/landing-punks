import { theName } from "@/content/about";
import { Section } from "@/components/section";
import { prose, title } from "@/components/primitives";

const HEADING_ID = "the-name";

/**
 * C8. The name.
 *
 * Marked optional in the copy doc - "the first thing that should go" if the page
 * runs long. Kept, and set short and quiet at the foot of the page: it is four
 * lines, it is the only place the brand is explained, and both halves of the
 * gloss restate the page's argument rather than decorating it.
 *
 * A `<dl>` again, like C3, but two entries of one line each rather than five
 * rule-topped blocks - at this size the term reads as part of the sentence it
 * opens, which is how the copy is written.
 */
export const TheName = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="sm">
    <h2 className={title({ size: "md" })} id={`${HEADING_ID}-heading`}>
      {theName.heading}
    </h2>

    <dl className="mt-6 flex max-w-measure flex-col gap-3">
      {theName.items.map((item) => (
        <div key={item.term} className={prose({ className: "text-muted" })}>
          <dt className="inline font-display font-semibold text-foreground">
            {item.term}
          </dt>{" "}
          <dd className="inline">{item.body}</dd>
        </div>
      ))}
    </dl>

    <p className={prose({ className: "mt-5 max-w-measure text-muted" })}>
      {theName.closing}
    </p>
  </Section>
);
