import { tntClosingCta } from "@/content/tnt";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "tnt-closing";

/**
 * A12. Final call to action. Sunken elevation, matching the hero and the site
 * footer - the anchor treatment, not a dark band.
 *
 * THE PRIMARY BUTTON IS GONE. Early access was withdrawn across the site at
 * Phase 7, so this section keeps only its secondary link and the id moved off
 * `early-access`, which was the fragment target for a link that no longer
 * exists. This is still a call to action - unlike `/lawman` and `/lawsafe`,
 * which lost their only button and are named `*-closing` as a result.
 *
 * A12's secondary CTA in the copy is "Read the technical plan", and there is no
 * URL for the plan set anywhere in the sources. The secondary link goes to
 * `/about` instead, which is a page that exists and is the honest answer to the
 * question a reader has at this point: who is building this. When a plan URL
 * exists, this is where it goes.
 */
export const TntCta = () => (
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
      {tntClosingCta.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {tntClosingCta.body}
    </p>

    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
      <ButtonLink
        href={tntClosingCta.secondaryCtaHref}
        size="lg"
        variant="outline"
      >
        {tntClosingCta.secondaryCta}
      </ButtonLink>
    </div>

    <p className="mt-6 max-w-measure font-body text-sm leading-relaxed text-muted">
      {tntClosingCta.microCopy}
    </p>
  </Section>
);
