"use client";

import { useState } from "react";

const inputClass = "w-full px-3 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-[#C47A3A]";
const inputStyle = { borderColor: "#E8C99A", backgroundColor: "#fff", color: "#2C2420" };
const labelClass = "block text-sm font-medium mb-1";
const labelStyle = { color: "#2C2420" };
const hintStyle = { color: "#6B5E55" };

interface FormState {
  name: string;
  email: string;
  phone: string;
  location: string;
  tagline: string;
  bio: string;
  skill1: string;
  skill2: string;
  skill3: string;
  website: string;
  portfolioLink: string;
  rate: string;
  linkedin: string;
  github: string;
  twitter: string;
  howDidYouHear: string;
}

const empty: FormState = {
  name: "", email: "", phone: "", location: "",
  tagline: "", bio: "",
  skill1: "", skill2: "", skill3: "",
  website: "", portfolioLink: "",
  rate: "",
  linkedin: "", github: "", twitter: "",
  howDidYouHear: "",
};

export default function ApplyPage() {
  const [form, setForm] = useState<FormState>(empty);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Submission failed");
      }

      setStatus("success");
      setForm(empty);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: "#E8C99A" }}>
          <span className="text-2xl font-bold" style={{ color: "#7C4A1E" }}>417</span>
        </div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: "#2C2420" }}>Application Received</h1>
        <p className="text-base leading-relaxed" style={{ color: "#6B5E55" }}>
          Thanks for applying to the 417 Freelancers directory. We review every application
          manually and will reach out to you at <strong style={{ color: "#2C2420" }}>{form.email || "your email"}</strong> within a few business days.
        </p>
        <a href="/directory" className="inline-block mt-8 px-6 py-3 text-sm font-medium rounded-md btn-primary">
          Browse the Directory
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold" style={{ color: "#2C2420" }}>Join the Directory</h1>
        <p className="mt-2 text-base" style={{ color: "#6B5E55" }}>
          Fill out as much or as little as you have handy. We will reach out to finalize your profile before it goes live.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Contact Info */}
        <section>
          <h2 className="text-lg font-semibold mb-5 pb-2 border-b" style={{ color: "#2C2420", borderColor: "#E8C99A" }}>
            Contact Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} style={labelStyle}>Full Name</label>
              <input required value={form.name} onChange={set("name")} className={inputClass} style={inputStyle} placeholder="Jane Smith" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Email Address</label>
              <input required type="email" value={form.email} onChange={set("email")} className={inputClass} style={inputStyle} placeholder="jane@example.com" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Phone</label>
              <input type="tel" value={form.phone} onChange={set("phone")} className={inputClass} style={inputStyle} placeholder="(417) 555-0100" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Location</label>
              <input value={form.location} onChange={set("location")} className={inputClass} style={inputStyle} placeholder="Springfield, MO" />
            </div>
          </div>
        </section>

        {/* Profile */}
        <section>
          <h2 className="text-lg font-semibold mb-5 pb-2 border-b" style={{ color: "#2C2420", borderColor: "#E8C99A" }}>
            Your Profile
          </h2>
          <div className="space-y-5">
            <div>
              <label className={labelClass} style={labelStyle}>Tagline</label>
              <input
                value={form.tagline}
                onChange={set("tagline")}
                className={inputClass}
                style={inputStyle}
                placeholder="e.g. Full-stack developer specializing in e-commerce"
                maxLength={120}
              />
              <p className="mt-1 text-xs" style={hintStyle}>One sentence. Shows under your name in the directory.</p>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Bio</label>
              <textarea
                value={form.bio}
                onChange={set("bio")}
                rows={6}
                className={inputClass}
                style={inputStyle}
                placeholder="Tell potential clients about your background, what you do, and what makes you great to work with..."
              />
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-lg font-semibold mb-5 pb-2 border-b" style={{ color: "#2C2420", borderColor: "#E8C99A" }}>
            Skills
          </h2>
          <p className="text-sm mb-4" style={hintStyle}>List up to three skills. These appear as tags on your profile.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className={labelClass} style={labelStyle}>Skill 1</label>
              <input value={form.skill1} onChange={set("skill1")} className={inputClass} style={inputStyle} placeholder="e.g. React" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Skill 2</label>
              <input value={form.skill2} onChange={set("skill2")} className={inputClass} style={inputStyle} placeholder="e.g. Node.js" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Skill 3</label>
              <input value={form.skill3} onChange={set("skill3")} className={inputClass} style={inputStyle} placeholder="e.g. TypeScript" />
            </div>
          </div>
        </section>

        {/* Links & Rate */}
        <section>
          <h2 className="text-lg font-semibold mb-5 pb-2 border-b" style={{ color: "#2C2420", borderColor: "#E8C99A" }}>
            Links and Rate
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass} style={labelStyle}>Website</label>
              <input type="url" value={form.website} onChange={set("website")} className={inputClass} style={inputStyle} placeholder="https://yoursite.com" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Portfolio Link</label>
              <input type="url" value={form.portfolioLink} onChange={set("portfolioLink")} className={inputClass} style={inputStyle} placeholder="https://portfolio.com or Behance, Dribbble, etc." />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} style={labelStyle}>Hourly Rate</label>
              <input value={form.rate} onChange={set("rate")} className={inputClass} style={inputStyle} placeholder="e.g. $75/hr or Project-based" />
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section>
          <h2 className="text-lg font-semibold mb-5 pb-2 border-b" style={{ color: "#2C2420", borderColor: "#E8C99A" }}>
            Social Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className={labelClass} style={labelStyle}>LinkedIn</label>
              <input type="url" value={form.linkedin} onChange={set("linkedin")} className={inputClass} style={inputStyle} placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>GitHub</label>
              <input type="url" value={form.github} onChange={set("github")} className={inputClass} style={inputStyle} placeholder="https://github.com/..." />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Twitter / X</label>
              <input type="url" value={form.twitter} onChange={set("twitter")} className={inputClass} style={inputStyle} placeholder="https://twitter.com/..." />
            </div>
          </div>
        </section>

        {/* How did you hear */}
        <section>
          <h2 className="text-lg font-semibold mb-5 pb-2 border-b" style={{ color: "#2C2420", borderColor: "#E8C99A" }}>
            One More Thing
          </h2>
          <div>
            <label className={labelClass} style={labelStyle}>How did you hear about 417 Freelancers?</label>
            <select value={form.howDidYouHear} onChange={set("howDidYouHear")} className={inputClass} style={inputStyle}>
              <option value="">Select one...</option>
              <option value="word-of-mouth">Word of mouth</option>
              <option value="google">Google search</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="networking-event">Networking event</option>
              <option value="other">Other</option>
            </select>
          </div>
        </section>

        {status === "error" && (
          <p className="text-sm font-medium" style={{ color: "#b91c1c" }}>
            {errorMsg || "Something went wrong. Please try again."}
          </p>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto px-8 py-3 text-sm font-medium rounded-md btn-primary"
          >
            {status === "submitting" ? "Submitting..." : "Submit Application"}
          </button>
          <p className="mt-3 text-xs" style={hintStyle}>
            We review every application and will reach out to you within a few business days.
          </p>
        </div>
      </form>
    </div>
  );
}
