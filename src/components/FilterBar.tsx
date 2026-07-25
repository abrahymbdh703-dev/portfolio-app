import { Search, SlidersHorizontal, X } from 'lucide-react';
import type { FilterState, BodyStyle, FuelType } from '@/types';
import { BODY_STYLE_LABELS, FUEL_TYPE_LABELS } from '@/types';

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

const sortOptions: { value: FilterState['sortBy']; label: string }[] = [
  { value: 'default', label: 'الأكثر صلة' },
  { value: 'price-low', label: 'السعر: الأقل أولاً' },
  { value: 'price-high', label: 'السعر: الأعلى أولاً' },
  { value: 'rating', label: 'الأعلى تقييماً' },
  { value: 'year-new', label: 'الأحدث موديل' },
];

const bodyStyles: { value: BodyStyle | 'all'; label: string }[] = [
  { value: 'all', label: 'الكل' },
  ...(Object.entries(BODY_STYLE_LABELS) as [BodyStyle, string][]).map(([value, label]) => ({ value, label })),
];

const fuelTypes: { value: FuelType | 'all'; label: string }[] = [
  { value: 'all', label: 'الكل' },
  ...(Object.entries(FUEL_TYPE_LABELS) as [FuelType, string][]).map(([value, label]) => ({ value, label })),
];

export default function FilterBar({ filters, onChange, resultCount, mobileOpen, setMobileOpen }: FilterBarProps) {
  const update = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value });

  const FilterContent = () => (
    <>
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            placeholder="ابحث عن سيارة أو ماركة..."
            className="w-full pr-11 pl-4 py-3 rounded-xl bg-ink-100 dark:bg-ink-800 border border-transparent focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 text-sm font-semibold text-ink-900 dark:text-ink-50 placeholder:text-ink-400 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {bodyStyles.map((b) => (
          <button
            key={b.value}
            onClick={() => update('bodyStyle', b.value)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
              filters.bodyStyle === b.value
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-ink-200 dark:hover:bg-ink-700'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      <select
        value={filters.fuelType}
        onChange={(e) => update('fuelType', e.target.value as FuelType | 'all')}
        className="px-4 py-3 rounded-xl bg-ink-100 dark:bg-ink-800 text-sm font-bold text-ink-700 dark:text-ink-200 outline-none cursor-pointer border border-transparent focus:border-primary-500 transition-all"
      >
        {fuelTypes.map((f) => (
          <option key={f.value} value={f.value}>{f.label}</option>
        ))}
      </select>

      <select
        value={filters.sortBy}
        onChange={(e) => update('sortBy', e.target.value as FilterState['sortBy'])}
        className="px-4 py-3 rounded-xl bg-ink-100 dark:bg-ink-800 text-sm font-bold text-ink-700 dark:text-ink-200 outline-none cursor-pointer border border-transparent focus:border-primary-500 transition-all"
      >
        {sortOptions.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
    </>
  );

  return (
    <div className="mb-8">
      <div className="hidden lg:flex items-center gap-3 flex-wrap">
        <FilterContent />
      </div>

      <div className="flex lg:hidden items-center gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => update('search', e.target.value)}
            placeholder="ابحث..."
            className="w-full pr-11 pl-4 py-3 rounded-xl bg-ink-100 dark:bg-ink-800 text-sm font-semibold text-ink-900 dark:text-ink-50 placeholder:text-ink-400 outline-none"
          />
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="px-4 py-3 rounded-xl bg-primary-500 text-white font-bold text-sm flex items-center gap-2"
        >
          <SlidersHorizontal className="w-4 h-4" />
          فلتر
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden mb-4 p-4 rounded-2xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-ink-900 dark:text-ink-50">الفلاتر</h4>
            <button onClick={() => setMobileOpen(false)} className="text-ink-400 hover:text-error-500">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {bodyStyles.map((b) => (
              <button
                key={b.value}
                onClick={() => update('bodyStyle', b.value)}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  filters.bodyStyle === b.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-ink-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
          <select
            value={filters.fuelType}
            onChange={(e) => update('fuelType', e.target.value as FuelType | 'all')}
            className="w-full px-4 py-3 rounded-xl bg-ink-100 dark:bg-ink-800 text-sm font-bold outline-none"
          >
            {fuelTypes.map((f) => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          <select
            value={filters.sortBy}
            onChange={(e) => update('sortBy', e.target.value as FilterState['sortBy'])}
            className="w-full px-4 py-3 rounded-xl bg-ink-100 dark:bg-ink-800 text-sm font-bold outline-none"
          >
            {sortOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-ink-500 dark:text-ink-400 font-semibold">
          عرض <span className="text-primary-600 dark:text-primary-400 font-bold">{resultCount}</span> سيارة
        </p>
      </div>
    </div>
  );
}
