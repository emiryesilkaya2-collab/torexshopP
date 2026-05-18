"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";

export default function RedeemPage() {
  const [code, setCode] = useState("");
  const [roblox, setRoblox] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function redeem() {
    setLoading(true);
    setMsg("");

    const { data } = await supabaseClient.auth.getUser();

    if (!data.user?.email) {
      setLoading(false);
      setMsg("Önce giriş yapman gerekiyor.");
      return;
    }

    const res = await fetch("/api/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        roblox_username: roblox,
        user_email: data.user.email,
      }),
    });

    const result = await res.json();
    setMsg(result.message);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-red-500/40 bg-black/80 p-7">
        <h1 className="text-center text-4xl font-black text-red-500">TOREXSHOP</h1>
        <p className="mt-2 text-center text-zinc-400">Teslimat kodunu kullan</p>

        <input
          className="mt-7 w-full rounded-xl border border-red-500/40 bg-zinc-950 p-4"
          placeholder="Kodun"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />

        <input
          className="mt-4 w-full rounded-xl border border-red-500/40 bg-zinc-950 p-4"
          placeholder="Roblox kullanıcı adın"
          value={roblox}
          onChange={(e) => setRoblox(e.target.value)}
        />

        <button
          onClick={redeem}
          disabled={loading}
          className="mt-5 w-full rounded-xl bg-red-600 p-4 font-black"
        >
          {loading ? "Kontrol ediliyor..." : "TESLİMATI BAŞLAT"}
        </button>

        {msg && (
          <div className="mt-5 rounded-xl border border-red-500/30 bg-red-950/40 p-4 text-sm">
            {msg}
          </div>
        )}
      </div>
    </main>
  );
}
