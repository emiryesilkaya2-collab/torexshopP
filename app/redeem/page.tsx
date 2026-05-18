"use client";

import { useState } from "react";
import Link from "next/link";

type RobloxUser = {
  id: string;
  name: string;
  displayName: string;
  avatarUrl: string;
};

export default function RedeemPage() {
  const [code, setCode] = useState("");
  const [roblox, setRoblox] = useState("");
  const [robloxUser, setRobloxUser] = useState<RobloxUser | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [checkingRoblox, setCheckingRoblox] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkRoblox() {
    setMsg("");
    setRobloxUser(null);
    setCheckingRoblox(true);

    const res = await fetch("/api/roblox-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: roblox }),
    });

    const data = await res.json();

    if (data.ok) {
      setRobloxUser(data.user);
      setMsg("Roblox hesabı doğrulandı");
    } else {
      setMsg(data.message || "Roblox hesabı bulunamadı");
    }

    setCheckingRoblox(false);
  }

  async function redeem() {
    setLoading(true);
    setMsg("");
    setTrackingNumber("");

    const res = await fetch("/api/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, roblox_username: roblox }),
    });

    const result = await res.json();

    if (result.ok && result.tracking_number) {
      setTrackingNumber(result.tracking_number);
    }

    setMsg(result.message);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-red-500/40 bg-black/80 p-7 shadow-2xl shadow-red-900/40">
        <h1 className="text-center text-4xl font-black text-red-500">TOREXSHOP</h1>
        <p className="mt-2 text-center text-zinc-400">Hesapsız teslimat kodunu kullan</p>

        <input
          className="mt-7 w-full rounded-xl border border-red-500/40 bg-zinc-950 p-4 outline-none focus:border-red-400"
          placeholder="Kodun"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
        />

        <div className="mt-4 flex gap-2">
          <input
            className="w-full rounded-xl border border-red-500/40 bg-zinc-950 p-4 outline-none focus:border-red-400"
            placeholder="Roblox kullanıcı adın"
            value={roblox}
            onChange={(e) => {
              setRoblox(e.target.value);
              setRobloxUser(null);
            }}
          />

          <button
            onClick={checkRoblox}
            disabled={checkingRoblox}
            className="rounded-xl border border-red-500/40 px-4 font-bold hover:bg-red-950 disabled:opacity-50"
          >
            {checkingRoblox ? "..." : "Kontrol"}
          </button>
        </div>

        {robloxUser && (
          <div className="mt-4 flex items-center gap-4 rounded-2xl border border-red-500/30 bg-red-950/30 p-4">
            {robloxUser.avatarUrl && (
              <img src={robloxUser.avatarUrl} alt={robloxUser.name} className="h-16 w-16 rounded-2xl bg-black" />
            )}

            <div>
              <div className="font-black text-white">{robloxUser.name}</div>
              <div className="text-sm text-zinc-400">{robloxUser.displayName}</div>
              <div className="text-xs text-green-400">Doğrulandı ✅</div>
            </div>
          </div>
        )}

        <button
          onClick={redeem}
          disabled={loading}
          className="mt-5 w-full rounded-xl bg-red-600 p-4 font-black hover:bg-red-500 disabled:opacity-50"
        >
          {loading ? "Kontrol ediliyor..." : "TESLİMATI BAŞLAT"}
        </button>

        {trackingNumber && (
          <div className="mt-5 rounded-2xl border border-green-500/30 bg-green-950/20 p-5 text-center">
            <div className="text-sm font-bold text-green-400">TAKİP NUMARAN</div>
            <div className="mt-2 text-3xl font-black tracking-widest text-white">{trackingNumber}</div>

            <Link
              href={`/order?tracking=${trackingNumber}`}
              className="mt-4 inline-block rounded-xl bg-red-600 px-5 py-3 font-black hover:bg-red-500"
            >
              Siparişi Takip Et
            </Link>
          </div>
        )}

        <Link href="/order" className="mt-4 block text-center text-sm font-bold text-red-300 hover:text-red-200">
          Siparişimi sorgula
        </Link>

        {msg && (
          <div className="mt-5 rounded-xl border border-red-500/30 bg-red-950/40 p-4 text-sm">
            {msg}
          </div>
        )}
      </div>
    </main>
  );
}
