import { Award, Shield, Headphones, CreditCard } from 'lucide-react';
import { useReveal } from '@/hooks';

const features = [
  { icon: Award, title: 'جودة معتمدة', desc: 'كل سيارة تخضع لأكثر من 200 فحص دقيق قبل عرضها للبيع' },
  { icon: Shield, title: 'ضمان شامل', desc: 'نقدم ضمان شامل لمدة 3 سنوات على جميع السيارات' },
  { icon: Headphones, title: 'دعم 24/7', desc: 'فريق خدمة عملاء متخصص لمساعدتك في أي وقت' },
  { icon: CreditCard, title: 'تمويل مرن', desc: 'حلول تمويلية وسهل ميسرة تناسب جميع الميزانيات' },
];

export default function About() {
  const { ref, visible } = useReveal();
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 bg-ink-100/50 dark:bg-ink-900/40">
      <div ref={ref} className={`mx-auto max-w-7xl ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-sm font-bold mb-4">
              من نحن
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-ink-900 dark:text-ink-50 mb-6 leading-tight">
              وكالتك الموثوقة
              <span className="block text-gradient">للسيارات الفاخرة</span>
            </h2>
            <p className="text-lg text-ink-600 dark:text-ink-300 leading-relaxed mb-6">
              منذ تأسيسنا قبل 15 عاماً، ونحن نقدم خدمات استثنائية في عالم السيارات الفاخرة.
              نفخر بكوننا الوجهة الأولى لعملائنا في رحلة البحث عن سيارة أحلامهم.
            </p>
            <p className="text-base text-ink-500 dark:text-ink-400 leading-relaxed mb-8">
              نختار كل سيارة بعناية فائقة ونخضعها لفحوصات صارمة لضمان أعلى معايير الجودة والأداء.
              رضاك هو هدفنا الأول.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 card-hover">
                  <f.icon className="w-8 h-8 text-primary-500 mb-3" />
                  <h3 className="font-bold text-ink-900 dark:text-ink-50 mb-1">{f.title}</h3>
                  <p className="text-sm text-ink-500 dark:text-ink-400 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-ink-900/20 aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/17632052/pexels-photo-17632052.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="معرض السيارات"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl flex flex-col items-center justify-center text-white shadow-2xl shadow-primary-500/40 animate-float">
              <span className="font-display font-black text-5xl">15+</span>
              <span className="text-sm font-bold mt-1">سنة من الخبرة</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
