import type { CodeLine, CodeTokenKind } from "@/lib/tokenize-code";

/**
 * Colour per token kind. Semantic tokens only - every one of these flips with
 * the theme, and none of them is the amber. A code block is not an uncertainty
 * marker (§5.2), so the only warmth on this page stays on the status chip and
 * the estimate notes.
 *
 * Measured on `--surface`, which is the block's fill: teal 5.37:1 light and
 * 6.62:1 dark, violet 6.63:1 light and 5.22:1 dark, `--muted` 7.02:1 light and
 * 6.34:1 dark. All clear AA at this size.
 */
const TOKEN_CLASS: Record<CodeTokenKind, string> = {
  header: "text-muted",
  key: "text-foreground",
  keyword: "font-semibold text-foreground",
  number: "text-accent",
  placeholder: "italic text-muted",
  plain: "text-foreground",
  punctuation: "text-muted",
  string: "text-sheen-alt",
};

export interface CodeBlockProps {
  /** Accessible name for the scrollable region. */
  label: string;
  /** Payload, tokenized once at module scope by the caller. */
  lines: CodeLine[];
}

/**
 * A read-only code block for the `/tnt` API contract (spec §3.3).
 *
 * Highlighting is hand-rolled - see `lib/tokenize-code.ts` for why there is no
 * shiki or prism here. The block scrolls inside its own box rather than letting
 * the document scroll sideways (§5.6: nothing overflows at 360px).
 *
 * The scroll container carries `tabIndex={0}` and a label because a region that
 * scrolls has to be reachable by keyboard - without it, the content past the
 * right edge is unreachable without a mouse (WCAG 2.1.1). That is also why the
 * lint rule for `tabIndex` on a non-interactive element is suppressed here
 * rather than the attribute being dropped.
 */
export const CodeBlock = ({ label, lines }: CodeBlockProps) => (
  <div
    aria-label={label}
    className="overflow-x-auto rounded-md border border-separator bg-surface text-surface-foreground"
    role="region"
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
    tabIndex={0}
  >
    <pre className="w-max min-w-full p-5 font-data text-[0.8125rem] leading-[1.7]">
      <code>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block">
            {line.length === 0
              ? " "
              : line.map((token, tokenIndex) => (
                  <span key={tokenIndex} className={TOKEN_CLASS[token.kind]}>
                    {token.value}
                  </span>
                ))}
          </span>
        ))}
      </code>
    </pre>
  </div>
);
