'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter, usePathname } from 'next/navigation';
import { TourProvider } from '@/components/onboarding/TourProvider';
import TourTooltip from '@/components/onboarding/TourTooltip';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  FolderOpen,
  BarChart2,
  Bell,
  Settings,
  Plus,
  LogOut,
  Zap
} from 'lucide-react';
import AddTaskModal from '@/components/tasks/AddTaskModal';

const sideNavItems = [
  { icon: LayoutDashboard, href: '/dashboard', label: 'Dashboard' },
  { icon: FolderOpen, href: '/dashboard/tasks', label: 'Tasks' },
  { icon: BarChart2, href: '/dashboard/analytics', label: 'Analytics' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (user?.email === 'demo@weboin.com' || user?.email === process.env.NEXT_PUBLIC_DEMO_EMAIL) {
      setIsDemoMode(true);
    }
  }, [user]);

  // Global listener for Add Task button in yellow rail
  useEffect(() => {
    const handler = () => setModalOpen(true);
    window.addEventListener('open-add-task-modal', handler);
    return () => window.removeEventListener('open-add-task-modal', handler);
  }, []);

  const handleTaskCreated = () => {
    setModalOpen(false);
    // Signal to all pages to refresh their data
    window.dispatchEvent(new CustomEvent('task-created'));
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#DDE0E5] flex items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-[#FDE047] flex items-center justify-center animate-pulse shadow-xl">
           <Zap size={24} className="text-black" />
        </div>
      </div>
    );
  }

  const userInitials = user?.full_name
    ? user.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'WB';

  return (
    <div className="flex h-screen bg-white w-full overflow-hidden font-sans">
      {/* The App Window Frame */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Main Content Area (Light Theme Container) */}
        <main className="flex-1 flex flex-col min-w-0 bg-white z-10 overflow-hidden">
          {children}
        </main>

        {/* The Right Panel and Yellow Rail are structural, we will let RightPanel sit inside page.tsx or here?
            The reference image has Right panel integrated into the view. But since this is layout, we need navigation.
            Actually, RightPanel only applies to dashboard page! The Tasks page shouldn't necessarily have it.
            So we should ONLY keep the Far Right Yellow Rail here in layout!
        */}

        {/* ── Far Right Yellow Tool Rail (Main Nav) ── */}
        <aside 
          className="w-[66px] flex flex-col items-center py-5 shrink-0 z-20 overflow-hidden" 
          style={{ background: '#FCE764' }}
        >
          {/* User Avatar */}
          <div className="w-11 h-11 rounded-full bg-[#202020] flex items-center justify-center text-white font-bold text-sm mb-4 shadow-lg border-2 border-transparent hover:border-black transition-colors cursor-pointer relative group">
            {userInitials}
            {/* Quick Profile Tooltip */}
            <div className="absolute right-14 top-0 bg-[#202020] text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              {user?.full_name || 'Weboin User'}
            </div>
          </div>

          {/* Add Button */}
          <button
            className="w-10 h-10 rounded-full bg-[#202020] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl mb-8"
            data-tour="add-task-btn"
            onClick={() => window.dispatchEvent(new CustomEvent('open-add-task-modal'))}
          >
            <Plus size={20} />
          </button>

          {/* Navigation Group */}
          <nav className="flex flex-col gap-6 w-full items-center">
            {sideNavItems.map(({ icon: Icon, href, label }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} className="relative group flex items-center justify-center w-full">
                  <div className={`transition-all duration-200 ${isActive ? 'text-black scale-110 drop-shadow-md' : 'text-black/50 hover:text-black hover:scale-110'}`}>
                     <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  {/* Nav Tooltip */}
                  <div className="absolute right-14 bg-[#202020] text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                    {label}
                  </div>
                </Link>
              );
            })}
            
            <Link 
              href="/dashboard/notifications"
              className={`relative group transition-all duration-200 flex justify-center w-full ${pathname === '/dashboard/notifications' ? 'text-black scale-110 drop-shadow-md' : 'text-black/50 hover:text-black hover:scale-110'}`}
            >
              <Bell size={22} strokeWidth={pathname === '/dashboard/notifications' ? 2.5 : 2} />
              <span className="absolute top-0 right-3 w-2 h-2 bg-[#FF5F55] rounded-full border border-[#FCE764]"></span>
               {/* Nav Tooltip */}
               <div className="absolute right-14 top-1/2 -translate-y-1/2 bg-[#202020] text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                Notifications
              </div>
            </Link>
          </nav>

          {/* Bottom Controls */}
          <div className="mt-auto flex flex-col gap-6 w-full items-center">
             <Link 
               href="/dashboard/settings" 
               className={`transition-all duration-200 ${pathname === '/dashboard/settings' ? 'text-black scale-110 drop-shadow-md' : 'text-black/50 hover:text-black hover:scale-110'}`}
             >
               <Settings size={22} strokeWidth={pathname === '/dashboard/settings' ? 2.5 : 2} />
               <div className="absolute right-14 bg-[#202020] text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                 Settings
               </div>
             </Link>
             <button onClick={logout} className="w-10 h-10 rounded-full bg-black/10 hover:bg-[#FF5F55] hover:text-white text-black/60 flex flex-col items-center justify-center transition-all duration-200 group relative">
               <LogOut size={16} className="relative -left-[1px]" />
               <div className="absolute right-14 bg-[#202020] text-white text-[11px] font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-lg">
                 Logout
               </div>
             </button>
          </div>
        </aside>
      </div>

      {/* Global Add Task Modal */}
      <AddTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleTaskCreated}
        isDemoMode={isDemoMode}
      />
    </div>
  );
}
