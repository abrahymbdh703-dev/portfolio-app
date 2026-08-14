import { useMemo, useState } from 'react';
import type { Car } from '@/lib/types';
import { useCars, useFilter, useReveal } from '@/hooks';
import CarCard from '@/components/CarCard';
import FilterBar from '@/components/FilterBar';
import CarDetail from '@/components/CarDetail';
import { Loader2, SearchX, Car as CarIcon } from 'lucide-react';

interface CatalogProps {
  onSelectCar: (car: Car) => void;
  selectedCar: Car | null;
  onTestDrive: (car: Car) => void;
}

export default function Catalog({ onSelectCar, selectedCar, onTestDrive }: CatalogProps) {
  const { cars, loading, error } = useCars();
  const filter = useFilter();
  const { ref, visible } = useReveal();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = [...cars];

    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter((c) =>
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.color.includes(filter.search)
      );
    }
    if (filter.brand !== 'all') result = result.filter((c) => c.brand === filter.brand);
    if (filter.bodyType !== 'all') result = result.filter((c) => c.body_type === filter.bodyType);
    if (filter.fuelType !== 'all') result = result.filter((c) => c.fuel_type === filter.fuelType);
    if (filter.condition !== 'all') result = result.filter((c) => c.condition_status === filter.condition);
    if (filter.priceRange[0] > 0 || filter.priceRange[1] < 5000000) {
      result = result.filter((c) => c.price >= filter.priceRange[0] && c.price <= filter.priceRange[1]);
    }

    switch (filter.sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'year-new': result.sort((a, b) => b.year - a.year); break;
      case 'power-high': result.sort((a, b) => b.horsepower - a.horsepower); break;
      default: result.sort((a, b) => Number(b.is_featured) - Number(a.is_featured));
    }

    return result;
  }, [cars, filter]);

  return (
    <section id="catalog" className="py-16 sm:py-20 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <div ref={ref} className={`text-center mb-8 reveal ${visible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 mb-3">
            <CarIcon className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-xs font-bold text-sky-300">الكتالوج الكامل</span>
          </div>
          <h2 className="font-black text-3xl sm:text-4xl text-white">تصفّح سياراتنا</h2>
          <p className="text-sm text-ink-400 mt-2 max-w-lg mx-auto">
            مجموعة منتقاة من أرقى السيارات الرياضية والفاخرة من أفضل العلامات العالمية
          </p>
        </div>

        {/* Filter bar */}
        <div className="mb-6">
          <FilterBar
            search={filter.search}
            setSearch={filter.setSearch}
            brand={filter.brand}
            setBrand={filter.setBrand}
            bodyType={filter.bodyType}
            setBodyType={filter.setBodyType}
            fuelType={filter.fuelType}
            setFuelType={filter.setFuelType}
            condition={filter.condition}
            setCondition={filter.setCondition}
            sortBy={filter.sortBy}
            setSortBy={filter.setSortBy}
            reset={filter.reset}
            resultCount={filtered.length}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
            <span className="mr-3 text-ink-400 font-bold text-sm">جاري تحميل السيارات...</span>
          </div>
        ) : error ? (
          <div className="card-glass p-8 text-center">
            <p className="text-error-400 font-bold mb-2">تعذّر تحميل السيارات</p>
            <p className="text-xs text-ink-500">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card-glass p-12 text-center">
            <SearchX className="w-12 h-12 mx-auto text-ink-600 mb-4" />
            <p className="text-ink-400 font-bold mb-2">لا توجد سيارات مطابقة</p>
            <p className="text-xs text-ink-500">جرّب تعديل الفلاتر أو إعادة تعيينها</p>
            <button onClick={filter.reset} className="btn-ghost mt-4 text-xs">إعادة تعيين الفلاتر</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onClick={() => onSelectCar(car)}
                onFavorite={toggleFav}
                isFavorite={favorites.has(car.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedCar && (
        <CarDetail
          car={selectedCar}
          onClose={() => onSelectCar(null as unknown as Car)}
          onTestDrive={() => {
            onTestDrive(selectedCar);
          }}
        />
      )}
    </section>
  );
}
