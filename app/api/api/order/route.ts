import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  const tracking = new URL(req.url).searchParams.get("tracking");

  if (!tracking) {
    return NextResponse.json(
      { ok: false, message: "Takip numarası yok" },
      { status: 400 }
    );
  }

  const cleanTracking = String(tracking).trim();

  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("tracking_number", cleanTracking)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { ok: false, message: "Sipariş bulunamadı" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, order: data });
}
