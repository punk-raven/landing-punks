import { siteConfig } from "@/config/site";
import { closingCta } from "@/content/home";
import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "early-access";

/**
 * B7. Final call to action.
 *
 * Sunken elevation, matching the hero and the site footer - the anchor
 * treatment, not a dark band. The primary CTA reads "Request early access" and nothing
 * else - §2b.7 rules out "Get your API key", "Start building", "Sign up" and
 * "Try it free", because there is no endpoint to hand out. It resolves through
 * `siteConfig.links.earlyAccess`, which points at this band until Phase 7 puts
 * the form here.
 */
export const CTABand = () => (
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
      {closingCta.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {closingCta.body}
    </p>

    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
      <ButtonLink href={siteConfig.links.earlyAccess} size="lg">
        {closingCta.primaryCta}
      </ButtonLink>
      <ButtonLink
        href={closingCta.secondaryCtaHref}
        size="lg"
        variant="outline"
      >
        {closingCta.secondaryCta}
      </ButtonLink>
    </div>

    <p className="mt-6 max-w-measure font-body text-sm leading-relaxed text-muted">
      {closingCta.microCopy}
    </p>
  </Section>
);
