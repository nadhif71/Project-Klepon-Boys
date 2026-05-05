import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-main-darkbrown text-main-white py-16 border-t border-main-gold/20">
      <div className="mx-auto max-w-7xl px-8 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* Left Side Column */}
          <div className="flex flex-col gap-10">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-main-yellow flex items-center justify-center">
                <span className="text-main-darkbrown font-black text-sm italic">K</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-main-white uppercase">
                KONSER<span className="text-main-gold">IN</span>
              </span>
            </Link>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-main-gold mb-2">Pintasan</h4>
              <div className="flex flex-col gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-main-cream/40">
                <Link href="#" className="hover:text-main-gold transition-colors">Tentang Kami</Link>
                <Link href="#" className="hover:text-main-gold transition-colors">Kebijakan Privasi</Link>
                <Link href="#" className="hover:text-main-gold transition-colors">Syarat & Ketentuan</Link>
                <Link href="#" className="hover:text-main-gold transition-colors">Hubungi Kami</Link>
              </div>
            </div>
            
            <p className="text-[9px] text-main-cream/20 uppercase tracking-[0.4em] font-bold">
              © 2026 PT Klepon Boys Indonesia
            </p>
          </div>

          {/* Right Side Column */}
          <div className="flex flex-col md:items-end gap-10">
             <div className="flex flex-col md:items-end gap-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-main-gold">Media Sosial</h4>
                <div className="flex gap-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-12 w-12 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-main-cream/40 hover:border-main-gold hover:text-main-gold transition-all cursor-pointer group">
                      <div className="h-5 w-5 bg-current rounded-full opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="flex flex-col md:items-end gap-4 max-w-[280px] md:text-right">
                <p className="text-[10px] font-bold text-main-cream/30 uppercase tracking-[0.15em] leading-relaxed">
                  Platform perencanaan konser nomor satu di Jakarta. Jadikan pengalaman musikmu tak terlupakan.
                </p>
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
