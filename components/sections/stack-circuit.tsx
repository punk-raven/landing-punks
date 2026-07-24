import { AudioLines, MessagesSquare, ScrollText } from "lucide-react";

import { CircuitBoard } from "@/components/ui/circuit-board";

/**
 * The dependency diagram behind the two-tier stack display: the two
 * infrastructure layers feed a junction, and the junction feeds the one
 * application built on them.
 *
 * This module exists so the lucide glyphs, framer-motion and the circuit board
 * itself all land in one lazily-loaded chunk. `components/sections/stack-display`
 * pulls it in with `next/dynamic` and `ssr: false`, so none of it sits on the
 * critical path of a page whose job is to be read.
 *
 * Decorative. The call site marks it `aria-hidden`; the dependency it draws is
 * stated in words by the "Built on it" group label and by LawSafe's own block.
 * Colour is corvid: traces `--sheen-alt` (teal), pulses `--accent` (violet).
 * Both are semantic tokens and flip with the theme, so the diagram needs nothing
 * here. No amber (§5.2).
 *
 * ## The node coordinates are measured, not eyeballed - do not "tidy" them
 *
 * `CircuitBoard` draws each label 42 units below its node centre and gives it no
 * counterweight above, so a set of coordinates that looks symmetric on paper
 * renders low and right. Measured in the browser against the 460x280 canvas, the
 * obvious geometry (nodes at x 78/230/382, y 76/140/204) put the drawn content's
 * ink at x 53.24-410.89 and y 53.00-246.15: centre (232.07, 149.58) against a
 * canvas centre of (230, 140), i.e. 9.6 units low and 2.1 units right. The SVG
 * carries `overflow-visible`, so nothing clipped and nothing complained.
 *
 * The coordinates below are that geometry shifted by (-2, -10), which lands the
 * ink margins at 51.2/51.1 horizontally and 43.0/43.9 vertically - square to
 * within a unit on both axes.
 *
 * Two consequences worth knowing before editing:
 *
 * 1. The extreme marks on the x axis are the "LawMan" and "LawSafe" *labels*,
 *    not the nodes. Centring the whole figure therefore costs the node circles
 *    their own symmetry (they sit 53 from the left edge and 57 from the right)
 *    because "LawSafe" is 9 units wider than "LawMan". That is the correct
 *    trade - the figure is what gets centred - but it means the numbers look
 *    wrong until you measure them.
 * 2. Because the labels set the horizontal extent, **renaming a product changes
 *    the correct x offset.** Re-measure rather than assuming it still holds.
 */
const StackCircuit = () => (
  <CircuitBoard
    className="mx-auto max-w-[32rem]"
    connections={[
      { from: "tnt", to: "junction", animated: true },
      { from: "lawman", to: "junction", animated: true },
      { from: "junction", to: "lawsafe", animated: true },
    ]}
    height={280}
    nodes={[
      {
        id: "tnt",
        x: 76,
        y: 66,
        label: "TNT",
        icon: <AudioLines className="size-5" />,
      },
      {
        id: "lawman",
        x: 76,
        y: 194,
        label: "LawMan",
        icon: <ScrollText className="size-5" />,
      },
      { id: "junction", x: 228, y: 130, size: 14 },
      {
        id: "lawsafe",
        x: 380,
        y: 130,
        label: "LawSafe",
        icon: <MessagesSquare className="size-5" />,
      },
    ]}
    pulseSpeed={2.6}
    width={460}
  />
);

export default StackCircuit;
