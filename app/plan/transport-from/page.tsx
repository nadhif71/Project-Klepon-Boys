'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { Button } from '@/components/Button';
import { TransportType, ConcertPlan } from '@/lib/types';

export default function TransportFromPage() {
  const router = useRouter();
  const { currentPlan, updateCurrentPlan, addPlan, clearCurrentPlan } = usePlan();
  
  const [type, setType] = useState<TransportType>(currentPlan?.transportFrom?.type || 'none');
  const [details, setDetails] = useState(currentPlan?.transportFrom?.details || '');

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalPlan: ConcertPlan = {
      ...(currentPlan as ConcertPlan),
      id: Math.random().toString(36).substring(2, 9),
      transportFrom: {
        type,
        bookingStatus: type !== 'none' ? 'booked' : 'none',
        details,
      },
      createdAt: Date.now(),
    };

    addPlan(finalPlan);
    clearCurrentPlan();
    router.push('/dashboard');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-main-darkbrown">Perjalanan Pulang</h2>
        <p className="mt-2 text-main-darkbrown/60">Bagaimana Anda akan pulang dari Jakarta?</p>
      </div>

      <form onSubmit={handleFinish} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {(['plane', 'train', 'bus', 'none'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all ${
                type === t
                  ? 'border-main-gold bg-main-yellow/10 text-main-darkbrown'
                  : 'border-main-gray bg-transparent text-main-darkbrown/40 hover:border-main-yellow/50'
              }`}
            >
              <span className="text-sm font-bold uppercase tracking-wider">
                {t === 'plane' ? 'Pesawat' : t === 'train' ? 'Kereta' : t === 'bus' ? 'Bus' : 'Lainnya/Tidak Ada'}
              </span>
            </button>
          ))}
        </div>

        {type !== 'none' && (
          <div>
            <label htmlFor="details" className="block text-sm font-semibold text-main-darkbrown">
              Detail Perjalanan (Opsional)
            </label>
            <textarea
              id="details"
              placeholder="Contoh: Tiket Kereta Api KA Argo Bromo, 08:00 PM"
              className="mt-2 block w-full rounded-xl border-2 border-main-gray bg-transparent px-4 py-3 text-main-darkbrown focus:border-main-yellow focus:outline-none transition-colors"
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            Kembali
          </Button>
          <Button type="submit" variant="secondary" className="flex-[2]">
            Selesaikan Rencana
          </Button>
        </div>
      </form>
    </div>
  );
}
