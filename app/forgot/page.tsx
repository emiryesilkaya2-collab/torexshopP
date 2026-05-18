"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabaseClient";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function reset() {
    setMsg("");
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: location.origin + "/login",
    });

    if (error) return setMsg(error.message);
    setMsg("Şifre sıfırlama linki e-postana gönderildi.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-red-500/40 bg-black/80 p-7">
        <h1 className="text-center text-3xl font-black text-red-500">ŞİFREMİ UNUTTUM</h1>

        <input className="mt-7 w-full rounded-xl border border-red-500/40 bg-zinc-950 p-4"
          placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button onClick={reset} className="mt-5 w-full rounded-xl bg-red-600 p-4 font-black">
          LİNK GÖNDER
        </button>

        {msg && <p className="mt-4 text-sm text-red-300">{msg}</p>}
      </div>
    </main>
  );
}
