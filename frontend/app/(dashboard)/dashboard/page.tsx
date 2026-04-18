'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { taskService } from '@/lib/tasks';
import { Task, TaskStats } from '@/lib/types';
import { Search, Share2, ChevronDown, X } from 'lucide-react';
import WeekCalendar from '@/components/dashboard/WeekCalendar';
import StatsRow from '@/components/dashboard/StatsRow';
import RightPanel from '@/components/dashboard/RightPanel';
import AddTaskModal from '@/components/tasks/AddTaskModal';

function getTodayString() {
  return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });
}

function getMonthYear() {
  return new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [calendarTasks, setCalendarTasks] = useState<Record<string, Task[]>>({});
  const [view, setView] = useState<'Card' | 'Block' | 'Table'>('Card');
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoDismissed, setDemoDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async (weekStart?: Date) => {
    try {
      const weekStartStr = weekStart ? weekStart.toISOString().split('T')[0] : undefined;
      const [statsData, calendarData] = await Promise.all([
        taskService.getStats(),
        taskService.getCalendarTasks(weekStartStr)
      ]);
      setStats(statsData);
      setCalendarTasks(calendarData);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleWeekChange = useCallback((monday: Date) => {
    fetchData(monday);
  }, [fetchData]);

  useEffect(() => {
    if (user?.email === 'demo@weboin.com' || user?.email === process.env.NEXT_PUBLIC_DEMO_EMAIL) {
      setIsDemoMode(true);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Listen for global signal from Layout when task is created
  useEffect(() => {
    const handler = () => fetchData();
    window.addEventListener('task-created', handler);
    return () => window.removeEventListener('task-created', handler);
  }, [fetchData]);

  const userInitials = user?.full_name
    ? user.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'WB';

  return (
    <>
      {/* Demo Banner */}
      {isDemoMode && !demoDismissed && (
        <div
          className="flex items-center justify-between px-6 py-2.5 shrink-0 z-20"
          style={{ background: '#F5C842' }}
          data-tour="demo-banner"
        >
          <p className="text-[12px] font-semibold text-[#1A1A1A]">
            👀 You&apos;re exploring in Demo Mode — data resets daily. Sign up free to save your work.
          </p>
          <div className="flex items-center gap-3">
            <a href="/register" className="text-[11px] font-bold bg-[#161616] text-white px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity">
              Sign Up Free →
            </a>
            <button onClick={() => setDemoDismissed(true)} className="text-[#1A1A1A]/50 hover:text-[#1A1A1A]">
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Main Dashboard Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Center Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">

          {/* Top Navbar (Light Theme) */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-black tracking-tight">{getMonthYear()}</h1>
              <button className="text-gray-400 hover:text-black transition-colors">
                <ChevronDown size={20} className="stroke-[2.5px]" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* View toggle */}
              <div className="flex items-center bg-white border border-gray-200 rounded-full p-1 shadow-sm">
                {(['Card', 'Block', 'Table'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold pb-[5px] transition-all ${
                      view === v ? 'bg-[#202020] text-white shadow-md' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                 <button className="flex items-center gap-2 text-xs font-semibold text-gray-500 border border-gray-200 px-4 py-2 rounded-full hover:border-gray-300 hover:text-black transition-all bg-white shadow-sm">
                   <Search size={14} className="stroke-[2.5px]" />
                 </button>

                 <button className="flex items-center gap-2 text-[13px] font-bold text-[#202020] border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-all bg-white shadow-sm">
                   1 Week <ChevronDown size={14} className="stroke-[2.5px]" />
                 </button>

                 <button className="flex items-center gap-2 bg-[#06B6D4] hover:bg-[#0891B2] text-white text-[13px] font-bold px-4 py-2 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95">
                   <Share2 size={14} className="stroke-[2.5px]" /> Share
                 </button>
              </div>
            </div>
          </header>

          {/* Calendar + Stats */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
            <div className="flex-1 overflow-hidden">
              <WeekCalendar 
                tasks={calendarTasks} 
                onWeekChange={handleWeekChange}
              />
            </div>
            {/* Dark Stats Row docked to the bottom */}
            <div className="bg-[#1A1A1A]">
              <StatsRow 
                stats={stats} 
                tasks={Object.values(calendarTasks).flat()} 
              />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <RightPanel 
          todayStr={getTodayString()} 
          tasks={Object.values(calendarTasks).flat()} 
        />
      </div>
    </>
  );
}
