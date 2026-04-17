'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-background-alt via-background to-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-text-primary mb-6 text-balance leading-tight">
            Effortless Task Management <br className="hidden md:block"/>
            for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Creative Teams</span>
          </h1>
          
          <p className="text-lg text-text-secondary leading-relaxed mb-10 text-balance px-4">
            Built for agencies like Weboin — track campaigns, web projects, and client deliverables in one place. Stop surviving the chaos, start managing it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-primary/20 font-semibold px-8 hover:-translate-y-1 transition-transform">
                Start for Free →
              </Button>
            </Link>
            <Link href="/login">
              <div className="h-14 px-8 inline-flex items-center justify-center rounded-full bg-white text-text-primary font-medium border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors w-full sm:w-auto shadow-sm cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                View Live Demo
              </div>
            </Link>
          </div>
          
          {/* Social Proof */}
          <div className="flex items-center justify-center gap-3 text-sm text-text-secondary font-medium">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-background bg-indigo-100 flex items-center justify-center"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mia" alt="avatar" className="w-8 h-8" /></div>
              <div className="w-8 h-8 rounded-full border-2 border-background bg-emerald-100 flex items-center justify-center"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Leo" alt="avatar" className="w-8 h-8" /></div>
              <div className="w-8 h-8 rounded-full border-2 border-background bg-rose-100 flex items-center justify-center"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" alt="avatar" className="w-8 h-8" /></div>
            </div>
            <span>Trusted by 2,400+ agencies worldwide.</span>
          </div>
        </motion.div>

        {/* Dashboard Mockup - purely CSS/Tailwind */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 max-w-4xl mx-auto animate-float-slow relative"
        >
          <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden text-left flex h-[400px]">
            {/* Sidebar mock */}
            <div className="w-48 bg-gray-50 border-r border-gray-100 p-4 hidden md:block">
              <div className="h-6 w-24 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-primary/20 rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            {/* Main area mock */}
            <div className="flex-1 p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-xl text-text-primary">Current Sprint</h3>
                  <p className="text-xs text-text-secondary">3 active projects</p>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-primary border-2 border-white text-white flex items-center justify-center text-xs">+3</div>
                </div>
              </div>

              {/* Kanban columns mock */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {/* Column 1 */}
                <div className="bg-gray-100/50 rounded-xl p-3">
                  <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3 flex justify-between">To Do <span className="bg-gray-200 px-1.5 rounded-full">1</span></h4>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 relative group cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="w-10 h-1 bg-red-400 rounded-full mb-2"></div>
                    <p className="font-medium text-sm text-text-primary leading-tight mb-2">Landing page redesign</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">Urgent</span>
                      <div className="w-5 h-5 rounded-full bg-emerald-100"></div>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="bg-gray-100/50 rounded-xl p-3">
                  <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3 flex justify-between">In Progress <span className="bg-gray-200 px-1.5 rounded-full">1</span></h4>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 relative group cursor-pointer hover:border-primary/50 transition-colors">
                    <div className="w-10 h-1 bg-amber-400 rounded-full mb-2"></div>
                    <p className="font-medium text-sm text-text-primary leading-tight mb-2">SEO Audit — TechCorp Client</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">High priority</span>
                      <div className="w-5 h-5 rounded-full bg-purple-100"></div>
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="bg-gray-100/50 rounded-xl p-3 hidden md:block">
                  <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3 flex justify-between">Completed <span className="bg-gray-200 px-1.5 rounded-full">1</span></h4>
                  <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 relative opacity-60">
                    <div className="w-10 h-1 bg-emerald-400 rounded-full mb-2"></div>
                    <p className="font-medium text-sm text-gray-500 leading-tight mb-2 line-through">Google Ads Campaign Q2</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-gray-400">Done</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative glowing blobs behind the mock */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 cursor-default"></div>
        </motion.div>

      </div>
    </section>
  );
}
