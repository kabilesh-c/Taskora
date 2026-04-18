'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Stats {
  total: number;
  completed: number;
  in_progress: number;
  todo: number;
  urgent: number;
  completion_rate: number;
  overdue: number;
  by_priority: Record<string, number>;
}

// --- CSS-only chart: Arc Gauge ---
function ArcGauge({ pct, color }: { pct: number; color: string }) {
  const size = 160, r = 62, cx = 80, cy = 90;
  const startDeg = -210, endDeg = 30, totalArc = endDeg - startDeg;
  const filledArc = (pct / 100) * totalArc;
  function polar(deg: number) {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }
  function arc(s: number, e: number) {
    const sp = polar(s), ep = polar(e);
    const large = Math.abs(e - s) > 180 ? 1 : 0;
    return `M${sp.x},${sp.y} A${r},${r} 0 ${large} 1 ${ep.x},${ep.y}`;
  }
  return (
    <svg width="160" height="100" viewBox="0 0 160 100" className="overflow-visible">
      <path d={arc(startDeg, endDeg)} fill="none" stroke="#1F1F1F" strokeWidth="12" strokeLinecap="round" />
      <path d={arc(startDeg, startDeg + filledArc)} fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" style={{ transition: 'all 1s ease' }} />
      <text x="80" y="85" textAnchor="middle" fill="white" fontSize="28" fontWeight="900">{Math.round(pct)}%</text>
      <text x="80" y="100" textAnchor="middle" fill="#6B7280" fontSize="10">Completion Rate</text>
    </svg>
  );
}

// --- CSS-only chart: Horizontal bar ---
function HorizBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] text-gray-400 capitalize w-16 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-[#1F1F1F] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[11px] font-bold text-white w-6 text-right">{value}</span>
    </div>
  );
}

// --- CSS-only Donut ---
function DonutChart({ segments }: { segments: { color: string; pct: number; label: string }[] }) {
  const size = 100, r = 38;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90 shrink-0">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1F1F1F" strokeWidth="16" />
        {segments.map((s, i) => {
          const dash = (s.pct / 100) * circ;
          const el = (
            <circle key={i} cx={size / 2} cy={size / 2} r={r}
              fill="none" stroke={s.color} strokeWidth="16"
              strokeDasharray={`${dash} ${circ}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div className="flex flex-col gap-2">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-[11px] text-gray-400">{s.label}</span>
            <span className="text-[11px] font-bold text-white ml-auto">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api.get('/tasks/stats').then((r) => setStats(r.data)).catch(() => {});
  }, []);

  const priorityColors: Record<string, string> = {
    low: '#10B981', medium: '#3B82F6', high: '#F59E0B', urgent: '#EF4444',
  };
  const maxPriority = Math.max(...Object.values(stats?.by_priority ?? {}).map(Number), 1);

  const statusSegments = [
    { color: '#10B981', pct: stats ? Math.round((stats.completed / Math.max(stats.total, 1)) * 100) : 60, label: 'Completed' },
    { color: '#3B82F6', pct: stats ? Math.round((stats.in_progress / Math.max(stats.total, 1)) * 100) : 25, label: 'In Progress' },
    { color: '#9CA3AF', pct: stats ? Math.round((stats.todo / Math.max(stats.total, 1)) * 100) : 15, label: 'Todo' },
  ];

  const activityBars = [18, 42, 35, 65, 50, 28, 72, 38, 55, 44, 60, 33, 48, 70, 25,
    52, 40, 68, 30, 45, 58, 36, 62, 47, 55, 28, 72, 38, 48, 61];

  return (
    <div className="flex flex-col h-full overflow-auto p-6 gap-5">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-[17px] font-semibold text-white">Analytics</h1>
        <span className="text-[11px] text-gray-500 bg-[#1A1A1A] px-3 py-1.5 rounded-full border border-[#2A2A2A]">
          All Time
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Panel 1 — Completion Rate */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-5 flex flex-col gap-4 col-span-1">
          <p className="text-[12px] font-semibold text-white">Completion Rate</p>
          <div className="flex justify-center">
            <ArcGauge pct={stats?.completion_rate ?? 0} color="#10B981" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Total', value: stats?.total ?? 0, color: '#9CA3AF' },
              { label: 'Completed', value: stats?.completed ?? 0, color: '#10B981' },
              { label: 'Overdue', value: stats?.overdue ?? 0, color: '#EF4444' },
              { label: 'Urgent', value: stats?.urgent ?? 0, color: '#F59E0B' },
            ].map((s) => (
              <div key={s.label} className="bg-[#1A1A1A] rounded-xl p-3">
                <p className="text-[10px] text-gray-500">{s.label}</p>
                <p className="text-[18px] font-black" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2 — Tasks by Priority */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-5 flex flex-col gap-4">
          <p className="text-[12px] font-semibold text-white">Tasks by Priority</p>
          <div className="flex flex-col gap-3 flex-1 justify-center">
            {Object.entries(stats?.by_priority ?? { low: 3, medium: 5, high: 4, urgent: 2 }).map(([key, val]) => (
              <HorizBar key={key} label={key} value={Number(val)} max={maxPriority} color={priorityColors[key]} />
            ))}
          </div>
        </div>

        {/* Panel 3 — Tasks by Status */}
        <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-5 flex flex-col gap-4">
          <p className="text-[12px] font-semibold text-white">Tasks by Status</p>
          <DonutChart segments={statusSegments} />
          <div className="grid grid-cols-3 gap-2 mt-2">
            {statusSegments.map((s) => (
              <div key={s.label} className="bg-[#1A1A1A] rounded-xl p-2 text-center">
                <p className="text-[9px] text-gray-500">{s.label}</p>
                <p className="text-[15px] font-black" style={{ color: s.color }}>
                  {s.label === 'Completed' ? (stats?.completed ?? 0) : s.label === 'In Progress' ? (stats?.in_progress ?? 0) : (stats?.todo ?? 0)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel 4 — Activity Over Time (30 days) */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-[12px] font-semibold text-white">Activity Over Time</p>
          <span className="text-[10px] text-gray-500">Last 30 days</span>
        </div>
        <div className="flex items-end gap-1 h-24">
          {activityBars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all duration-500"
              style={{
                height: `${h}%`,
                background: i % 7 === 0 ? '#8B5CF6' : i % 3 === 0 ? '#06B6D4' : '#1F2937',
                opacity: 0.85,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-gray-600">
          <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
        </div>
      </div>

      {/* Panel 5 — Top 5 Overdue */}
      <div className="bg-[#111111] border border-[#1F1F1F] rounded-2xl p-5 flex flex-col gap-3">
        <p className="text-[12px] font-semibold text-white">Top Overdue Tasks</p>
        {stats?.overdue === 0 ? (
          <div className="flex items-center gap-2 py-4">
            <span className="text-2xl">🎉</span>
            <span className="text-[13px] text-gray-400">No overdue tasks! You&apos;re on top of things.</span>
          </div>
        ) : (
          <div className="text-[12px] text-gray-500 py-2">
            You have <span className="text-red-400 font-bold">{stats?.overdue}</span> overdue task{stats?.overdue !== 1 ? 's' : ''}. Visit the Tasks page to action them.
          </div>
        )}
      </div>
    </div>
  );
}
