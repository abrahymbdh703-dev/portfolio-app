import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  onNav: (id: string) => void;
}

export default function Footer({ onNav }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink-900 dark:bg-ink-950 text-ink-300 pt-16 pb-8 px-4 sm:px-6 border-t border-ink-800">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="block font-display font-extrabold text-lg text-white">أوتـو جـالاكسي</span>
                <span className="block text-[10px] tracking-[0.2em] text-primary-400 font-bold">AUTO GALAXY</span>
              </div>
            </div>
            <p className="text-sm text-ink-400 leading-relaxed mb-4">
              وجهتك الأولى لشراء السيارات الفاخرة والرياضية في مصر. جودة معتمدة وخدمة استثنائية.
            </p>
            <div className="flex gap-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-ink-800 flex items-center justify-center text-ink-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                  aria-label="تواصل اجتماعي"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">روابط سريعة</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: 'home', label: 'الرئيسية' },
                { id: 'inventory', label: 'السيارات' },
                { id: 'about', label: 'من نحن' },
                { id: 'contact', label: 'تواصل معنا' },
              ].map((l) => (
                <li key={l.id}>
                  <button onClick={() => onNav(l.id)} className="text-ink-400 hover:text-primary-400 transition-colors">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">أنواع السيارات</h4>
            <ul className="space-y-2.5 text-sm text-ink-400">
              <li>سيدان</li>
              <li>دفع رباعي SUV</li>
              <li>رياضية</li>
              <li>كهربائية</li>
              <li>فاخرة</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-sm">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-ink-400">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary-400" /> +20 100 123 4567</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary-400" /> info@autogalaxy.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-400" /> التجمع الخامس، القاهرة</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-500">© {year} أوتـو جـالاكسي. جميع الحقوق محفوظة.</p>
          <p className="text-xs text-ink-500">صُنع بشغف في مصر</p>
        </div>
      </div>
    </footer>
  );
}
