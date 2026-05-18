import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-6">
      <div className="max-w-2xl w-full rounded-3xl border border-red-500/40 bg-black/70 p-8 text-center shadow-2xl shadow-red-900/40">
        <h1 className="text-5xl font-black tracking-tight text-red-500">TOREXSHOP</h1>
        <p className="mt-4 text-zinc-300">Kodunu gir, Roblox adını yaz, teslimat sıraya alınsın.</p>
        <Link href="/redeem" className="mt-8 inline-block rounded-xl bg-red-600 px-8 py-4 font-bold hover:bg-red-500">
          KOD KULLAN
        </Link>
      </div>
    </main>
  );
}
