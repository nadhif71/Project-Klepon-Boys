'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { Button } from '@/components/Button';

export default function HotelPage() {
  const router = useRouter();
  const { currentPlan, updateCurrentPlan } = usePlan();
  
  const [name, setName] = useState(currentPlan?.hotel?.name || '');
  const [checkIn, setCheckIn] = useState(currentPlan?.hotel?.checkIn || '');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentPlan({
      hotel: {
        name,
        bookingStatus: name ? 'booked' : 'none',
        checkIn,
      },
    });
    router.push('/plan/local-to-venue');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-main-darkbrown">Akomodasi (Hotel)</h2>
        <p className="mt-2 text-main-darkbrown/60">Di mana Anda akan menginap?</p>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        <div>
          <label htmlFor="hotelName" className="block text-sm font-semibold text-main-darkbrown">
            Nama Hotel / Penginapan
          </label>
          <input
            type="text"
            id="hotelName"
            placeholder="Contoh: Hotel Indonesia Kempinski"
            className="mt-2 block w-full rounded-xl border-2 border-main-gray bg-transparent px-4 py-3 text-main-darkbrown focus:border-main-yellow focus:outline-none transition-colors"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="checkIn" className="block text-sm font-semibold text-main-darkbrown">
            Tanggal Check-in
          </label>
          <input
            type="date"
            id="checkIn"
            className="mt-2 block w-full rounded-xl border-2 border-main-gray bg-transparent px-4 py-3 text-main-darkbrown focus:border-main-yellow focus:outline-none transition-colors"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            Kembali
          </Button>
          <Button type="submit" className="flex-[2]">
            Lanjut ke Transportasi Lokal
          </Button>
        </div>
      </form>
    </div>
  );
}
