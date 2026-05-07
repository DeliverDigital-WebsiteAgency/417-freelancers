import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/SchemaOrg";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://417freelancers.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "417 Freelancers | Springfield, MO Freelancer Directory",
    template: "%s | 417 Freelancers",
  },
  description:
    "Find skilled local freelancers in Springfield, MO and the 417 area. Browse web developers, designers, marketers, copywriters, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "417 Freelancers",
    title: "417 Freelancers | Springfield, MO Freelancer Directory",
    description:
      "Find skilled local freelancers in Springfield, MO and the 417 area.",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "417 Freelancers | Springfield, MO Freelancer Directory",
    description:
      "Find skilled local freelancers in Springfield, MO and the 417 area.",
  },
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <head>
        <LocalBusinessSchema />
      </head>
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
