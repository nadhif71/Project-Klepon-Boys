'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import { Button } from '@/components/Button';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TransportType, ConcertPlan } from '@/lib/types';

const majorCities = [
  { 
    name: 'Jakarta', 
    hubs: {
      plane: ['Bandara Soekarno-Hatta (CGK)', 'Bandara Halim Perdanakusuma (HLP)'],
      train: ['Stasiun Gambir', 'Stasiun Senen']
    }
  },
  { 
    name: 'Surabaya', 
    hubs: {
      plane: ['Bandara Juanda (SUB)'],
      train: ['Stasiun Pasar Turi', 'Stasiun Gubeng']
    }
  },
  { 
    name: 'Bandung', 
    hubs: {
      plane: [],
      train: ['Stasiun Bandung', 'Stasiun Kiaracondong']
    }
  },
  { 
    name: 'Yogyakarta', 
    hubs: {
      plane: ['Yogyakarta International (YIA)'],
      train: ['Stasiun Tugu', 'Stasiun Lempuyangan']
    }
  },
  { 
    name: 'Semarang', 
    hubs: {
      plane: ['Bandara Ahmad Yani (SRG)'],
      train: ['Stasiun Tawang', 'Stasiun Poncol']
    }
  },
  { 
    name: 'Medan', 
    hubs: {
      plane: ['Bandara Kualanamu (KNO)'],
      train: ['Stasiun Medan']
    }
  },
];

const jakartaHubs = {
  plane: ['Bandara Soekarno-Hatta (CGK)', 'Bandara Halim Perdanakusuma (HLP)'],
  train: ['Stasiun Gambir', 'Stasiun Senen']
};

