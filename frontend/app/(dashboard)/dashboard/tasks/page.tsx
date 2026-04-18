'use client';

import { useState, useEffect, useCallback } from 'react';
import { taskService } from '@/lib/tasks';
import { Task, TaskStatus } from '@/lib/types';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Clock, 
  MessageSquare, 
  Paperclip,
  ChevronDown,
  LayoutGrid,
  List,
  Calendar as CalendarIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STATUS_COLUMNS: { id: TaskStatus; label: string; color: string; bg: string }[] = [
  { id: 'todo', label: 'To Do', color: '#6B7280', bg: 'rgba(107, 114, 128, 0.05)' },
  { id: 'in_progress', label: 'In Progress', color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.05)' },
  { id: 'completed', label: 'Done', color: '#10B981', bg: 'rgba(16, 185, 129, 0.05)' },
];

function TaskCard({ task, onUpdate }: { task: Task; onUpdate: () => void }) {
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative overflow-hidden rounded-[24px] p-5 transition-all hover:translate-y-[-4px]"
      style={{ backgroundColor: task.accent_color || '#F3F4F6' }}
    >
      {/* Decorative border highlight */}
      <div 
        className="absolute top-0 left-0 w-1.5 h-full opacity-30" 
        style={{ backgroundColor: '#1A1A1A' }} 
      />

      <div className="flex items-start justify-between mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-black/40 px-2 py-0.5 rounded-full bg-black/5">
          {task.project_category || 'General'}
        </span>
        <button className="text-black/30 hover:text-black/60 transition-colors">
          <MoreHorizontal size={14} />
        </button>
      </div>

      <h3 className="text-[16px] font-bold text-black leading-tight mb-2 tracking-tight">
        {task.title}
      </h3>
      
      {task.description && (
        <p className="text-[11px] text-black/50 line-clamp-2 mb-6 font-medium leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Stats row with a cleaner look */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
        <div className="flex -space-x-2">
           {(task.team_members || ['WB']).map((m, i) => (
             <div 
               key={i} 
               className="w-7 h-7 rounded-full border-2 border-white bg-gray-900 flex items-center justify-center text-[9px] font-bold text-white shadow-sm"
               style={{ backgroundColor: ['#1A1A1A', '#333333', '#444444', '#555555'][i % 4] }}
             >
               {m.slice(0, 2).toUpperCase()}
             </div>
           ))}
           <div className="w-7 h-7 rounded-full border-2 border-white bg-white/50 flex items-center justify-center text-[10px] font-black text-black/40 shadow-sm">
             +
           </div>
        </div>
        
        <div className="flex items-center gap-4 text-black/30">
           <div className="flex items-center gap-1">
             <MessageSquare size={13} strokeWidth={2.5} />
             <span className="text-[10px] font-black">{task.stats_comments || 0}</span>
           </div>
           <div className="flex items-center gap-1">
             <Paperclip size={13} strokeWidth={2.5} />
             <span className="text-[10px] font-black">0</span>
           </div>
        </div>
      </div>

      {/* Progress Bar (Subtle) */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-black/5">
        <div 
          className="h-full bg-black/20" 
          style={{ width: `${task.progress}%` }} 
        />
      </div>
    </motion.div>
  );
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'Kanban' | 'List'>('Kanban');

  const fetchTasks = useCallback(async () => {
    try {
      const resp = await taskService.getTasks({ size: 100 });
      setTasks(resp.items);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Sync with global creation event
  useEffect(() => {
    const handler = () => fetchTasks();
    window.addEventListener('task-created', handler);
    return () => window.removeEventListener('task-created', handler);
  }, [fetchTasks]);

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.project_category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden font-sans">
      {/* Premium Header - Dark Theme Inset */}
      <div className="m-4 mb-0 rounded-[32px] bg-[#1A1A1A] text-white overflow-hidden shadow-2xl relative">
        <div className="px-10 py-10 relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <span className="px-3 py-1 rounded-full bg-[#FCE764] text-black text-[10px] font-black uppercase tracking-wider shadow-sm">
                 Active Workload
               </span>
               <span className="text-gray-500 font-bold text-xs">— {filteredTasks.length} Live Items</span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">Execution Pipeline</h1>
            <p className="text-gray-400 font-medium max-w-md antialiased leading-relaxed">
              Strategic oversight of all organizational objectives. Track velocity and mission-critical deliverables in high fidelity.
            </p>
          </div>

          <div className="flex flex-col items-end gap-6">
            <div className="flex items-center bg-white/5 p-1.5 rounded-2xl border border-white/10">
               {(['Kanban', 'List'] as const).map(m => (
                 <button 
                  key={m}
                  onClick={() => setViewMode(m)}
                  className={`px-5 py-2 rounded-xl text-[11px] font-black transition-all ${viewMode === m ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                 >
                   {m}
                 </button>
               ))}
            </div>
            
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-add-task-modal'))}
              className="group flex items-center gap-3 bg-[#FCE764] text-black px-8 py-3.5 rounded-2xl text-[14px] font-black hover:scale-[1.05] active:scale-[0.98] transition-all shadow-xl shadow-yellow-400/10"
            >
              <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                <Plus size={14} /> 
              </div>
              Deploy Objective
            </button>
          </div>
        </div>
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-yellow-400/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Filters Strip */}
      <div className="px-10 py-6 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="relative group">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={16} strokeWidth={2.5} />
  <input 
    type="text" 
    placeholder="Identify task..." 
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-3.5 text-xs font-bold focus:ring-2 focus:ring-black/5 outline-none w-[320px] transition-all placeholder:text-gray-300"
  />
</div>
            <button className="h-12 w-12 flex items-center justify-center rounded-2xl border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-black transition-all shadow-sm">
              <Filter size={18} strokeWidth={2.5} />
            </button>
         </div>

         <div className="flex items-center gap-2">
            <span className="text-[11px] font-black text-gray-300 uppercase tracking-widest mr-3">Sort by Priority</span>
            {['Urgent', 'High', 'Normal'].map(p => (
              <button key={p} className="px-5 py-2.5 rounded-xl border border-gray-50 text-[11px] font-bold text-gray-400 hover:border-gray-200 hover:text-black transition-all uppercase tracking-tight">
                {p}
              </button>
            ))}
         </div>
      </div>

      {/* Kanban / Pipeline View */}
      <div className="flex-1 px-8 pb-8 flex gap-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-100">
        {STATUS_COLUMNS.map((col) => (
          <div key={col.id} className="w-[340px] shrink-0 flex flex-col h-full rounded-[36px] p-2" style={{ backgroundColor: col.bg }}>
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: col.color }} />
                <h2 className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-[0.2em]">{col.label}</h2>
              </div>
              <span className="text-[11px] font-black bg-white shadow-sm text-gray-400 px-3 py-1 rounded-full">
                {filteredTasks.filter(t => t.status === col.id).length}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-200">
              <AnimatePresence mode="popLayout">
                {filteredTasks
                  .filter(t => t.status === col.id)
                  .map(task => (
                    <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
                  ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
