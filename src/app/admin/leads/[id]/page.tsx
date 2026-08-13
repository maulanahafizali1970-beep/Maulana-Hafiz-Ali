'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { Lead, LeadStatus, Tag } from '@/lib/admin-types';
import { fmtDate, whatsappUrl, imoUrl, telUrl, mailUrl, PRIORITY_COLORS, apiFetch } from '@/lib/admin-client';

export default function LeadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [statuses, setStatuses] = useState<LeadStatus[]>([]);
  const [users, setUsers] = useState<{ id: string; name: string; role: string }[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [note, setNote] = useState('');
  const [noteKind, setNoteKind] = useState('note');
  const [dueAt, setDueAt] = useState('');
  const [followupNote, setFollowupNote] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const [leadRes, statusRes, userRes, tagRes] = await Promise.all([
        apiFetch<{ lead: Lead }>(`/api/admin/leads/${id}`),
        apiFetch<{ statuses: LeadStatus[] }>('/api/admin/statuses'),
        apiFetch<{ users: { id: string; name: string; role: string }[] }>('/api/admin/users'),
        apiFetch<{ tags: Tag[] }>('/api/admin/tags'),
      ]);
      setLead(leadRes.lead);
      setStatuses(statusRes.statuses);
      setUsers(userRes.users);
      setTags(tagRes.tags);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load lead');
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function changeStatus(statusId: string) {
    setBusy(true);
    try {
      await apiFetch(`/api/admin/leads/${id}/status`, { method: 'POST', body: JSON.stringify({ statusId }) });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  async function assign(userId: string) {
    setBusy(true);
    try {
      await apiFetch(`/api/admin/leads/${id}/assign`, { method: 'POST', body: JSON.stringify({ userId }) });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  async function addNote() {
    if (!note.trim()) return;
    setBusy(true);
    try {
      await apiFetch(`/api/admin/leads/${id}/notes`, { method: 'POST', body: JSON.stringify({ content: note, kind: noteKind }) });
      setNote('');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  async function addFollowup() {
    if (!dueAt) return;
    setBusy(true);
    try {
      await apiFetch(`/api/admin/leads/${id}/followups`, { method: 'POST', body: JSON.stringify({ dueAt, note: followupNote }) });
      setDueAt('');
      setFollowupNote('');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  async function updateTags(tagId: string) {
    const current = lead?.tags?.map((t) => t.tag.id) ?? [];
    const next = current.includes(tagId) ? current.filter((x) => x !== tagId) : [...current, tagId];
    setBusy(true);
    try {
      await apiFetch(`/api/admin/leads/${id}/tags`, { method: 'PUT', body: JSON.stringify({ tagIds: next }) });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setBusy(false);
    }
  }

  async function deleteLead() {
    if (!confirm('Move this lead to trash?')) return;
    setBusy(true);
    try {
      await apiFetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      router.push('/admin/leads');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
      setBusy(false);
    }
  }

  if (error && !lead) return <p className="text-red-600">{error}</p>;
  if (!lead) return <p className="text-slate-500">Loading...</p>;

  const customFields = lead.customFields as Record<string, unknown> | null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/admin/leads')} className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <div>
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">{lead.name}</h1>
            <p className="text-sm text-slate-500">Lead #{lead.leadNo} • Created {fmtDate(lead.createdAt)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <a href={telUrl(lead.phone)} className="px-3 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-700">Call</a>
          <a href={whatsappUrl(lead.phone)} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">WhatsApp</a>
          <a href={imoUrl(lead.phone)} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-lg bg-cyan-700 text-white text-sm font-medium hover:bg-cyan-800">Imo</a>
          <a href={mailUrl(lead.email)} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">Email</a>
          <button onClick={deleteLead} className="px-3 py-2 rounded-lg border border-red-300 dark:border-red-900 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30">Delete</button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/30 rounded-lg px-3 py-2">{error}</p>}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead info */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Lead Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div><p className="text-xs text-slate-500">Name</p><p className="text-slate-800 dark:text-slate-200 font-medium">{lead.name}</p></div>
              <div><p className="text-xs text-slate-500">Phone</p><p className="text-slate-800 dark:text-slate-200 font-medium">{lead.phone}</p></div>
              <div><p className="text-xs text-slate-500">Email</p><p className="text-slate-800 dark:text-slate-200">{lead.email ?? '—'}</p></div>
              <div><p className="text-xs text-slate-500">Country</p><p className="text-slate-800 dark:text-slate-200">{lead.country ?? '—'}</p></div>
              <div><p className="text-xs text-slate-500">City</p><p className="text-slate-800 dark:text-slate-200">{lead.city ?? '—'}</p></div>
              <div><p className="text-xs text-slate-500">Priority</p>
                <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-medium text-white" style={{ backgroundColor: PRIORITY_COLORS[lead.priority] }}>{lead.priority}</span>
              </div>
              <div><p className="text-xs text-slate-500">Source Page</p><p className="text-slate-800 dark:text-slate-200 truncate">{lead.sourcePage ?? '—'}</p></div>
              <div><p className="text-xs text-slate-500">Form</p><p className="text-slate-800 dark:text-slate-200">{lead.formName ?? '—'}</p></div>
              <div><p className="text-xs text-slate-500">IP / Device</p><p className="text-slate-800 dark:text-slate-200">{lead.ipAddress ?? '—'} {lead.deviceInfo ? `(${lead.deviceInfo}, ${lead.browserInfo})` : ''}</p></div>
            </div>
            {lead.message && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs text-slate-500 mb-1">Message / Problem</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{lead.message}</p>
              </div>
            )}
            {customFields && Object.keys(customFields).length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3">
                {Object.entries(customFields).map(([k, v]) => (
                  <div key={k}><p className="text-xs text-slate-500 capitalize">{k.replace(/_/g, ' ')}</p><p className="text-sm text-slate-700 dark:text-slate-300">{String(v)}</p></div>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Notes & Call Notes</h2>
            <div className="flex gap-2 mb-3">
              <select value={noteKind} onChange={(e) => setNoteKind(e.target.value)} className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                <option value="note">Note</option>
                <option value="call_note">Call Note</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
              </select>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
              <button onClick={addNote} disabled={busy || !note.trim()} className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium disabled:opacity-50">Add</button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {lead.notes?.length === 0 && <p className="text-sm text-slate-500">No notes yet</p>}
              {lead.notes?.map((n) => (
                <div key={n.id} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300 shrink-0">
                    {n.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{n.user.name}</span>
                      <span className="text-[11px] text-slate-400">{fmtDate(n.createdAt)}</span>
                      <span className="text-[10px] uppercase text-slate-400">{n.kind.replace('_', ' ')}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5 whitespace-pre-wrap">{n.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity timeline */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Activity Timeline</h2>
            <div className="space-y-0">
              {[...(lead.histories ?? []), ...(lead.activityLogs ?? [])]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 30)
                .map((item, i) => {
                  const isHistory = 'fromStatus' in item;
                  const label = isHistory
                    ? `Status: ${(item as { fromStatus: LeadStatus | null }).fromStatus?.name ?? 'None'} → ${(item as { toStatus: LeadStatus | null }).toStatus?.name ?? 'None'}`
                    : `${(item as { action: string }).action.replace(/_/g, ' ')}${(item as { details: string | null }).details ? ` — ${(item as { details: string | null }).details}` : ''}`;
                  return (
                    <div key={i} className="flex gap-3 py-2">
                      <div className="relative flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 mt-1.5" />
                        {i < 29 && <div className="w-px flex-1 bg-slate-200 dark:bg-slate-700" />}
                      </div>
                      <div className="flex-1 pb-3">
                        <p className="text-sm text-slate-700 dark:text-slate-300">{label}</p>
                        <p className="text-[11px] text-slate-400">
                          {fmtDate(item.createdAt)}
                          {'changedBy' in item && (item as { changedBy: { name: string } | null }).changedBy && ` • by ${(item as { changedBy: { name: string } }).changedBy.name}`}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Status</h2>
            <div className="flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s.id}
                  onClick={() => changeStatus(s.id)}
                  disabled={busy}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    lead.statusId === s.id ? 'text-white border-transparent' : 'bg-transparent hover:opacity-80'
                  }`}
                  style={lead.statusId === s.id ? { backgroundColor: s.color } : { color: s.color, borderColor: `${s.color}55` }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Assignment */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Assigned To</h2>
            <div className="flex gap-2">
              <select value={lead.assignedToId ?? ''} onChange={(e) => e.target.value && assign(e.target.value)} className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                <option value="">Unassigned</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role.toLowerCase()})</option>
                ))}
              </select>
            </div>
            {lead.assignments && lead.assignments.length > 0 && (
              <div className="mt-3 space-y-2">
                {lead.assignments.slice(0, 5).map((a) => (
                  <div key={a.id} className="text-xs text-slate-500">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{a.user.name}</span> • {fmtDate(a.createdAt)}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => {
                const active = lead.tags?.some((lt) => lt.tag.id === t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => updateTags(t.id)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                      active ? 'text-white border-transparent' : 'bg-transparent'
                    }`}
                    style={active ? { backgroundColor: t.color } : { color: t.color, borderColor: `${t.color}55` }}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Follow-ups */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Follow-ups</h2>
            <div className="space-y-2 mb-3">
              <input
                type="datetime-local"
                value={dueAt}
                onChange={(e) => setDueAt(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
              <input
                value={followupNote}
                onChange={(e) => setFollowupNote(e.target.value)}
                placeholder="Reminder note..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
              <button onClick={addFollowup} disabled={busy || !dueAt} className="w-full px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium disabled:opacity-50">Schedule</button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {lead.followups?.length === 0 && <p className="text-sm text-slate-500">No follow-ups</p>}
              {lead.followups?.map((f) => {
                const overdue = !f.completed && new Date(f.dueAt) < new Date();
                return (
                  <div key={f.id} className={`text-sm rounded-lg border px-3 py-2 ${overdue ? 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20' : 'border-slate-200 dark:border-slate-800'}`}>
                    <p className={`font-medium ${overdue ? 'text-red-700 dark:text-red-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {fmtDate(f.dueAt)} {overdue && '• Overdue'}
                    </p>
                    {f.note && <p className="text-xs text-slate-500 mt-0.5">{f.note}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}