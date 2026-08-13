'use client';

import { useCallback, useEffect, useState } from 'react';
import type { LeadStatus } from '@/lib/admin-types';
import { apiFetch } from '@/lib/admin-client';

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#14b8a6', '#8b5cf6', '#22c55e', '#ef4444', '#64748b', '#059669', '#475569', '#ec4899', '#f43f5e'];

export default function AdminStatusesPage() {
  const [statuses, setStatuses] = useState<LeadStatus[]>([]);
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const d = await apiFetch<{ statuses: LeadStatus[] }>('/api/admin/statuses');
      setStatuses(d.statuses);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function addStatus() {
    if (!name.trim()) return;
    setBusy(true);
    try {
      await apiFetch('/api/admin/statuses', { method: 'POST', body: JSON.stringify({ name, color }) });
      setName('');
      setError('');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  async function updateStatus(id: string, data: Record<string, unknown>) {
    setBusy(true);
    try {
      await apiFetch(`/api/admin/statuses/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
      setError('');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  async function deleteStatus(id: string) {
    if (!confirm('Delete this status? Leads with it will be moved to the default status.')) return;
    setBusy(true);
    try {
      await apiFetch(`/api/admin/statuses/${id}`, { method: 'DELETE' });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  async function setDefault(id: string) {
    setBusy(true);
    try {
      await apiFetch(`/api/admin/statuses/${id}`, { method: 'PUT', body: JSON.stringify({ isDefault: true }) });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  function move(id: string, dir: number) {
    const idx = statuses.findIndex((s) => s.id === id);
    const target = idx + dir;
    if (target < 0 || target >= statuses.length) return;
    const arr = [...statuses];
    const [item] = arr.splice(idx, 1);
    arr.splice(target, 0, item);
    setStatuses(arr);
    void apiFetch(`/api/admin/statuses/${id}`, { method: 'PATCH', body: JSON.stringify({ sortOrder: target + 1 }) });
    void apiFetch(`/api/admin/statuses/${arr[target].id}`, { method: 'PATCH', body: JSON.stringify({ sortOrder: idx + 1 }) });
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Add New Status</h2>
        <div className="flex flex-wrap gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Status name"
            className="flex-1 min-w-[180px] px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
          />
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
          <button onClick={addStatus} disabled={busy || !name.trim()} className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium disabled:opacity-50">Add</button>
        </div>
        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Lead Statuses</h2>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {statuses.map((s, i) => (
            <div key={s.id} className="flex items-center gap-3 px-5 py-3">
              <span className="text-xs text-slate-400 w-6">{i + 1}</span>
              <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <input
                defaultValue={s.name}
                onBlur={(e) => e.target.value !== s.name && updateStatus(s.id, { name: e.target.value })}
                className="flex-1 px-2 py-1 rounded border border-transparent hover:border-slate-300 focus:border-emerald-600 bg-transparent text-sm text-slate-800 dark:text-slate-200 outline-none"
              />
              <input
                type="color"
                defaultValue={s.color}
                onChange={(e) => updateStatus(s.id, { color: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
              />
              {s.isDefault && <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">Default</span>}
              {s.isSystem && <span className="text-[10px] text-slate-400">System</span>}
              <span className="text-xs text-slate-500">{s._count?.leads ?? 0} leads</span>
              <div className="flex gap-1">
                <button onClick={() => move(s.id, -1)} disabled={i === 0} className="p-1.5 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30" title="Move up">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                </button>
                <button onClick={() => move(s.id, 1)} disabled={i === statuses.length - 1} className="p-1.5 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30" title="Move down">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {!s.isDefault && (
                  <button onClick={() => setDefault(s.id)} disabled={busy} className="px-2 py-1 rounded text-xs text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30" title="Set as default">
                    Default
                  </button>
                )}
                {!s.isSystem && (
                  <button onClick={() => deleteStatus(s.id)} disabled={busy} className="p-1.5 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30" title="Delete">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}