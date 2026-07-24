import { homeMeta } from "@/content/home";
import { Hero } from "@/components/sections/hero";
import { PrincipleList } from "@/components/sections/principle-list";
import { ProblemCards } from "@/components/sections/problem-cards";
import { ProductBlocks } from "@/components/sections/product-block";
import { StackDisplay } from "@/components/sections/stack-display";
import { StatusTable } from "@/components/sections/status-table";
import DefaultLayout from "@/layouts/default";

/**
 * Homepage - `docs/copy/punkraven-company-copy.md` Part B, B1 to B6 in order
 * (spec §3.3). B0 is page metadata and is wired into `<head>` rather than
 * rendered.
 *
 * B7 (the closing CTA band) was removed on request, and everything that only
 * existed for it went too rather than staying as dead code: `closingCta` in
 * `content/home.ts`, `components/sections/cta-band.tsx`, and B1's "Request
 * early access" button, which resolved against the `#early-access` id B7
 * carried. `git log` for this file is the way back.
 *
 * Phase 7 then withdrew early access across the whole site, so `/tnt`,
 * `/lawman`, `/lawsafe` and `/about` lost their buttons too and the site now
 * has no primary CTA anywhere. B6's "we are opening early access" sentence was
 * cut in the same pass; see the note where it used to live in `content/home.ts`.
 *
 * B8 (footer notes) is deliberately not built. The spec lists the homepage as
 * "B1 through B8", but unlike `/tnt`'s A13 - which §3.3 calls mandatory, not
 * optional - B8 carries no such marking. Nothing was lost by dropping it: the
 * one disclosure that is mandatory on every route, §2a.4's "not a law firm", is
 * carried independently by `components/site-footer.tsx`, and the other notes
 * qualified figures this page does not render (§2b.5 bars them) or restated
 * status the status table already shows. `/tnt` keeps its A13 notes.
 *
 * The order below is the argument, not a layout preference. §2a.1: a reader
 * decides what kind of company this is from the sequence, so the infrastructure
 * argument (B3's two-tier stack, then B4's T&T and Lawman blocks) has to land
 * before LawSafe appears at all. Do not reorder the sections, and do not move a
 * product ahead of the stack display.
 *
 * Elevation alternates to segment the page (§5.4): sunken hero, base problem,
 * sunken stack display, base products, sunken principles, base status. Every
 * boundary is one OKLCh-L rung (ΔL 0.048), and it is the same rhythm in both
 * themes - a section never changes polarity, only elevation.
 *
 * With B7 gone the page ends on a base status table, so the sunken footer sits
 * one rung below it and the boundary is carried by elevation. The footer still
 * draws its own top edge for the routes that end on a sunken section; see the
 * note in `components/site-footer.tsx`.
 */
export default function IndexPage() {
  return (
    <DefaultLayout head={homeMeta}>
      {/* B1 */}
      <Hero />
      {/* B2 */}
      <ProblemCards />
      {/* B3 */}
      <StackDisplay />
      {/* B4 */}
      <ProductBlocks />
      {/* B5 */}
      <PrincipleList />
      {/* B6 */}
      <StatusTable />
    </DefaultLayout>
  );
}
