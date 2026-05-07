import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  subject: z.string().min(4).max(200),
  message: z.string().min(20).max(5000),
  freelancerSlug: z.string().max(200).optional(),
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
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.issues }, { status: 422 });
  }

  const { name, email, subject, message, freelancerSlug } = parsed.data;

  // Option A: forward to WordPress contact form endpoint
  const wpWebhook = process.env.CONTACT_FORM_WEBHOOK_URL;
  if (wpWebhook) {
    const wpRes = await fetch(wpWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message, freelancerSlug }),
    });
    if (!wpRes.ok) {
      console.error("WP webhook failed", await wpRes.text());
      return NextResponse.json({ error: "Failed to forward message" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  // Option B: send via Resend (https://resend.com)
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  if (resendKey && toEmail) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "417 Freelancers <noreply@417freelancers.com>",
        to: [toEmail],
        reply_to: email,
        subject: `[Contact] ${subject}`,
        text: [
          `From: ${name} <${email}>`,
          freelancerSlug ? `Freelancer: ${freelancerSlug}` : "",
          "",
          message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });

    if (!res.ok) {
      console.error("Resend failed", await res.text());
      return NextResponse.json({ error: "Failed to send email" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  // Fallback: log in development, succeed silently
  if (process.env.NODE_ENV === "development") {
    console.log("[Contact Form]", { name, email, subject, message, freelancerSlug });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "No email provider configured" }, { status: 503 });
}
