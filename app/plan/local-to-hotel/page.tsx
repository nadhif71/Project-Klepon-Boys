'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { Button } from '@/components/Button';

export default function LocalToHotelPage() {
  const router = useRouter();
  const { currentPlan, updateCurrentPlan } = usePlan();
  
  const [type, setType] = useState(currentPlan?.localToHotel?.type || '');

  const handleNext = (skipped = false) => {
    updateCurrentPlan({
      localToHotel: {
        type: skipped ? '' : type,
        skipped,
      },
    });
    router.push('/plan/transport-from');
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-main-darkbrown">Kembali ke Hotel (Opsional)</h2>
        <p className="mt-2 text-main-darkbrown/60">Bagaimana Anda akan pulang setelah konser?</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {['Gojek / Grab', 'TransJakarta', 'MRT / LRT', 'Kendaraan Pribadi'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`flex items-center justify-between rounded-2xl border-2 px-6 py-4 transition-all ${
                type === t
                  ? 'border-main-gold bg-main-yellow/10 text-main-darkbrown'
                  : 'border-main-gray bg-transparent text-main-darkbrown/40 hover:border-main-yellow/50'
              }`}
            >
              <span className="font-semibold">{t}</span>
              {type === t && <span className="text-main-gold">●</span>}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => router.back()}
          >
            Kembali
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="flex-1"
            onClick={() => handleNext(true)}
          >
            Lewati Langkah Ini
          </Button>
          <Button
            type="button"
            className="flex-[2]"
            disabled={!type}
            onClick={() => handleNext(false)}
          >
            Lanjut
          </Button>
        </div>
      </div>
    </div>
  );
}
