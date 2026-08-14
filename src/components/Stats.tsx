import { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: 12, suffix: '+', label: 'سيارة معروضة', icon: '🚗' },
  { value: 8, suffix: '', label: 'علامة عالمية', icon: '🏆' },
  { value: 100, suffix: '%', label: 'ضمان شامل', icon: '✅' },
  { value: 15, suffix: '+', label: 'سنة خبرة', icon: '📅' },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>(STATS.map(() => 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(STATS.map((s) => Math.round(s.value * eased)));
      if (currentStep >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <section className="py-12 sm:py-16">
      <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {STATS.map((stat, i) => (
            <div key={i} className="card-glass card-glass-hover p-5 sm:p-6 text-center">
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="font-black text-3xl sm:text-4xl text-gradient-sky">
                {counts[i]}{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-ink-400 font-bold mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
