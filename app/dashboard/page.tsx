'use client';

import { usePlan } from '@/context/PlanContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { ConcertPlan } from '@/lib/types';

export default function DashboardPage() {
  const { plans } = usePlan();

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50/50">
      <Navbar />
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-main-yellow/5 blur-[120px]"></div>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <div className="inline-block rounded-lg bg-main-gold/10 px-3 py-1 text-[10px] font-black text-main-gold uppercase tracking-[0.2em] mb-4 border border-main-gold/20">
                Personal Workspace
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-main-darkbrown">Dashboard <span className="text-main-gold">Saya</span></h1>
              <p className="mt-3 text-main-darkbrown/50 text-lg font-medium">Kelola semua rencana konser Anda di satu tempat.</p>
            </div>
            <Link href="/plan/ticket">
              <Button className="rounded-2xl px-10 h-14 text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-main-darkbrown/10 hover:translate-y-[-2px] transition-all duration-300">
                + New Plan
              </Button>
            </Link>
          </div>

          {plans.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-[40px] bg-white p-16 text-center shadow-2xl shadow-main-darkbrown/5 border border-main-gray/50">
              <div className="mb-8 rounded-[32px] bg-main-cream p-8 group hover:scale-110 transition-transform duration-500">
                <svg className="h-16 w-16 text-main-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-main-darkbrown italic">Belum ada rencana yang tersimpan</h3>
              <p className="mt-4 text-main-darkbrown/40 max-w-sm mx-auto leading-relaxed">
                Mulai petualangan konser Anda hari ini dengan membuat itinerary pertama!
              </p>
              <Link href="/plan/ticket" className="mt-10">
                <Button variant="secondary" size="lg" className="rounded-2xl px-10">Mulai Merencanakan</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-10">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PlanCard({ plan }: { plan: ConcertPlan }) {
  return (
    <div className="overflow-hidden rounded-[32px] bg-white shadow-2xl shadow-main-darkbrown/5 border-2 border-main-gray/50 transition-all duration-500 hover:border-main-gold/30 group">
      <div className="bg-main-darkbrown p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative overflow-hidden">
        {/* Card Header Background Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-main-gold opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-black text-main-white tracking-tight">{plan.concertName}</h2>
          <p className="text-main-cream/50 text-sm mt-2 font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="text-main-gold">●</span>
            {new Date(plan.concertDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} • {plan.location}
          </p>
        </div>
        <div className="relative z-10 rounded-xl bg-white/10 backdrop-blur-md px-5 py-2 text-[10px] font-black text-main-yellow uppercase tracking-[0.2em] border border-white/20">
          Status: Aktif
        </div>
      </div>
      
      <div className="p-8 md:p-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Step 1 & 2 */}
          <div className="space-y-6">
            <DetailItem 
              label="Keberangkatan" 
              value={plan.transportTo.type !== 'none' ? `Pesawat/Kereta ke Jakarta` : 'Sudah di Jakarta'} 
              details={plan.transportTo.details}
              icon="✈️"
            />
            <DetailItem 
              label="Penginapan" 
              value={plan.hotel.name || 'Tidak menginap'} 
              details={plan.hotel.checkIn ? `Check-in: ${new Date(plan.hotel.checkIn).toLocaleDateString('id-ID')}` : undefined}
              icon="🏨"
            />
          </div>

          {/* Step 3 & 4 */}
          <div className="space-y-6">
            <DetailItem 
              label="Transportasi Lokal" 
              value={plan.localToVenue.skipped ? 'Tidak diatur' : `Ke Venue: ${plan.localToVenue.type}`} 
              icon="🚗"
            />
            <DetailItem 
              label="Setelah Konser" 
              value={plan.localToHotel.skipped ? 'Tidak diatur' : `Ke Hotel: ${plan.localToHotel.type}`} 
              icon="🌙"
            />
          </div>

          {/* Step 5 */}
          <div className="space-y-6">
            <DetailItem 
              label="Perjalanan Pulang" 
              value={plan.transportFrom.type !== 'none' ? `Kembali via ${plan.transportFrom.type}` : 'Tetap di Jakarta'} 
              details={plan.transportFrom.details}
              icon="🏠"
            />
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-main-gray/50 flex justify-end">
           <Button variant="ghost" className="text-main-darkbrown/40 hover:text-main-gold font-black text-[10px] uppercase tracking-widest">
             Hapus Rencana
           </Button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value, details, icon }: { label: string; value: string; details?: string; icon: string }) {
  return (
    <div className="flex gap-5 group/item">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-main-cream/50 text-xl group-hover/item:scale-110 group-hover/item:bg-main-yellow transition-all duration-300">
        {icon}
      </div>
      <div>
        <dt className="text-[10px] font-black uppercase tracking-[0.15em] text-main-darkbrown/30">{label}</dt>
        <dd className="mt-1 text-sm font-bold text-main-darkbrown leading-tight">{value}</dd>
        {details && <p className="mt-2 text-xs text-main-darkbrown/40 leading-relaxed italic border-l-2 border-main-gold/20 pl-3">{details}</p>}
      </div>
    </div>
  );
}
