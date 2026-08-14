import { useState } from 'react';
import type { Car } from '@/lib/types';
import {
  BODY_TYPE_LABELS, FUEL_TYPE_LABELS, TRANSMISSION_LABELS, CONDITION_LABELS,
  formatPrice, formatMileage,
} from '@/lib/types';
import {
  X, Gauge, Fuel, Settings2, Calendar, Cog, Users, Palette, Zap,
  CheckCircle2, Phone, CalendarCheck,
} from 'lucide-react';
import { useLockBodyScroll } from '@/hooks';

interface CarDetailProps {
  car: Car;
  onClose: () => void;
  onTestDrive: () => void;
}

export default function CarDetail({ car, onClose, onTestDrive }: CarDetailProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  useLockBodyScroll(true);

  const gallery = [car.image_url, ...(car.gallery ?? [])].filter(Boolean) as string[];

  const specs = [
    { icon: Calendar, label: 'سنة الصنع', value: `${car.year}` },
    { icon: Gauge, label: 'القوة', value: `${car.horsepower} حصان` },
    { icon: Cog, label: 'المحرك', value: `${(car.engine_cc / 1000).toFixed(1)} لتر` },
    { icon: Settings2, label: 'النوع', value: BODY_TYPE_LABELS[car.body_type] },
    { icon: Fuel, label: 'الوقود', value: FUEL_TYPE_LABELS[car.fuel_type] },
    { icon: Cog, label: 'ناقل الحركة', value: TRANSMISSION_LABELS[car.transmission] },
    { icon: Users, label: 'المقاعد', value: `${car.seats} مقاعد` },
    { icon: Palette, label: 'اللون', value: car.color },
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-[#0a0b14] border border-sky-500/15 sm:rounded-3xl overflow-hidden animate-scale-in my-0 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-xl bg-ink-950/70 backdrop-blur flex items-center justify-center text-ink-300 hover:text-white hover:bg-ink-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery */}
        <div className="relative h-64 sm:h-80 bg-ink-900">
          {!imgLoaded && <div className="absolute inset-0 shimmer" />}
          {gallery[activeImg] && (
            <img
              src={gallery[activeImg]}
              alt={`${car.brand} ${car.model}`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
              key={activeImg}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b14] via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 right-4 flex gap-2">
            {car.is_featured && (
              <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30">
                <Zap className="w-3 h-3" /> مميزة
              </span>
            )}
            <span className={`badge ${car.condition_status === 'new' ? 'bg-success-500/15 text-success-400' : 'bg-sky-500/15 text-sky-300'}`}>
              {CONDITION_LABELS[car.condition_status]}
            </span>
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="absolute bottom-3 right-3 flex gap-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => { setActiveImg(i); setImgLoaded(false); }}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImg === i ? 'border-sky-500' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Title + price */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-black text-2xl text-white">{car.brand} {car.model}</h2>
              <p className="text-sm text-ink-400 font-bold mt-1">{car.year} · {BODY_TYPE_LABELS[car.body_type]}</p>
            </div>
            <div className="text-left shrink-0">
              <div className="text-[10px] text-ink-500 font-bold">السعر</div>
              <div className="font-black text-xl text-gradient-gold">{formatPrice(car.price)} ج.م</div>
            </div>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {specs.map((spec, i) => (
              <div key={i} className="rounded-xl bg-ink-800/30 border border-ink-700/30 p-3">
                <spec.icon className="w-4 h-4 text-sky-400 mb-1.5" />
                <div className="text-[10px] text-ink-500 font-bold">{spec.label}</div>
                <div className="text-xs font-black text-ink-100 truncate">{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          {car.description && (
            <div>
              <h3 className="text-sm font-black text-white mb-2">وصف السيارة</h3>
              <p className="text-sm text-ink-400 leading-relaxed">{car.description}</p>
            </div>
          )}

          {/* Features */}
          {car.features && car.features.length > 0 && (
            <div>
              <h3 className="text-sm font-black text-white mb-2">المميزات</h3>
              <div className="flex flex-wrap gap-2">
                {car.features.map((feat, i) => (
                  <span key={i} className="badge bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    <CheckCircle2 className="w-3 h-3" /> {feat}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mileage */}
          <div className="flex items-center gap-2 text-sm text-ink-400">
            <Gauge className="w-4 h-4 text-sky-400" />
            <span className="font-bold">{car.mileage_km > 0 ? formatMileage(car.mileage_km) : 'كيلومتراج صفر'}</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={onTestDrive} className="btn-primary flex-1">
              <CalendarCheck className="w-4 h-4" /> احجز تجربة قيادة
            </button>
            <a href="#contact" onClick={onClose} className="btn-ghost flex-1 justify-center">
              <Phone className="w-4 h-4" /> تواصل معنا
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
