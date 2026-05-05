'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { Button } from '@/components/Button';
import { TransportType, ConcertPlan } from '@/lib/types';

export default function TransportFromPage() {
  const router = useRouter();
  const { currentPlan, updateCurrentPlan, addPlan, clearCurrentPlan } = usePlan();
  
  const [destination, setDestination] = useState(currentPlan?.origin || '');
  const [selectedOption, setSelectedOption] = useState<{name: string, price: string, type: TransportType} | null>(null);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;
    
    const finalPlan: ConcertPlan = {
      ...(currentPlan as ConcertPlan),
      id: Math.random().toString(36).substring(2, 9),
      transportFrom: {
        type: selectedOption.type,
        bookingStatus: 'booked',
        details: selectedOption.name,
      },
      createdAt: Date.now(),
    };

    addPlan(finalPlan);
    clearCurrentPlan();
    router.push('/dashboard');
  };

  const travelokaOptions = [
    { name: 'Garuda Indonesia GA-403', price: 'Rp 1.450.000', type: 'plane', icon: '✈️', class: 'Economy' },
    { name: 'Batik Air ID-6524', price: 'Rp 950.000', type: 'plane', icon: '✈️', class: 'Economy' },
    { name: 'Argo Bromo Anggrek', price: 'Rp 650.000', type: 'train', icon: '🚆', class: 'Executive' },
    { name: 'Taksaka Malam', price: 'Rp 550.000', type: 'train', icon: '🚆', class: 'Executive' },
    { name: 'DayTrans Executive', price: 'Rp 250.000', type: 'bus', icon: '🚌', class: 'Shuttle' },
    { name: 'Jackal Holidays', price: 'Rp 220.000', type: 'bus', icon: '🚌', class: 'Shuttle' },
  ];

  return (
    <div className="space-y-10 text-left">
      <div>
        <h2 className="text-3xl font-black text-main-darkbrown italic uppercase tracking-tighter">Perjalanan Pulang</h2>
        <p className="mt-3 text-[10px] font-bold text-main-darkbrown/40 uppercase tracking-widest leading-relaxed">
          Bekerja sama dengan <span className="text-main-gold">Traveloka</span> untuk kepulangan Anda.
        </p>
      </div>

      <form onSubmit={handleFinish} className="space-y-10">
        <div className="space-y-4 text-left">
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-main-darkbrown/40 ml-1">Lokasi Tujuan</label>
          <input
            type="text"
            required
            placeholder="KE KOTA MANA?"
            className="w-full rounded-2xl border-2 border-main-gray bg-transparent px-5 py-4 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/10 uppercase tracking-widest text-xs"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {destination && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between border-b-2 border-main-gray pb-4 mb-6">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-main-darkbrown/40">Opsi Tiket Kepulangan</label>
              <span className="text-[8px] font-black uppercase bg-[#0194f3] text-white px-3 py-1 rounded-full italic">Powered by Traveloka</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {travelokaOptions.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSelectedOption({name: opt.name, price: opt.price, type: opt.type as TransportType})}
                  className={`flex items-center justify-between rounded-[24px] border-2 px-6 py-5 transition-all duration-300 ${
                    selectedOption?.name === opt.name
                      ? 'border-main-gold bg-main-gold/5 text-main-darkbrown'
                      : 'border-main-gray bg-transparent text-main-darkbrown/30 hover:border-main-gold/30'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span className="text-2xl">{opt.icon}</span>
                    <div className="text-left">
                      <span className="block text-[11px] font-black uppercase tracking-widest italic leading-none">{opt.name}</span>
                      <span className="block text-[8px] font-bold text-main-darkbrown/30 uppercase tracking-[0.2em] mt-2">{opt.class} Class</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[12px] font-black text-main-darkbrown tracking-tight leading-none">{opt.price}</span>
                    <span className="block text-[7px] font-black text-main-gold uppercase tracking-widest mt-2">Book Now</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-2xl border-main-gray h-16 text-[10px] font-black uppercase tracking-widest"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={!selectedOption} 
            className="flex-[2] rounded-2xl h-16 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-main-darkbrown/10"
          >
            Finish Plan
          </Button>
        </div>
      </form>
    </div>
  );
}
