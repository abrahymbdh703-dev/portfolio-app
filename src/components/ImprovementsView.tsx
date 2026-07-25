import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Improvement, ImprovementStatus, ImprovementPriority, ImprovementCategory } from '@/lib/types';
import {
  CATEGORY_LABELS, STATUS_LABELS, PRIORITY_LABELS,
} from '@/lib/types';
import { Plus, Trash2, X, GripVertical } from 'lucide-react';

interface ImprovementsViewProps {
  improvements: Improvement[];
  onChange: () => void;
}

const STATUS_COLORS: Record<ImprovementStatus, string> = {
  pending: 'bg-ink-700 text-ink-300',
  'in-progress': 'bg-warning-500/15 text-warning-400',
  done: 'bg-success-500/15 text-success-400',
  skipped: 'bg-ink-700 text-ink-500',
};

const PRIORITY_COLORS: Record<ImprovementPriority, string> = {
  critical: 'bg-error-500/15 text-error-400',
  high: 'bg-warning-500/15 text-warning-400',
  medium: 'bg-sky-500/15 text-sky-400',
  low: 'bg-ink-700 text-ink-400',
};

const CATEGORY_ICONS: Record<ImprovementCategory, string> = {
  database: '🗄️', cache: '⚡', php: '🐘', frontend: '🎨', images: '🖼️',
  plugins: '🧩', theme: '🎭', server: '🖥️', search: '🔍', tracking: '📊',
};

export default function ImprovementsView({ improvements, onChange }: ImprovementsViewProps) {
  const [showForm, setShowForm] = useState(false);

  const sorted = [...improvements].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.priority] - order[b.priority];
  });

  const handleStatusChange = async (id: string, status: ImprovementStatus) => {
    const { error } = await supabase
      .from('improvements')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (!error) onChange();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('حذف هذا التحسين؟')) return;
    const { error } = await supabase.from('improvements').delete().eq('id', id);
    if (!error) onChange();
  };

  const doneCount = improvements.filter((i) => i.status === 'done').length;
  const total = improvements.length;
  const progress = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-black text-2xl text-ink-50">خطة التحسينات</h2>
          <p className="text-sm text-ink-400 mt-1">{doneCount} من {total} مكتمل ({progress}%)</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus className="w-4 h-4" /> إضافة تحسين
        </button>
      </div>

      {total > 0 && (
        <div className="card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-ink-400">التقدم الإجمالي</span>
            <span className="text-sm font-bold text-sky-400">{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-ink-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sky-500 to-success-500 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {showForm && <ImprovementForm onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); onChange(); }} />}

      {sorted.length === 0 ? (
        <div className="card p-12 text-center">
          <GripVertical className="w-12 h-12 mx-auto text-ink-600 mb-4" />
          <p className="text-ink-400 text-sm">لا توجد تحسينات بعد. ابدأ ببناء خطة التحسين.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((imp) => (
            <div key={imp.id} className="card p-4 card-hover">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{CATEGORY_ICONS[imp.category]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className={`font-bold text-sm ${imp.status === 'done' ? 'text-ink-500 line-through' : 'text-ink-100'}`}>
                      {imp.title}
                    </h3>
                    <span className={`badge ${PRIORITY_COLORS[imp.priority]}`}>{PRIORITY_LABELS[imp.priority]}</span>
                    <span className="badge bg-ink-800 text-ink-400">{CATEGORY_LABELS[imp.category]}</span>
                  </div>
                  {imp.expected_impact && (
                    <p className="text-xs text-ink-400 mb-1">الأثر المتوقع: {imp.expected_impact}</p>
                  )}
                  {imp.note && <p className="text-xs text-ink-500">{imp.note}</p>}
                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    {(['pending', 'in-progress', 'done', 'skipped'] as ImprovementStatus[]).map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(imp.id, s)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          imp.status === s ? STATUS_COLORS[s] : 'bg-ink-800/50 text-ink-500 hover:bg-ink-800'
                        }`}
                      >
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => handleDelete(imp.id)} className="btn-danger shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ImprovementForm({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    title: '',
    category: 'database' as ImprovementCategory,
    priority: 'high' as ImprovementPriority,
    status: 'pending' as ImprovementStatus,
    expected_impact: '',
    note: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const { error: err } = await supabase.from('improvements').insert({
      title: form.title,
      category: form.category,
      priority: form.priority,
      status: form.status,
      expected_impact: form.expected_impact || null,
      note: form.note || null,
    });
    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-950/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="card w-full max-w-lg p-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-bold text-lg text-ink-50">إضافة تحسين</h3>
          <button onClick={onClose} className="text-ink-400 hover:text-error-400"><X className="w-5 h-5" /></button>
        </div>
        {error && <div className="mb-4 p-3 rounded-lg bg-error-500/10 text-error-400 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">عنوان التحسين</label>
            <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="مثال: تفعيل Redis Object Cache" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">التصنيف</label>
              <select className="select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ImprovementCategory })}>
                {(Object.entries(CATEGORY_LABELS) as [ImprovementCategory, string][]).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="label">الأولوية</label>
              <select className="select" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value as ImprovementPriority })}>
                {(Object.entries(PRIORITY_LABELS) as [ImprovementPriority, string][]).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label">الحالة</label>
            <select className="select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ImprovementStatus })}>
              {(Object.entries(STATUS_LABELS) as [ImprovementStatus, string][]).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div>
            <label className="label">الأثر المتوقع</label>
            <input className="input" value={form.expected_impact} onChange={(e) => setForm({ ...form, expected_impact: e.target.value })} placeholder="مثال: تقليل TTFB بـ 40%" />
          </div>
          <div>
            <label className="label">ملاحظات</label>
            <textarea className="input resize-none" rows={2} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1">{saving ? 'جاري الحفظ...' : 'إضافة'}</button>
            <button type="button" onClick={onClose} className="btn-ghost">إلغاء</button>
          </div>
        </form>
      </div>
    </div>
  );
}
