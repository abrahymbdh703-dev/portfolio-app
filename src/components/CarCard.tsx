import type { Car } from '@/lib/types';
import {
  BODY_TYPE_LABELS, FUEL_TYPE_LABELS, CONDITION_LABELS,
  formatPrice, formatMileage,
} from '@/lib/types';
import { Gauge, Fuel, Settings2, Calendar, Eye, Heart, Zap } from 'lucide-react';
import { useState } from 'react';

interface CarCardProps {
  car: Car;
  onClick: () => void;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
}

export default function CarCard({ car, onClick, onFavorite, isFavorite }: CarCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div
      className="card-glass card-glass-hover overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-ink-900">
        {!imgLoaded && <div className="absolute inset-0 shimmer" />}
        {car.image_url && (
          <img
            src={car.image_url}
            alt={`${car.brand} ${car.model}`}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
              imgLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImgLoaded(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b14] via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {car.is_featured && (
            <span className="badge bg-gold-500/20 text-gold-300 border border-gold-500/30">
              <Zap className="w-3 h-3" /> مميزة
            </span>
          )}
          <span className={`badge ${car.condition_status === 'new' ? 'bg-success-500/15 text-success-400' : 'bg-sky-500/15 text-sky-300'}`}>
            {CONDITION_LABELS[car.condition_status]}
          </span>
        </div>

        {onFavorite && (
          <button
            onClick={(e) => { e.stopPropagation(); onFavorite(car.id); }}
            className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-ink-950/60 backdrop-blur flex items-center justify-center hover:bg-ink-950/80 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-error-500 text-error-500' : 'text-ink-400'}`} />
          </button>
        )}

        {/* Price overlay */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="text-[10px] text-ink-400 font-bold">السعر</div>
          <div className="font-black text-lg text-white">{formatPrice(car.price)} <span className="text-xs text-gold-400">ج.م</span></div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-white truncate">{car.brand}</h3>
            <span className="text-xs text-ink-500 font-bold flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {car.year}
            </span>
          </div>
          <p className="text-sm text-ink-400 font-semibold truncate">{car.model}</p>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <Spec icon={Gauge} value={`${car.horsepower}`} label="حصان" color="text-sky-400" />
          <Spec icon={Fuel} value={FUEL_TYPE_LABELS[car.fuel_type]} label="وقود" color="text-success-400" />
          <Spec icon={Settings2} value={BODY_TYPE_LABELS[car.body_type]} label="نوع" color="text-gold-400" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-ink-800/50">
          <span className="text-xs text-ink-500 font-semibold">
            {car.mileage_km > 0 ? formatMileage(car.mileage_km) : 'كيلومتراج صفر'}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-400 group-hover:gap-2 transition-all">
            <Eye className="w-3.5 h-3.5" /> التفاصيل
          </span>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon: Icon, value, label, color }: { icon: React.ElementType; value: string; label: string; color: string }) {
  return (
    <div className="rounded-lg bg-ink-800/30 py-2 px-1">
      <Icon className={`w-3.5 h-3.5 mx-auto mb-1 ${color}`} />
      <div className="text-[10px] font-bold text-ink-200 truncate">{value}</div>
      <div className="text-[9px] text-ink-600">{label}</div>
    </div>
  );
}
