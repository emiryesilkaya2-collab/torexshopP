import Link from "next/link";
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
          <Link
            href="/redeem"
            className="rounded-2xl bg-red-600 px-8 py-4 font-black shadow-2xl shadow-red-900/40 hover:bg-red-500"
          >
            KOD KULLAN
          </Link>

          <Link
            href="/profile"
            className="rounded-2xl border border-red-500/40 px-8 py-4 font-black hover:bg-red-950"
          >
            PROFİL
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.name}
            className="group overflow-hidden rounded-[2rem] border border-red-500/20 bg-zinc-950/80 p-5 shadow-2xl shadow-black/40 transition-all duration-300 hover:-translate-y-2 hover:border-red-500/60"
          >
            <div className="overflow-hidden rounded-3xl bg-black">
              <img
                src={product.image}
                alt={product.name}
                className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-red-400">
                  {product.rarity}
                </p>
              </div>

              <div className="rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-2 text-sm font-bold text-red-200">
                MM2
              </div>
            </div>

            <Link
              href="/redeem"
              className="mt-5 block rounded-2xl bg-red-600 p-4 text-center text-lg font-black transition-all hover:bg-red-500"
            >
              TESLİMAT AL
            </Link>
          </div>
        ))}
      </section>
    </main>
  );
}
