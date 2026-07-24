import { buttonVariants } from "@heroui/react";
import { tv } from "tailwind-variants";

/**
 * Type scale, spec §5.3: a real 1.25 ratio, no more than four sizes on a page.
 * From a 1rem base: 1 / 1.25 / 1.5625 / 1.953 / 2.441 / 3.052.
 *
 * There is no colour variant here on purpose, and none of the recipes below
 * carries a dark-mode variant either. Sections differ by ELEVATION, never by
 * polarity: in light mode every background is light and in dark mode every
 * background is dark, so `--foreground` / `--muted` / `--accent` are global,
 * declared once at `:root` and once at `:root.dark` (see styles/globals.css),
 * and legible on every elevation rung in both themes. A heading inherits the
 * right colour wherever it sits, with nothing to add at the call site.
 *
 * That is also why `statusChip` and `sectionRule` below need no theme handling:
 * they read `var(--uncertain*)` through arbitrary values, and the amber flips
 * with the rest of the semantic block. Reaching for a dark-mode variant in this
 * file is a signal that a token is missing from `:root.dark`, not that a variant
 * is needed.
 */
export const title = tv({
  base: "font-display font-semibold tracking-tight text-balance",
  variants: {
    size: {
      sm: "text-xl sm:text-[1.5625rem]",
      md: "text-[1.5625rem] sm:text-[1.953rem]",
      lg: "text-[1.953rem] sm:text-[2.441rem]",
      xl: "text-[2.441rem] sm:text-[3.052rem]",
    },
    tone: {
      current: "text-current",
      foreground: "text-foreground",
      muted: "text-muted",
      accent: "text-accent",
    },
    fullWidth: {
      true: "block w-full",
    },
  },
  defaultVariants: {
    size: "lg",
    tone: "foreground",
  },
});

