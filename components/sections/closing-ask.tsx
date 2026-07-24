import { closingAsk } from "@/content/home";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "tell-us-about-the-workload";

/**
 * The closing ask - content spec 4.1 "Primary CTA".
 *
 * Sunken elevation, sitting directly above the equally sunken site footer, which
 * is why the footer draws its own top edge; see the note in
 * `components/site-footer.tsx`.
 *
 * It is named `closing-ask` rather than `cta-band` because the band it replaced
 * is a different section with different copy, and `git log` for
 * `pages/index.tsx` still recovers that one under its old name.
 *
 * The button is a `mailto:`, and its label says so. Heading, body, label,
 * destination and the micro-copy under the button all live in
 * `content/home.ts`, together with the reason the destination is an address
 * rather than the spec's proposed `/contact` route.
 *
 * THIS IS NOT EARLY ACCESS COMING BACK - there is no programme, no form and no
 * waiting list behind it. The full note is in `content/home.ts`.
 */
export const ClosingAsk = () => (
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
      {closingAsk.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {closingAsk.body}
    </p>

    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
      <ButtonLink href={closingAsk.ctaHref} size="lg" variant="primary">
        {closingAsk.ctaLabel}
      </ButtonLink>
    </div>

    <p className="mt-6 max-w-measure font-body text-sm leading-relaxed text-muted">
      {closingAsk.note}
    </p>
  </Section>
);
