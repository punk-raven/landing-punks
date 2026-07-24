import type { ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";

import { band, measure } from "@/components/primitives";

type BandVariants = VariantProps<typeof band>;
type MeasureVariants = VariantProps<typeof measure>;

export interface BandProps extends BandVariants {
  /** Semantic element for the band. Sections default to `section`. */
  as?: "section" | "div" | "article" | "header" | "footer";
  children: ReactNode;
  /** Extra classes on the outer band element. */
  className?: string;
  id?: string;
  /** Extra classes on the inner measure column. */
  innerClassName?: string;
  /** Labels the band for assistive tech when it has no visible heading. */
  labelledBy?: string;
  width?: MeasureVariants["width"];
}

/**
 * Alternating light/dark section - the unit the site segments pages with
 * (spec §5.4). The tone class re-declares the semantic tokens on this element,
 * so nested content, including HeroUI components, adapts on its own.
 *
 * `width` picks the measure: `prose` is the 68ch reading column, `band` is the
 * 1120px content width.
 */
export const Band = ({
  as: Element = "section",
  children,
  className,
  id,
  innerClassName,
  labelledBy,
  spacing,
  tone,
  width = "band",
}: BandProps) => (
  <Element
    aria-labelledby={labelledBy}
    className={band({ className, spacing, tone })}
    id={id}
  >
    <div className={measure({ className: innerClassName, width })}>
      {children}
    </div>
  </Element>
);
