import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useTheme } from "next-themes";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/social-links";
import { iconButton, measure } from "@/components/primitives";
import { Logo, MoonFilledIcon, SunFilledIcon } from "@/components/icons";

const MOBILE_MENU_ID = "navbar-mobile-menu";

/**
 * Two-state theme toggle, not a three-way picker. next-themes runs
 * `defaultTheme="system"` with `enableSystem`, so the initial state follows the
 * OS and the first click is the user overriding it.
 *
 * `mounted` is load-bearing: `resolvedTheme` is undefined on the server and on
 * the first client render, so without it the icon and the accessible name would
 * flip between the two and throw a hydration mismatch on every load. Until
 * mounted this renders the moon, identically on both sides.
 *
 * The label describes the ACTION, not the state, and there is no `aria-pressed`
 * - this swaps one mode for another rather than toggling a property on, and the
 * label already carries the state. No `title` either; it would duplicate the
 * announcement. Focus needs no CSS of its own: the `:focus-visible` rule in
 * styles/globals.css draws `2px solid var(--focus)`, and `--focus` is one global
 * token that flips with the theme - `--sheen` light, `--sheen-lift` dark - so it
 * clears 4.5:1 against the header's composited fill in both.
 */
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = isMounted && resolvedTheme === "dark";

  return (
    <button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={iconButton()}
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <SunFilledIcon size={20} /> : <MoonFilledIcon size={20} />}
    </button>
  );
};

/**
 * Segment-boundary match, not a prefix match: a bare `startsWith` marks
 * `/about` as the current page while the user is on `/about-us`.
 */
const isCurrent = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  return (
    // `border-b border-border` is the separator, and it is mandatory. No fill
    // strategy separates a translucent sticky header in every case: a card
    // scrolling under it sits on --surface, the same rung the header samples, so
    // the fills composite to ΔL 0.0000 whatever the opacity. The line is what
    // draws the edge - 5.86-6.12:1 light and 4.43-4.58:1 dark against the
    // composited fill, and >= 4.4:1 against the content below it. Never
    // `border-separator` here: at 1.4-1.9:1 that is decoration pretending to be
    // structure.
    //
    // 85%, not 80%: at 80% the composite over a base section drops to ΔL 0.034,
    // under the 0.045 perceptibility floor the rest of the system holds to.
    <header className="sticky top-0 z-40 w-full border-b border-border bg-surface/85 backdrop-blur-lg">
      {/* The disclosure menu is inside this <nav>, not a sibling of it: as a
          sibling its links sat in no landmark at all. It also stays mounted and
          is hidden with `hidden` rather than being conditionally rendered, so
          the id `aria-controls` points at exists while the menu is closed. */}
      <nav aria-label="Main">
        <div className={measure({ width: "band" })}>
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <NextLink
                aria-label={`${siteConfig.name} home`}
                className="flex items-center gap-2 text-foreground"
                href="/"
              >
                <Logo aria-hidden="true" size={28} />
                {/* Uppercase as CSS, not as content - the accessible name, the
                    document title and og:title stay sentence case (§5.3). */}
                <span className="font-display text-base font-semibold uppercase tracking-tight">
                  {siteConfig.name}
                </span>
              </NextLink>
              <ul className="hidden items-center gap-6 md:flex">
                {siteConfig.navItems.map((item) => (
                  <li key={item.href}>
                    <NextLink
                      aria-current={
                        isCurrent(pathname, item.href) ? "page" : undefined
                      }
                      className={clsx(
                        "font-body text-sm text-muted transition-colors hover:text-foreground",
                        "aria-[current=page]:font-medium aria-[current=page]:text-foreground",
                      )}
                      href={item.href}
                    >
                      {item.label}
                    </NextLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-1">
              {/* The theme toggle is first in the cluster and outside the
                  disclosure menu, so the order is [theme] [socials] [menu] and
                  the toggle keeps its position at every breakpoint.

                  The four social links drop below `md` for the same reason the
                  nav links do: at 375px, five 44px targets plus the wordmark
                  overflow the bar. They reappear at the foot of the open
                  disclosure menu, so no destination is unreachable on a phone -
                  and the footer carries the same cluster on every page. */}
              <ThemeToggle />
              <div className="hidden md:block">
                <SocialLinks />
              </div>
              <button
                aria-controls={MOBILE_MENU_ID}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className={clsx(iconButton(), "md:hidden")}
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  aria-hidden="true"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  ) : (
                    <path
                      d="M4 6h16M4 12h16M4 18h16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            "border-t border-separator md:hidden",
            !isMenuOpen && "hidden",
          )}
          id={MOBILE_MENU_ID}
        >
          <div className={clsx(measure({ width: "band" }), "py-2")}>
            <ul className="flex flex-col">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <NextLink
                    aria-current={
                      isCurrent(pathname, item.href) ? "page" : undefined
                    }
                    className="block py-2 font-body text-base text-muted aria-[current=page]:font-medium aria-[current=page]:text-foreground"
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </NextLink>
                </li>
              ))}
            </ul>

            {/* Negative inline start offset only - the icon buttons carry 12px
                of their own padding either side (44px box, 20px icon), so a
                flush-left row would sit 12px right of the text links above it.
                Re-derived from 8px when the target grew from 36px to 44px. */}
            <div className="-ml-3 mt-2 border-t border-separator pt-2">
              <SocialLinks />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
