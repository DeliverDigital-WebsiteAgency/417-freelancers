import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://417freelancers.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with 417 Freelancers. Apply to join our Springfield, MO freelancer directory or send us a general inquiry.",
  alternates: { canonical: `${siteUrl}/contact` },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-500">
          Questions about the directory? Want to apply as a freelancer? We&apos;d love to hear
          from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Info */}
        <aside className="md:col-span-2 space-y-6">
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Get in touch</h2>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <span className="text-xl">✉️</span>
                <div>
                  <p className="font-medium text-gray-700">Email</p>
                  <a
                    href="mailto:hello@417freelancers.com"
                    className="text-indigo-600 hover:underline"
                  >
                    hello@417freelancers.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-medium text-gray-700">Location</p>
                  <p>Springfield, MO 65801</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-xl p-5">
            <h3 className="font-semibold text-indigo-900 mb-2 text-sm">Applying to join?</h3>
            <p className="text-xs text-indigo-700 leading-relaxed">
              Include your name, specialty, website or portfolio link, and a brief description
              of the services you offer. We review applications within 3–5 business days.
            </p>
          </div>
        </aside>

        {/* Form */}
        <div className="md:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
