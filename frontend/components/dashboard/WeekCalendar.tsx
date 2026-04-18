'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TaskBlock, CalendarTask } from './TaskBlock';
import { Task } from '@/lib/types';

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function getWeekDates(offset: number) {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun
  const monday = new Date(today);
  monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + offset * 7);
  return DAYS.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function mapBackendTaskToCalendar(task: Task, weekDates: Date[]): CalendarTask | null {
  if (!task.start_time || !task.end_time) return null;

  const start = new Date(task.start_time);
  const end = new Date(task.end_time);
  
  // Find which day column this belongs to
  const dayIdx = weekDates.findIndex(d => d.toDateString() === start.toDateString());
  if (dayIdx === -1) return null;

  // rowStart calculation (starting from 8:00)
  const startHour = start.getHours() + start.getMinutes() / 60;
  const rowStart = Math.max(0, startHour - 8);

  // rowSpan calculation
  const endHour = end.getHours() + end.getMinutes() / 60;
  const rowSpan = Math.max(0.5, endHour - startHour);

  return {
    id: task.id,
    title: task.title,
    project: task.project_category || 'General',
    color: task.accent_color || '#FCE764',
    bgColor: task.accent_color || '#FCE764',
    timeStart: start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    timeEnd: end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    rowStart,
    rowSpan,
    col: dayIdx,
    status: task.status === 'completed' ? 'Completed' : task.status === 'in_progress' ? 'In Progress' : 'Todo',
    avatars: task.team_members || [],
    subItems: task.sub_tasks || [],
    compact: rowSpan <= 1
  };
}

interface WeekCalendarProps {
  tasks?: Record<string, Task[]>;
  onDayClick?: (date: Date) => void;
  onWeekChange?: (monday: Date) => void;
}

export default function WeekCalendar({ tasks = {}, onDayClick, onWeekChange }: WeekCalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeDay, setActiveDay] = useState(() => {
    const today = new Date();
    const day = today.getDay(); // 0=Sun, 1=Mon...
    if (day === 0 || day === 6) return 0; // Weekend defaults to Mon
    return day - 1;
  });

  const weekDates = getWeekDates(weekOffset);
  const monday = weekDates[0];

  useEffect(() => {
    onWeekChange?.(monday);
  }, [weekOffset, monday, onWeekChange]);

  const today = new Date();

  const ROW_HEIGHT = 72; // px per hour
  const TIME_COL_W = 56; // px

  // Flatten and filter tasks into calendar format
  const displayTasks: CalendarTask[] = [];
  Object.values(tasks).forEach(dayTasks => {
    dayTasks.forEach(t => {
      const mapped = mapBackendTaskToCalendar(t, weekDates);
      if (mapped) displayTasks.push(mapped);
    });
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white" data-tour="calendar-strip">
      <div className="flex items-center gap-4 px-6 pt-2 pb-6">
        <button
          onClick={() => setWeekOffset((w) => w - 1)}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all bg-white"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex justify-between flex-1 px-8">
          {weekDates.map((d, i) => {
            const isActive = i === activeDay;
            const isToday = d.toDateString() === today.toDateString();
            return (
              <button
                key={i}
                onClick={() => { setActiveDay(i); onDayClick?.(d); }}
                className={`flex items-baseline gap-1.5 transition-all group pt-2 px-4 focus:outline-none`}
              >
                <div className="flex flex-col items-center">
                  <div className="flex items-baseline gap-1.5">
                    <span className={`text-[36px] font-bold tracking-tighter ${isActive ? 'text-black' : 'text-gray-300 group-hover:text-gray-400'}`}>
                      {d.getDate()}
                    </span>
                    <span className={`text-[15px] font-semibold tracking-wide ${isActive ? 'text-black' : 'text-gray-300 group-hover:text-gray-400'}`}>
                      / {DAYS[i]}
                    </span>
                  </div>
                  {isToday && <div className="w-1.5 h-1.5 bg-[#06B6D4] rounded-full -mt-1" />}
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setWeekOffset((w) => w + 1)}
          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-50 transition-all bg-white"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200">
        <div className="flex" style={{ minHeight: HOURS.length * ROW_HEIGHT }}>
          <div className="shrink-0 flex flex-col" style={{ width: TIME_COL_W }}>
            {HOURS.map((h) => (
              <div
                key={h}
                className="flex items-start justify-end pr-4 text-[11px] font-semibold text-gray-400"
                style={{ height: ROW_HEIGHT }}
              >
                <span className="-mt-2">{h}:00</span>
              </div>
            ))}
          </div>

          <div className="flex-1 relative">
            {HOURS.map((h, i) => (
              <div
                key={h}
                className="absolute left-0 right-0 border-t border-gray-100"
                style={{ top: i * ROW_HEIGHT }}
              />
            ))}

            {DAYS.map((_, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 border-l border-gray-100"
                style={{ left: `${(i / 5) * 100}%` }}
              />
            ))}

            {displayTasks.map((task) => {
              const colW = 100 / 5;
              const left = `${task.col * colW + 0.5}%`;
              const width = `${colW - 1}%`;
              const top = task.rowStart * ROW_HEIGHT + 2;
              const height = task.rowSpan * ROW_HEIGHT - 4;

              return (
                <div
                  key={task.id}
                  className="absolute"
                  style={{ left, width, top, height }}
                >
                  <TaskBlock task={task} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
