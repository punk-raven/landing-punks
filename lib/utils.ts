import type { ClassValue } from "clsx";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class-name joiner with Tailwind conflict resolution.
 *
 * Ported for `components/ui/circuit-board.tsx`, which upstream imports `cn`
 * from `@workspace/ui/lib/utils` - a monorepo path that does not exist here.
 * `clsx` was already a dependency; `tailwind-merge` was added alongside it so
 * a later utility in a `className` prop wins over an earlier one from the
 * component's own base classes rather than both landing in the class list.
 *
 * The rest of the codebase composes classes through `tailwind-variants`
 * recipes in `components/primitives.ts`, which already merge internally. Reach
 * for `cn` only in vendored components that expect it.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
