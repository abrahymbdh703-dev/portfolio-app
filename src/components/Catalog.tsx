import { useMemo, useState } from 'react';
import type { FilterState, Car } from '@/types';
import { cars } from '@/data/cars';
import CarCard from '@/components/CarCard';
import FilterBar from '@/components/FilterBar';
import { useReveal } from '@/hooks';

interface CatalogProps {
  onSelectCar: (car: Car) => void;
}

const defaultFilters: FilterState = {
  search: '',
  bodyStyle: 'all',
  fuelType: 'all',
  minPrice: 0,
  maxPrice: 6000000,
  sortBy: 'default',
};

export default function Catalog({ onSelectCar }: CatalogProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { ref, visible } = useReveal();

  const filtered = useMemo(() => {
    let result = cars.filter((c) => {
      const matchesSearch =
        !filters.search ||
        c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.brand.toLowerCase().includes(filters.search.toLowerCase());
      const matchesBody = filters.bodyStyle === 'all' || c.bodyStyle === filters.bodyStyle;
      const matchesFuel = filters.fuelType === 'all' || c.specs.fuelType === filters.fuelType;
      return matchesSearch && matchesBody && matchesFuel;
    });

    switch (filters.sortBy) {
      case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'year-new': result = [...result].sort((a, b) => b.specs.year - a.specs.year); break;
    }
    return result;
  }, [filters]);

  return (
    <section id="inventory" className="py-20 sm:py-28 px-4 sm:px-6">
      <div ref={ref} className={`mx-auto max-w-7xl ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-sm font-bold mb-4">
            معرض السيارات
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink-900 dark:text-ink-50 mb-4">
            اختر سيارتك المثالية
          </h2>
          <p className="text-lg text-ink-500 dark:text-ink-400 max-w-2xl mx-auto">
            تصفح مجموعتنا الكاملة من السيارات الفاخرة والرياضية والكهربائية
          </p>
        </div>

        <FilterBar
          filters={filters}
          onChange={setFilters}
          resultCount={filtered.length}
          mobileOpen={mobileFiltersOpen}
          setMobileOpen={setMobileFiltersOpen}
        />

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((car) => (
              <CarCard key={car.id} car={car} onClick={() => onSelectCar(car)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-xl text-ink-700 dark:text-ink-200 mb-2">لا توجد نتائج</h3>
            <p className="text-ink-500 dark:text-ink-400 mb-6">جرّب تغيير الفلاتر للعثور على سيارات أخرى</p>
            <button
              onClick={() => setFilters(defaultFilters)}
              className="px-6 py-3 rounded-xl bg-primary-500 text-white font-bold hover:bg-primary-600 transition-colors"
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
