'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { Button } from '@/components/Button';

export default function TicketPage() {
  const router = useRouter();
  const { currentPlan, updateCurrentPlan } = usePlan();
  
  const [concertName, setConcertName] = useState(currentPlan?.concertName || '');
  const [concertDate, setConcertDate] = useState(currentPlan?.concertDate || '');
  const [location, setLocation] = useState(currentPlan?.location || '');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentPlan({
      concertName,
      concertDate,
      location,
      ticketStatus: 'booked',
    });
    router.push('/plan/transport-to');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-main-darkbrown">Info Tiket Konser</h2>
        <p className="mt-2 text-main-darkbrown/60">Masukkan detail konser yang akan Anda datangi.</p>
      </div>

      <form onSubmit={handleNext} className="space-y-6">
        <div>
          <label htmlFor="concertName" className="block text-sm font-semibold text-main-darkbrown">
            Nama Konser
          </label>
          <input
            type="text"
            id="concertName"
            required
            placeholder="Contoh: Taylor Swift Eras Tour"
            className="mt-2 block w-full rounded-xl border-2 border-main-gray bg-transparent px-4 py-3 text-main-darkbrown focus:border-main-yellow focus:outline-none transition-colors"
            value={concertName}
            onChange={(e) => setConcertName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="concertDate" className="block text-sm font-semibold text-main-darkbrown">
            Tanggal Konser
          </label>
          <input
            type="date"
            id="concertDate"
            required
            className="mt-2 block w-full rounded-xl border-2 border-main-gray bg-transparent px-4 py-3 text-main-darkbrown focus:border-main-yellow focus:outline-none transition-colors"
            value={concertDate}
            onChange={(e) => setConcertDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-main-darkbrown">
            Lokasi Venue
          </label>
          <input
            type="text"
            id="location"
            required
            placeholder="Contoh: GBK, Jakarta"
            className="mt-2 block w-full rounded-xl border-2 border-main-gray bg-transparent px-4 py-3 text-main-darkbrown focus:border-main-yellow focus:outline-none transition-colors"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full">
            Lanjut ke Transportasi
          </Button>
        </div>
      </form>
    </div>
  );
}
