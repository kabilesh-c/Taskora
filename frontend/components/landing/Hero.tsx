'use client';

import { useRef } from 'react';
import Image from 'next/image';
import VariableProximity from '@/components/ui/VariableProximity';
import { motion } from 'motion/react';

export function Hero() {
  const containerRef = useRef(null);

  return (
    <section id="home" className="relative pt-40 pb-24 overflow-hidden">
      {/* Moving gradient background using framer motion */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-200/60 via-purple-100/30 to-transparent -z-10 blur-3xl pointer-events-none opacity-80"
      ></motion.div>

      <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10 flex flex-col items-center">
        
        <div ref={containerRef} className="cursor-target w-full mb-6 relative">
          <h1 className="text-[52px] md:text-[68px] font-bold tracking-tight text-bordup-dark leading-[1.1]">
            <VariableProximity
              label="Effortless Task Management"
              className="text-bordup-dark"
              fromFontVariationSettings="'wght' 400, 'opsz' 14"
              toFontVariationSettings="'wght' 900, 'opsz' 84"
              containerRef={containerRef}
              radius={120}
              falloff="linear"
            />
            <br className="hidden md:block"/>
            <VariableProximity
              label="for Teams and Individuals"
              className="text-bordup-dark"
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

        <div className="w-full max-w-[400px] relative group mb-20 cursor-target">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full h-[60px] pl-6 pr-32 rounded-full border border-gray-200 shadow-sm focus:outline-none text-bordup-dark"
          />
          <button className="absolute right-2 top-2 h-[44px] px-5 bg-bordup-dark text-white rounded-full text-sm font-semibold flex items-center justify-center transition-transform group-hover:scale-[1.02]">
            Try Free
            <div className="ml-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-bordup-dark group-hover:translate-x-0.5 transition-transform">
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                 <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>
        </div>

        {/* High Fidelity UI Generated Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-[900px] rounded-3xl overflow-hidden shadow-strong border border-gray-100 cursor-target group relative"
        >
          <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
          <Image 
            src="/hero-dashboard.png" 
            alt="TaskFlow Dashboard Hero UI" 
            width={1200} 
            height={800} 
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-700" 
            priority
          />
        </motion.div>

      </div>
    </section>
  );
}
