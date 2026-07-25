import { useCallback, useEffect, useState, lazy, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import type { Report, DbQuery, Improvement } from '@/lib/types';
import ImprovementsView from '@/components/ImprovementsView';
import DiagnosticGuide from '@/components/DiagnosticGuide';
import {
  Gauge, ClipboardList, Database, ListChecks, BookOpen, Activity, ExternalLink,
} from 'lucide-react';

const Dashboard = lazy(() => import('@/components/Dashboard'));
const ReportsView = lazy(() => import('@/components/ReportsView'));
const QueryAnalyzer = lazy(() => import('@/components/QueryAnalyzer'));

type Tab = 'overview' | 'reports' | 'queries' | 'improvements' | 'guide';

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'نظرة عامة', icon: Gauge },
  { id: 'reports', label: 'التقارير', icon: ClipboardList },
  { id: 'queries', label: 'تحليل الاستعلامات', icon: Database },
  { id: 'improvements', label: 'خطة التحسينات', icon: ListChecks },
  { id: 'guide', label: 'دليل التشخيص', icon: BookOpen },
];

function App() {
  const [tab, setTab] = useState<Tab>('overview');
  const [reports, setReports] = useState<Report[]>([]);
  const [queries, setQueries] = useState<DbQuery[]>([]);
  const [improvements, setImprovements] = useState<Improvement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    const [repRes, qRes, impRes] = await Promise.all([
      supabase.from('reports').select('*').order('tested_at', { ascending: false }),
      supabase.from('db_queries').select('*').order('duration_ms', { ascending: false }),
      supabase.from('improvements').select('*').order('created_at', { ascending: false }),
    ]);
    if (repRes.error || qRes.error || impRes.error) {
      setError('تعذّر تحميل البيانات من قاعدة البيانات');
    } else {
      setReports(repRes.data as Report[]);
      setQueries(qRes.data as DbQuery[]);
      setImprovements(impRes.data as Improvement[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-ink-950/80 border-b border-ink-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-primary-700 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="font-display font-black text-base text-ink-50 leading-none">لوحة أداء outlet90</h1>
                <p className="text-[10px] text-ink-500 mt-0.5">تتبّع وتحسين أداء WooCommerce</p>
              </div>
            </div>
            <a
              href="https://outlet90.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" /> outlet90.com
            </a>
          </div>

          <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar -mb-px">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.id
                    ? 'border-sky-500 text-sky-400'
                    : 'border-transparent text-ink-400 hover:text-ink-200'
                }`}
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="card p-8 text-center">
            <p className="text-error-400 font-bold mb-2">{error}</p>
            <button onClick={loadAll} className="btn-primary">إعادة المحاولة</button>
          </div>
        ) : (
          <div className="animate-fade-in">
            {tab === 'overview' && (
              <Suspense fallback={<Spinner />}><Dashboard reports={reports} improvements={improvements} /></Suspense>
            )}
            {tab === 'reports' && (
              <Suspense fallback={<Spinner />}><ReportsView reports={reports} onChange={loadAll} /></Suspense>
            )}
            {tab === 'queries' && (
              <Suspense fallback={<Spinner />}><QueryAnalyzer queries={queries} onChange={loadAll} /></Suspense>
            )}
            {tab === 'improvements' && <ImprovementsView improvements={improvements} onChange={loadAll} />}
            {tab === 'guide' && <DiagnosticGuide onSeed={loadAll} />}
          </div>
        )}
      </main>

      <footer className="border-t border-ink-800 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center text-xs text-ink-600">
          لوحة تتبّع الأداء · البيانات محفوظة في Supabase · لمساعدتك أنت أو مطوّرك في التشخيص
        </div>
      </footer>
    </div>
  );
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default App;
