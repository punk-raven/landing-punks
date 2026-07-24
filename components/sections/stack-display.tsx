import type { StackLayer } from "@/content/home";

import dynamic from "next/dynamic";

import { stack } from "@/content/home";
import { Section } from "@/components/section";
import { StatusChip } from "@/components/status-chip";
import {
  eyebrow,
  prose,
  sectionRule,
  subtitle,
  title,
} from "@/components/primitives";

/**
 * The dependency diagram. Dynamically imported with `ssr: false` so
 * framer-motion, lucide and the circuit board stay off the critical path of a
 * static reading page - and so the reduced-motion guard inside it evaluates on
 * a real client where `matchMedia` exists. `loading` is `null` because the
 * element is decorative: nothing is lost while it is absent, and a skeleton
 * would only introduce layout shift for an ornament.
 */
const StackCircuit = dynamic(() => import("./stack-circuit"), {
  loading: () => null,
  ssr: false,
});

const HEADING_ID = "what-we-build";

const Layer = ({
  emphasis,
  layer,
}: {
  emphasis: "infrastructure" | "application";
  layer: StackLayer;
}) => (
  <li
    className={
      emphasis === "infrastructure"
        ? "rounded-md border border-separator bg-surface px-5 py-7 text-surface-foreground sm:px-7 sm:py-9"
        : /* border-border, not border-separator: this block carries no fill, so
             its border is the SOLE definition of the component and SC 1.4.11's
             3:1 applies to it (3.85:1 worst case). The infrastructure card above
             keeps the decorative hairline because it also has a fill step. */
          "rounded-md border border-border px-5 py-5 sm:px-7 sm:py-6"
    }
  >
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <h4 className={title({ size: "sm" })}>
        {layer.name}
        {/* The separator opens with a non-breaking space, not a JSX `{" "}`
            between the two nodes. Accessible-name computation trims each text
            node before joining them, so an ordinary space between them is
            dropped and the heading is announced as "T&T- the language layer".
            The nbsp survives the trim because it is inside the node. */}
        <span className="font-body text-base font-normal text-muted">
          {`\u00a0- ${layer.role}`}
        </span>
      </h4>
      {/* §2b.6: every product carries a visible status label, everywhere it
          appears. This is one of the three places on this page. */}
      <StatusChip size="sm" status={layer.status} />
    </div>
    <p className={prose({ className: "mt-3 max-w-measure text-muted" })}>
      {layer.description}
    </p>
  </li>
);

/**
 * B3. What we build - the stack display.
 *
 * Spec §5.4 calls this the second most important element on the site, and §2a.2
 * makes its shape a build rule: **two tiers, not three equal layers.** T&T and
 * Lawman are grouped as the infrastructure and carry the vertical weight; a
 * visible divider separates them from LawSafe, which sits below as the one
 * application. A reader scanning this for three seconds has to come away with
 * "they build AI infrastructure and shipped something on it", not "they make
 * legal software". Do not flatten it into three equal cards, and do not move
 * LawSafe above the divider.
 *
 * The weight difference is spatial, not typographic: the infrastructure layers
 * get a raised surface and roughly half again the vertical padding, while the
 * application layer is a plain outlined block. Both use the same heading size,
 * which keeps the page inside its type budget (§5.3).
 *
 * On desktop a thin `--sheen-alt` connector runs down the left edge of the
 * infrastructure group only - the visual claim that those two are one system.
 * `--sheen-alt` is a semantic token, teal in both themes (`--teal-deep` light,
 * `--teal-lift` dark), so the connector needs nothing at this call site. On
 * mobile the group stacks plainly and the connector is dropped; the divider and
 * both group labels stay, because they carry the actual argument.
 */
export const StackDisplay = () => (
  <Section
    elevation="sunken"
    id={HEADING_ID}
    labelledBy={`${HEADING_ID}-heading`}
    spacing="lg"
  >
    <h2
      className={title({ className: "max-w-[26ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {stack.heading}
    </h2>

    <p className={subtitle({ className: "mt-6 max-w-measure" })}>
      {stack.body}
    </p>

    <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-14">
      <div>
        <h3 className={eyebrow()}>{stack.infrastructureLabel}</h3>

        <div className="relative mt-5 lg:pl-8">
          {/* Desktop-only connector, §5.4. Decorative: the same "these two are
              one system" claim is carried by the group label above it. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-4 left-0 hidden w-px bg-sheen-alt lg:block"
          />
          <ul className="flex flex-col gap-4">
            {stack.infrastructure.map((layer) => (
              <Layer key={layer.name} emphasis="infrastructure" layer={layer} />
            ))}
          </ul>
        </div>

        {/* The visible divider. It stays at every width. */}
        <hr className={sectionRule({ className: "my-10" })} />

        <h3 className={eyebrow()}>{stack.applicationLabel}</h3>

        <ul className="mt-5 flex flex-col gap-4 lg:pl-8">
          {stack.application.map((layer) => (
            <Layer key={layer.name} emphasis="application" layer={layer} />
          ))}
        </ul>
      </div>

      <div aria-hidden="true" className="hidden sm:block">
        <StackCircuit />
      </div>
    </div>

    <p className={prose({ className: "mt-12 max-w-measure text-muted" })}>
      {stack.supporting}
    </p>
  </Section>
);
