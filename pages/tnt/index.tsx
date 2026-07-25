import { tntMeta } from "@/content/tnt";
import { TntAudiences } from "@/components/sections/tnt-audiences";
import { TntConfidence } from "@/components/sections/tnt-confidence";
import { TntCost } from "@/components/sections/tnt-cost";
import { TntCta } from "@/components/sections/tnt-cta";
import { TntDeployment } from "@/components/sections/tnt-deployment";
import { TntHero } from "@/components/sections/tnt-hero";
import { TntLanguages } from "@/components/sections/tnt-languages";
import { TntObjections } from "@/components/sections/tnt-objections";
import { TntProblem } from "@/components/sections/tnt-problem";
import { TntSpeed } from "@/components/sections/tnt-speed";
import { TntWhatItIs } from "@/components/sections/tnt-what-it-is";
import DefaultLayout from "@/layouts/default";
import { notoVariableClasses } from "@/config/fonts-tnt";

/**
 * TNT page - `docs/website-content.md` section 4.3, drawn from blocks A1 to A12.
 * A0 is page metadata: it lives in `tntMeta` in `content/tnt.ts` with the rest
 * of the copy, and is wired into `<head>` rather than rendered. Nothing on this
 * page overrides it, so the page and the head cannot disagree. Two source blocks
 * are gone: A9 (the API contract) was cut, and A13 (the footer notes) was cut
 * with it because one of its notes claimed the planning documents are public and
 * they are not.
 *
 * The order is the argument: the problem, then what the thing is, then the two
 * claims that are safe to make (coverage and confidence), then speed, how it
 * deploys, and cost, then who it is for, the objections, and the ask. Do not
 * move speed or cost ahead of coverage - the sections that would have stood on
 * their figures come after the sections that stand without any.
 *
 * NO "READ THE TECHNICAL PLAN" BUTTON, in the hero or in A12, even though A0
 * and A12 both name it as the secondary CTA. No source document gives a URL for
 * the planning document set, and `siteConfig.links.github` points at this
 * website's repository, not at those documents. A button onto a document nobody
 * can open is the one kind of overclaim a page about calibrated honesty cannot
 * make. It returns when a URL exists, and until then A12's secondary link goes
 * to `/about`.
 *
 * ELEVATION. Eleven sections, in plain sunken/base alternation with no doubles.
 * The old A6-A7 double had a reason - two held-figure sections sharing a rung -
 * and that reason is gone now the held-figure markers are, so it is normalised.
 * Eleven bands starting sunken land the last one, A12, on sunken directly above
 * the sunken site footer: that is the sanctioned closing anchor, not a bug - the
 * footer draws its own `border-t border-border` for exactly this case.
 *
 *   sunken A1, base A2, sunken A3, base A4, sunken A5, base A6, sunken A8,
 *   base A7, sunken A10, base A11, sunken A12, sunken footer.
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
      {/* A4 - the wrapper carries the eleven page-scoped Noto `.variable`
          classes so the native-script endonyms in this section resolve to a
          real face instead of tofu. Importing the module here is also what
          makes next/font emit its CSS at all in the pages router. */}
      <div className={notoVariableClasses}>
        <TntLanguages />
      </div>
      {/* A5 */}
      <TntConfidence />
      {/* A6 */}
      <TntSpeed />
      {/* A8 */}
      <TntDeployment />
      {/* A7 */}
      <TntCost />
      {/* A10 */}
      <TntAudiences />
      {/* A11 */}
      <TntObjections />
      {/* A12 */}
      <TntCta />
    </DefaultLayout>
  );
}
