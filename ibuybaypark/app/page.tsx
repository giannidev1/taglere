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

export default function Home() {
  return (
    <main>
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
