import { ChevronDown, Gauge, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
  carCount: number;
}

export default function Hero({ onExplore, carCount }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 pb-12">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div className="text-center lg:text-right space-y-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20">
              <span className="w-2 h-2 rounded-full bg-success-500 animate-pulse" />
              <span className="text-xs font-bold text-sky-300">{carCount} سيارة متاحة الآن</span>
            </div>

            <h1 className="font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.15] text-white">
              اكتشف عالم
              <br />
              <span className="text-gradient-sky">السيارات الفاخرة</span>
              <br />
              في مكان واحد
            </h1>

            <p className="text-base sm:text-lg text-ink-400 leading-relaxed max-w-xl mx-auto lg:mr-0">
              سيارات رياضية، سيدان فاخرة، ودفع رباعي من أفضل العلامات العالمية.
              جودة مضمونة، أسعار تنافسية، وضمان شامل على كل سيارة.
            </p>

            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              <button onClick={onExplore} className="btn-primary">
                تصفح الكتالوج
                <ChevronDown className="w-4 h-4" />
              </button>
              <a href="#test-drive" className="btn-ghost">
                احجز تجربة قيادة
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4 justify-center lg:justify-start">
              <Stat icon={ShieldCheck} label="ضمان شامل" color="text-success-400" />
              <Stat icon={Zap} label="توصيل سريع" color="text-warning-400" />
              <Stat icon={Gauge} label="أعلى أداء" color="text-sky-400" />
            </div>
          </div>

          {/* Visual side */}
          <div className="relative animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#06070d] via-transparent to-transparent z-10" />
              <img
                src="https://images.pexels.com/photos/38570/lamborghini-car-speed-prestige-38570.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="سيارة فاخرة"
                className="w-full h-[400px] lg:h-[520px] object-cover rounded-3xl transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-sky-500/20" />

              {/* Floating badge */}
              <div className="absolute bottom-6 right-6 z-20 card-glass px-5 py-4">
                <div className="text-[10px] text-ink-400 font-bold mb-1">سيارة الأسبوع</div>
                <div className="font-black text-lg text-white">Lamborghini Huracán</div>
                <div className="text-sm text-gold-400 font-bold mt-1">1,850,000 ج.م</div>
              </div>

              {/* Floating spec chip */}
              <div className="absolute top-6 left-6 z-20 card-glass px-4 py-3 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-bold text-white">0-100 في 2.9ث</span>
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-500/10 to-transparent -z-10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, color }: { icon: React.ElementType; label: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`w-4 h-4 ${color}`} />
      <span className="text-xs font-bold text-ink-300">{label}</span>
    </div>
  );
}
