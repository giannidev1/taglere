'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ButtonLink } from './ui/Button';

const NAV_LINKS = [
  { label: 'Why cash', href: '#why-cash' },
  { label: 'How it works', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
] as const;

function Wordmark({ isDark }: { isDark: boolean }) {
  return (
    <span className="font-display text-2xl tracking-tight">
      <span
        className={`transition-colors duration-500 ease-settle ${
          isDark ? 'text-ink' : 'text-sand-light'
        }`}
      >
        I Buy{' '}
      </span>
      <span className="italic text-accent">Bay Park</span>
    </span>
  );
}

/**
 * Every navigation target is a real anchor, so the nav works with JavaScript
 * disabled and smooth scrolling comes from CSS rather than a click handler.
 *
 * The scroll progress bar is written straight to the element's transform
 * inside a rAF — it never goes through React state, so scrolling the page does
 * not re-render the tree once per frame.
 */
export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let scrolled = false;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;

        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;

        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
        }

        // Only touches React state when the boolean actually flips.
        const past = window.scrollY > 50;
        if (past !== scrolled) {
          scrolled = past;
          setIsScrolled(past);
        }
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Lock the page while the mobile overlay is open, and let Escape close it.
  useEffect(() => {
    if (!isMenuOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[100] h-0.5 origin-left bg-accent"
        style={{ transform: 'scaleX(0)' }}
      />

      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow] duration-500 ease-settle ${
          isScrolled
            ? 'bg-sand/85 py-3 shadow-[0_1px_0_0_theme(colors.stucco)] backdrop-blur-nav'
            : 'on-dark bg-transparent py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#top" className="rounded-sm">
            <Wordmark isDark={isScrolled} />
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`wipe-link text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? 'text-ink-soft hover:text-ink'
                    : 'text-sand/80 hover:text-sand-light'
                }`}
              >
                {link.label}
              </a>
            ))}

            <ButtonLink href="#contact" size="sm">
              Get cash offer
            </ButtonLink>
          </div>

          <button
            type="button"
            className={`-mr-2 p-2 transition-colors md:hidden ${
              isScrolled ? 'text-ink' : 'text-sand-light'
            }`}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/*
        Always in the DOM so opening it animates transform and opacity only.
        `invisible` keeps it out of the tab order and the accessibility tree
        while closed, so it can never trap focus.
      */}
      <div
        id="mobile-menu"
        className={`on-dark fixed inset-0 z-40 bg-brand-deep/95 backdrop-blur-lg transition-[opacity,transform] duration-500 ease-settle md:hidden ${
          isMenuOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="font-display text-3xl text-sand-light transition-colors duration-300 hover:text-accent"
            >
              {link.label}
            </a>
          ))}

          <ButtonLink
            href="#contact"
            size="lg"
            className="mt-4"
            onClick={() => setIsMenuOpen(false)}
          >
            Get cash offer
          </ButtonLink>
        </div>
      </div>
    </>
  );
}
