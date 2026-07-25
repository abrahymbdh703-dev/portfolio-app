import { Car, Users, Award, Wrench } from 'lucide-react';
import { useReveal } from '@/hooks';

const stats = [
  { icon: Car, value: '50+', label: 'سيارة متاحة', color: 'text-primary-500' },
  { icon: Users, value: '12K+', label: 'عميل سعيد', color: 'text-secondary-500' },
  { icon: Award, value: '15', label: 'سنة خبرة', color: 'text-primary-500' },
  { icon: Wrench, value: '24/7', label: 'خدمة عملاء', color: 'text-secondary-500' },
];

export default function Stats() {
  const { ref, visible } = useReveal();
  return (
    <section className="relative -mt-16 z-10 px-4 sm:px-6">
      <div ref={ref} className={`mx-auto max-w-6xl glass rounded-3xl p-6 sm:p-8 shadow-2xl shadow-ink-900/10 ${visible ? 'animate-scale-in' : 'opacity-0'}`}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className={`w-14 h-14 rounded-2xl bg-ink-100 dark:bg-ink-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 ${s.color}`}>
                <s.icon className="w-7 h-7" strokeWidth={2.2} />
              </div>
              <div className="font-display font-black text-3xl sm:text-4xl text-ink-900 dark:text-ink-50">{s.value}</div>
              <div className="text-sm text-ink-500 dark:text-ink-400 font-semibold mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
