"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabaseClient";

type Order = {
  id: string;
  code: string;
  product: string;
  roblox_username: string;
  roblox_avatar_url?: string;
  status: string;
  vip_link?: string;
};

function statusText(status: string) {
  if (status === "preparing" || status === "waiting") return "Hazırlanıyor";
  if (status === "ready") return "Hazır";
  if (status === "delivered") return "Teslim Edildi";
  return status;
}

function progressWidth(status: string) {
  if (status === "preparing" || status === "waiting") return "w-1/3";
  if (status === "ready") return "w-2/3";
  if (status === "delivered") return "w-full";
  return "w-0";
}

function progressColor(status: string) {
  if (status === "preparing" || status === "waiting") {
    return "bg-yellow-500 shadow-yellow-500/50";
  }

  if (status === "ready") {
    return "bg-blue-500 shadow-blue-500/50";
  }

  if (status === "delivered") {
    return "bg-green-500 shadow-green-500/50";
  }

  return "bg-zinc-700";
}

export default function ProfilePage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    supabaseClient.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        location.href = "/login";
        return;
      }

      const userEmail = data.user.email || "";
      setEmail(userEmail);

      const res = await fetch(
        `/api/profile/orders?email=${encodeURIComponent(userEmail)}`
      );

      const json = await res.json();

      if (json.ok) {
        setOrders(json.orders);
      }
    });
  }, []);

  async function logout() {
    await supabaseClient.auth.signOut();
    location.href = "/";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black p-6 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-[2rem] border border-red-500/30 bg-black/80 shadow-2xl shadow-red-900/30">
          <div className="relative overflow-hidden p-8">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-red-600/20 blur-3xl" />

            <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="inline-flex rounded-full border border-red-500/30 bg-red-950/30 px-4 py-2 text-sm font-bold text-red-300">
                  TOREXSHOP PROFILE
                </div>

                <h1 className="mt-5 text-5xl font-black text-red-500">
                  Profil
                </h1>

                <p className="mt-3 text-zinc-400">{email}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/redeem"
                  className="rounded-2xl bg-red-600 px-6 py-4 font-black transition-all hover:scale-105 hover:bg-red-500"
                >
                  Kod Kullan
                </Link>

                <button
                  onClick={logout}
                  className="rounded-2xl border border-red-500/40 px-6 py-4 font-black transition-all hover:bg-red-950"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-black text-red-400">
            Sipariş Geçmişi
          </h2>

          {orders.length === 0 && (
            <div className="mt-6 rounded-3xl border border-red-500/20 bg-black/60 p-10 text-center">
              <div className="text-6xl">📦</div>

              <h3 className="mt-5 text-2xl font-black">
                Henüz sipariş yok
              </h3>

              <p className="mt-2 text-zinc-400">
                Kod kullanınca siparişlerin burada görünür.
              </p>
            </div>
          )}

          <div className="mt-6 grid gap-5">
            {orders.map((order) => (
              <div
                key={order.id}
                className="group overflow-hidden rounded-[2rem] border border-red-500/20 bg-black/70 p-6 shadow-2xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50"
              >
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    {order.roblox_avatar_url && (
                      <img
                        src={order.roblox_avatar_url}
                        alt={order.roblox_username}
                        className="h-24 w-24 rounded-3xl border border-red-500/30 bg-black object-cover shadow-xl shadow-red-900/30"
                      />
                    )}

                    <div>
                      <div className="text-3xl font-black text-white">
                        {order.product}
                      </div>

                      <div className="mt-2 text-lg text-zinc-300">
                        @{order.roblox_username}
                      </div>

                      <div className="mt-1 text-sm text-zinc-500">
                        Kod: {order.code}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-red-500/30 bg-red-950/30 px-5 py-3 text-lg font-black text-red-200">
                    {statusText(order.status)}
                  </div>
                </div>

                <div className="mt-8">
                  <div className="mb-4 flex items-center justify-between text-xs font-black uppercase tracking-widest">
                    <span
                      className={
                        order.status === "preparing"
                          ? "text-yellow-400"
                          : "text-zinc-500"
                      }
                    >
                      Hazırlanıyor
                    </span>

                    <span
                      className={
                        order.status === "ready" ||
                        order.status === "delivered"
                          ? "text-blue-400"
                          : "text-zinc-500"
                      }
                    >
                      Hazır
                    </span>

                    <span
                      className={
                        order.status === "delivered"
                          ? "text-green-400"
                          : "text-zinc-500"
                      }
                    >
                      Teslim
                    </span>
                  </div>

                  <div className="relative h-5 overflow-hidden rounded-full bg-zinc-900">
                    <div
                      className={`absolute left-0 top-0 h-full rounded-full shadow-2xl transition-all duration-700 ${progressWidth(
                        order.status
                      )} ${progressColor(order.status)}`}
                    />
                  </div>
                </div>

                {order.status === "ready" && order.vip_link && (
                  <a
                    href={order.vip_link}
                    target="_blank"
                    className="mt-6 inline-block rounded-2xl bg-red-600 px-6 py-4 text-lg font-black shadow-2xl shadow-red-900/40 transition-all hover:scale-105 hover:bg-red-500"
                  >
                    VIP SUNUCUYA KATIL
                  </a>
                )}

                {order.status === "delivered" && (
                  <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-950/20 p-5">
                    <div className="text-lg font-black text-green-400">
                      Teslimat tamamlandı ✅
                    </div>

                    <p className="mt-2 text-zinc-300">
                      Sipariş başarıyla teslim edildi.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
