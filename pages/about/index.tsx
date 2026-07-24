import { AboutHero } from "@/components/sections/about-hero";
import { AboutStatus } from "@/components/sections/about-status";
import { Commitments } from "@/components/sections/commitments";
import { HowWeBuild } from "@/components/sections/how-we-build";
import { IndigenousDefinitions } from "@/components/sections/indigenous-definitions";
import { TheName } from "@/components/sections/the-name";
import { WhatWeAreBuilding } from "@/components/sections/what-we-are-building";
import { WhyWeExist } from "@/components/sections/why-we-exist";
import { aboutMeta } from "@/content/about";
import DefaultLayout from "@/layouts/default";

/**
 * About page - `docs/website-content.md` section 4.2, blocks C1 to C8 in order.
 *
 * A composition file. Every string lives in `content/about.ts` and every piece
 * of markup in `components/sections/`, which is the arrangement the rest of the
 * site uses; this file's whole job is the order of the sections and the layout
 * they sit in.
 *
 * The page has one job beyond describing the company: a reader who finishes it
 * must know PunkRaven is a technology company. Section 2.1 makes that the rule
 * that overrides the others, and the sequence below is how it is enforced - why
 * the layers are missing (C2), what building them properly means (C3), how we
 * build (C4), and only then what the products are (C5), with law arriving as the
 * hardest available test rather than as the subject. Within C5 the order is
 * T&T, Lawman, LawSafe: infrastructure before application. Do not reorder these.
 *
 * Three rules bind every string on this page, and all three are enforced in
 * `content/about.ts` where the strings are.
 *
 *   Section 2.1 - PunkRaven is a technology company. Law appears only as the
 *     hardest available test of a grounded system, never as what the company is
 *     for. C5 names T&T's non-legal buyers for exactly this reason.
 *
 *   Section 2.3 - no figures. C2 and C4 are written with numbers in the source
 *     copy and are de-numbered; every held figure is gated on a verification
 *     owner who has not been named. "22 scheduled languages" in C3 is the one
 *     permitted figure and must stay exact, and the 2024 statute year is a fact
 *     about the corpus rather than a measurement.
 *
 *   Section 2.5 - no sentence over 40 words, no paragraph over 5 sentences.
 *
 * Elevation alternates to segment the page: sunken hero, base C2, sunken C3,
 * base C4, sunken C5, base C6, sunken C7, base C8, with the site footer sunken
 * again beneath it. Each section owns its own elevation, so reordering the list
 * below breaks the rhythm. Every boundary is one OKLCh-L rung, and it is the
 * same rhythm in both themes - a section changes elevation, never polarity.
 */
export default function AboutPage() {
  return (
    <DefaultLayout head={aboutMeta}>
      <AboutHero />
      <WhyWeExist />
      <IndigenousDefinitions />
      <HowWeBuild />
      <WhatWeAreBuilding />
      <Commitments />
      <AboutStatus />
      <TheName />
    </DefaultLayout>
  );
}
