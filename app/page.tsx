import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-6">
      <div className="max-w-2xl w-full rounded-3xl border border-red-500/40 bg-black/70 p-8 text-center shadow-2xl shadow-red-900/40">
        <h1 className="text-5xl font-black tracking-tight text-red-500">TOREXSHOP</h1>
        <p className="mt-4 text-zinc-300">Kodunu gir, Roblox adını yaz, teslimat sıraya alınsın.</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/redeem" className="rounded-xl bg-red-600 px-7 py-4 font-bold hover:bg-red-500">
            KOD KULLAN
          </Link>
          <Link href="/login" className="rounded-xl border border-red-500/50 px-7 py-4 font-bold hover:bg-red-950">
            GİRİŞ YAP
          </Link>
          <Link href="/register" className="rounded-xl border border-red-500/50 px-7 py-4 font-bold hover:bg-red-950">
            KAYIT OL
          </Link>
          <Link href="/profile" className="rounded-xl border border-zinc-500/50 px-7 py-4 font-bold hover:bg-zinc-900">
            PROFİL / SİPARİŞLER
          </Link>
        </div>
      </div>
    </main>
  );
}
