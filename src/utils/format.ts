export function formatPrice(price: number): string {
  return new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 0 }).format(price);
}

export function formatMileage(km: number): string {
  return new Intl.NumberFormat('ar-EG', { maximumFractionDigits: 0 }).format(km);
}
