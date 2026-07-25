import type { ComparisonColumnContent } from "@/content/lawman";

import { title } from "@/components/primitives";

export interface ComparisonColumnsProps {
  /**
   * Exactly two columns, and they are peers. There is no first-class column and
   * no secondary one - see the note below on why this is a fixed pair rather
   * than an array.
   */
  columns: readonly [ComparisonColumnContent, ComparisonColumnContent];
  /** Extra classes on the grid itself, for section-level spacing. */
  className?: string;
}

/**
 * A genuine two-column comparison, spec §3.3: "render it as a genuine two-column
 * comparison, not as one list with a heading. A company publishing the cases
 * where its product is the wrong tool is the most persuasive thing on that page.
 * Do not soften or shorten the 'Do not use' column."
 *
 * EQUAL VISUAL WEIGHT IS THE POINT OF THIS COMPONENT, AND IT IS ENFORCED BY
 * HAVING NO API THROUGH WHICH THE COLUMNS COULD DIFFER.
 *
 * Both columns go through one `.map` over one piece of markup with one set of
 * classes. There is no `tone`, no `variant`, no `emphasis`, no `isNegative` and
 * no per-column `className` - the props above carry a pair of identical shapes
 * and a class for the grid, and nothing else. The Phase 5 acceptance gate is
 * that the second column renders at equal visual weight to the first; the way to
 * hold that over time is to leave no channel through which a later change could
 * make one column recede. Adding a per-column style prop here would open one.
 *
 * NO POLARITY CUES. No ticks and crosses, no green and red, no success and
 * danger semantics, and in particular no amber: spec §5.2 gives the amber
 * exactly one meaning, uncertainty, and "do not use this" is a certainty. The
 * columns are separated structurally - a rule above each heading, a wide gutter
 * between them - never chromatically. The bullet marker is `bg-current`, so it
 * is literally the same colour as the text beside it in both columns and in both
 * themes, with no way to fork.
 *
 * STACKED, THE SECOND COLUMN MUST NOT READ AS AN APPENDIX. Each column carries
 * its own rule and its own heading at the same size, so when the grid collapses
 * to one column the second one opens exactly the way the first did rather than
 * trailing off the end of it. The row gap is wider than the reading rhythm above
 * it for the same reason.
 *
 * Not LawMan-specific. It is a page-level primitive, and `/lawsafe` may want it.
 * The only thing tying it to `/lawman` today is the content type it imports.
 */
export const ComparisonColumns = ({
  className,
  columns,
}: ComparisonColumnsProps) => (
  <div
    className={`grid gap-x-12 gap-y-12 md:grid-cols-2${className ? ` ${className}` : ""}`}
  >
    {columns.map((column) => (
      <div key={column.heading} className="border-t border-separator pt-6">
        <h3 className={title({ size: "sm" })}>{column.heading}</h3>

        <ul className="mt-6 flex flex-col gap-5">
          {column.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 font-body text-base leading-[1.75] text-pretty text-foreground"
            >
              <span
                aria-hidden="true"
                className="mt-[0.6875rem] size-1.5 shrink-0 rounded-full bg-current"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);
