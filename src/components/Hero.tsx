import { ArrowDown, Sparkles, MapPin } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { socialLinks, PROFILE_IMAGE } from '@/data/portfolio';

export default function Hero() {
  const { t } = useApp();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden gradient-mesh">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-80 sm:h-80 bg-primary-500/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 sm:w-96 sm:h-96 bg-secondary-500/15 rounded-full blur-[140px] animate-float" style={{ animationDelay: '3s' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
          <div className="flex-shrink-0 animate-fade-up order-1" style={{ animationDelay: '0.15s', opacity: 0 }}>
            <div className="relative">
              <div className="absolute -inset-3 sm:-inset-4 rounded-[2rem] bg-gradient-to-br from-primary-500/30 to-secondary-500/25 blur-2xl" />
              <div className="absolute -inset-2 rounded-[2rem] border border-primary-500/20" />
              <div className="absolute -inset-5 rounded-[2.5rem] border-2 border-dashed border-primary-500/15 animate-spin-slow" />
              <div className="relative w-48 h-56 sm:w-56 sm:h-64 md:w-72 md:h-80 lg:w-80 lg:h-[22rem] rounded-[2rem] overflow-hidden border-4 border-white/40 dark:border-ink-800/80 shadow-2xl shadow-black/20 dark:shadow-black/40">
                <img src={PROFILE_IMAGE} alt="Abd Elftah Ebrahem" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/15 to-transparent" />
              </div>
            </div>
          </div>
          <div className="flex-1 text-center lg:text-left order-2 w-full">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass mb-5 sm:mb-6 animate-fade-in">
              <span className="relative flex w-2 h-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" /></span>
              <span className="text-xs sm:text-sm text-ink-600 dark:text-ink-200 font-medium">{t.hero.available}</span>
            </div>
            <p className="text-primary-600 dark:text-primary-400 font-medium text-base sm:text-lg mb-2 animate-fade-up" style={{ animationDelay: '0.1s', opacity: 0 }}>{t.hero.hiIm}</p>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-ink-900 dark:text-white mb-4 leading-tight animate-fade-up" style={{ animationDelay: '0.2s', opacity: 0 }}>Abd Elftah<br /><span className="text-gradient">Ebrahem</span></h1>
            <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-4 sm:mb-5 animate-fade-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <span className="text-ink-700 dark:text-ink-300">{t.hero.role}</span><span className="text-ink-400 dark:text-ink-600"> · </span><span className="text-gradient-light">{t.hero.role2}</span>
            </div>
            <p className="text-ink-500 dark:text-ink-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed mb-5 sm:mb-6 animate-fade-up mx-auto lg:mx-0" style={{ animationDelay: '0.4s', opacity: 0 }}>{t.hero.desc}</p>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-ink-400 dark:text-ink-500 text-xs sm:text-sm mb-6 sm:mb-8 animate-fade-up" style={{ animationDelay: '0.5s', opacity: 0 }}><MapPin className="w-4 h-4 shrink-0" /><span>{t.hero.location}</span></div>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fade-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
              <a href="#projects" className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-bold flex items-center gap-2 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center text-sm sm:text-base"><Sparkles className="w-4 h-4" />{t.hero.viewWork}</a>
              <a href="#contact" className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-2xl glass text-ink-800 dark:text-white font-bold hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full sm:w-auto text-center text-sm sm:text-base">{t.hero.getInTouch}</a>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 animate-fade-up" style={{ animationDelay: '0.7s', opacity: 0 }}>
              {socialLinks.map((social) => (<a key={social.label} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={social.label} className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl glass flex items-center justify-center text-ink-500 dark:text-ink-300 hover:text-primary-500 dark:hover:text-primary-400 hover:border-primary-500/40 transition-all duration-300 hover:-translate-y-1 hover:scale-110"><social.icon className="w-5 h-5" /></a>))}
            </div>
          </div>
        </div>
      </div>
      <a href="#about" className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-400 dark:text-ink-500 hover:text-primary-500 transition-colors"><ArrowDown className="w-5 h-5 animate-bounce-slow" /></a>
    </section>
  );
}
