import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  const email = new URL(req.url).searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { ok: false, message: "E-posta yok." },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("user_email", email)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, message: "Siparişler alınamadı." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    orders: data,
  });
}
