import { tntMeta } from "@/content/tnt";
import { TntApi } from "@/components/sections/tnt-api";
import { TntAudiences } from "@/components/sections/tnt-audiences";
import { TntConfidence } from "@/components/sections/tnt-confidence";
import { TntCost } from "@/components/sections/tnt-cost";
import { TntCta } from "@/components/sections/tnt-cta";
import { TntDeployment } from "@/components/sections/tnt-deployment";
import { TntFooterNotes } from "@/components/sections/tnt-footer-notes";
import { TntHero } from "@/components/sections/tnt-hero";
import { TntLanguages } from "@/components/sections/tnt-languages";
import { TntObjections } from "@/components/sections/tnt-objections";
import { TntProblem } from "@/components/sections/tnt-problem";
import { TntSpeed } from "@/components/sections/tnt-speed";
import { TntWhatItIs } from "@/components/sections/tnt-what-it-is";
import DefaultLayout from "@/layouts/default";

/**
 * T&T page - `docs/website-content.md` section 4.3, blocks A1 to A13 in order.
 * A0 is page metadata: it lives in `tntMeta` in `content/tnt.ts` with the rest
 * of the copy, and is wired into `<head>` rather than rendered. Nothing on this
 * page overrides it, so the page and the head cannot disagree.
 *
 * The order is the source's own and is also the argument: the problem, then
 * what the thing is, then the two claims that are safe to make (coverage and
 * confidence), then the two that are not yet (speed and cost), then how it
 * deploys, the contract, who it is for, the objections, and the ask. Do not
 * reorder it, and in particular do not move speed and cost ahead of coverage -
 * the sections that can stand on their figures come after the sections that can
 * stand without any.
 *
 * NO "READ THE TECHNICAL PLAN" BUTTON, in the hero or in A12, even though A0
 * and A12 both name it as the secondary CTA. No source document gives a URL for
 * the planning document set - A13 asserts the set is public while nothing names
 * where - and `siteConfig.links.github` points at this website's repository,
 * not at those documents. A button onto a document nobody can open is the one
 * kind of overclaim a page about calibrated honesty cannot make. It returns
 * when a URL exists, and until then A12's secondary link goes to `/about`.
 *
 * ELEVATION. Thirteen sections is more than alternation can carry on its own: a
 * strict s/b/s/b down thirteen bands reads as stripes rather than rhythm, and it
 * also lands A13 on `sunken` directly above the sunken site footer. So the page
 * alternates with one deliberate double - A6 and A7 share `base` and are
 * separated by a hairline instead of a rung, because they are one region of the
 * page: the two sections whose figures are held. That puts the amber twice in
 * one place rather than twice at random, and it lands the ending on sunken A12,
 * base A13, sunken footer.
 *
 *   sunken A1, base A2, sunken A3, base A4, sunken A5, base A6, base A7,
 *   sunken A8, base A9, sunken A10, base A11, sunken A12, base A13.
 */
export default function TntPage() {
  return (
    <DefaultLayout head={tntMeta}>
      {/* A1 */}
      <TntHero />
      {/* A2 */}
      <TntProblem />
      {/* A3 */}
      <TntWhatItIs />
      {/* A4 */}
      <TntLanguages />
      {/* A5 */}
      <TntConfidence />
      {/* A6 */}
      <TntSpeed />
      {/* A7 */}
      <TntCost />
      {/* A8 */}
      <TntDeployment />
      {/* A9 */}
      <TntApi />
      {/* A10 */}
      <TntAudiences />
      {/* A11 */}
      <TntObjections />
      {/* A12 */}
      <TntCta />
      {/* A13 */}
      <TntFooterNotes />
    </DefaultLayout>
  );
}
