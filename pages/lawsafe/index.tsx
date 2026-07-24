import { lawsafeMeta } from "@/content/lawsafe";
import { LawsafeClosing } from "@/components/sections/lawsafe-closing";
import { LawsafeHero } from "@/components/sections/lawsafe-hero";
import { LawsafePrinciples } from "@/components/sections/lawsafe-principles";
import { LawsafeWhatItDoes } from "@/components/sections/lawsafe-what-it-does";
import { LawsafeWho } from "@/components/sections/lawsafe-who";
import { LawsafeWhy } from "@/components/sections/lawsafe-why";
import DefaultLayout from "@/layouts/default";

/**
 * LawSafe page - adapted from `docs/copy/lawsafe-product-vision.md` per spec
 * §3.4, via the reviewed draft in `docs/copy/lawsafe-page-copy.md`. This is the
 * one page on the site that is adapted rather than transcribed; the reasoning
 * for every cut is on `content/lawsafe.ts`.
 *
 * Six sections, in the order §3.4 sets: vision §1 to the hero, §2 to the
 * problem, §3 to the audiences, §4 to what it does, §6 to the principles, §5
 * condensed to the close. That order is also the argument - the problem before
 * the reader, the reader before the product, the product before the constraints
 * it is built under - and §6 has to come after §4 or the principles read as
 * disclaimers on a thing not yet described.
 *
 * ELEVATION. Strict alternation, no doubles: sunken hero, base problem, sunken
 * audiences, base "what it does", sunken principles, base CTA, with the sunken
 * site footer beneath. Every boundary is one OKLCh-L rung and the rhythm is
 * identical in both themes - a section changes elevation, never polarity. The
 * same shape `/lawman` and `/tnt` use.
 *
 * The alternation puts the principles on `sunken`, the anchor treatment shared
 * with the hero and the footer. On a citizen-facing legal product the section
 * that says "grounded or silent", "never a verdict" and "never a tout" is the
 * one worth anchoring.
 *
 * The route is in `config/site.ts` `navItems` alongside `/tnt` and `/lawman`,
 * in the order §2a.1 requires, and both the header and the footer render from
 * that one list. §3.2 also asks for a nav flyout; there is none, and the flat
 * list is the deliberate answer - a flyout for three items is machinery this
 * site does not need.
 */
export default function LawsafePage() {
  return (
    <DefaultLayout head={lawsafeMeta}>
      <LawsafeHero />
      <LawsafeWhy />
      <LawsafeWho />
      <LawsafeWhatItDoes />
      <LawsafePrinciples />
      <LawsafeClosing />
    </DefaultLayout>
  );
}
