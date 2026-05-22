import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Contact from './components/sections/Contact';
import RevealSection from './components/ui/RevealSection';
import CustomCursor from './components/ui/CustomCursor';
import Preloader from './components/ui/Preloader';
import FloatingCTA from './components/ui/FloatingCTA';
import ScrollProgress from './components/ui/ScrollProgress';
import Marquee from './components/ui/Marquee';
import CommandPalette from './components/ui/CommandPalette';
import { useLenis } from './hooks/useLenis';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [cmdOpen, setCmdOpen] = useState<boolean>(false);
  const handleDone = useCallback(() => setLoading(false), []);

  useLenis();

  // CMD+K / CTRL+K listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <FloatingCTA />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {loading && <Preloader onDone={handleDone} />}

      {/* ✅ Fixed: Use opacity instead of visibility for better IntersectionObserver support */}
      <main
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: loading ? 'none' : 'all',
        }}
      >
        <Navbar />
        <Hero />

        <Marquee />

        <RevealSection direction="up">
          <About />
        </RevealSection>

        <RevealSection direction="left" delay={100}>
          <Skills />
        </RevealSection>

        <RevealSection direction="depth" delay={80}>
          <Projects />
        </RevealSection>

        <RevealSection direction="right" delay={100}>
          <Experience />
        </RevealSection>

        <RevealSection direction="up" delay={80}>
          <Contact />
        </RevealSection>

        <RevealSection direction="up" delay={80}>
          <Footer />
        </RevealSection>
      </main>
    </>
  );
}

export default App;