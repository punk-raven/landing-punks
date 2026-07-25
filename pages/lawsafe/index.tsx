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
 * §3.4 via the reviewed draft in `docs/copy/lawsafe-page-copy.md`, then written
 * against `docs/website-content.md` section 4.5, with the SEO strings from 6.2
 * and 6.3, the question-shaped headings and extractable answers from 7.1 and
 * 7.2, and the outbound contextual links from 8.2.
 *
 * This is the one page on the site that is adapted rather than transcribed; the
 * reasoning for every cut, and for each of the three resolved source conflicts
 * summarised below, is on `content/lawsafe.ts`.
 *
 * Six sections, in the order 4.5 and §3.4 both set: vision §1 to the hero, §2 to
 * the problem, §3 to the audiences, §4 to what it does, §6 to the principles, §5
 * condensed to the close. That order is also the argument - the problem before
 * the reader, the reader before the product, the product before the constraints
 * it is built under - and §6 has to come after §4 or the principles read as
 * disclaimers on a thing not yet described.
 *
 * ELEVATION. Strict alternation, no doubles: sunken hero, base problem, sunken
 * audiences, base "what it does", sunken principles, base close, with the sunken
 * site footer beneath. Every boundary is one OKLCh-L rung and the rhythm is
 * identical in both themes - a section changes elevation, never polarity. The
 * same shape `/lawman` and `/tnt` use.
 *
 * The alternation puts the principles on `sunken`, the anchor treatment shared
 * with the hero and the footer. On a citizen-facing legal product the section
 * that says "grounded or silent", "never a verdict" and "never a tout" is the
 * one worth anchoring.
 *
 * THREE SOURCE CONFLICTS, RESOLVED THE SPEC'S WAY (10.4). Each resolution is
 * recorded in full where the copy lives, because that is where it would be
 * undone:
 *
 *   1. LawSafe is a SIBLING of TNT and LawMan, not built on them. The hero
 *      eyebrow is bare "LawSafe" and `whatItDoes`'s "Where it sits" names both
 *      as PunkRaven's two pieces of infrastructure. See `lawsafeHero` and
 *      `whatItDoes` in `content/lawsafe.ts`.
 *
 *   2. Advocate verification is a DESIGN COMMITMENT, never a live roster. See
 *      `whatItDoes`'s shortlist, whose caveat is not optional, and principle 6.
 *
 *   3. Company incorporation, IP registration and MCA compliance are NOT named.
 *      See the second card of `whoItIsFor`.
 *
 * EVERY FIGURE IS HELD. 10.4 conflict 5: no verification owner has been named,
 * so the eleven statistics in vision §2 and the Tele-Law programme figures stay
 * off the page. The count of scheduled languages is not a held figure - 2.3
 * requires it written exactly as "22 scheduled Indian languages".
 *
 * This route is in `config/site.ts` `navItems`, alongside `/tnt` and `/lawman`.
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
