'use client';

import { useEffect, useState, useRef } from 'react';
import { useTour } from './TourProvider';
import { X } from 'lucide-react';

interface Rect { top: number; left: number; width: number; height: number; }

function getRect(target: string): Rect | null {
  const el = document.querySelector(`[data-tour="${target}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

const GAP = 16;

export default function TourTooltip() {
  const { step, steps, isActive, next, skip } = useTour();
  const [rect, setRect] = useState<Rect | null>(null);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) { setVisible(false); return; }

    setVisible(false);
    const t = setTimeout(() => {
      const r = getRect(steps[step].target);
      setRect(r);
      setVisible(true);
    }, 150);

    return () => clearTimeout(t);
  }, [isActive, step, steps]);

  if (!isActive || !visible) return null;

  const currentStep = steps[step];

  // Tooltip positioning
  let tooltipStyle: React.CSSProperties = {};
  let arrowStyle: React.CSSProperties = {};
  const TT_W = 280, TT_H = 160;

  if (rect) {
    const pos = currentStep.position;
    if (pos === 'right') {
      tooltipStyle = { top: rect.top + rect.height / 2 - TT_H / 2, left: rect.left + rect.width + GAP };
    } else if (pos === 'left') {
      tooltipStyle = { top: rect.top + rect.height / 2 - TT_H / 2, left: rect.left - TT_W - GAP };
    } else if (pos === 'below') {
      tooltipStyle = { top: rect.top + rect.height + GAP, left: rect.left + rect.width / 2 - TT_W / 2 };
    } else { // above
      tooltipStyle = { top: rect.top - TT_H - GAP, left: rect.left + rect.width / 2 - TT_W / 2 };
    }
    // Clamp to viewport
    tooltipStyle.left = Math.max(8, Math.min(Number(tooltipStyle.left), window.innerWidth - TT_W - 8));
    tooltipStyle.top = Math.max(8, Math.min(Number(tooltipStyle.top), window.innerHeight - TT_H - 8));
  }

  return (
    <>
      {/* Dark backdrop with spotlight cutout */}
      {rect && (
        <div
          className="fixed inset-0 z-40 pointer-events-none"
          style={{
            background: 'transparent',
            boxShadow: `0 0 0 9999px rgba(0,0,0,0.65)`,
            clipPath: `polygon(
              0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%,
              ${rect.left - 6}px ${rect.top - 6}px,
              ${rect.left - 6}px ${rect.top + rect.height + 6}px,
              ${rect.left + rect.width + 6}px ${rect.top + rect.height + 6}px,
              ${rect.left + rect.width + 6}px ${rect.top - 6}px,
              ${rect.left - 6}px ${rect.top - 6}px
            )`,
          }}
        />
      )}

      {/* Backdrop (for click dismiss) */}
      <div className="fixed inset-0 z-40" onClick={skip} />

      {/* Tooltip bubble */}
      <div
        className="fixed z-50 flex flex-col gap-3 p-4 rounded-2xl shadow-2xl border border-[#2A2A2A] transition-all duration-150"
        style={{
          ...tooltipStyle,
          width: TT_W,
          background: '#1A1A1A',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-gray-500 bg-[#111] px-2 py-0.5 rounded-full border border-[#2A2A2A]">
            {step + 1} of {steps.length}
          </span>
          <button onClick={skip} className="text-gray-600 hover:text-white transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[14px] font-semibold text-white leading-tight">{currentStep.title}</h3>
          <p className="text-[12px] text-gray-400 leading-relaxed">{currentStep.body}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={skip}
            className="text-[11px] text-gray-500 hover:text-white transition-colors"
          >
            Skip Tour
          </button>
          <button
            onClick={next}
            className="text-[11px] font-semibold bg-[#06B6D4] hover:bg-[#0891B2] text-white px-3 py-1.5 rounded-full transition-colors"
          >
            {step === steps.length - 1 ? 'Got it! 🎉' : 'Next →'}
          </button>
        </div>
      </div>
    </>
  );
}
