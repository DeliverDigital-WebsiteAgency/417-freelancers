"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

type ServiceId =
  | "web-development"
  | "graphic-design"
  | "photography"
  | "videography"
  | "copywriting"
  | "digital-marketing";

type ScopeId = "small" | "medium" | "large";

type Service = {
  id: ServiceId;
  label: string;
  rateLow: number;
  rateHigh: number;
  scopes: Record<ScopeId, string>;
};

const SERVICES: Service[] = [
  {
    id: "web-development",
    label: "Web development",
    rateLow: 50,
    rateHigh: 120,
    scopes: {
      small: "Landing page, small fixes, or a few new sections",
      medium: "Multi-page marketing site or a custom WordPress build",
      large: "Web app, e-commerce store, or a full custom platform",
    },
  },
  {
    id: "graphic-design",
    label: "Graphic design",
    rateLow: 40,
    rateHigh: 90,
    scopes: {
      small: "Logo concept, social graphics, or a single flyer",
      medium: "Brand identity kit or a multi-page brochure",
      large: "Full brand system with guidelines and asset library",
    },
  },
  {
    id: "photography",
    label: "Photography",
    rateLow: 75,
    rateHigh: 200,
    scopes: {
      small: "Headshots or a short product session",
      medium: "Half-day event or a branded content shoot",
      large: "Full-day commercial shoot with edited deliverables",
    },
  },
  {
    id: "videography",
    label: "Videography",
    rateLow: 60,
    rateHigh: 150,
    scopes: {
      small: "Short social clip or a simple edit of existing footage",
      medium: "Promo video with a half-day shoot and editing",
      large: "Full campaign video with multi-day production and post",
    },
  },
  {
    id: "copywriting",
    label: "Copywriting",
    rateLow: 40,
    rateHigh: 100,
    scopes: {
      small: "A few product descriptions, emails, or one blog post",
      medium: "Website copy for several pages or an email sequence",
      large: "Ongoing content program or a full messaging overhaul",
    },
  },
  {
    id: "digital-marketing",
    label: "Digital marketing",
    rateLow: 45,
    rateHigh: 110,
    scopes: {
      small: "A single campaign setup or an ad account audit",
      medium: "Managed ads or SEO work across a month",
      large: "Full-funnel strategy with ongoing management",
    },
  },
];

const SCOPE_HOURS: Record<ScopeId, [number, number]> = {
  small: [8, 20],
  medium: [25, 60],
  large: [70, 160],
};

const SCOPE_LABELS: Record<ScopeId, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

const COMPLEXITY_MULTIPLIER = { standard: 1, complex: 1.4 } as const;
const RUSH_MULTIPLIER = { normal: 1, rush: 1.25 } as const;

