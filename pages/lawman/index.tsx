import { LawmanHero } from "@/components/sections/lawman-hero";
import { LawmanWhatItIs } from "@/components/sections/lawman-what-it-is";
import { LawmanWhy } from "@/components/sections/lawman-why";
import { LawmanHowItWorks } from "@/components/sections/lawman-how-it-works";
import { LawmanWhenToUse } from "@/components/sections/lawman-when-to-use";
import { LawmanClosing } from "@/components/sections/lawman-closing";
import { lawmanMeta } from "@/content/lawman";
import DefaultLayout from "@/layouts/default";

/**
 * Lawman - the reasoning layer. Written against `docs/website-content.md` §4.4,
 * with §6 supplying the title, meta description and H1, §7 the extractable
 * answer block and the question-shaped column headings, and §8.2 the one
 * outbound contextual link this page is cleared to carry.
 *
 * COMPOSITION ONLY. Every string on this route lives in `content/lawman.ts` and
 * every piece of markup lives in `components/sections/lawman-*.tsx`, the same
 * split `/`, `/about`, `/tnt` and `/lawsafe` use. The five rules that bind the
 * copy - nothing may read as shipped, no numbers, the word §2.3 bars appears
 * exactly once, no voice capability, infrastructure framing - are stated at the
 * top of `content/lawman.ts` and are not repeated here.
 *
 * ELEVATION. Six sections, strict alternation, no doubles: sunken hero, base
 * "what it is", sunken "why", base "how it works", sunken comparison, base
 * closing, with the sunken site footer beneath. A section changes elevation,
 * never polarity. That alternation puts the comparison on the anchor rung it
 * shares with the hero and the footer, which is right: §4.4 calls it the section
 * the page exists for.
 *
 * The order is the source's and it is also the argument: what the thing is, then
 * why a general-purpose model cannot be it, then how this one is built
 * differently, then - and only then - the cases where it is the wrong tool. The
 * comparison has to come after the mechanism or it reads as hedging rather than
 * as a boundary. Do not reorder it.
 */
export default function LawmanPage() {
  return (
    <DefaultLayout head={lawmanMeta}>
      <LawmanHero />
      <LawmanWhatItIs />
      <LawmanWhy />
      <LawmanHowItWorks />
      <LawmanWhenToUse />
      <LawmanClosing />
    </DefaultLayout>
  );
}
