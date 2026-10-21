"use client";

import { useMemo, useState } from "react";
import { Plus, X, Trophy, Clock, DollarSign, ShieldCheck, CircleCheck, CircleAlert } from "lucide-react";

type Quote = {
  id: number;
  name: string;
  price: string;
  weeks: string;
  checks: Record<string, boolean>;
  notes: string;
};

const CRITERIA: { id: string; label: string; ask: string }[] = [
  { id: "scope", label: "Written scope of work", ask: "Can you put the full scope of work in writing?" },
  { id: "deliverables", label: "Deliverables listed by name", ask: "Exactly what files, pages, or items will I receive?" },
  { id: "revisions", label: "Number of revisions stated", ask: "How many rounds of revisions are included, and what do extra rounds cost?" },
  { id: "milestones", label: "Payment tied to milestones", ask: "Can payment be split into milestones instead of all upfront?" },
  { id: "ownership", label: "Ownership of final work is clear", ask: "Do I own the final work and source files once I have paid?" },
  { id: "support", label: "Follow-up support after delivery", ask: "What happens if something needs fixing after delivery, and for how long?" },
  { id: "relevant", label: "Relevant past work shown", ask: "Can you share examples of similar projects you have completed?" },
  { id: "contact", label: "Clear communication plan", ask: "How often will we check in, and how quickly do you usually reply?" },
];

const MAX_QUOTES = 4;

const GRID_COLS: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

