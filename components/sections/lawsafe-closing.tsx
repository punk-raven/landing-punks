import { lawsafeClosingCta } from "@/content/lawsafe";
import { Section } from "@/components/section";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "lawsafe-closing";

/**
 * Closing section - vision §5, condensed to one paragraph.
 *
 * IT NO LONGER CARRIES A BUTTON. Early access was withdrawn across the whole
 * site at Phase 7, so every "Request early access" is gone and
 * `siteConfig.links.earlyAccess` with them. This file is named `lawsafe-closing`
 * rather than `lawsafe-cta` for that reason: a component called `Cta` that
 * renders no call to action misleads the next reader. The section id moved off
 * `early-access` for the same reason - it was a fragment target for a link that
 * no longer exists.
 *
 * The status is repeated here in words rather than as a second `StatusChip`, so
 * a screen reader does not announce the status twice on one page. It matters
 * more now than it did with a button under it: this is the last thing a reader
 * sees on the site's most exposed page, and it has to say the product is not
 * built.
 *
 * Base elevation against the sunken site footer below it, which is the boundary
 * `/tnt` and `/lawman` both end on.
 */
export const LawsafeClosing = () => (
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
  </Section>
);
