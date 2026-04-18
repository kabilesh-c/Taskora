'use client';

import { Users, Mail, Shield, MoreHorizontal, UserPlus, Search, Fingerprint, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const TEAM_MEMBERS = [
  { name: 'Arjun Das', role: 'Project Lead', email: 'arjun@weboin.com', avatar: 'AD', color: '#FCA5A5', status: 'Active' },
  { name: 'Priya Sharma', role: 'UI/UX Designer', email: 'priya@weboin.com', avatar: 'PS', color: '#93C5FD', status: 'In Meeting' },
  { name: 'Kavi Kumaran', role: 'Frontend Dev', email: 'kavi@weboin.com', avatar: 'KK', color: '#FDE68A', status: 'Focusing' },
  { name: 'Ravi Raj', role: 'Backend Dev', email: 'ravi@weboin.com', avatar: 'RR', color: '#A7F3D0', status: 'Active' },
  { name: 'Nisha Singh', role: 'Marketing', email: 'nisha@weboin.com', avatar: 'NS', color: '#C4B5FD', status: 'Offline' },
  { name: 'Rajesh V', role: 'SEO Specialist', email: 'rajesh@weboin.com', avatar: 'RV', color: '#F9A8D4', status: 'Active' },
];

export default function TeamPage() {
  return (
    <div className="flex-1 bg-white p-8 overflow-y-auto font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Identity Hub Header */}
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-12 border-b border-gray-100 relative">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 rounded-[20px] bg-[#1A1A1A] flex items-center justify-center shadow-xl">
                 <Fingerprint size={24} className="text-[#FCE764]" />
               </div>
               <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">Governance & Directory</span>
             </div>
             <h1 className="text-6xl font-black tracking-tighter text-[#1A1A1A]">Team Identity</h1>
             <p className="text-gray-500 font-medium text-lg antialiased">Strategic management of organizational human capital and permissions.</p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="bg-gray-50 p-2 rounded-2xl flex items-center gap-1 border border-gray-100">
                <div className="px-5 py-2 rounded-xl bg-white text-black text-[11px] font-black shadow-sm">Directory</div>
                <div className="px-5 py-2 rounded-xl text-gray-400 text-[11px] font-black hover:text-black transition-colors">Permissions</div>
             </div>
             <button className="bg-[#1A1A1A] text-white px-10 py-4 rounded-3xl text-[14px] font-black flex items-center gap-3 hover:translate-y-[-2px] active:translate-y-[0px] transition-all shadow-2xl shadow-black/20">
                <UserPlus size={18} strokeWidth={3} /> Onboard Member
             </button>
          </div>
        </header>

        {/* Global Directory Search */}
        <div className="relative group max-w-2xl">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={20} strokeWidth={3} />
           <input 
             type="text" 
             placeholder="Search by name, role or core competency..." 
             className="w-full bg-[#F9FAFB] border-none rounded-[32px] pl-16 pr-8 py-6 text-sm font-bold focus:ring-4 focus:ring-black/5 outline-none transition-all placeholder:text-gray-300 shadow-inner"
           />
        </div>

        {/* Members Grid - High Fidelity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.email}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-gray-100 p-8 rounded-[48px] flex flex-col items-center text-center hover:shadow-2xl hover:border-transparent hover:translate-y-[-8px] transition-all group relative overflow-hidden"
            >
              {/* Background Glow */}
              <div 
                className="absolute top-0 left-0 w-full h-2 group-hover:h-3 transition-all"
                style={{ backgroundColor: member.color }}
              />

              <div className="relative mb-6">
                 <div 
                   className="w-28 h-28 rounded-[40px] flex items-center justify-center text-3xl font-black text-white shadow-2xl border-4 border-white transform rotate-3 group-hover:rotate-0 transition-transform"
                   style={{ backgroundColor: member.color }}
                 >
                   {member.avatar}
                 </div>
                 <div className={`absolute bottom-2 right-[-4px] w-6 h-6 rounded-full border-4 border-white ${member.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`} />
              </div>

              <h3 className="text-2xl font-black text-[#1A1A1A] tracking-tighter mb-1">{member.name}</h3>
              <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">{member.role}</p>

              <div className="w-full flex items-center justify-center gap-2 mb-8">
                 <span className="flex items-center gap-1.5 text-[10px] font-black text-black/40 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <Shield size={12} strokeWidth={3} /> Admin
                 </span>
                 <span className="flex items-center gap-1.5 text-[10px] font-black text-black/40 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                    <Zap size={12} strokeWidth={3} /> Core
                 </span>
              </div>

              <div className="w-full grid grid-cols-2 gap-3 mt-auto">
                 <button className="py-4 rounded-2xl bg-[#F9FAFB] text-[11px] font-black text-[#1A1A1A] hover:bg-black hover:text-white transition-all">
                    Profile
                 </button>
                 <button className="py-4 rounded-2xl bg-[#F9FAFB] text-[11px] font-black text-[#1A1A1A] hover:bg-black hover:text-white transition-all">
                    Direct Message
                 </button>
              </div>

              {/* Status Indicator Bar */}
              <div className="mt-6 w-full flex items-center gap-2">
                 <Activity size={12} className="text-gray-300" />
                 <span className="text-[10px] font-bold text-gray-400">Current Status: <span className="text-black">{member.status}</span></span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
