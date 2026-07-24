import { lawmanMeta } from "@/content/lawman";
import { LawmanCta } from "@/components/sections/lawman-cta";
import { LawmanHero } from "@/components/sections/lawman-hero";
import { LawmanHowItWorks } from "@/components/sections/lawman-how-it-works";
import { LawmanWhatItIs } from "@/components/sections/lawman-what-it-is";
import { LawmanWhenToUse } from "@/components/sections/lawman-when-to-use";
import { LawmanWhy } from "@/components/sections/lawman-why";
import DefaultLayout from "@/layouts/default";

/**
 * Lawman page - `docs/copy/lawman-summary.md` Part 1, in the order spec §3.3
 * sets out: Hero, What is Lawman, Why Lawman is required, How it works, When to
 * use Lawman, Closing CTA. Part 2 is the homepage block and is already built in
 * `components/sections/product-block.tsx`; nothing from it appears here.
 *
 * The source has no page-metadata table - the only one of the four documents
 * that does not - so `lawmanMeta` is authored rather than transcribed. It says
 * so at its definition.
 *
 * The order is the source's own and it is also the argument: what the thing is,
 * then why a general-purpose model cannot be it, then how this one is built
 * differently, then - and only then - the cases where it is the wrong tool. The
 * comparison has to come after the mechanism or it reads as hedging rather than
 * as a boundary. Do not reorder it.
 *
 * ELEVATION. Six sections, strict alternation, no doubles: sunken hero, base
 * "what it is", sunken "why", base "how it works", sunken comparison, base CTA,
 * with the sunken site footer beneath. Every boundary is one OKLCh-L rung and
 * the rhythm is the same in both themes - a section changes elevation, never
 * polarity. The CTA lands on `base` above the sunken footer, which is the
 * boundary `/tnt` also ends on.
 *
 * That alternation puts the comparison on `sunken` - the anchor treatment,
 * shared with the hero and the footer. It is the section spec §3.3 says the page
 * exists for, so it is the right place for it.
 */
export default function LawmanPage() {
  return (
    <DefaultLayout head={lawmanMeta}>
      <LawmanHero />
      <LawmanWhatItIs />
      <LawmanWhy />
      <LawmanHowItWorks />
      <LawmanWhenToUse />
      <LawmanCta />
    </DefaultLayout>
  );
}
