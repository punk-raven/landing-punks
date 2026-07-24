import { tntClosingCta } from "@/content/tnt";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "tnt-closing";

/**
 * A12. Final call to action. Sunken elevation, matching the hero and the site
 * footer - the anchor treatment, not a dark band.
 *
 * THE PRIMARY BUTTON IS NOT EARLY ACCESS. Early access was withdrawn across the
 * site at Phase 7 and none of it returns with this button: no list, no form, no
 * queue, no date. The id moved off `early-access` at the same time, that having
 * been the fragment target for a link which no longer exists. What stands here
 * instead is the address already in `config/site.ts`, exposed elsewhere only as
 * an unlabelled icon. The label names the click rather than implying a page,
 * and the micro-copy prints the address so the reader knows where it goes
 * before pressing it. Label and href both live in `content/tnt.ts`, so the
 * whole section reads from one place - unlike `/lawman` and `/lawsafe`, which
 * lost their only button and are named `*-closing` as a result.
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
        href={tntClosingCta.primaryCtaHref}
        size="lg"
        variant="primary"
      >
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
      {tntClosingCta.microCopy} {tntClosingCta.microCopyAddress}
    </p>
  </Section>
);
