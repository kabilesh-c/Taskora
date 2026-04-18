export function StatsBar() {
  return (
    <section className="px-6 lg:px-8 max-w-[1280px] mx-auto mb-16">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y-0 md:divide-x divide-gray-200 border-b border-gray-200 pb-12 mb-12 border-t pt-12">
        
        <div className="flex flex-col gap-3 md:pr-12 pb-8 md:pb-0">
          <div className="flex items-center gap-3">
             <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full border-2 border-bordup-bg bg-indigo-100 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=A" /></div>
                 <div className="w-8 h-8 rounded-full border-2 border-bordup-bg bg-pink-100 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=B" /></div>
                 <div className="w-8 h-8 rounded-full border-2 border-bordup-bg bg-emerald-100 overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=C" /></div>
             </div>
             <span className="text-2xl font-bold text-bordup-dark">120K+</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed font-medium mt-2">
            It is questions true on sure account, phrases and discover the bordup.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:px-12 py-8 md:py-0">
          <div className="flex items-center gap-2">
             <span className="text-bordup-yellow text-xl">★</span>
             <span className="text-2xl font-bold text-bordup-dark">4.8</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed font-medium mt-3">
            Positive ratings for rules and around the world. Check the review here.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:pl-12 pt-8 md:pt-0">
          <div className="flex items-center gap-2">
             <span className="text-2xl font-bold text-bordup-dark">100%</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed font-medium mt-3">
            Live satisfaction with Bordup, refunding if you not prefer product.
          </p>
        </div>

      </div>

      {/* Customer Count Row */}
      <div className="flex flex-col items-start gap-6">
        <h2 className="text-[32px] md:text-[40px] font-bold text-bordup-dark leading-tight max-w-[400px]">
          4,567 Customer are using our application
        </h2>
        
        <button className="h-[44px] pl-6 pr-1.5 bg-bordup-dark text-white rounded-full text-sm font-semibold flex items-center justify-center hover:bg-black transition-colors group">
          Get Started
          <div className="ml-3 w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
               <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>

    </section>
  );
}
