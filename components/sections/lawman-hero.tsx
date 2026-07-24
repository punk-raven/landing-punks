import { siteConfig } from "@/config/site";
import { lawmanHero } from "@/content/lawman";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { StatusChip } from "@/components/status-chip";
import { eyebrow, subtitle, title } from "@/components/primitives";

/**
 * Hero. The page's only `<h1>`, and sunken elevation - the anchor treatment the
 * hero and the site footer share. Not a dark band: in light mode this is a light
 * section.
 *
 * The status chip and the line beside it are the page-level status that Phase 5
 * accepts on, and they are the reason the rest of the page can stay in the
 * present indicative. `lawman-summary.md` opens with a note saying Lawman is
 * fully specified but not yet built and that all the copy below describes the
 * intended product; without that said plainly at the top, the page reads as a
 * description of a working system. The wording matches `/about` C7.
 *
 * No proof strip. `/tnt`'s hero has one because its own document supplies four
 * text claims; this document supplies none, and manufacturing four would be
 * fabricated social proof (§2b.2) rather than a layout decision.
 */
export const LawmanHero = () => (
  <Section elevation="sunken" spacing="lg">
    <p className={eyebrow()}>{lawmanHero.eyebrow}</p>

    <h1 className={title({ className: "mt-4 max-w-[20ch]", size: "xl" })}>
      {lawmanHero.headline}
    </h1>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {lawmanHero.subheadline}
    </p>

    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <StatusChip status={lawmanHero.status} />
      <p className="max-w-measure font-body text-sm leading-relaxed text-muted">
        {lawmanHero.statusLine}
      </p>
    </div>

    <div className="mt-10">
      {/* §2b.7: the only primary CTA on the site. */}
      <ButtonLink href={siteConfig.links.earlyAccess} size="lg">
        {lawmanHero.primaryCta}
      </ButtonLink>
    </div>
  </Section>
);
