"use client";

import { useState } from "react";

type Order = {
  id: string;
  code: string;
  product: string;
  roblox_username: string;
  roblox_avatar_url?: string;
  user_email?: string;
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

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [logged, setLogged] = useState(false);
  const [vipLinks, setVipLinks] = useState<Record<string, string>>({});

  async function load() {
    const res = await fetch("/api/admin/orders", {
      headers: { "x-admin-password": password },
    });
    const data = await res.json();

    if (data.ok) {
      setOrders(data.orders);
      setLogged(true);
    } else {
      alert(data.message);
    }
  }

  async function updateOrder(id: string, status: string) {
    await fetch("/api/admin/update-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify({
        id,
        status,
        vip_link: vipLinks[id],
      }),
    });

    load();
  }

  if (!logged) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-sm rounded-3xl border border-red-500/40 p-6">
          <h1 className="text-3xl font-black text-red-500">Admin Panel</h1>
          <input
            className="mt-5 w-full rounded-xl bg-zinc-950 p-4"
            placeholder="Admin şifresi"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="mt-4 w-full rounded-xl bg-red-600 p-4 font-bold" onClick={load}>
            Giriş
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-6">
      <h1 className="text-4xl font-black text-red-500">Teslimatlar</h1>
      <button onClick={load} className="mt-4 rounded-xl bg-zinc-800 px-4 py-2">
        Yenile
      </button>

      <div className="mt-6 grid gap-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl border border-red-500/30 bg-zinc-950 p-5">
            <div className="flex items-center gap-4">
              {o.roblox_avatar_url && (
                <img
                  src={o.roblox_avatar_url}
                  alt={o.roblox_username}
                  className="h-16 w-16 rounded-2xl border border-red-500/30 bg-black"
                />
              )}

              <div>
                <div className="text-xl font-black text-red-400">{o.product}</div>
                <div className="mt-1 text-zinc-300">Roblox: {o.roblox_username}</div>
                <div className="text-zinc-400">Kod: {o.code}</div>
                <div className="text-zinc-400">E-posta: {o.user_email || "Girişsiz"}</div>
                <div className="mt-2 font-bold text-white">Durum: {statusText(o.status)}</div>
              </div>
            </div>

            <input
              className="mt-4 w-full rounded-xl border border-red-500/30 bg-black p-3"
              placeholder="VIP sunucu linki"
              defaultValue={o.vip_link || ""}
              onChange={(e) => setVipLinks({ ...vipLinks, [o.id]: e.target.value })}
            />

            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={() => updateOrder(o.id, "preparing")} className="rounded-xl bg-yellow-600 px-4 py-2 font-bold">
                Hazırlanıyor
              </button>
              <button onClick={() => updateOrder(o.id, "ready")} className="rounded-xl bg-blue-600 px-4 py-2 font-bold">
                Hazır + VIP Link
              </button>
              <button onClick={() => updateOrder(o.id, "delivered")} className="rounded-xl bg-green-600 px-4 py-2 font-bold">
                Sipariş Tamamlandı
              </button>
              <button onClick={() => updateOrder(o.id, "cancelled")} className="rounded-xl bg-red-700 px-4 py-2 font-bold">
                İptal
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
