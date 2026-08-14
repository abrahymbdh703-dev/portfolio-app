import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useReveal } from '@/hooks';

export default function Contact() {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 600));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  const contactInfo = [
    { icon: Phone, label: 'الهاتف', value: '+20 100 123 4567', color: 'text-sky-400' },
    { icon: Mail, label: 'البريد', value: 'info@autogalaxy.com', color: 'text-success-400' },
    { icon: MapPin, label: 'العنوان', value: 'القاهرة، مصر', color: 'text-gold-400' },
    { icon: Clock, label: 'أوقات العمل', value: 'السبت - الخميس: 10ص - 10م', color: 'text-primary-300' },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
          <div className="text-center mb-10">
            <h2 className="font-black text-3xl sm:text-4xl text-white">تواصل معنا</h2>
            <p className="text-sm text-ink-400 mt-2">فريقنا جاهز للإجابة على استفساراتك</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Info */}
            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <div key={i} className="card-glass card-glass-hover p-5 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-ink-800/50 flex items-center justify-center shrink-0 ${info.color}`}>
                    <info.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-ink-500 font-bold">{info.label}</div>
                    <div className="text-sm font-black text-white" dir="ltr">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="card-glass p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
              {submitted ? (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-success-500/15 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-success-400" />
                  </div>
                  <h3 className="font-black text-lg text-white mb-2">تم إرسال رسالتك!</h3>
                  <p className="text-sm text-ink-400">سنرد عليك في أقرب وقت</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative">
                  <div>
                    <label className="label">الاسم</label>
                    <input className="input" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="اسمك الكامل" />
                  </div>
                  <div>
                    <label className="label">البريد الإلكتروني</label>
                    <input className="input" type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="label">رسالتك</label>
                    <textarea className="input resize-none" rows={4} required value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="كيف يمكننا مساعدتك؟" />
                  </div>
                  <button type="submit" className="btn-primary w-full">
                    <Send className="w-4 h-4" /> إرسال
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
