import { ReactNode } from 'react';

/**
 * Line-by-line masked reveal for the hero headline.
 *
 * Each line sits in an overflow-hidden wrapper and rises from beneath it. The
 * motion is a pure CSS animation keyed off a per-line delay, which matters for
 * more than tidiness: the headline is the page's LCP element, and a
 * JS-toggled reveal meant it could not paint until React had hydrated. As CSS
 * it starts at first paint, and the last line has landed inside 800ms.
 *
 * That also makes this a server component — the hero headline ships no client
 * JavaScript at all.
 *
 * With JavaScript off the `.js` scope never applies and the lines are simply
 * visible. Under reduced motion the animation is cancelled and the lines sit
 * at their final position.
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
  startDelay = 40,
  stagger = 80,
  className = '',
  lineClassName,
}: MaskedLinesProps) {
  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span key={index} className={`line-mask ${lineClassName?.(index) ?? ''}`}>
          <span
            style={
              { '--line-delay': `${startDelay + index * stagger}ms` } as React.CSSProperties
            }
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}
