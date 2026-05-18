import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black to-black" />
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-red-600/20 blur-3xl" />

      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between p-6">
        <Link href="/" className="text-2xl font-black tracking-widest text-red-500">
          TOREXSHOP
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-xl border border-red-500/40 px-4 py-2 text-sm font-bold hover:bg-red-950">
            Giriş Yap
          </Link>

          <Link href="/register" className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold hover:bg-red-500">
            Kayıt Ol
          </Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <div className="inline-flex rounded-full border border-red-500/30 bg-red-950/30 px-4 py-2 text-sm font-bold text-red-200">
            MM2 Kod Teslimat Sistemi
          </div>

          <h1 className="mt-6 text-5xl font-black leading-tight md:text-7xl">
            Kodunu gir, <span className="text-red-500">teslimatı</span> takip et.
          </h1>

          <p className="mt-5 max-w-xl text-lg text-zinc-300">
            İtemsatış’tan aldığın kodu kullan, Roblox adını yaz, sipariş durumunu profilinden canlı takip et.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/redeem" className="rounded-2xl bg-red-600 px-8 py-4 font-black shadow-2xl shadow-red-900/40 hover:bg-red-500">
              KOD KULLAN
            </Link>

            <Link href="/profile" className="rounded-2xl border border-red-500/40 px-8 py-4 font-black hover:bg-red-950">
              SİPARİŞLERİM
            </Link>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 text-center">
            <div className="rounded-2xl border border-red-500/20 bg-white/5 p-4">
              <div className="text-2xl font-black text-red-400">1</div>
              <div className="text-xs text-zinc-400">Kod Gir</div>
            </div>

            <div className="rounded-2xl border border-red-500/20 bg-white/5 p-4">
              <div className="text-2xl font-black text-red-400">2</div>
              <div className="text-xs text-zinc-400">Roblox Yaz</div>
            </div>

            <div className="rounded-2xl border border-red-500/20 bg-white/5 p-4">
              <div className="text-2xl font-black text-red-400">3</div>
              <div className="text-xs text-zinc-400">Teslim Al</div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-red-500/30 bg-black/70 p-6 shadow-2xl shadow-red-900/40">
          <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/70 to-zinc-950 p-6">
            <div className="text-sm font-bold text-red-300">Sipariş Durumu</div>

            <div className="mt-4 rounded-2xl bg-black/50 p-5">
              <div className="text-2xl font-black">HARVESTER</div>
              <div className="mt-1 text-sm text-zinc-400">Roblox: oyuncu123</div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                  <span className="font-bold">Hazırlanıyor</span>
                </div>

                <div className="flex items-center gap-3 opacity-70">
                  <span className="h-4 w-4 rounded-full border border-red-500" />
                  <span>Hazır / VIP Link</span>
                </div>

                <div className="flex items-center gap-3 opacity-50">
                  <span className="h-4 w-4 rounded-full border border-zinc-500" />
                  <span>Sipariş Tamamlandı</span>
                </div>
              </div>

              <Link href="/login" className="mt-6 block rounded-xl bg-red-600 p-3 text-center font-black hover:bg-red-500">
                Hemen Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
