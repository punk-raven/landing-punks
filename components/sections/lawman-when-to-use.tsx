import { whenToUse } from "@/content/lawman";
import { ComparisonColumns } from "@/components/comparison-columns";
import { Section } from "@/components/section";
import { title } from "@/components/primitives";

const HEADING_ID = "when-to-use-lawman";

/**
 * When to use Lawman, and when not to. Spec §3.3 calls this section "unusual and
 * valuable" and it is the reason the page is worth building carefully: a company
 * publishing the cases where its own product is the wrong tool is the most
 * persuasive thing on the page.
 *
 * All of the equal-weight machinery lives in `ComparisonColumns`, which has no
 * per-column styling API at all - read the note there before changing anything
 * here. This section supplies a heading and the pair, and nothing else.
 *
 * The `<h2>` names both halves on purpose. The source labels the section "When
 * to use Lawman", and a heading that says only that frames everything under the
 * second column as a caveat before a reader reaches it.
 *
 * Both column headings are symmetric questions - "When should you use Lawman?"
 * and "When should you not use Lawman?" - and they are questions in
 * `content/lawman.ts` rather than here. §7.1 requires the second one in that
 * form; the first matches it so the pair reads as peers. Turning either into a
 * statement breaks the requirement and unbalances the columns.
 *
 * Sunken elevation. The page's centrepiece gets the anchor treatment, one rung
 * below the mechanism grid above it and the ask below it.
 */
export const LawmanWhenToUse = () => (
  <Section
    elevation="sunken"
    id={HEADING_ID}
    labelledBy={`${HEADING_ID}-heading`}
    spacing="lg"
  >
    <h2
      className={title({ className: "max-w-[26ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {whenToUse.heading}
    </h2>

    <ComparisonColumns className="mt-12" columns={whenToUse.columns} />
  </Section>
);
