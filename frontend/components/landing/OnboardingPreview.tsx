'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Mic, Activity } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function OnboardingPreview() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Create your first task",
      body: "Click here to add a task manually or assign it to a team member.",
      icon: <MousePointer2 className="w-5 h-5 text-indigo-500" />
    },
    {
      title: "Use voice to add tasks instantly",
      body: "Just say 'Remind me to call John at 5pm' and our AI does the rest.",
      icon: <Mic className="w-5 h-5 text-purple-500" />
    },
    {
      title: "Track your progress here",
      body: "Watch your stats update in real-time as you crush your daily goals.",
      icon: <Activity className="w-5 h-5 text-emerald-500" />
    }
  ];

  return (
    <section className="py-24 bg-background border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-4">First time? We guide you.</h2>
          <p className="text-text-secondary">
            Our intuitive onboarding ensures your team is up and running in minutes, not days.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative h-[400px]">
          
          {/* Abstract UI Background */}
          <div className="absolute inset-0 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-col pointer-events-none">
            <div className="flex justify-between mb-12">
              <div className="w-1/3">
                <div className="h-10 w-32 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-medium text-sm">+ Add Task</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-background-alt border border-gray-200 flex items-center justify-center">
                <Mic className="w-5 h-5 text-gray-400" />
              </div>
              <div className="w-1/3 flex justify-end">
                <div className="w-48 h-32 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-end p-4">
                  <div className="flex items-end gap-2 h-16">
                    <div className="w-4 bg-primary/40 rounded-t h-1/2"></div>
                    <div className="w-4 bg-primary/60 rounded-t h-3/4"></div>
                    <div className="w-4 bg-primary rounded-t h-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tooltips */}
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              {activeStep === 0 && (
                <motion.div 
                  key="step0"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-24 left-8 z-10"
                >
                  <TooltipCard step={steps[0]} onNext={() => setActiveStep(1)} stepNum={1} total={3} />
                  <div className="absolute -top-4 left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-indigo-500"></div>
                </motion.div>
              )}
              
              {activeStep === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-24 left-1/2 -translate-x-1/2 z-10"
                >
                  <TooltipCard step={steps[1]} onNext={() => setActiveStep(2)} stepNum={2} total={3} />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-purple-500"></div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute top-44 right-8 z-10"
                >
                  <TooltipCard step={steps[2]} onNext={() => setActiveStep(0)} stepNum={3} total={3} isLast />
                  <div className="absolute -top-4 right-20 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-emerald-500"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}

function TooltipCard({ step, onNext, stepNum, total, isLast = false }: any) {
  return (
    <Card className="w-72 shadow-xl border-t-4 p-5 z-20 pointer-events-auto border-t-current" style={{ borderTopColor: stepNum === 1 ? '#6366f1' : stepNum === 2 ? '#a855f7' : '#10b981' }}>
      <div className="flex gap-4 mb-3">
        <div className="shrink-0 pt-1">{step.icon}</div>
        <div>
          <h4 className="font-semibold text-text-primary text-sm mb-1">{step.title}</h4>
          <p className="text-xs text-text-secondary leading-relaxed">{step.body}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex gap-1">
          {[1,2,3].map(i => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === stepNum ? 'bg-primary' : 'bg-gray-200'}`}></div>
          ))}
        </div>
        <button 
          onClick={onNext}
          className="text-xs font-medium bg-gray-50 hover:bg-gray-100 text-text-primary px-3 py-1.5 rounded-md transition-colors"
        >
          {isLast ? "Done" : "Next"}
        </button>
      </div>
    </Card>
  );
}
