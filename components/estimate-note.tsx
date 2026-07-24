import type { EstimateNote as EstimateNoteContent } from "@/content/tnt";

import { sectionRule } from "@/components/primitives";

export interface EstimateNoteProps {
  className?: string;
  note: EstimateNoteContent;
}

/**
 * The estimate qualifier - spec §5.2 lists "the estimate qualifier under any
 * figure table" as one of the four places the amber is allowed, and this is it.
 *
 * `/tnt` is the page made of statistics and every one of them is held pending
 * verification, so this component appears three times: under speed, under cost
 * and under deployment. One affordance used three times is the point - a reader
 * learns the amber hairline means "we are not certain about this" once, and then
 * recognises it.
 *
 * The amber arrives only through `sectionRule({ tone: "uncertain" })`. There is
 * no `text-uncertain` utility and none may be added (§5.2, "protect it"), so the
 * qualifier text itself is `--muted`, which clears AA on every elevation rung.
 * The rule carries the colour; the words carry the meaning.
 */
export const EstimateNote = ({ className, note }: EstimateNoteProps) => (
  <div className={className}>
    <hr className={sectionRule({ tone: "uncertain" })} />
    <p className="mt-4 font-data text-xs uppercase tracking-[0.16em] text-muted">
      {note.label}
    </p>
    <p className="mt-2 max-w-measure font-body text-sm leading-relaxed text-muted">
      {note.body}
    </p>
  </div>
);
