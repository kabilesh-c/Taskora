'use client';

import { useState, useEffect, useCallback } from 'react';
import { taskService } from '@/lib/tasks';
import { Task, TaskStats } from '@/lib/types';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Clock, 
  AlertCircle,
  BarChart3,
  ArrowUpRight,
  Database,
  Layers,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

function GlassMetric({ label, value, subtext, icon: Icon, color }: { label: string; value: string | number; subtext: string; icon: any; color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden group bg-white border border-gray-100 p-8 rounded-[40px] shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-2 h-full opacity-20" style={{ backgroundColor: color }} />
      
      <div className="flex items-start justify-between mb-8">
        <div className="p-4 rounded-3xl" style={{ backgroundColor: `${color}10`, color }}>
          <Icon size={28} strokeWidth={2.5} />
        </div>
        <div className="bg-gray-50 text-gray-400 p-2 rounded-xl group-hover:bg-black group-hover:text-white transition-colors cursor-pointer">
          <ArrowUpRight size={16} />
        </div>
      </div>
      
      <div className="space-y-1">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{label}</h3>
        <p className="text-4xl font-black text-[#1A1A1A] tracking-tighter">{value}</p>
      </div>
      
      <p className="mt-4 text-[11px] font-bold text-gray-400 flex items-center gap-1.5 antialiased">
        <Activity size={12} className="text-green-500" />
        {subtext}
      </p>

      {/* Background flare */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity rounded-full" style={{ backgroundColor: color }} />
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [s, t] = await Promise.all([
        taskService.getStats(),
        taskService.getTasks({ size: 100 })
      ]);
      setStats(s);
      setTasks(t.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Sync with global creation event
  useEffect(() => {
    const handler = () => fetchData();
    window.addEventListener('task-created', handler);
    return () => window.removeEventListener('task-created', handler);
  }, [fetchData]);

  if (loading) return null;

  return (
    <div className="flex-1 bg-white p-6 overflow-y-auto font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Hero Intelligence Header */}
        <div className="bg-[#1A1A1A] rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl">
           <div className="relative z-10 grid grid-cols-2 gap-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#06B6D4] flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Database size={20} className="text-white" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-400">BI Infrastructure</span>
                </div>
                <h1 className="text-5xl font-black tracking-tighter mb-4">Performance Intelligence</h1>
                <p className="text-gray-400 font-medium text-lg antialiased leading-relaxed max-w-lg">
                  Real-time visualization of organizational efficiency and task-to-goal conversion rates.
                </p>
                
                <div className="flex items-center gap-6 mt-10">
                   <div className="flex flex-col">
                      <span className="text-3xl font-black text-[#FCE764]">{stats?.completion_rate}%</span>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Efficiency</span>
                   </div>
                   <div className="w-[1px] h-10 bg-white/10" />
                   <div className="flex flex-col">
                      <span className="text-3xl font-black text-white">{stats?.total}</span>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Objectives</span>
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                 {/* Large Visual Metric - Circular Progress */}
                 <div className="relative w-64 h-64">
                    <svg className="w-full h-full -rotate-90">
                       <circle cx="128" cy="128" r="110" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                       <motion.circle 
                         cx="128" cy="128" r="110" fill="none" 
                         stroke="#FCE764" strokeWidth="12" 
                         strokeDasharray={2 * Math.PI * 110}
                         initial={{ strokeDashoffset: 2 * Math.PI * 110 }}
                         animate={{ strokeDashoffset: (2 * Math.PI * 110) * (1 - (stats?.completion_rate || 0) / 100) }}
                         transition={{ duration: 1.5, ease: "easeOut" }}
                         strokeLinecap="round"
                       />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-5xl font-black tracking-tighter">{stats?.completion_rate}%</span>
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1 text-center">Velocity<br/>Index</span>
                    </div>
                 </div>
              </div>
           </div>
           
           {/* Decorative Grid */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-4 gap-6">
          <GlassMetric 
            label="Throughput" 
            value={stats?.completed || 0} 
            subtext="Deliverables finalized this period"
            icon={Zap}
            color="#F59E0B"
          />
          <GlassMetric 
            label="Backlog" 
            value={stats?.todo || 0} 
            subtext="Items awaiting prioritization"
            icon={Clock}
            color="#ec4899"
          />
          <GlassMetric 
            label="High Stakes" 
            value={stats?.urgent || 0} 
            subtext="Items requiring immediate surge"
            icon={AlertCircle}
            color="#ef4444"
          />
          <GlassMetric 
            label="Architecture" 
            value={tasks.filter(t => t.project_category === 'Design').length} 
            subtext="Design system contributions"
            icon={Layers}
            color="#8b5cf6"
          />
        </div>

        {/* Detailed Distribution Analysis */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-12 rounded-[56px] border border-gray-100 shadow-sm relative overflow-hidden">
             <div className="flex items-center justify-between mb-12 relative z-10">
                <div>
                   <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tighter">Strategic Distribution</h2>
                   <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-2">Workload volume by organizational category</p>
                </div>
                <button className="flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 rounded-2xl text-[12px] font-black hover:opacity-90 transition-all shadow-xl shadow-black/10">
                   Export Data <ArrowUpRight size={14} />
                </button>
             </div>

             <div className="grid grid-cols-2 gap-16 relative z-10">
                <div className="space-y-8">
                  {['Design', 'Development', 'Marketing', 'Management'].map((cat, i) => {
                    const count = tasks.filter(t => t.project_category === cat).length;
                    const total = tasks.length || 1;
                    const pct = Math.round((count / total) * 100);
                    const colors = ['#8B5CF6', '#06B6D4', '#F5C842', '#FF8199'];
                    return (
                      <div key={cat} className="space-y-3">
                        <div className="flex justify-between items-end">
                          <div className="flex items-center gap-2">
                             <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
                             <span className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-widest">{cat}</span>
                          </div>
                          <span className="text-xs font-black text-gray-300 antialiased">{count} Units ({pct}%)</span>
                        </div>
                        <div className="w-full h-3 bg-gray-50 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${pct}%` }}
                             transition={{ delay: i * 0.1, duration: 1 }}
                             className="h-full rounded-full" 
                             style={{ backgroundColor: colors[i] }}
                           />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-[#F9FAFB] rounded-[40px] p-10 flex flex-col items-center justify-center text-center">
                   <BarChart3 size={48} className="text-gray-300 mb-6" />
                   <h3 className="text-lg font-black text-[#1A1A1A] tracking-tight mb-2">Aggregate Velocity Data</h3>
                   <p className="text-[13px] font-semibold text-gray-400 max-w-xs leading-relaxed">
                     Automated assessment shows a <span className="text-black font-black">15% increase</span> in throughput compared to last sprint cycles.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
