import { lawmanClosingCta } from "@/content/lawman";
import { Section } from "@/components/section";
import { subtitle, title } from "@/components/primitives";

const HEADING_ID = "lawman-closing";

/**
 * Closing section.
 *
 * IT NO LONGER CARRIES A BUTTON. Early access was withdrawn across the whole
 * site at Phase 7, so every "Request early access" is gone and
 * `siteConfig.links.earlyAccess` with them. This file is named `lawman-closing`
 * rather than `lawman-cta` for that reason: a component called `Cta` that
 * renders no call to action is exactly the kind of thing the next reader
 * believes. The section id moved off `early-access` for the same reason - it was
 * a fragment target for a link that no longer exists.
 *
 * What is left is the page's closing statement, and it still earns its place:
 * the heading is the status one last time in the site's own vocabulary, at the
 * point where a reader has finished the argument, and the supporting line is the
 * source's own closing. `content/lawman.ts` records why both are worded the way
 * they are.
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
  </Section>
);
