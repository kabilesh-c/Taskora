export function UpcomingPlans() {
  return (
    <section className="px-6 lg:px-8 max-w-[1280px] mx-auto mb-24">
      
      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div className="flex flex-col items-start gap-6">
          <h2 className="text-[32px] md:text-[40px] font-bold text-bordup-dark leading-tight max-w-[300px]">
            Upcoming plans shared publicly.
          </h2>
          <button className="h-[44px] pl-6 pr-1.5 bg-bordup-dark text-white rounded-full text-sm font-semibold flex items-center justify-center hover:bg-black transition-colors group">
            See More
            <div className="ml-3 w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
               <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                 <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        <div className="flex flex-col items-end gap-6 text-right">
          <p className="text-gray-500 text-sm max-w-[280px]">
            We could do a trends, new features, updates, or changes to our policies.
          </p>
          <div className="flex items-center gap-4">
             <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 focus:outline-none">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
             </button>
             <button className="w-10 h-10 rounded-full bg-bordup-orange flex items-center justify-center text-white shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform focus:outline-none">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
             </button>
             <span className="text-xs font-bold text-bordup-dark ml-2">Click to next</span>
          </div>
        </div>
      </div>

      {/* Massive Gradient Table Container */}
      <div className="w-full bg-gradient-to-r from-purple-200/50 via-purple-100/30. to-pink-100/50 rounded-[48px] p-8 md:p-12 relative overflow-hidden">
        
        {/* Table UI Mockup */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[32px] p-8 shadow-sm border border-white/50 relative z-10 w-full max-w-[900px]">
          
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-bordup-dark rounded-full flex items-center justify-center">
               <div className="w-3 h-3 rounded-full border-[2px] border-white relative top-[-1px]"></div>
            </div>
            <span className="font-bold text-bordup-dark">Bordup</span>
          </div>

          <div className="flex justify-between items-center mb-8">
             <h3 className="text-2xl font-bold text-bordup-dark">Attach your imprudent task in here</h3>
             <div className="flex gap-2">
                <button className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 shadow-sm flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg> List
                </button>
                <button className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 shadow-sm flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M9 21V9"/></svg> Board
                </button>
                <button className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-500 shadow-sm flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> View <span className="ml-1 text-gray-300">▼</span>
                </button>
             </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-5 text-xs font-semibold text-gray-400 mb-4 border-b border-gray-100 pb-3">
             <div className="col-span-2">Projects</div>
             <div>Assigned</div>
             <div>Start Date</div>
             <div>Due Date</div>
             <div className="text-right">Status</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-4">
             {/* Row 1 */}
             <div className="grid grid-cols-5 items-center py-2 border-b border-gray-50">
               <div className="col-span-2 text-sm font-semibold text-bordup-dark">Dancing visual block</div>
               <div className="flex -space-x-1">
                 <div className="w-6 h-6 rounded-full border border-white bg-indigo-100"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=X" /></div>
               </div>
               <div className="text-xs text-gray-500 font-medium">11, Aug 2024</div>
               <div className="text-xs text-gray-500 font-medium">15 August, 2024</div>
               <div className="text-right flex justify-end">
                  <span className="bg-emerald-50 text-emerald-500 px-3 py-1 text-[10px] font-bold rounded-full">In Progress</span>
               </div>
             </div>

             {/* Row 2 */}
             <div className="grid grid-cols-5 items-center py-2 border-b border-gray-50">
               <div className="col-span-2 text-sm font-semibold text-bordup-dark">Landing page reform</div>
               <div className="flex -space-x-1">
                 <div className="w-6 h-6 rounded-full border border-white bg-pink-100"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Y" /></div>
                 <div className="w-6 h-6 rounded-full border border-white bg-emerald-100"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Z" /></div>
               </div>
               <div className="text-xs text-gray-500 font-medium">15 August, 2024</div>
               <div className="text-xs text-gray-500 font-medium">27 August, 2024</div>
               <div className="text-right flex justify-end">
                  <span className="bg-cyan-50 text-cyan-500 px-3 py-1 text-[10px] font-bold rounded-full">Review</span>
               </div>
             </div>

             {/* Row 3 */}
             <div className="grid grid-cols-5 items-center py-2">
               <div className="col-span-2 text-sm font-semibold text-bordup-dark">Web app design concept</div>
               <div className="flex -space-x-1">
                 <div className="w-6 h-6 rounded-full border border-white bg-orange-100"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=W" /></div>
               </div>
               <div className="text-xs text-gray-500 font-medium">12 August, 2024</div>
               <div className="text-xs text-gray-500 font-medium">28 August, 2025</div>
               <div className="text-right flex justify-end">
                  <span className="bg-emerald-50 text-emerald-500 px-3 py-1 text-[10px] font-bold rounded-full">In Progress</span>
               </div>
             </div>
          </div>

        </div>

      </div>

    </section>
  );
}
