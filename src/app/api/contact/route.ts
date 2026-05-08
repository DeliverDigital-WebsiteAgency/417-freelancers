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

  // Option B: send via SendGrid
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  if (sendgridKey && toEmail) {
    console.log("[Contact] Sending via SendGrid to", toEmail);
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { email: "noreply@417freelancers.com", name: "417 Freelancers" },
        reply_to: { email, name },
        personalizations: [{ to: [{ email: toEmail }] }],
        subject: `[Contact] ${subject}`,
        content: [
          {
            type: "text/plain",
            value: [
              `From: ${name} <${email}>`,
              freelancerSlug ? `Freelancer: ${freelancerSlug}` : "",
              "",
              message,
            ]
              .filter(Boolean)
              .join("\n"),
          },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[Contact] SendGrid failed:", res.status, errText);
      return NextResponse.json({ error: `SendGrid error ${res.status}` }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[Contact Form]", { name, email, subject, message, freelancerSlug });
    return NextResponse.json({ ok: true });
  }

  console.error("[Contact] No provider: SENDGRID_API_KEY set?", !!sendgridKey, "CONTACT_EMAIL set?", !!toEmail);
  return NextResponse.json({ error: "No email provider configured" }, { status: 503 });
}
