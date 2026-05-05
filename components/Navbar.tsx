import Link from 'next/link';
import Image from 'next/image';

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-main-gray/30 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-10 w-10 rounded-xl bg-main-darkbrown flex items-center justify-center group-hover:bg-main-gold transition-colors duration-300">
            <span className="text-main-yellow font-black text-xl italic">K</span>
          </div>
          <span className="text-2xl font-black tracking-tighter text-main-darkbrown">
            KONSER<span className="text-main-gold">IN</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="hidden sm:flex items-center gap-2 rounded-2xl border-2 border-main-gray bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-main-darkbrown hover:border-main-gold transition-all duration-300"
          >
            Dashboard
          </Link>
          
          <Link href="/login" className="h-12 w-12 rounded-2xl border-2 border-main-gray bg-main-white p-0.5 overflow-hidden cursor-pointer hover:border-main-gold transition-colors duration-300 shadow-sm group">
            <div className="h-full w-full rounded-[14px] bg-main-cream flex items-center justify-center text-main-gold relative overflow-hidden">
               <svg className="h-7 w-7 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
               </svg>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};
