import { cars } from '@/data/cars';

export default function BrandBar() {
  const brands = [...new Set(cars.map((c) => c.brand))];
  return (
    <section className="py-12 border-y border-ink-200 dark:border-ink-800 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-center text-sm font-bold text-ink-400 dark:text-ink-500 tracking-widest mb-8">علاماتنا التجارية الموثوقة</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {brands.map((b) => (
            <div
              key={b}
              className="font-display font-black text-2xl sm:text-3xl text-ink-300 dark:text-ink-600 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-300 cursor-default select-none"
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
