import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  freelancerBusiness: z.string().max(200).optional().default(""),
  freelancerEmail: z.string().max(200).optional().default(""),
  freelancerPhone: z.string().max(100).optional().default(""),
  clientName: z.string().max(200).optional().default(""),
  projectTitle: z.string().max(200).optional().default(""),
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

  const { freelancerBusiness, freelancerEmail, freelancerPhone, clientName, projectTitle } = parsed.data;

  const lines = [
    freelancerBusiness && `Freelancer: ${freelancerBusiness}`,
    freelancerEmail    && `Email:      ${freelancerEmail}`,
    freelancerPhone    && `Phone:      ${freelancerPhone}`,
    clientName         && `Client:     ${clientName}`,
    projectTitle       && `Project:    ${projectTitle}`,
  ].filter(Boolean).join("\n");

  const body_text = lines || "(no details entered)";

  if (process.env.NODE_ENV === "development") {
    console.log("[Contract Lead]\n" + body_text);
    return NextResponse.json({ ok: true });
  }

  const sendgridKey = process.env.SENDGRID_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  if (!sendgridKey || !toEmail) {
    console.error("[Contract Lead] No email provider configured");
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
      ...(freelancerEmail ? { reply_to: { email: freelancerEmail, name: freelancerBusiness || freelancerEmail } } : {}),
      personalizations: [{ to: [{ email: toEmail }] }],
      subject: `[Contract Tool] ${freelancerBusiness || freelancerEmail || "Anonymous"} generated a contract`,
      content: [{ type: "text/plain", value: body_text }],
    }),
  });

  if (!res.ok) {
    console.error("[Contract Lead] SendGrid failed:", res.status, await res.text());
  }

  return NextResponse.json({ ok: true });
}