function emptyQuote(id: number): Quote {
  return {
    id,
    name: "",
    price: "",
    weeks: "",
    checks: Object.fromEntries(CRITERIA.map((c) => [c.id, false])),
    notes: "",
  };
}

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function QuoteComparisonClient() {
  const [quotes, setQuotes] = useState<Quote[]>([emptyQuote(1), emptyQuote(2)]);
  const [nextId, setNextId] = useState(3);

  function update(id: number, patch: Partial<Quote>) {
    setQuotes((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)));
  }

  function toggle(id: number, criterion: string) {
    setQuotes((qs) =>
      qs.map((q) => (q.id === id ? { ...q, checks: { ...q.checks, [criterion]: !q.checks[criterion] } } : q)),
    );
  }

  function addQuote() {
    if (quotes.length >= MAX_QUOTES) return;
    setQuotes((qs) => [...qs, emptyQuote(nextId)]);
    setNextId((n) => n + 1);
  }

  function removeQuote(id: number) {
    setQuotes((qs) => (qs.length > 2 ? qs.filter((q) => q.id !== id) : qs));
  }

  const summary = useMemo(() => {
    const rows = quotes.map((q, i) => {
      const price = parseFloat(q.price);
      const weeks = parseFloat(q.weeks);
      const covered = CRITERIA.filter((c) => q.checks[c.id]).length;
      return {
        id: q.id,
        label: q.name.trim() || `Quote ${i + 1}`,
        price: Number.isFinite(price) && price > 0 ? price : null,
        weeks: Number.isFinite(weeks) && weeks > 0 ? weeks : null,
        covered,
        missing: CRITERIA.filter((c) => !q.checks[c.id]),
      };
    });
    const prices = rows.filter((r) => r.price !== null).map((r) => r.price as number);
    const weeksList = rows.filter((r) => r.weeks !== null).map((r) => r.weeks as number);
    const bestCovered = Math.max(...rows.map((r) => r.covered));
    return {
      rows,
      lowestPrice: prices.length >= 2 ? Math.min(...prices) : null,
      fastest: weeksList.length >= 2 ? Math.min(...weeksList) : null,
      bestCovered: bestCovered > 0 && rows.filter((r) => r.covered === bestCovered).length < rows.length ? bestCovered : null,
    };
  }, [quotes]);

  const inputClass = "w-full rounded border py-2 px-3 text-sm focus:outline-none focus:ring-1";
  const inputStyle = { borderColor: "#E8C99A", backgroundColor: "#fff", color: "#2C2420" };

  return (
    <div className="space-y-8">
      <div className={`grid grid-cols-1 gap-4 ${GRID_COLS[quotes.length] ?? "md:grid-cols-2"}`}>
        {quotes.map((q, i) => (
          <div key={q.id} className="rounded-lg border p-5" style={{ backgroundColor: "#fff", borderColor: "#E8C99A" }}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "#7C4A1E" }}>
                Quote {i + 1}
              </p>
              {quotes.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeQuote(q.id)}
                  aria-label={`Remove quote ${i + 1}`}
                  style={{ color: "#6B5E55" }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#2C2420" }}>
                  Freelancer or business name
                </label>
                <input
                  type="text"
                  value={q.name}
                  onChange={(e) => update(q.id, { name: e.target.value })}
                  placeholder={`Quote ${i + 1}`}
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#2C2420" }}>
                    Total price ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={q.price}
                    onChange={(e) => update(q.id, { price: e.target.value })}
                    placeholder="2500"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "#2C2420" }}>
                    Timeline (weeks)
                  </label>
                  <input
                    type="number"
                    min="0"
                    inputMode="decimal"
                    value={q.weeks}
                    onChange={(e) => update(q.id, { weeks: e.target.value })}
                    placeholder="4"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>
              <fieldset>
                <legend className="text-xs font-semibold mb-2" style={{ color: "#2C2420" }}>
                  What does this quote clearly include?
                </legend>
                <div className="space-y-2">
                  {CRITERIA.map((c) => (
                    <label key={c.id} className="flex items-start gap-2 text-sm cursor-pointer" style={{ color: "#6B5E55" }}>
                      <input
                        type="checkbox"
                        checked={q.checks[c.id]}
                        onChange={() => toggle(q.id, c.id)}
                        className="mt-0.5 shrink-0"
                        style={{ accentColor: "#7C4A1E" }}
                      />
                      <span className="leading-snug">{c.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: "#2C2420" }}>
                  Your notes (optional)
                </label>
                <textarea
                  rows={2}
                  value={q.notes}
                  onChange={(e) => update(q.id, { notes: e.target.value })}
                  placeholder="Gut feeling, how they communicated, anything else"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {quotes.length < MAX_QUOTES && (
        <button
          type="button"
          onClick={addQuote}
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold transition-colors hover:bg-white"
          style={{ borderColor: "#7C4A1E", color: "#7C4A1E", backgroundColor: "transparent" }}
        >
          <Plus size={16} />
          Add another quote
        </button>
      )}

      {/* Results */}
      <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: "#fff", borderColor: "#E8C99A" }}>
        <div className="px-5 py-4" style={{ backgroundColor: "#7C4A1E" }}>
          <h3 className="text-base font-bold" style={{ color: "#F5EFE6" }}>
            Side-by-side comparison
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: "#F5EFE6" }}>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "#2C2420" }}>Quote</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "#2C2420" }}>Price</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "#2C2420" }}>Timeline</th>
                <th className="text-left px-5 py-3 font-semibold" style={{ color: "#2C2420" }}>Clearly included</th>
              </tr>
            </thead>
            <tbody>
              {summary.rows.map((r) => (
                <tr key={r.id} className="border-t" style={{ borderColor: "#E8C99A" }}>
                  <td className="px-5 py-3 font-semibold" style={{ color: "#2C2420" }}>{r.label}</td>
                  <td className="px-5 py-3" style={{ color: "#6B5E55" }}>
                    <span className="inline-flex flex-wrap items-center gap-2">
                      {r.price !== null ? money(r.price) : "Not entered"}
                      {r.price !== null && r.price === summary.lowestPrice && (
                        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: "#E8C99A", color: "#7C4A1E" }}>
                          <DollarSign size={12} /> Lowest price
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-5 py-3" style={{ color: "#6B5E55" }}>
                    <span className="inline-flex flex-wrap items-center gap-2">
                      {r.weeks !== null ? `${r.weeks} ${r.weeks === 1 ? "week" : "weeks"}` : "Not entered"}
                      {r.weeks !== null && r.weeks === summary.fastest && (
                        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: "#E8C99A", color: "#7C4A1E" }}>
                          <Clock size={12} /> Fastest
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-5 py-3" style={{ color: "#6B5E55" }}>
                    <span className="inline-flex flex-wrap items-center gap-2">
                      {r.covered} of {CRITERIA.length}
                      {summary.bestCovered !== null && r.covered === summary.bestCovered && (
                        <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: "#E8C99A", color: "#7C4A1E" }}>
                          <ShieldCheck size={12} /> Most complete
                        </span>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-5 py-3 text-xs border-t" style={{ borderColor: "#E8C99A", color: "#6B5E55" }}>
          <Trophy size={12} className="inline mr-1 -mt-0.5" style={{ color: "#C47A3A" }} />
          The lowest price or the fastest timeline is not automatically the best choice. A quote that leaves out scope, revisions, or ownership can cost more later.
        </p>
      </div>

      {/* Questions to ask */}
      <div className="rounded-lg border p-5" style={{ backgroundColor: "#fff", borderColor: "#E8C99A" }}>
        <h3 className="text-base font-bold mb-1" style={{ color: "#2C2420" }}>
          Questions to ask before you decide
        </h3>
        <p className="text-sm mb-4" style={{ color: "#6B5E55" }}>
          Based on what each quote did not clearly include. Send these to the freelancer before you hire.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {summary.rows.map((r) => (
            <div key={r.id}>
              <p className="text-sm font-semibold mb-2" style={{ color: "#2C2420" }}>{r.label}</p>
              {r.missing.length === 0 ? (
                <p className="flex items-center gap-2 text-sm" style={{ color: "#6B5E55" }}>
                  <CircleCheck size={16} style={{ color: "#7C4A1E" }} />
                  Everything on the list is covered.
                </p>
              ) : (
                <ul className="space-y-2">
                  {r.missing.map((m) => (
                    <li key={m.id} className="flex items-start gap-2 text-sm leading-snug" style={{ color: "#6B5E55" }}>
                      <CircleAlert size={16} className="mt-0.5 shrink-0" style={{ color: "#C47A3A" }} />
                      {m.ask}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
