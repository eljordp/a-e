import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, phone, email, location, service, acreage, details } =
    await request.json();

  if (!name || !phone || !location || !service) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "A&E Vineyard Leads <onboarding@resend.dev>",
        to: process.env.LEAD_EMAIL || "alex@caymus.com",
        subject: `New Quote Request: ${name} — ${service}`,
        html: `
          <h2 style="color:#1a1408;font-family:sans-serif;">New Vineyard Quote Request</h2>
          <table style="border-collapse:collapse;width:100%;max-width:550px;font-family:sans-serif;">
            <tr style="border-bottom:1px solid #e8e0d0;">
              <td style="padding:14px;font-weight:bold;color:#666;width:140px;">Name</td>
              <td style="padding:14px;">${name}</td>
            </tr>
            <tr style="border-bottom:1px solid #e8e0d0;">
              <td style="padding:14px;font-weight:bold;color:#666;">Phone</td>
              <td style="padding:14px;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr style="border-bottom:1px solid #e8e0d0;">
              <td style="padding:14px;font-weight:bold;color:#666;">Email</td>
              <td style="padding:14px;">${email || "Not provided"}</td>
            </tr>
            <tr style="border-bottom:1px solid #e8e0d0;">
              <td style="padding:14px;font-weight:bold;color:#666;">Location</td>
              <td style="padding:14px;">${location}</td>
            </tr>
            <tr style="border-bottom:1px solid #e8e0d0;">
              <td style="padding:14px;font-weight:bold;color:#666;">Service</td>
              <td style="padding:14px;font-weight:600;color:#c8922a;">${service}</td>
            </tr>
            <tr style="border-bottom:1px solid #e8e0d0;">
              <td style="padding:14px;font-weight:bold;color:#666;">Acreage</td>
              <td style="padding:14px;">${acreage || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding:14px;font-weight:bold;color:#666;vertical-align:top;">Details</td>
              <td style="padding:14px;">${details || "None provided"}</td>
            </tr>
          </table>
          <p style="margin-top:24px;color:#999;font-size:13px;">Submitted from A&E Vineyard Development website</p>
        `,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      const error = await response.json();
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
