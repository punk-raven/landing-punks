import { heroScriptSentence } from "@/content/tnt";

/**
 * Spec §5.5 - the one deliberate risk, and the only decorative element on the
 * site: the same short sentence set in nine Indic scripts, in a quiet stacked
 * column at low contrast, with the English at full contrast above it. Not a
 * carousel, not animated. It demonstrates the central claim instead of asserting
 * it.
 *
 * IT IS BLOCKED, AND THIS IS THE SCAFFOLD.
 *
 * The nine strings come from the user and nothing may be machine-translated -
 * a standing decision, and the blocker on this component. Until they arrive, every
 * `text` in `heroScriptSentence.lines` is empty and this component returns
 * `null` - no placeholder, no transliteration, no English stand-in, no Lorem and
 * no reserved vertical space. An empty column is correct. A wrong glyph on a
 * page about language coverage is, in the spec's words, a self-inflicted wound.
 *
 * TO FILL IT, three things have to happen, in this order:
 *
 *   1. A native reader of each script supplies and checks the sentence "Audio
 *      in. Transcript and translation out." Nine strings, nine readers.
 *   2. Those strings go into `heroScriptSentence.lines[].text` in
 *      `content/tnt.ts`. Nothing else changes here - filling this is a data edit,
 *      not a markup edit.
 *   3. The nine Noto families named on each line are loaded PAGE-SCOPED, in
 *      `pages/tnt/index.tsx`, and their CSS variables applied to the matching
 *      row. They must not go in `config/fonts.ts`: that is nine extra font
 *      payloads on every route for one block on one page. `CLAUDE.md` records
 *      all nine families, their subset keys, and the trap that Odia's family is
 *      `Noto_Sans_Oriya` - `Noto_Sans_Odia` does not exist and fails the loader.
 *
 * Until step 3 lands, a rendered string would fall through to a browser default
 * face, which is exactly the failure §5.3 forbids. So the guard below is not
 * only about empty strings: do not render these without their faces.
 */
export const ScriptColumn = () => {
  const lines = heroScriptSentence.lines.filter(
    (line) => line.text.trim().length > 0,
  );

  if (lines.length === 0) return null;

  return (
    <ul className="mt-10 flex flex-col gap-1.5">
      {lines.map((line) => (
        <li
          key={line.script}
          className="font-body text-base leading-relaxed text-muted"
          lang={line.lang}
        >
          {line.text}
        </li>
      ))}
    </ul>
  );
};
