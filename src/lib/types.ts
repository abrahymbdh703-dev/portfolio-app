export type BodyType = 'sedan' | 'coupe' | 'suv' | 'hatchback' | 'convertible';
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';
export type Transmission = 'automatic' | 'manual';
export type ConditionStatus = 'new' | 'used';

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  body_type: BodyType;
  fuel_type: FuelType;
  transmission: Transmission;
  mileage_km: number;
  color: string;
  horsepower: number;
  engine_cc: number;
  seats: number;
  description: string | null;
  image_url: string | null;
  gallery: string[] | null;
  is_featured: boolean;
  is_sold: boolean;
  condition_status: ConditionStatus;
  features: string[] | null;
  created_at: string;
  updated_at: string;
}

export const BODY_TYPE_LABELS: Record<BodyType, string> = {
  sedan: 'سيدان',
  coupe: 'كوبيه',
  suv: 'دفع رباعي',
  hatchback: 'هاتشباك',
  convertible: 'كابورليه',
};

export const FUEL_TYPE_LABELS: Record<FuelType, string> = {
  petrol: 'بنزين',
  diesel: 'ديزل',
  electric: 'كهربائي',
  hybrid: 'هجين',
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  automatic: 'أوتوماتيك',
  manual: 'يدوي',
};

export const CONDITION_LABELS: Record<ConditionStatus, string> = {
  new: 'جديدة',
  used: 'مستعملة',
};

export const BRANDS = [
  'Lamborghini', 'Mercedes-Benz', 'BMW', 'Ferrari', 'Porsche',
  'Genesis', 'Audi', 'Bentley',
];

export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(2)} مليون`;
  }
  return new Intl.NumberFormat('ar-EG').format(price);
}

export function formatMileage(km: number): string {
  if (km === 0) return '0 كم';
  return new Intl.NumberFormat('ar-EG').format(km) + ' كم';
}
