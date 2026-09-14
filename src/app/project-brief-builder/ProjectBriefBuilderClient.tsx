"use client";

import { useMemo, useState } from "react";
import { Copy, Check, Plus, X } from "lucide-react";

type ServiceId =
  | "web-development"
  | "graphic-design"
  | "photography"
  | "videography"
  | "copywriting"
  | "digital-marketing"
  | "other";

const SERVICE_OPTIONS: { id: ServiceId; label: string }[] = [
  { id: "web-development", label: "Web development" },
  { id: "graphic-design", label: "Graphic design" },
  { id: "photography", label: "Photography" },
  { id: "videography", label: "Videography" },
  { id: "copywriting", label: "Copywriting" },
  { id: "digital-marketing", label: "Digital marketing" },
  { id: "other", label: "Something else" },
];

const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under $500",
  "$500 to $1,500",
  "$1,500 to $5,000",
  "$5,000 to $15,000",
  "$15,000 or more",
];

const TIMELINE_OPTIONS = [
  "Flexible, no hard deadline",
  "Within a few weeks",
  "This month",
  "Within a week (rush)",
  "Tied to a specific date",
];

function ListEditor({
  label,
  placeholder,
  items,
  onChange,
}: {
  label: string;
  placeholder: string;
  items: string[];
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function add() {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft("");
  }

  return (
    <div>
      <p
        className="text-xs font-bold uppercase tracking-widest mb-4"
        style={{ color: "#7C4A1E", borderBottom: "1px solid #E8C99A", paddingBottom: "8px" }}
      >
        {label}
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          className="flex-1 rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
          style={{ borderColor: "#E8C99A", backgroundColor: "#fff", color: "#2C2420" }}
        />
        <button
          type="button"
          onClick={add}
          aria-label={`Add to ${label}`}
          className="flex items-center justify-center rounded-md px-3 shrink-0 transition-colors"
          style={{ backgroundColor: "#7C4A1E", color: "#F5EFE6" }}
        >
          <Plus size={16} />
        </button>
      </div>
      {items.length > 0 && (
        <ul className="mt-3 space-y-2">
          {items.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="flex items-center justify-between gap-3 rounded px-3 py-2 text-sm"
              style={{ backgroundColor: "#F5EFE6", color: "#2C2420" }}
            >
              <span className="leading-snug">{item}</span>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, idx) => idx !== i))}
                aria-label={`Remove ${item}`}
                className="shrink-0 transition-colors"
                style={{ color: "#6B5E55" }}
              >
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ProjectBriefBuilderClient() {
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [serviceId, setServiceId] = useState<ServiceId>("web-development");
  const [projectTitle, setProjectTitle] = useState("");
  const [about, setAbout] = useState("");
  const [goal, setGoal] = useState("");
  const [audience, setAudience] = useState("");
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [references, setReferences] = useState("");
  const [budget, setBudget] = useState(BUDGET_OPTIONS[0]);
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[0]);
  const [copied, setCopied] = useState(false);

  const serviceLabel = useMemo(
    () => SERVICE_OPTIONS.find((s) => s.id === serviceId)?.label ?? "Freelance work",
    [serviceId],
  );

  const brief = useMemo(() => {
    const lines: string[] = [];
    const title = projectTitle.trim() || `${serviceLabel} project`;
    lines.push(`PROJECT BRIEF: ${title}`);
    lines.push("");

    if (businessName.trim()) lines.push(`Business: ${businessName.trim()}`);
    lines.push(`Type of work: ${serviceLabel}`);
    lines.push(`Budget range: ${budget}`);
    lines.push(`Timeline: ${timeline}`);
    lines.push("");

    if (about.trim()) {
      lines.push("ABOUT US");
      lines.push(about.trim());
      lines.push("");
    }

    if (goal.trim()) {
      lines.push("PROJECT GOAL");
      lines.push(goal.trim());
      lines.push("");
    }

    if (audience.trim()) {
      lines.push("WHO IT IS FOR");
      lines.push(audience.trim());
      lines.push("");
    }

    if (deliverables.length > 0) {
      lines.push("WHAT WE NEED (DELIVERABLES)");
      deliverables.forEach((d) => lines.push(`- ${d}`));
      lines.push("");
    }

    if (requirements.length > 0) {
      lines.push("MUST-HAVE REQUIREMENTS");
      requirements.forEach((r) => lines.push(`- ${r}`));
      lines.push("");
    }

    if (references.trim()) {
      lines.push("STYLE AND EXAMPLES WE LIKE");
      lines.push(references.trim());
      lines.push("");
    }

    lines.push("HOW TO REACH US");
    if (contactName.trim()) lines.push(`Contact: ${contactName.trim()}`);
    lines.push(
      contactMethod.trim()
        ? `Best way to reach us: ${contactMethod.trim()}`
        : "Best way to reach us: (add your email or phone)",
    );

    return lines.join("\n");
  }, [
    projectTitle,
    serviceLabel,
    businessName,
    budget,
    timeline,
    about,
    goal,
    audience,
    deliverables,
    requirements,
    references,
    contactName,
    contactMethod,
  ]);

  function copyBrief() {
    navigator.clipboard?.writeText(brief).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const inputStyle = {
    borderColor: "#E8C99A",
    backgroundColor: "#fff",
    color: "#2C2420",
  };

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
            The basics
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
                Project title
              </label>
              <input
                type="text"
                value={projectTitle}
                placeholder="New company website"
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
                Business or organization name
              </label>
              <input
                type="text"
                value={businessName}
                placeholder="417 Coffee Roasters"
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
                Type of work
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value as ServiceId)}
                className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
                style={inputStyle}
              >
                {SERVICE_OPTIONS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
                  Budget range
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
                  style={inputStyle}
                >
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
                  Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
                  style={inputStyle}
                >
                  {TIMELINE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#7C4A1E", borderBottom: "1px solid #E8C99A", paddingBottom: "8px" }}
          >
            Tell them about the project
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
                A sentence or two about your business
              </label>
              <textarea
                value={about}
                rows={2}
                placeholder="We are a small coffee roaster in Springfield selling online and to local cafes."
                onChange={(e) => setAbout(e.target.value)}
                className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
                What are you trying to achieve?
              </label>
              <textarea
                value={goal}
                rows={2}
                placeholder="We want a modern site that lets people order beans online and find our wholesale info."
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
                Who is the audience?
              </label>
              <input
                type="text"
                value={audience}
                placeholder="Local coffee drinkers and cafe owners"
                onChange={(e) => setAudience(e.target.value)}
                className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
                style={inputStyle}
              />
            </div>
          </div>
        </div>

        <ListEditor
          label="What you need (deliverables)"
          placeholder="Home page, online store, contact form"
          items={deliverables}
          onChange={setDeliverables}
        />

        <ListEditor
          label="Must-have requirements"
          placeholder="Works on mobile, ties into our Instagram"
          items={requirements}
          onChange={setRequirements}
        />

        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-4"
            style={{ color: "#7C4A1E", borderBottom: "1px solid #E8C99A", paddingBottom: "8px" }}
          >
            Style and contact
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
                Examples or styles you like
              </label>
              <textarea
                value={references}
                rows={2}
                placeholder="Clean and warm, similar to a competitor site you admire. Links welcome."
                onChange={(e) => setReferences(e.target.value)}
                className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
                style={inputStyle}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
                  Your name
                </label>
                <input
                  type="text"
                  value={contactName}
                  placeholder="Jordan Miller"
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
                  style={inputStyle}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
                  Best way to reach you
                </label>
                <input
                  type="text"
                  value={contactMethod}
                  placeholder="jordan@example.com"
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="lg:col-span-2" style={{ backgroundColor: "#2C2420" }}>
        <div className="px-6 py-8">
          <div className="flex items-center justify-between gap-3 mb-4">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#E8C99A" }}>
              Your brief
            </p>
            <button
              onClick={copyBrief}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition-colors"
              style={{ backgroundColor: "#C47A3A", color: "#fff" }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy brief"}
            </button>
          </div>
          <pre
            className="whitespace-pre-wrap break-words text-sm leading-relaxed rounded-lg p-4 max-h-[520px] overflow-auto"
            style={{ backgroundColor: "#3d3330", color: "#F5EFE6", fontFamily: "inherit" }}
          >
            {brief}
          </pre>
          <p className="mt-4 text-xs leading-relaxed" style={{ color: "#8a7d72" }}>
            Everything stays in your browser. Nothing is saved or sent. Copy the brief and paste it
            into an email or message to the freelancers you want to reach.
          </p>
        </div>
      </div>
    </div>
  );
}
