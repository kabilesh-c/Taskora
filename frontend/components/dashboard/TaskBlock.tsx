'use client';

import React from 'react';
import { Users, MoreHorizontal, ArrowUpRight } from 'lucide-react';

export interface CalendarTask {
  id: string;
  title: string;
  project: string;
  color: string;        // hex for left border + badge
  bgColor: string;      // card background
  timeStart: string;    // "8:00"
  timeEnd: string;      // "9:30"
  rowStart: number;     // grid row (0-indexed, each row = 1hr starting 8:00)
  rowSpan: number;      // how many rows (hours) it spans
  col: number;          // 0 = Mon … 4 = Fri
  status?: string;
  avatars?: string[];
  subItems?: string[];
  compact?: boolean;
}

const AVATAR_COLORS = ['#1F1F1F', '#4B5563', '#374151', '#111827'];

function Avatar({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="w-7 h-7 rounded-full border-2 border-white/50 flex items-center justify-center text-[10px] font-bold text-white -ml-2 first:ml-0 shadow-sm"
      style={{ background: color }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  // Using pure black/white for pill text contrast against pastel backgrounds
  const map: Record<string, { bg: string; text: string }> = {
    'In Progress': { bg: '#1A1A1A', text: 'white' },
    Archived: { bg: 'transparent', text: '#1A1A1A' },
    Review: { bg: '#1A1A1A', text: 'white' },
    Completed: { bg: '#1A1A1A', text: 'white' },
  };
  const s = map[status] || { bg: '#1A1A1A', text: 'white' };
  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${status === 'Archived' ? 'border border-[#1A1A1A]' : ''}`}
      style={{ background: s.bg, color: s.text }}
    >
      {status}
    </span>
  );
}

export function TaskBlock({ task }: { task: CalendarTask }) {
  const isCompact = task.compact || task.rowSpan <= 1;

  return (
    <div
      className="w-full h-full rounded-[20px] overflow-hidden flex flex-col p-3 transition-transform hover:scale-[1.02] cursor-pointer group shadow-sm border border-black/5 relative"
      style={{ background: task.bgColor }}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1">
          <p className="text-[13px] font-bold text-[#1A1A1A] leading-tight truncate pr-4">
            {task.title}
          </p>
           {!isCompact && (
            <p className="text-[11px] font-semibold text-[#1A1A1A]/60 mt-0.5">
              {task.timeStart} – {task.timeEnd}
            </p>
          )}
        </div>
        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[#1A1A1A]/50 hover:text-[#1A1A1A] shrink-0 absolute top-3 right-3">
          <MoreHorizontal size={14} strokeWidth={3} />
        </button>
      </div>

      {!isCompact && task.subItems && (
        <div className="flex flex-col gap-1.5 mt-3 flex-1">
          {task.subItems.map((item, idx) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-[4px] bg-[#1A1A1A] flex items-center justify-center shrink-0">
                {idx === 0 && <span className="w-1.5 h-1.5 bg-white rounded-[2px]" />}
              </div>
              <span className="text-[11px] font-semibold text-[#1A1A1A]/80 truncate">{item}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-2">
        {task.avatars && task.avatars.length > 0 ? (
          <div className="flex items-center">
             <span className="mr-2 text-[10px] font-semibold text-[#1A1A1A]/60">Members:</span>
            {task.avatars.map((name, i) => (
              <Avatar key={i} name={name} color={AVATAR_COLORS[i % AVATAR_COLORS.length]} />
            ))}
          </div>
        ) : (
          <div />
        )}
        {task.status && !isCompact && <StatusPill status={task.status} />}
      </div>
    </div>
  );
}
