import { siteConfig } from "@/config/site";
import { hero } from "@/content/home";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { eyebrow, subtitle, title } from "@/components/primitives";

/**
 * B1. Hero.
 *
 * Sunken elevation - one rung below the page default, which is the anchor
 * treatment the hero, CTA and footer share. It is not a dark band: in light mode
 * this is a light section. This is also the page's only `<h1>`.
 *
 * The proof strip is four text claims (§2b.2). It is not a logo strip, a
 * testimonial row or a "trusted by" band, and it must never become one - there
 * are no customers. Every claim in it is structural: language coverage,
 * licensing, sourcing behaviour, deployment boundary. No figures.
 */
export const Hero = () => (
  <Section elevation="sunken" spacing="lg">
    <p className={eyebrow()}>{hero.eyebrow}</p>

    <h1 className={title({ className: "mt-4 max-w-[18ch]", size: "xl" })}>
      {hero.headline}
    </h1>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {hero.subheadline}
    </p>

    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* §2b.7: the only primary CTA on the site. */}
      <ButtonLink href={siteConfig.links.earlyAccess} size="lg">
        {hero.primaryCta}
      </ButtonLink>
      <ButtonLink href={hero.secondaryCtaHref} size="lg" variant="outline">
        {hero.secondaryCta}
      </ButtonLink>
    </div>

    <ul className="mt-14 grid gap-x-8 gap-y-4 border-t border-separator pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {hero.proof.map((claim) => (
        <li
          key={claim}
          className="flex items-start gap-2.5 font-body text-sm leading-relaxed text-muted"
        >
          {/* Teal, not amber: this is a claim we stand behind, not an
              uncertainty marker (§5.2). */}
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
