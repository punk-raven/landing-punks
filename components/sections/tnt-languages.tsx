import { tntLanguages } from "@/content/tnt";
import { Section } from "@/components/section";
import { prose, sectionRule, subtitle, title } from "@/components/primitives";

const HEADING_ID = "language-coverage";

/**
 * A4. Language coverage. The one section on the page whose figures are entirely
 * safe: Part C marks the 22-language coverage and the Tier A / Tier B split as
 * sourced from the model cards. Say "22 scheduled languages", exactly - never
 * "22+", which invites a challenge the site cannot win.
 *
 * Tier B is topped with the amber rule rather than the plain one. This is §5.2's
 * "low-confidence marker" and it is the clearest instance of it on the site: the
 * tier is supported, and we are less certain about it. The tiers are otherwise
 * identical components, so the colour of the hairline is doing the whole job of
 * saying which one carries more risk.
 */
export const TntLanguages = () => (
  <Section id={HEADING_ID} labelledBy={`${HEADING_ID}-heading`}>
    <h2
      className={title({ className: "max-w-[24ch]", size: "lg" })}
      id={`${HEADING_ID}-heading`}
    >
      {tntLanguages.heading}
    </h2>

    <p className={subtitle({ className: "mt-6" })}>{tntLanguages.body[0]}</p>
    <p className={prose({ className: "mt-4 text-muted" })}>
      {tntLanguages.body[1]}
    </p>

    {/* §7.1 question heading over its §7.2 answer block, above the tiers - an
        extractor that truncates takes the top. Same markup and heading level as
        the question headings in A11. */}
    <h3 className={title({ className: "mt-12", size: "sm" })}>
      {tntLanguages.question}
    </h3>
    <p className={prose({ className: "mt-3 text-muted" })}>
      {tntLanguages.answer}
    </p>

    <ul className="mt-12 grid gap-8 md:grid-cols-2">
      {tntLanguages.tiers.map((tier) => (
        <li key={tier.label}>
          <hr
            className={sectionRule({
              tone: tier.isUncertain ? "uncertain" : "rule",
            })}
          />
          <h3 className={title({ className: "mt-5", size: "sm" })}>
            {tier.label}
          </h3>

          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
            {tier.languages.map((language) => (
              <li
                key={language.name}
                className="rounded-sm border border-separator bg-surface px-2 py-1 font-data text-xs text-surface-foreground"
              >
                {language.name} -{" "}
                <span
                  style={{ fontFamily: `var(--font-noto-${language.script})` }}
                >
                  {`"${language.native}"`}
                </span>
              </li>
            ))}
            {/* The English pivot: Tier A's own chip, Latin only, no native span. */}
            {tier.pivot ? (
              <li className="rounded-sm border border-separator bg-surface px-2 py-1 font-data text-xs text-surface-foreground">
                {tier.pivot}
              </li>
            ) : null}
          </ul>
        </li>
      ))}
    </ul>

    <blockquote className="mt-12 border-l-2 border-sheen-alt pl-5">
      <p className={prose()}>{tntLanguages.pullQuote}</p>
    </blockquote>
  </Section>
);
