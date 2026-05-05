'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConcertPlan } from '@/lib/types';

interface PlanContextType {
  plans: ConcertPlan[];
  currentPlan: Partial<ConcertPlan> | null;
  addPlan: (plan: ConcertPlan) => void;
  setCurrentPlan: (plan: Partial<ConcertPlan> | null) => void;
  updateCurrentPlan: (updates: Partial<ConcertPlan>) => void;
  clearCurrentPlan: () => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plans, setPlans] = useState<ConcertPlan[]>([]);
  const [currentPlan, setCurrentPlan] = useState<Partial<ConcertPlan> | null>(null);

  // Load plans from localStorage on mount
  useEffect(() => {
    const savedPlans = localStorage.getItem('konserin_plans');
    if (savedPlans) {
      try {
        setPlans(JSON.parse(savedPlans));
      } catch (e) {
        console.error('Failed to load plans', e);
      }
    }
  }, []);

  // Save plans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('konserin_plans', JSON.stringify(plans));
  }, [plans]);

  const addPlan = (plan: ConcertPlan) => {
    setPlans((prev) => [...prev, plan]);
  };

  const updateCurrentPlan = (updates: Partial<ConcertPlan>) => {
    setCurrentPlan((prev) => ({ ...prev, ...updates }));
  };

  const clearCurrentPlan = () => {
    setCurrentPlan(null);
  };

  return (
    <PlanContext.Provider
      value={{
        plans,
        currentPlan,
        addPlan,
        setCurrentPlan,
        updateCurrentPlan,
        clearCurrentPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}
