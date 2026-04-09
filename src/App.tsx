import { useEffect, useRef, useCallback } from 'react';

import { useReveal } from './hooks/useReveal';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { CoreMessage } from './components/CoreMessage';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { HowItWorks } from './components/HowItWorks';
import { UseCases } from './components/UseCases';
import { Prototype, type PrototypeHandle } from './components/Prototype';
import { Waitlist } from './components/Waitlist';
import { Footer } from './components/Footer';

/* ── Google Fonts loader ─────────────────────────────────────────────────────── */
function useFonts(): void {
  useEffect(() => {
    if (document.getElementById('app-fonts')) return;

    const link = document.createElement('link');
    link.id = 'app-fonts';
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap';
    document.head.appendChild(link);
  }, []);
}

/* ── App ─────────────────────────────────────────────────────────────────────── */
export default function App(): React.ReactElement {
  useFonts();
  useReveal();

  const prototypeRef = useRef<PrototypeHandle>(null);

  const scrollToPrototype = useCallback(() => {
    prototypeRef.current?.scrollIntoView();
  }, []);

  const sendSuggestion = useCallback((text: string) => {
    prototypeRef.current?.sendSuggestion(text);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero onTryPrototype={scrollToPrototype} />
        <About />
        <CoreMessage />
        <Problem />
        <Solution />
        <HowItWorks />
        <UseCases onSuggestion={sendSuggestion} />
        <Prototype ref={prototypeRef} />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
