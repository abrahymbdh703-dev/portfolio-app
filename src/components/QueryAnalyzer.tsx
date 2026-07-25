import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { DbQuery } from '@/lib/types';
import { Upload, Trash2, Database, Code2, ChevronDown } from 'lucide-react';

interface QueryAnalyzerProps {
  queries: DbQuery[];
  onChange: () => void;
}

interface ParsedQuery {
  sql: string;
  duration_ms: number;
  caller?: string;
  stack?: string;
  query_type?: string;
  rows_affected?: number;
}

export default function QueryAnalyzer({ queries, onChange }: QueryAnalyzerProps) {
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const sorted = [...queries].sort((a, b) => b.duration_ms - a.duration_ms);
  const slowThreshold = 50;
  const slowCount = sorted.filter((q) => q.duration_ms >= slowThreshold).length;
  const totalTime = sorted.reduce((s, q) => s + q.duration_ms, 0);
  const avgTime = sorted.length ? totalTime / sorted.length : 0;

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setParsing(true);
    setError(null);
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const parsed = extractQueries(json);
      if (parsed.length === 0) {
        setError('لم يتم العثور على استعلامات في الملف. تأكد أنه ملف Query Monitor صحيح.');
        setParsing(false);
        return;
      }
      const { error: insErr } = await supabase.from('db_queries').insert(
        parsed.map((q) => ({
          sql: q.sql,
          duration_ms: q.duration_ms,
          caller: q.caller ?? null,
          stack: q.stack ?? null,
          query_type: q.query_type ?? null,
          rows_affected: q.rows_affected ?? null,
          is_slow: q.duration_ms >= slowThreshold,
        })),
      );
      if (insErr) throw new Error(insErr.message);
      onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'فشل تحليل الملف');
    }
    setParsing(false);
    e.target.value = '';
  };

  const handleDelete = async (id: string) => {
    const { error: err } = await supabase.from('db_queries').delete().eq('id', id);
    if (!err) onChange();
  };

  const handleClearAll = async () => {
    if (!confirm('حذف جميع الاستعلامات؟')) return;
    const { error: err } = await supabase.from('db_queries').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (!err) onChange();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-black text-2xl text-ink-50">تحليل استعلامات قاعدة البيانات</h2>
          <p className="text-sm text-ink-400 mt-1">ارفع ملف JSON من Query Monitor لتحليل الاستعلامات البطيئة</p>
        </div>
        <label className="btn-primary cursor-pointer">
          <Upload className="w-4 h-4" />
          {parsing ? 'جاري التحليل...' : 'رفع ملف Query Monitor'}
          <input type="file" accept=".json,application/json" onChange={handleFile} className="hidden" disabled={parsing} />
        </label>
      </div>

      {error && <div className="card p-4 bg-error-500/10 border-error-500/30 text-error-400 text-sm">{error}</div>}

      <div className="grid grid-cols-3 gap-3">
        <StatBox icon={Database} label="إجمالي الاستعلامات" value={sorted.length} color="text-sky-400" />
        <StatBox icon={Code2} label="استعلامات بطيئة (50ms+)" value={slowCount} color="text-error-400" />
        <StatBox icon={Code2} label="متوسط الوقت" value={`${avgTime.toFixed(1)}ms`} color="text-warning-400" />
      </div>

      {sorted.length > 0 && (
        <div className="flex justify-end">
          <button onClick={handleClearAll} className="btn-danger">
            <Trash2 className="w-3.5 h-3.5" /> حذف الكل
          </button>
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="card p-12 text-center">
          <Database className="w-12 h-12 mx-auto text-ink-600 mb-4" />
          <p className="text-ink-400 text-sm">لا توجد استعلامات مسجلة. ارفع ملف Query Monitor لبدء التحليل.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.slice(0, 100).map((q) => (
            <div key={q.id} className="card overflow-hidden">
              <div
                className="flex items-center gap-3 p-3 cursor-pointer hover:bg-ink-800/40 transition-colors"
                onClick={() => setExpanded(expanded === q.id ? null : q.id)}
              >
                <span className={`badge shrink-0 ${q.duration_ms >= 100 ? 'bg-error-500/10 text-error-400' : q.duration_ms >= 50 ? 'bg-warning-500/10 text-warning-400' : 'bg-success-500/10 text-success-400'}`}>
                  {q.duration_ms.toFixed(1)}ms
                </span>
                <code className="text-xs text-ink-300 truncate flex-1 font-mono" dir="ltr">{q.sql.slice(0, 120)}</code>
                {q.caller && <span className="text-[10px] text-ink-500 shrink-0 hidden sm:block">{q.caller}</span>}
                <ChevronDown className={`w-4 h-4 text-ink-500 transition-transform shrink-0 ${expanded === q.id ? 'rotate-180' : ''}`} />
                <button onClick={(e) => { e.stopPropagation(); handleDelete(q.id); }} className="btn-danger shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {expanded === q.id && (
                <div className="p-3 border-t border-ink-800 space-y-2 animate-fade-in">
                  <pre className="text-xs text-ink-300 font-mono whitespace-pre-wrap break-words bg-ink-950/60 p-3 rounded-lg" dir="ltr">{q.sql}</pre>
                  {q.stack && (
                    <div>
                      <div className="text-[10px] text-ink-500 font-bold mb-1">Stack Trace</div>
                      <pre className="text-[10px] text-ink-400 font-mono whitespace-pre-wrap break-words bg-ink-950/60 p-2 rounded-lg" dir="ltr">{q.stack}</pre>
                    </div>
                  )}
                  {q.caller && <div className="text-xs text-ink-400">المُستدعي: <span className="text-ink-200 font-mono" dir="ltr">{q.caller}</span></div>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatBox({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: number | string; color: string }) {
  return (
    <div className="card p-4">
      <Icon className={`w-5 h-5 mb-2 ${color}`} />
      <div className="font-display font-black text-xl text-ink-50">{value}</div>
      <div className="text-[10px] text-ink-400 font-semibold mt-0.5">{label}</div>
    </div>
  );
}

function extractQueries(json: unknown): ParsedQuery[] {
  const out: ParsedQuery[] = [];
  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return;
    const obj = node as Record<string, unknown>;
    if (typeof obj['sql'] === 'string' && typeof obj['ltime'] === 'string') {
      out.push({
        sql: obj['sql'] as string,
        duration_ms: parseFloat(obj['ltime'] as string) * 1000,
        caller: (obj['trace'] as { caller?: string })?.caller ?? (obj['caller'] as string | undefined),
        stack: obj['stack'] as string | undefined,
        query_type: obj['type'] as string | undefined,
        rows_affected: typeof obj['rows'] === 'number' ? (obj['rows'] as number) : undefined,
      });
    }
    for (const v of Object.values(obj)) {
      if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === 'object') walk(v);
    }
  };
  walk(json);
  return out.filter((q) => q.sql && q.duration_ms > 0);
}
