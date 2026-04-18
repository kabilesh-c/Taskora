'use client';

import { Bell, Zap, Users, ShieldAlert, CheckCircle2, MoreHorizontal, Search, Settings2, Trash2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NOTIFICATIONS = [
  { 
    id: 1, 
    type: 'priority', 
    title: 'Critical Deadline Imminent', 
    message: 'Architecture Review for "Design System" is due in 4 hours. Ensure all assets are synced.', 
    time: '42m ago',
    color: '#EF4444',
    icon: ShieldAlert,
    unread: true
  },
  { 
    id: 2, 
    type: 'team', 
    title: 'Arjun Das mentioned you', 
    message: '@kabi the performance intelligence metrics look ready for the executive surge.', 
    time: '2h ago',
    color: '#06B6D4',
    icon: Users,
    unread: true
  },
  { 
    id: 3, 
    type: 'system', 
    title: 'Database Sync Success', 
    message: 'Supabase PostgreSQL connection stabilized. 128 items successfully indexed.', 
    time: '5h ago',
    color: '#10B981',
    icon: CheckCircle2,
    unread: false
  },
  { 
    id: 4, 
    type: 'priority', 
    title: 'New Mission Objective', 
    message: 'Strategic objective "Weboin Pulse" has been assigned to your workspace.', 
    time: '1d ago',
    color: '#F59E0B',
    icon: Zap,
    unread: false
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto font-sans">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Intelligence Stream Header */}
        <header className="flex items-end justify-between border-b border-gray-100 pb-10 relative">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-[20px] bg-[#1A1A1A] flex items-center justify-center shadow-xl">
                 <Bell size={24} className="text-[#FCE764]" />
               </div>
               <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">Intelligence Stream</span>
             </div>
             <h1 className="text-6xl font-black tracking-tighter text-[#1A1A1A]">Mission Control</h1>
             <p className="text-gray-500 font-medium text-lg antialiased">Strategic real-time updates and tactical communications.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <button className="h-12 w-12 flex items-center justify-center rounded-2xl border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-black transition-all">
               <Settings2 size={18} strokeWidth={2.5} />
             </button>
             <button className="h-12 w-12 flex items-center justify-center rounded-2xl border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-black transition-all text-red-400 hover:text-red-500">
               <Trash2 size={18} strokeWidth={2.5} />
             </button>
          </div>
        </header>

        {/* Global Search and Filter Strip */}
        <div className="flex items-center justify-between gap-6">
           <div className="relative group flex-1">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} strokeWidth={3} />
             <input 
               type="text" 
               placeholder="Identify signal..." 
               className="w-full bg-[#F9FAFB] border-none rounded-[28px] pl-16 pr-8 py-5 text-sm font-bold focus:ring-4 focus:ring-black/5 outline-none transition-all placeholder:text-gray-300"
             />
           </div>
           
           <div className="flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
              <button className="px-6 py-2 rounded-xl bg-white text-black text-[11px] font-black shadow-sm">All Signals</button>
              <button className="px-6 py-2 rounded-xl text-gray-400 text-[11px] font-black hover:text-black transition-colors">Unread</button>
           </div>
        </div>

        {/* Intelligence Cards Container */}
        <div className="space-y-4 pb-20">
           {NOTIFICATIONS.map((note, i) => (
             <motion.div
               key={note.id}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.05 }}
               className={`group relative overflow-hidden bg-white border ${note.unread ? 'border-gray-200' : 'border-gray-100'} p-8 rounded-[40px] flex items-center gap-8 transition-all hover:shadow-2xl hover:translate-y-[-4px] cursor-pointer`}
             >
                {/* Status Dot */}
                {note.unread && (
                  <div className="absolute top-8 left-8 w-2 h-2 rounded-full" style={{ backgroundColor: note.color }} />
                )}

                {/* Styled Icon */}
                <div 
                  className="w-16 h-16 shrink-0 rounded-[28px] flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: `${note.color}10`, color: note.color }}
                >
                  <note.icon size={28} strokeWidth={2.5} />
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl font-black tracking-tight ${note.unread ? 'text-[#1A1A1A]' : 'text-gray-500'}`}>{note.title}</h3>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{note.time}</span>
                  </div>
                  <p className="text-[13px] font-semibold text-gray-400 antialiased leading-relaxed max-w-xl">
                    {note.message}
                  </p>
                </div>

                {/* Action Hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-black hover:text-white transition-all">
                      <MoreHorizontal size={16} />
                   </button>
                </div>

                {/* Type Indicator */}
                <div 
                  className="absolute bottom-[-1px] left-8 px-4 py-1 rounded-t-xl text-[9px] font-black uppercase tracking-widest text-white"
                  style={{ backgroundColor: note.color }}
                >
                  {note.type}
                </div>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Background Decorative Flare */}
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FCE764]/5 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
}
