"use client";

import { useState } from "react";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function login() {
    setMsg("");
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    location.href = "/profile";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-red-500/40 bg-black/80 p-7">
        <h1 className="text-center text-4xl font-black text-red-500">GİRİŞ YAP</h1>

        <input className="mt-7 w-full rounded-xl border border-red-500/40 bg-zinc-950 p-4"
          placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input className="mt-4 w-full rounded-xl border border-red-500/40 bg-zinc-950 p-4"
          type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={login} className="mt-5 w-full rounded-xl bg-red-600 p-4 font-black">
          GİRİŞ
        </button>

        {msg && <p className="mt-4 text-sm text-red-300">{msg}</p>}

        <div className="mt-5 flex justify-between text-sm text-zinc-300">
          <Link href="/register">Hesap oluştur</Link>
          <Link href="/forgot">Şifremi unuttum</Link>
        </div>
      </div>
    </main>
  );
}
