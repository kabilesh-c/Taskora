'use client';

import { useRef } from 'react';
import VariableProximity from '@/components/ui/VariableProximity';

export function Features() {
  const containerRef = useRef(null);

  return (
    <section className="bg-white/70 backdrop-blur-2xl rounded-[64px] mx-4 lg:mx-8 px-8 lg:px-16 py-28 mb-24 shadow-sm border border-white/50">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <h2 ref={containerRef} className="text-[40px] md:text-[56px] font-bold text-bordup-dark leading-[1.1] max-w-[600px] tracking-tight">
             <VariableProximity
              label="Streamline your task Management process"
              className="text-bordup-dark cursor-target p-2"
              fromFontVariationSettings="'wght' 400, 'opsz' 14"
              toFontVariationSettings="'wght' 900, 'opsz' 84"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
            />
          </h2>
          <button className="h-[56px] pl-8 pr-2 bg-bordup-dark text-white rounded-full text-base font-bold flex items-center justify-center hover:bg-black transition-all group cursor-target hover:scale-[1.05]">
            2nd Series
            <div className="ml-4 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                 <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Dashboard Mockups Row */}
        <div className="flex flex-col md:flex-row gap-8 mb-20">
          
          {/* Left Mockup */}
          <div className="flex-1 bg-bordup-purple/10 rounded-[40px] p-3 border border-purple-100/50 group cursor-target transition-all hover:bg-bordup-purple/20">
             <div className="bg-white w-full rounded-[32px] h-[340px] shadow-lg border border-gray-100 p-6 flex flex-col relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.01]">
                <div className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-3">
                     <div className="w-6 h-6 bg-bordup-dark rounded-md"></div>
                     <div className="w-24 h-2.5 bg-gray-200 rounded"></div>
                   </div>
                   <div className="flex items-center gap-3">
                     <div className="w-20 h-2.5 bg-gray-200 rounded"></div>
                     <div className="w-8 h-8 rounded-full bg-indigo-100"></div>
                   </div>
                </div>
                
                <div className="mt-4 flex gap-6 h-full">
                  <div className="w-56 bg-gray-50 rounded-2xl p-4">
                     <div className="w-full h-1.5 bg-red-400 mb-6 rounded-full"></div>
                     <div className="w-full h-14 bg-white rounded-xl shadow-sm border border-gray-100 mb-4"></div>
                     <div className="w-full h-32 bg-white rounded-xl shadow-sm border border-gray-100 mb-4 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-20"></div>
                       <div className="absolute bottom-4 right-4 w-6 h-6 bg-orange-500 rounded-full"></div>
                     </div>
                  </div>
                  <div className="w-56 bg-gray-50 rounded-2xl p-4">
                     <div className="w-full h-1.5 bg-blue-400 mb-6 rounded-full"></div>
                     <div className="w-full h-20 bg-white rounded-xl shadow-sm border border-gray-100 mb-4"></div>
                     <div className="w-full h-14 bg-gray-800 rounded-xl shadow-sm mb-4"></div>
                  </div>
                </div>
             </div>
          </div>

          {/* Right Mockup */}
          <div className="flex-1 bg-[#F5F8FF] rounded-[40px] p-3 border border-blue-50 group cursor-target transition-all hover:bg-blue-100/50">
             <div className="bg-white w-full rounded-[32px] h-[340px] shadow-lg border border-gray-100 p-6 flex flex-col transition-transform duration-500 group-hover:scale-[1.01]">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-6">
                  <div className="flex gap-6">
                    <span className="text-sm font-bold text-bordup-dark">List tasks</span>
                    <span className="text-sm font-medium text-gray-400">Board</span>
                    <span className="text-sm font-medium text-gray-400">Calendar</span>
                  </div>
                  <div className="w-28 h-8 bg-purple-100 rounded-full"></div>
                </div>

                <div className="space-y-4">
                  {[1,2,3,4].map(idx => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                       <div className="flex items-center gap-4 w-1/2">
                         <div className={`w-2.5 h-2.5 rounded-full ${idx===1?'bg-orange-400':idx===2?'bg-emerald-400':'bg-purple-400'}`}></div>
                         <div className="w-40 h-2.5 bg-gray-200 rounded"></div>
                       </div>
                       <div className="w-20 h-2.5 bg-gray-100 rounded"></div>
                       <div className="w-24 h-6 bg-gray-100 rounded-full"></div>
                       <div className="flex -space-x-2">
                         <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white shadow-sm"></div>
                         <div className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </div>

        {/* Text Columns Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="group cursor-target p-2 rounded-xl border border-transparent hover:border-bordup-purple/10 transition-colors">
            <h3 className="text-xl font-bold text-bordup-dark mb-4">Solving Confusion Managing Task</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Find our where we simplified schedule and project resolutions through automated tools.
            </p>
          </div>
          <div className="group cursor-target p-2 rounded-xl border border-transparent hover:border-bordup-purple/10 transition-colors">
            <h3 className="text-xl font-bold text-bordup-dark mb-4">Facilitating Team Collaboration</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Platform that builds collaborative numbers creating an environment where communication connects.
            </p>
          </div>
          <div className="group cursor-target p-2 rounded-xl border border-transparent hover:border-bordup-purple/10 transition-colors">
            <h3 className="text-xl font-bold text-bordup-dark mb-4">Maintaining Focus on Important Tasks</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Platforming focus on important tasks to ensure you achieve true management.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
