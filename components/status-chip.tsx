import type { VariantProps } from "tailwind-variants";

import { statusChip } from "@/components/primitives";

/**
 * The three product statuses, spec §2b.6: `Planning` for TNT, `Specified` for
 * LawMan, `In design` for LawSafe. Sentence case, exactly as written there.
 */
export const STATUS_LABELS = {
  planning: "Planning",
  specified: "Specified",
  "in-design": "In design",
} as const;

export type ProductStatus = keyof typeof STATUS_LABELS;

export interface StatusChipProps extends VariantProps<typeof statusChip> {
  className?: string;
  status: ProductStatus;
}

/**
 * Status chip - spec §5.2. The primary consumer of the `uncertain` token and,
 * per §4.4, the most important small component on the site: every product on
 * every page carries one, and the amber says the product is not shipped.
 *
 * Rendered as text, not a colour-only signal, so it survives both a monochrome
 * display and a screen reader; the visible label is prefixed for assistive tech
 * so "Planning" is not read as a bare adjective.
 */
export const StatusChip = ({ className, size, status }: StatusChipProps) => {
  const styles = statusChip({ size });

  return (
    <span className={styles.root({ className })}>
      <span aria-hidden="true" className={styles.dot()} />
      <span className="sr-only">Status: </span>
      {STATUS_LABELS[status]}
    </span>
  );
};
