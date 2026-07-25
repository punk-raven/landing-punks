import { hero } from "@/content/home";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/button";
import { Section } from "@/components/section";
import { eyebrow, subtitle, title } from "@/components/primitives";

/**
 * B1. Hero.
 *
 * Sunken elevation - one rung below the page default, which is the anchor
 * treatment the hero and footer share. It is not a dark band: in light mode
 * this is a light section. This is also the page's only `<h1>`.
 *
 * The hero fills the viewport (`min-h-[100svh]`, the small-viewport unit so
 * mobile browser chrome does not push it into overflow) and centres its content
 * vertically. Elevation still divides it from the section below on toggle.
 *
 * The legal disclaimer lives here now, below the description. It is the §2a.4
 * mandated "not a law firm" line, moved off the footer by owner decision so it
 * sits on the homepage only; see the note in `components/site-footer.tsx`.
 *
 * There is no primary CTA here. B7 carried this page's `#early-access` target
 * and was removed, so the button was removed with it rather than repointed at
 * another route - `/` no longer asks for early access anywhere.
 */
export const Hero = () => (
  <Section
    className="flex min-h-[100svh] flex-col justify-center"
    elevation="sunken"
    spacing="lg"
  >
    <p className={eyebrow()}>{hero.eyebrow}</p>

    <h1 className={title({ className: "mt-4 max-w-[18ch]", size: "xl" })}>
      {hero.headline}
    </h1>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {hero.subheadline}
    </p>

    <p className="mt-6 max-w-measure font-body text-sm text-muted">
      {siteConfig.name} builds software. It does not provide legal services and
      is not a law firm.
    </p>

    <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
      <ButtonLink href={hero.secondaryCtaHref} size="lg" variant="outline">
        {hero.secondaryCta}
      </ButtonLink>
    </div>
  </Section>
);