function fmtMoney(n: number) {
  const rounded = Math.round(n / 25) * 25;
  return rounded.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string; hint?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className="rounded-md border px-3 py-2 text-left transition-colors"
            style={{
              borderColor: active ? "#7C4A1E" : "#E8C99A",
              backgroundColor: active ? "#7C4A1E" : "#fff",
            }}
          >
            <span
              className="block text-sm font-semibold"
              style={{ color: active ? "#F5EFE6" : "#2C2420" }}
            >
              {opt.label}
            </span>
            {opt.hint && (
              <span
                className="block text-xs mt-0.5 leading-snug"
                style={{ color: active ? "#E8C99A" : "#6B5E55" }}
              >
                {opt.hint}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function ProjectCostEstimatorClient() {
  const [serviceId, setServiceId] = useState<ServiceId>("web-development");
  const [scope, setScope] = useState<ScopeId>("medium");
  const [complexity, setComplexity] = useState<keyof typeof COMPLEXITY_MULTIPLIER>("standard");
  const [rush, setRush] = useState<keyof typeof RUSH_MULTIPLIER>("normal");
  const [copied, setCopied] = useState(false);

  const service = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0];

  const results = useMemo(() => {
    const [hoursLow, hoursHigh] = SCOPE_HOURS[scope];
    const cMult = COMPLEXITY_MULTIPLIER[complexity];
    const rMult = RUSH_MULTIPLIER[rush];
    const adjHoursLow = hoursLow * cMult;
    const adjHoursHigh = hoursHigh * cMult;
    const costLow = adjHoursLow * service.rateLow * rMult;
    const costHigh = adjHoursHigh * service.rateHigh * rMult;
    return {
      hoursLow: Math.round(adjHoursLow),
      hoursHigh: Math.round(adjHoursHigh),
      costLow,
      costHigh,
      rateLow: service.rateLow,
      rateHigh: service.rateHigh,
    };
  }, [service, scope, complexity, rush]);

  function copySummary() {
    const text = [
      `Project cost estimate (417 Freelancers):`,
      `Service: ${service.label}`,
      `Scope: ${SCOPE_LABELS[scope]} (${service.scopes[scope]})`,
      `Complexity: ${complexity === "complex" ? "Complex" : "Standard"}`,
      `Timeline: ${rush === "rush" ? "Rush" : "Normal"}`,
      `Estimated hours: ${results.hoursLow} to ${results.hoursHigh}`,
      `Estimated cost: ${fmtMoney(results.costLow)} to ${fmtMoney(results.costHigh)}`,
      `Note: This is a planning estimate. Ask local freelancers for a firm quote.`,
    ].join("\n");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div
      className="rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-5"
      style={{ border: "1px solid #E8C99A", backgroundColor: "#FEFCF9" }}
    >
      {/* Form */}
      <div className="lg:col-span-3 px-6 py-8 space-y-6">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#7C4A1E", borderBottom: "1px solid #E8C99A", paddingBottom: "8px" }}
          >
            What do you need?
          </p>
          <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
            Type of service
          </label>
          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value as ServiceId)}
            className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
            style={{ borderColor: "#E8C99A", backgroundColor: "#fff", color: "#2C2420" }}
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#7C4A1E", borderBottom: "1px solid #E8C99A", paddingBottom: "8px" }}
          >
            Project size
          </p>
          <Segmented
            options={(Object.keys(SCOPE_LABELS) as ScopeId[]).map((id) => ({
              id,
              label: SCOPE_LABELS[id],
            }))}
            value={scope}
            onChange={setScope}
          />
          <p className="mt-2 text-xs" style={{ color: "#6B5E55" }}>
            {service.scopes[scope]}
          </p>
        </div>

        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#7C4A1E", borderBottom: "1px solid #E8C99A", paddingBottom: "8px" }}
          >
            Complexity
          </p>
          <Segmented
            options={[
              { id: "standard", label: "Standard", hint: "Clear brief, common features" },
              { id: "complex", label: "Complex", hint: "Custom work, integrations, unknowns" },
            ]}
            value={complexity}
            onChange={setComplexity}
          />
        </div>

        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#7C4A1E", borderBottom: "1px solid #E8C99A", paddingBottom: "8px" }}
          >
            Timeline
          </p>
          <Segmented
            options={[
              { id: "normal", label: "Normal", hint: "Standard scheduling" },
              { id: "rush", label: "Rush", hint: "Tight deadline, priority work" },
            ]}
            value={rush}
            onChange={setRush}
          />
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2" style={{ backgroundColor: "#2C2420" }}>
        <div className="px-6 py-8 sticky top-0">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#E8C99A" }}>
            Estimated Cost
          </p>
          <div className="text-3xl font-bold mb-1" style={{ color: "#F5EFE6" }}>
            {fmtMoney(results.costLow)}
            <span className="text-base font-normal" style={{ color: "#C8B8A8" }}> to </span>
            {fmtMoney(results.costHigh)}
          </div>
          <p className="text-xs mb-6" style={{ color: "#C8B8A8" }}>
            Based on roughly {results.hoursLow} to {results.hoursHigh} hours of work at typical local
            freelance rates.
          </p>

          <div className="space-y-3 mb-6">
            {[
              { label: "Service", value: service.label },
              { label: "Estimated hours", value: `${results.hoursLow} to ${results.hoursHigh}` },
              {
                label: "Typical hourly range",
                value: `$${results.rateLow} to $${results.rateHigh}`,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 py-2"
                style={{ borderBottom: "1px solid #3d3330" }}
              >
                <span className="text-sm" style={{ color: "#C8B8A8" }}>{row.label}</span>
                <span className="text-sm font-semibold text-right" style={{ color: "#F5EFE6" }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={copySummary}
            className="flex items-center justify-center gap-2 w-full rounded-md py-2.5 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#C47A3A", color: "#fff" }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy estimate"}
          </button>

          <p className="mt-4 text-xs leading-relaxed" style={{ color: "#8a7d72" }}>
            This is a planning estimate, not a quote. Real pricing depends on your exact scope, the
            freelancer&apos;s experience, and how you structure the work. Use it to set a budget, then
            get firm quotes from local freelancers.
          </p>
        </div>
      </div>
    </div>
  );
}
