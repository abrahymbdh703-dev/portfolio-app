import { Code2, ArrowUp, Heart, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { GITHUB_URL, LINKEDIN_URL, EMAIL, PHONE } from '@/data/portfolio';

export default function Footer() {
  const { t } = useApp();
  const navItems = [
    { label: t.nav.home, href: '#home' }, { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' }, { label: t.nav.projects, href: '#projects' },
    { label: t.nav.experience, href: '#experience' }, { label: t.nav.contact, href: '#contact' },
  ];
  const socials = [
    { label: 'GitHub', href: GITHUB_URL, icon: Github },
    { label: 'LinkedIn', href: LINKEDIN_URL, icon: Linkedin },
    { label: 'Email', href: `mailto:${EMAIL}`, icon: Mail },
    { label: 'Phone', href: `tel:${PHONE}`, icon: Phone },
  ];
  return (
    <footer className="relative border-t border-ink-200/50 dark:border-white/5 py-10 sm:py-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-48 sm:w-96 sm:h-48 bg-primary-500/5 rounded-full blur-[100px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div>
            <a href="#home" className="flex items-center gap-2 mb-4"><div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center"><Code2 className="w-5 h-5 text-white" /></div><span className="font-display font-bold text-base sm:text-lg text-ink-900 dark:text-white">Abd Elftah Ebrahem</span></a>
            <p className="text-ink-500 dark:text-ink-400 text-xs sm:text-sm leading-relaxed max-w-xs">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="font-bold text-ink-900 dark:text-white text-sm mb-4">{t.footer.quickLinks}</h4>
            <ul className="grid grid-cols-2 gap-2">{navItems.map((link) => <li key={link.href}><a href={link.href} className="text-ink-500 dark:text-ink-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors">{link.label}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="font-bold text-ink-900 dark:text-white text-sm mb-4">{t.footer.getInTouch}</h4>
            <div className="flex gap-3 mb-4">{socials.map((social) => <a key={social.label} href={social.href} target={social.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={social.label} className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-ink-100 dark:bg-ink-800/60 flex items-center justify-center text-ink-500 dark:text-ink-300 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-300 hover:-translate-y-1"><social.icon className="w-4 h-4" /></a>)}</div>
            <p className="text-ink-400 dark:text-ink-500 text-xs" dir="ltr">{EMAIL}</p>
          </div>
        </div>
        <div className="pt-6 sm:pt-8 border-t border-ink-200/50 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ink-400 dark:text-ink-500 text-xs sm:text-sm flex items-center gap-1.5 text-center">{t.footer.madeWith} <Heart className="w-4 h-4 text-primary-500 fill-primary-500" /> by Abd Elftah Ebrahem © 2026</p>
          <a href="#home" className="flex items-center gap-2 text-ink-400 dark:text-ink-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors group">{t.footer.backToTop}<span className="w-9 h-9 rounded-lg glass flex items-center justify-center group-hover:bg-primary-500/10 transition-colors"><ArrowUp className="w-4 h-4" /></span></a>
        </div>
      </div>
    </footer>
  );
}
