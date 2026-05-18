"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Order = {
  id: string;
  code: string;
  tracking_number: string;
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
  if (status === "cancelled") return "İptal Edildi";
  return status;
}

function progressWidth(status: string) {
  if (status === "preparing" || status === "waiting") return "w-1/3";
  if (status === "ready") return "w-2/3";
  if (status === "delivered") return "w-full";
  return "w-0";
}

function progressColor(status: string) {
  if (status === "preparing" || status === "waiting") return "bg-yellow-500 shadow-yellow-500/50";
  if (status === "ready") return "bg-blue-500 shadow-blue-500/50";
  if (status === "delivered") return "bg-green-500 shadow-green-500/50";
  return "bg-zinc-700";
}

export default function OrderPage() {
  const [tracking, setTracking] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTracking = params.get("tracking");

    if (urlTracking) {
      setTracking(urlTracking);
      searchOrder(urlTracking);
    }
  }, []);

  async function searchOrder(value?: string) {
    const finalTracking = (value || tracking).trim();

    if (!finalTracking) {
      setMsg("Takip numarası gir");
      return;
    }

    setLoading(true);
    setMsg("");
    setOrder(null);

    try {
      const res = await fetch(`/api/order?tracking=${encodeURIComponent(finalTracking)}`, {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.ok) {
        setOrder(data.order);
      } else {
        setMsg(data.message || "Sipariş bulunamadı");
      }
    } catch {
      setMsg("Sorgulama sırasında hata oluştu");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black p-6 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[2rem] border border-red-500/30 bg-black/80 p-7 shadow-2xl shadow-red-900/30">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-4xl font-black text-red-500">Sipariş Takip</h1>
              <p className="mt-2 text-zinc-400">Takip numaranı girip teslimat durumunu izle</p>
            </div>

            <Link href="/" className="rounded-xl border border-red-500/40 px-4 py-2 font-bold hover:bg-red-950">
              Ana Sayfa
            </Link>
          </div>

          <div className="mt-6 flex gap-2">
            <input
              className="w-full rounded-xl border border-red-500/40 bg-zinc-950 p-4 outline-none focus:border-red-400"
              placeholder="Takip numaran"
              value={tracking}
              onChange={(e) => setTracking(e.target.value)}
            />

            <button
              onClick={() => searchOrder()}
              disabled={loading}
              className="rounded-xl bg-red-600 px-6 font-black hover:bg-red-500 disabled:opacity-50"
            >
              {loading ? "..." : "Sorgula"}
            </button>
          </div>

          {msg && (
            <div className="mt-5 rounded-xl border border-red-500/30 bg-red-950/40 p-4 text-sm">
              {msg}
            </div>
          )}
        </div>

        {order && (
          <div className="mt-6 rounded-[2rem] border border-red-500/20 bg-black/70 p-6 shadow-2xl shadow-black/40">
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
                  <div className="text-3xl font-black text-white">{order.product}</div>
                  <div className="mt-2 text-lg text-zinc-300">@{order.roblox_username}</div>
                  <div className="mt-1 text-sm text-zinc-500">Takip No {order.tracking_number}</div>
                </div>
              </div>

              <div className="rounded-2xl border border-red-500/30 bg-red-950/30 px-5 py-3 text-lg font-black text-red-200">
                {statusText(order.status)}
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between text-xs font-black uppercase tracking-widest">
                <span className={order.status === "preparing" || order.status === "waiting" ? "text-yellow-400" : "text-zinc-500"}>
                  Hazırlanıyor
                </span>
                <span className={order.status === "ready" || order.status === "delivered" ? "text-blue-400" : "text-zinc-500"}>
                  Hazır
                </span>
                <span className={order.status === "delivered" ? "text-green-400" : "text-zinc-500"}>
                  Teslim
                </span>
              </div>

              <div className="relative h-5 overflow-hidden rounded-full bg-zinc-900">
                <div className={`absolute left-0 top-0 h-full rounded-full shadow-2xl transition-all duration-700 ${progressWidth(order.status)} ${progressColor(order.status)}`} />
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
                <div className="text-lg font-black text-green-400">Teslimat tamamlandı ✅</div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
