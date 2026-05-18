import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

async function checkRobloxUser(username: string) {
  const userRes = await fetch("https://users.roblox.com/v1/usernames/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usernames: [username],
      excludeBannedUsers: true,
    }),
    cache: "no-store",
  });

  const userJson = await userRes.json();
  const user = userJson?.data?.[0];

  if (!user) return null;

  const avatarRes = await fetch(
    `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png&isCircular=false`,
    { cache: "no-store" }
  );

  const avatarJson = await avatarRes.json();
  const avatarUrl = avatarJson?.data?.[0]?.imageUrl || "";

  return {
    id: String(user.id),
    name: user.name,
    displayName: user.displayName,
    avatarUrl,
  };
}

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

    const robloxUser = await checkRobloxUser(cleanRoblox);

    if (!robloxUser) {
      return NextResponse.json(
        { message: "Roblox kullanıcı adı bulunamadı. Lütfen doğru yaz." },
        { status: 404 }
      );
    }

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
        roblox_username: robloxUser.name,
        roblox_user_id: robloxUser.id,
        roblox_avatar_url: robloxUser.avatarUrl,
        user_email: cleanEmail,
        used_at: new Date().toISOString(),
      })
      .eq("code", cleanCode);

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        code: cleanCode,
        product: found.product,
        roblox_username: robloxUser.name,
        roblox_user_id: robloxUser.id,
        roblox_avatar_url: robloxUser.avatarUrl,
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
      message: `Kod doğrulandı. Roblox: ${robloxUser.name}. Ürün: ${found.product}. Sipariş hazırlanıyor.`,
    });
  } catch {
    return NextResponse.json(
      { message: "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
