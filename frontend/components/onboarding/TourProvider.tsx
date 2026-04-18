'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const TOUR_KEY = 'taskora_tour_done';

export interface TourStep {
  target: string;           // data-tour value
  title: string;
  body: string;
  position: 'right' | 'left' | 'above' | 'below';
}

const STEPS: TourStep[] = [
  {
    target: 'sidebar-nav',
    title: 'Your workspace',
    body: 'Navigate between Dashboard, Tasks, Analytics and more from the sidebar.',
    position: 'right',
  },
  {
    target: 'calendar-strip',
    title: 'Weekly timeline',
    body: 'See all your Weboin tasks plotted across the week. Click any day to filter.',
    position: 'below',
  },
  {
    target: 'add-task-btn',
    title: 'Create a task',
    body: 'Click + to add a new task. Type it or use your voice!',
    position: 'left',
  },
  {
    target: 'voice-btn',
    title: '🎤 AI Voice Input',
    body: 'Speak naturally — Gemini AI understands and fills the form for you.',
    position: 'below',
  },
  {
    target: 'task-stats',
    title: 'Track your progress',
    body: 'See completion rates, task types and your activity at a glance.',
    position: 'above',
  },
  {
    target: 'urgent-panel',
    title: 'Urgent tasks',
    body: 'High priority items surface here so nothing falls through the cracks.',
    position: 'left',
  },
  {
    target: 'demo-banner',
    title: "You're in Demo Mode",
    body: "Explore everything freely. Sign up to save your own tasks and team data.",
    position: 'below',
  },
];

interface TourContextType {
  step: number;
  steps: TourStep[];
  isActive: boolean;
  next: () => void;
  skip: () => void;
  startTour: () => void;
}

const TourContext = createContext<TourContextType>({
  step: 0, steps: STEPS, isActive: false,
  next: () => {}, skip: () => {}, startTour: () => {},
});

export function useTour() { return useContext(TourContext); }

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem(TOUR_KEY)) {
      // Small delay to let the DOM render
      const t = setTimeout(() => setIsActive(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const next = useCallback(() => {
    if (step >= STEPS.length - 1) {
      setIsActive(false);
      localStorage.setItem(TOUR_KEY, '1');
    } else {
      setStep((s) => s + 1);
    }
  }, [step]);

  const skip = useCallback(() => {
    setIsActive(false);
    localStorage.setItem(TOUR_KEY, '1');
  }, []);

  const startTour = useCallback(() => {
    setStep(0);
    setIsActive(true);
  }, []);

  return (
    <TourContext.Provider value={{ step, steps: STEPS, isActive, next, skip, startTour }}>
      {children}
    </TourContext.Provider>
  );
}
