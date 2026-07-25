import { lawmanClosingCta } from "@/content/lawman";
import { Section } from "@/components/section";
import { button, prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "lawman-closing";

/**
 * Closing section, and the site's first conversion action.
 *
 * THE BUTTON IS A `mailto:`, NOT A ROUTE. §4.4 names the primary CTA "Tell us
 * about the corpus" pointing at `/contact`, but `/contact` is only proposed in
 * §3.2 and does not exist, and linking a dead route is worse than not linking
 * one. So the destination is `siteConfig.links.email`, composed once in
 * `content/lawman.ts`, the label names what the click actually does, and the
 * address is printed as micro-copy underneath so it is usable without a mail
 * client. When `/contact` ships, the destination moves there and the label
 * becomes §4.4's.
 *
 * Early access is not what this section asks for. It was withdrawn across the
 * whole site at Phase 7 along with `siteConfig.links.earlyAccess`, and no
 * waitlist, beta or launch date replaces it. This file is named `lawman-closing`
 * rather than `lawman-cta` from that period; the name is kept because the
 * section id `lawman-closing` is a live fragment target.
 *
 * `mailto:` opens a mail client rather than a document, so the anchor gets
 * neither `target="_blank"` - which would leave an empty tab behind - nor `rel`,
 * the same call `components/social-links.tsx` makes. It is a plain `<a>` dressed
 * with the `button` recipe rather than a `next/link`, because there is no client
 * route to prefetch.
 *
 * There is no status chip here and no second `StatusChip` on the page. The
 * heading says in words what the chip in the hero says as a label, and pairing
 * the chip with a heading that already reads "Specified" would have a screen
 * reader announce the same word twice in a row.
 *
 * Base elevation, against the sunken site footer directly below it - the same
 * boundary `/tnt` and `/lawsafe` end on.
 */
export const LawmanClosing = () => (
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

    <p className={prose({ className: "mt-5 max-w-measure text-muted" })}>
      {lawmanClosingCta.body}
    </p>

    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
      <a
        className={button({ size: "lg", variant: "primary" })}
        href={lawmanClosingCta.ctaHref}
      >
        {lawmanClosingCta.ctaLabel}
      </a>
    </div>
  </Section>
);
