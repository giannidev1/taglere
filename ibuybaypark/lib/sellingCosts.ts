/**
 * The cost of selling a home the traditional way.
 *
 * Single source of truth for these rates. They're referenced by the Problem
 * section, the Calculator, the Calculator's visible assumptions footnote, and
 * the FAQ — so they must never be typed in twice and allowed to drift apart.
 *
 * These are ESTIMATES for illustration, not quotes. Every number a visitor
 * sees that derives from this file is labelled as an estimate on the page.
 */

export interface SellingCostLine {
  key: string;
  label: string;
  /** Share of sale price, e.g. 0.05 = 5%. */
  rate: number;
  /** Shown in the assumptions footnote. */
  note: string;
}

export const TRADITIONAL_SALE_COSTS: SellingCostLine[] = [
  {
    key: 'commissions',
    label: 'Agent commissions',
    rate: 0.05,
    note: 'Listing side plus buyer side, combined. Varies, and is negotiable.',
  },
  {
    key: 'closing',
    label: 'Seller closing costs',
    rate: 0.015,
    note: 'Escrow, title, county transfer tax, natural hazard report, recording.',
  },
  {
    key: 'repairs',
    label: 'Repairs & pre-list prep',
    rate: 0.015,
    note: 'Paint, landscaping, cleaning, staging, and repairs found at inspection.',
  },
  {
    key: 'concessions',
    label: 'Buyer credits & concessions',
    rate: 0.01,
    note: 'Credits negotiated after the buyer’s inspection and appraisal.',
  },
  {
    key: 'carrying',
    label: 'Carrying costs while listed',
    rate: 0.0035 * 2,
    note: 'Mortgage interest, property tax, insurance and utilities — about 0.35% a month, for roughly 2 months on market and in escrow.',
  },
];

/** Median Bay Park sale price — the calculator's starting position. */
export const BAY_PARK_MEDIAN_PRICE = 1_400_000;

export const CALCULATOR_MIN_PRICE = 600_000;
export const CALCULATOR_MAX_PRICE = 3_000_000;
export const CALCULATOR_STEP = 25_000;

export const TOTAL_TRADITIONAL_RATE = TRADITIONAL_SALE_COSTS.reduce(
  (sum, line) => sum + line.rate,
  0
);

export interface TraditionalSaleBreakdown {
  lines: Array<SellingCostLine & { amount: number }>;
  total: number;
  netProceeds: number;
}

export function calculateTraditionalSaleCosts(
  salePrice: number
): TraditionalSaleBreakdown {
  const lines = TRADITIONAL_SALE_COSTS.map((line) => ({
    ...line,
    amount: Math.round(salePrice * line.rate),
  }));

  const total = lines.reduce((sum, line) => sum + line.amount, 0);

  return { lines, total, netProceeds: salePrice - total };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** "5%", "1.5%", "0.7%" — trailing zeros trimmed. */
export function formatRate(rate: number): string {
  return `${parseFloat((rate * 100).toFixed(2))}%`;
}
