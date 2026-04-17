'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ProductPreview() {
  const benefits = [
    "Voice-powered task creation",
    "Gemini AI parses intent",
    "Supabase real-time sync",
    "Demo mode — no signup needed"
  ];

  return (
    <section id="preview" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4">See It In Action</h2>
          <p className="text-text-secondary text-lg">
            Experience the fastest way to get tasks out of your head and into your workflow.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: CSS Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-3/5"
          >
            <div className="bg-dark-panel rounded-3xl p-6 shadow-2xl border border-gray-800">
               {/* Dashboard Header Mock */}
               <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                     <span className="text-white font-bold">TF</span>
                   </div>
                   <h3 className="text-white font-medium text-lg">TaskFlow Studio</h3>
                 </div>
                 <div className="flex gap-2">
                   <div className="w-8 h-8 rounded-full bg-gray-800"></div>
                   <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-primary overflow-hidden"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" /></div>
                 </div>
               </div>

               {/* Stats Row Mock */}
               <div className="grid grid-cols-3 gap-4 mb-8">
                 <div className="bg-[#141416] p-4 rounded-2xl border border-gray-800/50">
                    <p className="text-gray-400 text-xs uppercase font-medium mb-1">Weekly Progress</p>
                    <div className="flex items-end justify-between">
                      <span className="text-2xl font-bold text-white">75%</span>
                      <div className="w-12 h-6 border-b-2 border-emerald-500 rounded-[50%] mb-1"></div>
                    </div>
                 </div>
                 <div className="bg-[#141416] p-4 rounded-2xl border border-gray-800/50">
                    <p className="text-gray-400 text-xs uppercase font-medium mb-1">Tasks Completed</p>
                    <span className="text-2xl font-bold text-white">42</span>
                 </div>
                 <div className="bg-primary/20 p-4 rounded-2xl border border-primary/30 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary rounded-full blur-xl opacity-50"></div>
                    <p className="text-primary-100 text-xs uppercase font-medium mb-1">AI Voice active</p>
                    <span className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Listening
                    </span>
                 </div>
               </div>

               {/* Task List Mock */}
               <div className="space-y-3">
                 <div className="bg-[#141416] p-4 rounded-xl flex items-center justify-between group hover:border-gray-700 border border-transparent transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-5 h-5 rounded-md border-2 border-gray-600"></div>
                     <div>
                       <p className="text-white text-sm font-medium">Review Q3 Marketing Strategy</p>
                       <p className="text-gray-500 text-xs">Assigned to Sarah M.</p>
                     </div>
                   </div>
                   <span className="bg-amber-500/20 text-amber-400 text-xs px-3 py-1 rounded-full font-medium">In Progress</span>
                 </div>

                 <div className="bg-[#141416] p-4 rounded-xl flex items-center justify-between group hover:border-gray-700 border border-transparent transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-5 h-5 rounded-md border-2 border-gray-600"></div>
                     <div>
                       <p className="text-white text-sm font-medium">Update Client Dashboard UI</p>
                       <p className="text-gray-500 text-xs">Due Today</p>
                     </div>
                   </div>
                   <span className="bg-rose-500/20 text-rose-400 text-xs px-3 py-1 rounded-full font-medium">Urgent</span>
                 </div>

                 <div className="bg-[#141416] p-4 rounded-xl flex items-center justify-between opacity-60">
                   <div className="flex items-center gap-4">
                     <div className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center">✓</div>
                     <div>
                       <p className="text-gray-400 text-sm font-medium line-through">Weekly Sync Notes</p>
                     </div>
                   </div>
                   <span className="text-gray-500 text-xs">Completed yesterday</span>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* Right: Feature List */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-2/5"
          >
            <h3 className="text-2xl font-bold text-text-primary mb-6">Designed for velocity.</h3>
            <p className="text-text-secondary mb-8">
              Every detail in TaskFlow is crafted to eliminate friction. Less time managing board configurations, more time executing campaigns.
            </p>
            
            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-text-primary font-medium">
                  <span className="text-emerald-500 bg-emerald-50 p-1 rounded-full">
                    <CheckCircle className="w-5 h-5" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <Button className="shadow-lg">Try Demo Mode</Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
