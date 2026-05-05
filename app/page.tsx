import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { ConcertCarousel } from "@/components/ConcertCarousel";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-main-gold/30">
      <Navbar />
      
      <main className="flex-1 relative">
        {/* Unique Background Design */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-main-gold/5 via-white to-white"></div>
          <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] rounded-full bg-main-yellow/5 blur-[120px]"></div>
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--raw-main-gold) 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}></div>
        </div>

        {/* Full Width Carousel Section */}
        <section className="w-full">
          <ConcertCarousel />
        </section>

        {/* Hero Content Section */}
        <section className="pt-24 pb-32 px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-main-darkbrown px-4 py-1.5 text-[10px] font-black text-main-yellow uppercase tracking-[0.2em] mb-8 border border-main-gold/30">
                #1 Concert Planner in Jakarta
              </div>
              
              <p className="text-lg md:text-xl text-main-darkbrown/40 max-w-2xl mx-auto leading-relaxed font-bold uppercase tracking-widest text-[12px] mb-12">
                Platform all-in-one untuk merencanakan tiket, transportasi, hingga hotel.
              </p>

              {/* Enhanced Search Bar */}
              <div className="max-w-2xl mx-auto relative group">
                <div className="relative flex items-center bg-white rounded-[26px] border-2 border-main-gray p-2 shadow-2xl shadow-main-darkbrown/5 focus-within:border-main-gold transition-all duration-300">
                  <div className="flex-1 flex items-center px-4">
                    <svg className="h-5 w-5 text-main-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

              {/* How It Works Section */}
              <div className="mt-48 w-full max-w-6xl mx-auto px-4">
                <div className="text-center mb-24">
                  <h2 className="text-[12px] font-black uppercase tracking-[0.5em] text-main-gold mb-2">Cara Kerja</h2>
                </div>

                <div className="relative">
                  {/* Connecting Line for Desktop */}
                  <div className="absolute top-[60px] left-0 w-full h-1 bg-main-gray hidden md:block"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-20 md:gap-8 relative z-10">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center text-center group">
                      <div className="h-28 w-28 rounded-[40px] bg-white border-4 border-main-gray group-hover:border-main-gold flex items-center justify-center text-3xl font-black text-main-darkbrown transition-all duration-500 relative bg-white shadow-2xl shadow-main-darkbrown/10 group-hover:scale-110 mb-8">
                        01
                        <div className="absolute -bottom-3 w-2 h-2 bg-main-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="text-lg font-black uppercase tracking-[0.2em] text-main-darkbrown mb-3 italic">Pesan Tiket</div>
                      <p className="text-[11px] font-bold text-main-darkbrown/30 uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">Amankan tiket konser impian Anda.</p>
                    </div>

                    {/* Step 2 */}
                    <div className="flex flex-col items-center text-center group">
                      <div className="h-28 w-28 rounded-[40px] bg-white border-4 border-main-gray group-hover:border-main-gold flex items-center justify-center text-3xl font-black text-main-darkbrown transition-all duration-500 relative bg-white shadow-2xl shadow-main-darkbrown/10 group-hover:scale-110 mb-8">
                        02
                        <div className="absolute -bottom-3 w-2 h-2 bg-main-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="text-lg font-black uppercase tracking-[0.2em] text-main-darkbrown mb-3 italic">Transportasi</div>
                      <p className="text-[11px] font-bold text-main-darkbrown/30 uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">Atur perjalanan ke venue dengan mudah.</p>
                    </div>

                    {/* Step 3 */}
                    <div className="flex flex-col items-center text-center group">
                      <div className="h-28 w-28 rounded-[40px] bg-white border-4 border-main-gray group-hover:border-main-gold flex items-center justify-center text-3xl font-black text-main-darkbrown transition-all duration-500 relative bg-white shadow-2xl shadow-main-darkbrown/10 group-hover:scale-110 mb-8">
                        03
                        <div className="absolute -bottom-3 w-2 h-2 bg-main-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <div className="text-lg font-black uppercase tracking-[0.2em] text-main-darkbrown mb-3 italic">Akomodasi</div>
                      <p className="text-[11px] font-bold text-main-darkbrown/30 uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">Booking hotel terbaik di lokasi strategis.</p>
                    </div>

                    {/* Step 4 */}
                    <div className="flex flex-col items-center text-center group">
                      <div className="h-28 w-28 rounded-[40px] bg-main-darkbrown border-4 border-main-darkbrown flex items-center justify-center text-3xl font-black text-main-yellow transition-all duration-500 relative shadow-2xl shadow-main-darkbrown/30 group-hover:scale-110 mb-8">
                        04
                        <div className="absolute -bottom-3 w-2 h-2 bg-main-yellow rounded-full opacity-100"></div>
                      </div>
                      <div className="text-lg font-black uppercase tracking-[0.2em] text-main-darkbrown mb-3 italic">Selesai</div>
                      <p className="text-[11px] font-bold text-main-darkbrown/30 uppercase tracking-[0.2em] leading-relaxed max-w-[200px]">Nikmati pengalaman konser terbaik.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
