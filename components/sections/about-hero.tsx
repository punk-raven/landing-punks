import { aboutHero } from "@/content/about";
import { Section } from "@/components/section";
import { eyebrow, subtitle, title } from "@/components/primitives";

/**
 * C1. About hero.
 *
 * Sunken elevation, matching the homepage hero - one rung below the page
 * default, the anchor treatment. Not a dark band: in light mode this is a light
 * section. The page's only `<h1>`.
 *
 * No proof strip here, unlike the homepage. C1 supplies none, and inventing one
 * would mean either repeating the homepage's four claims or manufacturing new
 * ones - and Part E's "no fake social proof" covers manufactured claims as much
 * as it covers logos.
 */
export const AboutHero = () => (
  <Section elevation="sunken" spacing="lg">
    <p className={eyebrow()}>{aboutHero.eyebrow}</p>

    <h1 className={title({ className: "mt-4 max-w-[18ch]", size: "xl" })}>
      {aboutHero.headline}
    </h1>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {aboutHero.subheadline}
    </p>
  </Section>
);
