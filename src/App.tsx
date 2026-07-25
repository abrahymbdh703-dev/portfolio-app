import { useEffect, useState } from 'react';
import type { Car } from '@/types';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import BrandBar from '@/components/BrandBar';
import Catalog from '@/components/Catalog';
import CarDetail from '@/components/CarDetail';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  const [dark, setDark] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [pendingCarName, setPendingCarName] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactFromCar = () => {
    setPendingCarName(selectedCar ? `${selectedCar.brand} ${selectedCar.name}` : null);
    setSelectedCar(null);
    setTimeout(() => scrollTo('contact'), 100);
  };

  return (
    <div className="relative min-h-screen bg-ink-50 dark:bg-ink-950 transition-colors duration-300 overflow-x-hidden">
      <Navbar dark={dark} toggleDark={() => setDark((v) => !v)} onNav={scrollTo} />
      <main>
        <Hero onBrowse={() => scrollTo('inventory')} />
        <Stats />
        <BrandBar />
        <Catalog onSelectCar={setSelectedCar} />
        <About />
        <Contact
          selectedCarName={pendingCarName}
          onCarNameConsumed={() => setPendingCarName(null)}
        />
      </main>
      <Footer onNav={scrollTo} />
      <CarDetail car={selectedCar} onClose={() => setSelectedCar(null)} onContact={handleContactFromCar} />
    </div>
  );
}

export default App;
