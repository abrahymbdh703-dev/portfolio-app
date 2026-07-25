import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import type { Report } from '@/lib/types';
import { formatDate } from '@/lib/metrics';

interface TrendChartProps {
  reports: Report[];
  metric: 'ttfb_ms' | 'lcp_ms' | 'fully_loaded_ms' | 'performance_score';
  target: number;
  label: string;
  color: string;
  unit: 'ms' | 'score';
}

export default function TrendChart({ reports, metric, target, label, color, unit }: TrendChartProps) {
  const data = [...reports]
    .sort((a, b) => new Date(a.tested_at).getTime() - new Date(b.tested_at).getTime())
    .map((r) => ({
      date: formatDate(r.tested_at),
      value: r[metric] as number | null,
      page: r.page_type,
    }))
    .filter((d) => d.value != null);

  if (data.length === 0) {
    return (
      <div className="card p-6">
        <h3 className="font-bold text-ink-200 mb-4">{label}</h3>
        <div className="h-48 flex items-center justify-center text-ink-500 text-sm">لا توجد بيانات بعد</div>
      </div>
    );
  }

  const fmt = (v: number) => (unit === 'ms' ? (v >= 1000 ? `${(v / 1000).toFixed(1)}s` : `${Math.round(v)}ms`) : `${Math.round(v)}`);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-ink-200 text-sm">{label}</h3>
        <span className="badge bg-ink-800 text-ink-400">الهدف: {fmt(target)}</span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 8, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 10 }} tickFormatter={fmt} width={48} />
          <Tooltip
            formatter={(v) => [fmt(Number(v)), label]}
            contentStyle={{ backgroundColor: 'var(--ink-900)', border: '1px solid var(--ink-700)', borderRadius: 12 }}
          />
          <ReferenceLine y={target} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'الهدف', fill: '#22c55e', fontSize: 10 }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2.5}
            dot={{ r: 3, fill: color }}
            activeDot={{ r: 5 }}
            name={label}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
