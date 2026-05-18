"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabaseClient";

type Order = {
  id: string;
  code: string;
  product: string;
  roblox_username: string;
  status: string;
  vip_link?: string;
  created_at: string;
};

function statusText(status: string) {
  if (status === "preparing" || status === "waiting") return "Hazırlanıyor";
  if (status === "ready") return "Hazır";
  if (status === "delivered") return "Sipariş Tamamlandı";
  if (status === "cancelled") return "İptal Edildi";
  return status;
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

      const res = await fetch(`/api/profile/orders?email=${encodeURIComponent(userEmail)}`);
      const json = await res.json();
      if (json.ok) setOrders(json.orders);
    });
  }, []);

  async function logout() {
    await supabaseClient.auth.signOut();
    location.href = "/";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black p-6">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-red-500/40 bg-black/80 p-7 text-center">
          <h1 className="text-4xl font-black text-red-500">PROFİL</h1>
          <p className="mt-4 text-zinc-300">Hesap: {email}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/redeem" className="rounded-xl bg-red-600 px-6 py-3 font-bold">
              Kod Kullan
            </Link>
            <button onClick={logout} className="rounded-xl border border-red-500/50 px-6 py-3 font-bold">
              Çıkış Yap
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-red-500/40 bg-black/80 p-7">
          <h2 className="text-2xl font-black text-red-400">Sipariş Geçmişi</h2>

          {orders.length === 0 && (
            <p className="mt-4 text-zinc-400">Henüz sipariş yok.</p>
          )}

          <div className="mt-5 grid gap-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-red-500/30 bg-zinc-950 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xl font-black text-white">{order.product}</div>
                    <div className="mt-1 text-sm text-zinc-400">Roblox: {order.roblox_username}</div>
                    <div className="text-sm text-zinc-500">Kod: {order.code}</div>
                  </div>

                  <div className="rounded-xl border border-red-500/40 bg-red-950/40 px-4 py-2 font-bold text-red-200">
                    {statusText(order.status)}
                  </div>
                </div>

                {order.status === "ready" && order.vip_link && (
                  <a
                    href={order.vip_link}
                    target="_blank"
                    className="mt-4 inline-block rounded-xl bg-red-600 px-5 py-3 font-black hover:bg-red-500"
                  >
                    VIP SUNUCUYA GİR
                  </a>
                )}

                {order.status === "delivered" && (
                  <p className="mt-4 text-green-400 font-bold">Teslimat tamamlandı ✅</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
