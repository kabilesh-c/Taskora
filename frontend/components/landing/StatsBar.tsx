'use client';

import { useRef } from 'react';
import VariableProximity from '@/components/ui/VariableProximity';

export function StatsBar() {
  const containerRef = useRef(null);

  return (
    <section className="px-6 lg:px-8 max-w-[1280px] mx-auto mb-24">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y-0 md:divide-x divide-gray-200 border-b border-gray-200 pb-16 mb-16 border-t pt-16">
        
        <div className="flex flex-col gap-4 md:pr-12 pb-8 md:pb-0 group cursor-target rounded-2xl p-4 transition-colors hover:bg-gray-50/50">
          <div className="flex items-center gap-4">
             <div className="flex -space-x-3">
                 <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=A" /></div>
                 <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-100 overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=B" /></div>
                 <div className="w-10 h-10 rounded-full border-2 border-white bg-emerald-100 overflow-hidden shadow-sm"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=C" /></div>
             </div>
             <span className="text-3xl font-bold text-bordup-dark tracking-tight">120K+</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed font-medium">
            It is questions true on sure account, phrases and discover the bordup.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:px-12 py-8 md:py-0 group cursor-target rounded-2xl p-4 transition-colors hover:bg-gray-50/50">
          <div className="flex items-center gap-2">
             <span className="text-bordup-yellow text-2xl">★</span>
             <span className="text-3xl font-bold text-bordup-dark tracking-tight">4.8</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed font-medium">
            Positive ratings for rules and around the world. Check the review here.
          </p>
        </div>

        <div className="flex flex-col gap-3 md:pl-12 pt-8 md:pt-0 group cursor-target rounded-2xl p-4 transition-colors hover:bg-gray-50/50">
          <div className="flex items-center gap-2">
             <span className="text-3xl font-bold text-bordup-dark tracking-tight">100%</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed font-medium">
            Live satisfaction with Bordup, refunding if you not prefer product.
          </p>
        </div>

      </div>

      {/* Customer Count Row */}
      <div className="flex flex-col items-start gap-8">
        <h2 ref={containerRef} className="text-[40px] md:text-[56px] font-bold text-bordup-dark leading-[1.1] max-w-[600px] tracking-tight">
          <VariableProximity
              label="4,567 Customer are using our application"
              className="text-bordup-dark cursor-target p-2"
              fromFontVariationSettings="'wght' 400, 'opsz' 14"
              toFontVariationSettings="'wght' 900, 'opsz' 84"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
          />
        </h2>
        
        <button className="h-[60px] pl-8 pr-2 bg-bordup-dark text-white rounded-full text-base font-bold flex items-center justify-center hover:bg-black transition-all cursor-target hover:scale-[1.05] group">
          Get Started
          <div className="ml-4 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
               <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>

    </section>
  );
}
