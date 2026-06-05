import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  businessName: z.string().max(200).optional().default(""),
  businessEmail: z.string().max(200).optional().default(""),
  businessPhone: z.string().max(100).optional().default(""),
  businessWebsite: z.string().max(300).optional().default(""),
  businessAddress: z.string().max(500).optional().default(""),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 422 });
  }

  const { businessName, businessEmail, businessPhone, businessWebsite, businessAddress } = parsed.data;

  const lines = [
    businessName    && `Name:     ${businessName}`,
    businessEmail   && `Email:    ${businessEmail}`,
    businessPhone   && `Phone:    ${businessPhone}`,
    businessWebsite && `Website:  ${businessWebsite}`,
    businessAddress && `Address:\n${businessAddress}`,
  ].filter(Boolean).join("\n");

  const body_text = lines || "(no details entered)";

  if (process.env.NODE_ENV === "development") {
    console.log("[Invoice Lead]\n" + body_text);
    return NextResponse.json({ ok: true });
  }

  const sendgridKey = process.env.SENDGRID_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  if (!sendgridKey || !toEmail) {
    console.error("[Invoice Lead] No email provider configured");
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sendgridKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: { email: "noreply@417freelancers.com", name: "417 Freelancers" },
      ...(businessEmail ? { reply_to: { email: businessEmail, name: businessName || businessEmail } } : {}),
      personalizations: [{ to: [{ email: toEmail }] }],
      subject: `[Invoice Tool] ${businessName || businessEmail || "Anonymous"} generated an invoice`,
      content: [{ type: "text/plain", value: body_text }],
    }),
  });

  if (!res.ok) {
    console.error("[Invoice Lead] SendGrid failed:", res.status, await res.text());
  }

  return NextResponse.json({ ok: true });
}
