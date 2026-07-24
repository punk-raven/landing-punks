import { tntApi } from "@/content/tnt";
import { tokenizeCode } from "@/lib/tokenize-code";
import { Section } from "@/components/section";
import { CodeBlock } from "@/components/ui/code-block";
import { eyebrow, prose, subtitle, title } from "@/components/primitives";

const HEADING_ID = "the-api";

/**
 * A9. The API. Spec §3.3 requires the request/response pair to render as
 * syntax-highlighted code blocks.
 *
 * The highlighting is hand-rolled - `lib/tokenize-code.ts` is about a hundred
 * lines and covers exactly what these two payloads contain. Adding shiki or
 * prism would put a large dependency into a static reading page in order to
 * colour forty lines of JSON that never change. Tokenizing happens here at
 * module scope, so it runs once at build rather than per render.
 *
 * `framing` above the blocks is not decoration. Part C: the shape is "designed,
 * not implemented", and is safe only if framed as the contract - "do not imply a
 * live sandbox". There is no endpoint to call.
 *
 * The four `timings_ms` values in the source response are rendered as `<ms>`
 * placeholders. They are the held latency estimate in another costume: a total
 * of 1517 ms reads as "a clip comes back in about a second and a half", which is
 * precisely the claim A6 holds. The source's own `<api_key>` and
 * `<file | audio_url>` set the idiom.
 */
const REQUEST_LINES = tokenizeCode(tntApi.request);
const RESPONSE_LINES = tokenizeCode(tntApi.response);

export const TntApi = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {tntApi.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {tntApi.framing}
    </p>

    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      {/* min-w-0 is load-bearing. A grid item defaults to `min-width: auto`,
          so the code block's max-content width propagates up through the
          scroll container and widens the whole page instead of scrolling
          inside its own box. Observed at 360px before this was added. */}
      <div className="min-w-0">
        <h3 className={eyebrow()}>{tntApi.requestLabel}</h3>
        <div className="mt-3">
          <CodeBlock
            label={`${tntApi.requestLabel} example`}
            lines={REQUEST_LINES}
          />
        </div>
      </div>

      <div className="min-w-0">
        <h3 className={eyebrow()}>{tntApi.responseLabel}</h3>
        <div className="mt-3">
          <CodeBlock
            label={`${tntApi.responseLabel} example`}
            lines={RESPONSE_LINES}
          />
        </div>
      </div>
    </div>

    <p className="mt-5 max-w-measure font-body text-sm leading-relaxed text-muted">
      {tntApi.timingsNote}
    </p>

    <ul className="mt-10 flex max-w-measure flex-col">
      {tntApi.bullets.map((bullet) => (
        <li
          key={bullet}
          className={prose({
            className: "border-t border-separator py-4 text-muted",
          })}
        >
          {bullet}
        </li>
      ))}
    </ul>
  </Section>
);
