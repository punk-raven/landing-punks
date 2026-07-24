import { aboutMeta } from "@/content/about";
import { AboutHero } from "@/components/sections/about-hero";
import { AboutStatus } from "@/components/sections/about-status";
import { Commitments } from "@/components/sections/commitments";
import { HowWeBuild } from "@/components/sections/how-we-build";
import { IndigenousDefinitions } from "@/components/sections/indigenous-definitions";
import { TheName } from "@/components/sections/the-name";
import { WhatWeAreBuilding } from "@/components/sections/what-we-are-building";
import { WhyWeExist } from "@/components/sections/why-we-exist";
import DefaultLayout from "@/layouts/default";

/**
 * About page - `docs/copy/punkraven-company-copy.md` Part C, C1 to C8 in order.
 * C0 is page metadata and is wired into `<head>` rather than rendered.
 *
 * The page has one job beyond describing the company: a reader who finishes it
 * must know PunkRaven is a technology company. Part E makes that the rule that
 * overrides the others, and the sequence below is how it is enforced - why the
 * layers are missing (C2), what building them properly means (C3), how we build
 * (C4), and only then what the products are (C5), with law arriving as the
 * hardest available test rather than as the subject. Within C5 the order is
 * T&T, Lawman, LawSafe: infrastructure before application. Do not reorder these.
 *
 * Elevation alternates to segment the page: sunken hero, base C2, sunken C3,
 * base C4, sunken C5, base C6, sunken C7, base C8, with the site footer sunken
 * again beneath it. Every boundary is one OKLCh-L rung, and it is the same
 * rhythm in both themes - a section changes elevation, never polarity.
 */
export default function AboutPage() {
  return (
    <DefaultLayout head={aboutMeta}>
      {/* C1 */}
      <AboutHero />
      {/* C2 */}
      <WhyWeExist />
      {/* C3 */}
      <IndigenousDefinitions />
      {/* C4 */}
      <HowWeBuild />
      {/* C5 */}
      <WhatWeAreBuilding />
      {/* C6 */}
      <Commitments />
      {/* C7 */}
      <AboutStatus />
      {/* C8 */}
      <TheName />
    </DefaultLayout>
  );
}
