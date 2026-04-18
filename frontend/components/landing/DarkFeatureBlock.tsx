'use client';

export function DarkFeatureBlock() {
  return (
    <section className="px-6 lg:px-8 mb-16 max-w-[1280px] mx-auto">
      <div className="w-full bg-bordup-dark rounded-[32px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
        
        {/* Background diagonal dark stripes matching reference image */}
        <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-20 pointer-events-none">
           <div className="w-48 h-full bg-gray-600 rotate-45 transform origin-bottom-right scale-150 rounded-full blur-xl absolute -right-10 bottom-0"></div>
           <div className="w-32 h-full bg-gray-600 rotate-45 transform origin-bottom-right scale-150 rounded-full blur-xl absolute -right-40 bottom-10"></div>
        </div>

        {/* Left Interactive Mockup Side */}
        <div className="w-full md:w-[55%] relative h-[300px] flex items-center">
          
          {/* Main Chart Card */}
          <div className="absolute left-0 top-4 w-[360px] bg-white rounded-3xl p-6 shadow-xl z-10 border border-gray-100">
             <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-bordup-dark">Performance</span>
                <span className="text-gray-400 text-xs flex items-center gap-1">Weekly <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
             </div>
             
             <div className="mb-6">
               <p className="text-sm text-gray-500 mb-1">Total time worked</p>
               <div className="flex justify-between items-baseline">
                 <h3 className="text-3xl font-bold text-bordup-dark">16 hr 30 min</h3>
                 <span className="text-sm font-semibold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                   <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 11V1M6 1L1 6M6 1L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                   64.34%
                 </span>
               </div>
             </div>

             {/* SVG Chart Graphic Placeholder */}
             <div className="w-full h-[80px] relative">
               <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                 <path d="M0 60 Q 20 40 40 50 T 80 40 T 120 70 T 160 30 T 200 40 T 240 10 T 280 30 L 300 20" stroke="#7C3AED" strokeWidth="3" fill="none" strokeLinecap="round"/>
               </svg>
               {/* Dots */}
               <div className="absolute top-[8px] right-[16px] w-[12px] h-[12px] bg-white border-4 border-bordup-dark rounded-full"></div>
             </div>
             <div className="flex justify-between text-[10px] text-gray-400 font-medium mt-2">
               <span>20 Aug, 2024</span>
               <span className="w-2 h-2 bg-bordup-dark rounded-full"></span>
             </div>
          </div>

          {/* Overlapping Small Card */}
          <div className="absolute right-4 md:right-10 bottom-6 w-[240px] bg-white rounded-3xl p-5 shadow-2xl z-20 border border-gray-100 animate-float-slow">
             <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-bordup-dark flex items-center justify-center">
                     <div className="w-2 h-2 rounded-full border-[1.5px] border-white relative top-[-1px]"></div>
                   </div>
                   <span className="font-bold text-sm text-bordup-dark">Bordup</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <div className="w-3 h-3 border border-gray-400 rounded-sm"></div>
                </div>
             </div>
             
             <div className="flex justify-between items-center mb-3">
               <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-100 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" /></div>
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-pink-100 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" /></div>
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" /></div>
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">+4</div>
               </div>
               <div className="text-sm font-medium text-gray-400">ASSIGNED</div>
             </div>

             <div className="flex justify-between items-center">
               <button className="bg-emerald-50 text-emerald-500 text-xs font-semibold px-3 py-1 rounded-full">Assigned</button>
               <span className="text-xl font-bold text-bordup-dark">97</span>
             </div>
          </div>

        </div>

        {/* Right Text Content Side */}
        <div className="w-full md:w-[45%] relative z-10 lg:pl-10">
          <h2 className="text-3xl md:text-[40px] font-bold text-white leading-tight mb-5 tracking-tight">
            Track real-time progress with Reports
          </h2>
          <p className="text-gray-400 text-base mb-8 max-w-[400px]">
            Get valuable insights into your productivity and project status with our real-time reporting features.
          </p>
          <button className="h-[44px] pl-6 pr-1.5 bg-white text-bordup-dark rounded-full text-sm font-semibold inline-flex items-center justify-center hover:bg-gray-100 transition-colors group">
            Get Started
            <div className="ml-3 w-8 h-8 bg-bordup-dark rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="rotate-0 text-white">
                 <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
