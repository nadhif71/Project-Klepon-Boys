'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { Button } from '@/components/Button';

export default function LocalToVenuePage() {
  const router = useRouter();
  const { currentPlan, updateCurrentPlan } = usePlan();
  
  const [type, setType] = useState(currentPlan?.localToVenue?.type || '');

  const handleNext = (skipped = false) => {
    updateCurrentPlan({
      localToVenue: {
        type: skipped ? '' : type,
        skipped,
      },
    });
    router.push('/plan/local-to-hotel');
  };

  const isPublicTransport = type === 'Transportasi Umum';
  const isGojek = type === 'Gojek';

  return (
    <div className="space-y-10 font-avenir">
      <div>
        <h2 className="text-3xl font-bold text-main-darkbrown uppercase tracking-tighter">Menuju Venue</h2>
        <p className="mt-3 text-main-darkbrown/40 font-bold uppercase tracking-widest text-[10px]">Pilih rute perjalanan terbaik menuju lokasi konser.</p>
      </div>

      <div className="space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: 'Gojek', label: 'Gojek' },
            { id: 'Transportasi Umum', label: 'Transportasi Umum', recommended: true },
            { id: 'Kendaraan Pribadi', label: 'Kendaraan Pribadi' }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setType(t.id)}
              className={`flex items-center justify-between rounded-2xl border-2 px-6 py-5 transition-all duration-300 relative ${
                type === t.id
                  ? 'border-main-gold bg-main-gold/5 text-main-darkbrown scale-[1.01]'
                  : 'border-main-gray bg-transparent text-main-darkbrown/30 hover:border-main-gold/30'
              }`}
            >
              <div className="flex flex-col items-start gap-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.1em]">{t.label}</span>
                {t.recommended && (
                  <span className="text-[7px] font-bold uppercase tracking-widest text-main-gold bg-main-gold/10 px-2 py-0.5 rounded-full">Recommended</span>
                )}
              </div>
              {type === t.id && <div className="h-2 w-2 rounded-full bg-main-gold shadow-lg shadow-main-gold/50"></div>}
            </button>
          ))}
        </div>

        {/* Dynamic Integration Display */}
        {type && !['Kendaraan Pribadi'].includes(type) && (
          <div className="rounded-[32px] bg-white border-2 border-main-gray p-8 space-y-8 shadow-2xl shadow-main-darkbrown/5 animate-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between border-b border-main-gray pb-4">
               <span className="text-[10px] font-bold uppercase tracking-widest text-main-gold">
                 {isPublicTransport ? 'Rute Perjalanan' : 'Partner Services'}
               </span>
               <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>

            {isPublicTransport && (
              <div className="space-y-8">
                <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                   {[
                     { name: 'TransJakarta', color: 'bg-red-500' },
                     { name: 'MRT / LRT', color: 'bg-blue-600' },
                     { name: 'JakLingko', color: 'bg-blue-400' }
                   ].map(mode => (
                     <div key={mode.name} className="shrink-0 flex items-center gap-2 bg-main-gray/20 px-3 py-1.5 rounded-lg border border-main-gray">
                        <div className={`h-1.5 w-1.5 rounded-full ${mode.color}`}></div>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-main-darkbrown/60">{mode.name}</span>
                     </div>
                   ))}
                </div>
                
                <p className="text-[11px] font-bold text-main-darkbrown uppercase tracking-widest leading-relaxed">
                  Rute menuju <span className="underline underline-offset-4">{currentPlan?.location || 'Venue'}</span> telah dioptimalkan.
                </p>
                
                <div className="aspect-video bg-main-cream/30 rounded-2xl border-2 border-main-gray flex items-center justify-center relative overflow-hidden group cursor-pointer">
                   <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=-6.2146,106.8451&zoom=13&size=600x300&markers=color:red%7C-6.2146,106.8451&markers=color:blue%7C-6.2200,106.8500&markers=color:green%7C-6.2100,106.8400&key=YOUR_API_KEY')] bg-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
                   <div className="relative z-10 text-[10px] font-bold uppercase tracking-[0.3em] text-main-darkbrown bg-white/90 backdrop-blur-md px-8 py-4 rounded-full border-2 border-main-gold shadow-2xl group-hover:scale-110 transition-all">
                     Buka Navigasi Rute
                   </div>
                </div>
              </div>
            )}

            {isGojek && (
              <div className="space-y-6">
                <p className="text-[11px] font-bold text-main-darkbrown uppercase tracking-widest leading-relaxed">
                  Official Partnership: <span className="text-main-gold text-sm">Gojek x Konserin</span>
                </p>
                <div className="bg-[#00AA13]/5 rounded-2xl border-2 border-[#00AA13]/20 p-8 space-y-6">
                   <div className="flex items-center gap-6">
                      <div className="h-14 w-14 rounded-2xl bg-[#00AA13] flex items-center justify-center text-white text-2xl shadow-xl shadow-[#00AA13]/20">🏍️</div>
                      <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-widest text-main-darkbrown">Pick-up Zone Prioritas</h4>
                        <p className="text-[9px] font-bold text-main-darkbrown/40 uppercase tracking-widest mt-2 leading-relaxed">Antrian khusus & titik jemput EO (Pintu 1/5). Sinyal lemah? Tetap bisa lapor titik jemput via QR.</p>
                      </div>
                   </div>
                   <button type="button" className="w-full bg-[#00AA13] text-white py-5 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:shadow-xl hover:shadow-[#00AA13]/20 transition-all">
                     Buka Aplikasi Gojek
                   </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="space-y-6 pt-6">
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-2xl border-main-gray h-16 text-[10px] font-bold uppercase tracking-widest"
              onClick={() => router.back()}
            >
              Kembali
            </Button>
            <Button
              type="button"
              className="flex-[2] rounded-2xl h-16 text-[10px] font-bold uppercase tracking-widest"
              disabled={!type}
              onClick={() => handleNext(false)}
            >
              Lanjut
            </Button>
          </div>
          
          <button
            type="button"
            onClick={() => handleNext(true)}
            className="w-full py-4 text-[10px] font-bold uppercase tracking-[0.4em] text-main-darkbrown/20 hover:text-main-gold transition-all group"
          >
            <span className="relative inline-block pb-1">
              Skip This Step
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-main-gold transition-all group-hover:w-full"></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
