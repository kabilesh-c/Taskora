'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import api from '@/lib/api';
import { TaskListResponse } from '@/lib/types';
import { LayoutDashboard, Users, UserCircle, Briefcase, Calendar, MessageSquare, LogOut, FileCode2, Clock, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [tasksData, setTasksData] = useState<TaskListResponse | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Client-side protection
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    
    // Check if demo user
    if (user?.email === process.env.NEXT_PUBLIC_DEMO_EMAIL || 'demo@weboin.com') {
      setIsDemoMode(true);
    }
  }, [user, isAuthenticated, isLoading, router]);

  useEffect(() => {
    // Fetch initial tasks to prove wiring works
    const fetchTasks = async () => {
      try {
        const res = await api.get('/tasks');
        setTasksData(res.data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      }
    };
    
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-screen bg-dark-bg flex items-center justify-center text-white">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-[#141416] text-white font-sans overflow-hidden">
      
      {/* Left Icon Sidebar (Dark matching Bordup/Flantasy ref) */}
      <aside className="w-[72px] bg-[#0A0A0A] border-r border-[#2A2A2A] flex flex-col items-center py-6 shrink-0 z-20 shadow-xl">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(124,58,237,0.5)] cursor-pointer hover:scale-105 transition-transform">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        
        <nav className="flex-1 flex flex-col gap-6 w-full items-center">
          <NavItem icon={<LayoutDashboard size={22} />} active />
          <NavItem icon={<Calendar size={22} />} />
          <NavItem icon={<Briefcase size={22} />} />
          <NavItem icon={<MessageSquare size={22} />} />
          <NavItem icon={<Users size={22} />} />
        </nav>
        
        <div className="mt-auto flex flex-col gap-6 w-full items-center">
          <NavItem icon={<UserCircle size={22} />} />
          <button onClick={logout} className="p-3 text-gray-500 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all">
            <LogOut size={22} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Banner for demo mode */}
        {isDemoMode && (
          <div className="bg-amber-500/20 border-b border-amber-500/30 text-amber-200 text-sm py-2 px-8 flex justify-center items-center">
            You&apos;re in Demo Mode — data is read-only
          </div>
        )}
        
        {/* Top Navbar */}
        <header className="h-20 shrink-0 px-8 flex items-center justify-between border-b border-[#2A2A2A]">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">May, 2025 <span className="text-gray-500 ml-1 text-lg">v</span></h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="bg-[#2A2A2A] rounded-full p-1 flex">
              <button className="px-4 py-1.5 rounded-full bg-[#1A1A1A] text-white text-sm font-medium shadow-sm">Card</button>
              <button className="px-4 py-1.5 rounded-full text-gray-400 text-sm font-medium hover:text-white">Block</button>
              <button className="px-4 py-1.5 rounded-full text-gray-400 text-sm font-medium hover:text-white">Table</button>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Show: <span className="text-white hover:underline cursor-pointer">1 Week v</span></span>
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors">
                <Users size={16} /> Share
              </button>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content Container */}
        <div className="flex-1 overflow-auto p-8 relative">
          
          {/* Phase 2 Placeholder Overlay */}
          <div className="absolute inset-0 z-10 bg-[#141416]/60 backdrop-blur-sm flex items-center justify-center p-8">
            <div className="max-w-md w-full bg-[#1E1E1E] border border-[#333] rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileCode2 size={32} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Dashboard Coming in Phase 2</h2>
                <p className="text-gray-400 mb-8">
                    The full kanban board, voice task creation, and analytics will be built in the next phase. API connection is active.
                </p>
                
                {tasksData && (
                    <div className="bg-[#141416] border border-[#2A2A2A] rounded-xl p-4 flex gap-4 text-left cursor-default">
                        <div className="flex-1">
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block mb-1">Total Tasks found</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-white">{tasksData.total}</span>
                                <span className="text-sm text-gray-400">seeded items</span>
                            </div>
                        </div>
                        <div className="w-px bg-[#2A2A2A]"></div>
                        <div className="flex-1 flex flex-col justify-center">
                             <div className="flex items-center gap-2 text-sm text-emerald-400 mb-1">
                                <CheckCircle2 size={14} /> API Connected
                             </div>
                             <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Clock size={14} /> Supabase DB sync
                             </div>
                        </div>
                    </div>
                )}
            </div>
          </div>

          {/* Dummy background content matching the design */}
          <div className="grid grid-cols-5 gap-6 h-full opacity-50 pointer-events-none">
            <div className="col-span-3 flex flex-col gap-6">
                {/* Calendar grid mock */}
                <div className="flex-1 border border-[#2A2A2A] rounded-3xl p-6 relative overflow-hidden flex flex-col">
                    <div className="flex justify-between border-b border-[#2A2A2A] pb-4 mb-4">
                        <div className="text-center w-1/5"><div className="text-3xl font-light">17</div><div className="text-xs text-gray-500 uppercase">Mon</div></div>
                        <div className="text-center w-1/5"><div className="text-3xl font-light text-primary">18</div><div className="text-xs text-primary font-medium uppercase">Tue</div></div>
                        <div className="text-center w-1/5"><div className="text-3xl font-light">19</div><div className="text-xs text-gray-500 uppercase">Wed</div></div>
                        <div className="text-center w-1/5"><div className="text-3xl font-light">20</div><div className="text-xs text-gray-500 uppercase">Thu</div></div>
                        <div className="text-center w-1/5"><div className="text-3xl font-light">21</div><div className="text-xs text-gray-500 uppercase">Fri</div></div>
                    </div>
                    {/* Dummy cards */}
                    <div className="relative flex-1">
                        <div className="absolute top-4 left-[5%] w-1/5">
                            <div className="bg-amber-300 rounded-3xl p-4 text-amber-900 shadow-lg h-32">
                                <div className="font-bold mb-1">Calling Customer</div>
                                <div className="text-xs opacity-80">9:25 - 10:15</div>
                            </div>
                        </div>
                        <div className="absolute top-20 left-[25%] w-1/5">
                            <div className="bg-primary/80 backdrop-blur rounded-3xl p-4 text-white shadow-lg h-48 border border-white/20">
                                <div className="font-bold mb-1">Design Meet</div>
                                <div className="text-xs opacity-80">10:30 - 14:00</div>
                            </div>
                        </div>
                        <div className="absolute top-8 left-[45%] w-1/5">
                            <div className="bg-pink-400 rounded-3xl p-4 text-pink-900 shadow-lg h-40">
                                <div className="font-bold mb-1">Sprint Review</div>
                                <div className="text-xs opacity-80">11:00 - 12:30</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Stats row mock */}
                <div className="h-64 flex gap-6">
                    <div className="flex-1 bg-[#222] rounded-3xl p-6 border border-[#333]">
                        <h3 className="text-gray-400 text-sm mb-4">Task Statistics</h3>
                        {/* Half donut mock */}
                        <div className="w-full h-24 relative overflow-hidden rounded-t-full border-t-[12px] border-l-[12px] border-r-[12px] border-emerald-500 mt-4">
                            <div className="absolute top-0 right-0 w-1/4 h-full border-t-[12px] border-r-[12px] border-red-500 rounded-tr-full -mt-3 -mr-3"></div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div><div className="text-2xl font-bold">75%</div><div className="text-xs text-gray-500">Completed</div></div>
                            <div className="text-right"><div className="text-2xl font-bold">25%</div><div className="text-xs text-gray-500">Unfulfilled</div></div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#222] rounded-3xl p-6 border border-[#333]">
                        <h3 className="text-gray-400 text-sm mb-4">Your Activity</h3>
                        <div className="flex items-end gap-2 h-32 mt-4">
                            <div className="flex-1 bg-gray-600 rounded-t-md h-12"></div>
                            <div className="flex-1 bg-gray-600 rounded-t-md h-24"></div>
                            <div className="flex-1 bg-primary rounded-t-md h-full"></div>
                            <div className="flex-1 bg-gray-600 rounded-t-md h-16"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-span-2 flex flex-col gap-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold">F</div>
                        <span className="text-gray-400 text-sm font-medium">Flantasy</span>
                    </div>
                    <span className="text-primary text-sm hover:underline cursor-pointer">CD Share</span>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Urgent Tasks (5)</h2>
                
                {/* List Cards */}
                <div className="bg-rose-400 rounded-3xl p-5 text-rose-950 font-medium">
                    <div className="text-xs opacity-70 mb-1">Time: 8:00 - 13:00</div>
                    <div className="text-xl font-bold mb-4">Design System</div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="bg-rose-950 text-rose-100 px-3 py-1 rounded-full">In progress</span>
                        <span>67%</span>
                    </div>
                </div>
                <div className="bg-primary rounded-3xl p-5 text-white font-medium">
                    <div className="text-xs opacity-70 mb-1">Time: 14:00 - 16:00 <span className="text-amber-300 ml-2">★ Important</span></div>
                    <div className="text-xl font-bold mb-4">Designers Meeting</div>
                    <div className="bg-white/10 rounded-xl p-3 flex justify-between items-center text-sm">
                        <span>meet.google.com/mxh-...</span>
                    </div>
                </div>
                <div className="bg-cyan-200 rounded-3xl p-5 text-cyan-950 font-medium">
                    <div className="text-xs opacity-70 mb-1">Time: 17:00 - 18:00</div>
                    <div className="text-xl font-bold mb-2">Make Report</div>
                </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Yellow Tool Rail Toolbar */}
      <aside className="w-[60px] bg-yellow-300 m-4 rounded-[30px] flex flex-col items-center py-6 shrink-0 z-20 overflow-hidden shadow-2xl">
         <div className="w-10 h-10 rounded-full border-2 border-black overflow-hidden mb-6">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
         </div>
         <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center mb-8">+</button>
         
         <div className="flex-1 flex flex-col gap-6 w-full items-center">
            <div className="w-6 h-6 rounded-full bg-[#141416]/20"></div>
            <div className="w-6 h-6 rounded-full bg-[#141416]/20 relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-yellow-300"></div>
            </div>
            <div className="w-10 h-10 rounded-[14px] bg-black text-white flex items-center justify-center mt-4">
                <MessageSquare size={18} />
            </div>
         </div>
         
         <div className="bg-black/5 rounded-full p-2 flex flex-col gap-4 mt-auto mb-6">
            <button className="text-black/60 hover:text-black transition-colors"><Briefcase size={20} /></button>
            <button className="text-black/60 hover:text-black transition-colors"><FileCode2 size={20} /></button>
         </div>
         
         <div className="w-6 h-6 rounded-full bg-black/20"></div>
      </aside>

    </div>
  );
}

function NavItem({ icon, active = false }: { icon: React.ReactNode, active?: boolean }) {
  return (
    <button className={`p-3 rounded-xl transition-all w-12 flex justify-center ${active ? 'bg-primary/10 text-primary border border-primary/20 shadow-sm' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}>
      {icon}
    </button>
  );
}