export const subtitle = tv({
  base: "font-body text-muted text-pretty leading-relaxed",
  variants: {
    size: {
      sm: "text-base",
      md: "text-lg",
      lg: "text-lg sm:text-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Eyebrow - the one place besides the status chip where all-caps is allowed
 * (spec §5.3), set small with wide tracking in the data face.
 */
export const eyebrow = tv({
  base: "font-data text-xs uppercase tracking-[0.16em] text-muted",
  variants: {
    tone: {
      muted: "text-muted",
      accent: "text-accent",
    },
  },
  defaultVariants: {
    tone: "muted",
  },
});

export const prose = tv({
  base: "font-body text-base leading-[1.75] text-pretty [&_p+p]:mt-4",
});

/**
 * Measure, spec §5.4: 68ch for prose, 1120px for full-width sections. `prose` is
 * the reading column; `band` is the outer content width; `full` opts out for
 * elements that must bleed.
 */
export const measure = tv({
  base: "mx-auto w-full px-5 sm:px-6 lg:px-8",
  variants: {
    width: {
      prose: "max-w-measure",
      band: "max-w-band",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    width: "band",
  },
});

/**
 * Section, spec §5.4. Elevation, not polarity: in light mode every background is
 * light and in dark mode every background is dark. `base` is the page default;
 * `sunken` is one OKLCh-L rung below it (ΔL 0.048, above the 0.045 perceptibility
 * floor), which is what carries section rhythm now that bands are gone.
 */
export const section = tv({
  base: "w-full text-foreground",
  variants: {
    elevation: {
      base: "bg-background",
      sunken: "bg-sunken",
    },
    /* Generous vertical rhythm - this is a reading site, not a dashboard. */
    spacing: {
      none: "",
      sm: "py-10 sm:py-14",
      md: "py-16 sm:py-24",
      lg: "py-24 sm:py-32",
    },
  },
  defaultVariants: {
    elevation: "base",
    spacing: "md",
  },
});

/**
 * Section rule - a hairline in --separator, or the amber estimate divider.
 *
 * The amber is read as `var(--uncertain)` rather than through a `border-uncertain`
 * utility on purpose: `--uncertain*` is deliberately not mapped in `@theme
 * inline`, so no amber utility exists to reach for anywhere else on the site.
 * This recipe and `statusChip` below are the only two things allowed to have it
 * (spec §5.2, "protect it"). See the amber comment block in styles/globals.css.
 */
export const sectionRule = tv({
  base: "w-full border-0 border-t",
  variants: {
    tone: {
      rule: "border-separator",
      /* §5.2: amber only where the thing below it is an estimate. */
      uncertain: "border-[var(--uncertain)]",
    },
  },
  defaultVariants: {
    tone: "rule",
  },
});

/**
 * Status chip - spec §5.2 calls this the most important small component on the
 * site, and it is the primary consumer of the `uncertain` token. Set small with
 * wide tracking in the data face (§5.3).
 *
 * All three states share one amber treatment on purpose: the point of the token
 * is that the single warm colour on an otherwise cool site always means "we are
 * not certain about this". Differentiating the states by colour would dilute
 * that; the label is the differentiator.
 *
 * Like `sectionRule`, the amber is read as `var(--uncertain*)` directly - there
 * are no `bg-uncertain` / `text-uncertain` utilities to reach for.
 */
export const statusChip = tv({
  slots: {
    root: [
      "inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border",
      "border-[var(--uncertain)] bg-[var(--uncertain-surface)] text-[var(--uncertain-strong)]",
      "font-data font-medium uppercase tracking-[0.14em]",
    ],
    dot: "size-1.5 shrink-0 rounded-full bg-[var(--uncertain-strong)]",
  },
  variants: {
    size: {
      sm: {
        root: "px-1.5 py-0.5 text-[0.625rem]",
        dot: "size-1",
      },
      md: {
        root: "px-2 py-1 text-[0.6875rem]",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/**
 * Square hit target for a bare icon - the theme toggle, the hamburger and every
 * social link. One recipe rather than a string per call site, because the header
 * and footer clusters have to stay optically identical and they live in
 * different files.
 *
 * `size-11` is 44px, the WCAG 2.5.5 target size. The box is grown for real
 * rather than left at 36px and padded out with an invisible `after:-inset-1`
 * overlay: these controls sit in rows with `gap-1`, so a 4px overlay each side
 * would meet its neighbour's inside the 4px gap and the later sibling would
 * paint over it, leaving every control but the last a 40px-wide target that
 * still measures 44 if you only read the pseudo-element's own box. A real box
 * has no such edge case, and `document.elementFromPoint` agrees with it.
 *
 * Nothing about the glyph changes - the icons are sized at their call sites and
 * stay there. The recipe paints no fill and no border, so `rounded-md` and the
 * hover state have no rectangle to grow with the box: hover is a colour swap,
 * `muted` to `foreground`. The one visible consequence is the focus ring, and
 * it is the right one - focus is not styled here because the global
 * `:focus-visible` rule in styles/globals.css draws `2px solid var(--focus)` at
 * `outline-offset: 2px`, and that outline now traces the real 44px target
 * instead of a 36px sub-region of it.
 *
 * The 44px box carries 12px of its own padding either side of a 20px icon, so a
 * flush-left icon row sits 12px right of the text above it. The `-ml-3` /
 * `-mr-3` nudges in components/site-footer.tsx and in the navbar's disclosure
 * menu are re-derived from that; they were `-2` while this was `size-9`.
 */
export const iconButton = tv({
  base: [
    "inline-flex size-11 touch-manipulation items-center justify-center rounded-md",
    "text-muted transition-colors hover:text-foreground",
  ],
});

/**
 * Button - HeroUI's own recipe, re-exported so a link can be dressed as a
 * button without going through the `<button>` element. It emits BEM classes
 * (`button button--md button--primary`), and the house shape and type face are
 * applied to `.button` in the components layer of styles/globals.css, which is
 * HeroUI's documented customisation path.
 *
 * There are no colour overrides here: `--accent` is already rethemed to
 * `--sheen` in styles/globals.css, so `variant="primary"` is the sheen CTA.
 */
export const button = tv({
  extend: buttonVariants,
});
