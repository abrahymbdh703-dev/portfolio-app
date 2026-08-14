import { useState, useCallback } from 'react';
import type { Car } from '@/lib/types';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import BrandBar from '@/components/BrandBar';
import Catalog from '@/components/Catalog';
import TestDrive from '@/components/TestDrive';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useCars } from '@/hooks';

export default function App() {
  const { cars, loading } = useCars();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [testDriveCar, setTestDriveCar] = useState<Car | null>(null);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleTestDrive = useCallback((car: Car) => {
    setSelectedCar(null);
    setTestDriveCar(car);
  }, []);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar onNavigate={handleNavigate} />

      <main>
        <Hero onExplore={() => handleNavigate('catalog')} carCount={loading ? 0 : cars.length} />
        <Stats />
        <BrandBar />
        <Catalog
          selectedCar={selectedCar}
          onSelectCar={setSelectedCar}
          onTestDrive={handleTestDrive}
        />
        <TestDrive selectedCar={testDriveCar} cars={cars} />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
