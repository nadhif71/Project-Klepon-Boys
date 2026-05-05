'use client';

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { ConcertCarousel } from "@/components/ConcertCarousel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Home() {
  const router = useRouter();
  const { updateCurrentPlan } = usePlan();

  const handleConcertSelect = (name: string, location: string) => {
    updateCurrentPlan({
      concertName: name,
      location: location,
      ticketStatus: 'booked',
    });
    router.push('/plan/ticket');
  };

  const handleTransportSelect = (type: any, details: string) => {
    updateCurrentPlan({
      transportTo: { type, bookingStatus: 'booked', details }
    });
    router.push('/plan/transport-to');
  };

  const handleHotelSelect = (name: string) => {
    updateCurrentPlan({
      hotel: { name, bookingStatus: 'booked' }
    });
    router.push('/plan/hotel');
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-main-gold/30 bg-white">
      <Navbar />
      
      <main className="flex-1 relative">
        {/* Unique Background Design */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-main-gold/5 via-white to-white"></div>
          <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-main-yellow/5 blur-[120px]"></div>
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(var(--raw-main-gold) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        </div>

        {/* Full Width Carousel Section */}
        <section className="w-full">
          <ConcertCarousel />
        </section>

        {/* Hero Content Section */}
        <section className="pt-24 pb-20 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-main-darkbrown px-4 py-1.5 text-[10px] font-black text-main-yellow uppercase tracking-[0.2em] mb-8 border border-main-gold/30">
                #1 Concert Planner in Jakarta
              </div>
              
              <p className="text-lg md:text-xl text-main-darkbrown/40 max-w-2xl mx-auto leading-relaxed font-bold uppercase tracking-widest text-[12px] mb-12">
                Platform all-in-one untuk merencanakan tiket, transportasi, hingga hotel.
              </p>

              {/* Enhanced Search Bar */}
              <div className="max-w-2xl mx-auto relative group mb-24">
                <div className="relative flex items-center bg-white rounded-[26px] border-2 border-main-gray p-2 shadow-2xl shadow-main-darkbrown/5 focus-within:border-main-gold transition-all duration-300">
                  <div className="flex-1 flex items-center px-4">
                    <svg className="h-5 w-5 text-main-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Cari konser, artis, atau venue..." 
                      className="w-full px-4 py-3 bg-transparent text-main-darkbrown font-bold focus:outline-none placeholder:text-main-darkbrown/20 uppercase tracking-widest text-xs"
                    />
                  </div>
                  <Button size="lg" className="rounded-2xl px-10 hidden sm:block h-14 text-xs font-black uppercase tracking-widest">
                    Cari Tiket
                  </Button>
                </div>
              </div>
            </div>

            {/* Roblox-style Horizontal Sliders */}
            <div className="space-y-20 font-avenir">
              {/* Category 1: Concerts */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-main-darkbrown font-avenir">Trending Concerts</h3>
                  <Link href="/plan/ticket" className="text-[10px] font-bold uppercase text-main-gold tracking-widest hover:underline">View All</Link>
                </div>
                <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory">
                  {[
                    { name: "LANY", price: "Rp 1.500.000", info: "Stadium GBK", date: "Nov 2026", img: "/lany.jpg" },
                    { name: "Bruno Mars", price: "Rp 2.200.000", info: "JIS Jakarta", date: "Dec 2026", img: "/bruno.jpg" },
                    { name: "Coldplay", price: "Rp 3.000.000", info: "GBK Jakarta", date: "Jan 2027", img: "/coldplay.jpg" },
                    { name: "TULUS", price: "Rp 800.000", info: "JIEXPO", date: "Oct 2026", img: "/tulus.jpg" },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleConcertSelect(item.name, item.info)}
                      className="min-w-[240px] md:min-w-[280px] snap-start group cursor-pointer block"
                    >
                      <div className="aspect-[4/3] rounded-[24px] bg-main-cream mb-4 overflow-hidden relative border-2 border-main-gray group-hover:border-main-gold transition-all duration-300">
                         <div className="absolute inset-0 bg-gradient-to-br from-main-darkbrown/10 to-transparent z-10"></div>
                         <div className="w-full h-full bg-main-cream flex items-center justify-center text-main-darkbrown/10 font-bold text-4xl text-center px-4 leading-none font-avenir">
                           {item.name}
                         </div>
                         <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] font-bold text-main-darkbrown uppercase tracking-widest border border-main-gray z-20">
                           {item.date}
                         </div>
                      </div>
                      <h4 className="text-sm font-bold text-main-darkbrown uppercase tracking-tight mb-1 font-avenir">{item.name}</h4>
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-main-gold uppercase tracking-widest">{item.price}</span>
                         <span className="text-[9px] font-bold text-main-darkbrown/40 uppercase tracking-widest">{item.info}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 2: Transport */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-main-darkbrown font-avenir">Travel Partners</h3>
                  <Link href="/plan/transport-to" className="text-[10px] font-bold uppercase text-main-gold tracking-widest hover:underline">View All</Link>
                </div>
                <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory">
                  {[
                    { name: "Garuda Indonesia", price: "Starts Rp 1.2M", info: "Flight • Priority", type: 'plane' },
                    { name: "KAI Argo Bromo", price: "Starts Rp 600k", info: "Train • Executive", type: 'train' },
                    { name: "Citilink", price: "Starts Rp 800k", info: "Flight • Economy", type: 'plane' },
                    { name: "KAI Taksaka", price: "Starts Rp 550k", info: "Train • Executive", type: 'train' },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleTransportSelect(item.type, item.name)}
                      className="min-w-[240px] md:min-w-[280px] snap-start group cursor-pointer block"
                    >
                      <div className="aspect-[16/9] rounded-[24px] bg-main-cream mb-4 overflow-hidden relative border-2 border-main-gray group-hover:border-main-gold transition-all duration-300">
                         <div className="absolute inset-0 bg-gradient-to-br from-main-darkbrown/5 to-transparent z-10"></div>
                         <div className="w-full h-full bg-main-cream flex items-center justify-center text-main-darkbrown/10 font-bold text-2xl text-center px-4 leading-none font-avenir">
                           {item.name}
                         </div>
                      </div>
                      <h4 className="text-sm font-bold text-main-darkbrown uppercase tracking-tight mb-1 font-avenir">{item.name}</h4>
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-main-gold uppercase tracking-widest">{item.price}</span>
                         <span className="text-[9px] font-bold text-main-darkbrown/40 uppercase tracking-widest">{item.info}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category 3: Hotels */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-main-darkbrown font-avenir">Recommended Akomodasi</h3>
                  <Link href="/plan/hotel" className="text-[10px] font-bold uppercase text-main-gold tracking-widest hover:underline">View All</Link>
                </div>
                <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar snap-x snap-mandatory">
                  {[
                    { name: "The Ritz-Carlton", price: "Rp 4.500.000", info: "5 Star • Kuningan", bestChoice: true },
                    { name: "Kempinski", price: "Rp 5.200.000", info: "5 Star • Bundaran HI", bestChoice: false },
                    { name: "Fairmont Jakarta", price: "Rp 3.800.000", info: "5 Star • Senayan", bestChoice: true },
                    { name: "Artotel GBK", price: "Rp 1.200.000", info: "4 Star • Senayan", bestChoice: false },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleHotelSelect(item.name)}
                      className="min-w-[240px] md:min-w-[280px] snap-start group cursor-pointer block"
                    >
                      <div className="aspect-[4/3] rounded-[24px] bg-main-cream/50 mb-4 overflow-hidden relative border-2 border-main-gray group-hover:border-main-gold transition-all duration-300">
                         <div className="absolute inset-0 bg-gradient-to-br from-main-darkbrown/10 to-transparent z-10"></div>
                         <div className="w-full h-full bg-main-cream/30 flex items-center justify-center text-main-darkbrown/10 font-bold text-2xl text-center px-4 leading-none font-avenir">
                           {item.name}
                         </div>
                         {item.bestChoice && (
                           <div className="absolute top-4 right-4 rounded-lg bg-main-yellow px-2 py-1 text-[8px] font-bold text-main-darkbrown uppercase tracking-widest z-20 font-avenir">
                             Best Choice
                           </div>
                         )}
                      </div>
                      <h4 className="text-sm font-bold text-main-darkbrown uppercase tracking-tight mb-1 font-avenir">{item.name}</h4>
                      <div className="flex items-center justify-between">
                         <span className="text-[10px] font-bold text-main-gold uppercase tracking-widest">{item.price}/night</span>
                         <span className="text-[9px] font-bold text-main-darkbrown/40 uppercase tracking-widest">{item.info}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full-Width Split Section: Flow vs CTA */}
        <section className="w-full flex flex-col md:flex-row min-h-[700px] mt-24 mb-24">
            {/* Left Part: Alur Perencanaan */}
            <div className="flex-1 bg-main-cream/20 p-12 md:p-24 lg:p-32 flex flex-col justify-center border-y-2 md:border-y-0 md:border-r-2 border-main-gray relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--raw-main-gold) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
                
                <div className="relative z-10 max-w-xl mx-auto md:mr-0 font-avenir">
                  <h2 className="text-[14px] font-bold uppercase tracking-[0.5em] text-main-gold mb-24 font-avenir">Alur Perencanaan</h2>
                  
                  <div className="space-y-12 relative">
                    <div className="absolute top-0 left-7 w-0.5 h-full bg-main-gold/20"></div>
                    
                    {[
                      { step: "01", title: "Konfirmasi Tiket", desc: "Pilih konser dan amankan tiket Anda." },
                      { step: "02", title: "Transportasi Utama", desc: "Atur perjalanan ke venue dengan mudah." },
                      { step: "03", title: "Akomodasi", desc: "Booking penginapan terbaik di lokasi strategis." },
                      { step: "04", title: "Selesai", desc: "Cek itinerary lengkap di dashboard Anda.", last: true }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-12 group relative text-left font-avenir">
                        <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 text-lg font-bold transition-all duration-300 relative z-10 font-avenir ${
                          item.last ? 'bg-main-darkbrown text-main-yellow shadow-xl shadow-main-darkbrown/20' : 'bg-white border-2 border-main-gray text-main-darkbrown group-hover:border-main-gold group-hover:text-main-gold shadow-sm'
                        }`}>
                          {item.step}
                        </div>
                        <div className="pt-2">
                          <h3 className="text-xl font-bold uppercase tracking-tight text-main-darkbrown mb-1 font-avenir">{item.title}</h3>
                          <p className="text-[11px] font-bold text-main-darkbrown/40 uppercase tracking-widest leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>

            {/* Right Part: CTA Buttons (Background Dark) */}
            <div className="flex-1 bg-main-darkbrown p-12 md:p-24 lg:p-32 flex flex-col justify-center items-center text-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-main-gold/5 to-transparent opacity-50"></div>
                
                <div className="relative z-10 max-w-md w-full space-y-12">
                  <h2 className="text-4xl md:text-6xl font-bold text-white uppercase leading-none tracking-tighter font-avenir">
                    Siap Untuk <br />
                    <span className="text-main-yellow underline decoration-main-gold underline-offset-[12px] decoration-4 text-center block">Konsermu?</span>
                  </h2>
                  <p className="text-main-cream/40 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">Mulai sekarang dan kelola semua rencana Anda dengan mudah.</p>
                  
                  <div className="flex flex-col gap-6">
                      <Link href="/dashboard" className="w-full">
                        <Button variant="outline" className="w-full rounded-2xl py-8 h-auto text-main-white border-main-white/20 hover:border-main-yellow hover:text-main-yellow font-black uppercase tracking-[0.4em] text-xs">
                          Lihat Dashboard
                        </Button>
                      </Link>
                      <Link href="/plan/ticket" className="w-full">
                        <Button className="w-full rounded-2xl py-8 h-auto bg-main-yellow text-main-darkbrown font-black uppercase tracking-[0.4em] text-xs hover:bg-main-gold transition-all">
                          + Tambah Rencana
                        </Button>
                      </Link>
                  </div>
                </div>
            </div>
        </section>

        <div className="h-24"></div>
      </main>

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
