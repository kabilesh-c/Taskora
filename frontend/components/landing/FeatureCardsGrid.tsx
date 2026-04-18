export function FeatureCardsGrid() {
  return (
    <section className="px-6 lg:px-8 max-w-[1280px] mx-auto mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Orange Rating */}
        <div className="bg-bordup-orange rounded-[32px] p-8 flex flex-col justify-between overflow-hidden relative min-h-[320px]">
          <h3 className="text-white text-2xl font-bold mb-8 z-10">Average Rating</h3>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5 w-full z-10 shadow-soft border border-white/30">
            <div className="space-y-3">
              {[ {num:5, perc: '90%', val:'100'}, {num:4, perc: '80%', val:'34K'}, {num:3, perc: '60%', val:'50'}, {num:2, perc: '40%', val:'10'} ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                   <span className="text-white text-xs font-bold w-3">{item.num} <span className="text-[10px]">★</span></span>
                   <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                     <div className="h-full bg-white rounded-full" style={{ width: item.perc }}></div>
                   </div>
                   <span className="text-white text-xs font-bold w-6 text-right">{item.val}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              <button className="flex-1 bg-white text-bordup-orange text-[10px] font-bold py-2 rounded-full">Google PlayStore</button>
              <button className="flex-1 bg-white text-bordup-orange text-[10px] font-bold py-2 rounded-full">Apple Store App</button>
            </div>
          </div>

          {/* Abstract curve graphic */}
          <svg className="absolute bottom-0 left-0 w-full h-[150px] text-white/20" viewBox="0 0 300 150" fill="none">
             <path d="M0,150 L0,50 C100,100 200,0 300,50 L300,150 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Card 2: Purple Go Premium */}
        <div className="bg-bordup-purple rounded-[32px] p-8 relative min-h-[320px] overflow-hidden">
          <h3 className="text-bordup-dark text-4xl font-bold mb-2 tracking-tight">Go Premium</h3>
          <p className="text-bordup-dark text-xs font-medium w-1/2 mb-6">Explore our product and join a premium user</p>
          <button className="bg-white text-bordup-dark text-[10px] font-bold py-2 px-6 rounded-full shadow-sm hover:scale-105 transition-transform z-10 relative">Try Free</button>
          
          {/* Faux image placement (Using dicebear or similar if actual image not available, but CSS shapes work too) */}
          <div className="absolute -bottom-4 -right-12 w-[80%] h-[120%] pointer-events-none">
             {/* Creating a human placeholder graphic since we can't load the exact photo */}
             <div className="absolute bottom-0 right-10 w-48 h-64 bg-pink-200 rounded-t-full flex items-end justify-center shadow-lg border-4 border-white/50">
                <div className="w-16 h-20 bg-bordup-dark rounded-xl absolute -right-4 top-20 shadow-xl border border-gray-600 flex items-center justify-center">
                    <span className="text-[8px] text-white">App</span>
                </div>
                <div className="w-24 h-24 bg-pink-100 rounded-full mb-32 relative">
                   <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-pink-900 rounded-full"></div>
                   <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-900 rounded-full"></div>
                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-pink-800 rounded-full"></div>
                </div>
             </div>
          </div>
        </div>

        {/* Card 3: White Counter */}
        <div className="bg-white rounded-[32px] p-8 flex flex-col items-center justify-center relative min-h-[320px] border border-gray-100 shadow-sm">
          <div className="bg-white shadow-soft rounded-[24px] p-5 w-full max-w-[200px] border border-gray-50 flex flex-col items-center mb-8 relative top-[-10px]">
             <h4 className="text-3xl font-bold text-bordup-dark mb-3">120K+</h4>
             <div className="flex -space-x-2 mb-3">
                 <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=A" /></div>
                 <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-100 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=B" /></div>
                 <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-100 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=C" /></div>
             </div>
             <p className="text-[10px] text-gray-500 font-medium">Happy customer</p>
          </div>

          <div className="flex items-center gap-4 mt-auto">
             <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
             </button>
             <button className="w-10 h-10 rounded-full bg-bordup-orange flex items-center justify-center text-white shadow-lg shadow-orange-500/30 hover:scale-105 transition-transform">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
             </button>
             <span className="text-xs font-bold text-bordup-dark ml-2">Click to next</span>
          </div>
        </div>

      </div>
    </section>
  );
}
