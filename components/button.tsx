import type { ButtonProps } from "@heroui/react";
import type { ComponentPropsWithoutRef } from "react";

import NextLink from "next/link";

import { button } from "@/components/primitives";

/**
 * HeroUI's Button, re-exported unchanged. There is no wrapper component: a
 * pass-through that forwards every prop and adds nothing only costs a render
 * frame and a broken ref. The house shape and type face are applied to the
 * `.button` BEM class in the components layer of styles/globals.css, so they
 * reach this component without it being wrapped.
 */
export { Button } from "@heroui/react";
export type { ButtonProps };

type ButtonStyleProps = Pick<
  ButtonProps,
  "fullWidth" | "isIconOnly" | "size" | "variant"
>;

export interface ButtonLinkProps
  extends ButtonStyleProps,
    Omit<ComponentPropsWithoutRef<typeof NextLink>, "className"> {
  className?: string;
}

/**
 * A link that looks like a button - what every call to action on the site
 * actually is, now that the primary "Request early access" CTA §2b.7 defined
 * has been withdrawn and only navigation links remain. It
 * has to be an anchor: rendering navigation as a `<button>` breaks
 * middle-click, "open in new tab", and the screen-reader role.
 */
export const ButtonLink = ({
  className,
  fullWidth,
  isIconOnly,
  size,
  variant,
  ...props
}: ButtonLinkProps) => (
  <NextLink
    className={button({ className, fullWidth, isIconOnly, size, variant })}
    {...props}
  />
);
