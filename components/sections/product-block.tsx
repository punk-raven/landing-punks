import type { ProductBlockContent } from "@/content/home";

import NextLink from "next/link";

import { products } from "@/content/home";
import { Section } from "@/components/section";
import { StatusChip } from "@/components/status-chip";
import { eyebrow, prose, sectionRule, title } from "@/components/primitives";

/**
 * One homepage product block. Every block carries a status chip (§2b.6) and a
 * secondary link through to its own page - never a primary CTA. The only
 * primary CTA on the site is "Request early access" (§2b.7).
 */
export const ProductBlock = ({ product }: { product: ProductBlockContent }) => (
  <article className="grid gap-x-10 gap-y-5 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
    <div>
      <p className={eyebrow()}>{product.eyebrow}</p>
      <StatusChip className="mt-3" size="sm" status={product.status} />
    </div>

    <div>
      <h2 className={title({ className: "max-w-[26ch]", size: "sm" })}>
        {product.heading}
      </h2>

      {product.body.map((paragraph) => (
        <p
          key={paragraph}
          className={prose({ className: "mt-4 max-w-measure" })}
        >
          {paragraph}
        </p>
      ))}

      {product.proof ? (
        <p className="mt-5 max-w-measure border-l-2 border-sheen-alt pl-4 font-data text-sm leading-relaxed text-muted">
          {product.proof}
        </p>
      ) : null}

      <NextLink
        className="mt-6 inline-flex items-center gap-1.5 font-body text-sm font-medium text-accent underline-offset-4 hover:underline"
        href={product.cta.href}
      >
        {product.cta.label}
        <span aria-hidden="true">&rarr;</span>
      </NextLink>
    </div>
  </article>
);

/**
 * B4. Product blocks.
 *
 * Ordered T&T, then Lawman, then LawSafe, and that order is the argument
 * (§2a.1): infrastructure before application, everywhere on the site. Leading
 * with LawSafe re-categorises the company in the reader's head as legal
 * software. The order lives in `content/home.ts`; do not sort or filter it here.
 */
export const ProductBlocks = () => (
  <Section spacing="lg">
    <ul className="flex flex-col">
      {products.map((product, index) => (
        <li key={product.eyebrow}>
          {index > 0 ? (
            <hr className={sectionRule({ className: "my-12 sm:my-16" })} />
          ) : null}
          <ProductBlock product={product} />
        </li>
      ))}
    </ul>
  </Section>
);
