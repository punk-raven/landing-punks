import { principles } from "@/content/home";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "how-we-build";

/**
 * B5. How we build - the six rules.
 *
 * An ordered list, because the copy is a numbered set, but the numerals are not
 * printed: this page shows no figures beyond plain structural facts (§2b.5),
 * and a column of large digits reads as data. The count is already stated in
 * the heading.
 */
export const PrincipleList = () => (
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
      {principles.heading}
    </h2>

    <p className={subtitle({ className: "mt-6" })}>{principles.body}</p>

    <ol className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
      {principles.items.map((principle) => (
        <li key={principle.heading}>
          <h3 className={title({ size: "sm" })}>{principle.heading}</h3>
          <p className={prose({ className: "mt-3 text-muted" })}>
            {principle.body}
          </p>
        </li>
      ))}
    </ol>
  </Section>
);