export default function TransportFromPage() {
  const router = useRouter();
  const { currentPlan, addPlan, clearCurrentPlan } = usePlan();
  
  const [transportType, setTransportType] = useState<TransportType>('plane');
  const [destCity, setDestCity] = useState('');
  const [selectedHub, setSelectedHub] = useState('');
  const [originHub, setOriginHub] = useState('');
  
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{name: string, price: string} | null>(null);
  
  const cityRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const originRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) setIsCityOpen(false);
      if (hubRef.current && !hubRef.current.contains(event.target as Node)) setIsHubOpen(false);
      if (originRef.current && !originRef.current.contains(event.target as Node)) setIsOriginOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOption) return;
    
    const finalPlan: ConcertPlan = {
      ...(currentPlan as ConcertPlan),
      id: Math.random().toString(36).substring(2, 9),
      transportFrom: {
        type: transportType,
        bookingStatus: 'booked',
        details: `${selectedOption.name} (Dari: ${originHub} Ke: ${destCity} - ${selectedHub})`,
      },
      createdAt: Date.now(),
    };

    addPlan(finalPlan);
    clearCurrentPlan();
    router.push('/dashboard');
  };

  const availableHubs = majorCities.find(c => c.name === destCity)?.hubs[transportType as 'plane' | 'train'] || [];
  const availableOriginHubs = jakartaHubs[transportType as 'plane' | 'train'];

  const travelokaOptions = transportType === 'plane' ? [
    { name: 'Garuda Indonesia GA-403', price: 'Rp 1.450.000', time: '16:00', class: 'Economy' },
    { name: 'Batik Air ID-6524', price: 'Rp 950.000', time: '18:30', class: 'Economy' },
    { name: 'Citilink QG-115', price: 'Rp 820.000', time: '14:45', class: 'Economy' },
  ] : [
    { name: 'Argo Bromo Anggrek', price: 'Rp 650.000', time: '20:00', class: 'Executive' },
    { name: 'Taksaka Malam', price: 'Rp 550.000', time: '22:00', class: 'Executive' },
    { name: 'Bima 77', price: 'Rp 600.000', time: '18:30', class: 'Executive' },
  ];

  return (
    <div className="space-y-10 text-left font-avenir">
      <ScrollReveal direction="none">
        <div>
          <h2 className="text-3xl font-bold text-main-darkbrown uppercase tracking-tighter">Kepulangan Utama</h2>
          <p className="mt-3 text-[10px] font-bold text-main-darkbrown/40 uppercase tracking-widest leading-relaxed">
            Atur tiket pulang Anda dari <span className="text-main-gold">Jakarta</span> via <span className="text-main-gold">Traveloka</span>.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="flex gap-2">
           {['plane', 'train'].map((t) => (
             <button
               key={t}
               type="button"
               onClick={() => {
                 setTransportType(t as TransportType);
                 setSelectedHub('');
                 setOriginHub('');
                 setSelectedOption(null);
               }}
               className={`flex-1 py-4 rounded-xl border-2 font-bold text-[10px] uppercase tracking-widest transition-all ${
                 transportType === t 
                 ? 'border-main-gold bg-main-gold text-white shadow-lg shadow-main-gold/20' 
                 : 'border-main-gray text-main-darkbrown/40 hover:border-main-gold/30'
               }`}
             >
               {t === 'plane' ? 'Pesawat' : 'Kereta Api'}
             </button>
           ))}
        </div>
      </ScrollReveal>

      <form onSubmit={handleFinish} className="space-y-8">
        <ScrollReveal delay={200}>
          <div className="grid grid-cols-1 gap-6">
            {/* Origin Hub (Fixed from Jakarta) */}
            <div className="space-y-3 relative" ref={originRef}>
              <label className="block text-[8px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 ml-1">Titik Jemput (Jakarta)</label>
              <div onClick={() => setIsOriginOpen(!isOriginOpen)} className="w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-4 flex items-center justify-between cursor-pointer hover:border-main-gold/50 transition-colors">
                <span className={`uppercase tracking-widest text-[10px] font-bold ${originHub ? 'text-main-darkbrown' : 'text-main-darkbrown/20'}`}>{originHub || 'PILIH TITIK DI JAKARTA'}</span>
                <svg className={`h-3 w-3 text-main-gold transition-transform ${isOriginOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </div>
              {isOriginOpen && (
                <div className="absolute z-[70] left-0 right-0 mt-2 bg-white rounded-xl border-2 border-main-gray shadow-2xl overflow-hidden">
                   {availableOriginHubs.map(hub => (
                     <div key={hub} onClick={() => { setOriginHub(hub); setIsOriginOpen(false); }} className="px-6 py-3 hover:bg-main-gold/5 cursor-pointer text-[10px] font-bold text-main-darkbrown/60 uppercase tracking-widest hover:text-main-darkbrown">{hub}</div>
                   ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Dest City */}
              <div className="space-y-3 relative" ref={cityRef}>
                <label className="block text-[8px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 ml-1">Kota Tujuan</label>
                <div onClick={() => originHub && setIsCityOpen(!isCityOpen)} className={`w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-4 flex items-center justify-between cursor-pointer transition-colors ${!originHub ? 'opacity-50 cursor-not-allowed' : 'hover:border-main-gold/50'}`}>
                  <span className={`uppercase tracking-widest text-[10px] font-bold ${destCity ? 'text-main-darkbrown' : 'text-main-darkbrown/20'}`}>{destCity || 'PILIH KOTA'}</span>
                  <svg className={`h-3 w-3 text-main-gold transition-transform ${isCityOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </div>
                {isCityOpen && (
                  <div className="absolute z-[70] left-0 right-0 mt-2 bg-white rounded-xl border-2 border-main-gray shadow-2xl overflow-hidden">
                     {majorCities.map(city => (
                       <div key={city.name} onClick={() => { setDestCity(city.name); setSelectedHub(''); setIsCityOpen(false); }} className="px-6 py-3 hover:bg-main-gold/5 cursor-pointer text-[10px] font-bold text-main-darkbrown/60 uppercase tracking-widest hover:text-main-darkbrown">{city.name}</div>
                     ))}
                  </div>
                )}
              </div>

              {/* Dest Hub */}
              <div className="space-y-3 relative" ref={hubRef}>
                <label className="block text-[8px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 ml-1">Titik Turun</label>
                <div onClick={() => destCity && setIsHubOpen(!isHubOpen)} className={`w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-4 flex items-center justify-between cursor-pointer transition-colors ${!destCity ? 'opacity-50 cursor-not-allowed' : 'hover:border-main-gold/50'}`}>
                  <span className={`uppercase tracking-widest text-[10px] font-bold ${selectedHub ? 'text-main-darkbrown' : 'text-main-darkbrown/20'}`}>{selectedHub || 'PILIH TITIK'}</span>
                  <svg className={`h-3 w-3 text-main-gold transition-transform ${isHubOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                </div>
                {isHubOpen && (
                  <div className="absolute z-[70] left-0 right-0 mt-2 bg-white rounded-xl border-2 border-main-gray shadow-2xl overflow-hidden">
                     {availableHubs.length > 0 ? availableHubs.map(hub => (
                       <div key={hub} onClick={() => { setSelectedHub(hub); setIsHubOpen(false); }} className="px-6 py-3 hover:bg-main-gold/5 cursor-pointer text-[10px] font-bold text-main-darkbrown/60 uppercase tracking-widest hover:text-main-darkbrown">{hub}</div>
                     )) : <div className="px-6 py-3 text-[10px] text-main-darkbrown/20 uppercase tracking-widest">Tidak tersedia</div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {selectedHub && (
          <ScrollReveal>
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center justify-between border-b border-main-gray pb-4">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40">Opsi Tiket Pulang</label>
                <span className="text-[8px] font-bold uppercase text-main-gold px-3 py-1 bg-main-gold/5 rounded-full">Official Traveloka Partner</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {travelokaOptions.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`flex items-center justify-between rounded-xl px-6 py-5 transition-all duration-300 ${
                      selectedOption?.name === opt.name
                        ? 'bg-main-gold/10 text-main-darkbrown'
                        : 'bg-main-gray/10 text-main-darkbrown/30 hover:bg-main-gray/20'
                    }`}
                  >
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                         <span className="block text-[11px] font-bold uppercase tracking-widest leading-none">{opt.name}</span>
                         <span className="text-[9px] font-bold text-main-gold uppercase tracking-tighter">[{opt.time}]</span>
                      </div>
                      <span className="block text-[8px] font-bold text-main-darkbrown/30 uppercase tracking-[0.2em] mt-1">{opt.class} Class</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[12px] font-bold text-main-darkbrown tracking-tight leading-none">{opt.price}</span>
                      <span className="block text-[7px] font-bold text-main-gold uppercase tracking-widest mt-2">Book Now</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={300}>
          <div className="flex gap-4 pt-6">
            <Button type="button" variant="outline" className="flex-1 rounded-xl border-main-gray h-16 text-[10px] font-bold uppercase tracking-widest" onClick={() => router.back()}>Back</Button>
            <Button type="submit" disabled={!selectedOption} className="flex-[2] rounded-xl h-16 text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-main-gold/10">Finish Plan</Button>
          </div>
        </ScrollReveal>
      </form>
    </div>
  );
}
