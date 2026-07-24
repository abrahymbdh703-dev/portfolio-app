import { CheckCircle2, Quote } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useReveal } from '@/hooks/useReveal';
import { serviceIcons, EMAIL, PHONE_DISPLAY, PROFILE_IMAGE } from '@/data/portfolio';

export default function About() {
  const { t } = useApp();
  const ref = useReveal<HTMLElement>();

  const stats = [
    { value: '3+', label: t.about.statProjects },
    { value: '2+', label: t.about.statYears },
    { value: '100%', label: t.about.statPassion },
    { value: '24/7', label: t.about.statDedicated },
  ];

  const infoRows = [
    { label: t.about.specialization, value: 'Frontend Development' },
    { label: t.about.locationLabel, value: 'Egypt' },
    { label: t.about.emailLabel, value: EMAIL },
    { label: t.about.phoneLabel, value: PHONE_DISPLAY },
  ];

  return (
    <section id="about" ref={ref} className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-primary-500/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="reveal text-center mb-12 sm:mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">{t.about.label}</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-ink-900 dark:text-white mb-4">{t.about.title}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto" />
        </div>
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 items-center mb-20 sm:mb-24">
          <div className="reveal order-2 lg:order-1 relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-2xl" />
            <div className="relative glass rounded-3xl overflow-hidden">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img src={PROFILE_IMAGE} alt="Abd Elftah Ebrahem" className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-ink-900 via-transparent to-transparent" />
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-end gap-3 sm:gap-4 -mt-14 sm:-mt-16 mb-4 sm:mb-5 relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-4 border-white dark:border-ink-900 shadow-xl shrink-0">
                    <img src={PROFILE_IMAGE} alt="Abd Elftah Ebrahem" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="pb-1">
                    <h3 className="font-display font-bold text-base sm:text-lg text-ink-900 dark:text-white leading-tight">Abd Elftah Ebrahem</h3>
                    <p className="text-ink-500 dark:text-ink-400 text-xs sm:text-sm">{t.hero.role}</p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                  {infoRows.map((item) => (
                    <div key={item.label} className="flex items-center justify-between pb-2 sm:pb-3 border-b border-ink-200/50 dark:border-white/5">
                      <span className="text-ink-400 dark:text-ink-500 text-xs sm:text-sm">{item.label}</span>
                      <span className="text-ink-800 dark:text-white font-medium text-xs sm:text-sm" dir="ltr">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-xs sm:text-sm">
                  <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />{t.about.openRemote}
                </div>
              </div>
            </div>
          </div>
          <div className="reveal order-1 lg:order-2" style={{ transitionDelay: '0.15s' }}>
            <div className="relative mb-5 sm:mb-6">
              <Quote className="absolute -top-2 -left-2 w-10 h-10 sm:w-12 sm:h-12 text-primary-500/20" />
              <p className="text-lg sm:text-xl md:text-2xl text-ink-900 dark:text-white font-medium leading-relaxed mb-4 relative z-10">
                {t.about.quote.split('great frontend.')[0]}<span className="text-gradient-light">great frontend.</span>{t.about.quote.includes('great frontend.') && t.about.quote.split('great frontend.')[1]}
              </p>
            </div>
            <p className="text-ink-600 dark:text-ink-300 leading-loose mb-3 sm:mb-4 text-sm sm:text-base">{t.about.p1}</p>
            <p className="text-ink-600 dark:text-ink-300 leading-loose mb-6 sm:mb-8 text-sm sm:text-base">{t.about.p2}</p>
            <div className="grid sm:grid-cols-2 gap-2 sm:gap-3">
              {t.about.highlights.map((item) => (<div key={item} className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-primary-500 dark:text-primary-400 shrink-0" /><span className="text-ink-700 dark:text-ink-200 text-xs sm:text-sm">{item}</span></div>))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-20 sm:mb-24">
          {stats.map((stat, i) => (<div key={stat.label} className="reveal glass rounded-2xl p-4 sm:p-6 text-center card-hover glow-border" style={{ transitionDelay: `${i * 0.1}s` }}><div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-gradient mb-2 leading-none">{stat.value}</div><div className="text-ink-500 dark:text-ink-400 text-xs sm:text-sm font-medium">{stat.label}</div></div>))}
        </div>
        <div className="reveal text-center mb-10 sm:mb-12">
          <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-ink-900 dark:text-white mb-3">{t.about.servicesTitle}</h3>
          <p className="text-ink-500 dark:text-ink-400 max-w-xl mx-auto text-sm sm:text-base">{t.about.servicesDesc}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {t.services.map((service, i) => {
            const Icon = serviceIcons[i]?.icon;
            return (<div key={service.title} className="reveal glass rounded-2xl p-5 sm:p-6 card-hover glow-border group" style={{ transitionDelay: `${i * 0.1}s` }}><div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary-500/20 group-hover:scale-110 transition-all">{Icon && <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500 dark:text-primary-400" />}</div><h4 className="font-bold text-ink-900 dark:text-white mb-2 text-xs sm:text-sm">{service.title}</h4><p className="text-ink-500 dark:text-ink-400 text-xs leading-relaxed">{service.desc}</p></div>);
          })}
        </div>
      </div>
    </section>
  );
}
