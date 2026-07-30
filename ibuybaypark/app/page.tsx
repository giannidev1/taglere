import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import Problem from '@/components/sections/Problem';
import Calculator from '@/components/sections/Calculator';
import Benefits from '@/components/sections/Benefits';
import About from '@/components/sections/About';
import Process from '@/components/sections/Process';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

/**
 * Section order is unchanged from the original.
 *
 * Backgrounds walk the page through a day: the hero photograph, then sand,
 * deeper sand at the calculator, sand again, deeper at About, and into the
 * dark bay tones at Process before landing on golden hour at the contact
 * form. Everything after the hero carries `z-10` and an opaque background so
 * it slides cleanly across the fixed hero stage.
 */
export default function Home() {
  return (
    <main id="top">
      <Navigation />
      <Hero />
      <Problem />
      <Calculator />
      <Benefits />
      <About />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
