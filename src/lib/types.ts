export type PageType = 'home' | 'category' | 'product' | 'search' | 'checkout' | 'cart' | 'account';
export type Device = 'desktop' | 'mobile';
export type Tool = 'gtmetrix' | 'pagespeed' | 'lighthouse' | 'manual' | 'devtools';

export interface Report {
  id: string;
  page_url: string;
  page_type: PageType;
  tool: Tool;
  tested_at: string;
  device: Device;
  ttfb_ms: number | null;
  lcp_ms: number | null;
  fcp_ms: number | null;
  cls: number | null;
  tbt_ms: number | null;
  fully_loaded_ms: number | null;
  performance_score: number | null;
  structure_score: number | null;
  total_size_kb: number | null;
  requests: number | null;
  raw: Record<string, unknown> | null;
  note: string | null;
  created_at: string;
}

export interface DbQuery {
  id: string;
  report_id: string | null;
  sql: string;
  duration_ms: number;
  caller: string | null;
  stack: string | null;
  query_type: string | null;
  rows_affected: number | null;
  is_slow: boolean;
  created_at: string;
}

export type ImprovementStatus = 'pending' | 'in-progress' | 'done' | 'skipped';
export type ImprovementPriority = 'critical' | 'high' | 'medium' | 'low';
export type ImprovementCategory =
  | 'database'
  | 'cache'
  | 'php'
  | 'frontend'
  | 'images'
  | 'plugins'
  | 'theme'
  | 'server'
  | 'search'
  | 'tracking';

export interface Improvement {
  id: string;
  title: string;
  category: ImprovementCategory;
  status: ImprovementStatus;
  priority: ImprovementPriority;
  expected_impact: string | null;
  actual_impact: string | null;
  note: string | null;
  created_at: string;
  updated_at: string;
}

export const PAGE_TYPE_LABELS: Record<PageType, string> = {
  home: 'الرئيسية',
  category: 'صفحة قسم',
  product: 'صفحة منتج',
  search: 'نتائج البحث',
  checkout: 'الدفع',
  cart: 'السلة',
  account: 'حسابي',
};

export const DEVICE_LABELS: Record<Device, string> = {
  desktop: 'كمبيوتر',
  mobile: 'جوال',
};

export const TOOL_LABELS: Record<Tool, string> = {
  gtmetrix: 'GTmetrix',
  pagespeed: 'PageSpeed Insights',
  lighthouse: 'Lighthouse',
  devtools: 'Chrome DevTools',
  manual: 'إدخال يدوي',
};

export const CATEGORY_LABELS: Record<ImprovementCategory, string> = {
  database: 'قاعدة البيانات',
  cache: 'التخزين المؤقت',
  php: 'PHP',
  frontend: 'الواجهة',
  images: 'الصور',
  plugins: 'الإضافات',
  theme: 'الثيم',
  server: 'الخادم',
  search: 'البحث',
  tracking: 'التتبع',
};

export const STATUS_LABELS: Record<ImprovementStatus, string> = {
  pending: 'قيد الانتظار',
  'in-progress': 'قيد التنفيذ',
  done: 'تم',
  skipped: 'متخطى',
};

export const PRIORITY_LABELS: Record<ImprovementPriority, string> = {
  critical: 'حرجة',
  high: 'عالية',
  medium: 'متوسطة',
  low: 'منخفضة',
};

export const TARGETS = {
  ttfb_ms: 800,
  lcp_ms: 2500,
  cls: 0.1,
  tbt_ms: 200,
  fully_loaded_ms: 2500,
  performance_score: 90,
  structure_score: 95,
};
