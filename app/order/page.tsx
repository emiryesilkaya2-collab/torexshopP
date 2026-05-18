"use client";

import { useState } from "react";

export default function OrderPage() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState<any>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function searchOrder() {
    setLoading(true);
    setMsg("");
    setResult(null);

    const res = await fetch(`/api/order?tracking=${encodeURIComponent(tracking)}`);
    const data = await res.json();

    if (!data.ok) {
      setMsg(data.message || "Sipariş bulunamadı");
    } else {
      setResult(data.order);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black p-6 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-red-500/40 bg-black/80 p-7">
        <h1 className="text-4xl font-black text-red-500">Sipariş Takip</h1>

        <input
          className="mt-6 w-full rounded-xl bg-zinc-950 p-4"
          placeholder="Takip numaranı gir"
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
        />

        <button
          onClick={searchOrder}
          className="mt-4 w-full rounded-xl bg-red-600 p-4 font-black"
        >
          {loading ? "Sorgulanıyor" : "Sorgula"}
        </button>

        {msg && <div className="mt-5 rounded-xl bg-red-950/50 p-4">{msg}</div>}

        {result && (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-zinc-950 p-5">
            <div className="text-2xl font-black">{result.product}</div>
            <div className="mt-2">Roblox: {result.roblox_username}</div>
            <div>Takip No: {result.tracking_number}</div>
            <div>Kod: {result.code}</div>
            <div className="mt-3 font-black text-red-400">
              Durum: {result.status}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
