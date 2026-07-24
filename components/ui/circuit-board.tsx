import type { CSSProperties, ReactNode } from "react";

import { useCallback, useId, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface CircuitNode {
  /** Optional glyph rendered inside the node marker. Decorative. */
  icon?: ReactNode;
  id: string;
  /** Optional caption under the node marker. Decorative. */
  label?: string;
  /** Diameter of the node marker, in viewBox units. */
  size?: number;
  x: number;
  y: number;
}

export interface CircuitConnection {
  /** Send a pulse along the trace. Ignored under `prefers-reduced-motion`. */
  animated?: boolean;
  /** Also send a pulse back the other way. */
  bidirectional?: boolean;
  from: string;
  to: string;
}

export interface CircuitBoardProps {
  className?: string;
  connections: CircuitConnection[];
  /** Height of the circuit board canvas. */
  height?: number;
  nodes: CircuitNode[];
  /** Seconds for one pulse to travel a trace. */
  pulseSpeed?: number;
  /** Dot grid behind the traces. */
  showGrid?: boolean;
  /** Trace stroke width, in viewBox units. */
  traceWidth?: number;
  /** Width of the circuit board canvas. */
  width?: number;
}

const PULSE_DASH = 26;
const GRID_STEP = 24;
const GRID_DOT_R = 1;

/**
 * Tile phase that centres the dot field inside the canvas.
 *
 * The pattern tiles from the rect's origin, so with the dot at the tile's
 * top-left corner the field is anchored top-left and whatever does not divide
 * evenly is dumped as dead space on the bottom and right edges. At 460x280 with
 * a 24 step that measured as 14 units of dead space below the last dot row
 * against 1 above the first - the dot field's ink centre came out at (229, 133)
 * rather than the canvas centre (230, 140).
 *
 * That matters because the dot field is the only *visible* frame: the canvas
 * rect itself has no fill or border, so a reader perceives the box as the dots.
 * Two boxes 7 units apart make "centred" ambiguous, and content centred on the
 * canvas reads as sitting low against the dots. Splitting the remainder evenly
 * collapses the two boxes onto each other, and then centring has one meaning.
 */
const gridPhase = (extent: number) => {
  const count = Math.max(
    1,
    Math.floor((extent - 2 * GRID_DOT_R) / GRID_STEP) + 1,
  );

  return (extent - GRID_STEP * (count - 1)) / 2 - GRID_DOT_R;
};

/**
 * Manhattan routing - out horizontally to the midpoint, down, then in. This is
 * what makes it read as a board trace rather than a network graph. The length
 * is exact for this path shape, so the pulse dash can be sized from it without
 * touching the DOM (`getTotalLength` would force a layout on every render).
 */
const trace = (from: CircuitNode, to: CircuitNode) => {
  if (from.x === to.x || from.y === to.y) {
    return {
      d: `M ${from.x} ${from.y} L ${to.x} ${to.y}`,
      length: Math.abs(to.x - from.x) + Math.abs(to.y - from.y),
    };
  }

  const midX = Math.round((from.x + to.x) / 2);

  return {
    d: `M ${from.x} ${from.y} H ${midX} V ${to.y} H ${to.x}`,
    length:
      Math.abs(midX - from.x) + Math.abs(to.y - from.y) + Math.abs(to.x - midX),
  };
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * MANDATORY HARDENING, spec §5.6: `prefers-reduced-motion` is respected on
 * every transition. The upstream component runs infinite framer-motion loops
 * with no guard, and the global `@media (prefers-reduced-motion: reduce)` block
 * in styles/globals.css cannot reach them - framer-motion drives these off the
 * animation frame, not off a CSS animation, so a CSS duration cap never applies.
 * The guard has to be in JavaScript, and it has to remove the animated elements
 * rather than shorten them.
 *
 * The server snapshot is `true` so the static form is the default; this
 * component is dynamically imported with `ssr: false`, but failing toward no
 * motion is the right default for a decorative element either way.
 */
const usePrefersReducedMotion = () => {
  const subscribe = useCallback((onChange: () => void) => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);

    query.addEventListener("change", onChange);

    return () => query.removeEventListener("change", onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => true,
  );
};

/**
 * Animated circuit board - traces between nodes, with a pulse travelling each
 * animated trace.
 *
 * Adapted from the Componentry `circuit-board` component (same public API:
 * `nodes`, `connections`, `width`, `height`, `showGrid`, `pulseSpeed`,
 * `traceWidth`, `className`), with three changes this site requires:
 *
 * 1. `cn` comes from `@/lib/utils`; upstream imports it from
 *    `@workspace/ui/lib/utils`, a monorepo path that does not exist here.
 * 2. The reduced-motion guard above.
 * 3. Colour comes from the semantic tokens rather than Tailwind colour classes:
 *    traces are `--sheen-alt` (teal, the diagram-stroke accent per spec §5.1),
 *    pulses are `--accent` (violet). No amber anywhere - `--uncertain` is
 *    reserved for status and uncertainty (spec §5.2), and a decorative diagram
 *    is neither.
 *
 *    Every colour here is a semantic token, never a raw primitive, so all four
 *    flip with the theme on their own: `--accent` is `--sheen` light and
 *    `--sheen-lift` dark, `--sheen-alt` is `--teal-deep` light and `--teal-lift`
 *    dark. Both clear 3:1 on every elevation rung in both themes (`--sheen-alt`
 *    4.00-5.37 light, 6.62-7.84 dark).
 *
 *    The node fill is `--surface`, not `--background`. Under the deleted band
 *    system `--background` was section-scoped and always differed from the
 *    section the diagram sat in; with uniform elevation a node drawn in
 *    `--background` on a `base` section would be isoluminant with it and the
 *    marker would disappear. `--surface` is one rung above base, ΔL 0.048.
 *
 *    The grid dot stays `--separator` - decorative by design, and deliberately
 *    below the 3:1 floor.
 *
 * Decorative by construction: it restates a dependency that the markup beside
 * it already states in words, so it carries `aria-hidden` at the call site and
 * every label inside it is presentational.
 */
export const CircuitBoard = ({
  className,
  connections,
  height = 400,
  nodes,
  pulseSpeed = 2,
  showGrid = true,
  traceWidth = 2,
  width = 600,
}: CircuitBoardProps) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const gridId = `circuit-grid-${useId()}`;
  const byId = new Map(nodes.map((node) => [node.id, node]));

  const traces = connections.flatMap((connection, index) => {
    const from = byId.get(connection.from);
    const to = byId.get(connection.to);

    if (!from || !to) {
      return [];
    }

    return [
      {
        ...trace(from, to),
        connection,
        index,
        key: `${connection.from}-${connection.to}-${index}`,
      },
    ];
  });

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ aspectRatio: `${width} / ${height}` } as CSSProperties}
    >
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
        viewBox={`0 0 ${width} ${height}`}
      >
        {showGrid ? (
          <>
            <defs>
              <pattern
                height={GRID_STEP}
                id={gridId}
                patternUnits="userSpaceOnUse"
                width={GRID_STEP}
                x={gridPhase(width)}
                y={gridPhase(height)}
              >
                <circle
                  cx={GRID_DOT_R}
                  cy={GRID_DOT_R}
                  fill="var(--separator)"
                  r={GRID_DOT_R}
                />
              </pattern>
            </defs>
            <rect fill={`url(#${gridId})`} height={height} width={width} />
          </>
        ) : null}

        {traces.map(({ connection, d, key, length }) => (
          <g key={key}>
            {/* The trace itself. Always rendered - this is the whole diagram
                under reduced motion. */}
            <path
              d={d}
              stroke="var(--sheen-alt)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={traceWidth}
            />
            {connection.animated && !prefersReducedMotion ? (
              <motion.path
                animate={{ strokeDashoffset: [0, -(length + PULSE_DASH)] }}
                d={d}
                initial={{ strokeDashoffset: 0 }}
                stroke="var(--accent)"
                strokeDasharray={`${PULSE_DASH} ${length}`}
                strokeLinecap="round"
                strokeWidth={traceWidth + 1}
                transition={{
                  duration: pulseSpeed,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            ) : null}
            {connection.animated &&
            connection.bidirectional &&
            !prefersReducedMotion ? (
              <motion.path
                animate={{ strokeDashoffset: [-(length + PULSE_DASH), 0] }}
                d={d}
                initial={{ strokeDashoffset: -(length + PULSE_DASH) }}
                stroke="var(--accent)"
                strokeDasharray={`${PULSE_DASH} ${length}`}
                strokeLinecap="round"
                strokeWidth={traceWidth + 1}
                transition={{
                  duration: pulseSpeed,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
            ) : null}
          </g>
        ))}

        {nodes.map((node) => {
          const size = node.size ?? 44;

          return (
            <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
              <circle
                fill="var(--surface)"
                r={size / 2}
                stroke="var(--sheen-alt)"
                strokeWidth={traceWidth}
              />
              {node.icon ? (
                <foreignObject
                  height={size}
                  width={size}
                  x={-size / 2}
                  y={-size / 2}
                >
                  {/* React puts `foreignObject` children in the HTML
                      namespace on its own, so no explicit `xmlns` is needed
                      here - and adding one is a type error. */}
                  <div className="flex h-full w-full items-center justify-center text-foreground">
                    {node.icon}
                  </div>
                </foreignObject>
              ) : null}
              {node.label ? (
                <text
                  className="fill-muted font-data text-[13px] tracking-[0.08em]"
                  textAnchor="middle"
                  y={size / 2 + 20}
                >
                  {node.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CircuitBoard;
