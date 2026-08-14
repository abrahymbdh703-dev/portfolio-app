import { useState, useEffect } from 'react';
import { Menu, X, Car } from 'lucide-react';
import { useScrollProgress } from '@/hooks';

interface NavbarProps {
  onNavigate: (id: string) => void;
}

const LINKS = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'catalog', label: 'السيارات' },
  { id: 'brands', label: 'العلامات' },
  { id: 'test-drive', label: 'تجربة قيادة' },
  { id: 'contact', label: 'تواصل' },
];

export default function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#06070d]/85 backdrop-blur-xl border-b border-sky-500/10' : 'bg-transparent'
    }`}>
      {/* Scroll progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-sky-500 to-primary-700 transition-all duration-150"
        style={{ width: `${progress}%` }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => handleNav('home')} className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-primary-800 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-shadow">
              <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="text-right">
              <h1 className="font-black text-base text-white leading-none">أوتـو جـالاكسي</h1>
              <p className="text-[10px] text-ink-500 mt-0.5">معرض السيارات الفاخرة</p>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className="px-4 py-2 text-sm font-bold text-ink-300 hover:text-white rounded-lg hover:bg-ink-800/50 transition-all"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button onClick={() => handleNav('catalog')} className="hidden md:inline-flex btn-primary text-xs px-5 py-2.5">
            تصفح السيارات
          </button>

          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#06070d]/95 backdrop-blur-xl border-t border-sky-500/10 animate-fade-in">
          <nav className="flex flex-col p-4 gap-1">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className="px-4 py-3 text-right text-sm font-bold text-ink-300 hover:text-white rounded-lg hover:bg-ink-800/50 transition-all"
              >
                {l.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
