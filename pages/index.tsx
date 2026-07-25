import { homeMeta } from "@/content/home";
import { Hero } from "@/components/sections/hero";
import { PrincipleList } from "@/components/sections/principle-list";
import { ProblemCards } from "@/components/sections/problem-cards";
import { ProductBlocks } from "@/components/sections/product-block";
import { StackDisplay } from "@/components/sections/stack-display";
import { StatusTable } from "@/components/sections/status-table";
import DefaultLayout from "@/layouts/default";

/**
 * Homepage - `docs/website-content.md` 4.1, sections B1 to B6 in order. The
 * section IDs and the `§` references in the older comments point at
 * `docs/punkraven-site-build-instructions.md`, which uses different numbering to
 * the content spec; the two are not interchangeable.
 *
 * This file is a composition file. Copy lives in `content/home.ts` and markup in
 * `components/sections/*`; nothing on the page should be authored inline here.
 *
 * The order is the argument, not a layout preference. A reader decides what kind
 * of company this is from the sequence, so the infrastructure argument (B3's
 * two-tier stack, then B4's TNT and LawMan blocks) has to land before LawSafe
 * appears at all. Do not reorder the sections, and do not move a product ahead
 * of the stack display.
 *
 * Elevation alternates to segment the page: sunken hero, base problem, sunken
 * stack display, base products, sunken principles, base status. Every boundary
 * is one OKLCh-L rung (ΔL 0.048), and it is the same rhythm in both themes - a
 * section never changes polarity, only elevation. The page now ends on the base
 * status table; the sunken footer sits one rung below it, so that step divides
 * the two regions on its own. The footer still draws its own top edge because a
 * page that ended on a sunken section would meet it with no rung between them;
 * see the note in `components/site-footer.tsx`.
 *
 * B8 (footer notes) is deliberately not built. The one disclosure that is
 * mandatory on every route, the "not a law firm" line, is carried independently
 * by `components/site-footer.tsx`. The product-level "neither is legal advice"
 * note is the one real loss on this route and is tracked as G4 in the content
 * spec's backlog; closing it means editing the shared footer, which changes a
 * mandated disclosure on four other pages.
 */

/**
 * Meta description, content spec 6.2. `homeMeta` in `content/home.ts` still
 * carries the 199-character original, which truncates in a result snippet; this
 * is the 150-character replacement the spec specifies for `/`. The title tag,
 * the OG title and the OG description are all "keep" rows and pass through
 * unchanged. The H1 is the hero headline and lives in `<Hero>`.
 */
const meta = {
  ...homeMeta,
  description:
    "PunkRaven builds applied AI infrastructure in India: speech across all 22 scheduled languages, and reasoning that grounds every claim in a real source.",
};

export default function IndexPage() {
  return (
    <DefaultLayout head={meta}>
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
