'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { Button } from '@/components/Button';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function TicketPage() {
  const router = useRouter();
  const { currentPlan, updateCurrentPlan } = usePlan();
  
  const [concertName, setConcertName] = useState(currentPlan?.concertName || '');
  const [location, setLocation] = useState(currentPlan?.location || '');
  const [concertDate, setConcertDate] = useState(currentPlan?.concertDate || '');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentPlan({
      concertName,
      location,
      concertDate,
      ticketStatus: 'booked',
    });
    router.push('/plan/transport-to');
  };

  return (
    <div className="space-y-10 text-left font-avenir">
      <ScrollReveal direction="none">
        <div>
          <h2 className="text-3xl font-bold text-main-darkbrown uppercase tracking-tighter">Konfirmasi Tiket</h2>
          <p className="mt-3 text-[10px] font-bold text-main-darkbrown/40 uppercase tracking-widest leading-relaxed">Pastikan Anda sudah memiliki tiket konser sebelum melanjutkan rencana.</p>
        </div>
      </ScrollReveal>

      <form onSubmit={handleNext} className="space-y-8">
        <ScrollReveal delay={100}>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 ml-1">Nama Konser</label>
              <input 
                type="text" 
                required
                placeholder="CONCERT NAME"
                className="w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-3 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/10 uppercase tracking-widest text-sm"
                value={concertName}
                onChange={(e) => setConcertName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 ml-1">Lokasi Venue</label>
                <input 
                  type="text" 
                  required
                  placeholder="VENUE LOCATION"
                  className="w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-3 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/10 uppercase tracking-widest text-sm"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 ml-1">Tanggal Konser</label>
                <input 
                  type="date" 
                  required
                  className="w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-3 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors uppercase tracking-widest text-sm"
                  value={concertDate}
                  onChange={(e) => setConcertDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl border-main-gray h-16 text-[10px] font-bold uppercase tracking-widest"
              onClick={() => router.push('/')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-[2] rounded-xl h-16 text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-main-gold/10"
            >
              Next Step
            </Button>
          </div>
        </ScrollReveal>
      </form>
    </div>
  );
}
