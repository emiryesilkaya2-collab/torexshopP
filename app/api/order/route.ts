import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tracking = url.searchParams.get("tracking");

    if (!tracking) {
      return NextResponse.json({
        ok: false,
        message: "Takip numarası girilmedi",
      });
    }

    const cleanTracking = tracking.trim();

    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .or(`tracking_number.eq.${cleanTracking},code.eq.${cleanTracking}`)
      .maybeSingle();

    if (error) {
      return NextResponse.json({
        ok: false,
        message: error.message,
      });
    }

    if (!data) {
      return NextResponse.json({
        ok: false,
        message: "Sipariş bulunamadı",
      });
    }

    return NextResponse.json({
      ok: true,
      order: data,
    });
  } catch {
    return NextResponse.json({
      ok: false,
      message: "Sunucu hatası",
    });
  }
}
