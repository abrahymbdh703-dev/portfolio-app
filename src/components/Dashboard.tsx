import { useMemo } from 'react';
import type { Report, Improvement } from '@/lib/types';
import { TARGETS, PAGE_TYPE_LABELS } from '@/lib/types';
import {
  statusForTtfb, statusForLcp, statusForCls, statusForTbt, statusForFullyLoaded, statusForScore,
  deltaPct, formatDate,
} from '@/lib/metrics';
import MetricCard from '@/components/MetricCard';
import TrendChart from '@/components/charts/TrendChart';
import { AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface DashboardProps {
  reports: Report[];
  improvements: Improvement[];
}

export default function Dashboard({ reports, improvements }: DashboardProps) {
  const latest = useMemo(() => {
    if (reports.length === 0) return null;
    const sorted = [...reports].sort((a, b) => new Date(b.tested_at).getTime() - new Date(a.tested_at).getTime());
    return sorted[0];
  }, [reports]);

  const previous = useMemo(() => {
    if (reports.length < 2) return null;
    const sorted = [...reports].sort((a, b) => new Date(b.tested_at).getTime() - new Date(a.tested_at).getTime());
    return sorted[1];
  }, [reports]);

  const trend = (key: keyof Report, lowerIsBetter = true) =>
    latest && previous ? deltaPct(previous[key] as number | null, latest[key] as number | null, lowerIsBetter) : null;

  const doneCount = improvements.filter((i) => i.status === 'done').length;
  const inProgressCount = improvements.filter((i) => i.status === 'in-progress').length;
  const criticalCount = improvements.filter((i) => i.priority === 'critical' && i.status !== 'done').length;

  if (!latest) {
    return (
      <div className="card p-12 text-center">
        <Clock className="w-12 h-12 mx-auto text-ink-600 mb-4" />
        <h2 className="font-display font-bold text-xl text-ink-200 mb-2">لا توجد بيانات أداء بعد</h2>
        <p className="text-ink-500 text-sm">ابدأ بإضافة أول تقرير أداء من تبويب "التقارير"</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-black text-2xl text-ink-50">نظرة عامة</h2>
          <p className="text-sm text-ink-400 mt-1">
            آخر اختبار: {formatDate(latest.tested_at)} · {PAGE_TYPE_LABELS[latest.page_type]} · {latest.tool}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          label="TTFB"
          value={latest.ttfb_ms}
          status={statusForTtfb(latest.ttfb_ms)}
          target="800ms"
          trend={trend('ttfb_ms')}
        />
        <MetricCard
          label="LCP"
          value={latest.lcp_ms}
          status={statusForLcp(latest.lcp_ms)}
          target="2.5s"
          trend={trend('lcp_ms')}
        />
        <MetricCard
          label="Fully Loaded"
          value={latest.fully_loaded_ms}
          status={statusForFullyLoaded(latest.fully_loaded_ms)}
          target="2.5s"
          trend={trend('fully_loaded_ms')}
        />
        <MetricCard
          label="أداء Performance"
          value={latest.performance_score}
          status={statusForScore(latest.performance_score, TARGETS.performance_score)}
          target="90%"
          unit="score"
          trend={trend('performance_score', false)}
          trendLowerIsBetter={false}
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="FCP" value={latest.fcp_ms} status={statusForLcp(latest.fcp_ms)} target="1.8s" />
        <MetricCard label="CLS" value={latest.cls} status={statusForCls(latest.cls)} target="0.1" unit="score" />
        <MetricCard label="TBT" value={latest.tbt_ms} status={statusForTbt(latest.tbt_ms)} target="200ms" />
        <MetricCard
          label="Structure"
          value={latest.structure_score}
          status={statusForScore(latest.structure_score, TARGETS.structure_score)}
          target="95%"
          unit="score"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <TrendChart reports={reports} metric="ttfb_ms" target={TARGETS.ttfb_ms} label="TTFB عبر الوقت" color="#0ea5e9" unit="ms" />
        <TrendChart reports={reports} metric="lcp_ms" target={TARGETS.lcp_ms} label="LCP عبر الوقت" color="#22c55e" unit="ms" />
        <TrendChart reports={reports} metric="fully_loaded_ms" target={TARGETS.fully_loaded_ms} label="Fully Loaded عبر الوقت" color="#a78bfa" unit="ms" />
        <TrendChart reports={reports} metric="performance_score" target={TARGETS.performance_score} label="Performance Score" color="#fbbf24" unit="score" />
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <SummaryCard icon={CheckCircle2} label="تحسينات مكتملة" value={doneCount} color="text-success-400" />
        <SummaryCard icon={Clock} label="قيد التنفيذ" value={inProgressCount} color="text-warning-400" />
        <SummaryCard icon={AlertTriangle} label="أولويات حرجة متبقية" value={criticalCount} color="text-error-400" />
      </div>
    </div>
  );
}

function SummaryCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number; color: string }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl bg-ink-800 flex items-center justify-center ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="font-display font-black text-2xl text-ink-50">{value}</div>
        <div className="text-xs text-ink-400 font-semibold">{label}</div>
      </div>
    </div>
  );
}
