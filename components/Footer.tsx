import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-main-darkbrown text-main-white py-12 border-t border-main-gold/20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          {/* Left Side: Brand & Links in a Column */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-main-yellow flex items-center justify-center">
                <span className="text-main-darkbrown font-black text-xs italic">K</span>
              </div>
              <span className="text-lg font-black tracking-tighter text-main-white uppercase">
                KONSER<span className="text-main-gold">IN</span>
              </span>
            </Link>
            
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] font-black uppercase tracking-[0.2em] text-main-cream/40">
              <Link href="#" className="hover:text-main-gold transition-colors">About</Link>
              <Link href="#" className="hover:text-main-gold transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-main-gold transition-colors">Terms</Link>
              <Link href="#" className="hover:text-main-gold transition-colors">Contact</Link>
            </div>
            
            <p className="text-[8px] text-main-cream/20 uppercase tracking-[0.3em] font-bold">
              © 2026 PT Klepon Boys Indonesia
            </p>
          </div>

          {/* Right Side: Social Icons in a Column */}
          <div className="flex flex-col items-center md:items-end gap-4">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-main-cream/30">Connect with us</span>
             <div className="flex gap-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center text-main-cream/40 hover:border-main-gold hover:text-main-gold transition-all cursor-pointer">
                    <div className="h-4 w-4 bg-current rounded-full opacity-20"></div>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
