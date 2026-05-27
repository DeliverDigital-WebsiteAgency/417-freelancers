import type { Metadata } from "next";
import { ApplyForm } from "./ApplyForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.417freelancers.com";

export const metadata: Metadata = {
  title: {
    absolute: "Apply to Join | 417 Freelancers — Springfield, MO Freelancer Directory",
  },
  description:
    "Apply to be listed in the 417 Freelancers directory. Showcase your skills to businesses in Springfield, MO and the 417 area. Free to list. Reviewed within 3 business days.",
  alternates: { canonical: `${siteUrl}/apply` },
  openGraph: {
    title: "Apply to Join | 417 Freelancers",
    description:
      "Apply to be listed in the 417 Freelancers directory. Free for local freelancers in Springfield, MO and the 417 area.",
    url: `${siteUrl}/apply`,
  },
};

export default function ApplyPage() {
  return <ApplyForm />;
}
