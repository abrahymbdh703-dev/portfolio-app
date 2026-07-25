import type { MetricStatus } from '@/lib/metrics';
import { STATUS_COLORS, formatMs } from '@/lib/metrics';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: number | null;
  status: MetricStatus;
  target: string;
  unit?: string;
  trend?: number | null;
  trendLowerIsBetter?: boolean;
}

export default function MetricCard({ label, value, status, target, unit, trend, trendLowerIsBetter = true }: MetricCardProps) {
  const c = STATUS_COLORS[status];
  const display = value == null ? '—' : unit === 'score' ? `${Math.round(value)}` : formatMs(value);

  let trendEl = null;
  if (trend != null && Math.abs(trend) > 0.5) {
    const improved = trendLowerIsBetter ? trend > 0 : trend < 0;
    const Icon = improved ? TrendingDown : TrendingUp;
    const cls = improved ? 'text-success-400' : 'text-error-400';
    trendEl = (
      <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${cls}`}>
        <Icon className="w-3 h-3" />
        {Math.abs(trend).toFixed(0)}%
      </span>
    );
  } else if (trend != null) {
    trendEl = (
      <span className="inline-flex items-center gap-0.5 text-xs font-bold text-ink-500">
        <Minus className="w-3 h-3" /> 0%
      </span>
    );
  }

  return (
    <div className={`card p-4 border ${c.border} card-hover`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs font-bold text-ink-400">{label}</span>
        <span className={`w-2 h-2 rounded-full ${c.dot} mt-1`} />
      </div>
      <div className="flex items-end gap-2">
        <span className="font-display font-black text-2xl text-ink-50">{display}</span>
        {trendEl}
      </div>
      <div className="text-[10px] text-ink-500 mt-1">الهدف: {target}</div>
    </div>
  );
}
