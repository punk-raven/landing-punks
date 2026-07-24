import { footerNotes } from "@/content/home";
import { Section } from "@/components/section";

const HEADING_ID = "page-notes";

/**
 * B8. Footer notes.
 *
 * Page-level notes, not the site footer - `components/site-footer.tsx` carries
 * the mandatory "not a law firm" disclaimer on every route (§2a.4) and stays
 * where it is. These five sit above it because they are homepage content: they
 * qualify what the page above them claims.
 *
 * The heading is visually hidden. The notes are a list of qualifications, not a
 * section a reader navigates to, but the section still needs an accessible name.
 */
export const FooterNotes = () => (
  <Section labelledBy={HEADING_ID} spacing="sm">
    <h2 className="sr-only" id={HEADING_ID}>
      Notes
    </h2>
    <ul className="flex max-w-measure list-outside list-disc flex-col gap-3 pl-5 marker:text-separator">
      {footerNotes.map((note) => (
        <li key={note} className="font-body text-sm leading-relaxed text-muted">
          {note}
        </li>
      ))}
    </ul>
  </Section>
);
