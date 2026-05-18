import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const pass = req.headers.get("x-admin-password");
  if (pass !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, message: "Şifre yanlış." }, { status: 401 });
  }

  const { id } = await req.json();

  const { error } = await supabaseAdmin
    .from("orders")
    .update({ status: "delivered", delivered_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ ok: false, message: "Güncellenemedi." }, { status: 500 });

  return NextResponse.json({ ok: true });
}
