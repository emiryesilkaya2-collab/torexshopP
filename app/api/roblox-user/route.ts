import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username } = await req.json();

    if (!username || String(username).trim().length < 3) {
      return NextResponse.json(
        { ok: false, message: "Roblox kullanıcı adı çok kısa." },
        { status: 400 }
      );
    }

    const cleanUsername = String(username).trim();

    const userRes = await fetch("https://users.roblox.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usernames: [cleanUsername],
        excludeBannedUsers: true,
      }),
      cache: "no-store",
    });

    const userJson = await userRes.json();
    const user = userJson?.data?.[0];

    if (!user) {
      return NextResponse.json(
        { ok: false, message: "Roblox kullanıcı adı bulunamadı." },
        { status: 404 }
      );
    }

    const avatarRes = await fetch(
      `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${user.id}&size=150x150&format=Png&isCircular=false`,
      { cache: "no-store" }
    );

    const avatarJson = await avatarRes.json();
    const avatarUrl = avatarJson?.data?.[0]?.imageUrl || "";

    return NextResponse.json({
      ok: true,
      user: {
        id: String(user.id),
        name: user.name,
        displayName: user.displayName,
        avatarUrl,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Roblox kontrolünde hata oluştu." },
      { status: 500 }
    );
  }
}
