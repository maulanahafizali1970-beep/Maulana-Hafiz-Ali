'use client';

import { useCallback, useEffect, useState } from 'react';
import { apiFetch } from '@/lib/admin-client';

interface TagRow {
  id: string;
  name: string;
  color: string;
  _count?: { leads: number };
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#14b8a6', '#ef4444', '#64748b', '#22c55e', '#f43f5e'];

export default function AdminTagsPage() {
  const [tags, setTags] = useState<TagRow[]>([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const d = await apiFetch<{ tags: TagRow[] }>('/api/admin/tags');
      setTags(d.tags);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function addTag() {
    if (!name.trim()) return;
    setBusy(true);
    try {
      await apiFetch('/api/admin/tags', { method: 'POST', body: JSON.stringify({ name, color }) });
      setName('');
      setError('');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  async function updateTag(id: string, data: Record<string, unknown>) {
    setBusy(true);
    try {
      await apiFetch(`/api/admin/tags/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
      setError('');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  async function deleteTag(id: string) {
    if (!confirm('Delete this tag? It will be removed from all leads.')) return;
    setBusy(true);
    try {
      await apiFetch(`/api/admin/tags/${id}`, { method: 'DELETE' });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Add New Tag</h2>
        <div className="flex flex-wrap gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tag name" className="flex-1 min-w-[180px] px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
          <div className="flex items-center gap-1.5">
            {COLORS.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-7 h-7 rounded-full transition-transform ${color === c ? 'ring-2 ring-offset-2 ring-slate-400 dark:ring-offset-slate-900 scale-110' : ''}`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <button onClick={addTag} disabled={busy || !name.trim()} className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium disabled:opacity-50">Add</button>
        </div>
        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Tags ({tags.length})</h2>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {tags.map((t) => (
            <div key={t.id} className="flex items-center gap-3 px-5 py-3">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
              <input
                defaultValue={t.name}
                onBlur={(e) => e.target.value !== t.name && updateTag(t.id, { name: e.target.value })}
                className="flex-1 px-2 py-1 rounded border border-transparent hover:border-slate-300 focus:border-emerald-600 bg-transparent text-sm text-slate-800 dark:text-slate-200 outline-none"
              />
              <input
                type="color"
                defaultValue={t.color}
                onChange={(e) => updateTag(t.id, { color: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="text-xs text-slate-500">{t._count?.leads ?? 0} leads</span>
              <button onClick={() => deleteTag(t.id)} className="p-1.5 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}