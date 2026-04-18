'use client';

import React, { useState } from 'react';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import StatsCard from '@/components/dashboard/StatsCard';
import { Eye, Clock, LogOut, ArrowUpRight, DollarSign, CheckCircle, ChevronDown, Download, Share2, MoreVertical } from 'lucide-react';

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('Last 7D');

  const stats = [
    { label: 'Total Visits', value: '315,480', change: '12.5%', isPositive: true, icon: Eye, color: 'blue' },
    { label: 'Avg. Session', value: '04:18', change: '-0.8%', isPositive: false, icon: Clock, color: 'gray' },
    { label: 'Bounce Rate', value: '28.4%', change: '1.2%', isPositive: true, icon: LogOut, color: 'gray' },
    { label: 'Total Revenue', value: '$89,250', change: '15.3%', isPositive: true, icon: DollarSign, color: 'green' },
    { label: 'Conversions', value: '21,500', change: '9.7%', isPositive: true, icon: CheckCircle, color: 'green' },
  ];

  const timeRanges = ['Today', 'Last 7D', '1M', '3M', '1Y'];

  return (
    <div className="flex-1 flex flex-col bg-[#141416] overflow-hidden">
      
      {/* Page Header */}
      <header className="h-20 shrink-0 px-8 flex items-center justify-between border-b border-[#2A2A2A]">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Advanced Reports</h1>
          <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md border border-emerald-500/20">
            Live Analytics
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-500 hover:text-white transition-colors">
            <Share2 size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:text-white transition-colors">
            <Download size={20} />
          </button>
          <div className="w-px h-6 bg-[#2A2A2A] mx-2"></div>
          <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-2">
            Generate PDF
          </button>
        </div>
      </header>

      {/* Reports Content Area */}
      <div className="flex-1 overflow-auto p-8 custom-scrollbar">
        
        {/* Main Chart Section */}
        <section className="bg-[#1E1E1E]/50 backdrop-blur-xl border border-[#2A2A2A] rounded-[32px] p-8 mb-8 relative overflow-hidden group">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Real-time Visits & Conversions</h2>
              <p className="text-sm text-gray-500">Monitoring performance metrics across your platform.</p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Legend */}
              <div className="flex items-center gap-6 mr-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Visits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Conversions</span>
                </div>
              </div>
              
              {/* Time Range Selector */}
              <div className="bg-[#141416] p-1 rounded-xl flex border border-[#2A2A2A]">
                {timeRanges.map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      timeRange === range 
                        ? 'bg-[#2A2A2A] text-white shadow-sm' 
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
              
              <button className="p-2 bg-[#2A2A2A] rounded-xl text-gray-400 hover:text-white transition-colors">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
          
          {/* The Chart */}
          <div className="relative z-10">
            <AnalyticsChart />
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatsCard key={idx} {...stat} />
          ))}
        </section>

        {/* Bottom Detailed Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-[#1E1E1E] border border-[#2A2A2A] rounded-[32px] p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-lg text-white">Top Performing Channels</h3>
                <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                  View Full Report <ArrowUpRight size={14} />
                </button>
              </div>
              
              <div className="space-y-6">
                {[
                  { channel: 'Direct Traffic', sessions: '124k', color: 'blue', progress: 75 },
                  { channel: 'Social Media', sessions: '89k', color: 'emerald', progress: 54 },
                  { channel: 'Referral Link', sessions: '42k', color: 'amber', progress: 32 },
                  { channel: 'Search Engine', sessions: '210k', color: 'indigo', progress: 88 },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">{item.channel}</span>
                      <span className="text-sm font-bold text-white">{item.sessions} Sessions</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                       <div 
                         className={`h-full bg-${item.color}-500 rounded-full transition-all duration-1000 group-hover:brightness-125`} 
                         style={{ width: `${item.progress}%` }}
                       ></div>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-primary rounded-[32px] p-8 text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
                   <DollarSign size={24} />
                </div>
                <h3 className="text-2xl font-black mb-3 leading-tight">Maximize your team productivity</h3>
                <p className="text-white/70 text-sm mb-10 leading-relaxed font-medium">
                  Unlock AI-powered insights and professional-grade report generation with our Pro series.
                </p>
                <button className="mt-auto w-full bg-white text-primary font-black uppercase tracking-widest text-xs py-4 rounded-2xl hover:bg-gray-100 hover:scale-105 transition-all shadow-xl active:scale-95">
                  Upgrade to Pro
                </button>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/15 transition-colors"></div>
           </div>
        </div>

      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2A2A2A;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      `}</style>
    </div>
  );
}
