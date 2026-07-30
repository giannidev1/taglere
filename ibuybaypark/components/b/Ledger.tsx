'use client';

import { useEffect, useRef, useState } from 'react';
import {
  BAY_PARK_MEDIAN_PRICE,
  CALCULATOR_MAX_PRICE,
  CALCULATOR_MIN_PRICE,
  CALCULATOR_STEP,
  calculateTraditionalSaleCosts,
  formatCurrency,
  formatRate,
} from '@/lib/sellingCosts';

/**
 * The signature element: the cost of a normal sale, set as the settlement
 * statement a seller actually receives at closing. Ruled lines, monospaced
 * figures, a running total.
 *
 * The offer column is deliberately a rubber stamp rather than a figure. A
 * number generated from a slider would be a guess dressed up as a quote.
 */
export default function Ledger() {
  const [salePrice, setSalePrice] = useState(BAY_PARK_MEDIAN_PRICE);
  const [filled, setFilled] = useState(0);
  const ref = useRef<HTMLElement | null>(null);

  const { lines, total, netProceeds } = calculateTraditionalSaleCosts(salePrice);

  // The statement writes itself out once, the first time it comes into view.
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setFilled(lines.length);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        lines.forEach((_, i) => {
          setTimeout(() => setFilled((n) => Math.max(n, i + 1)), 90 * i);
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section className="s-section" id="ledger" ref={ref}>
      <div className="s-wrap">
        <span className="s-stake" aria-hidden="true" />
        <span className="s-tag">Statement of estimated costs</span>
        <h2 className="s-h2" style={{ marginTop: '0.75rem' }}>
          Selling on the open market is not free.
        </h2>
        <p className="s-lede">
          Everyone knows about the commission. It is the other four lines that
          surprise people. Set your house&rsquo;s value and read down.
        </p>

        <article className="s-doc">
          <div className="s-doc-head">
            <span className="s-tag">Estimated seller costs</span>
            <span className="s-tag">Bay Park, CA</span>
          </div>

          <div className="s-doc-body">
            <div className="s-measure">
              <label htmlFor="b-price" className="s-tag" style={{ display: 'block' }}>
                Sale price
              </label>
              <div className="s-measure-val">{formatCurrency(salePrice)}</div>
              <input
                id="b-price"
                type="range"
                min={CALCULATOR_MIN_PRICE}
                max={CALCULATOR_MAX_PRICE}
                step={CALCULATOR_STEP}
                value={salePrice}
                onChange={(e) => setSalePrice(Number(e.target.value))}
                aria-valuetext={formatCurrency(salePrice)}
              />
              <div className="s-ends">
                <span>{formatCurrency(CALCULATOR_MIN_PRICE)}</span>
                <span>{formatCurrency(CALCULATOR_MAX_PRICE)}</span>
              </div>
            </div>

            {lines.map((line, i) => (
              <div className="s-line" key={line.key} data-in={i < filled}>
                <div>
                  <div className="s-line-label">{line.label}</div>
                  <div className="s-line-rate">{formatRate(line.rate)}</div>
                </div>
                <div className="s-line-amt">&minus;{formatCurrency(line.amount)}</div>
              </div>
            ))}

            <div className="s-total">
              <div className="s-tag" style={{ color: 'var(--ink)' }}>
                Total off the top
              </div>
              <div className="s-total-amt">{formatCurrency(total)}</div>
            </div>

            <div className="s-net">
              <div className="s-tag">Estimated proceeds to you</div>
              <div className="s-fig">{formatCurrency(netProceeds)}</div>
            </div>
          </div>

          <div className="s-cols">
            <div className="s-col">
              <span className="s-tag">On the open market</span>
              <p style={{ marginTop: '0.75rem', color: 'var(--ink-soft)' }}>
                Two to three months of showings, an inspection to negotiate, and
                the five lines above.
              </p>
            </div>
            <div className="s-col s-col--offer">
              <span className="s-tag s-tag--flag">Selling to me</span>
              <span className="s-stamp">None of the above</span>
              <p style={{ marginTop: '0.85rem', color: 'var(--ink-soft)' }}>
                I will not put a number on your house from a slider. I will walk
                it, then put one in writing.
              </p>
            </div>
          </div>
        </article>

        <details className="s-assump">
          <summary>What is behind these figures</summary>
          <ul>
            {lines.map((line) => (
              <li key={line.key}>
                <strong style={{ color: 'var(--ink)' }}>
                  {line.label} &mdash; {formatRate(line.rate)}.
                </strong>{' '}
                {line.note}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--ink-faint)' }}>
            Estimates for illustration, not a quote or an appraisal. Your costs
            will differ. And none of this proves a cash sale nets you more &mdash;
            for plenty of houses the open market wins. I will say so if yours is
            one of them.
          </p>
        </details>

        <p style={{ marginTop: '2.5rem' }}>
          <button type="button" className="s-btn" onClick={() => go('offer')}>
            Ask me for a number
          </button>
        </p>
      </div>
    </section>
  );
}
