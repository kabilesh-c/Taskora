import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export function Card({ className = '', glass = false, children, ...props }: CardProps) {
  return (
    <div 
      className={`rounded-3xl border border-gray-100 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] overflow-hidden ${glass ? 'bg-white/70 backdrop-blur-md' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
