import { tntFooterNotes } from "@/content/tnt";
import { Section } from "@/components/section";
import { eyebrow, sectionRule } from "@/components/primitives";

const HEADING_ID = "tnt-page-notes";

/**
 * A13. Footer notes. Spec §3.3 makes these mandatory, not optional, so all four
 * render and none is abbreviated.
 *
 * Page-level notes, not the site footer - `components/site-footer.tsx` carries
 * the mandatory "not a law firm" disclaimer on every route (§2a.4) and stays
 * where it is. These four sit above it because they qualify the page above them.
 *
 * The first note fixes the conversion rate for costs this build holds, so it
 * currently qualifies figures that are not on the page. Kept verbatim anyway:
 * trimming a mandatory disclosure to match a temporary state is how a disclosure
 * quietly shrinks, and the note is correct again the moment the figures land.
 */
export const TntFooterNotes = () => (
  <Section labelledBy={HEADING_ID} spacing="md">
    <hr className={sectionRule()} />
    <h2 className={eyebrow({ className: "mt-6" })} id={HEADING_ID}>
      Notes
    </h2>
    <ul className="mt-6 flex max-w-measure list-outside list-disc flex-col gap-3 pl-5 marker:text-muted">
      {tntFooterNotes.map((note) => (
        <li key={note} className="font-body text-sm leading-relaxed text-muted">
          {note}
        </li>
      ))}
    </ul>
  </Section>
);
