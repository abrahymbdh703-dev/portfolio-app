export type BodyStyle = 'sedan' | 'suv' | 'sports' | 'electric' | 'luxury' | 'hatchback';
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';
export type Transmission = 'automatic' | 'manual';

export interface CarSpec {
  engine: string;
  power: string;
  acceleration: string;
  topSpeed: string;
  range?: string;
  seats: number;
  fuelType: FuelType;
  transmission: Transmission;
  year: number;
}

export interface Feature {
  icon: string;
  label: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  bodyStyle: BodyStyle;
  price: number;
  oldPrice?: number;
  image: string;
  gallery: string[];
  color: string;
  mileage: number;
  rating: number;
  featured: boolean;
  badge?: string;
  specs: CarSpec;
  features: string[];
  description: string;
  inStock: boolean;
}

export interface FilterState {
  search: string;
  bodyStyle: BodyStyle | 'all';
  fuelType: FuelType | 'all';
  minPrice: number;
  maxPrice: number;
  sortBy: 'default' | 'price-low' | 'price-high' | 'rating' | 'year-new';
}

export const BODY_STYLE_LABELS: Record<BodyStyle, string> = {
  sedan: 'سيدان',
  suv: 'دفع رباعي',
  sports: 'رياضي',
  electric: 'كهربائي',
  luxury: 'فاخر',
  hatchback: 'هاتشباك',
};

export const FUEL_TYPE_LABELS: Record<FuelType, string> = {
  petrol: 'بنزين',
  diesel: 'ديزل',
  electric: 'كهربائي',
  hybrid: 'هايبرد',
};

export const TRANSMISSION_LABELS: Record<Transmission, string> = {
  automatic: 'أوتوماتيك',
  manual: 'يدوي',
};
