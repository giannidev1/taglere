/**
 * Single source of truth for the FAQ.
 *
 * Rendered by components/sections/FAQ.tsx and emitted as FAQPage JSON-LD by
 * components/SchemaMarkup.tsx. Keep answers plain-text (no markup) so they are
 * valid in the structured data.
 *
 * Answers are deliberately honest rather than promotional — particularly
 * "will your offer be below what I'd list for", which says yes.
 */

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: 'How can there be no commission?',
    answer:
      'Because I am not listing your house — I am buying it. A commission exists to pay agents for marketing a property and finding a buyer. Here the buyer is already sitting across the table, so there is no listing, no marketing budget, and nobody to pay out of your proceeds.',
  },
  {
    question: 'Will your offer be below what I could list it for?',
    answer:
      'Usually, yes — and I would rather say so up front than surprise you later. A cash, as-is offer with no contingencies and no repairs is normally below what a fully prepped home fetches on the open market. The comparison that actually matters is what you net: after commissions, closing costs, repairs, buyer credits and a couple of months of carrying costs, the gap is far smaller than most sellers expect, and sometimes it closes entirely. Sometimes it does not, and in that case listing is the better move.',
  },
  {
    question: 'Are you a real estate agent or the buyer?',
    answer:
      'Both, and the distinction matters. I am Gianni Tagle, a licensed California real estate broker, DRE #02250353. On this site I am not acting as your agent and I am not representing you — I am the buyer, purchasing for my own account. You are welcome to have your own agent or attorney review anything I put in front of you, and I would encourage it.',
  },
  {
    question: 'Do I need to make repairs or clean the place up?',
    answer:
      'No. I buy as-is. No painting, no landscaping, no staging, no cleaning, and no repair list after an inspection. If there is furniture, junk in the garage, or anything else you do not want to move, leave it.',
  },
  {
    question: 'How fast can you close?',
    answer:
      'About a week is realistic when title is straightforward, since there is no lender and no appraisal to wait on. Just as often sellers want the opposite — time to find their next place, or to line up with the end of a school year. You pick the date and I work to it.',
  },
  {
    question: 'What if I have tenants, or it is a probate or trust sale?',
    answer:
      'All workable. Occupied properties, inherited homes, trust and probate sales, deferred maintenance, liens or back taxes — these are normal and none of them disqualify you. Just mention it when you first get in touch so I can account for it in the offer rather than renegotiating later.',
  },
  {
    question: 'Am I obligated to accept?',
    answer:
      'No. There is no fee, no obligation, and nothing to sign to get an offer. If the number does not work for you, say no and that is the end of it. I am not going to keep calling you.',
  },
  {
    question: 'Do you only buy in Bay Park?',
    answer:
      'Bay Park is the focus — both the 92110 and 92117 halves of the neighborhood. I also buy in the surrounding areas: Morena, Bay Ho, Clairemont, Linda Vista and Old Town. If you are elsewhere in San Diego County, still reach out and I will tell you honestly whether I am the right buyer.',
  },
];
