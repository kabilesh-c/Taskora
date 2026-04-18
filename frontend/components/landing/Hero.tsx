'use client';

import { useRef } from 'react';
import VariableProximity from '@/components/ui/VariableProximity';
import { motion } from 'motion/react';

export function Hero() {
  const containerRef = useRef(null);

  return (
    <section id="home" className="relative pt-40 pb-20">
      {/* Dynamic background is now handled by Waves component in parent */}

      <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        
        <div ref={containerRef} className="w-full mb-6 relative">
          <h1 className="text-[52px] md:text-[68px] font-bold tracking-tight text-bordup-dark leading-[1.1]">
            <VariableProximity
              label="Effortless Task Management"
              className="text-bordup-dark cursor-target"
              fromFontVariationSettings="'wght' 400, 'opsz' 14"
              toFontVariationSettings="'wght' 900, 'opsz' 84"
              containerRef={containerRef}
              radius={120}
              falloff="linear"
            />
            <br className="hidden md:block"/>
            <VariableProximity
              label="for Teams and Individuals"
              className="text-bordup-dark cursor-target"
              fromFontVariationSettings="'wght' 400, 'opsz' 14"
              toFontVariationSettings="'wght' 900, 'opsz' 84"
              containerRef={containerRef}
              radius={120}
              falloff="linear"
            />
          </h1>
        </div>
        
        <p className="text-lg text-gray-600 mb-10 max-w-[600px] mx-auto leading-relaxed">
          Our service caters to both teams and individuals, ensuring everyone can stay organized and focused.
        </p>

        <div className="w-full max-w-[400px] relative group mb-8">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full h-[60px] pl-6 pr-32 rounded-full border border-gray-200 shadow-sm focus:outline-none text-bordup-dark cursor-target"
          />
          <button className="absolute right-2 top-2 h-[44px] px-5 bg-bordup-dark text-white rounded-full text-sm font-semibold flex items-center justify-center transition-transform group-hover:scale-[1.02] cursor-target">
            Try Free
            <div className="ml-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-bordup-dark group-hover:translate-x-0.5 transition-transform">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                 <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
