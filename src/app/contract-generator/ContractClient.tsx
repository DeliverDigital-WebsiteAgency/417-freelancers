"use client";

import { useState, useRef } from "react";
import { Download, Loader2, ChevronLeft, ShieldAlert } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ContractState = {
  freelancerName: string;
  freelancerBusiness: string;
  freelancerAddress: string;
  freelancerEmail: string;
  freelancerPhone: string;
  clientName: string;
  clientBusiness: string;
  clientAddress: string;
  clientEmail: string;
  projectTitle: string;
  projectDescription: string;
  deliverables: string;
  startDate: string;
  completionDate: string;
  totalFee: number;
  depositPercent: number;
  paymentMethod: string;
  lateFeePercent: number;
  revisionRounds: number;
  ipTransfer: "final_payment" | "signing";
  confidentiality: boolean;
  terminationDays: number;
  governingState: string;
  additionalTerms: string;
};

function today() {
  return new Date().toISOString().split("T")[0];
}
function daysFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
function formatDate(iso: string) {
  if (!iso) return "[date]";
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m,10)-1]} ${d}, ${y}`;
}
function fmt(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const DEFAULT_STATE: ContractState = {
  freelancerName: "",
  freelancerBusiness: "",
  freelancerAddress: "",
  freelancerEmail: "",
  freelancerPhone: "",
  clientName: "",
  clientBusiness: "",
  clientAddress: "",
  clientEmail: "",
  projectTitle: "",
  projectDescription: "",
  deliverables: "",
  startDate: today(),
  completionDate: daysFromNow(30),
  totalFee: 0,
  depositPercent: 50,
  paymentMethod: "Check, Venmo, or bank transfer",
  lateFeePercent: 1.5,
  revisionRounds: 2,
  ipTransfer: "final_payment",
  confidentiality: true,
  terminationDays: 14,
  governingState: "Missouri",
  additionalTerms: "",
};

const STORAGE_KEY = "frl_contract_freelancer";

// ─── Shared field components ──────────────────────────────────────────────────

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
const inputBase = "w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-1";
const inputStyle: React.CSSProperties = { borderColor: "#E8C99A", backgroundColor: "#fff", color: "#2C2420" };

function Input({
  value, onChange, placeholder = "", type = "text", className = "",
}: {
  value: string | number; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string;
}) {
  return (
    <input
      type={type}
      className={`${inputBase} ${className}`}
      style={inputStyle}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
function Textarea({
  value, onChange, placeholder = "", rows = 3,
}: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
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

export function ContractClient() {
  const [state, setState] = useState<ContractState>(() => {
    if (typeof window === "undefined") return DEFAULT_STATE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : DEFAULT_STATE;
    } catch {
      return DEFAULT_STATE;
    }
  });
  const [step, setStep] = useState<"form" | "preview">("form");
  const [exporting, setExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  function set<K extends keyof ContractState>(key: K, value: ContractState[K]) {
    setState((prev) => {
      const next = { ...prev, [key]: value };
      const freelancerKeys: (keyof ContractState)[] = [
        "freelancerName", "freelancerBusiness", "freelancerAddress", "freelancerEmail", "freelancerPhone",
      ];
      if (freelancerKeys.includes(key)) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            freelancerName: next.freelancerName,
            freelancerBusiness: next.freelancerBusiness,
            freelancerAddress: next.freelancerAddress,
            freelancerEmail: next.freelancerEmail,
            freelancerPhone: next.freelancerPhone,
          }));
        } catch {}
      }
      return next;
    });
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
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgHeight = (canvas.height * pageWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`contract-${(state.projectTitle || "agreement").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`);
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setExporting(false);
    }
  }

  const depositAmount = state.totalFee * (state.depositPercent / 100);
  const balanceAmount = state.totalFee - depositAmount;
  const deliverableLines = state.deliverables.split("\n").map((l) => l.trim()).filter(Boolean);

  // ─── Contract document ────────────────────────────────────────────────────

  const contractDocument = (
    <div
      ref={previewRef}
      style={{
        backgroundColor: "#ffffff",
        padding: "48px 52px",
        fontFamily: "Georgia, serif",
        color: "#1a1a1a",
        lineHeight: "1.6",
        fontSize: "13px",
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          marginBottom: "28px",
          borderRadius: "4px",
          backgroundColor: "#fdf3e7",
          border: "1px solid #C47A3A55",
          fontSize: "10.5px",
          color: "#7C4A1E",
        }}
      >
        This is a general-purpose template provided for convenience and does not constitute legal advice.
        Review with a licensed attorney before use, especially for high-value or complex projects.
      </div>

      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <div style={{ fontSize: "22px", fontWeight: "bold", color: "#7C4A1E" }}>Freelance Services Agreement</div>
        {state.projectTitle && (
          <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>{state.projectTitle}</div>
        )}
      </div>

      <p style={{ marginBottom: "20px" }}>
        This Freelance Services Agreement (&quot;Agreement&quot;) is entered into as of{" "}
        <strong>{formatDate(state.startDate)}</strong>, between{" "}
        <strong>{state.freelancerBusiness || state.freelancerName || "[Freelancer Name]"}</strong> (&quot;Freelancer&quot;)
        and <strong>{state.clientBusiness || state.clientName || "[Client Name]"}</strong> (&quot;Client&quot;),
        collectively the &quot;Parties.&quot;
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "24px" }}>
        <div>
          <div style={{ fontSize: "9px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1.2px", color: "#C47A3A", marginBottom: "6px" }}>
            Freelancer
          </div>
          <div>{state.freelancerName || "[Freelancer Name]"}</div>
          {state.freelancerBusiness && <div>{state.freelancerBusiness}</div>}
          {state.freelancerAddress && <div style={{ whiteSpace: "pre-line", color: "#555" }}>{state.freelancerAddress}</div>}
          {state.freelancerEmail && <div style={{ color: "#555" }}>{state.freelancerEmail}</div>}
          {state.freelancerPhone && <div style={{ color: "#555" }}>{state.freelancerPhone}</div>}
        </div>
        <div>
          <div style={{ fontSize: "9px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1.2px", color: "#C47A3A", marginBottom: "6px" }}>
            Client
          </div>
          <div>{state.clientName || "[Client Name]"}</div>
          {state.clientBusiness && <div>{state.clientBusiness}</div>}
          {state.clientAddress && <div style={{ whiteSpace: "pre-line", color: "#555" }}>{state.clientAddress}</div>}
          {state.clientEmail && <div style={{ color: "#555" }}>{state.clientEmail}</div>}
        </div>
      </div>

      <ContractSection number={1} title="Scope of Work">
        <p>{state.projectDescription || "[Describe the project and the work to be performed.]"}</p>
        {deliverableLines.length > 0 && (
          <>
            <p style={{ marginTop: "8px", marginBottom: "4px", fontWeight: "bold" }}>Deliverables:</p>
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              {deliverableLines.map((line, i) => <li key={i}>{line}</li>)}
            </ul>
          </>
        )}
      </ContractSection>

      <ContractSection number={2} title="Timeline">
        <p>
          Work will begin on <strong>{formatDate(state.startDate)}</strong> and is expected to be completed
          by <strong>{formatDate(state.completionDate)}</strong>. Timelines may shift by mutual written
          agreement if scope changes or delays outside either Party&apos;s reasonable control occur.
        </p>
      </ContractSection>

      <ContractSection number={3} title="Payment Terms">
        <p>
          The total fee for the Scope of Work described above is <strong>${fmt(state.totalFee)}</strong>.
          {state.depositPercent > 0 && (
            <> A deposit of <strong>{state.depositPercent}% (${fmt(depositAmount)})</strong> is due before
            work begins, with the remaining <strong>${fmt(balanceAmount)}</strong> due upon completion.</>
          )}
        </p>
        <p style={{ marginTop: "8px" }}>
          Payment will be made via {state.paymentMethod || "a method agreed upon by both Parties"}.
          {state.lateFeePercent > 0 && (
            <> Invoices not paid within the stated terms are subject to a late fee of{" "}
            <strong>{state.lateFeePercent}% per month</strong> on the outstanding balance.</>
          )}
        </p>
      </ContractSection>

      <ContractSection number={4} title="Revisions">
        <p>
          This Agreement includes <strong>{state.revisionRounds} round{state.revisionRounds === 1 ? "" : "s"} of
          revisions</strong> on the deliverables above. Additional revision requests beyond this scope may be
          billed separately at Freelancer&apos;s standard rate, to be agreed upon before additional work begins.
        </p>
      </ContractSection>

      <ContractSection number={5} title="Ownership and Intellectual Property">
        <p>
          {state.ipTransfer === "final_payment"
            ? "Ownership of the final deliverables transfers to Client upon receipt of payment in full. Until final payment is made, all work product remains the property of Freelancer."
            : "Ownership of the final deliverables transfers to Client upon execution of this Agreement, subject to payment terms above."}
          {" "}Freelancer retains the right to display the work in their portfolio unless otherwise agreed in writing.
        </p>
      </ContractSection>

      {state.confidentiality && (
        <ContractSection number={6} title="Confidentiality">
          <p>
            Both Parties agree to keep confidential any non-public business, technical, or financial
            information shared during this engagement, and not to disclose it to third parties without
            written consent, except as required by law.
          </p>
        </ContractSection>
      )}

      <ContractSection number={state.confidentiality ? 7 : 6} title="Independent Contractor Status">
        <p>
          Freelancer is an independent contractor, not an employee, partner, or agent of Client. Freelancer
          is responsible for their own taxes, insurance, and benefits, and retains control over how the work
          is performed.
        </p>
      </ContractSection>

      <ContractSection number={state.confidentiality ? 8 : 7} title="Termination">
        <p>
          Either Party may terminate this Agreement with <strong>{state.terminationDays} days</strong> written
          notice. Client agrees to pay for all work completed up to the termination date. Any deposit paid is
          non-refundable for work already performed.
        </p>
      </ContractSection>

      <ContractSection number={state.confidentiality ? 9 : 8} title="Governing Law">
        <p>
          This Agreement is governed by the laws of the State of <strong>{state.governingState || "Missouri"}</strong>,
          without regard to conflict of law principles.
        </p>
      </ContractSection>

      {state.additionalTerms && (
        <ContractSection number={state.confidentiality ? 10 : 9} title="Additional Terms">
          <p style={{ whiteSpace: "pre-line" }}>{state.additionalTerms}</p>
        </ContractSection>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginTop: "40px", paddingTop: "24px", borderTop: "2px solid #7C4A1E" }}>
        <div>
          <div style={{ borderBottom: "1px solid #999", height: "36px" }} />
          <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            {state.freelancerName || "Freelancer"} &mdash; Signature &amp; Date
          </div>
        </div>
        <div>
          <div style={{ borderBottom: "1px solid #999", height: "36px" }} />
          <div style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            {state.clientName || "Client"} &mdash; Signature &amp; Date
          </div>
        </div>
      </div>
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
            <ChevronLeft size={15} /> Edit Contract
          </button>
          <button
            onClick={exportPDF}
            disabled={exporting}
            className="flex items-center gap-2 rounded px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-60"
            style={{ backgroundColor: "#C47A3A", color: "#fff" }}
          >
            {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {exporting ? "Exporting..." : "Download PDF"}
          </button>
        </div>
        <div style={{ backgroundColor: "#e5e0d8", padding: "32px", borderRadius: "12px" }}>
          <div className="shadow-xl rounded" style={{ maxWidth: "680px", margin: "0 auto" }}>
            {contractDocument}
          </div>
        </div>
      </div>
    );
  }

  // ─── Render: Form step ─────────────────────────────────────────────────────

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #E8C99A", backgroundColor: "#FEFCF9" }}>
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">

        <div
          className="flex items-start gap-3 rounded-lg px-4 py-3"
          style={{ backgroundColor: "#fdf3e7", border: "1px solid #C47A3A55" }}
        >
          <ShieldAlert size={16} className="mt-0.5 shrink-0" style={{ color: "#C47A3A" }} />
          <p className="text-xs leading-relaxed" style={{ color: "#7C4A1E" }}>
            This tool generates a general-purpose template, not legal advice. Review the final document with
            a licensed attorney before sending it to a client, especially for larger or more complex projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SectionLabel>Freelancer (You)</SectionLabel>
            <div className="space-y-3">
              <div><Label>Your name</Label><Input value={state.freelancerName} onChange={(v) => set("freelancerName", v)} placeholder="Jane Smith" /></div>
              <div><Label>Business name (optional)</Label><Input value={state.freelancerBusiness} onChange={(v) => set("freelancerBusiness", v)} placeholder="Jane Smith Design" /></div>
              <div><Label>Address</Label><Textarea value={state.freelancerAddress} onChange={(v) => set("freelancerAddress", v)} rows={2} placeholder={"123 Main St\nSpringfield, MO 65801"} /></div>
              <div><Label>Email</Label><Input value={state.freelancerEmail} onChange={(v) => set("freelancerEmail", v)} type="email" placeholder="jane@janesmith.com" /></div>
              <div><Label>Phone</Label><Input value={state.freelancerPhone} onChange={(v) => set("freelancerPhone", v)} placeholder="(417) 555-0100" /></div>
            </div>
          </div>
          <div>
            <SectionLabel>Client</SectionLabel>
            <div className="space-y-3">
              <div><Label>Client name</Label><Input value={state.clientName} onChange={(v) => set("clientName", v)} placeholder="John Doe" /></div>
              <div><Label>Client business (optional)</Label><Input value={state.clientBusiness} onChange={(v) => set("clientBusiness", v)} placeholder="Acme Co." /></div>
              <div><Label>Address</Label><Textarea value={state.clientAddress} onChange={(v) => set("clientAddress", v)} rows={2} placeholder={"456 Oak Ave\nSpringfield, MO 65802"} /></div>
              <div><Label>Email</Label><Input value={state.clientEmail} onChange={(v) => set("clientEmail", v)} type="email" placeholder="john@acme.com" /></div>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>Project</SectionLabel>
          <div className="space-y-3">
            <div><Label>Project title</Label><Input value={state.projectTitle} onChange={(v) => set("projectTitle", v)} placeholder="Website Redesign" /></div>
            <div><Label>Scope of work</Label><Textarea value={state.projectDescription} onChange={(v) => set("projectDescription", v)} rows={3} placeholder="Describe the work you'll be doing..." /></div>
            <div>
              <Label>Deliverables (one per line)</Label>
              <Textarea value={state.deliverables} onChange={(v) => set("deliverables", v)} rows={3} placeholder={"5-page responsive website\nContact form integration\nBasic on-page SEO setup"} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Start date</Label><Input value={state.startDate} onChange={(v) => set("startDate", v)} type="date" /></div>
              <div><Label>Completion date</Label><Input value={state.completionDate} onChange={(v) => set("completionDate", v)} type="date" /></div>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>Payment</SectionLabel>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Total fee ($)</Label><Input value={state.totalFee} onChange={(v) => set("totalFee", parseFloat(v) || 0)} type="number" /></div>
              <div><Label>Deposit (%)</Label><Input value={state.depositPercent} onChange={(v) => set("depositPercent", parseFloat(v) || 0)} type="number" /></div>
            </div>
            <div><Label>Payment method</Label><Input value={state.paymentMethod} onChange={(v) => set("paymentMethod", v)} placeholder="Check, Venmo, or bank transfer" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Late fee (% per month)</Label><Input value={state.lateFeePercent} onChange={(v) => set("lateFeePercent", parseFloat(v) || 0)} type="number" /></div>
              <div><Label>Revision rounds included</Label><Input value={state.revisionRounds} onChange={(v) => set("revisionRounds", parseInt(v) || 0)} type="number" /></div>
            </div>
          </div>
        </div>

        <div>
          <SectionLabel>Terms</SectionLabel>
          <div className="space-y-3">
            <div>
              <Label>Ownership transfers</Label>
              <select
                value={state.ipTransfer}
                onChange={(e) => set("ipTransfer", e.target.value as ContractState["ipTransfer"])}
                className={`${inputBase}`}
                style={inputStyle}
              >
                <option value="final_payment">Upon final payment</option>
                <option value="signing">Upon signing</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Termination notice (days)</Label><Input value={state.terminationDays} onChange={(v) => set("terminationDays", parseInt(v) || 0)} type="number" /></div>
              <div><Label>Governing state</Label><Input value={state.governingState} onChange={(v) => set("governingState", v)} placeholder="Missouri" /></div>
            </div>
            <label className="flex items-center gap-2 text-sm" style={{ color: "#2C2420" }}>
              <input
                type="checkbox"
                checked={state.confidentiality}
                onChange={(e) => set("confidentiality", e.target.checked)}
              />
              Include a confidentiality clause
            </label>
            <div><Label>Additional terms (optional)</Label><Textarea value={state.additionalTerms} onChange={(v) => set("additionalTerms", v)} rows={2} placeholder="Any other terms specific to this project..." /></div>
          </div>
        </div>

        <div className="pt-2 pb-4">
          <button
            onClick={() => {
              setStep("preview");
              fetch("/api/contract-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  freelancerBusiness: state.freelancerBusiness || state.freelancerName,
                  freelancerEmail: state.freelancerEmail,
                  freelancerPhone: state.freelancerPhone,
                  clientName: state.clientName,
                  projectTitle: state.projectTitle,
                }),
              }).catch(() => {});
            }}
            className="w-full rounded-md py-3 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#7C4A1E", color: "#F5EFE6" }}
          >
            Generate Contract
          </button>
        </div>
      </div>
    </div>
  );
}

function ContractSection({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ fontSize: "13px", fontWeight: "bold", color: "#7C4A1E", marginBottom: "4px" }}>
        {number}. {title}
      </div>
      {children}
    </div>
  );
}
