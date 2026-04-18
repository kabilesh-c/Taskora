'use client';

import React from 'react';

import { ArrowUpRight, ExternalLink } from 'lucide-react';

export interface UrgentTask {
  id: string;
  timeRange: string;
  importance: string;
  title: string;
  description: string;
  avatars: string[];
  status: string;
  progress: number;
  progressColor: string;
  actionLabel: string;
  link?: string;
  accentColor: string;
  stats?: { budget?: string; people?: number; comments?: number };
}

const AVATAR_COLORS = ['#1F1F1F', '#4B5563', '#374151', '#111827'];

function MiniAvatar({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-[8px] font-bold text-white -ml-2 first:ml-0 shadow-sm"
      style={{ background: color }}
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function UrgentCard({ task }: { task: UrgentTask }) {
  return (
    <div
      className="rounded-3xl p-5 flex flex-col gap-4 transition-transform hover:scale-[1.02] cursor-pointer group shadow-lg border border-black/5 relative"
      style={{ background: task.accentColor }}
    >
      {/* Top action button (Circular arrow) */}
      <button className="absolute top-4 right-4 w-8 h-8 rounded-full border border-black/20 flex items-center justify-center text-black/60 hover:bg-black hover:text-white transition-all">
        <ArrowUpRight size={16} strokeWidth={2.5} />
      </button>

      {/* Time + importance */}
      <div className="flex items-center gap-2 pr-10">
        <span className="text-[10px] font-semibold text-black/60 flex items-center gap-1.5">
           <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
           Time: {task.timeRange}
        </span>
        {task.importance && (
           <span className="text-[10px] font-bold text-black/80 flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
             {task.importance}
           </span>
        )}
      </div>

      {/* Title */}
      <div className="pr-8">
        <h3 className="text-[18px] font-bold text-black leading-tight tracking-tight">{task.title}</h3>
        {task.description && (
          <p className="text-[11px] font-medium text-black/60 leading-tight mt-1 line-clamp-2">{task.description}</p>
        )}
      </div>

      {/* Avatars + specific links */}
      <div className="flex items-center justify-between">
        <div className="flex items-center text-[10px] font-bold text-black/70 gap-2">
          Members:
          <div className="flex items-center ml-1">
            {task.avatars.map((name, i) => (
              <MiniAvatar key={i} name={name} color={AVATAR_COLORS[i % AVATAR_COLORS.length]} />
            ))}
            <div className="text-[10px] font-bold text-black ml-1">+</div>
          </div>
        </div>
        
        {task.link && !task.stats && (
           <span className="text-[10px] font-bold text-black/70 flex items-center gap-1">
             Acces: <span className="font-semibold">{task.status === 'In Progress' ? 'Invitation' : 'All with link'}</span>
           </span>
        )}
      </div>

      {/* Meet Link explicitly formatted for Designers Meeting */}
      {task.link && task.link.includes('meet') && (
        <div className="bg-[#1A1A1A] rounded-full py-2 px-3 flex items-center gap-2 shadow-inner">
           <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center text-[8px]">M</div>
           <span className="text-[10px] text-gray-400 font-medium">Google Meet</span>
           <span className="text-[10px] font-bold text-white max-w-[120px] truncate ml-auto">{task.link}</span>
        </div>
      )}

      {/* Status & Progress / Stats */}
      {!task.stats ? (
        <>
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#1A1A1A] text-white">
                {task.status}
             </span>
             
             {/* Stubbing dashed progress bar line */}
             <div className="flex-1 flex items-center gap-0.5">
               {Array.from({length: 12}).map((_, i) => (
                 <div key={i} className={`h-1.5 flex-1 rounded-full ${i < (task.progress/100 * 12) ? 'bg-[#1A1A1A]' : 'bg-[#1A1A1A]/20'}`}></div>
               ))}
             </div>
             
             <span className="text-[12px] font-black text-black">{task.progress}%</span>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-end border-t border-black/10 pt-3">
           <div className="flex gap-4">
              <div>
                <p className="text-[10px] font-semibold text-black/60">People</p>
                <p className="text-[18px] font-black text-black">*{task.stats.people}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-black/60">Tasks</p>
                <p className="text-[18px] font-black text-black">{task.stats.comments}</p>
              </div>
           </div>
           <div className="text-[10px] font-bold text-black/60 flex items-center gap-2">
             Notify: <span className="font-bold text-black">Comments</span>
           </div>
        </div>
      )}

      {/* Action button if needed */}
      {(task.title.includes('Meeting') || task.title.includes('Designers')) && (
        <button
          className="w-full py-2.5 mt-1 rounded-full text-[12px] font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] border-2 border-black/10"
          style={{ background: task.accentColor }} // Background matches the card but with border? Let's fix.
        >
          {task.actionLabel}
        </button>
      )}
      
      {/* Ensure Join Meeting is completely distinctive if required. In the image "Join Meeting" is black background wait. No, the reference has a black border but button matches card color! Let's make it background Card but with 1px black border. */}
    </div>
  );
}
