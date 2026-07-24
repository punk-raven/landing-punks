import { siteConfig } from "@/config/site";
import { lawsafeClosingCta } from "@/content/lawsafe";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "early-access";

/**
 * Closing call to action - vision §5, condensed to one paragraph.
 *
 * The section id is `early-access` because `siteConfig.links.earlyAccess`
 * resolves to `#early-access` until Phase 7 builds the form. Both CTAs on this
 * page point at that constant, so neither ships a link that lands nowhere.
 *
 * The status is repeated in words directly above the button, at the point where
 * a reader is deciding whether to ask for access - and it is words rather than a
 * second `StatusChip`, so a screen reader does not announce the status twice on
 * one page. `/lawman` closes the same way.
 *
 * Base elevation against the sunken site footer below it, which is the boundary
 * `/tnt` and `/lawman` both end on.
 */
export const LawsafeCta = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {lawsafeClosingCta.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {lawsafeClosingCta.supporting}
    </p>

    <p className="mt-8 max-w-measure font-body text-sm leading-relaxed text-muted">
      {lawsafeClosingCta.statusLine}
    </p>

    <div className="mt-8">
      <ButtonLink href={siteConfig.links.earlyAccess} size="lg">
        {lawsafeClosingCta.primaryCta}
      </ButtonLink>
    </div>
  </Section>
);
