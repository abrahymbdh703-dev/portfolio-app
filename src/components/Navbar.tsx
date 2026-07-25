import { Car } from 'lucide-react';
import { useScrolled } from '@/hooks';

interface NavbarProps {
  dark: boolean;
  toggleDark: () => void;
  onNav: (id: string) => void;
}

const links = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'inventory', label: 'السيارات' },
  { id: 'about', label: 'من نحن' },
  { id: 'contact', label: 'تواصل معنا' },
];

export default function Navbar({ dark, toggleDark, onNav }: NavbarProps) {
  const scrolled = useScrolled(30);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg shadow-ink-900/5 py-3' : 'py-5 bg-transparent'}`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 flex items-center justify-between">
        <button onClick={() => onNav('home')} className="flex items-center gap-2.5 group">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform duration-300">
            <Car className="w-6 h-6 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-right">
            <span className="block font-display font-extrabold text-lg leading-none text-ink-900 dark:text-ink-50">أوتـو جـالاكسي</span>
            <span className="block text-[10px] tracking-[0.2em] text-primary-600 dark:text-primary-400 font-bold mt-0.5">AUTO GALAXY</span>
          </div>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => onNav(l.id)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-ink-600 dark:text-ink-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-ink-800/60 transition-all duration-300"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            aria-label="تبديل الوضع"
            className="w-11 h-11 rounded-xl glass flex items-center justify-center text-ink-700 dark:text-ink-200 hover:scale-110 hover:text-primary-500 transition-all duration-300"
          >
            {dark ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => onNav('inventory')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-sm shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 transition-all duration-300"
          >
            تصفح السيارات
          </button>
        </div>
      </nav>
    </header>
  );
}
