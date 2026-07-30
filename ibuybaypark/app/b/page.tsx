import Rail from '@/components/b/Rail';
import Hero from '@/components/b/Hero';
import Ledger from '@/components/b/Ledger';
import Schedule from '@/components/b/Schedule';
import Neighbor from '@/components/b/Neighbor';
import Sequence from '@/components/b/Sequence';
import Questions from '@/components/b/Questions';
import Slip from '@/components/b/Slip';
import Foot from '@/components/b/Foot';

/**
 * Plan B — "Site Survey".
 *
 * The flow differs from Plan A: the arithmetic comes first and does the
 * persuading, the process section names where you can walk away, and the FAQ
 * is fully open rather than folded into an accordion.
 */
export default function SurveyPage() {
  return (
    <main id="top">
      <Rail />
      <Hero />
      <Ledger />
      <Schedule />
      <Neighbor />
      <Sequence />
      <Questions />
      <Slip />
      <Foot />
    </main>
  );
}
