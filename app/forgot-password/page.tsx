import Link from 'next/link';
import { Button } from '@/components/Button';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-main-gold/30">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-main-yellow/5 blur-[150px]"></div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
              <div className="h-10 w-10 rounded-xl bg-main-darkbrown flex items-center justify-center group-hover:bg-main-gold transition-colors duration-300">
                <span className="text-main-yellow font-black text-xl italic">K</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-main-darkbrown">
                KONSER<span className="text-main-gold">IN</span>
              </span>
            </Link>
            <h1 className="text-3xl font-black text-main-darkbrown tracking-tight italic">Reset Password</h1>
            <p className="mt-2 text-main-darkbrown/40 font-bold uppercase tracking-widest text-[10px]">
              Masukkan email Anda untuk menerima instruksi reset
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-2xl shadow-main-darkbrown/5 border-2 border-main-gray">
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-main-darkbrown/40 mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border-2 border-main-gray bg-transparent px-5 py-4 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/20"
                />
              </div>

              <Button className="w-full rounded-2xl py-4 h-auto text-sm font-black uppercase tracking-widest shadow-xl shadow-main-gold/10">
                Kirim Instruksi
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-main-gray text-center">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-main-darkbrown/40">
                 Ingat password Anda? <Link href="/login" className="text-main-gold hover:underline ml-1">Kembali Masuk</Link>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
