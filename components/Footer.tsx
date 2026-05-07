import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-main-darkbrown text-white py-16 px-6 font-avenir">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-xl bg-main-gold flex items-center justify-center">
                <span className="text-main-darkbrown font-bold text-xl italic">K</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">
                KONSER<span className="text-main-gold">IN</span>
              </span>
            </Link>
            <p className="text-main-cream/40 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-sm">
              Solusi cerdas perencanaan konser Anda. Dari tiket hingga hotel, semua dalam satu genggaman.
            </p>
          </div>
          
          <div>
            <h4 className="text-main-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Quick Links</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/60">
              <li><Link href="/plan/ticket" className="hover:text-main-gold transition-colors">Start Planning</Link></li>
              <li><Link href="/dashboard" className="hover:text-main-gold transition-colors">My Dashboard</Link></li>
              <li><Link href="/login" className="hover:text-main-gold transition-colors">Sign In</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-main-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Support</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-white/60">
              <li><Link href="#" className="hover:text-main-gold transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-main-gold transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-main-gold transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">
            © 2026 KONSERIN PROJECT. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
