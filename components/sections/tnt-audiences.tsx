import { tntAudiences } from "@/content/tnt";
import { Section } from "@/components/section";
import { title } from "@/components/primitives";

const HEADING_ID = "who-it-is-for";

/**
 * A10. Who it is for.
 *
 * Four audiences, none of them legal. That is load-bearing rather than
 * incidental: TNT is the horizontal language layer of the stack, and this is the
 * page where a reader decides whether PunkRaven builds infrastructure or legal
 * software. Do not add a legal audience here, and do not reorder these into one.
 *
 * A `<dl>`, because that is what four segments and their one line each are.
 */
export const TntAudiences = () => (
  <Section
    elevation="sunken"
    id={HEADING_ID}
    labelledBy={`${HEADING_ID}-heading`}
  >
    <h2
      className={title({ className: "max-w-[26ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {tntAudiences.heading}
    </h2>

    <dl className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
      {tntAudiences.items.map((item) => (
        <div key={item.segment} className="border-t border-separator pt-5">
          <dt className={title({ size: "sm" })}>{item.segment}</dt>
          <dd className="mt-3 font-body text-base leading-[1.75] text-pretty text-muted">
            {item.line}
          </dd>
        </div>
      ))}
    </dl>
  </Section>
);
