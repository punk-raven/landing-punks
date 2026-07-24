import { tntConfidence } from "@/content/tnt";
import { Section } from "@/components/section";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "honest-confidence";

/**
 * A5. Honest confidence - the section that states the company's whole thesis in
 * T&T's terms, and the reason the API returns more than a transcript.
 *
 * The response fields are set in the data face (§5.3). They are deliberately NOT
 * amber: a field that reports confidence is a designed part of the contract, not
 * an uncertain claim, and painting it amber would spend the signal on the thing
 * that carries the signal. The amber on this page marks held figures and the
 * lower quality tier, and nothing else.
 */
export const TntConfidence = () => (
  <Section
    elevation="sunken"
    id={HEADING_ID}
    labelledBy={`${HEADING_ID}-heading`}
    spacing="lg"
  >
    <h2
      className={title({ className: "max-w-[26ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {tntConfidence.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {tntConfidence.body}
    </p>

    <ul className="mt-10 flex max-w-measure flex-col">
      {tntConfidence.features.map((feature) => (
        <li
          key={feature.field}
          className="border-t border-separator py-4 font-body text-base leading-relaxed text-muted"
        >
          <span className="font-data text-sm text-foreground">
            {feature.field}
          </span>{" "}
          {feature.body}
        </li>
      ))}
    </ul>
  </Section>
);
