'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import type { LeadListResponse, LeadStatus, Tag } from '@/lib/admin-types';
import { fmtDate, whatsappUrl, PRIORITY_COLORS } from '@/lib/admin-client';

const STATUS_LABEL = 'status';
const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

export default function AdminLeadsPage() {
  const [data, setData] = useState<LeadListResponse | null>(null);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [search, setSearch] = useState('');
  const [statusId, setStatusId] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [country, setCountry] = useState('');
  const [sourcePage, setSourcePage] = useState('');
  const [priority, setPriority] = useState('');
  const [tagId, setTagId] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [assignedOnly, setAssignedOnly] = useState(false);
  const [unassignedOnly, setUnassignedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');
  const [selected, setSelected] = useState<string[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [bulkAction, setBulkAction] = useState('');
  const [bulkStatusId, setBulkStatusId] = useState('');
  const [bulkAssigneeId, setBulkAssigneeId] = useState('');
  const [bulkTagId, setBulkTagId] = useState('');
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy,
      sortDir,
    });
    if (search) params.set('search', search);
    if (statusId) params.set('statusId', statusId);
    if (assigneeId) params.set('assigneeId', assigneeId);
    if (country) params.set('country', country);
    if (sourcePage) params.set('sourcePage', sourcePage);
    if (priority) params.set('priority', priority);
    if (tagId) params.set('tagId', tagId);
    if (dateFrom) params.set('dateFrom', dateFrom);
    if (dateTo) params.set('dateTo', dateTo);
    if (assignedOnly) params.set('assignedOnly', 'true');
    if (unassignedOnly) params.set('unassignedOnly', 'true');

    try {
      const res = await fetch(`/api/admin/leads?${params}`);
      if (!res.ok) throw new Error('Failed');
      const d = await res.json();
      setData(d);
      setError('');
    } catch {
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, search, statusId, assigneeId, country, sourcePage, priority, tagId, dateFrom, dateTo, assignedOnly, unassignedOnly, sortBy, sortDir]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    fetch('/api/admin/tags')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.tags && setTags(d.tags))
      .catch(() => {});
  }, []);

  const allSelected = useMemo(() => {
    return data?.leads.length ? data.leads.every((l) => selected.includes(l.id)) : false;
  }, [data, selected]);

  function toggleAll() {
    if (!data) return;
    setSelected(allSelected ? [] : data.leads.map((l) => l.id));
  }

  function toggleOne(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function runBulkAction() {
    if (!selected.length) return;
    setBusy(true);
    try {
      const payload: Record<string, unknown> = { leadIds: selected, action: bulkAction };
      if (bulkAction === 'status') payload.statusId = bulkStatusId;
      if (bulkAction === 'assign') payload.userId = bulkAssigneeId;
      if (bulkAction === 'tag') payload.tagIds = bulkTagId ? [bulkTagId] : [];
      const res = await fetch('/api/admin/leads/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const b = await res.json();
        setError(b.error || 'Bulk action failed');
      } else {
        setSelected([]);
        load();
      }
    } catch {
      setError('Bulk action failed');
    } finally {
      setBusy(false);
    }
  }

  function exportCsv(mode: 'all' | 'filtered' | 'selected') {
    const params = new URLSearchParams({ mode });
    if (mode === 'selected') params.set('ids', selected.join(','));
    if (mode === 'filtered') {
      if (search) params.set('search', search);
      if (statusId) params.set('statusId', statusId);
      if (assigneeId) params.set('assigneeId', assigneeId);
      if (dateFrom) params.set('dateFrom', dateFrom);
      if (dateTo) params.set('dateTo', dateTo);
    }
    window.open(`/api/admin/leads/export?${params}`, '_blank');
  }

  function toggleSort(field: string) {
    if (sortBy === field) {
      setSortDir(sortDir === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortDir('desc');
    }
  }

  const sortArrow = (field: string) => (sortBy === field ? (sortDir === 'desc' ? ' ↓' : ' ↑') : '');

  if (error && !data) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search name, phone, email..."
            className="flex-1 min-w-[220px] px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white outline-none focus:border-emerald-600"
          />
          <button
            onClick={() => load()}
            className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800"
          >
            Apply
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => exportCsv('filtered')}
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Export Filtered
            </button>
            <button
              onClick={() => exportCsv('all')}
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Export All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <select value={statusId} onChange={(e) => { setStatusId(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white">
            <option value="">All Statuses</option>
            {data?.filters.statuses.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <select value={assigneeId} onChange={(e) => { setAssigneeId(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
            <option value="">All Assignees</option>
            {data?.filters.assignees.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
          <select value={country} onChange={(e) => { setCountry(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
            <option value="">All Countries</option>
            {data?.filters.countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select value={sourcePage} onChange={(e) => { setSourcePage(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
            <option value="">All Sources</option>
            {data?.filters.sourcePages.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select value={priority} onChange={(e) => { setPriority(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
            <option value="">All Priorities</option>
            {PRIORITY_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <select value={tagId} onChange={(e) => { setTagId(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
            <option value="">All Tags</option>
            {tags.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <input type="date" value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
          <input type="date" value={dateTo} onChange={(e) => { setDateTo(e.target.value); setPage(1); }} className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" />
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={assignedOnly} onChange={(e) => { setAssignedOnly(e.target.checked); setPage(1); }} />
            Assigned
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input type="checkbox" checked={unassignedOnly} onChange={(e) => { setUnassignedOnly(e.target.checked); setPage(1); }} />
            Unassigned
          </label>
        </div>

        {/* Bulk actions */}
        {selected.length > 0 && (
          <div className="flex flex-wrap items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 rounded-lg px-3 py-2">
            <span className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
              {selected.length} selected
            </span>
            <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)} className="px-2 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-800 bg-white dark:bg-slate-800 text-sm">
              <option value="">Bulk action...</option>
              <option value="status">Change status</option>
              <option value="assign">Assign to</option>
              <option value="tag">Add tag</option>
              <option value="delete">Delete</option>
            </select>
            {bulkAction === 'status' && (
              <select value={bulkStatusId} onChange={(e) => setBulkStatusId(e.target.value)} className="px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                <option value="">Select status</option>
                {data?.filters.statuses.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            )}
            {bulkAction === 'assign' && (
              <select value={bulkAssigneeId} onChange={(e) => setBulkAssigneeId(e.target.value)} className="px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                <option value="">Select assignee</option>
                {data?.filters.assignees.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            )}
            {bulkAction === 'tag' && (
              <select value={bulkTagId} onChange={(e) => setBulkTagId(e.target.value)} className="px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                <option value="">Select tag</option>
                {tags.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            )}
            {bulkAction === 'export' && (
              <button onClick={() => exportCsv('selected')} className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-sm">Export</button>
            )}
            <button
              onClick={runBulkAction}
              disabled={busy || !bulkAction || (bulkAction === 'status' && !bulkStatusId) || (bulkAction === 'assign' && !bulkAssigneeId) || (bulkAction === 'tag' && !bulkTagId)}
              className="px-4 py-1.5 rounded-lg bg-emerald-700 text-white text-sm font-medium hover:bg-emerald-800 disabled:opacity-50"
            >
              {busy ? 'Working...' : 'Apply'}
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <th className="px-4 py-3">
                  <input type="checkbox" checked={allSelected} onChange={toggleAll} className="accent-emerald-700" />
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort('leadNo')}>
                  Lead ID{sortArrow('leadNo')}
                </th>
                <th className="px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort('name')}>
                  Name{sortArrow('name')}
                </th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Country</th>
                <th className="px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort('status')}>
                  Status{sortArrow('status')}
                </th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort('assignedTo')}>
                  Assigned{sortArrow('assignedTo')}
                </th>
                <th className="px-4 py-3 font-medium">Tags</th>
                <th className="px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort('createdAt')}>
                  Created{sortArrow('createdAt')}
                </th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading && (
                <tr><td colSpan={11} className="px-4 py-8 text-center text-slate-500">Loading...</td></tr>
              )}
              {!loading && data?.leads.length === 0 && (
                <tr><td colSpan={11} className="px-4 py-8 text-center text-slate-500">No leads found</td></tr>
              )}
              {data?.leads.map((lead) => {
                const nextFollowup = lead.followups?.[0];
                return (
                  <tr key={lead.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 ${selected.includes(lead.id) ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : ''}`}>
                    <td className="px-4 py-3">
                      <input type="checkbox" checked={selected.includes(lead.id)} onChange={() => toggleOne(lead.id)} className="accent-emerald-700" />
                    </td>
                    <td className="px-4 py-3 text-slate-500 font-mono">#{lead.leadNo}</td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="font-medium text-emerald-700 dark:text-emerald-400 hover:underline">
                        {lead.name}
                      </Link>
                      {nextFollowup && (
                        <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-0.5">
                          Follow-up {fmtDate(nextFollowup.dueAt)}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{lead.phone}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{lead.country ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                        style={{ backgroundColor: `${lead.status?.color ?? '#64748b'}1a`, color: lead.status?.color ?? '#64748b' }}
                      >
                        {lead.status?.name ?? '—'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-medium text-white" style={{ backgroundColor: PRIORITY_COLORS[lead.priority] ?? '#94a3b8' }}>
                        {lead.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{lead.assignedTo?.name ?? '—'}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {lead.tags?.map((t) => (
                          <span key={t.tag.id} className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ backgroundColor: `${t.tag.color}1a`, color: t.tag.color }}>
                            {t.tag.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{fmtDate(lead.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/leads/${lead.id}`} title="View" className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        </Link>
                        <a href={whatsappUrl(lead.phone)} target="_blank" rel="noreferrer" title="WhatsApp" className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.83 14.12c-.25.7-1.45 1.33-2.02 1.42-.52.08-1.17.11-1.89-.12-.44-.14-1-.32-1.71-.63-3.01-1.3-4.98-4.32-5.13-4.52-.15-.2-1.22-1.63-1.22-3.11 0-1.48.78-2.21 1.05-2.51.28-.3.6-.38.8-.38.2 0 .4 0 .57.01.19.01.43-.07.67.51.25.6.85 2.07.92 2.22.07.15.12.33.03.53-.1.2-.14.32-.28.5-.14.17-.3.39-.42.52-.14.14-.29.3-.13.58.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.28 2.3 1.42.28.14.45.12.62-.07.17-.2.71-.83.9-1.12.19-.28.38-.23.64-.14.26.09 1.66.79 1.95.93.28.14.47.21.54.33.07.11.07.65-.18 1.35z" /></svg>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>{data.total.toLocaleString()} leads</span>
              <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="px-2 py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n} / page</option>)}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(1)} disabled={page === 1} className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm disabled:opacity-40">First</button>
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm disabled:opacity-40">Prev</button>
              <span className="px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300">Page {page} of {data.totalPages}</span>
              <button onClick={() => setPage(Math.min(data.totalPages, page + 1))} disabled={page === data.totalPages} className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm disabled:opacity-40">Next</button>
              <button onClick={() => setPage(data.totalPages)} disabled={page === data.totalPages} className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-sm disabled:opacity-40">Last</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}