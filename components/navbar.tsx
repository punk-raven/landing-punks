import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { measure } from "@/components/primitives";
import { GithubIcon, Logo } from "@/components/icons";

const MOBILE_MENU_ID = "navbar-mobile-menu";

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
    <header className="band--paper sticky top-0 z-40 w-full border-b border-separator bg-background/80 backdrop-blur-lg">
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
              <a
                aria-label={`${siteConfig.name} on GitHub`}
                className="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground"
                href={siteConfig.links.github}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GithubIcon aria-hidden="true" size={20} />
              </a>
              <button
                aria-controls={MOBILE_MENU_ID}
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:text-foreground md:hidden"
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
          <ul
            className={clsx(measure({ width: "band" }), "flex flex-col py-2")}
          >
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
        </div>
      </nav>
    </header>
  );
};
