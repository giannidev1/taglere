'use client';

import { ElementType, ReactNode, useEffect, useRef } from 'react';

/**
 * One shared IntersectionObserver drives every staged reveal on the page —
 * cheaper than a scroll listener, and it batches its own reads.
 *
 * The bottom rootMargin means an element reveals once it is roughly 15% into
 * the viewport, so it never feels late. Each element is unobserved the moment
 * it fires: reveals play once and do not re-run on scroll-up.
 */
let observer: IntersectionObserver | null = null;
let watched = 0;

function acquireObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          observer?.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0 }
    );
  }
  watched += 1;
  return observer;
}

function releaseObserver(element: Element) {
  observer?.unobserve(element);
  watched -= 1;
  if (watched <= 0) {
    observer?.disconnect();
    observer = null;
    watched = 0;
  }
}

interface RevealProps {
  children: ReactNode;
  /** Stagger within a group, in ms. Keep groups in reading order. */
  delay?: number;
  /** Travel distance in px. The brief's range is 20–40. */
  shift?: number;
  as?: ElementType;
  className?: string;
  id?: string;
}

export default function Reveal({
  children,
  delay = 0,
  shift = 28,
  as: Tag = 'div',
  className = '',
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Already visible on load (above the fold) — reveal on the next frame so
    // the transition still plays rather than snapping.
    const io = acquireObserver();
    io.observe(element);

    return () => releaseObserver(element);
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal=""
      className={className}
      style={
        {
          '--reveal-delay': `${delay}ms`,
          '--reveal-shift': `${shift}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
