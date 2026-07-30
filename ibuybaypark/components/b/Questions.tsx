import { FAQS } from '@/lib/faqs';

/**
 * Every answer is visible. An accordion would hide the awkward one, and the
 * awkward one is the reason this section earns any trust at all.
 */
export default function Questions() {
  return (
    <section className="s-section" id="questions">
      <div className="s-wrap">
        <span className="s-stake" aria-hidden="true" />
        <span className="s-tag">Questions, answered in full</span>
        <h2 className="s-h2" style={{ marginTop: '0.75rem' }}>
          Nothing here is folded away.
        </h2>
        <p className="s-lede">
          Including the one you actually want to ask, which is second.
        </p>

        <div className="s-qa">
          {FAQS.map((faq) => (
            <article className="s-q" key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
