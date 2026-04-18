'use client';

import { 
  Settings, 
  User, 
  Lock, 
  Bell, 
  Palette, 
  LogOut, 
  ShieldCheck, 
  CreditCard,
  Building,
  ChevronRight,
  Zap,
  CheckCircle2,
  HardDrive
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="flex-1 bg-[#F9FAFB] flex flex-col overflow-hidden font-sans">
      
      {/* Settings Top Bar */}
      <div className="bg-white border-b border-gray-100 px-12 py-8 shrink-0">
         <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-2xl bg-[#FCE764] flex items-center justify-center shadow-lg shadow-yellow-400/20">
                 <Settings size={20} className="text-black" />
               </div>
               <h1 className="text-3xl font-black tracking-tighter text-[#1A1A1A]">Workspace Identity</h1>
            </div>
            <div className="flex items-center gap-3">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                 System: Stable
               </span>
               <button className="bg-black text-white px-6 py-2.5 rounded-2xl text-[12px] font-black hover:opacity-90 transition-all shadow-xl shadow-black/10">
                 Save Configurations
               </button>
            </div>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto px-12 py-12 scrollbar-thin scrollbar-thumb-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-10">
          
          {/* Left Sidebar - Navigation */}
          <div className="col-span-12 lg:col-span-4 space-y-2">
             <div className="bg-white rounded-[40px] p-4 border border-gray-100 shadow-sm space-y-1">
                {[
                  { icon: User, label: 'Profile Identity', active: true },
                  { icon: Building, label: 'Workspace Assets', active: false },
                  { icon: Lock, label: 'Security & Access', active: false },
                  { icon: Bell, label: 'Mission Intervals', active: false },
                  { icon: Palette, label: 'Interface Tuning', active: false },
                  { icon: ShieldCheck, label: 'Compliance', active: false },
                  { icon: CreditCard, label: 'Subscription', active: false },
                ].map((item) => (
                  <button 
                    key={item.label}
                    className={`w-full flex items-center justify-between p-4 rounded-3xl transition-all group ${item.active ? 'bg-[#1A1A1A] text-white shadow-xl' : 'text-gray-400 hover:bg-gray-50 hover:text-black'}`}
                  >
                    <div className="flex items-center gap-4">
                       <item.icon size={18} strokeWidth={item.active ? 3 : 2} />
                       <span className={`text-[13px] font-black tracking-tight ${item.active ? 'text-white' : 'text-inherit'}`}>{item.label}</span>
                    </div>
                    {item.active && <ChevronRight size={16} />}
                  </button>
                ))}
             </div>

             {/* Support Card */}
             <div className="bg-[#1A1A1A] rounded-[40px] p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                   <Zap size={24} className="text-[#FCE764] mb-4" />
                   <h3 className="text-lg font-black tracking-tight mb-2">Priority Support</h3>
                   <p className="text-[11px] font-medium text-gray-400 mb-6 antialiased leading-relaxed">Dedicated infrastructure concierge for elite level accounts.</p>
                   <button className="w-full py-3 rounded-2xl bg-[#FCE764] text-black text-[12px] font-black hover:scale-[1.02] transition-all">
                      Open Console
                   </button>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#FCE764]/10 transition-all" />
             </div>
          </div>

          {/* Right Area - Content */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* User Profile Header */}
            <div className="bg-white rounded-[56px] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
               <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-[48px] bg-gradient-to-tr from-[#06B6D4] to-[#FCE764] p-1 shadow-2xl">
                       <div className="w-full h-full rounded-[44px] bg-white flex items-center justify-center text-4xl font-black text-[#1A1A1A]">
                         {user?.full_name?.split(' ').map(n=>n[0]).join('') || 'WB'}
                       </div>
                    </div>
                    <button className="absolute bottom-0 right-[-4px] w-10 h-10 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center hover:scale-110 transition-all shadow-xl">
                       <Palette size={16} />
                    </button>
                  </div>
                  
                  <div className="text-center md:text-left flex-1">
                     <h2 className="text-4xl font-black text-[#1A1A1A] tracking-tighter mb-1">{user?.full_name || 'Weboin User'}</h2>
                     <p className="text-gray-400 font-bold text-sm antialiased">{user?.email || 'user@weboin.com'}</p>
                     
                     <div className="flex items-center justify-center md:justify-start gap-3 mt-6">
                        <span className="px-4 py-1.5 rounded-full bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest border border-green-100 flex items-center gap-1.5">
                           <CheckCircle2 size={12} /> Verified
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-widest border border-gray-100">
                           Enterprise Tier
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            {/* General Information Section */}
            <div className="bg-white rounded-[56px] p-12 border border-gray-100 shadow-sm">
               <h3 className="text-2xl font-black text-[#1A1A1A] tracking-tighter mb-8 px-2">Account Parameters</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 {[
                   { label: 'Full Display Name', value: user?.full_name || 'Kabi Guru' },
                   { label: 'Network Location', value: 'Bangalore, India' },
                   { label: 'Identity Protocol', value: user?.email || 'admin@weboin.com' },
                   { label: 'Operational Role', value: 'Founder & CEO' },
                 ].map((field) => (
                   <div key={field.label} className="space-y-2 px-2">
                      <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-1">{field.label}</label>
                      <input 
                        type="text" 
                        defaultValue={field.value} 
                        className="w-full bg-[#F9FAFB] border-none rounded-2xl px-6 py-4 text-[13px] font-bold text-[#1A1A1A] focus:ring-4 focus:ring-black/5 outline-none transition-all shadow-inner"
                      />
                   </div>
                 ))}
               </div>

               <div className="mt-12 px-2">
                  <label className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] ml-1">Professional Abstract</label>
                  <textarea 
                    className="w-full bg-[#F9FAFB] border-none rounded-3xl px-6 py-4 mt-2 text-[13px] font-bold text-[#1A1A1A] focus:ring-4 focus:ring-black/5 outline-none transition-all shadow-inner resize-none h-32"
                    defaultValue="Leading strategic initiatives at Weboin with a focus on high-fidelity user experiences and scalable agency performance."
                  />
               </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50/50 rounded-[56px] p-12 border border-red-100 space-y-6">
               <div className="flex items-center gap-3">
                  <AlertCircle className="text-red-500" size={24} />
                  <h3 className="text-2xl font-black text-red-900 tracking-tighter">System Termination</h3>
               </div>
               <p className="text-[13px] font-semibold text-red-700/60 max-w-xl leading-relaxed">
                  Deactivating this account will permanently purge all mission data, team logs, and asset allocations. This action is irreversible.
               </p>
               <button onClick={logout} className="bg-white border-2 border-red-100 text-red-500 hover:bg-red-500 hover:text-white px-8 py-3.5 rounded-2xl text-[13px] font-black transition-all">
                  Request Data Purge
               </button>
            </div>
            
         </div>
        </div>
      </div>
    </div>
  );
}

function AlertCircle({ size, className }: { size: number, className: string }) {
  return (
    <div className={className}>
      {/* Lucide replacement if needed or just use it from lucide-react */}
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    </div>
  )
}
