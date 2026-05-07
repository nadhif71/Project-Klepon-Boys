import Link from 'next/link';
import { Button } from '@/components/Button';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-main-gold/30 font-avenir">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-b from-main-gold/10 via-white to-white"></div>
        <div className="absolute top-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-main-yellow/10 blur-[120px]"></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="h-10 w-10 rounded-xl bg-main-darkbrown flex items-center justify-center group-hover:bg-main-gold transition-colors duration-300">
                <span className="text-main-yellow font-bold text-xl italic">K</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-main-darkbrown">
                KONSER<span className="text-main-gold">IN</span>
              </span>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-2xl shadow-main-darkbrown/5">
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-3 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/20 text-sm"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40">Password</label>
                  <Link href="/forgot-password" title="Lupa password" data-testid="forgot-password-link" className="text-[10px] font-bold uppercase tracking-[0.2em] text-main-gold hover:underline">
                    Lupa Password?
                  </Link>
                </div>
                <input 
                  type="password" 
                  className="w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-3 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/20 text-sm"
                />
              </div>

              <Button className="w-full rounded-xl py-4 h-auto text-xs font-bold uppercase tracking-widest shadow-xl shadow-main-gold/10 mt-2">
                Masuk Sekarang
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-main-gray text-center">
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40">
                 Belum punya akun? <Link href="/signup" className="text-main-gold hover:underline ml-1">Daftar Gratis</Link>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
