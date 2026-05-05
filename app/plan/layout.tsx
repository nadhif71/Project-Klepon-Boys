'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import React from 'react';

const steps = [
  { name: 'Tiket', path: '/plan/ticket' },
  { name: 'Ke Jakarta', path: '/plan/transport-to' },
  { name: 'Hotel', path: '/plan/hotel' },
  { name: 'Ke Venue', path: '/plan/local-to-venue' },
  { name: 'Ke Hotel', path: '/plan/local-to-hotel' },
  { name: 'Pulang', path: '/plan/transport-from' },
];

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const currentStepIndex = steps.findIndex(step => pathname.startsWith(step.path));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Unique Background Design */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-main-gold/5 via-white to-white"></div>
          <div className="absolute top-[20%] -right-[10%] w-[400px] h-[400px] rounded-full bg-main-yellow/10 blur-[100px]"></div>
          <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] rounded-full bg-main-gold/5 blur-[80px]"></div>
        </div>

        <div className="mx-auto max-w-2xl">
          {/* Progress Bar */}
          <nav aria-label="Progress" className="mb-12">
            <ol role="list" className="flex items-center justify-between gap-2">
              {steps.map((step, index) => (
                <li key={step.name} className={`${index !== steps.length - 1 ? 'flex-1' : ''} relative flex items-center`}>
                  <div
                    className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-2 transition-all duration-300 ${
                      index < currentStepIndex
                        ? 'border-main-gold bg-main-gold text-white'
                        : index === currentStepIndex
                        ? 'border-main-gold bg-main-yellow text-main-darkbrown scale-110 shadow-lg shadow-main-yellow/20'
                        : 'border-main-gray bg-white text-main-gray'
                    }`}
                  >
                    {index < currentStepIndex ? (
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  
                  {index !== steps.length - 1 && (
                    <div
                      className={`h-1 w-full mx-2 rounded-full transition-colors duration-500 ${
                        index < currentStepIndex ? 'bg-main-gold' : 'bg-main-gray/30'
                      }`}
                    />
                  )}

                  {/* Step label for Desktop */}
                  <div className="absolute -bottom-7 left-0 hidden lg:block whitespace-nowrap">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      index === currentStepIndex ? 'text-main-gold' : 'text-main-darkbrown/30'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          {/* Page Content */}
          <div className="rounded-3xl bg-main-white p-8 shadow-xl shadow-main-darkbrown/5 sm:p-12">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
