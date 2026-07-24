import { useState, useEffect } from 'react';
import { Menu, X, Code2, Sun, Moon, Globe } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { languages, type Lang } from '@/i18n/translations';

export default function Navbar() {
  const { t, theme, toggleTheme, lang, setLang } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState('#home');

  const navItems = [
    { label: t.nav.home, href: '#home' }, { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' }, { label: t.nav.projects, href: '#projects' },
    { label: t.nav.experience, href: '#experience' }, { label: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el) { const rect = el.getBoundingClientRect(); if (rect.top <= 120 && rect.bottom >= 120) { setActive(item.href); break; } }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-2xl shadow-black/10 dark:shadow-black/20 py-3' : 'py-5 bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2 group shrink-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center transition-transform group-hover:rotate-12 group-hover:scale-110 duration-500"><Code2 className="w-5 h-5 text-white" /></div>
            <div className="absolute inset-0 rounded-xl bg-primary-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
          </div>
          <span className="font-display font-bold text-base sm:text-lg text-ink-900 dark:text-white whitespace-nowrap">Abd Elftah<span className="text-primary-500">.</span></span>
        </a>
        <ul className="hidden lg:flex items-center gap-1">
          {navItems.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${active === link.href ? 'text-primary-600 dark:text-primary-400' : 'text-ink-500 dark:text-ink-300 hover:text-ink-900 dark:hover:text-white'}`}>{link.label}{active === link.href && <span className="absolute inset-0 rounded-lg bg-primary-500/10 border border-primary-500/20" />}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-600 dark:text-ink-300 hover:text-primary-500 hover:scale-110 transition-all" aria-label="Language"><Globe className="w-5 h-5" /></button>
            {langOpen && (<><div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} /><ul className="absolute end-0 mt-2 z-20 glass rounded-xl py-2 w-40 shadow-xl animate-scale-in">{languages.map((l) => (<li key={l.code}><button onClick={() => { setLang(l.code as Lang); setLangOpen(false); }} className={`w-full px-4 py-2 text-sm flex items-center gap-2 transition-colors ${lang === l.code ? 'text-primary-600 dark:text-primary-400 bg-primary-500/10' : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-white/5'}`}><span className="text-base">{l.flag}</span>{l.label}</button></li>))}</ul></>)}
          </div>
          <button onClick={toggleTheme} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-600 dark:text-ink-300 hover:text-primary-500 hover:scale-110 transition-all" aria-label="Toggle theme">{theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}</button>
          <a href="#contact" className="hidden lg:block px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 hover:scale-105">{t.nav.letsTalk}</a>
          <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-700 dark:text-white" aria-label="Menu">{open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
      </nav>
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <ul className="glass mx-4 rounded-2xl p-4 flex flex-col gap-1">
          {navItems.map((link) => (<li key={link.href}><a href={link.href} onClick={() => setOpen(false)} className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active === link.href ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'text-ink-500 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-white/5 hover:text-ink-900 dark:hover:text-white'}`}>{link.label}</a></li>))}
          <li className="mt-2"><a href="#contact" onClick={() => setOpen(false)} className="block text-center px-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-sm font-bold">{t.nav.letsTalk}</a></li>
        </ul>
      </div>
    </header>
  );
}
