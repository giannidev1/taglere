/**
 * Numbered because this genuinely is a sequence — the order is information the
 * reader needs, not decoration. Each step also says where it can stop.
 */
const STEPS = [
  {
    n: 'One',
    title: 'You tell me about the house',
    body: 'The form at the bottom, or a phone call if you would rather. Two minutes. Nothing to sign.',
    exit: 'Stop here and you have given me an address and nothing else.',
  },
  {
    n: 'Two',
    title: 'I come and walk it',
    body: 'Usually within a couple of days, at a time that suits you. Just me — no clipboard crew, no contractors tramping through.',
    exit: 'Stop here and you have had one stranger in your house for half an hour.',
  },
  {
    n: 'Three',
    title: 'I put a number in writing',
    body: 'With the reasoning attached, so you can see how I got there and check it against anything else you have been told.',
    exit: 'Stop here and you keep the number. Take it to an agent for a second opinion — I would.',
  },
  {
    n: 'Four',
    title: 'You choose the closing date',
    body: 'Ordinary escrow through a local title company. Fast if you need fast, slow if you need slow.',
    exit: '',
  },
];

export default function Sequence() {
  return (
    <section className="s-section" id="how">
      <div className="s-wrap s-wrap--wide">
        <span className="s-stake" aria-hidden="true" />
        <span className="s-tag">Sequence</span>
        <h2 className="s-h2" style={{ marginTop: '0.75rem' }}>
          How it goes, and where you can stop.
        </h2>
        <p className="s-lede">
          Four steps. You can walk away at the end of any of them and owe me
          nothing, which is the only reason the first one is worth your time.
        </p>

        <div className="s-steps">
          {STEPS.map((step) => (
            <article className="s-step" key={step.n}>
              <div className="s-step-n">{step.n}</div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {step.exit && (
                  <p style={{ marginTop: '0.75rem', color: 'var(--ink-faint)', fontSize: '0.9375rem' }}>
                    {step.exit}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
