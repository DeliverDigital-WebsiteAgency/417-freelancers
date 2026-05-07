import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// Called by WordPress webhook (e.g. WP Webhooks plugin) on post save/publish.
// Payload: { secret, postType, slug }
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATION_SECRET;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { secret: incomingSecret, postType, slug } = body as Record<string, string>;

  if (!secret || incomingSecret !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (postType === "freelancer" && slug) {
    revalidatePath(`/directory/${slug}`);
    revalidatePath("/directory");
    revalidatePath("/");
  } else {
    revalidatePath("/", "layout");
  }

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
