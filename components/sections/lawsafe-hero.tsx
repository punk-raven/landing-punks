import { siteConfig } from "@/config/site";
import { lawsafeHero } from "@/content/lawsafe";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { StatusChip } from "@/components/status-chip";
import { eyebrow, prose, subtitle, title } from "@/components/primitives";

/**
 * Hero. The page's only `<h1>`, on sunken elevation - the anchor treatment the
 * hero and the site footer share. Not a dark band: in light mode this is a light
 * section.
 *
 * THE BOUNDARY LINE IS THE REASON THIS SECTION IS LONGER THAN `/lawman`'s. It
 * states, above the fold, that LawSafe is not counsel and that a qualified
 * advocate is what professional judgement comes from. §2b.8 is a legal-exposure
 * rule rather than a stylistic one, this is the most exposed page on the site,
 * and a citizen-facing legal product cannot leave that statement to a footer
 * disclaimer written at company level. It is also the human-review requirement
 * the definition of done asks for on both legal product pages.
 *
 * It is set in `--foreground` at body size against a `--border` left rule, not
 * in the muted colour and not in a tinted callout. A disclaimer that reads as
 * chrome is a disclaimer a reader skips, and the amber is not available for it -
 * §5.2 reserves that for uncertainty, and this sentence is not uncertain.
 *
 * The chip and the line beside it are the page-level status §2b.6 requires on
 * every product hero. No proof strip: there are no users, no advocates and no
 * source claims to put in one (§2b.2).
 */
export const LawsafeHero = () => (
  <Section elevation="sunken" spacing="lg">
    <p className={eyebrow()}>{lawsafeHero.eyebrow}</p>

    <h1 className={title({ className: "mt-4 max-w-[20ch]", size: "xl" })}>
      {lawsafeHero.headline}
    </h1>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {lawsafeHero.subheadline}
    </p>

    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <StatusChip status={lawsafeHero.status} />
      <p className="max-w-measure font-body text-sm leading-relaxed text-muted">
        {lawsafeHero.statusLine}
      </p>
    </div>

    <p
      className={prose({
        className: "mt-8 max-w-measure border-l border-border pl-5",
      })}
    >
      {lawsafeHero.boundary}
    </p>

    <div className="mt-10">
      {/* §2b.7: the only primary CTA on the site. */}
      <ButtonLink href={siteConfig.links.earlyAccess} size="lg">
        {lawsafeHero.primaryCta}
      </ButtonLink>
    </div>
  </Section>
);
