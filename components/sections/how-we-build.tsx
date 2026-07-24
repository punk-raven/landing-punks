import { howWeBuild } from "@/content/about";
import { Section } from "@/components/section";
import { prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "how-we-build";

/**
 * C4. How we build.
 *
 * Prose, and the order of the paragraphs is the argument: the belief, then the
 * published evidence that the alternative fails, then what we do instead, then
 * what that costs us. The failure mode is named before the fix, which is the
 * house voice.
 *
 * The copy is de-numbered - the study attribution and the fluent-wrongness
 * argument stay, the hallucination rates and the two named commercial products
 * do not. See the comment on `howWeBuild.body` in `content/about.ts`.
 *
 * Nothing here is amber. This section is about uncertainty as a design
 * principle, not about an uncertain claim, and spec §5.2 reserves the amber for
 * the second thing - it reaches this page only through the status chips in C7.
 */
export const HowWeBuild = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {howWeBuild.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {howWeBuild.body[0]}
    </p>

    {howWeBuild.body.slice(1).map((paragraph) => (
      <p
        key={paragraph}
        className={prose({ className: "mt-5 max-w-measure text-muted" })}
      >
        {paragraph}
      </p>
    ))}
  </Section>
);
