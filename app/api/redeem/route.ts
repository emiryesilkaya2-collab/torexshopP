import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { code, roblox_username } = await req.json();

    if (!code || !roblox_username) {
      return NextResponse.json({ message: "Kod ve Roblox kullanıcı adı zorunlu." }, { status: 400 });
    }

    const cleanCode = String(code).trim().toUpperCase();
    const cleanRoblox = String(roblox_username).trim();

    const { data: found, error } = await supabaseAdmin
      .from("codes")
      .select("*")
      .eq("code", cleanCode)
      .single();

    if (error || !found) {
      return NextResponse.json({ message: "Kod bulunamadı." }, { status: 404 });
    }

    if (found.status !== "unused") {
      return NextResponse.json({ message: "Bu kod daha önce kullanılmış." }, { status: 400 });
    }

    await supabaseAdmin
      .from("codes")
      .update({ status: "used", roblox_username: cleanRoblox, used_at: new Date().toISOString() })
      .eq("code", cleanCode);

    const { data: order } = await supabaseAdmin
      .from("orders")
      .insert({
        code: cleanCode,
        product: found.product,
        roblox_username: cleanRoblox,
        status: "waiting",
      })
      .select()
      .single();

    if (process.env.DISCORD_WEBHOOK_URL) {
      await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content:
            `🚨 Yeni TorexShop teslimatı!\n` +
            `Ürün: **${found.product}**\n` +
            `Roblox: **${cleanRoblox}**\n` +
            `Kod: **${cleanCode}**\n` +
            `Durum: Bekliyor`
        }),
      });
    }

    return NextResponse.json({
      ok: true,
      order,
      message: `Kod doğrulandı. Ürün: ${found.product}. Teslimat sıraya alındı. Roblox hesabın: ${cleanRoblox}`,
    });
  } catch {
    return NextResponse.json({ message: "Sunucu hatası oluştu." }, { status: 500 });
  }
}
