/**
 * A small tokenizer for the two payloads in `/tnt` A9, which spec §3.3 requires
 * to render as syntax-highlighted code blocks.
 *
 * Deliberately hand-rolled rather than pulled from a package. The alternative is
 * shiki or prism, and both are a large dependency shipped to a static reading
 * page in order to colour about forty lines of JSON that never change. This
 * covers what those forty lines contain and nothing else: an HTTP request line,
 * one header, JSON, and the source's own `<placeholder>` idiom.
 *
 * It runs once at module scope, so the output is computed at build time and the
 * function itself is the only thing that reaches the browser.
 *
 * It is NOT a JSON parser and must not be used as one: it never validates, and
 * the payloads it is written for are deliberately invalid JSON in places
 * (`"asr": <ms>`), which is the whole reason a real parser is the wrong tool.
 */

export type CodeTokenKind =
  | "header"
  | "key"
  | "keyword"
  | "number"
  | "placeholder"
  | "plain"
  | "punctuation"
  | "string";

export interface CodeToken {
  kind: CodeTokenKind;
  value: string;
}

/** One line of tokens. Empty lines come back as an empty token list. */
export type CodeLine = CodeToken[];

const REQUEST_LINE = /^([A-Z]{3,7}) (\S+)$/;
const HEADER_LINE = /^([A-Za-z][A-Za-z-]*): (.+)$/;
const JSON_KEYWORD = /^(true|false|null)$/;
const NUMBER_START = /[-\d]/;
const NUMBER_CHAR = /[-+.\deE]/;
const WORD_CHAR = /[A-Za-z_]/;
const PUNCTUATION = new Set(["{", "}", "[", "]", ",", ":"]);

const isPlaceholder = (value: string) =>
  value.startsWith("<") && value.endsWith(">");

/**
 * Splits a header value or path on the `<placeholder>` idiom so
 * `Bearer <api_key>` reads as two tokens rather than one.
 */
const splitPlaceholders = (value: string, kind: CodeTokenKind): CodeToken[] => {
  const tokens: CodeToken[] = [];
  let rest = value;

  while (rest.length > 0) {
    const open = rest.indexOf("<");
    const close = open === -1 ? -1 : rest.indexOf(">", open);

    if (open === -1 || close === -1) {
      tokens.push({ kind, value: rest });
      break;
    }

    if (open > 0) tokens.push({ kind, value: rest.slice(0, open) });
    tokens.push({ kind: "placeholder", value: rest.slice(open, close + 1) });
    rest = rest.slice(close + 1);
  }

  return tokens;
};

const tokenizeJsonLine = (line: string): CodeLine => {
  const tokens: CodeToken[] = [];
  let index = 0;

  while (index < line.length) {
    const char = line[index];

    if (char === " " || char === "\t") {
      const start = index;

      while (
        index < line.length &&
        (line[index] === " " || line[index] === "\t")
      )
        index += 1;
      tokens.push({ kind: "plain", value: line.slice(start, index) });
      continue;
    }

    if (PUNCTUATION.has(char)) {
      tokens.push({ kind: "punctuation", value: char });
      index += 1;
      continue;
    }

    if (char === '"') {
      const start = index;

      index += 1;
      while (index < line.length) {
        if (line[index] === "\\") {
          index += 2;
          continue;
        }
        if (line[index] === '"') {
          index += 1;
          break;
        }
        index += 1;
      }

      const raw = line.slice(start, index);
      const inner = raw.slice(1, -1);
      /* A string is a key when the next non-space character is a colon. */
      let lookahead = index;

      while (lookahead < line.length && line[lookahead] === " ") lookahead += 1;

      const kind: CodeTokenKind = isPlaceholder(inner)
        ? "placeholder"
        : line[lookahead] === ":"
          ? "key"
          : "string";

      tokens.push({ kind, value: raw });
      continue;
    }

    if (char === "<") {
      const close = line.indexOf(">", index);

      if (close !== -1) {
        tokens.push({
          kind: "placeholder",
          value: line.slice(index, close + 1),
        });
        index = close + 1;
        continue;
      }
    }

    if (NUMBER_START.test(char)) {
      const start = index;

      while (index < line.length && NUMBER_CHAR.test(line[index])) index += 1;
      tokens.push({ kind: "number", value: line.slice(start, index) });
      continue;
    }

    if (WORD_CHAR.test(char)) {
      const start = index;

      while (index < line.length && WORD_CHAR.test(line[index])) index += 1;

      const word = line.slice(start, index);

      tokens.push({
        kind: JSON_KEYWORD.test(word) ? "keyword" : "plain",
        value: word,
      });
      continue;
    }

    tokens.push({ kind: "plain", value: char });
    index += 1;
  }

  return tokens;
};

/**
 * Tokenizes an HTTP request or a JSON body into lines of typed spans.
 *
 * The first line is treated as a request line when it looks like one, and
 * `Name: value` lines before the first blank line are treated as headers.
 * Everything after that is scanned as JSON.
 */
export const tokenizeCode = (source: string): CodeLine[] => {
  const lines = source.split("\n");
  let inHead = REQUEST_LINE.test(lines[0] ?? "");

  return lines.map((line, lineIndex) => {
    if (line.length === 0) {
      inHead = false;

      return [];
    }

    if (lineIndex === 0) {
      const requestLine = REQUEST_LINE.exec(line);

      if (requestLine) {
        return [
          { kind: "keyword", value: requestLine[1] },
          { kind: "plain", value: " " },
          ...splitPlaceholders(requestLine[2], "string"),
        ];
      }
    }

    if (inHead) {
      const header = HEADER_LINE.exec(line);

      if (header) {
        return [
          { kind: "header", value: header[1] },
          { kind: "punctuation", value: ":" },
          { kind: "plain", value: " " },
          ...splitPlaceholders(header[2], "plain"),
        ];
      }
    }

    return tokenizeJsonLine(line);
  });
};
