import type { IconSvgProps } from "@/types";
import type { FC } from "react";

import { siteConfig } from "@/config/site";
import { iconButton } from "@/components/primitives";
import { GithubIcon, InstagramIcon, MailIcon, XIcon } from "@/components/icons";

interface SocialLink {
  Icon: FC<IconSvgProps>;
  href: string;
  /** Accessible name. There is no visible label - the icon is the whole link. */
  label: string;
}

/**
 * One list, rendered identically in the header and the footer. Adding an
 * account is a single entry here and it appears in both places; that is the
 * point of the shared component, because two hand-maintained clusters drift.
 *
 * Order is GitHub, X, Instagram, email: the code first because that is the
 * claim this company makes, and the address last because it is the one that
 * asks something of the reader.
 */
const SOCIAL_LINKS: SocialLink[] = [
  {
    Icon: GithubIcon,
    href: siteConfig.links.github,
    label: `${siteConfig.name} on GitHub`,
  },
  {
    Icon: XIcon,
    href: siteConfig.links.x,
    label: `${siteConfig.name} on X`,
  },
  {
    Icon: InstagramIcon,
    href: siteConfig.links.instagram,
    label: `${siteConfig.name} on Instagram`,
  },
  {
    Icon: MailIcon,
    href: `mailto:${siteConfig.links.email}`,
    label: `Email ${siteConfig.name} at ${siteConfig.links.email}`,
  },
];

/**
 * `mailto:` opens a mail client rather than a document, so it gets neither
 * `target="_blank"` - which would leave an empty tab behind - nor `rel`. The
 * three real outbound links get both.
 */
const isNewTab = (href: string) => !href.startsWith("mailto:");

export const SocialLinks = () => (
  <ul className="flex items-center gap-1">
    {SOCIAL_LINKS.map(({ Icon, href, label }) => (
      <li key={href}>
        <a
          aria-label={label}
          className={iconButton()}
          href={href}
          rel={isNewTab(href) ? "noopener noreferrer" : undefined}
          target={isNewTab(href) ? "_blank" : undefined}
        >
          <Icon aria-hidden="true" size={20} />
        </a>
      </li>
    ))}
  </ul>
);
