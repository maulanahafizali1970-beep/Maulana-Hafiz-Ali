'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { apiFetch, fmtDate } from '@/lib/admin-client';

interface TrashedLead {
  id: string;
  leadNo: string;
  name: string;
  phone: string;
  email: string | null;
  country: string | null;
  deletedAt: string;
}

export default function AdminTrashPage() {
  const [leads, setLeads] = useState<TrashedLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await apiFetch<{ leads: TrashedLead[] }>('/api/admin/leads?trashed=true');
      setLeads(d.leads);
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load trash');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function restore(id: string) {
    setBusy(true);
    try {
      await apiFetch(`/api/admin/leads/${id}/restore`, { method: 'POST' });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  async function restoreAll() {
    if (!confirm('Restore all trashed leads?')) return;
    setBusy(true);
    try {
      await apiFetch('/api/admin/leads/bulk', { method: 'POST', body: JSON.stringify({ leadIds: leads.map((l) => l.id), action: 'restore' }) });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Trash ({leads.length})</h2>
          <p className="text-xs text-slate-500 mt-0.5">Soft-deleted leads. Restore them to bring them back.</p>
        </div>
        {leads.length > 0 && (
          <button onClick={restoreAll} disabled={busy} className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium disabled:opacity-50">
            Restore All
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/30 rounded-lg px-3 py-2">{error}</p>}

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {loading && <p className="px-5 py-8 text-center text-sm text-slate-500">Loading...</p>}
        {!loading && leads.length === 0 && <p className="px-5 py-8 text-center text-sm text-slate-500">Trash is empty</p>}
        {!loading && leads.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-500 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-5 py-3 font-medium">Lead</th>
                  <th className="px-5 py-3 font-medium">Contact</th>
                  <th className="px-5 py-3 font-medium">Country</th>
                  <th className="px-5 py-3 font-medium">Deleted At</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-5 py-3">
                      <Link href={`/admin/leads/${l.id}`} className="font-medium text-emerald-700 dark:text-emerald-400 hover:underline">{l.name}</Link>
                      <span className="text-xs text-slate-400 font-mono">#{l.leadNo}</span>
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                      {l.phone}
                      {l.email && <span className="text-xs text-slate-400 block">{l.email}</span>}
                    </td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{l.country ?? '—'}</td>
                    <td className="px-5 py-3 text-slate-500">{fmtDate(l.deletedAt)}</td>
                    <td className="px-5 py-3">
                      <button onClick={() => restore(l.id)} disabled={busy} className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-800 disabled:opacity-50">
                        Restore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}