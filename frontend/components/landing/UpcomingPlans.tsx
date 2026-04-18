'use client';

import { useRef } from 'react';
import VariableProximity from '@/components/ui/VariableProximity';

export function UpcomingPlans() {
  const containerRef = useRef(null);

  return (
    <section className="px-6 lg:px-8 max-w-[1280px] mx-auto mb-32">
      
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10">
        <div className="flex flex-col items-start gap-8">
          <h2 ref={containerRef} className="text-[40px] md:text-[56px] font-bold text-bordup-dark leading-[1.1] max-w-[440px] tracking-tight">
            <VariableProximity
              label="Upcoming plans shared publicly."
              className="text-bordup-dark cursor-target p-2"
              fromFontVariationSettings="'wght' 400, 'opsz' 14"
              toFontVariationSettings="'wght' 900, 'opsz' 84"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
            />
          </h2>
          <button className="h-[56px] pl-8 pr-2 bg-bordup-dark text-white rounded-full text-base font-bold flex items-center justify-center hover:bg-black transition-all group cursor-target hover:scale-[1.05] inline-flex w-fit">
            See More
            <div className="ml-4 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
               <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                 <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        <div className="flex flex-col items-end gap-8 text-right">
          <p className="text-gray-500 text-lg max-w-[320px] leading-relaxed">
            Stay updated with our latest roadmap, featuring upcoming tools, policy shifts, and community-driven updates.
          </p>
          <div className="flex items-center gap-4">
             <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 focus:outline-none cursor-target transition-all hover:scale-110">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
             </button>
             <button className="w-12 h-12 rounded-full bg-bordup-orange flex items-center justify-center text-white shadow-lg shadow-orange-500/30 hover:scale-110 transition-all focus:outline-none cursor-target">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
             </button>
             <span className="text-sm font-bold text-bordup-dark ml-3 cursor-default">Explore More</span>
          </div>
        </div>
      </div>

      {/* Massive Gradient Table Container */}
      <div className="w-full bg-gradient-to-br from-purple-100/40 via-white to-pink-100/40 rounded-[64px] p-12 md:p-20 relative overflow-hidden group/container">
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-400/5 rounded-full blur-[100px] group-hover/container:bg-purple-400/10 transition-colors duration-1000"></div>

        {/* Table UI Mockup */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[48px] p-10 md:p-14 shadow-2xl border border-white/60 relative z-10 w-full max-w-[1000px] mx-auto transform transition-transform duration-700 group-hover/container:scale-[1.01]">
          
          <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 bg-bordup-dark rounded-full flex items-center justify-center shadow-lg">
               <div className="w-4 h-4 rounded-full border-[2.5px] border-white relative top-[-1px]"></div>
            </div>
            <span className="font-black text-xl text-bordup-dark tracking-tight">Taskora Pro</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
             <h3 className="text-3xl font-bold text-bordup-dark leading-tight max-w-[400px]">Integrate your vision with our live roadmap</h3>
             <div className="flex gap-3">
                <button className="bg-white/80 border border-gray-100 rounded-full px-5 py-2 text-sm font-bold text-gray-600 shadow-sm flex items-center gap-3 transition-all hover:bg-white hover:shadow-md cursor-target">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg> List
                </button>
                <button className="bg-white/80 border border-gray-100 rounded-full px-5 py-2 text-sm font-bold text-gray-600 shadow-sm flex items-center gap-3 transition-all hover:bg-white hover:shadow-md cursor-target">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/></svg> Board
                </button>
             </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-5 text-sm font-bold text-gray-400 mb-8 border-b border-gray-100 pb-5 px-4">
             <div className="col-span-2">Active Projects</div>
             <div>Lead</div>
             <div>Start</div>
             <div className="text-right">Progress</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-4">
             {[
               { name: "Visual Identity System", lead: "X", start: "Aug 11", status: "In Progress", color: "emerald" },
               { name: "Landing Page Architecture", lead: "Y", start: "Aug 15", status: "Review", color: "cyan" },
               { name: "Core Dashboard Engine", lead: "W", start: "Aug 12", status: "Planning", color: "indigo" }
             ].map((row, i) => (
               <div key={i} className="grid grid-cols-5 items-center py-5 px-4 rounded-3xl transition-all hover:bg-gray-50/80 cursor-target group/row">
                 <div className="col-span-2 text-base font-bold text-bordup-dark group-hover/row:translate-x-1 transition-transform">{row.name}</div>
                 <div className="flex">
                   <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 shadow-sm overflow-hidden">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.lead}`} alt="Avatar" />
                   </div>
                 </div>
                 <div className="text-sm text-gray-500 font-semibold">{row.start}</div>
                 <div className="text-right flex justify-end">
                    <span className={`bg-${row.color}-50 text-${row.color}-500 px-4 py-1.5 text-[11px] font-black rounded-full uppercase tracking-widest`}>
                      {row.status}
                    </span>
                 </div>
               </div>
             ))}
          </div>

        </div>

      </div>

    </section>
  );
}
