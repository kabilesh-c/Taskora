'use client';

import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
  color?: string; // 'blue', 'green', 'amber'
}

export default function StatsCard({ label, value, change, isPositive, icon: Icon, color = 'blue' }: StatsCardProps) {
  const getGlowColor = () => {
    switch (color) {
      case 'green': return 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] border-emerald-500/20';
      case 'amber': return 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] border-amber-500/20';
      default: return 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] border-blue-500/20';
    }
  };

  const getTextColor = () => {
    switch (color) {
      case 'green': return 'text-emerald-400';
      case 'amber': return 'text-amber-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className={`flex-1 bg-[#1E1E1E] border rounded-[24px] p-6 transition-all duration-500 group hover:bg-[#252528] cursor-default ${getGlowColor()}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</span>
        <div className={`p-2 rounded-xl bg-white/5 transition-transform group-hover:scale-110 ${getTextColor()}`}>
          <Icon size={20} />
        </div>
      </div>
      
      <div className="flex flex-col gap-1">
        <span className="text-3xl font-bold tracking-tight text-white">{value}</span>
        <div className="flex items-center gap-2 mt-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
            {isPositive ? '+' : ''}{change}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">vs last period</span>
        </div>
      </div>
    </div>
  );
}
