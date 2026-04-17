'use client';

import { motion } from 'framer-motion';
import { Mic, CalendarDays, Flag, Users, CheckCircle2, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const features = [
    {
      title: "Voice Task Creation",
      description: "Speak your task, AI extracts title, priority and deadline automatically using Gemini.",
      icon: <Mic className="w-6 h-6 text-primary" />,
      color: "bg-purple-50"
    },
    {
      title: "Calendar View",
      description: "Visualise deadlines across campaigns and projects in a weekly/monthly grid.",
      icon: <CalendarDays className="w-6 h-6 text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "Priority Tracking",
      description: "Urgent, High, Medium, Low — colour-coded across every view.",
      icon: <Flag className="w-6 h-6 text-amber-500" />,
      color: "bg-amber-50"
    },
    {
      title: "Team Task Ownership",
      description: "Assign tasks per project with clear ownership trails.",
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      color: "bg-emerald-50"
    },
    {
      title: "One-Click Completion",
      description: "Mark tasks done instantly with satisfying completion animations.",
      icon: <CheckCircle2 className="w-6 h-6 text-rose-500" />,
      color: "bg-rose-50"
    },
    {
      title: "Real-time Stats",
      description: "Track completion rates, backlogs and progress at a glance.",
      icon: <TrendingUp className="w-6 h-6 text-cyan-500" />,
      color: "bg-cyan-50"
    }
  ];

  return (
    <section id="features" className="py-24 bg-background-alt relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/40 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-4">
              Streamline your<br/>task Management process
            </h2>
            <p className="text-text-secondary text-lg">
              Everything you need to run your agency&apos;s operations without the bloated features you don&apos;t.
            </p>
          </div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div key={i} variants={item}>
              <Card glass className="h-full p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-t-2 border-t-transparent hover:border-t-primary cursor-default group">
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
