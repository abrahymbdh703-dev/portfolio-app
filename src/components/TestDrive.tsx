import { useState, useEffect } from 'react';
import type { Car } from '@/lib/types';
import { CalendarCheck, Send, CheckCircle2, Car as CarIcon } from 'lucide-react';
import { useReveal } from '@/hooks';

interface TestDriveProps {
  selectedCar: Car | null;
  cars: Car[];
}

export default function TestDrive({ selectedCar, cars }: TestDriveProps) {
  const { ref, visible } = useReveal();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', carId: '', date: '', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCar) {
      setForm((f) => ({ ...f, carId: selectedCar.id }));
      const el = document.getElementById('test-drive');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedCar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    // Simulate submission — in a real app this would post to an edge function
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', phone: '', email: '', carId: '', date: '', notes: '' });
    }, 4000);
  };

  const selectedCarData = cars.find((c) => c.id === form.carId);

  return (
    <section id="test-drive" className="py-16 sm:py-20 scroll-mt-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 mb-3">
              <CalendarCheck className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-xs font-bold text-sky-300">تجربة قيادة</span>
            </div>
            <h2 className="font-black text-3xl sm:text-4xl text-white">احجز تجربة قيادة</h2>
            <p className="text-sm text-ink-400 mt-2 max-w-lg mx-auto">
              اختر السيارة والتاريخ، وسنتواصل معك لتأكيد الموعد
            </p>
          </div>

          <div className="card-glass p-6 sm:p-8 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

            {submitted ? (
              <div className="text-center py-12 animate-scale-in">
                <div className="w-16 h-16 rounded-full bg-success-500/15 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success-400" />
                </div>
                <h3 className="font-black text-xl text-white mb-2">تم استلام طلبك بنجاح!</h3>
                <p className="text-sm text-ink-400">سنتواصل معك خلال 24 ساعة لتأكيد الموعد</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative">
                {/* Selected car preview */}
                {selectedCarData && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 mb-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-ink-800 shrink-0">
                      {selectedCarData.image_url && (
                        <img src={selectedCarData.image_url} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-sky-300 font-bold">السيارة المختارة</div>
                      <div className="text-sm font-black text-white truncate">{selectedCarData.brand} {selectedCarData.model}</div>
                    </div>
                    <CarIcon className="w-5 h-5 text-sky-400 shrink-0" />
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">الاسم الكامل</label>
                    <input className="input" required value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="مثال: أحمد محمد" />
                  </div>
                  <div>
                    <label className="label">رقم الهاتف</label>
                    <input className="input" required type="tel" value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="01xxxxxxxxx" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="label">البريد الإلكتروني (اختياري)</label>
                    <input className="input" type="email" value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com" />
                  </div>
                  <div>
                    <label className="label">السيارة</label>
                    <select className="input cursor-pointer" value={form.carId}
                      onChange={(e) => setForm({ ...form, carId: e.target.value })}>
                      <option value="">اختر سيارة</option>
                      {cars.map((c) => (
                        <option key={c.id} value={c.id}>{c.brand} {c.model} ({c.year})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label">التاريخ المفضل</label>
                  <input className="input" type="date" required value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]} />
                </div>

                <div>
                  <label className="label">ملاحظات (اختياري)</label>
                  <textarea className="input resize-none" rows={3} value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="أي طلبات خاصة..." />
                </div>

                {error && <p className="text-error-400 text-sm font-bold">{error}</p>}

                <button type="submit" disabled={submitting} className="btn-primary w-full">
                  {submitting ? (
                    <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> جاري الإرسال...</>
                  ) : (
                    <><Send className="w-4 h-4" /> إرسال الطلب</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
