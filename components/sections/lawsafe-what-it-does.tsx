import { whatItDoes } from "@/content/lawsafe";
import { Section } from "@/components/section";
import { prose, title } from "@/components/primitives";

const HEADING_ID = "what-lawsafe-does";

/**
 * What it does - vision §4, product surfaces only.
 *
 * Four lead-in blocks in a single column at the reading measure, not a grid. The
 * four are not peers: the app is what a person opens, the shortlist is what
 * happens next, the stack is what makes either possible, and the scope is the
 * limit drawn around all three. A grid would assert they are four equivalent
 * features, and the third block in particular is the one that keeps this page on
 * a technology company's site rather than a legal one.
 *
 * The shortlist's caveat renders at foreground weight rather than in the muted
 * body colour. It says no verified panel exists yet, which the company copy's
 * Part D requires and which a reader must not be able to skim past.
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
            {item.body}
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
