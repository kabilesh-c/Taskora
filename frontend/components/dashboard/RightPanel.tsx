'use client';

import React from 'react';

import { Share2, Plus } from 'lucide-react';
import { UrgentCard, UrgentTask } from './UrgentCard';

const TAG_PILLS = [
  { label: 'Design', color: '#06B6D4', bg: '#06B6D4/10' },
  { label: 'Copyright', color: '#F5C842', bg: '#F5C842/10' },
  { label: 'Training', color: '#8B5CF6', bg: '#8B5CF6/10' },
  { label: 'Development', color: '#3B82F6', bg: '#3B82F6/10' },
  { label: 'Marketing', color: '#10B981', bg: '#10B981/10' },
  { label: 'SEO', color: '#06B6D4', bg: '#06B6D4/10' },
];

import { Task } from '@/lib/types';

interface RightPanelProps {
  todayStr: string;
  tasks?: Task[];
}

export default function RightPanel({ todayStr, tasks = [] }: RightPanelProps) {
  // Filter for urgent or high priority tasks
  const urgentTasksFiltered = tasks
    .filter(t => t.priority === 'urgent' || t.priority === 'high')
    .map(t => ({
      id: t.id,
      timeRange: t.start_time && t.end_time 
        ? `${new Date(t.start_time).getHours()}:${new Date(t.start_time).getMinutes().toString().padStart(2, '0')} – ${new Date(t.end_time).getHours()}:${new Date(t.end_time).getMinutes().toString().padStart(2, '0')}`
        : '9:00 - 10:00',
      title: t.title,
      description: t.description || '',
      avatars: t.team_members || [],
      status: t.status === 'completed' ? 'Completed' : t.status === 'in_progress' ? 'In progress' : 'Todo',
      progress: t.progress,
      progressColor: '#000000',
      actionLabel: t.link ? 'Join Meeting' : 'View Brief',
      accentColor: t.accent_color || '#FF8A8A',
      link: t.link || undefined,
      stats: (t.stats_budget || t.stats_people || t.stats_comments) ? {
        budget: t.stats_budget || '',
        people: t.stats_people || 0,
        comments: t.stats_comments || 0
      } : undefined
    }));

  return (
    <div
      className="flex flex-col shrink-0 overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.15)] z-20 relative"
      style={{ width: 340, background: '#202020', borderLeft: '1px solid #2A2A2A' }}
      data-tour="urgent-panel"
    >
      {/* Tasks Type Header */}
      <div className="px-6 pt-5 pb-4 border-b border-[#2A2A2A]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[14px] font-bold text-white">Tasks Type</span>
          <span className="text-[10px] font-semibold text-gray-400 bg-transparent px-2 py-0.5 rounded-full flex items-center gap-1.5 focus:outline-none">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            Today, {todayStr} ▾
          </span>
        </div>
        {/* Tag pills */}
        <div className="flex flex-wrap gap-2">
          {TAG_PILLS.map((tag) => (
            <button
              key={tag.label}
              className="text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all hover:scale-[1.05]"
              style={{ color: tag.color, borderColor: `${tag.color}30`, background: `${tag.color}15` }}
            >
              {tag.label}
            </button>
          ))}
          <button className="text-[11px] text-gray-500 border border-[#2A2A2A] px-3 py-1.5 rounded-full hover:border-[#3A3A3A] transition-all bg-[#1A1A1A]">
            <Plus size={12} className="inline" />
          </button>
        </div>
      </div>

      {/* My Teams */}
      <div className="px-6 py-4 border-b border-[#2A2A2A]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold text-gray-500">My Team:</span>
            <div className="flex items-center gap-1.5">
               <div className="w-4 h-4 rounded-full bg-[#8B5CF6] flex items-center justify-center text-[10px]">✨</div>
               <span className="text-[13px] font-bold text-white">Weboin+</span>
            </div>
          </div>
          <button className="text-[10px] font-bold text-[#06B6D4] hover:text-[#0891B2] transition-colors flex items-center gap-1">
            GO Share
          </button>
        </div>
      </div>

      {/* Urgent Tasks */}
      <div className="px-6 pt-5 pb-3">
        <h2 className="text-[24px] font-bold text-white leading-none">
          Urgent Tasks ({urgentTasksFiltered.length})
        </h2>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2A2A2A]">
        {urgentTasksFiltered.map((task) => (
          <UrgentCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
