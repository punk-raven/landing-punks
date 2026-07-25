import type { ReactNode } from "react";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { prose, title } from "@/components/primitives";

export interface BouncyAccordionItem {
  content: ReactNode;
  id: string;
  title: ReactNode;
}

export interface BouncyAccordionProps {
  className?: string;
  collapsible?: boolean;
  defaultValue?: string | null;
  items: BouncyAccordionItem[];
}

/**
 * Bouncy Accordion, after componentry.dev's component of the same name. The
 * original ships shadcn tokens and an unnamed physics lib; here the palette is
 * mapped onto this repo's semantic tokens (`text-foreground`, `text-muted`,
 * `border-separator`) and the bounce is a framer-motion spring that overshoots
 * `height: auto` for the playful settle. `useReducedMotion` swaps the spring for
 * an instant cut so a reduced-motion request removes the bounce entirely.
 *
 * Follows the ARIA accordion pattern: each trigger is a real `<button>` inside a
 * heading, carrying `aria-expanded` and `aria-controls` for a panel that is
 * `role="region"` labelled back by the trigger id. The chevron is decorative and
 * `aria-hidden`; keyboard toggle (Enter/Space) and the global focus ring come
 * from the native button.
 */

const spring = {
  damping: 15,
  mass: 1,
  stiffness: 280,
  type: "spring",
} as const;
const instant = { duration: 0 } as const;

export const BouncyAccordion = ({
  className,
  collapsible = true,
  defaultValue = null,
  items,
}: BouncyAccordionProps) => {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(defaultValue);

  const transition = reducedMotion ? instant : spring;

  const toggle = (id: string) => {
    setActive((current) => (current === id && collapsible ? null : id));
  };

  return (
    <div className={className}>
      {items.map((item) => {
        const open = item.id === active;
        const panelId = `bouncy-panel-${item.id}`;
        const triggerId = `bouncy-trigger-${item.id}`;

        return (
          <div key={item.id} className="border-t border-separator">
            <h3 className="m-0">
              <button
                aria-controls={panelId}
                aria-expanded={open}
                className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 py-6 text-left touch-manipulation"
                id={triggerId}
                type="button"
                onClick={() => toggle(item.id)}
              >
                <span className={title({ size: "sm" })}>{item.title}</span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  aria-hidden="true"
                  className="shrink-0 text-muted"
                  transition={transition}
                >
                  <ChevronDown className="size-5" />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open ? (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  aria-labelledby={triggerId}
                  className="overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  role="region"
                  transition={transition}
                >
                  <div className={prose({ className: "pb-6 text-muted" })}>
                    {item.content}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
