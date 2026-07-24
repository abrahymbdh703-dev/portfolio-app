import { useEffect, useRef } from 'react';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useScrollProgress } from '@/hooks/useScrollProgress';

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let rafId = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (ref.current) { ref.current.style.left = `${e.clientX}px`; ref.current.style.top = `${e.clientY}px`; }
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafId); };
  }, []);
  return <div ref={ref} className="cursor-glow hidden md:block" style={{ left: '-500px', top: '-500px' }} />;
}

function ScrollProgressBar({ progress }: { progress: number }) {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-1 bg-transparent">
      <div className="h-full bg-gradient-to-r from-primary-500 via-primary-400 to-secondary-500 transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}

function App() {
  const progress = useScrollProgress();
  return (
    <AppProvider>
      <CursorGlow />
      <ScrollProgressBar progress={progress} />
      <div className="relative min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
