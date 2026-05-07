'use client';

import { useState, useRef, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { ConcertCarousel } from "@/components/ConcertCarousel";
import { ScrollReveal } from "@/components/ScrollReveal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

type PopupInfo = {
  title: string;
  desc: string;
  price: string;
  location: string;
  img?: string;
  images?: string[];
  type: 'concert' | 'transport' | 'hotel';
};

export default function Home() {
  const router = useRouter();
  const { updateCurrentPlan } = usePlan();
  const [activePopup, setActivePopup] = useState<PopupInfo | null>(null);

  const handleConcertSelect = (name: string, location: string) => {
    updateCurrentPlan({ 
      concertName: name, 
      location: location, 
      ticketStatus: 'booked' 
    });
    router.push('/plan/transport-to');
  };

  const trendingConcerts = [
    { name: "LANY - Jakarta", img: "/images/lany.webp", price: "Rp 1.500.000", info: "Stadium GBK", date: "Nov 2026", desc: "Tur dunia 'a beautiful blur' dari LANY kini hadir di Jakarta. Jangan lewatkan pengalaman konser synth-pop yang tak terlupakan." },
    { name: "Keshi: Requiem Tour", img: "/images/keshi.webp", price: "Rp 1.800.000", info: "Istora Senayan", date: "Dec 2026", desc: "Keshi kembali ke Jakarta dengan tur album terbarunya, Requiem. Rasakan nuansa lo-fi hip-hop yang melankolis dan intim." },
    { name: "Coldplay Spheres", img: "/images/coldplay.webp", price: "Rp 3.000.000", info: "GBK Jakarta", date: "Jan 2027", desc: "Konser ramah lingkungan dengan visual spektakuler. Jadilah bagian dari sejarah tur Music of the Spheres." },
    { name: "Fuji Kaze: Best of Tour", img: "/images/fujikaze.webp", price: "Rp 2.100.000", info: "JIS Jakarta", date: "Oct 2026", desc: "Bintang berbakat dari Jepang, Fuji Kaze, akan membawa lagu-lagu hitsnya ke Jakarta dalam panggung yang megah." },
    { name: "NIKI: Buzz Tour", img: "/images/niki.webp", price: "Rp 1.200.000", info: "Beach City Intl Stadium", date: "Feb 2027", desc: "Putri kebanggaan Indonesia kembali pulang. Nikmati lagu-lagu emosional dari album terbarunya, Buzz." },
    { name: "Daniel Caesar: Superpowers", img: "/images/daniel-caesar.webp", price: "Rp 1.950.000", info: "Ancol Jakarta", date: "Mar 2027", desc: "Pemenang Grammy, Daniel Caesar, siap meluluhkan hati penggemarnya di Jakarta dengan vokal soul yang memukau." },
  ];

  const travelPartners = [
    { name: "Garuda Indonesia", img: "/images/garuda.webp", price: "Starts Rp 1.2M", info: "Flight • Priority", type: 'plane', desc: "Maskapai bintang 5 dengan pelayanan premium. Nikmati kenyamanan perjalanan udara terbaik menuju Jakarta." },
    { name: "KAI Argo Bromo", img: "/images/argobromo.webp", price: "Starts Rp 600k", info: "Train • Executive", type: 'train', desc: "Kereta api eksekutif dengan pemandangan indah sepanjang pulau Jawa. Tepat waktu dan nyaman." },
    { name: "Citilink Airline", img: "/images/citilink.webp", price: "Starts Rp 800k", info: "Flight • Economy", type: 'plane', desc: "Penerbangan ekonomis dengan armada modern. Cara cerdas dan cepat untuk sampai ke lokasi konser." },
    { name: "KAI Taksaka", img: "/images/taksaka.webp", price: "Starts Rp 550k", info: "Train • Executive", type: 'train', desc: "Layanan kereta malam eksklusif dengan fasilitas lengkap. Istirahat maksimal, sampai di Jakarta dengan segar." },
    { name: "Batik Air Business", img: "/images/batikair.webp", price: "Starts Rp 1.5M", info: "Flight • Premium", type: 'plane', desc: "Terbang dengan gaya eksekutif bersama Batik Air. Ruang kaki luas dan hidangan lezat menemani perjalanan Anda." },
    { name: "KAI Argo Lawu", img: "/images/argolawu.webp", price: "Starts Rp 620k", info: "Train • Luxury", type: 'train', desc: "Salah satu kereta legendaris di Indonesia. Menawarkan kecepatan dan kenyamanan kelas atas untuk rute favorit." },
  ];

  const hotels = [
    { name: "The Ritz-Carlton", price: "Rp 4.500.000", info: "5 Star • Kuningan", desc: "Kemewahan tiada tara di jantung kota Jakarta. Fasilitas kelas dunia dan layanan personal yang luar biasa.", img1: "/images/hotel1.webp", img2: "/images/pool1.webp", img3: "/images/room1.webp" },
    { name: "Fairmont Jakarta", price: "Rp 3.800.000", info: "5 Star • Senayan", desc: "Lokasi paling strategis untuk konser di GBK. Akses langsung dan pemandangan lapangan golf yang ikonik.", img1: "/images/hotel1.webp", img2: "/images/pool1.webp", img3: "/images/room1.webp" },
    { name: "Hotel Kempinski", price: "Rp 5.200.000", info: "5 Star • HI", desc: "Hotel bersejarah dengan sentuhan modern. Berada di pusat Jakarta dengan akses mudah ke seluruh moda transportasi.", img1: "/images/hotel1.webp", img2: "/images/pool1.webp", img3: "/images/room1.webp" },
    { name: "Artotel GBK", price: "Rp 1.200.000", info: "4 Star • Senayan", desc: "Hotel gaya hidup dengan desain artistik. Pilihan tepat untuk penggemar musik yang mencari suasana kreatif.", img1: "/images/artotel1.webp", img2: "/images/artotel2.webp", img3: "/images/artotel3.webp" },
    { name: "Park Hyatt Jakarta", price: "Rp 4.800.000", info: "5 Star • Menteng", desc: "Hotel ultra-mewah dengan desain modern elegan. Menawarkan kenyamanan tingkat tinggi di lokasi prestisius Menteng.", img1: "/images/hyatt1.webp", img2: "/images/hyatt2.webp", img3: "/images/hyatt3.webp" },
    { name: "The Langham Jakarta", price: "Rp 5.500.000", info: "5 Star • SCBD", desc: "Standar baru kemewahan di Jakarta. Terletak di pusat bisnis elite dengan fasilitas spa dan restoran kelas dunia.", img1: "/images/langham1.webp", img2: "/images/langham2.webp", img3: "/images/langham3.webp" },
  ];

  return (
    <div className="flex flex-col min-h-screen selection:bg-main-gold/30 bg-white font-avenir">
      <Navbar />
      
      <main className="flex-1 relative">
        <section className="w-full">
          <ConcertCarousel />
        </section>

        <section className="pt-24 pb-20 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <ScrollReveal direction="none">
                <div className="inline-flex items-center gap-2 rounded-full bg-main-darkbrown px-4 py-1.5 text-[10px] font-bold text-main-yellow uppercase tracking-[0.2em] mb-8">
                  #1 Concert Planner in Jakarta
                </div>
                <p className="text-lg md:text-xl text-main-darkbrown/40 max-w-2xl mx-auto leading-relaxed font-bold uppercase tracking-widest text-[12px]">
                  Platform all-in-one untuk merencanakan tiket, transportasi, hingga hotel.
                </p>
              </ScrollReveal>
            </div>

            <div className="space-y-32">
              
              {/* Category 1: Concerts */}
              <ScrollReveal>
                <div className="space-y-8">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-main-darkbrown">Trending Concerts</h3>
                    <Link href="/plan/ticket" className="text-[10px] font-bold uppercase text-main-gold tracking-widest hover:underline">View All</Link>
                  </div>
                  <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory px-2">
                    {trendingConcerts.map((item, i) => (
                      <div 
                        key={i} 
                        onClick={() => setActivePopup({ title: item.name, desc: item.desc, price: item.price, location: item.info, img: item.img, type: 'concert' })}
                        className="min-w-[320px] md:min-w-[420px] snap-start cursor-pointer bg-white rounded-2xl border border-main-gray p-4 shadow-xl shadow-main-darkbrown/5"
                      >
                        <div className="aspect-[21/9] rounded-xl bg-main-cream mb-6 overflow-hidden relative">
                           {item.img ? (
                             <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                           ) : (
                             <div className="w-full h-full flex items-center justify-center text-main-darkbrown/5 font-bold text-5xl uppercase tracking-tighter px-8 text-center leading-none">{item.name}</div>
                           )}
                           <div className="absolute bottom-4 left-4 rounded-lg bg-white/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold text-main-darkbrown uppercase tracking-widest border border-main-gray shadow-sm">{item.date}</div>
                        </div>
                        <div className="px-2 pb-2">
                          <h4 className="text-md font-bold text-main-darkbrown uppercase tracking-tight mb-2">{item.name}</h4>
                          <div className="flex items-center justify-between">
                             <span className="text-[11px] font-bold text-main-gold uppercase tracking-widest">{item.price}</span>
                             <span className="text-[10px] font-bold text-main-darkbrown/30 uppercase tracking-widest">{item.info}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Category 2: Transport */}
              <ScrollReveal>
                <div className="space-y-8">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-main-darkbrown">Travel Partners</h3>
                    <Link href="/plan/transport-to" className="text-[10px] font-bold uppercase text-main-gold tracking-widest hover:underline">View All</Link>
                  </div>
                  <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory px-2">
                    {travelPartners.map((item, i) => (
                      <div 
                        key={i} 
                        onClick={() => setActivePopup({ title: item.name, desc: item.desc, price: item.price, location: item.info, img: item.img, type: 'transport' })}
                        className="min-w-[260px] md:min-w-[300px] snap-start cursor-pointer bg-white rounded-2xl border border-main-gray p-4 shadow-xl shadow-main-darkbrown/5"
                      >
                        <div className="aspect-[16/9] rounded-xl bg-main-cream mb-6 flex items-center justify-center relative overflow-hidden">
                           {item.img ? (
                             <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                           ) : (
                             <span className="text-main-darkbrown/5 font-bold text-2xl uppercase text-center px-4 leading-none">{item.name}</span>
                           )}
                        </div>
                        <div className="px-2 pb-2">
                          <h4 className="text-sm font-bold text-main-darkbrown uppercase tracking-tight mb-2">{item.name}</h4>
                          <div className="flex items-center justify-between">
                             <span className="text-[10px] font-bold text-main-gold uppercase tracking-widest">{item.price}</span>
                             <span className="text-[9px] font-bold text-main-darkbrown/30 uppercase tracking-widest">{item.info}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Category 3: Hotels */}
              <ScrollReveal>
                <div className="space-y-8">
                  <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-main-darkbrown">Recommended Akomodasi</h3>
                    <Link href="/plan/hotel" className="text-[10px] font-bold uppercase text-main-gold tracking-widest hover:underline">View All</Link>
                  </div>
                  <div className="flex overflow-x-auto gap-6 pb-8 no-scrollbar snap-x snap-mandatory px-2">
                    {hotels.map((item, i) => (
                      <div 
                        key={i} 
                        onClick={() => setActivePopup({ title: item.name, desc: item.desc, price: item.price, location: item.info, img: item.img1, type: 'hotel' })}
                        className="min-w-[280px] md:min-w-[340px] snap-start cursor-pointer bg-white rounded-3xl border border-main-gray p-5 shadow-xl shadow-main-darkbrown/5"
                      >
                        <div className="aspect-[4/3] rounded-2xl bg-main-cream/30 mb-6 overflow-hidden relative group/img">
                           <div className="w-full h-full flex gap-1 p-1">
                              <div className="flex-1 bg-main-darkbrown/5 rounded-xl overflow-hidden border border-main-gray/50">
                                 {item.img1 && <img src={item.img1} className="w-full h-full object-cover" alt="Main" />}
                              </div>
                              <div className="flex-1 flex flex-col gap-1">
                                 <div className="flex-1 bg-main-darkbrown/5 rounded-lg overflow-hidden border border-main-gray/50">
                                    {item.img2 && <img src={item.img2} className="w-full h-full object-cover" alt="Small 1" />}
                                 </div>
                                 <div className="flex-1 bg-main-darkbrown/5 rounded-lg overflow-hidden border border-main-gray/50">
                                    {item.img3 && <img src={item.img3} className="w-full h-full object-cover" alt="Small 2" />}
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="px-2 pb-2">
                          <h4 className="text-md font-bold text-main-darkbrown uppercase tracking-tight mb-2">{item.name}</h4>
                          <div className="flex items-center justify-between">
                             <span className="text-[11px] font-bold text-main-gold uppercase tracking-widest">{item.price}/night</span>
                             <span className="text-[10px] font-bold text-main-darkbrown/30 uppercase tracking-widest">{item.info}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Informational Popups */}
        {activePopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-main-darkbrown/90 backdrop-blur-xl animate-in fade-in duration-300">
             <div className="bg-white rounded-3xl max-w-2xl w-full relative shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden border border-main-gray">
                
                {/* Fixed Header with Close Button */}
                <div className="bg-white border-b border-main-gray p-6 flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-main-gold uppercase tracking-[0.4em]">Details View</span>
                      <span className="text-[10px] font-bold text-main-darkbrown uppercase tracking-widest truncate max-w-[200px]">{activePopup.title}</span>
                   </div>
                   <button 
                     onClick={() => setActivePopup(null)} 
                     className="h-10 w-10 rounded-xl bg-main-gray/20 hover:bg-main-gold/20 flex items-center justify-center text-main-darkbrown/40 hover:text-main-gold transition-all group"
                   >
                     <svg className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                   </button>
                </div>

                <div className="p-8 md:p-12 overflow-y-auto max-h-[75vh] no-scrollbar">
                   <div className="space-y-8">
                      <div className="aspect-video bg-main-cream/30 rounded-2xl overflow-hidden flex items-center justify-center border border-main-gray shadow-inner relative">
                         {activePopup.img ? (
                           <img src={activePopup.img} alt={activePopup.title} className="w-full h-full object-cover" />
                         ) : (
                           <span className="text-main-darkbrown/10 font-bold text-2xl md:text-4xl uppercase text-center px-6 leading-tight">{activePopup.title}</span>
                         )}
                      </div>
                      
                      <div className="space-y-6 px-2">
                         <h2 className="text-2xl md:text-3xl font-bold text-main-darkbrown uppercase tracking-tighter leading-none">{activePopup.title}</h2>
                         
                         <p className="text-xs md:text-sm font-bold text-main-darkbrown/50 leading-relaxed uppercase tracking-wide">{activePopup.desc}</p>
                         
                         <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="bg-main-gray/20 p-4 md:p-6 rounded-2xl border border-main-gray">
                               <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-main-darkbrown/30">Price/Starts From</span>
                               <p className="text-md md:text-lg font-bold text-main-gold mt-1">{activePopup.price}</p>
                            </div>
                            <div className="bg-main-gray/20 p-4 md:p-6 rounded-2xl border border-main-gray">
                               <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-main-darkbrown/30">Location/Venue</span>
                               <p className="text-xs md:text-sm font-bold text-main-darkbrown mt-1 uppercase tracking-tight">{activePopup.location}</p>
                            </div>
                         </div>

                         {activePopup.type === 'concert' && (
                           <div className="pt-6">
                              <Button 
                                onClick={() => {
                                  handleConcertSelect(activePopup.title, activePopup.location);
                                  setActivePopup(null);
                                }}
                                className="w-full h-14 md:h-16 rounded-xl font-bold uppercase tracking-widest shadow-xl shadow-main-gold/20"
                              >
                                Pilih & Atur Rencana
                              </Button>
                           </div>
                         )}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
