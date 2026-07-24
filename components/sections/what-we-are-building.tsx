import type { BuildingBlock } from "@/content/about";

import NextLink from "next/link";

import { whatWeAreBuilding } from "@/content/about";
import { Section } from "@/components/section";
import { StatusChip } from "@/components/status-chip";
import {
  eyebrow,
  prose,
  sectionRule,
  subtitle,
  title,
} from "@/components/primitives";

const HEADING_ID = "what-we-are-building";

/**
 * Inline contextual link. Underlined at rest rather than on hover: colour alone
 * is not a sufficient distinguisher inside a run of body text.
 *
 * Section 8.2 puts this route's three outbound links on the block roles, and
 * `NextLink` is what carries them - "the language layer" to `/tnt`, "the
 * reasoning layer" to `/lawman`, "the first application" to `/lawsafe`.
 */
const INLINE_LINK = "font-medium text-accent underline underline-offset-4";

const Block = ({
  block,
  emphasis,
}: {
  block: BuildingBlock;
  emphasis: "infrastructure" | "application";
}) => (
  <li
    className={
      emphasis === "infrastructure"
        ? "rounded-md border border-separator bg-surface px-5 py-7 text-surface-foreground sm:px-7 sm:py-9"
        : /* border-border, not border-separator: this block carries no fill, so
             its border is the SOLE definition of the component and SC 1.4.11's
             3:1 applies to it. The filled infrastructure blocks above keep the
             decorative hairline because they also have a fill step. */
          "rounded-md border border-border px-5 py-5 sm:px-7 sm:py-6"
    }
  >
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
      <h4 className={title({ size: "sm" })}>
        {block.name}
        {/* The separator opens with a non-breaking space, not a JSX `{" "}`
            between the two nodes. Accessible-name computation trims each text
            node before joining them, so an ordinary space is dropped and the
            heading is announced as "TNTthe language layer". */}
        <span className="font-body text-base font-normal text-muted">
          {"\u00a0- "}
          <NextLink className={INLINE_LINK} href={block.href}>
            {block.role}
          </NextLink>
        </span>
      </h4>
      {/* Every product carries a visible status label everywhere it appears -
          the page must never read as a description of shipped software. */}
      <StatusChip size="sm" status={block.status} />
    </div>

    {block.body.map((paragraph) => (
      <p
        key={paragraph}
        className={prose({ className: "mt-3 max-w-measure text-muted" })}
      >
        {paragraph}
      </p>
    ))}
  </li>
);

/**
 * C5. What we are building.
 *
 * Two tiers, not three equal blocks, and the shape is the argument. TNT and
 * LawMan are grouped as the infrastructure and carry the visual weight; a
 * visible divider separates them from LawSafe, which sits below as the one
 * application. Ordered TNT, then LawMan, then LawSafe. Leading with LawSafe, or
 * flattening the three into equal cards, re-categorises the company in the
 * reader's head as legal software - which is the exact failure Part E names.
 *
 * TNT's block names the non-legal buyers - contact centres, consumer apps,
 * government services, media, education. Part D lists that sentence as one of
 * the mitigations against the legal-tech reading, and this page is where it does
 * the most work: it is the proof, on the company page, that the language layer
 * has nothing to do with law.
 */
export const WhatWeAreBuilding = () => (
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
      {whatWeAreBuilding.heading}
    </h2>

    <p className={subtitle({ className: "mt-6" })}>{whatWeAreBuilding.body}</p>

    <div className="mt-12">
      <h3 className={eyebrow()}>{whatWeAreBuilding.infrastructureLabel}</h3>

      <ul className="mt-5 flex flex-col gap-4">
        {whatWeAreBuilding.infrastructure.map((block) => (
          <Block key={block.name} block={block} emphasis="infrastructure" />
        ))}
      </ul>

      {/* The visible divider. It stays at every width. */}
      <hr className={sectionRule({ className: "my-10" })} />

      <h3 className={eyebrow()}>{whatWeAreBuilding.applicationLabel}</h3>

      <ul className="mt-5 flex flex-col gap-4">
        {whatWeAreBuilding.application.map((block) => (
          <Block key={block.name} block={block} emphasis="application" />
        ))}
      </ul>
    </div>
  </Section>
);
