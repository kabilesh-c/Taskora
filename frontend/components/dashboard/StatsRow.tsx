'use client';

import React from 'react';

interface StatsRowProps {
  stats?: {
    total: number;
    completed: number;
    in_progress: number;
    todo: number;
    completion_rate: number;
  } | null;
}

function DonutChart({ pct, color, size = 80 }: { pct: number; color: string; size?: number }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2A2A2A" strokeWidth="8" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }}
      />
    </svg>
  );
}

function ArcGauge({ pct }: { pct: number }) {
  const size = 140;
  const r = 55;
  const cx = size / 2;
  const cy = size / 2 + 20;
  const startAngle = -210;
  const endAngle = 30;
  const totalArc = endAngle - startAngle;
  const filledArc = (pct / 100) * totalArc;

  function polar(deg: number, radius: number) {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function arcPath(start: number, end: number, r: number) {
    const s = polar(start, r);
    const e = polar(end, r);
    const large = Math.abs(end - start) > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`;
  }

  const dots = [-180, -150, -120, -90, -60, -30, 0, 30].filter(
    (d) => d >= startAngle && d <= endAngle
  );

  return (
    <svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
      {/* Track */}
      <path d={arcPath(startAngle, endAngle, r)} fill="none" stroke="#2A2A2A" strokeWidth="10" strokeLinecap="round" />
      {/* Fill */}
      <path d={arcPath(startAngle, startAngle + filledArc, r)} fill="none" stroke="#10B981" strokeWidth="10" strokeLinecap="round" />
      {/* Dot markers */}
      {dots.map((d) => {
        const p = polar(d, r);
        return <circle key={d} cx={p.x} cy={p.y} r="2" fill="#3A3A3A" />;
      })}
    </svg>
  );
}

import { Task, TaskStats } from '@/lib/types';

interface StatsRowProps {
  stats: TaskStats | null;
  tasks?: Task[];
}

export default function StatsRow({ stats, tasks = [] }: StatsRowProps) {
  const pct = stats?.completion_rate ?? 0;
  const total = stats?.total ?? 0;

  // Calculate task type data dynamically from the flat tasks list
  const getCategoryStats = () => {
    const categories = {
      Learning: 0,
      Design: 0,
      Business: 0
    };
    
    tasks.forEach(t => {
      const cat = t.project_category;
      if (cat === 'Marketing') categories.Business++;
      else if (cat === 'Design') categories.Design++;
      else if (cat === 'Management' || cat === 'Development') categories.Learning++;
    });

    const totalCat = (categories.Learning + categories.Design + categories.Business) || 1;
    return {
      Learning: { count: categories.Learning, pct: Math.round((categories.Learning / totalCat) * 100) },
      Design: { count: categories.Design, pct: Math.round((categories.Design / totalCat) * 100) },
      Business: { count: categories.Business, pct: Math.round((categories.Business / totalCat) * 100) }
    };
  };

  const catStats = getCategoryStats();

  return (
    <div className="grid grid-cols-3 gap-5 p-6 shrink-0 bg-[#202020]" data-tour="task-stats">
      {/* Panel 1 — Task Statistics */}
      <div className="bg-[#1A1A1A] border-none rounded-3xl p-5 flex flex-col gap-3 shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between z-10">
          <span className="text-[13px] font-bold text-white">Task Statistics</span>
          <span className="text-[10px] font-semibold text-gray-500 bg-[#202020] px-2 py-0.5 rounded-full cursor-pointer hover:text-white transition-colors">All Time ▾</span>
        </div>
        <div className="flex items-end gap-5 mt-2 z-10">
          <div className="relative">
            <ArcGauge pct={pct} />
            <div className="absolute top-[50%] left-1/2 -translate-x-1/2 bg-[#202020] border border-[#2A2A2A] rounded-full px-3 py-1 flex items-center gap-1.5 shadow-xl">
               <span className="text-[10px]">{pct > 50 ? '👍' : '⏳'}</span>
               <span className="text-[9px] font-bold text-white whitespace-nowrap">{pct > 50 ? 'Great Result' : 'Keep Going'}</span>
            </div>
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-center">
              <div className="text-[10px] font-semibold text-gray-500">{total} Slots</div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pb-2">
            <div>
              <span className="text-[28px] font-black text-white">{Math.round(pct)}%</span>
              <div className="text-[10px] font-semibold text-gray-400">Completed Tasks</div>
            </div>
            <div className="mt-2">
              <span className="text-xl font-black text-white">{Math.round(100 - pct)}%</span>
              <div className="text-[10px] font-semibold text-gray-400">Unfulfilled Tasks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2 — Task Type (Yellow Overlapping Circles) */}
      <div className="bg-[#1A1A1A] border-none rounded-3xl p-5 flex flex-col gap-3 shadow-md">
        <div className="flex items-center justify-between z-10">
          <span className="text-[13px] font-bold text-white">Task Type</span>
          <span className="text-[10px] font-semibold text-gray-500 bg-[#202020] px-2 py-0.5 rounded-full cursor-pointer hover:text-white transition-colors">All Time ▾</span>
        </div>
        <div className="flex flex-1 items-center gap-2 mt-2">
          {/* Overlapping Yellow Circles */}
          <div className="relative w-32 h-32 shrink-0">
             {/* Main Circle (Learning) */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[90px] h-[90px] bg-[#FCE764] rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#1A1A1A] z-20">
                <span className="text-[28px] font-black text-[#1A1A1A] tracking-tighter">{catStats.Learning.pct}<span className="text-sm">%</span></span>
             </div>
             {/* Secondary Circle (Design) */}
             <div className="absolute right-[-10px] top-[-5px] w-[55px] h-[55px] bg-[#FCE764]/70 rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#1A1A1A] z-10">
                <span className="text-[16px] font-black text-[#1A1A1A]">{catStats.Design.pct}<span className="text-[9px]">%</span></span>
             </div>
             {/* Small Circle (Business) */}
             <div className="absolute left-1 bottom-4 w-[40px] h-[40px] bg-[#FCE764]/40 rounded-full flex items-center justify-center shadow-lg border-[3px] border-[#1A1A1A] z-30">
                <span className="text-[12px] font-bold text-white">{catStats.Business.pct}<span className="text-[8px]">%</span></span>
             </div>
             
             {/* Learn More Tag */}
             <div className="absolute left-[-20px] top-[15px] bg-[#8B5CF6] text-white text-[9px] font-bold px-2 py-1 rounded-full z-40 border-2 border-[#1A1A1A] shadow-md flex items-center gap-1">
                Deep Dive <div className="w-1.5 h-1.5 border-t border-r border-white rotate-45 transform"></div>
             </div>
          </div>

          {/* Legend Stats */}
          <div className="flex flex-col gap-4 flex-1 pl-4 mt-8">
            <div className="flex justify-between items-end border-b border-[#2A2A2A] pb-1">
              <span className="text-[20px] font-black text-white leading-none">{catStats.Learning.count}</span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase">Learning</span>
            </div>
            <div className="flex justify-between items-end border-b border-[#2A2A2A] pb-1">
              <span className="text-[20px] font-black text-white leading-none">{catStats.Design.count}</span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase">Design</span>
            </div>
            <div className="flex justify-between items-end border-b border-[#2A2A2A] pb-1">
              <span className="text-[20px] font-black text-white leading-none">{catStats.Business.count}</span>
              <span className="text-[10px] font-semibold text-gray-500 uppercase">Business</span>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 3 — Your Activity */}
      <div className="bg-[#1A1A1A] border-none rounded-3xl p-5 flex flex-col gap-3 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold text-white">Your Activity</span>
          <span className="text-[9px] font-semibold text-gray-500 bg-[#202020] px-2 py-0.5 rounded-full cursor-pointer hover:text-white transition-colors">Current Week ▾</span>
        </div>
        
        {/* Subtitle */}
        <p className="text-[10px] text-gray-400 font-medium">Weekly Focus: <span className="text-white font-bold">{total} Tasks</span></p>
        
        {/* Bar chart with Pink Highlight */}
        <div className="flex items-end gap-2.5 h-20 mt-2 relative">
          {[40, 50, 80, 55, 100, 70, 45].map((h, i) => {
            const isHighlighted = i === 4; // 5th bar is highlighted pink
            return (
              <div key={i} className="flex flex-col items-center gap-1.5 flex-1 relative group">
                {/* Tooltip for highlighted bar */}
                {isHighlighted && pct > 0 && (
                  <div className="absolute -top-10 bg-white text-black text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap shadow-xl z-10 animate-bounce">
                    Efficiency <span className="text-black font-black">+{Math.round(pct/2)}%</span>
                    <div className="w-2 h-2 bg-white rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                  </div>
                )}
                
                <div
                  className={`w-full rounded-sm transition-all duration-300 ${isHighlighted ? 'bg-[#FF8199]' : 'bg-[#2A2A2A] hover:bg-[#3A3A3A]'}`}
                  style={{
                    height: `${h}%`,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between w-full mt-1 px-1">
           <span className="text-[9px] font-semibold text-gray-500">Mon</span>
           <span className="text-[9px] font-semibold text-gray-500">Tue</span>
           <span className="text-[9px] font-semibold text-gray-500">Wed</span>
           <span className="text-[9px] font-semibold text-gray-500">Thu</span>
           <span className="text-[9px] font-semibold text-gray-500">Fri</span>
        </div>
      </div>
    </div>
  );
}
