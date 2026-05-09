import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  phone: z.string().max(50).optional().default(""),
  location: z.string().max(200).optional().default(""),
  tagline: z.string().max(120).optional().default(""),
  bio: z.string().max(5000).optional().default(""),
  skill1: z.string().max(100).optional().default(""),
  skill2: z.string().max(100).optional().default(""),
  skill3: z.string().max(100).optional().default(""),
  website: z.string().max(300).optional().default(""),
  portfolioLink: z.string().max(300).optional().default(""),
  rate: z.string().max(100).optional().default(""),
  linkedin: z.string().max(300).optional().default(""),
  github: z.string().max(300).optional().default(""),
  twitter: z.string().max(300).optional().default(""),
  howDidYouHear: z.string().max(100).optional().default(""),
});

function formatEmail(d: z.infer<typeof schema>): string {
  const row = (label: string, value: string) =>
    value ? `${label}: ${value}` : "";

  return [
    "=== NEW FREELANCER APPLICATION ===",
    "",
    "-- CONTACT --",
    row("Name", d.name),
    row("Email", d.email),
    row("Phone", d.phone),
    row("Location", d.location),
    "",
    "-- PROFILE --",
    row("Tagline", d.tagline),
    "",
    "Bio:",
    d.bio,
    "",
    "-- SKILLS --",
    row("Skill 1", d.skill1),
    row("Skill 2", d.skill2),
    row("Skill 3", d.skill3),
    "",
    "-- LINKS & RATE --",
    row("Website", d.website),
    row("Portfolio", d.portfolioLink),
    row("Hourly Rate", d.rate),
    "",
    "-- SOCIAL --",
    row("LinkedIn", d.linkedin),
    row("GitHub", d.github),
    row("Twitter", d.twitter),
    "",
    "-- OTHER --",
    row("How they heard about us", d.howDidYouHear),
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

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

  const data = parsed.data;
  const emailBody = formatEmail(data);
  const subject = `[Apply] ${data.name} - ${data.skill1}`;

  // Option A: WP webhook
  const wpWebhook = process.env.CONTACT_FORM_WEBHOOK_URL;
  if (wpWebhook) {
    const wpRes = await fetch(wpWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: data.name, email: data.email, subject, message: emailBody }),
    });
    if (!wpRes.ok) {
      console.error("WP webhook failed", await wpRes.text());
      return NextResponse.json({ error: "Failed to forward application" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  // Option B: SendGrid
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  if (sendgridKey && toEmail) {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sendgridKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { email: "noreply@417freelancers.com", name: "417 Freelancers" },
        reply_to: { email: data.email, name: data.name },
        personalizations: [{ to: [{ email: toEmail }] }],
        subject,
        content: [{ type: "text/plain", value: emailBody }],
      }),
    });

    if (!res.ok) {
      console.error("SendGrid failed", await res.text());
      return NextResponse.json({ error: "Failed to send application" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[Apply Form]\n", emailBody);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "No email provider configured" }, { status: 503 });
}
