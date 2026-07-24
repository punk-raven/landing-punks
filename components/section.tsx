import type { ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";

import { measure, section } from "@/components/primitives";

type SectionVariants = VariantProps<typeof section>;
type MeasureVariants = VariantProps<typeof measure>;

export interface SectionProps extends SectionVariants {
  /** Semantic element. Sections default to `section`. */
  as?: "section" | "div" | "article" | "header" | "footer";
  children: ReactNode;
  className?: string;
  id?: string;
  /** Extra classes on the inner measure column. */
  innerClassName?: string;
  /** Labels the section for assistive tech when it has no visible heading. */
  labelledBy?: string;
  width?: MeasureVariants["width"];
}

/**
 * A page section. Under uniformity every background is the same polarity as
 * every other one in its theme, so a section only chooses an ELEVATION - it does
 * not re-declare tokens. `--foreground`, `--muted`, `--accent`, `--border` and
 * the amber are global and legible on every rung in both themes; nested content,
 * including HeroUI components, needs nothing at the call site.
 *
 * `elevation` alternates down the page. `base` is the page default; `sunken` is
 * one rung below it (ΔL 0.048) and is the anchor treatment - hero, stack
 * display, principles, CTA, footer. Cards go to `--surface`, one rung above base
 * (ΔL 0.048) or two above sunken (ΔL 0.096).
 *
 * There is no `raised` value on purpose: in light mode `--surface` is the top of
 * the sRGB ladder, so a filled card inside a raised section would have nowhere
 * to go.
 */
export const Section = ({
  as: Element = "section",
  children,
  className,
  elevation,
  id,
  innerClassName,
  labelledBy,
  spacing,
  width = "band",
}: SectionProps) => (
  <Element
    aria-labelledby={labelledBy}
    className={section({ className, elevation, spacing })}
    id={id}
  >
    <div className={measure({ className: innerClassName, width })}>
      {children}
    </div>
  </Element>
);
