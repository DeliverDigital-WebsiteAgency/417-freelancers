import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/SchemaOrg";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://417freelancers.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "417 Freelancers | Springfield, MO Freelancer Directory",
    template: "%s | 417 Freelancers",
  },
  description:
    "Find locally vetted freelancers in Springfield, MO and Southwest Missouri. Browse the 417's trusted directory of designers, developers, marketers, and more.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "417 Freelancers",
    title: "417 Freelancers | Southwest Missouri's Freelancer Directory",
    description:
      "Find locally vetted freelancers in Southwest Missouri. Browse the 417's trusted directory of designers, developers, marketers, and more.",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "417 Freelancers | Southwest Missouri's Freelancer Directory",
    description:
      "Find locally vetted freelancers in Southwest Missouri. Browse the 417's trusted directory of designers, developers, marketers, and more.",
  },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TXQP3WZ2');` }} />
        <LocalBusinessSchema />
      </head>
      <body className="min-h-full flex flex-col font-sans" style={{ backgroundColor: "#F5EFE6", color: "#6B5E55" }} suppressHydrationWarning>
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TXQP3WZ2" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
