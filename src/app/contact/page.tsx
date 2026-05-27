import type { Metadata } from "next";
import { Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export const metadata: Metadata = {
  title: {
    absolute: "Contact 417 Freelancers | Springfield, MO Freelancer Directory",
  },
  description:
    "Have a question about the 417 Freelancers directory? Reach out to the team. We review every message and respond within one business day. Email hello@417freelancers.com.",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact 417 Freelancers | Springfield, MO Freelancer Directory",
    description:
      "Have a question about the 417 Freelancers directory? Contact us and we will get back to you within one business day.",
    url: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: "#2C2420" }}>Contact Us</h1>
        <p className="text-lg" style={{ color: "#6B5E55" }}>
          Questions about the directory? Want to apply as a freelancer? We would love to hear
          from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Info */}
        <aside className="md:col-span-2 space-y-6">
          <div>
            <h2 className="font-semibold mb-3" style={{ color: "#2C2420" }}>Get in touch</h2>
            <div className="space-y-4 text-sm" style={{ color: "#6B5E55" }}>
              <div className="flex items-start gap-3">
                <Mail size={18} strokeWidth={1.5} style={{ color: "#C47A3A", marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p className="font-medium" style={{ color: "#2C2420" }}>Email</p>
                  <a
                    href="mailto:hello@417freelancers.com"
                    style={{ color: "#C47A3A" }}
                    className="hover:underline"
                  >
                    hello@417freelancers.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl p-5" style={{ backgroundColor: "#E8C99A" }}>
            <h3 className="font-semibold mb-2 text-sm" style={{ color: "#2C2420" }}>Want to join the directory?</h3>
            <p className="text-xs leading-relaxed mb-4" style={{ color: "#6B5E55" }}>
              If you are a freelancer, creative, agency, or side-hustler looking to get listed, head to our apply page. We review
              applications within 3 business days.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md"
              style={{ backgroundColor: "#7C4A1E", color: "#F5EFE6" }}
            >
              Apply to Join
              <ArrowRight size={13} strokeWidth={2} />
            </Link>
          </div>
        </aside>

        {/* Form */}
        <div className="md:col-span-3 bg-white rounded-2xl p-6 shadow-sm" style={{ border: "1px solid #E8C99A" }}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
