export function Features() {
  return (
    <section className="bg-white rounded-[48px] mx-4 lg:mx-8 px-6 lg:px-12 py-20 mb-24 shadow-sm border border-gray-100">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <h2 className="text-[32px] md:text-[40px] font-bold text-bordup-dark leading-tight max-w-[400px]">
             Streamline your<br/>task Management process
          </h2>
          <button className="h-[44px] pl-6 pr-1.5 bg-bordup-dark text-white rounded-full text-sm font-semibold flex items-center justify-center hover:bg-black transition-colors group">
            2nd Series
            <div className="ml-3 w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                 <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        {/* Dashboard Mockups Row */}
        <div className="flex flex-col md:flex-row gap-6 mb-16">
          
          {/* Left Mockup */}
          <div className="flex-1 bg-bordup-purple/10 rounded-[24px] p-2 border border-purple-100/50">
             <div className="bg-white w-full rounded-[20px] h-[300px] shadow-sm border border-gray-100 p-4 flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center gap-2">
                     <div className="w-5 h-5 bg-bordup-dark rounded-md"></div>
                     <div className="w-20 h-2 bg-gray-200 rounded"></div>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-16 h-2 bg-gray-200 rounded"></div>
                     <div className="w-6 h-6 rounded-full bg-indigo-100"></div>
                   </div>
                </div>
                
                <div className="mt-4 flex gap-4 h-full">
                  <div className="w-48 bg-gray-50 rounded-xl p-3">
                     <div className="w-full h-1 bg-red-400 mb-4 rounded-full"></div>
                     <div className="w-full h-12 bg-white rounded-lg shadow-sm border border-gray-100 mb-2"></div>
                     <div className="w-full h-24 bg-white rounded-lg shadow-sm border border-gray-100 mb-2 relative overflow-hidden">
                       <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-20"></div>
                       <div className="absolute bottom-2 right-2 w-4 h-4 bg-orange-500 rounded-full"></div>
                     </div>
                  </div>
                  <div className="w-48 bg-gray-50 rounded-xl p-3">
                     <div className="w-full h-1 bg-blue-400 mb-4 rounded-full"></div>
                     <div className="w-full h-16 bg-white rounded-lg shadow-sm border border-gray-100 mb-2"></div>
                     <div className="w-full h-12 bg-gray-800 rounded-lg shadow-sm mb-2"></div>
                  </div>
                </div>
             </div>
          </div>

          {/* Right Mockup */}
          <div className="flex-1 bg-[#F5F8FF] rounded-[24px] p-2 border border-blue-50">
             <div className="bg-white w-full rounded-[20px] h-[300px] shadow-sm border border-gray-100 p-4 flex flex-col">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100 mb-4">
                  <div className="flex gap-4">
                    <span className="text-xs font-bold text-bordup-dark">List tasks</span>
                    <span className="text-xs font-medium text-gray-400">Board</span>
                    <span className="text-xs font-medium text-gray-400">Calendar</span>
                  </div>
                  <div className="w-24 h-6 bg-purple-100 rounded-full"></div>
                </div>

                <div className="space-y-3">
                  {[1,2,3,4].map(idx => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50">
                       <div className="flex items-center gap-3 w-1/3">
                         <div className={`w-2 h-2 rounded-full ${idx===1?'bg-orange-400':idx===2?'bg-emerald-400':'bg-purple-400'}`}></div>
                         <div className="w-32 h-2 bg-gray-200 rounded"></div>
                       </div>
                       <div className="w-16 h-2 bg-gray-100 rounded"></div>
                       <div className="w-16 h-4 bg-gray-100 rounded-full"></div>
                       <div className="flex -space-x-1">
                         <div className="w-5 h-5 rounded-full bg-gray-200 border border-white"></div>
                         <div className="w-5 h-5 rounded-full bg-gray-300 border border-white"></div>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </div>

        {/* Text Columns Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-bold text-bordup-dark mb-3">Solving Confusion Managing Task</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-[280px]">
              Find our where we simplified schedule and project resolutions through automated tools.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-bordup-dark mb-3">Facilitating Team Collaboration</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-[280px]">
              Platform that builds collaborative numbers creating an environment where communication connects.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-bordup-dark mb-3">Maintaining Focus on Important Tasks</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-[280px]">
              Platforming focus on important tasks to ensure you achieve true management.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
