'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import SpotlightCard from '@/components/ui/SpotlightCard';
import VariableProximity from '@/components/ui/VariableProximity';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const containerRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#F9F6F0] font-sans selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden relative flex flex-col md:flex-row">
      
      {/* Decorative Left Side (Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#161616] overflow-hidden items-center justify-center p-12">
        {/* Subtle Background Glow */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-lg">
          <div ref={containerRef} className="mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
              <VariableProximity
                label="Empowering teams with precision."
                className="text-white cursor-target"
                fromFontVariationSettings="'wght' 400, 'opsz' 14"
                toFontVariationSettings="'wght' 900, 'opsz' 84"
                containerRef={containerRef}
                radius={120}
                falloff="linear"
              />
            </h2>
            <p className="text-gray-400 text-lg max-w-[400px] leading-relaxed">
              Experience the next generation of task management with our high-fidelity analytics and seamless collaboration.
            </p>
          </div>

          {/* Floating UI Mockup Element */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-2xl relative"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
              </div>
              <div className="space-y-1.5 font-medium">
                <div className="text-sm text-white">Project Insight Complete</div>
                <div className="text-xs text-gray-500">2 minutes ago</div>
              </div>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="h-full bg-emerald-400 rounded-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Logo at bottom left */}
        <div className="absolute bottom-10 left-10 flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <div className="w-3 h-3 rounded-full border-[2.5px] border-[#161616] relative top-[-1px]"></div>
           </div>
           <span className="font-bold text-xl text-white tracking-tight">Taskora</span>
        </div>
      </div>

      {/* Main Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        <div className="w-full max-w-[480px]">
          
          {/* Mobile Logo Only */}
          <div className="lg:hidden flex justify-center mb-12">
            <div className="flex items-center gap-2">
               <div className="w-10 h-10 rounded-full bg-[#161616] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full border-[2.5px] border-white relative top-[-1px]"></div>
               </div>
               <span className="font-bold text-2xl text-[#161616] tracking-tight">Taskora</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SpotlightCard className="bg-white border-gray-100 shadow-xl overflow-visible" spotlightColor="rgba(0,0,0,0.03)">
               <LoginForm />
            </SpotlightCard>
          </motion.div>

          <p className="mt-8 text-center text-gray-500 text-sm font-medium">
            First time? <Link href="/register" className="text-[#161616] font-bold hover:underline">Create an account</Link>
          </p>
        </div>
      </div>

    </div>
  );
}
