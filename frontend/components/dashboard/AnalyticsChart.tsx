'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

const data = [
  { name: 'Mon 22', visits: 28000, conversions: 11000 },
  { name: 'Tue 23', visits: 38000, conversions: 18000 },
  { name: 'Wed 24', visits: 36000, conversions: 21000 },
  { name: 'Thu 25', visits: 29000, conversions: 15000 },
  { name: 'Fri 26', visits: 45000, conversions: 24000 },
  { name: 'Sat 27', visits: 32000, conversions: 16000 },
  { name: 'Sun 28', visits: 49000, conversions: 31000 },
];

export default function AnalyticsChart() {
  return (
    <div className="w-full h-[400px] mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            {/* Glow filters for lines */}
            <filter id="shadow-blue" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
              <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
              <feFlood floodColor="#3B82F6" floodOpacity="0.8" result="offsetColor" />
              <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="shadow-green" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
              <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
              <feFlood floodColor="#10B981" floodOpacity="0.8" result="offsetColor" />
              <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            
            {/* Gradients for area fill */}
            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2A2A" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dy={15}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }} 
            dx={-10}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1E1E1E', 
              border: '1px solid #333', 
              borderRadius: '12px',
              color: '#fff',
              fontSize: '12px'
            }}
            itemStyle={{ color: '#fff' }}
            cursor={{ stroke: '#444', strokeWidth: 1 }}
          />
          
          <Area
            type="monotone"
            dataKey="visits"
            stroke="#3B82F6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorVisits)"
            filter="url(#shadow-blue)"
            dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="conversions"
            stroke="#10B981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorConversions)"
            filter="url(#shadow-green)"
            dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
