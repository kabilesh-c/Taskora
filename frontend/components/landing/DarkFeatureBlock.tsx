'use client';

import { useRef } from 'react';
import Image from 'next/image';
import VariableProximity from '@/components/ui/VariableProximity';

export function DarkFeatureBlock() {
  const containerRef = useRef(null);

  return (
    <section className="px-6 lg:px-8 mb-24 max-w-[1280px] mx-auto">
      <div className="w-full bg-[#161616]/90 backdrop-blur-xl rounded-[48px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden group border border-white/10 cursor-target">
        
        {/* Subtle Background Gradient */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-purple-600/15 transition-colors duration-1000"></div>

        {/* Left Side: Performance Dashboard Mockup */}
        <div className="w-full md:w-[50%] relative group/mockup">
           <div className="relative z-10 bg-[#1e1e1e] rounded-[32px] p-2 shadow-2xl border border-white/10 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-700">
             <Image 
               src="/dark-analytics.png" 
               alt="Performance Analytics" 
               width={800}
               height={500}
               className="w-full h-auto rounded-[24px]"
               sizes="(max-width: 768px) 100vw, 800px"
             />
           </div>
           {/* Floating decoration cards if we had them, otherwise just clean mockup */}
           <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
        </div>

        {/* Right Text Content Side */}
        <div className="w-full md:w-[45%] relative z-10">
          <h2 ref={containerRef} className="text-4xl md:text-[48px] font-bold text-white leading-[1.1] mb-6 tracking-tight">
            <VariableProximity
              label="Track real-time progress with Reports"
              className="text-white cursor-target"
              fromFontVariationSettings="'wght' 400, 'opsz' 14"
              toFontVariationSettings="'wght' 900, 'opsz' 84"
              containerRef={containerRef}
              radius={100}
              falloff="linear"
            />
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-[440px] leading-relaxed">
            Gain valuable insights into your productivity and project status with our high-fidelity real-time reporting suite.
          </p>
          <button className="h-[56px] pl-8 pr-2 bg-white text-[#161616] rounded-full text-base font-bold inline-flex items-center justify-center hover:bg-gray-100 transition-all cursor-target hover:scale-[1.05] active:scale-95 group/btn">
            Get Started
            <div className="ml-4 w-10 h-10 bg-[#161616] rounded-full flex items-center justify-center group-hover/btn:translate-x-1 transition-transform">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                 <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
