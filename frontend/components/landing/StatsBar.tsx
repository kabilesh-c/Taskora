'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      const percentage = Math.min(progress / (duration * 1000), 1);
      // easeOutExpo function
      const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(end * easeProgress));

      if (percentage < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, isInView]);

  // Format large numbers (e.g. 4200 -> 4,200)
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-text-primary tracking-tight">
      {formattedCount}{suffix}
    </span>
  );
}

export function StatsBar() {
  const stats = [
    { value: 4200, label: "Customer are using our application", suffix: "+" },
    { value: 120, label: "Agencies worldwide", suffix: "K+" },
    { value: 4.8, label: "Average rating by users", suffix: "" },
    { value: 100, label: "Client satisfaction rate", suffix: "%" },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-gray-100">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`flex flex-col ${i % 2 !== 0 ? 'lg:pl-8' : i > 0 ? 'lg:pl-8' : ''}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {stat.value === 4.8 ? (
                  <span className="text-amber-400 text-3xl">★</span>
                ) : stat.value === 120 ? (
                  <div className="flex -space-x-1 mr-2">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=A" className="w-8 h-8 rounded-full border border-white bg-blue-100" />
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=B" className="w-8 h-8 rounded-full border border-white bg-green-100" />
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=C" className="w-8 h-8 rounded-full border border-white bg-pink-100" />
                  </div>
                ) : null}
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-text-secondary leading-snug pr-4">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
