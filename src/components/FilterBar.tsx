import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { BRANDS, BODY_TYPE_LABELS, FUEL_TYPE_LABELS, CONDITION_LABELS } from '@/lib/types';
import type { BodyType, FuelType, ConditionStatus } from '@/lib/types';

interface FilterBarProps {
  search: string;
  setSearch: (v: string) => void;
  brand: string;
  setBrand: (v: string) => void;
  bodyType: string;
  setBodyType: (v: string) => void;
  fuelType: string;
  setFuelType: (v: string) => void;
  condition: string;
  setCondition: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  reset: () => void;
  resultCount: number;
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'المميزة أولاً' },
  { value: 'price-low', label: 'السعر: الأقل' },
  { value: 'price-high', label: 'السعر: الأعلى' },
  { value: 'year-new', label: 'الأحدث موديل' },
  { value: 'power-high', label: 'الأعلى قوة' },
];

export default function FilterBar(props: FilterBarProps) {
  const hasActiveFilters =
    props.search || props.brand !== 'all' || props.bodyType !== 'all' ||
    props.fuelType !== 'all' || props.condition !== 'all';

  return (
    <div className="card-glass p-4 sm:p-5 space-y-4">
      {/* Search + sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-500" />
          <input
            type="text"
            placeholder="ابحث عن سيارة أو موديل..."
            className="input pr-10"
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="input cursor-pointer min-w-[140px]"
            value={props.sortBy}
            onChange={(e) => props.setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          {hasActiveFilters && (
            <button onClick={props.reset} className="btn-ghost px-3" title="إعادة تعيين">
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters row */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs font-bold text-ink-400 ml-1">
          <SlidersHorizontal className="w-3.5 h-3.5" /> فلترة:
        </div>
        <FilterSelect
          value={props.brand}
          onChange={props.setBrand}
          options={[{ value: 'all', label: 'كل العلامات' }, ...BRANDS.map((b) => ({ value: b, label: b }))]}
        />
        <FilterSelect
          value={props.bodyType}
          onChange={props.setBodyType}
          options={[{ value: 'all', label: 'كل الأنواع' }, ...(Object.entries(BODY_TYPE_LABELS) as [BodyType, string][]).map(([v, l]) => ({ value: v, label: l }))]}
        />
        <FilterSelect
          value={props.fuelType}
          onChange={props.setFuelType}
          options={[{ value: 'all', label: 'كل الوقود' }, ...(Object.entries(FUEL_TYPE_LABELS) as [FuelType, string][]).map(([v, l]) => ({ value: v, label: l }))]}
        />
        <FilterSelect
          value={props.condition}
          onChange={props.setCondition}
          options={[{ value: 'all', label: 'كل الحالات' }, ...(Object.entries(CONDITION_LABELS) as [ConditionStatus, string][]).map(([v, l]) => ({ value: v, label: l }))]}
        />
      </div>

      {/* Result count */}
      <div className="text-xs text-ink-500 font-bold">
        {props.resultCount} سيارة مطابقة
      </div>
    </div>
  );
}

function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select
      className="px-3 py-2 rounded-lg text-xs font-bold bg-ink-800/60 border border-ink-700/50 text-ink-200 outline-none cursor-pointer transition-all hover:border-sky-500/30 focus:border-sky-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
