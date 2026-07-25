import { ChevronLeft, Zap, Shield, Award } from 'lucide-react';

interface HeroProps {
  onBrowse: () => void;
}

export default function Hero({ onBrowse }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/18108314/pexels-photo-18108314/free-photo-of-modern-expensive-cars-in-the-garage.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="معرض سيارات فاخرة"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      <div className="absolute inset-0 grid-pattern opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-32 pb-20 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
            </span>
            <span className="text-sm font-bold text-white">معرض السيارات الأول في مصر</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 animate-fade-up">
            ابحث عن
            <span className="block text-gradient">سيارة أحلامك</span>
          </h1>

          <p className="text-lg sm:text-xl text-ink-200 leading-relaxed mb-8 max-w-2xl animate-fade-up" style={{ animationDelay: '0.15s' }}>
            تشكيلة واسعة من السيارات الفاخرة والرياضية والكهربائية بأفضل الأسعار.
            جودة مضمونة وخدمة استثنائية لكل عميل.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={onBrowse}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg shadow-2xl shadow-primary-500/40 hover:scale-105 transition-all duration-300"
            >
              تصفح السيارات الآن
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass text-white font-bold text-lg hover:bg-white/20 transition-all duration-300"
            >
              احجز موعد معاينة
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg animate-fade-up" style={{ animationDelay: '0.45s' }}>
            {[
              { icon: Zap, label: 'توصيل سريع', sub: '48 ساعة' },
              { icon: Shield, label: 'ضمان شامل', sub: '3 سنوات' },
              { icon: Award, label: 'جودة معتمدة', sub: '200+ فحص' },
            ].map((f, i) => (
              <div key={i} className="glass rounded-2xl p-4 text-center">
                <f.icon className="w-6 h-6 mx-auto mb-2 text-primary-400" />
                <div className="text-white font-bold text-sm">{f.label}</div>
                <div className="text-ink-300 text-xs mt-0.5">{f.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-ink-50 dark:from-ink-950 to-transparent pointer-events-none" />
    </section>
  );
}
