/**
 * Benefits as a schedule of terms — a definition list, not a card grid.
 * The mono term in the left column carries the scan; the sentence explains.
 */
const TERMS = [
  {
    term: 'Commission',
    detail:
      'None. There is no agent in the middle of this, so there is nothing to take off the top.',
  },
  {
    term: 'Funds',
    detail:
      'Cash. No loan, no appraisal contingency, and no financing collapsing a fortnight before closing.',
  },
  {
    term: 'Closing date',
    detail:
      'Yours. About a week if you are in a hurry, or months out if you need to find your next place first.',
  },
  {
    term: 'Condition',
    detail:
      'As-is. No repairs, no paint, no staging, no clearing the garage. Leave behind whatever you do not want to move.',
  },
  {
    term: 'Showings',
    detail:
      'None. No lockbox, no open house, no strangers walking through your kitchen on a Sunday.',
  },
  {
    term: 'Complications',
    detail:
      'Fine. Tenants in place, probate and trust sales, deferred maintenance, liens. Tell me early and I will price it in rather than renegotiate later.',
  },
];

export default function Schedule() {
  return (
    <section className="s-section" id="terms">
      <div className="s-wrap s-wrap--wide">
        <span className="s-stake" aria-hidden="true" />
        <span className="s-tag">Schedule of terms</span>
        <h2 className="s-h2" style={{ marginTop: '0.75rem' }}>
          What you are not dealing with.
        </h2>

        <dl className="s-schedule">
          {TERMS.map((item) => (
            <div className="s-item" key={item.term}>
              <dt className="s-item-term">{item.term}</dt>
              <dd style={{ margin: 0 }}>{item.detail}</dd>
            </div>
          ))}
        </dl>

        <p style={{ marginTop: '2rem', color: 'var(--ink-faint)' }}>
          None of that is worth much if the number is wrong. That is the part we
          should talk about.
        </p>
      </div>
    </section>
  );
}
