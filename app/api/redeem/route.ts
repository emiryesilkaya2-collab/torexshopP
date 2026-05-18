import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { code, roblox_username, user_email } = await req.json();

    if (!code || !roblox_username || !user_email) {
      return NextResponse.json(
        { message: "Kod, Roblox adı ve giriş bilgisi zorunlu." },
        { status: 400 }
      );
    }

    const cleanCode = String(code).trim().toUpperCase();
    const cleanRoblox = String(roblox_username).trim();
    const cleanEmail = String(user_email).trim();

    const { data: found, error } = await supabaseAdmin
      .from("codes")
      .select("*")
      .eq("code", cleanCode)
      .single();

    if (error || !found) {
      return NextResponse.json(
        { message: "Kod bulunamadı." },
        { status: 404 }
      );
    }

    if (found.status !== "unused") {
      return NextResponse.json(
        { message: "Bu kod daha önce kullanılmış." },
        { status: 400 }
      );
    }

    await supabaseAdmin
      .from("codes")
      .update({
        status: "used",
        roblox_username: cleanRoblox,
        user_email: cleanEmail,
        used_at: new Date().toISOString(),
      })
      .eq("code", cleanCode);

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        code: cleanCode,
        product: found.product,
        roblox_username: cleanRoblox,
        user_email: cleanEmail,
        status: "preparing",
      })
      .select()
      .single();

    if (orderError) {
      return NextResponse.json(
        { message: "Sipariş oluşturulamadı." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      order,
      message: `Kod doğrulandı. Ürün: ${found.product}. Sipariş hazırlanıyor.`,
    });
  } catch {
    return NextResponse.json(
      { message: "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
