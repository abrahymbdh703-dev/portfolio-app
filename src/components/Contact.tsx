import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import { useReveal } from '@/hooks';

interface ContactProps {
  selectedCarName?: string | null;
  onCarNameConsumed?: () => void;
}

export default function Contact({ selectedCarName, onCarNameConsumed }: ContactProps) {
  const { ref, visible } = useReveal();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const initialMessage = selectedCarName
    ? `أرغب في الاستفسار عن سيارة ${selectedCarName}. الرجاء التواصل معي.`
    : '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', phone: '', email: '', message: '' });
    onCarNameConsumed?.();
    setTimeout(() => setSent(false), 4000);
  };

  const info = [
    { icon: Phone, label: 'اتصل بنا', value: '+20 100 123 4567', sub: 'متاح يومياً 9ص - 11م' },
    { icon: Mail, label: 'راسلنا', value: 'info@autogalaxy.com', sub: 'نرد خلال 24 ساعة' },
    { icon: MapPin, label: 'زورنا', value: 'القاهرة الجديدة، التجمع الخامس', sub: 'شارع التسعين الشمالي' },
    { icon: Clock, label: 'ساعات العمل', value: 'السبت - الخميس', sub: '9:00 صباحاً - 10:00 مساءً' },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6">
      <div ref={ref} className={`mx-auto max-w-7xl ${visible ? 'animate-fade-up' : 'opacity-0'}`}>
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-sm font-bold mb-4">
            تواصل معنا
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink-900 dark:text-ink-50 mb-4">
            ابدأ رحلتك معنا
          </h2>
          <p className="text-lg text-ink-500 dark:text-ink-400 max-w-2xl mx-auto">
            فريقنا جاهز لمساعدتك في إيجاد السيارة المثالية. تواصل معنا اليوم
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {info.map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 card-hover">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary-500/20">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-ink-900 dark:text-ink-50 text-sm">{item.label}</h4>
                  <p className="text-ink-700 dark:text-ink-200 font-semibold text-sm mt-0.5">{item.value}</p>
                  <p className="text-ink-400 text-xs mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 shadow-xl space-y-5">
              {sent && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400 animate-fade-in">
                  <Check className="w-5 h-5" />
                  <span className="font-bold text-sm">تم إرسال طلبك بنجاح! سنتواصل معك قريباً.</span>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="الاسم الكامل" required>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="أدخل اسمك"
                    className="form-input"
                  />
                </Field>
                <Field label="رقم الهاتف" required>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="01xxxxxxxxx"
                    className="form-input"
                  />
                </Field>
              </div>

              <Field label="البريد الإلكتروني">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="example@email.com"
                  className="form-input"
                />
              </Field>

              <Field label="رسالتك" required>
                <textarea
                  required
                  rows={4}
                  value={form.message || initialMessage}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="اكتب استفسارك هنا..."
                  className="form-input resize-none"
                  defaultValue={initialMessage}
                />
              </Field>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-base shadow-lg shadow-primary-500/30 hover:scale-[1.02] active:scale-100 transition-transform flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                إرسال الطلب
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-ink-700 dark:text-ink-200 mb-2">
        {label} {required && <span className="text-error-500">*</span>}
      </span>
      {children}
    </label>
  );
}
