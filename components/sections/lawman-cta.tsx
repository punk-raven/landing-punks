import { siteConfig } from "@/config/site";
import { lawmanClosingCta } from "@/content/lawman";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "early-access";

/**
 * Closing call to action.
 *
 * The section id is `early-access` because `siteConfig.links.earlyAccess`
 * resolves to `#early-access` until Phase 7 builds the form. Both CTAs on this
 * page point at the same constant, so neither ever ships a link that lands
 * nowhere on the page it is on.
 *
 * One button, and its label is "Request early access" - the site's only primary
 * CTA (§2b.7). The source's closing line says "Get early access"; the divergence
 * and the reason for it are recorded on `lawmanClosingCta` in
 * `content/lawman.ts`. The rest of that line is kept as the supporting text
 * under the button rather than dropped.
 *
 * No secondary button. `/tnt`'s CTA offers `/about` alongside the ask; from here
 * the honest second destination would be the same page, and this section is
 * short enough that a second button would compete with the only one that
 * matters.
 *
 * Base elevation, against the sunken site footer directly below it - the same
 * boundary `/tnt` ends on. The last thing above the footer is a rung brighter
 * than the footer rather than continuous with it.
 */
export const LawmanCta = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {lawmanClosingCta.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {lawmanClosingCta.supporting}
    </p>

    <div className="mt-10">
      <ButtonLink href={siteConfig.links.earlyAccess} size="lg">
        {lawmanClosingCta.primaryCta}
      </ButtonLink>
    </div>
  </Section>
);
