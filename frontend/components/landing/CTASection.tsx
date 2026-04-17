'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function CTASection() {
  const [email, setEmail] = useState('');

  return (
    <section className="bg-dark-bg py-24 relative overflow-hidden">
      {/* Soft purple glow radial behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to boost your productivity?
            </h2>
            <p className="text-gray-400 text-lg">
              Join Weboin and hundreds of other agencies shipping faster.
            </p>
          </div>
          
          <div className="w-full md:w-auto shrink-0">
            <div className="bg-white p-1.5 rounded-full flex shadow-[0_0_30px_rgba(124,58,237,0.3)] w-full sm:w-[400px]">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-6 py-3 text-sm focus:outline-none text-text-primary rounded-l-full placeholder:text-gray-400"
              />
              <button 
                className="bg-dark-bg text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors flex items-center justify-center"
              >
                Try it free <span className="ml-2 w-5 h-5 rounded-full bg-white text-dark-bg flex items-center justify-center text-xs">→</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
