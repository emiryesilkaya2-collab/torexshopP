 "use client";

import { useEffect, useState } from "react";

type Order = {
  id: string;
  code: string;
  product: string;
  roblox_username: string;
  status: string;
  created_at: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [logged, setLogged] = useState(false);

  async function load() {
    const res = await fetch("/api/admin/orders", { headers: { "x-admin-password": password } });
    const data = await res.json();
    if (data.ok) {
      setOrders(data.orders);
      setLogged(true);
    } else alert(data.message);
  }

  async function deliver(id: string) {
    await fetch("/api/admin/deliver", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ id }),
    });
    load();
  }

  if (!logged) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-sm rounded-3xl border border-red-500/40 p-6">
          <h1 className="text-3xl font-black text-red-500">Admin Panel</h1>
          <input className="mt-5 w-full rounded-xl bg-zinc-950 p-4" placeholder="Admin şifresi"
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="mt-4 w-full rounded-xl bg-red-600 p-4 font-bold" onClick={load}>Giriş</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black p-6">
      <h1 className="text-4xl font-black text-red-500">Bekleyen Teslimatlar</h1>
      <button onClick={load} className="mt-4 rounded-xl bg-zinc-800 px-4 py-2">Yenile</button>
      <div className="mt-6 grid gap-4">
        {orders.map((o) => (
          <div key={o.id} className="rounded-2xl border border-red-500/30 bg-zinc-950 p-5">
            <div className="text-xl font-black text-red-400">{o.product}</div>
            <div className="mt-2 text-zinc-300">Roblox: {o.roblox_username}</div>
            <div className="text-zinc-400">Kod: {o.code}</div>
            <div className="text-zinc-500">Durum: {o.status}</div>
            {o.status !== "delivered" && (
              <button onClick={() => deliver(o.id)} className="mt-4 rounded-xl bg-red-600 px-5 py-3 font-bold">
                Teslim Edildi
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
