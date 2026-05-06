'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { Button } from '@/components/Button';

export default function HotelPage() {
  const router = useRouter();
  const { currentPlan, updateCurrentPlan } = usePlan();
  
  const [selectedHotel, setSelectedHotel] = useState<{name: string, price: string, area: string} | null>(
    currentPlan?.hotel?.name ? { name: currentPlan.hotel.name, price: '', area: '' } : null
  );
  const [checkIn, setCheckIn] = useState(currentPlan?.hotel?.checkIn || '');
  const [checkOut, setCheckOut] = useState(currentPlan?.hotel?.checkOut || '');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotel) return;

    updateCurrentPlan({
      hotel: {
        name: selectedHotel.name,
        bookingStatus: 'booked',
        checkIn,
        checkOut,
      },
    });
    router.push('/plan/local-to-venue');
  };

  const hotelOptions = [
    { name: 'Hotel Indonesia Kempinski', area: 'Bundaran HI', price: 'Rp 4.200.000', rating: '5.0' },
    { name: 'The Ritz-Carlton', area: 'Kuningan', price: 'Rp 3.850.000', rating: '5.0' },
    { name: 'Fairmont Jakarta', area: 'Senayan', price: 'Rp 3.500.000', rating: '4.9' },
    { name: 'Artotel GBK', area: 'Senayan', price: 'Rp 1.250.000', rating: '4.5' },
    { name: 'Harris Vertu Harmoni', area: 'Gajah Mada', price: 'Rp 1.100.000', rating: '4.7' },
  ];

  return (
    <div className="space-y-10 text-left font-avenir">
      <div>
        <h2 className="text-3xl font-bold text-main-darkbrown uppercase tracking-tighter">Akomodasi</h2>
        <p className="mt-3 text-[10px] font-bold text-main-darkbrown/40 uppercase tracking-widest leading-relaxed">
          Pilih penginapan terbaik via <span className="text-main-gold">Traveloka</span>.
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-10">
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="flex items-center justify-between border-b-2 border-main-gray pb-4 mb-6">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40">Rekomendasi Penginapan</label>
            <span className="text-[8px] font-bold uppercase bg-[#0194f3] text-white px-3 py-1 rounded-full">Powered by Traveloka</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
             {hotelOptions.map((hotel, i) => (
               <button
                 key={i}
                 type="button"
                 onClick={() => setSelectedHotel(hotel)}
                 className={`flex items-center justify-between rounded-[24px] border-2 px-6 py-5 transition-all duration-300 ${
                   selectedHotel?.name === hotel.name
                     ? 'border-main-gold bg-main-gold/5 text-main-darkbrown scale-[1.01]'
                     : 'border-main-gray bg-transparent text-main-darkbrown/30 hover:border-main-gold/30'
                 }`}
               >
                 <div className="text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-bold uppercase tracking-widest">{hotel.name}</span>
                      <span className="text-[7px] font-bold text-main-gold">★ {hotel.rating}</span>
                    </div>
                    <span className="block text-[9px] font-bold opacity-40 uppercase tracking-[0.2em]">{hotel.area}</span>
                 </div>
                 <div className="text-right">
                    <span className="block text-[12px] font-bold text-main-darkbrown tracking-tight">{hotel.price}</span>
                    <span className="block text-[7px] font-bold opacity-30 uppercase tracking-widest mt-1">per night</span>
                 </div>
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 ml-1">Check-in</label>
            <input
              type="date"
              required
              className="w-full rounded-2xl border-2 border-main-gray bg-transparent px-5 py-4 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/10 uppercase tracking-widest text-xs"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 ml-1">Check-out</label>
            <input
              type="date"
              required
              className="w-full rounded-2xl border-2 border-main-gray bg-transparent px-5 py-4 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/10 uppercase tracking-widest text-xs"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            className="flex-1 rounded-2xl border-main-gray h-16 text-[10px] font-bold uppercase tracking-widest"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button 
            type="submit" 
            disabled={!selectedHotel || !checkIn || !checkOut} 
            className="flex-[2] rounded-2xl h-16 text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-main-darkbrown/10"
          >
            Next Step
          </Button>
        </div>
      </form>
    </div>
  );
}
