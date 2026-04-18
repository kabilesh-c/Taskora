import Image from 'next/image';

export function FeatureCardsGrid() {
  return (
    <section className="px-6 lg:px-8 max-w-[1280px] mx-auto mb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: Orange Rating */}
        <div className="bg-bordup-orange rounded-[40px] p-10 flex flex-col justify-between overflow-hidden relative min-h-[360px] group cursor-target shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all active:scale-[0.98]">
          <h3 className="text-white text-3xl font-bold mb-8 z-10 group-hover:scale-105 transition-transform origin-left tracking-tight">Average Rating</h3>
          
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 w-full z-10 shadow-soft border border-white/30 group-hover:bg-white/30 transition-all">
            <div className="space-y-4">
              {[ {num:5, perc: '90%', val:'100'}, {num:4, perc: '80%', val:'34K'}, {num:3, perc: '60%', val:'50'}, {num:2, perc: '40%', val:'10'} ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                   <span className="text-white text-sm font-bold w-4">{item.num} <span className="text-[10px]">★</span></span>
                   <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                     <div className="h-full bg-white rounded-full transition-all duration-1000 ease-out w-0 origin-left" style={{ width: item.perc }}></div>
                   </div>
                   <span className="text-white text-sm font-bold w-10 text-right">{item.val}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <button className="flex-1 bg-white text-bordup-orange text-[10px] font-black uppercase tracking-wider py-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-sm">PlayStore</button>
              <button className="flex-1 bg-white text-bordup-orange text-[10px] font-black uppercase tracking-wider py-2.5 rounded-full hover:bg-gray-100 transition-colors shadow-sm">App Store</button>
            </div>
          </div>

          <svg className="absolute bottom-0 left-0 w-full h-[180px] text-white/10 pointer-events-none group-hover:text-white/20 transition-colors duration-700" viewBox="0 0 300 150" fill="none">
             <path d="M0,150 L0,50 C100,100 200,0 300,50 L300,150 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Card 2: Premium Image Card */}
        <div className="bg-bordup-purple rounded-[40px] p-10 relative min-h-[360px] overflow-hidden group border border-purple-200 cursor-target shadow-xl shadow-purple-500/5 hover:shadow-purple-500/15 transition-all active:scale-[0.98]">
          <div className="relative z-20">
            <h3 className="text-bordup-dark text-4xl font-extrabold mb-3 tracking-tighter group-hover:text-purple-900 transition-colors">Go Premium</h3>
            <p className="text-bordup-dark text-sm font-medium w-[70%] mb-8 leading-relaxed">Unlock advanced analytics and collaborative features today.</p>
            <button className="bg-[#161616] text-white text-[11px] font-black uppercase tracking-widest py-3 px-8 rounded-full shadow-lg hover:bg-black hover:scale-110 transition-all">Start Upgrade</button>
          </div>
          
          <div className="absolute -bottom-10 -right-10 w-[280px] h-[280px] z-10 pointer-events-none opacity-100 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-1000 ease-out">
             <Image 
                src="/premium-promo.png" 
                alt="Premium Promotion" 
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 300px"
             />
          </div>
        </div>

        {/* Card 3: White Counter */}
        <div className="bg-white rounded-[40px] p-10 flex flex-col items-center justify-center relative min-h-[360px] border border-gray-100 shadow-xl shadow-gray-200/50 group cursor-target transition-all active:scale-[0.98]">
          <div className="bg-white shadow-2xl rounded-[32px] p-8 w-full max-w-[240px] border border-gray-50 flex flex-col items-center mb-8 transform group-hover:-translate-y-4 transition-transform duration-700 ease-out">
             <h4 className="text-5xl font-black text-bordup-dark mb-4 tracking-tighter">120K+</h4>
             <div className="flex -space-x-3 mb-5">
                 <div className="w-12 h-12 rounded-full border-4 border-white bg-indigo-100 shadow-md"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=A" /></div>
                 <div className="w-12 h-12 rounded-full border-4 border-white bg-pink-100 shadow-md"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=B" /></div>
                 <div className="w-12 h-12 rounded-full border-4 border-white bg-emerald-100 shadow-md"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=C" /></div>
             </div>
             <p className="text-[11px] text-gray-500 font-black uppercase tracking-widest">Happy customer</p>
          </div>

          <div className="flex items-center gap-6 mt-auto">
             <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-400 transition-all hover:scale-110">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
             </button>
             <button className="w-12 h-12 rounded-full bg-bordup-orange flex items-center justify-center text-white shadow-lg shadow-orange-500/30 hover:scale-110 hover:shadow-orange-500/50 transition-all">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
             </button>
             <span className="text-sm font-bold text-bordup-dark ml-2 group-hover:text-bordup-orange transition-colors">Next Insight</span>
          </div>
        </div>

      </div>
    </section>
  );
}
