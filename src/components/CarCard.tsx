import { Star, Fuel, Settings, Users, Zap } from 'lucide-react';
import type { Car } from '@/types';
import { BODY_STYLE_LABELS, FUEL_TYPE_LABELS, TRANSMISSION_LABELS } from '@/types';
import { formatPrice, formatMileage } from '@/utils/format';

interface CarCardProps {
  car: Car;
  onClick: () => void;
}

export default function CarCard({ car, onClick }: CarCardProps) {
  const discount = car.oldPrice ? Math.round(((car.oldPrice - car.price) / car.oldPrice) * 100) : 0;
  return (
    <article
      onClick={onClick}
      className="card-hover group cursor-pointer bg-white dark:bg-ink-900 rounded-3xl overflow-hidden border border-ink-200 dark:border-ink-800 shadow-lg shadow-ink-900/5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-100 dark:bg-ink-800">
        <img
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          {car.badge && (
            <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-bold shadow-lg">
              {car.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1.5 rounded-full bg-error-500 text-white text-xs font-bold shadow-lg">
              خصم {discount}%
            </span>
          )}
        </div>

        {!car.inStock && (
          <div className="absolute inset-0 bg-ink-950/60 flex items-center justify-center">
            <span className="px-5 py-2.5 rounded-xl bg-ink-900 text-white font-bold text-sm">غير متوفر حالياً</span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full glass text-xs font-bold text-ink-700 dark:text-ink-100">
          {BODY_STYLE_LABELS[car.bodyStyle]}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-display font-extrabold text-lg text-ink-900 dark:text-ink-50 leading-tight">{car.brand}</h3>
            <p className="text-sm text-ink-500 dark:text-ink-400">{car.name}</p>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-4 h-4 fill-primary-400 text-primary-400" />
            <span className="font-bold text-sm text-ink-700 dark:text-ink-200">{car.rating}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <Spec icon={Fuel} label={FUEL_TYPE_LABELS[car.specs.fuelType]} />
          <Spec icon={Settings} label={TRANSMISSION_LABELS[car.specs.transmission]} />
          <Spec icon={Users} label={`${car.specs.seats} مقاعد`} />
          <Spec icon={Zap} label={car.specs.power} />
        </div>

        <div className="flex items-end justify-between gap-2 pt-4 border-t border-ink-100 dark:border-ink-800">
          <div>
            {car.oldPrice && (
              <span className="block text-xs text-ink-400 line-through">{formatPrice(car.oldPrice)} ج.م</span>
            )}
            <span className="block font-display font-black text-xl text-primary-600 dark:text-primary-400">{formatPrice(car.price)}</span>
            <span className="text-xs text-ink-400">جنيه مصري</span>
          </div>
          <div className="text-left">
            <span className="block text-xs text-ink-400">العداد</span>
            <span className="block text-sm font-bold text-ink-600 dark:text-ink-300">{formatMileage(car.mileage)} كم</span>
          </div>
        </div>

        <button
          className="mt-4 w-full py-3 rounded-xl bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 font-bold text-sm group-hover:bg-primary-500 group-hover:text-white transition-all duration-300"
        >
          عرض التفاصيل
        </button>
      </div>
    </article>
  );
}

function Spec({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-ink-500 dark:text-ink-400">
      <Icon className="w-3.5 h-3.5 text-primary-500 shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  );
}
