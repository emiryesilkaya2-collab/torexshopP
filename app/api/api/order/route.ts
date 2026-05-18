import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  try {
    const tracking = new URL(req.url).searchParams.get("tracking");

    if (!tracking) {
      return NextResponse.json({ ok: false, message: "Takip numarası yok" });
    }

    const cleanTracking = String(tracking).trim();

    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("tracking_number", cleanTracking)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ ok: false, message: "Veritabanı hatası" });
    }

    if (!data) {
      return NextResponse.json({ ok: false, message: "Sipariş bulunamadı" });
    }

    return NextResponse.json({ ok: true, order: data });
  } catch {
    return NextResponse.json({ ok: false, message: "Sunucu hatası" });
  }
}
