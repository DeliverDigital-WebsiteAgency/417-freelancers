"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Plus, Trash2, Upload, X, Download, Loader2, ChevronLeft } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type LineItem = {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
};

type FontOption = {
  label: string;
  value: string;
  google?: string;
};

const FONT_OPTIONS: FontOption[] = [
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Inter", value: "Inter, sans-serif", google: "Inter:wght@400;600;700" },
  { label: "Lato", value: "Lato, sans-serif", google: "Lato:wght@400;700" },
  { label: "Merriweather", value: "Merriweather, serif", google: "Merriweather:wght@400;700" },
  { label: "Playfair Display", value: "'Playfair Display', serif", google: "Playfair+Display:wght@400;600;700" },
  { label: "Roboto", value: "Roboto, sans-serif", google: "Roboto:wght@400;700" },
];

const GOOGLE_FONTS_URL =
  "https://fonts.googleapis.com/css2?family=" +
  FONT_OPTIONS.filter((f) => f.google)
    .map((f) => f.google)
    .join("&family=") +
  "&display=swap";

type InvoiceState = {
  logo: string | null;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  businessWebsite: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  lineItems: LineItem[];
  taxRate: number;
  notes: string;
  paymentLink: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function today() {
  return new Date().toISOString().split("T")[0];
}
function daysFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m,10)-1]} ${d}, ${y}`;
}
function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const DEFAULT_STATE: InvoiceState = {
  logo: null,
  primaryColor: "#7C4A1E",
  accentColor: "#C47A3A",
  fontFamily: "Georgia, serif",
  businessName: "",
  businessAddress: "",
  businessEmail: "",
  businessPhone: "",
  businessWebsite: "",
  clientName: "",
  clientAddress: "",
  clientEmail: "",
  invoiceNumber: "INV-001",
  issueDate: today(),
  dueDate: daysFromNow(30),
  lineItems: [{ id: uid(), description: "", qty: 1, unitPrice: 0 }],
  taxRate: 0,
  notes: "",
  paymentLink: "",
};

const BRANDING_KEY = "frl_invoice_branding";
const BUSINESS_KEY = "frl_invoice_business";

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-bold uppercase tracking-widest mb-4"
      style={{ color: "#7C4A1E", borderBottom: "1px solid #E8C99A", paddingBottom: "8px" }}
    >
      {children}
    </p>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
      {children}
    </label>
  );
}

const inputBase =
  "w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1";
const inputStyle: React.CSSProperties = {
  borderColor: "#E8C99A",
  backgroundColor: "#fff",
  color: "#2C2420",
};

function Input({
  value,
  onChange,
  placeholder = "",
  type = "text",
  className = "",
  style = {},
}: {
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <input
      type={type}
      className={`${inputBase} ${className}`}
      style={{ ...inputStyle, ...style }}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder = "",
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      className={inputBase}
      style={inputStyle}
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function InvoiceClient() {
  const [state, setState] = useState<InvoiceState>(DEFAULT_STATE);
  const [step, setStep] = useState<"form" | "preview">("form");
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = GOOGLE_FONTS_URL;
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    try {
      const branding = localStorage.getItem(BRANDING_KEY);
      const business = localStorage.getItem(BUSINESS_KEY);
      setState((prev) => ({
        ...prev,
        ...(branding ? JSON.parse(branding) : {}),
        ...(business ? JSON.parse(business) : {}),
      }));
    } catch {}
  }, []);

  const persistBranding = useCallback((s: InvoiceState) => {
    try {
      localStorage.setItem(
        BRANDING_KEY,
        JSON.stringify({ logo: s.logo, primaryColor: s.primaryColor, accentColor: s.accentColor, fontFamily: s.fontFamily })
      );
    } catch {}
  }, []);

  const persistBusiness = useCallback((s: InvoiceState) => {
    try {
      localStorage.setItem(
        BUSINESS_KEY,
        JSON.stringify({
          businessName: s.businessName,
          businessAddress: s.businessAddress,
          businessEmail: s.businessEmail,
          businessPhone: s.businessPhone,
          businessWebsite: s.businessWebsite,
        })
      );
    } catch {}
  }, []);

  function set<K extends keyof InvoiceState>(key: K, value: InvoiceState[K]) {
    setState((prev) => {
      const next = { ...prev, [key]: value };
      const brandingKeys: (keyof InvoiceState)[] = ["logo", "primaryColor", "accentColor", "fontFamily"];
      const businessKeys: (keyof InvoiceState)[] = [
        "businessName","businessAddress","businessEmail","businessPhone","businessWebsite",
      ];
      if (brandingKeys.includes(key)) persistBranding(next);
      if (businessKeys.includes(key)) persistBusiness(next);
      return next;
    });
  }

  function setLineItem(id: string, field: keyof Omit<LineItem, "id">, raw: string) {
    setState((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((item) =>
        item.id === id
          ? { ...item, [field]: field === "description" ? raw : parseFloat(raw) || 0 }
          : item
      ),
    }));
  }

  function addLineItem() {
    setState((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, { id: uid(), description: "", qty: 1, unitPrice: 0 }],
    }));
  }

  function removeLineItem(id: string) {
    setState((prev) => ({
      ...prev,
      lineItems: prev.lineItems.length > 1 ? prev.lineItems.filter((i) => i.id !== id) : prev.lineItems,
    }));
  }

  function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set("logo", ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  async function exportPDF() {
    if (!previewRef.current) return;
    setExporting(true);
    await new Promise((r) => setTimeout(r, 150));
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const w = pdf.internal.pageSize.getWidth();
      const h = (canvas.height * w) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, w, h);
      pdf.save(`invoice-${state.invoiceNumber || "draft"}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setExporting(false);
    }
  }

  // Computed totals
  const subtotal = state.lineItems.reduce((s, i) => s + i.qty * i.unitPrice, 0);
  const taxAmount = subtotal * (state.taxRate / 100);
  const total = subtotal + taxAmount;

  // ─── Invoice Preview Document ──────────────────────────────────────────────

  const invoiceDocument = (
    <div
      ref={previewRef}
      style={{
        backgroundColor: "#ffffff",
        padding: "48px 52px",
        fontFamily: state.fontFamily,
        color: "#1a1a1a",
        minHeight: "800px",
        lineHeight: "1.5",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px" }}>
        <div>
          {state.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={state.logo} alt="Logo" style={{ maxHeight: "60px", maxWidth: "180px", objectFit: "contain" }} />
          ) : state.businessName ? (
            <div style={{ fontSize: "20px", fontWeight: "bold", color: state.primaryColor }}>
              {state.businessName}
            </div>
          ) : null}
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "30px", fontWeight: "bold", letterSpacing: "-0.5px", color: state.primaryColor }}>
            INVOICE
          </div>
          <div style={{ fontSize: "13px", color: "#777", marginTop: "2px" }}>
            {state.invoiceNumber || "INV-001"}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "28px" }}>
        <div>
          <div style={{ fontSize: "9px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1.5px", color: state.accentColor, marginBottom: "8px" }}>
            From
          </div>
          {state.businessName && <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "3px" }}>{state.businessName}</div>}
          {state.businessAddress && (
            <div style={{ fontSize: "12px", color: "#555", whiteSpace: "pre-line", marginBottom: "3px" }}>{state.businessAddress}</div>
          )}
          {state.businessEmail && <div style={{ fontSize: "12px", color: "#555" }}>{state.businessEmail}</div>}
          {state.businessPhone && <div style={{ fontSize: "12px", color: "#555" }}>{state.businessPhone}</div>}
          {state.businessWebsite && <div style={{ fontSize: "12px", color: "#555" }}>{state.businessWebsite}</div>}
        </div>
        <div>
          <div style={{ fontSize: "9px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1.5px", color: state.accentColor, marginBottom: "8px" }}>
            Bill To
          </div>
          {state.clientName && <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "3px" }}>{state.clientName}</div>}
          {state.clientAddress && (
            <div style={{ fontSize: "12px", color: "#555", whiteSpace: "pre-line", marginBottom: "3px" }}>{state.clientAddress}</div>
          )}
          {state.clientEmail && <div style={{ fontSize: "12px", color: "#555" }}>{state.clientEmail}</div>}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "40px",
          marginBottom: "32px",
          paddingBottom: "20px",
          borderBottom: `2px solid ${state.primaryColor}`,
        }}
      >
        {[
          { label: "Issue Date", value: formatDate(state.issueDate) },
          { label: "Due Date", value: formatDate(state.dueDate), bold: true },
          { label: "Invoice #", value: state.invoiceNumber || "INV-001" },
        ].map(({ label, value, bold }) => (
          <div key={label}>
            <div style={{ fontSize: "9px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#999", marginBottom: "3px" }}>
              {label}
            </div>
            <div style={{ fontSize: "13px", fontWeight: bold ? "bold" : "normal" }}>{value}</div>
          </div>
        ))}
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
        <thead>
          <tr style={{ backgroundColor: state.accentColor }}>
            {["Description", "Qty", "Rate", "Amount"].map((col, i) => (
              <th
                key={col}
                style={{
                  padding: "9px 12px",
                  fontSize: "10px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  color: "#fff",
                  textAlign: i === 0 ? "left" : "right",
                  width: i === 0 ? "auto" : i === 1 ? "60px" : "90px",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {state.lineItems.map((item, idx) => {
            const amount = item.qty * item.unitPrice;
            return (
              <tr key={item.id} style={{ backgroundColor: idx % 2 === 0 ? "#f9f9f9" : "#ffffff" }}>
                <td style={{ padding: "10px 12px", fontSize: "13px", borderBottom: `1px solid ${state.primaryColor}15` }}>
                  {item.description || ""}
                </td>
                <td style={{ padding: "10px 12px", fontSize: "13px", textAlign: "right", borderBottom: `1px solid ${state.primaryColor}15` }}>{item.qty}</td>
                <td style={{ padding: "10px 12px", fontSize: "13px", textAlign: "right", borderBottom: `1px solid ${state.primaryColor}15` }}>${fmt(item.unitPrice)}</td>
                <td style={{ padding: "10px 12px", fontSize: "13px", textAlign: "right", fontWeight: "500", borderBottom: `1px solid ${state.primaryColor}15` }}>${fmt(amount)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "32px" }}>
        <div style={{ width: "220px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: "13px", borderBottom: `1px solid ${state.primaryColor}20` }}>
            <span style={{ color: "#666" }}>Subtotal</span>
            <span>${fmt(subtotal)}</span>
          </div>
          {state.taxRate > 0 && (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", fontSize: "13px", borderBottom: `1px solid ${state.primaryColor}20` }}>
              <span style={{ color: "#666" }}>Tax ({state.taxRate}%)</span>
              <span>${fmt(taxAmount)}</span>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px", fontSize: "17px", fontWeight: "bold" }}>
            <span style={{ color: state.primaryColor }}>Total Due</span>
            <span style={{ color: state.primaryColor }}>${fmt(total)}</span>
          </div>
        </div>
      </div>

      {state.paymentLink && (
        <div
          style={{
            marginBottom: "24px",
            padding: "12px 16px",
            borderRadius: "6px",
            backgroundColor: `${state.accentColor}18`,
            border: `1px solid ${state.accentColor}55`,
          }}
        >
          <div style={{ fontSize: "9px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: state.accentColor, marginBottom: "4px" }}>
            Pay Online
          </div>
          <a href={state.paymentLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: "12px", color: state.accentColor, wordBreak: "break-all", textDecoration: "underline" }}>{state.paymentLink}</a>
        </div>
      )}

      {state.notes && (
        <div style={{ borderTop: `1px solid ${state.primaryColor}20`, paddingTop: "16px" }}>
          <div style={{ fontSize: "9px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#999", marginBottom: "6px" }}>
            Notes and Terms
          </div>
          <div style={{ fontSize: "12px", color: "#555", whiteSpace: "pre-line" }}>{state.notes}</div>
        </div>
      )}
    </div>
  );

  // ─── Render: Preview step ──────────────────────────────────────────────────

  if (step === "preview") {
    return (
      <div>
        <div
          className="flex items-center justify-between gap-4 px-5 py-3 rounded-xl mb-6"
          style={{ backgroundColor: "#2C2420" }}
        >
          <button
            onClick={() => setStep("form")}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: "#C8B8A8" }}
          >
            <ChevronLeft size={15} /> Edit Invoice
          </button>
          <button
            onClick={exportPDF}
            disabled={exporting}
            className="flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60"
            style={{ backgroundColor: "#C47A3A", color: "#fff" }}
            onMouseEnter={(e) => { if (!exporting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#B06E34"; }}
            onMouseLeave={(e) => { if (!exporting) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C47A3A"; }}
          >
            {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {exporting ? "Exporting..." : "Download PDF"}
          </button>
        </div>
        <div style={{ backgroundColor: "#e5e0d8", padding: "32px", borderRadius: "12px" }}>
          <div className="shadow-xl rounded" style={{ maxWidth: "680px", margin: "0 auto" }}>
            {invoiceDocument}
          </div>
        </div>
      </div>
    );
  }

  // ─── Render: Form step ─────────────────────────────────────────────────────

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid #E8C99A", backgroundColor: "#FEFCF9" }}
    >
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">

        {/* Branding */}
        <div>
          <SectionLabel>Branding</SectionLabel>
          <div className="space-y-4">
            <div>
              <Label>Logo</Label>
              {state.logo ? (
                <div className="flex items-center gap-3 mt-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={state.logo} alt="Logo" className="h-10 w-auto object-contain rounded" />
                  <button
                    onClick={() => set("logo", null)}
                    className="flex items-center gap-1 text-xs hover:underline"
                    style={{ color: "#C47A3A" }}
                  >
                    <X size={11} /> Remove
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="mt-1 flex items-center gap-2 rounded border px-3 py-2 text-sm transition-colors hover:bg-[#F5EFE6]"
                  style={{ borderColor: "#E8C99A", color: "#6B5E55" }}
                >
                  <Upload size={13} /> Upload logo
                </button>
              )}
              <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Primary color</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={state.primaryColor}
                    onChange={(e) => set("primaryColor", e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border"
                    style={{ borderColor: "#E8C99A" }}
                  />
                  <input
                    type="text"
                    value={state.primaryColor}
                    maxLength={7}
                    onChange={(e) => set("primaryColor", e.target.value)}
                    className="flex-1 rounded border px-2 py-1.5 text-xs font-mono"
                    style={inputStyle}
                  />
                </div>
              </div>
              <div>
                <Label>Accent color</Label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="color"
                    value={state.accentColor}
                    onChange={(e) => set("accentColor", e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer border"
                    style={{ borderColor: "#E8C99A" }}
                  />
                  <input
                    type="text"
                    value={state.accentColor}
                    maxLength={7}
                    onChange={(e) => set("accentColor", e.target.value)}
                    className="flex-1 rounded border px-2 py-1.5 text-xs font-mono"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>
            <div>
              <Label>Invoice font</Label>
              <select
                value={state.fontFamily}
                onChange={(e) => set("fontFamily", e.target.value)}
                className={`${inputBase} mt-1`}
                style={inputStyle}
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f.value} value={f.value} style={{ fontFamily: f.value }}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Your Business + Client side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SectionLabel>Your Business</SectionLabel>
            <div className="space-y-3">
              <div><Label>Business / Your name</Label><Input value={state.businessName} onChange={(v) => set("businessName", v)} placeholder="Jane Smith Design" /></div>
              <div><Label>Address</Label><Textarea value={state.businessAddress} onChange={(v) => set("businessAddress", v)} placeholder={"123 Main St\nSpringfield, MO 65801"} rows={2} /></div>
              <div><Label>Email</Label><Input value={state.businessEmail} onChange={(v) => set("businessEmail", v)} placeholder="jane@janesmith.com" type="email" /></div>
              <div><Label>Phone</Label><Input value={state.businessPhone} onChange={(v) => set("businessPhone", v)} placeholder="(417) 555-0100" /></div>
              <div><Label>Website</Label><Input value={state.businessWebsite} onChange={(v) => set("businessWebsite", v)} placeholder="janesmith.com" /></div>
            </div>
          </div>
          <div>
            <SectionLabel>Client</SectionLabel>
            <div className="space-y-3">
              <div><Label>Client name or business</Label><Input value={state.clientName} onChange={(v) => set("clientName", v)} placeholder="Acme Co." /></div>
              <div><Label>Address</Label><Textarea value={state.clientAddress} onChange={(v) => set("clientAddress", v)} placeholder={"456 Oak Ave\nSpringfield, MO 65802"} rows={2} /></div>
              <div><Label>Email</Label><Input value={state.clientEmail} onChange={(v) => set("clientEmail", v)} placeholder="billing@acme.com" type="email" /></div>
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div>
          <SectionLabel>Invoice Details</SectionLabel>
          <div className="grid grid-cols-3 gap-4">
            <div><Label>Invoice #</Label><Input value={state.invoiceNumber} onChange={(v) => set("invoiceNumber", v)} placeholder="INV-001" /></div>
            <div><Label>Issue date</Label><Input value={state.issueDate} onChange={(v) => set("issueDate", v)} type="date" /></div>
            <div><Label>Due date</Label><Input value={state.dueDate} onChange={(v) => set("dueDate", v)} type="date" /></div>
          </div>
        </div>

        {/* Line Items */}
        <div>
          <SectionLabel>Services / Line Items</SectionLabel>
          <div className="grid gap-2 mb-2 text-xs font-semibold uppercase tracking-wide" style={{ gridTemplateColumns: "1fr 64px 100px 28px", color: "#6B5E55" }}>
            <span>Description</span><span className="text-center">Qty</span><span className="text-right">Rate ($)</span><span />
          </div>
          <div className="space-y-2">
            {state.lineItems.map((item) => (
              <div key={item.id} className="grid gap-2 items-center" style={{ gridTemplateColumns: "1fr 64px 100px 28px" }}>
                <Input value={item.description} onChange={(v) => setLineItem(item.id, "description", v)} placeholder="Web design, copywriting..." />
                <Input value={item.qty} onChange={(v) => setLineItem(item.id, "qty", v)} type="number" className="text-center" style={{ ...inputStyle, padding: "8px 4px" }} />
                <Input value={item.unitPrice} onChange={(v) => setLineItem(item.id, "unitPrice", v)} type="number" className="text-right" style={{ ...inputStyle, padding: "8px 6px" }} />
                <button
                  onClick={() => removeLineItem(item.id)}
                  disabled={state.lineItems.length === 1}
                  className="flex items-center justify-center rounded p-1 disabled:opacity-25 hover:text-red-600 transition-colors"
                  style={{ color: "#6B5E55" }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addLineItem}
            className="mt-3 flex items-center gap-1.5 text-sm font-medium hover:underline"
            style={{ color: "#C47A3A" }}
          >
            <Plus size={14} /> Add line item
          </button>
          <div className="mt-4 w-40">
            <Label>Tax rate (%)</Label>
            <Input value={state.taxRate} onChange={(v) => setState((p) => ({ ...p, taxRate: parseFloat(v) || 0 }))} type="number" placeholder="0" />
          </div>
        </div>

        {/* Payment & Notes */}
        <div>
          <SectionLabel>Payment and Notes</SectionLabel>
          <div className="space-y-4">
            <div><Label>Payment link</Label><Input value={state.paymentLink} onChange={(v) => set("paymentLink", v)} placeholder="https://venmo.com/yourhandle" /></div>
            <div><Label>Notes / Terms</Label><Textarea value={state.notes} onChange={(v) => set("notes", v)} placeholder="Thank you for your business. Payment is due within 30 days of this invoice." rows={3} /></div>
          </div>
        </div>

        {/* Generate button */}
        <div className="pt-2 pb-4">
          <button
            onClick={() => {
              setStep("preview");
              fetch("/api/invoice-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  businessName: state.businessName,
                  businessEmail: state.businessEmail,
                  businessPhone: state.businessPhone,
                  businessWebsite: state.businessWebsite,
                  businessAddress: state.businessAddress,
                }),
              }).catch(() => {});
            }}
            className="w-full rounded-md py-3 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#7C4A1E", color: "#F5EFE6" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#70431B"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#7C4A1E"; }}
          >
            Generate Invoice
          </button>

        </div>

      </div>
    </div>
  );
}
