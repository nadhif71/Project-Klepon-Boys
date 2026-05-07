import Link from 'next/link';
import { Button } from '@/components/Button';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-main-gold/30 font-avenir">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-[600px] bg-gradient-to-t from-main-gold/10 via-white to-white"></div>
        <div className="absolute bottom-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-main-yellow/10 blur-[120px]"></div>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 mb-2 ml-1">First Name</label>
                  <input 
                    type="text" 
                    placeholder="First"
                    className="w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-3 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/20 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 mb-2 ml-1">Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Last"
                    className="w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-3 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/20 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-3 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/20 text-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 mb-2 ml-1">Password</label>
                <input 
                  type="password" 
                  className="w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-3 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/20 text-sm"
                />
              </div>

              <div className="flex items-center gap-3 px-1 py-1">
                 <div className="relative flex items-center h-5">
                   <input 
                     type="checkbox" 
                     id="terms"
                     className="h-5 w-5 rounded-lg border-2 border-main-gray bg-transparent text-main-gold focus:ring-offset-0 focus:ring-main-gold transition-all cursor-pointer" 
                   />
                 </div>
                 <label htmlFor="terms" className="text-[10px] text-main-darkbrown/40 font-bold uppercase tracking-[0.1em] leading-none cursor-pointer">
                   Saya menyetujui <Link href="#" className="text-main-gold hover:underline">Syarat & Ketentuan</Link>
                 </label>
              </div>

              <Button className="w-full rounded-xl py-4 h-auto text-xs font-bold uppercase tracking-widest shadow-xl shadow-main-gold/10">
                Daftar Sekarang
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-main-gray text-center">
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40">
                 Sudah punya akun? <Link href="/login" className="text-main-gold hover:underline ml-1">Masuk Saja</Link>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
