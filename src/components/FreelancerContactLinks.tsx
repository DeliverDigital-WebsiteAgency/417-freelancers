"use client";

import { Mail, Phone } from "lucide-react";

interface Props {
  email?: string | null;
  phone?: string | null;
  freelancerName: string;
  slug: string;
}

function pushEvent(method: "email" | "phone", name: string, slug: string) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dl = (window as any).dataLayer;
  if (Array.isArray(dl)) {
    dl.push({
      event: "freelancer_contact_click",
      contact_method: method,
      freelancer_name: name,
      freelancer_slug: slug,
    });
  }
}

export function FreelancerContactLinks({ email, phone, freelancerName, slug }: Props) {
  if (!email && !phone) return null;

  return (
    <>
      {email && (
        <div className="flex items-start gap-3">
          <Mail size={16} strokeWidth={1.5} style={{ color: "#C47A3A", marginTop: 2, flexShrink: 0 }} />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#6B5E55" }}>Email</p>
            <a
              href={`mailto:${email}`}
              className="text-sm link-amber hover:underline break-all"
              onClick={() => pushEvent("email", freelancerName, slug)}
            >
              {email}
            </a>
          </div>
        </div>
      )}
      {phone && (
        <div className="flex items-start gap-3">
          <Phone size={16} strokeWidth={1.5} style={{ color: "#C47A3A", marginTop: 2, flexShrink: 0 }} />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "#6B5E55" }}>Phone</p>
            <a
              href={`tel:${phone}`}
              className="text-sm link-amber hover:underline"
              onClick={() => pushEvent("phone", freelancerName, slug)}
            >
              {phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
