import { Briefcase, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useReveal } from '@/hooks/useReveal';

export default function Experience() {
  const { t } = useApp();
  const ref = useReveal<HTMLElement>();

  return (
    <section id="experience" ref={ref} className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 right-1/3 w-72 h-72 sm:w-96 sm:h-96 bg-secondary-500/5 rounded-full blur-[120px]" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="reveal text-center mb-12 sm:mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">{t.experience.label}</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-ink-900 dark:text-white mb-4">{t.experience.title}</h2>
          <p className="text-ink-500 dark:text-ink-400 max-w-xl mx-auto text-sm sm:text-base">{t.experience.desc}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mt-4" />
        </div>
        <div className="relative">
          <div className="absolute top-0 bottom-0 start-6 md:start-1/2 md:-translate-x-1/2 w-px bg-gradient-to-b from-primary-500 via-secondary-500/50 to-transparent" />
          <div className="space-y-10 sm:space-y-12">
            {t.experiences.map((exp, i) => (
              <div key={i} className="reveal relative flex flex-col md:flex-row gap-4 sm:gap-6" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="absolute start-6 md:start-1/2 md:-translate-x-1/2 top-6 z-10"><div className="relative"><div className="w-4 h-4 rounded-full bg-primary-500 ring-4 ring-ink-50 dark:ring-ink-950" /><div className="absolute inset-0 w-4 h-4 rounded-full bg-primary-500 animate-ping opacity-40" /></div></div>
                <div className={`ps-14 md:ps-0 md:w-1/2 ${i % 2 === 0 ? 'md:pe-12' : 'md:ms-auto md:ps-12'}`}>
                  <div className="glass rounded-2xl p-4 sm:p-6 card-hover glow-border group">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium mb-2 sm:mb-3"><Briefcase className="w-3.5 h-3.5" />{exp.period}</div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-ink-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{exp.role}</h3>
                    <p className="text-secondary-600 dark:text-secondary-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3">{exp.company}</p>
                    <p className="text-ink-500 dark:text-ink-400 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{exp.description}</p>
                    <ul className="space-y-1.5 sm:space-y-2">{exp.achievements.map((ach) => <li key={ach} className="flex items-start gap-2 text-ink-600 dark:text-ink-300 text-xs sm:text-sm"><CheckCircle2 className="w-4 h-4 text-primary-500 dark:text-primary-400 shrink-0 mt-0.5" />{ach}</li>)}</ul>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
