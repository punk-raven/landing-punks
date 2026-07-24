import { lawsafeClosingCta } from "@/content/lawsafe";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "lawsafe-closing";

/**
 * Closing section - vision §5, condensed to one paragraph.
 *
 * THE BUTTON IS A `mailto:`, AND EARLY ACCESS IS STILL WITHDRAWN. Early access
 * was withdrawn across the whole site at Phase 7, so every "Request early
 * access" is gone and `siteConfig.links.earlyAccess` with them; the section id
 * moved off `early-access` at the same time, because it was a fragment target
 * for a link that no longer exists. What sits here now is 4.5's primary CTA
 * routed to the address in `config/site.ts`, because the `/contact` page it
 * names is Proposed and does not exist. The micro-copy under the button says
 * what pressing it does, so nobody discovers a mail client by surprise.
 *
 * The status is repeated here in words rather than as a second `StatusChip`, so
 * a screen reader does not announce the status twice on one page. It comes after
 * the button rather than before it: this is the last thing a reader sees on the
 * site's most exposed page, and it has to say the product is not built.
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

    <div className="mt-10 flex flex-col items-start gap-3">
      <ButtonLink
        aria-label={lawsafeClosingCta.cta.ariaLabel}
        href={lawsafeClosingCta.cta.href}
        size="lg"
        variant="primary"
      >
        {lawsafeClosingCta.cta.label}
      </ButtonLink>
      <p className="font-body text-sm leading-relaxed text-muted">
        {lawsafeClosingCta.cta.note}
      </p>
    </div>

    <p className="mt-10 max-w-measure font-body text-sm leading-relaxed text-muted">
      {lawsafeClosingCta.statusLine}
    </p>
  </Section>
);
