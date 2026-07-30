'use client';

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

type Variant = 'primary' | 'secondary' | 'quiet';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-accent text-ink hover:bg-accent-deep hover:text-sand-light border border-transparent',
  secondary:
    'bg-transparent border border-ink/25 text-ink hover:border-ink/60 hover:bg-ink/[0.04]',
  quiet:
    'bg-transparent border border-sand/40 text-sand hover:border-sand/80 hover:bg-sand/10',
};

const SIZES: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-base',
  lg: 'px-9 py-4 text-base sm:text-lg',
};

export function buttonClasses(
  variant: Variant = 'primary',
  size: Size = 'md',
  className = ''
) {
  return [
    'relative inline-flex items-center justify-center rounded-full font-medium tracking-tight no-underline',
    'transition-[background-color,border-color,color,transform,opacity] duration-300 ease-settle',
    // The pressed state — the one that matters on touch.
    'active:scale-[0.97]',
    'disabled:opacity-60 disabled:pointer-events-none',
    VARIANTS[variant],
    SIZES[size],
    className,
  ].join(' ');
}

/** How far a control may drift toward the cursor, in px. */
const PULL = 6;

/**
 * Magnetic pull toward the cursor, desktop only.
 *
 * Skipped entirely under reduced motion and on coarse pointers, where the
 * pressed state does the work instead. Reads and writes are separated inside a
 * single rAF, and `will-change` is set on enter and cleared on leave rather
 * than left on the element permanently.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement>,
  enabled: boolean = true
) {
  const frame = useRef<number>(0);
  const prefersReduced = usePrefersReducedMotion();

  const settle = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      element.style.transform = '';
      element.style.willChange = '';
    });
  }, [ref]);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReduced || !enabled) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onEnter = () => {
      element.style.willChange = 'transform';
    };

    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const box = element.getBoundingClientRect();
        const dx = (event.clientX - (box.left + box.width / 2)) / (box.width / 2);
        const dy = (event.clientY - (box.top + box.height / 2)) / (box.height / 2);
        element.style.transform = `translate3d(${(dx * PULL).toFixed(2)}px, ${(
          dy * PULL
        ).toFixed(2)}px, 0)`;
      });
    };

    element.addEventListener('pointerenter', onEnter);
    element.addEventListener('pointermove', onMove);
    element.addEventListener('pointerleave', settle);
    element.addEventListener('blur', settle);

    return () => {
      cancelAnimationFrame(frame.current);
      element.removeEventListener('pointerenter', onEnter);
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', settle);
      element.removeEventListener('blur', settle);
      element.style.transform = '';
      element.style.willChange = '';
    };
  }, [enabled, prefersReduced, ref, settle]);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useMagnetic(ref, !props.disabled);

  return (
    <button ref={ref} className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

/**
 * A button-shaped anchor. Used for in-page navigation so the CTAs are real
 * links that work with JavaScript disabled, with smooth scrolling coming from
 * CSS rather than a click handler.
 */
export function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  useMagnetic(ref);

  return (
    <a ref={ref} className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
