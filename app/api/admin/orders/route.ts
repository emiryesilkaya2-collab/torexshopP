import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  const pass = req.headers.get("x-admin-password");
  if (pass !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, message: "Şifre yanlış." }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ ok: false, message: "Siparişler alınamadı." }, { status: 500 });

  return NextResponse.json({ ok: true, orders: data });
}
