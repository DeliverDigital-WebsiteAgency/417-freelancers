"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  freelancerSlug: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface ContactFormProps {
  freelancerName?: string;
  freelancerSlug?: string;
}

export function ContactForm({ freelancerName, freelancerSlug }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: freelancerName ? `Inquiry for ${freelancerName}` : "",
      freelancerSlug: freelancerSlug ?? "",
    },
  });

  async function onSubmit(data: FormValues) {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl p-8 text-center" style={{ backgroundColor: "#F5EFE6", border: "1px solid #E8C99A" }}>
        <CheckCircle size={40} className="mx-auto mb-3" style={{ color: "#7C4A1E" }} />
        <h3 className="text-lg font-semibold mb-1" style={{ color: "#2C2420" }}>Message sent!</h3>
        <p className="text-sm" style={{ color: "#6B5E55" }}>
          Thanks for reaching out. We will be in touch shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm underline hover:no-underline"
          style={{ color: "#7C4A1E" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-2.5 border rounded-md text-sm focus:outline-none transition-colors bg-white";
  const inputStyle = { borderColor: "#E8C99A", color: "#2C2420" };
  const labelStyle = { color: "#6B5E55" };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <input type="hidden" {...register("freelancerSlug")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1" style={labelStyle}>
            Your name <span style={{ color: "#C47A3A" }}>*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            {...register("name")}
            className={inputClass}
            style={inputStyle}
            placeholder="Jane Smith"
          />
          {errors.name && (
            <p className="mt-1 text-xs" style={{ color: "#991b1b" }}>{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1" style={labelStyle}>
            Email address <span style={{ color: "#C47A3A" }}>*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className={inputClass}
            style={inputStyle}
            placeholder="jane@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs" style={{ color: "#991b1b" }}>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1" style={labelStyle}>
          Subject <span style={{ color: "#C47A3A" }}>*</span>
        </label>
        <input
          id="subject"
          type="text"
          {...register("subject")}
          className={inputClass}
          style={inputStyle}
          placeholder="Project inquiry"
        />
        {errors.subject && (
          <p className="mt-1 text-xs" style={{ color: "#991b1b" }}>{errors.subject.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1" style={labelStyle}>
          Message <span style={{ color: "#C47A3A" }}>*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          className={`${inputClass} resize-y`}
          style={inputStyle}
          placeholder="Tell us about your project..."
        />
        {errors.message && (
          <p className="mt-1 text-xs" style={{ color: "#991b1b" }}>{errors.message.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm rounded-md px-4 py-3" style={{ color: "#991b1b", backgroundColor: "#fee2e2", border: "1px solid #fca5a5" }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full px-6 py-3 font-medium rounded-md transition-colors text-white disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#7C4A1E" }}
        onMouseEnter={e => { if (status !== "loading") (e.currentTarget.style.backgroundColor = "#70431B"); }}
        onMouseLeave={e => { if (status !== "loading") (e.currentTarget.style.backgroundColor = "#7C4A1E"); }}
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
