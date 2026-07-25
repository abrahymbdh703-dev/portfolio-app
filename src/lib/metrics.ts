export type MetricStatus = 'good' | 'warn' | 'bad';

export function statusForTtfb(ms: number | null): MetricStatus {
  if (ms == null) return 'warn';
  if (ms <= 800) return 'good';
  if (ms <= 1500) return 'warn';
  return 'bad';
}
export function statusForLcp(ms: number | null): MetricStatus {
  if (ms == null) return 'warn';
  if (ms <= 2500) return 'good';
  if (ms <= 4000) return 'warn';
  return 'bad';
}
export function statusForCls(cls: number | null): MetricStatus {
  if (cls == null) return 'warn';
  if (cls <= 0.1) return 'good';
  if (cls <= 0.25) return 'warn';
  return 'bad';
}
export function statusForTbt(ms: number | null): MetricStatus {
  if (ms == null) return 'warn';
  if (ms <= 200) return 'good';
  if (ms <= 600) return 'warn';
  return 'bad';
}
export function statusForFullyLoaded(ms: number | null): MetricStatus {
  if (ms == null) return 'warn';
  if (ms <= 2500) return 'good';
  if (ms <= 4000) return 'warn';
  return 'bad';
}
export function statusForScore(score: number | null, target: number): MetricStatus {
  if (score == null) return 'warn';
  if (score >= target) return 'good';
  if (score >= target - 15) return 'warn';
  return 'bad';
}

export const STATUS_COLORS: Record<MetricStatus, { text: string; bg: string; border: string; dot: string }> = {
  good: { text: 'text-success-400', bg: 'bg-success-500/10', border: 'border-success-500/30', dot: 'bg-success-400' },
  warn: { text: 'text-warning-400', bg: 'bg-warning-500/10', border: 'border-warning-500/30', dot: 'bg-warning-400' },
  bad: { text: 'text-error-400', bg: 'bg-error-500/10', border: 'border-error-500/30', dot: 'bg-error-400' },
};

export function formatMs(ms: number | null): string {
  if (ms == null) return '—';
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)}s`;
  return `${Math.round(ms)}ms`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ar-EG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function deltaPct(before: number | null, after: number | null, lowerIsBetter = true): number | null {
  if (before == null || after == null || before === 0) return null;
  const delta = ((after - before) / before) * 100;
  return lowerIsBetter ? -delta : delta;
}
