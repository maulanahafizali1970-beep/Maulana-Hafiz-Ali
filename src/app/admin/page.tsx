'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { DashboardData } from '@/lib/admin-types';
import { fmtDate } from '@/lib/admin-client';

function StatCard({ label, value, color, icon }: { label: string; value: number; color: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center gap-4">
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${color}`}>
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
          </svg>
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{value.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-0.5">{label}</p>
        </div>
      </div>
    </div>
  );
}

function BarChart({ data, color }: { data: { label: string; count: number }[]; color: string }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div className="flex items-end gap-2 h-48">
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1 group">
          <span className="text-[10px] text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">{d.count}</span>
          <div
            className="w-full rounded-t-md transition-all"
            style={{ height: `${Math.max(4, (d.count / max) * 140)}px`, backgroundColor: color }}
          />
          <span className="text-[10px] text-slate-500 truncate w-full text-center">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => setError('Failed to load dashboard'));
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!data) return <p className="text-slate-500">Loading dashboard...</p>;

  const s = data.summary;
  const dailyData = (data.dailyTrend as { day: string; count: number }[]).map((d) => ({
    label: new Date(d.day).toLocaleDateString(undefined, { day: '2-digit', month: 'short' }),
    count: d.count,
  }));
  const monthlyData = (data.monthlyTrend as { month: string; count: number }[]).map((d) => ({
    label: new Date(d.month).toLocaleDateString(undefined, { month: 'short' }),
    count: d.count,
  }));

  const statusColors: Record<string, string> = {
    'bg-amber-500': 'M13 10V3L4 14h7v7l9-11h-7z',
    'bg-blue-500': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    'bg-emerald-600': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    'bg-teal-500': 'M8 12h8m-4-4v8m-7 4h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    'bg-violet-500': 'M13 10V3L4 14h7v7l9-11h-7z',
    'bg-green-500': 'M9 12l2 2 4-4',
    'bg-red-500': 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    'bg-slate-500': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    'bg-emerald-700': 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    'bg-slate-600': 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  };

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard label="Total Leads" value={s.totalLeads} color="bg-slate-700" icon="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        <StatCard label="Today's Leads" value={s.todayLeads} color="bg-blue-600" icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <StatCard label="This Week" value={s.weekLeads} color="bg-indigo-600" icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        <StatCard label="This Month" value={s.monthLeads} color="bg-cyan-600" icon="M3 3h18M3 3v18h18V3M8 7v10m8-10v10" />
        <StatCard label="Pending" value={s.pendingLeads} color="bg-amber-500" icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        <StatCard label="Converted" value={s.convertedLeads} color="bg-emerald-600" icon="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        <StatCard label="Lost" value={s.lostLeads} color="bg-red-500" icon="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        <StatCard label="Due Follow-ups" value={s.dueFollowups} color="bg-violet-500" icon="M13 10V3L4 14h7v7l9-11h-7z" />
        <StatCard label="Overdue" value={s.overdueFollowups} color="bg-orange-600" icon="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <StatCard label="Called" value={data.statusBreakdown.find((x) => /called/i.test(x.name))?.count ?? 0} color="bg-teal-600" icon="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily trend */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Daily Lead Trend (30 days)</h2>
          <BarChart data={dailyData} color="#0B5D3B" />
        </div>
        {/* Monthly trend */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Monthly Lead Trend</h2>
          <BarChart data={monthlyData} color="#C5A253" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Status breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Leads by Status</h2>
          <div className="space-y-3">
            {data.statusBreakdown.map((st) => (
              <div key={st.id} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: st.color }} />
                <span className="text-sm text-slate-600 dark:text-slate-300 flex-1 truncate">{st.name}</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{st.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lead sources */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Top Lead Sources</h2>
          <div className="space-y-3">
            {data.leadSourceStats.map((src, i) => {
              const total = data.leadSourceStats.reduce((sum, x) => sum + x._count._all, 0);
              const pct = total ? Math.round((src._count._all / total) * 100) : 0;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-300 truncate">{src.sourcePage || 'Unknown'}</span>
                    <span className="text-slate-900 dark:text-white font-medium">{src._count._all}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-700 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
            {data.leadSourceStats.length === 0 && <p className="text-sm text-slate-500">No data yet</p>}
          </div>
        </div>

        {/* Team */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">Team Load</h2>
          <div className="space-y-3">
            {data.userActivity.map((u) => (
              <div key={u.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-medium text-slate-700 dark:text-slate-200">
                  {u.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-300 flex-1 truncate">{u.name}</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">{u._count.assignedLeads}</span>
              </div>
            ))}
            {data.userActivity.length === 0 && <p className="text-sm text-slate-500">No agents yet</p>}
          </div>
        </div>
      </div>

      {/* Recent leads */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Recent Leads</h2>
          <Link href="/admin/leads" className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Phone</th>
                <th className="px-5 py-3 font-medium">Country</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Assigned</th>
                <th className="px-5 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="font-medium text-emerald-700 dark:text-emerald-400 hover:underline">
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{lead.phone}</td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{lead.country ?? '—'}</td>
                  <td className="px-5 py-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${lead.status?.color ?? '#64748b'}1a`, color: lead.status?.color ?? '#64748b' }}
                    >
                      {lead.status?.name ?? '—'}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{lead.assignedTo?.name ?? 'Unassigned'}</td>
                  <td className="px-5 py-3 text-slate-500">{fmtDate(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}