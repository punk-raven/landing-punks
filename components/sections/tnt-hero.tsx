import { siteConfig } from "@/config/site";
import { tntHero } from "@/content/tnt";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { StatusChip } from "@/components/status-chip";
import { ScriptColumn } from "@/components/ui/script-column";
import { eyebrow, subtitle, title } from "@/components/primitives";

/**
 * A1. Hero. The page's only `<h1>`, and sunken elevation - the anchor treatment
 * the hero, the CTA and the site footer share.
 *
 * Two things here are not decoration.
 *
 * The status chip and the line beside it are Part C's own mitigation against the
 * single largest risk in this copy: "present-tense phrasing about a module that
 * is still at planning stage". The whole page below reads as a description of a
 * working service unless the top of it says plainly that the service does not
 * run yet. It uses the same words as `/about` C7.
 *
 * `<ScriptColumn />` is the §5.5 block. It renders NOTHING today and reserves no
 * space - the nine Indic strings come from a native reader and nothing may be
 * machine-translated. Read the comment in `components/ui/script-column.tsx`
 * before touching it; it is a data edit when the strings arrive, not a markup
 * edit, and the nine Noto faces have to land with them.
 *
 * A0's secondary CTA, "Read the technical plan", is absent on purpose: no source
 * document supplies a URL for the plan set, and a button that navigates nowhere
 * is worse than one less button. The proof strip is four text claims and must
 * never become a logo strip - there are no customers.
 */
export const TntHero = () => (
  <Section elevation="sunken" spacing="lg">
    <p className={eyebrow()}>{tntHero.eyebrow}</p>

    <h1 className={title({ className: "mt-4 max-w-[20ch]", size: "xl" })}>
      {tntHero.headline}
    </h1>

    <ScriptColumn />

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {tntHero.subheadline}
    </p>

    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <StatusChip status={tntHero.status} />
      <p className="max-w-measure font-body text-sm leading-relaxed text-muted">
        {tntHero.statusLine}
      </p>
    </div>

    <div className="mt-10">
      {/* §2b.7: the only primary CTA on the site. */}
      <ButtonLink href={siteConfig.links.earlyAccess} size="lg">
        {tntHero.primaryCta}
      </ButtonLink>
    </div>

    <ul className="mt-14 grid gap-x-8 gap-y-4 border-t border-separator pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {tntHero.proof.map((claim) => (
        <li
          key={claim}
          className="flex items-start gap-2.5 font-body text-sm leading-relaxed text-muted"
        >
          {/* Teal, not amber: these are claims we stand behind. The amber on
              this page marks the figures we are holding (§5.2). */}
          <span
            aria-hidden="true"
            className="mt-2 size-1.5 shrink-0 rounded-full bg-sheen-alt"
          />
          {claim}
        </li>
      ))}
    </ul>
  </Section>
);
