import { useState } from 'react';
import { X, Star, Gauge, Fuel, Settings, Users, Zap, Calendar, Palette, Check, Phone } from 'lucide-react';
import type { Car } from '@/types';
import { BODY_STYLE_LABELS, FUEL_TYPE_LABELS, TRANSMISSION_LABELS } from '@/types';
import { formatPrice, formatMileage } from '@/utils/format';
import { useLockBodyScroll } from '@/hooks';

interface CarDetailProps {
  car: Car | null;
  onClose: () => void;
  onContact: () => void;
}

export default function CarDetail({ car, onClose, onContact }: CarDetailProps) {
  const [activeImg, setActiveImg] = useState(0);
  useLockBodyScroll(!!car);

  if (!car) return null;

  const gallery = car.gallery.length > 0 ? car.gallery : [car.image];
  const discount = car.oldPrice ? Math.round(((car.oldPrice - car.price) / car.oldPrice) * 100) : 0;

  const specs = [
    { icon: Gauge, label: 'المحرك', value: car.specs.engine },
    { icon: Zap, label: 'القوة', value: car.specs.power },
    { icon: Gauge, label: 'التسارع', value: car.specs.acceleration },
    { icon: Gauge, label: 'السرعة القصوى', value: car.specs.topSpeed },
    ...(car.specs.range ? [{ icon: Zap, label: 'المدى', value: car.specs.range }] : []),
    { icon: Fuel, label: 'الوقود', value: FUEL_TYPE_LABELS[car.specs.fuelType] },
    { icon: Settings, label: 'ناقل الحركة', value: TRANSMISSION_LABELS[car.specs.transmission] },
    { icon: Users, label: 'المقاعد', value: `${car.specs.seats} أشخاص` },
    { icon: Calendar, label: 'الموديل', value: `${car.specs.year}` },
    { icon: Palette, label: 'اللون', value: car.color },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative w-full max-w-5xl max-h-screen sm:max-h-[92vh] bg-white dark:bg-ink-900 sm:rounded-3xl overflow-hidden shadow-2xl animate-scale-in flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-ink-950/60 text-white flex items-center justify-center hover:bg-error-500 transition-colors backdrop-blur-sm"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto no-scrollbar">
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-ink-100 dark:bg-ink-800">
              <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
                <img
                  src={gallery[activeImg]}
                  alt={`${car.brand} ${car.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {car.badge && (
                <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold shadow-lg">
                  {car.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-error-500 text-white text-xs font-bold shadow-lg">
                  خصم {discount}%
                </span>
              )}

              {gallery.length > 1 && (
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {gallery.map((g, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImg === i ? 'border-primary-500 scale-110' : 'border-white/50'
                      }`}
                    >
                      <img src={g} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{car.brand}</span>
                  <h2 className="font-display font-black text-2xl sm:text-3xl text-ink-900 dark:text-ink-50 leading-tight">{car.name}</h2>
                </div>
                <div className="flex items-center gap-1.5 bg-ink-100 dark:bg-ink-800 px-3 py-1.5 rounded-xl shrink-0">
                  <Star className="w-4 h-4 fill-primary-400 text-primary-400" />
                  <span className="font-bold text-sm text-ink-700 dark:text-ink-200">{car.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 text-xs font-bold">
                  {BODY_STYLE_LABELS[car.bodyStyle]}
                </span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${car.inStock ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400' : 'bg-error-100 dark:bg-error-900/30 text-error-700 dark:text-error-400'}`}>
                  {car.inStock ? 'متوفر' : 'غير متوفر'}
                </span>
                <span className="text-xs text-ink-500 dark:text-ink-400 font-semibold">
                  {formatMileage(car.mileage)} كم
                </span>
              </div>

              <p className="text-sm text-ink-600 dark:text-ink-300 leading-relaxed mb-6">{car.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {specs.map((s, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-ink-50 dark:bg-ink-800/60">
                    <s.icon className="w-4 h-4 text-primary-500 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[10px] text-ink-400 font-semibold">{s.label}</div>
                      <div className="text-xs font-bold text-ink-700 dark:text-ink-200 truncate">{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-sm text-ink-900 dark:text-ink-50 mb-3">المميزات</h4>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ink-100 dark:bg-ink-800 text-xs font-semibold text-ink-600 dark:text-ink-300">
                      <Check className="w-3.5 h-3.5 text-success-500" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-ink-100 dark:border-ink-800">
                <div className="flex items-end justify-between gap-4 mb-4">
                  <div>
                    {car.oldPrice && (
                      <span className="block text-sm text-ink-400 line-through">{formatPrice(car.oldPrice)} ج.م</span>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-black text-3xl text-primary-600 dark:text-primary-400">{formatPrice(car.price)}</span>
                      <span className="text-sm text-ink-500 dark:text-ink-400 font-semibold">ج.م</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onContact}
                  disabled={!car.inStock}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-base shadow-lg shadow-primary-500/30 hover:scale-[1.02] active:scale-100 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  {car.inStock ? 'اطلب السيارة الآن' : 'غير متوفر حالياً'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
