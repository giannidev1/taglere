'use client';

import { ReactNode, useEffect, useRef } from 'react';

/**
 * Line-by-line masked reveal for the hero headline.
 *
 * Each line sits in an overflow-hidden wrapper and slides up from beneath it.
 * The hero is above the fold, so this fires on mount rather than on scroll —
 * the headline is the thing that has to earn attention immediately.
 *
 * With JS off the `.js` scope in globals.css never applies and the lines are
 * simply visible. Under reduced motion the CSS pins them at their final
 * position, so this component's timers become inert rather than harmful.
 */
interface MaskedLinesProps {
  lines: ReactNode[];
  /** Delay before the first line starts, in ms. */
  startDelay?: number;
  /** Gap between consecutive lines, in ms. */
  stagger?: number;
  className?: string;
  lineClassName?: (index: number) => string;
}

export default function MaskedLines({
  lines,
  startDelay = 120,
  stagger = 80,
  className = '',
  lineClassName,
}: MaskedLinesProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // One frame's grace so the initial transform is committed before the
    // transition to the final state begins.
    const frame = requestAnimationFrame(() => {
      root.querySelectorAll('.line-mask').forEach((mask) => {
        mask.classList.add('is-revealed');
      });
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <span ref={ref} className={className}>
      {lines.map((line, index) => (
        <span key={index} className={`line-mask ${lineClassName?.(index) ?? ''}`}>
          <span style={{ '--line-delay': `${startDelay + index * stagger}ms` } as React.CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
