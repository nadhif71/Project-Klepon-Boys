import Link from 'next/link';
import { Button } from '@/components/Button';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-main-gold/30 font-avenir">
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-main-yellow/5 blur-[150px]"></div>
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
            <div className="mb-6">
              <h2 className="text-xl font-bold text-main-darkbrown uppercase tracking-tight">Reset Password</h2>
              <p className="text-[10px] font-bold text-main-darkbrown/40 uppercase tracking-widest mt-2">Masukkan email Anda untuk menerima instruksi pemulihan.</p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40 mb-2 ml-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  className="w-full rounded-xl border-2 border-main-gray bg-transparent px-5 py-3 text-main-darkbrown font-bold focus:border-main-gold focus:outline-none transition-colors placeholder:text-main-darkbrown/20 text-sm"
                />
              </div>

              <Button className="w-full rounded-xl py-4 h-auto text-xs font-bold uppercase tracking-widest shadow-xl shadow-main-gold/10">
                Kirim Instruksi
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-main-gray text-center">
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-main-darkbrown/40">
                 Ingat password Anda? <Link href="/login" className="text-main-gold hover:underline ml-1">Kembali Masuk</Link>
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
