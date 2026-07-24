import { tntWhatItIs } from "@/content/tnt";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "what-tnt-is";

/**
 * A3. What TNT is - two engines and the seam between them.
 *
 * The seam card deliberately carries no model identifier: it is the part that is
 * built rather than downloaded, and giving it a checkpoint name would flatten
 * the distinction the section exists to make.
 *
 * Model identifiers are set in the data face (§5.3: tables, code, API contract).
 */
export const TntWhatItIs = () => (
  <Section
    elevation="sunken"
    id={HEADING_ID}
    labelledBy={`${HEADING_ID}-heading`}
    spacing="lg"
  >
    <h2 className={title({ size: "lg" })} id={`${HEADING_ID}-heading`}>
      {tntWhatItIs.heading}
    </h2>

    <p className={subtitle({ className: "mt-6" })}>{tntWhatItIs.body}</p>

    <ul className="mt-12 grid gap-6 md:grid-cols-3">
      {tntWhatItIs.cards.map((card) => (
        <li
          key={card.heading}
          className="rounded-md border border-separator bg-surface p-6 text-surface-foreground"
        >
          <h3 className={title({ size: "sm" })}>{card.heading}</h3>
          {card.model ? (
            <p className="mt-3 break-words font-data text-xs leading-relaxed text-muted">
              {card.model}
            </p>
          ) : null}
          <p className={prose({ className: "mt-3 text-muted" })}>{card.body}</p>
        </li>
      ))}
    </ul>

    {/* border-border, not border-separator: the callout carries no fill, so its
        border is the sole definition of the component and SC 1.4.11's 3:1
        applies to it. */}
    <p
      className={prose({
        className: "mt-8 rounded-md border border-border p-5",
      })}
    >
      {tntWhatItIs.callout}
    </p>
  </Section>
);
