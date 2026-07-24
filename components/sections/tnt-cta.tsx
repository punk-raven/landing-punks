import { siteConfig } from "@/config/site";
import { tntClosingCta } from "@/content/tnt";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "early-access";

/**
 * A12. Final call to action. Sunken elevation, matching the hero and the site
 * footer - the anchor treatment, not a dark band.
 *
 * The section id is `early-access` because `siteConfig.links.earlyAccess`
 * resolves to `#early-access` until Phase 7 builds the form. Every "Request
 * early access" on the site points at the same constant, so no CTA ever ships a
 * link that lands nowhere on the page it is on.
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
      <ButtonLink href={siteConfig.links.earlyAccess} size="lg">
        {tntClosingCta.primaryCta}
      </ButtonLink>
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
