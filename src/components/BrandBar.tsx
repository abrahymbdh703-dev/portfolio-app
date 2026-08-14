const BRANDS = [
  'Lamborghini', 'Mercedes-Benz', 'BMW', 'Ferrari', 'Porsche',
  'Genesis', 'Audi', 'Bentley',
];

export default function BrandBar() {
  return (
    <section id="brands" className="py-12 sm:py-16 border-y border-sky-500/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-sm font-bold text-ink-500 mb-8 uppercase tracking-wider">
          علامات عالمية نثق بها
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <div
                key={i}
                className="flex items-center justify-center px-8 py-4 rounded-2xl bg-ink-900/40 border border-ink-800/50 shrink-0"
              >
                <span className="font-black text-lg sm:text-xl text-ink-500 hover:text-white transition-colors duration-300">
                  {brand}
                </span>
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#06070d] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#06070d] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
