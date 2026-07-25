import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Report, PageType, Device, Tool } from '@/lib/types';
import { PAGE_TYPE_LABELS, DEVICE_LABELS, TOOL_LABELS } from '@/lib/types';
import { TARGETS } from '@/lib/types';
import { statusForTtfb, statusForLcp, statusForFullyLoaded, statusForScore, formatMs, formatDate, STATUS_COLORS } from '@/lib/metrics';
import { Trash2, Plus, X } from 'lucide-react';

interface ReportsViewProps {
  reports: Report[];
  onChange: () => void;
}

export default function ReportsView({ reports, onChange }: ReportsViewProps) {
  const [showForm, setShowForm] = useState(false);
  const sorted = [...reports].sort((a, b) => new Date(b.tested_at).getTime() - new Date(a.tested_at).getTime());

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا التقرير؟ سيتم حذف جميع الاستعلامات المرتبطة به.')) return;
    const { error } = await supabase.from('reports').delete().eq('id', id);
    if (!error) onChange();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-black text-2xl text-ink-50">التقارير</h2>
          <p className="text-sm text-ink-400 mt-1">{sorted.length} تقرير مسجل</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> إضافة تقرير
        </button>
      </div>

      {showForm && <ReportForm onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); onChange(); }} />}

      {sorted.length === 0 ? (
        <div className="card p-12 text-center text-ink-500">لا توجد تقارير بعد. ابدأ بإضافة تقرير.</div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-800 text-ink-400 text-xs">
                  <th className="text-right p-3 font-bold">التاريخ</th>
                  <th className="text-right p-3 font-bold">الصفحة</th>
                  <th className="text-right p-3 font-bold">الجهاز</th>
                  <th className="text-right p-3 font-bold">الأداة</th>
                  <th className="text-right p-3 font-bold">TTFB</th>
                  <th className="text-right p-3 font-bold">LCP</th>
                  <th className="text-right p-3 font-bold">Loaded</th>
                  <th className="text-right p-3 font-bold">Score</th>
                  <th className="p-3"></th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((r) => {
                  const ttfbS = statusForTtfb(r.ttfb_ms);
                  const lcpS = statusForLcp(r.lcp_ms);
                  const flS = statusForFullyLoaded(r.fully_loaded_ms);
                  const scS = statusForScore(r.performance_score, TARGETS.performance_score);
                  return (
                    <tr key={r.id} className="border-b border-ink-800/50 hover:bg-ink-800/30 transition-colors">
                      <td className="p-3 text-ink-300 text-xs whitespace-nowrap">{formatDate(r.tested_at)}</td>
                      <td className="p-3">
                        <div className="font-bold text-ink-200">{PAGE_TYPE_LABELS[r.page_type]}</div>
                        <div className="text-[10px] text-ink-500 truncate max-w-[160px]">{r.page_url}</div>
                      </td>
                      <td className="p-3 text-ink-400 text-xs">{DEVICE_LABELS[r.device]}</td>
                      <td className="p-3 text-ink-400 text-xs">{TOOL_LABELS[r.tool]}</td>
                      <td className="p-3"><Pill status={ttfbS} text={formatMs(r.ttfb_ms)} /></td>
                      <td className="p-3"><Pill status={lcpS} text={formatMs(r.lcp_ms)} /></td>
                      <td className="p-3"><Pill status={flS} text={formatMs(r.fully_loaded_ms)} /></td>
                      <td className="p-3"><Pill status={scS} text={r.performance_score != null ? `${r.performance_score}` : '—'} /></td>
                      <td className="p-3">
                        <button onClick={() => handleDelete(r.id)} className="btn-danger" aria-label="حذف">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function Pill({ status, text }: { status: keyof typeof STATUS_COLORS; text: string }) {
  const c = STATUS_COLORS[status];
  return <span className={`badge ${c.bg} ${c.text}`}>{text}</span>;
}

function ReportForm({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    page_url: 'https://outlet90.com',
    page_type: 'home' as PageType,
    tool: 'gtmetrix' as Tool,
    device: 'desktop' as Device,
    tested_at: new Date().toISOString().slice(0, 16),
    ttfb_ms: '',
    lcp_ms: '',
    fcp_ms: '',
    cls: '',
    tbt_ms: '',
    fully_loaded_ms: '',
    performance_score: '',
    structure_score: '',
    total_size_kb: '',
    requests: '',
    note: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const num = (v: string): number | null => (v === '' ? null : Number(v));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const { error: err } = await supabase.from('reports').insert({
      page_url: form.page_url,
      page_type: form.page_type,
      tool: form.tool,
      device: form.device,
      tested_at: new Date(form.tested_at).toISOString(),
      ttfb_ms: num(form.ttfb_ms),
      lcp_ms: num(form.lcp_ms),
      fcp_ms: num(form.fcp_ms),
      cls: num(form.cls),
      tbt_ms: num(form.tbt_ms),
      fully_loaded_ms: num(form.fully_loaded_ms),
      performance_score: num(form.performance_score),
      structure_score: num(form.structure_score),
      total_size_kb: num(form.total_size_kb),
      requests: num(form.requests),
      note: form.note || null,
    });
    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="card w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto no-scrollbar animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-ink-50">إضافة تقرير أداء</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-error-400"><X className="w-5 h-5" /></button>
        </div>
        {error && <div className="mb-4 p-3 rounded-lg bg-error-500/10 text-error-400 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="label">رابط الصفحة</label>
            <input className="input" value={form.page_url} onChange={(e) => setForm({ ...form, page_url: e.target.value })} required />
          </div>
          <div>
            <label className="label">نوع الصفحة</label>
            <select className="select" value={form.page_type} onChange={(e) => setForm({ ...form, page_type: e.target.value as PageType })}>
              {(Object.entries(PAGE_TYPE_LABELS) as [PageType, string][]).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="label">الأداة</label>
            <select className="select" value={form.tool} onChange={(e) => setForm({ ...form, tool: e.target.value as Tool })}>
              {(Object.entries(TOOL_LABELS) as [Tool, string][]).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="label">الجهاز</label>
            <select className="select" value={form.device} onChange={(e) => setForm({ ...form, device: e.target.value as Device })}>
              {(Object.entries(DEVICE_LABELS) as [Device, string][]).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="label">تاريخ الاختبار</label>
            <input type="datetime-local" className="input" value={form.tested_at} onChange={(e) => setForm({ ...form, tested_at: e.target.value })} />
          </div>
          {[
            ['ttfb_ms', 'TTFB (ms)'], ['lcp_ms', 'LCP (ms)'], ['fcp_ms', 'FCP (ms)'],
            ['fully_loaded_ms', 'Fully Loaded (ms)'], ['tbt_ms', 'TBT (ms)'], ['cls', 'CLS'],
            ['performance_score', 'Performance Score'], ['structure_score', 'Structure Score'],
            ['total_size_kb', 'الحجم (KB)'], ['requests', 'عدد الطلبات'],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input
                type="number"
                step="any"
                className="input"
                value={(form as Record<string, string>)[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
            </div>
          ))}
          <div className="col-span-2">
            <label className="label">ملاحظة</label>
            <input className="input" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </div>
          <div className="col-span-2 flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1">{saving ? 'جاري الحفظ...' : 'حفظ التقرير'}</button>
            <button type="button" onClick={onClose} className="btn-ghost">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
}
