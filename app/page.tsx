import Link from "next/link";

const products = [
  {
    name: "HARVESTER",
    rarity: "Ancient",
    emoji: "🏹",
  },
  {
    name: "ICEPIERCER",
    rarity: "Ancient",
    emoji: "❄️",
  },
  {
    name: "CORRUPT",
    rarity: "Godly",
    emoji: "🗡️",
  },
];

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

      <section className="relative z-10 mx-auto max-w-6xl px-6 py-14 text-center">
        <div className="inline-flex rounded-full border border-red-500/30 bg-red-950/30 px-4 py-2 text-sm font-bold text-red-200">
          MM2 Premium Market
        </div>

        <h1 className="mt-6 text-5xl font-black leading-tight md:text-7xl">
          MM2 itemlerini güvenli şekilde teslim al.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-300">
          Kodunu kullan, Roblox hesabını doğrula ve siparişini canlı takip et.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/redeem" className="rounded-2xl bg-red-600 px-8 py-4 font-black shadow-2xl shadow-red-900/40 hover:bg-red-500">
            KOD KULLAN
          </Link>

          <Link href="/profile" className="rounded-2xl border border-red-500/40 px-8 py-4 font-black hover:bg-red-950">
            PROFİL
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.name} className="group overflow-hidden rounded-[2rem] border border-red-500/20 bg-zinc-950/80 p-5 shadow-2xl shadow-black/40 transition-all duration-300 hover:-translate-y-2 hover:border-red-500/60">
            <div className="flex h-72 items-center justify-center rounded-3xl bg-gradient-to-br from-red-950/70 to-black text-8xl shadow-inner shadow-red-900/30">
              {product.emoji}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">{product.name}</h2>
                <p className="mt-1 text-sm text-red-400">{product.rarity}</p>
              </div>

              <div className="rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-2 text-sm font-bold text-red-200">
                MM2
              </div>
            </div>

            <Link href="/redeem" className="mt-5 block rounded-2xl bg-red-600 p-4 text-center text-lg font-black transition-all hover:bg-red-500">
              TESLİMAT AL
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
