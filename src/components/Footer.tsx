import { Car, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-sky-500/10 py-12 mt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-primary-800 flex items-center justify-center">
                <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-black text-base text-white leading-none">أوتـو جـالاكسي</h3>
                <p className="text-[10px] text-ink-500 mt-0.5">معرض السيارات الفاخرة</p>
              </div>
            </div>
            <p className="text-xs text-ink-500 leading-relaxed">
              معرض السيارات الأول للسيارات الفاخرة والرياضية في مصر. جودة مضمونة وأسعار تنافسية.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-black text-sm text-white mb-3">روابط سريعة</h4>
            <ul className="space-y-2">
              {['الرئيسية', 'السيارات', 'تجربة قيادة', 'تواصل معنا'].map((l, i) => (
                <li key={i}>
                  <a href={`#${['home', 'catalog', 'test-drive', 'contact'][i]}`}
                    className="text-xs text-ink-500 hover:text-sky-400 transition-colors font-semibold">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-sm text-white mb-3">معلومات التواصل</h4>
            <ul className="space-y-2 text-xs text-ink-500 font-semibold">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-sky-400" /> <span dir="ltr">+20 100 123 4567</span></li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-success-400" /> info@autogalaxy.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gold-400" /> القاهرة، مصر</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-black text-sm text-white mb-3">تابعنا</h4>
            <div className="flex gap-2">
              {[
                { icon: Facebook, color: 'hover:text-sky-400' },
                { icon: Instagram, color: 'hover:text-gold-400' },
                { icon: Twitter, color: 'hover:text-primary-300' },
              ].map((s, i) => (
                <a key={i} href="#" className={`w-10 h-10 rounded-xl bg-ink-800/50 border border-ink-700/30 flex items-center justify-center text-ink-400 ${s.color} transition-colors`}>
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-ink-800/50 text-center">
          <p className="text-xs text-ink-600">
            © 2024 أوتـو جـالاكسي · جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}
