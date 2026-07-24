import type { LeadIn } from "@/content/lawsafe";

import { Fragment } from "react";
import NextLink from "next/link";

import { whatItDoes } from "@/content/lawsafe";
import { Section } from "@/components/section";
import { prose, title } from "@/components/primitives";

const HEADING_ID = "what-lawsafe-does";

/**
 * A body is either one string or a list of runs, and a run carrying an `href`
 * renders as an internal link. Only "Where it sits" uses the second form, to
 * carry the two outbound contextual links 8.2 wants from this page without
 * making `content/lawsafe.ts` a JSX file.
 */
const renderBody = (body: LeadIn["body"]) =>
  typeof body === "string"
    ? body
    : body.map((segment) =>
        segment.href ? (
          <NextLink
            key={segment.text}
            className="underline underline-offset-4"
            href={segment.href}
          >
            {segment.text}
          </NextLink>
        ) : (
          <Fragment key={segment.text}>{segment.text}</Fragment>
        ),
      );

/**
 * What it does - vision §4, product surfaces only.
 *
 * Four lead-in blocks in a single column at the reading measure, not a grid. The
 * four are not peers: the app is what a person opens, the shortlist is what
 * happens next, "Where it sits" is where the product sits among the company's
 * other work, and the scope is the limit drawn around all three. A grid would
 * assert they are four equivalent features, and the third block in particular is
 * the one that keeps this page on a technology company's site rather than a
 * legal one.
 *
 * The third block names T&T and Lawman as siblings and links to both. It is NOT
 * a dependency claim - see the conflict 1 note on `whatItDoes` in
 * `content/lawsafe.ts` before changing either the copy or these links.
 *
 * The shortlist's caveat renders at foreground weight rather than in the muted
 * body colour, in the same paragraph and immediately after the sentence it
 * qualifies. It says no verified panel exists yet, which the company copy's Part
 * D requires and which a reader must not be able to skim past. Separating it
 * from that sentence, or demoting it to the muted colour, leaves a present-tense
 * claim about a roster that does not exist.
 */
export const LawsafeWhatItDoes = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`} spacing="lg">
    <h2
      className={title({ className: "max-w-[26ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {whatItDoes.heading}
    </h2>

    <div className="mt-10 grid max-w-measure gap-8">
      {whatItDoes.items.map((item) => (
        <div key={item.lead} className="border-l border-separator pl-5">
          <h3 className={title({ size: "sm" })}>{item.lead}</h3>
          <p className={prose({ className: "mt-3 text-muted" })}>
            {renderBody(item.body)}
            {item.caveat ? (
              <>
                {" "}
                <strong className="font-medium text-foreground">
                  {item.caveat}
                </strong>
              </>
            ) : null}
          </p>
        </div>
      ))}
    </div>
  </Section>
);
