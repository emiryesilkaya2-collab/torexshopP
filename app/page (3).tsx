"use client";

import { useState } from "react";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function register() {
    setMsg("");
    const { error } = await supabaseClient.auth.signUp({ email, password });
    if (error) return setMsg(error.message);
    setMsg("Kayıt başarılı. E-postanı onayla, sonra giriş yap.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-red-500/40 bg-black/80 p-7">
        <h1 className="text-center text-4xl font-black text-red-500">KAYIT OL</h1>

        <input className="mt-7 w-full rounded-xl border border-red-500/40 bg-zinc-950 p-4"
          placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input className="mt-4 w-full rounded-xl border border-red-500/40 bg-zinc-950 p-4"
          type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button onClick={register} className="mt-5 w-full rounded-xl bg-red-600 p-4 font-black">
          KAYIT OL
        </button>

        {msg && <p className="mt-4 text-sm text-red-300">{msg}</p>}

        <Link className="mt-5 block text-center text-sm text-zinc-300" href="/login">
          Zaten hesabın var mı?
        </Link>
      </div>
    </main>
  );
}
