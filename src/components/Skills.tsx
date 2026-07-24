import { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useReveal } from '@/hooks/useReveal';
import { skills } from '@/data/portfolio';

export default function Skills() {
  const { t } = useApp();
  const ref = useReveal<HTMLElement>();
  const [visibleSkills, setVisibleSkills] = useState<Set<number>>(new Set());

  useEffect(() => {
    const bars = ref.current?.querySelectorAll<HTMLElement>('[data-skill-index]');
    if (!bars) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute('data-skill-index'));
          setVisibleSkills((prev) => new Set(prev).add(idx));
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach((b) => obs.observe(b));
    return () => obs.disconnect();
  }, [ref]);

  const extraTechs = ['VS Code', 'Chrome DevTools', 'GitHub Pages', 'Netlify', 'Vercel', 'npm', 'CSS Grid', 'Flexbox', 'BEM', 'SASS', 'Axios', 'JSON'];

  return (
    <section id="skills" ref={ref} className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-secondary-500/5 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="reveal text-center mb-12 sm:mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-bold text-xs sm:text-sm tracking-widest uppercase mb-3 block">{t.skills.label}</span>
          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-ink-900 dark:text-white mb-4">{t.skills.title}</h2>
          <p className="text-ink-500 dark:text-ink-400 max-w-xl mx-auto text-sm sm:text-base">{t.skills.desc}</p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mx-auto mt-4" />
        </div>
        <div className="grid md:grid-cols-2 gap-x-8 sm:gap-x-16 gap-y-5 sm:gap-y-6">
          {skills.map((skill, i) => {
            const isVisible = visibleSkills.has(i);
            const Icon = skill.icon;
            return (
              <div key={i} data-skill-index={i} className="reveal group" style={{ transitionDelay: `${(i % 2) * 0.1}s` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-ink-100 dark:bg-ink-800/80 flex items-center justify-center group-hover:bg-primary-500/15 group-hover:scale-110 transition-all duration-300"><Icon className="w-4 h-4 text-ink-400 dark:text-ink-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300" /></div>
                    <span className="text-ink-800 dark:text-white font-medium text-xs sm:text-sm">{t.skillNames[i]}</span>
                  </div>
                  <span className="text-ink-400 dark:text-ink-500 text-xs font-mono">{skill.level}%</span>
                </div>
                <div className="relative h-1.5 rounded-full bg-ink-200 dark:bg-ink-800 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-1000 ease-out" style={{ width: isVisible ? `${skill.level}%` : '0%', transitionDelay: '0.2s' }}><div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" /></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="reveal mt-16 sm:mt-20">
          <p className="text-center text-ink-400 dark:text-ink-500 text-xs sm:text-sm mb-5 sm:mb-6">{t.skills.alsoWith}</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {extraTechs.map((tech) => (<span key={tech} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full glass text-ink-500 dark:text-ink-300 text-xs sm:text-sm font-mono hover:text-primary-500 dark:hover:text-primary-400 hover:border-primary-500/30 hover:-translate-y-1 transition-all duration-300 cursor-default">{tech}</span>))}
          </div>
        </div>
      </div>
    </section>
  );
}
