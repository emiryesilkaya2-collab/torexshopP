"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data }) => {
      if (!data.user) location.href = "/login";
      else setEmail(data.user.email || "");
    });
  }, []);

  async function logout() {
    await supabaseClient.auth.signOut();
    location.href = "/";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl border border-red-500/40 bg-black/80 p-7 text-center">
        <h1 className="text-4xl font-black text-red-500">PROFİL</h1>
        <p className="mt-4 text-zinc-300">Giriş yapan hesap: {email}</p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/redeem" className="rounded-xl bg-red-600 px-6 py-3 font-bold">
            Kod Kullan
          </Link>
          <button onClick={logout} className="rounded-xl border border-red-500/50 px-6 py-3 font-bold">
            Çıkış Yap
          </button>
        </div>
      </div>
    </main>
  );
}
