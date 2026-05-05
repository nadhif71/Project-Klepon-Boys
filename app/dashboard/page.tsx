'use client';

import { useState } from 'react';
import { usePlan } from '@/context/PlanContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { ConcertPlan } from '@/lib/types';

type DetailModalInfo = {
  title: string;
  subtitle: string;
  type: 'transport' | 'hotel' | 'local';
  data: any;
};

export default function DashboardPage() {
  const { plans } = usePlan();
  const [selectedDetail, setSelectedDetail] = useState<DetailModalInfo | null>(null);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50/50">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="inline-block rounded-lg bg-main-gold/10 px-3 py-1 text-[10px] font-black text-main-gold uppercase tracking-[0.2em] mb-4 border border-main-gold/20">
                Personal Workspace
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-main-darkbrown uppercase font-avenir">Dashboard <span className="text-main-gold">Saya</span></h1>
            </div>
            <Link href="/plan/ticket">
              <Button className="rounded-2xl px-10 h-14 text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-main-darkbrown/10 hover:translate-y-[-2px] transition-all duration-300">
                + New Plan
              </Button>
            </Link>
          </div>

          {plans.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[40px] bg-white p-16 text-center shadow-2xl shadow-main-darkbrown/5 border-2 border-main-gray/50">
              <h3 className="text-2xl font-bold text-main-darkbrown uppercase font-avenir">Belum ada rencana yang tersimpan</h3>
              <Link href="/plan/ticket" className="mt-10">
                <Button variant="secondary" size="lg" className="rounded-2xl px-10">Mulai Merencanakan</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-10">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} onDetailClick={setSelectedDetail} />
              ))}
            </div>
          )}
        </div>

        {selectedDetail && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-main-darkbrown/90 backdrop-blur-xl animate-in fade-in duration-300 font-avenir">
             <div className="bg-white rounded-[40px] max-w-xl w-full max-h-[90vh] overflow-y-auto p-10 relative shadow-2xl animate-in zoom-in-95 duration-300 no-scrollbar">
                <button onClick={() => setSelectedDetail(null)} className="absolute top-8 right-8 text-main-darkbrown/20 hover:text-main-gold transition-colors">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-main-gold mb-2">{selectedDetail.title}</div>
                <h2 className="text-3xl font-bold text-main-darkbrown uppercase tracking-tighter mb-8">{selectedDetail.subtitle}</h2>
                
                <div className="space-y-6">
                  {selectedDetail.type === 'transport' && (
                    <div className="space-y-8">
                       <div className="flex flex-col items-center bg-main-cream/20 rounded-3xl p-8 border-2 border-dashed border-main-gray">
                          <div className="w-48 h-48 bg-white p-6 rounded-3xl shadow-inner border-2 border-main-gray mb-6 flex items-center justify-center relative group">
                             {/* Template QR Code Marker corners */}
                             <div className="absolute top-6 left-6 w-10 h-10 border-4 border-main-darkbrown rounded-lg"></div>
                             <div className="absolute top-6 right-6 w-10 h-10 border-4 border-main-darkbrown rounded-lg"></div>
                             <div className="absolute bottom-6 left-6 w-10 h-10 border-4 border-main-darkbrown rounded-lg"></div>
                             
                             {/* Empty Placeholder Pattern */}
                             <div className="w-full h-full opacity-5 flex flex-wrap gap-1 items-center justify-center">
                                {[...Array(64)].map((_, i) => (
                                  <div key={i} className="w-2 h-2 bg-main-darkbrown rounded-sm"></div>
                                ))}
                             </div>
                             
                             <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-main-darkbrown/20 group-hover:text-main-gold transition-colors">Scan Ready</span>
                             </div>
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-main-darkbrown/40">Booking Number</p>
                            <p className="text-2xl font-bold text-main-darkbrown tracking-widest uppercase mt-1">TRV-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
                          </div>
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-main-gray/10 p-5 rounded-3xl border border-main-gray">
                             <p className="text-[8px] font-bold uppercase text-main-darkbrown/40 tracking-widest">Gate / Platform</p>
                             <p className="text-sm font-bold text-main-darkbrown uppercase mt-1">{selectedDetail.data.type === 'plane' ? 'GATE 4B' : 'Platform 2'}</p>
                          </div>
                          <div className="bg-main-gray/10 p-5 rounded-3xl border border-main-gray">
                             <p className="text-[8px] font-bold uppercase text-main-darkbrown/40 tracking-widest">Seat / Class</p>
                             <p className="text-sm font-bold text-main-darkbrown uppercase mt-1">14A • Economy</p>
                          </div>
                       </div>

                       <div className="bg-main-darkbrown text-white p-8 rounded-[32px] space-y-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-main-gold">Info Penting Traveloka</h4>
                          <ul className="text-[10px] font-bold space-y-3 opacity-80 uppercase tracking-widest leading-relaxed">
                             <li className="flex gap-3">
                                <span className="text-main-gold">01</span>
                                <span>Tunjukkan E-tiket ini saat Check-in</span>
                             </li>
                             <li className="flex gap-3">
                                <span className="text-main-gold">02</span>
                                <span>Bagasi terdaftar maksimal 20kg</span>
                             </li>
                             <li className="flex gap-3">
                                <span className="text-main-gold">03</span>
                                <span>Datang 2 jam sebelum keberangkatan</span>
                             </li>
                          </ul>
                       </div>
                    </div>
                  )}

                  {selectedDetail.type === 'hotel' && (
                    <div className="space-y-8">
                       <div className="flex flex-col items-center bg-main-gold/5 rounded-3xl p-8 border-2 border-main-gold/20">
                          <div className="w-full h-20 flex items-center justify-center gap-1.5 mb-6 px-4">
                             {[...Array(30)].map((_, i) => (
                               <div key={i} className={`w-1.5 bg-main-darkbrown rounded-full ${Math.random() > 0.4 ? 'h-full' : 'h-1/2'}`}></div>
                             ))}
                          </div>
                          <div className="text-center">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-main-darkbrown/40">Hotel Booking ID</p>
                            <p className="text-2xl font-bold text-main-darkbrown tracking-widest uppercase mt-1">HTL-{Math.random().toString(36).substring(2, 8).toUpperCase()}</p>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-1 p-6 bg-white border-2 border-main-gray rounded-[32px]">
                             <div className="text-center">
                               <p className="text-[8px] font-bold uppercase text-main-darkbrown/40 tracking-widest mb-1">Check-in</p>
                               <p className="text-xs font-bold text-main-darkbrown uppercase">14:00 WIB</p>
                             </div>
                             <div className="flex items-center justify-center">
                                <div className="h-8 w-[1px] bg-main-gray"></div>
                             </div>
                             <div className="text-center">
                               <p className="text-[8px] font-bold uppercase text-main-darkbrown/40 tracking-widest mb-1">Check-out</p>
                               <p className="text-xs font-bold text-main-darkbrown uppercase">12:00 WIB</p>
                             </div>
                          </div>
                          
                          <div className="bg-main-cream/30 p-8 rounded-[32px] border-2 border-main-gray">
                             <div className="flex items-center gap-3 mb-4">
                                <div className="h-2 w-2 rounded-full bg-main-gold"></div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-main-darkbrown">Informasi Tambahan</h4>
                             </div>
                             <p className="text-[10px] font-bold text-main-darkbrown/60 uppercase tracking-widest leading-relaxed">
                               Konfirmasi instan. Sarapan tersedia mulai pukul 06:00. Parkir gratis bagi tamu menginap. Harap membawa KTP saat check-in.
                             </p>
                          </div>
                       </div>
                    </div>
                  )}

                  {selectedDetail.type === 'local' && (
                    <div className="space-y-8">
                       {selectedDetail.data.type === 'Gojek' ? (
                         <div className="space-y-6">
                            <div className="bg-[#00AA13] p-8 rounded-[32px] text-white shadow-xl shadow-[#00AA13]/20 relative overflow-hidden">
                               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                               <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2 tracking-[0.2em]">Partner Resmi</h4>
                               <p className="text-3xl font-bold uppercase tracking-tighter">Gojek Priority</p>
                            </div>
                            
                            <div className="space-y-4">
                               <div className="p-8 bg-white border-2 border-main-gray rounded-[40px] space-y-8 relative">
                                  <div className="absolute left-10 top-14 bottom-14 w-[2px] border-l-2 border-dashed border-main-gray"></div>
                                  
                                  <div className="flex items-start gap-6 relative z-10">
                                     <div className="h-5 w-5 rounded-full bg-white border-4 border-[#00AA13] shrink-0 mt-1 shadow-lg shadow-green-500/20"></div>
                                     <div>
                                        <p className="text-[8px] font-bold uppercase text-main-darkbrown/40 tracking-widest mb-1">Pick-up Zone</p>
                                        <p className="text-[11px] font-bold text-main-darkbrown uppercase">Titik Jemput Konserin (Pintu 5)</p>
                                        <p className="text-[9px] font-bold text-main-darkbrown/30 uppercase tracking-widest mt-1 leading-relaxed">Cari totem hijau berlogo Gojek x Konserin</p>
                                     </div>
                                  </div>
                                  
                                  <div className="flex items-start gap-6 relative z-10">
                                     <div className="h-5 w-5 rounded-full bg-white border-4 border-main-gold shrink-0 mt-1 shadow-lg shadow-main-gold/20"></div>
                                     <div>
                                        <p className="text-[8px] font-bold uppercase text-main-darkbrown/40 tracking-widest mb-1">Alamat Tujuan</p>
                                        <p className="text-[11px] font-bold text-main-darkbrown uppercase leading-tight">{selectedDetail.data.targetAddress || 'Gelora Bung Karno, Jakarta'}</p>
                                     </div>
                                  </div>
                               </div>
                               
                               <div className="bg-main-gold/5 border-2 border-main-gold/20 rounded-3xl p-6 flex items-center justify-between group cursor-pointer hover:bg-main-gold/10 transition-colors">
                                  <div>
                                     <p className="text-[8px] font-bold uppercase text-main-gold tracking-widest mb-1">Promo Code</p>
                                     <p className="text-lg font-bold text-main-darkbrown tracking-widest uppercase">KONSERIN2026</p>
                                  </div>
                                  <div className="h-10 w-10 rounded-xl bg-main-gold text-white flex items-center justify-center font-bold text-[10px] uppercase">COPY</div>
                               </div>
                            </div>
                         </div>
                       ) : (
                         <div className="space-y-6">
                            <div className="p-8 bg-main-darkbrown rounded-[40px] text-white space-y-10 relative overflow-hidden">
                               <div className="absolute top-0 right-0 w-32 h-32 bg-main-gold opacity-5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
                               
                               <div className="flex items-center justify-between relative z-10">
                                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-main-gold">Rute Integrasi</h4>
                                  <div className="px-4 py-1.5 rounded-full bg-white/10 text-[9px] font-bold tracking-widest uppercase border border-white/5 backdrop-blur-md">Multi-Modal</div>
                               </div>
                               
                               <div className="space-y-0 relative z-10">
                                  <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-main-gold via-white/20 to-main-gold"></div>
                                  
                                  {/* Route Steps */}
                                  <div className="relative pl-10 pb-10">
                                     <div className="absolute left-0 top-0 h-4.5 w-4.5 rounded-full bg-main-gold border-4 border-main-darkbrown shadow-lg shadow-main-gold/20"></div>
                                     <div className="space-y-1">
                                        <p className="text-[12px] font-bold uppercase tracking-tight">Titik Awal</p>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">Mulai dari lokasi Anda saat ini</p>
                                     </div>
                                  </div>
                                  
                                  <div className="relative pl-10 pb-10">
                                     <div className="absolute left-0 top-0 h-4.5 w-4.5 rounded-full bg-white border-4 border-main-darkbrown shadow-lg shadow-white/20"></div>
                                     <div className="space-y-2">
                                        <p className="text-[12px] font-bold uppercase tracking-tight">Transit: Dukuh Atas</p>
                                        <div className="flex gap-2">
                                           <span className="px-2 py-0.5 rounded bg-blue-500 text-[8px] font-bold">MRT</span>
                                           <span className="px-2 py-0.5 rounded bg-orange-500 text-[8px] font-bold">LRT</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-relaxed">Pindah ke TransJakarta Koridor 1 (Blok M)</p>
                                     </div>
                                  </div>
                                  
                                  <div className="relative pl-10">
                                     <div className="absolute left-0 top-0 h-4.5 w-4.5 rounded-full bg-main-gold border-4 border-main-darkbrown shadow-lg shadow-main-gold/20"></div>
                                     <div className="space-y-1">
                                        <p className="text-[12px] font-bold uppercase tracking-tight">{selectedDetail.subtitle}</p>
                                        <p className="text-[10px] font-bold text-main-gold uppercase tracking-widest leading-relaxed">Tujuan Akhir Tercapai</p>
                                     </div>
                                  </div>
                               </div>
                            </div>
                            
                            <Button className="w-full bg-main-gold text-main-darkbrown h-16 rounded-3xl font-bold text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-main-gold/20 border-b-4 border-main-darkbrown/20 hover:translate-y-1 transition-all">Buka Navigasi Rute</Button>
                         </div>
                       )}
                    </div>
                  )}
                </div>

                <Button onClick={() => setSelectedDetail(null)} variant="outline" className="w-full mt-10 rounded-2xl h-16 font-bold uppercase tracking-widest border-main-gray text-main-darkbrown/20">Kembali ke Dashboard</Button>
             </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function PlanCard({ plan, onDetailClick }: { plan: ConcertPlan; onDetailClick: (info: DetailModalInfo) => void }) {
  return (
    <div className="overflow-hidden rounded-[40px] bg-white shadow-2xl shadow-main-darkbrown/5 border-2 border-main-gray/50 transition-all duration-500 hover:border-main-gold/30 group">
      <div className="bg-main-darkbrown p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-main-gold opacity-5 rounded-full translate-x-1/4 -translate-y-1/4"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-main-white tracking-tight uppercase font-avenir">{plan.concertName}</h2>
          <p className="text-main-cream/40 text-[10px] mt-3 font-bold uppercase tracking-[0.2em] flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-main-gold animate-pulse"></span>
            {new Date(plan.concertDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} • {plan.location}
          </p>
        </div>
        <div className="relative z-10 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
           <span className="text-[10px] font-bold text-main-gold uppercase tracking-[0.3em] font-avenir tracking-tighter">PLAN ID: {plan.id.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="p-10 md:p-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <DetailItem 
            label="Kepergian" 
            value={plan.transportTo.details || plan.transportTo.type} 
            icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>}
            onClick={() => onDetailClick({ 
              title: 'Tiket Kepergian', 
              subtitle: plan.transportTo.details || plan.transportTo.type, 
              type: 'transport', 
              data: { type: plan.transportTo.type, origin: plan.origin } 
            })}
          />
          <DetailItem 
            label="Kepulangan" 
            value={plan.transportFrom?.details || plan.transportFrom?.type || 'Belum diatur'} 
            icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>}
            onClick={() => onDetailClick({ 
              title: 'Tiket Kepulangan', 
              subtitle: plan.transportFrom?.details || plan.transportFrom?.type || 'Pulang', 
              type: 'transport', 
              data: { type: plan.transportFrom?.type, origin: plan.location } 
            })}
          />
          <DetailItem 
            label="Penginapan" 
            value={plan.hotel.name || 'Tidak menginap'} 
            icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" /></svg>}
            onClick={() => onDetailClick({ 
              title: 'Detail Akomodasi', 
              subtitle: plan.hotel.name || 'Hotel', 
              type: 'hotel', 
              data: { hotel: plan.hotel } 
            })}
          />
          <DetailItem 
            label="Ke Venue" 
            value={plan.localToVenue.skipped ? 'Tidak diatur' : plan.localToVenue.type} 
            icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>}
            onClick={() => onDetailClick({ 
              title: 'Rute Menuju Venue', 
              subtitle: plan.location, 
              type: 'local', 
              data: { type: plan.localToVenue.type, targetAddress: plan.location } 
            })}
          />
          <DetailItem 
            label="Ke Hotel" 
            value={plan.localToHotel?.skipped ? 'Tidak diatur' : plan.localToHotel?.type || 'Sama dgn Ke Venue'} 
            icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3" /></svg>}
            onClick={() => onDetailClick({ 
              title: 'Rute Kembali ke Hotel', 
              subtitle: plan.hotel.name || 'Penginapan', 
              type: 'local', 
              data: { type: plan.localToHotel?.type || plan.localToVenue.type, targetAddress: plan.hotel.name } 
            })}
          />
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, icon, onClick }: { label: string; value: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <div className="flex gap-6 group/item cursor-pointer" onClick={onClick}>
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-main-cream/50 text-main-gold group-hover/item:scale-110 group-hover/item:bg-main-yellow transition-all duration-500 shadow-sm border border-main-gray/30">
        {icon}
      </div>
      <div>
        <dt className="text-[10px] font-black uppercase tracking-[0.2em] text-main-darkbrown/30 mb-1">{label}</dt>
        <dd className="text-xs font-bold text-main-darkbrown leading-tight uppercase tracking-tight">{value}</dd>
      </div>
    </div>
  );
}
