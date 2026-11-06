import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, firstName } = await req.json();
    const apiKey = process.env.BREVO_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing Brevo API Key" }, { status: 500 });
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "WALLYJAYTECH-MD",
          email: "wallyjaytech@gmail.com", // MUST match your verified Brevo email
        },
        to: [{ email: email, name: firstName }],
        subject: "Welcome to WALLYJAYTECH-MD!",
        htmlContent: `
          <div style="font-family: Arial, sans-serif; background-color: #000; color: #fff; padding: 40px; border-radius: 10px; text-align: center;">
            <h1 style="color: #FFD700;">WALLYJAYTECH-MD</h1>
            <p>Hello ${firstName},</p>
            <p>Welcome to the ultimate WhatsApp automation platform!</p>
            <p>Your account has been successfully created. You can now log in and start managing your bot.</p>
            <br/>
            <a href="https://wallyjaytech-md.online/dashboard" style="background-color: #FFD700; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Go to Dashboard</a>
            <p style="margin-top: 40px; color: #888; font-size: 12px;">© 2025-2026 WALLYJAYTECH-MD. All rights reserved.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
