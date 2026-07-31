"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";

type CalcState = {
  desiredIncome: number;
  annualExpenses: number;
  taxBufferPercent: number;
  weeksOff: number;
  daysPerWeek: number;
  billableHoursPerDay: number;
  sampleProjectHours: number;
};

const DEFAULT_STATE: CalcState = {
  desiredIncome: 60000,
  annualExpenses: 6000,
  taxBufferPercent: 30,
  weeksOff: 4,
  daysPerWeek: 5,
  billableHoursPerDay: 5,
  sampleProjectHours: 20,
};

function fmtMoney(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}
function fmtMoney2(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-semibold mb-1" style={{ color: "#6B5E55" }}>
      {children}
    </label>
  );
}

function NumberField({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix,
  suffix,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#6B5E55" }}>
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full rounded border py-2 text-sm focus:outline-none focus:ring-1"
        style={{
          borderColor: "#E8C99A",
          backgroundColor: "#fff",
          color: "#2C2420",
          paddingLeft: prefix ? "26px" : "12px",
          paddingRight: suffix ? "32px" : "12px",
        }}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: "#6B5E55" }}>
          {suffix}
        </span>
      )}
    </div>
  );
}

export function RateCalculatorClient() {
  const [state, setState] = useState<CalcState>(DEFAULT_STATE);
  const [copied, setCopied] = useState(false);

  function set<K extends keyof CalcState>(key: K, value: number) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  const results = useMemo(() => {
    const buffer = Math.min(Math.max(state.taxBufferPercent, 0), 90) / 100;
    const revenueNeeded = (state.desiredIncome + state.annualExpenses) / (1 - buffer);
    const weeksWorked = Math.max(52 - state.weeksOff, 1);
    const billableHoursPerYear = weeksWorked * state.daysPerWeek * state.billableHoursPerDay;
    const hourlyRate = billableHoursPerYear > 0 ? revenueNeeded / billableHoursPerYear : 0;
    const dayRate = hourlyRate * state.billableHoursPerDay;
    const weeklyRate = dayRate * state.daysPerWeek;
    const sampleProjectRate = hourlyRate * state.sampleProjectHours;

    return {
      revenueNeeded,
      weeksWorked,
      billableHoursPerYear,
      hourlyRate,
      dayRate,
      weeklyRate,
      sampleProjectRate,
    };
  }, [state]);

  function copySummary() {
    const text = [
      `Freelance rate calculation (417 Freelancers):`,
      `Target hourly rate: ${fmtMoney2(results.hourlyRate)}`,
      `Day rate (${state.billableHoursPerDay} billable hrs): ${fmtMoney2(results.dayRate)}`,
      `Weekly rate (${state.daysPerWeek} days): ${fmtMoney2(results.weeklyRate)}`,
      `Annual revenue target: ${fmtMoney(results.revenueNeeded)}`,
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
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#7C4A1E", borderBottom: "1px solid #E8C99A", paddingBottom: "8px" }}>
            Income Goals
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Desired annual take-home income</Label>
              <NumberField value={state.desiredIncome} onChange={(v) => set("desiredIncome", v)} step={1000} prefix="$" />
            </div>
            <div>
              <Label>Annual business expenses</Label>
              <NumberField value={state.annualExpenses} onChange={(v) => set("annualExpenses", v)} step={500} prefix="$" />
            </div>
          </div>
          <div className="mt-4">
            <Label>Tax and savings buffer</Label>
            <NumberField value={state.taxBufferPercent} onChange={(v) => set("taxBufferPercent", v)} max={90} suffix="%" />
            <p className="mt-1 text-xs" style={{ color: "#6B5E55" }}>
              Portion of revenue set aside for self-employment tax, income tax, and savings. 25 to 35% is a common starting point; talk to an accountant for your exact number.
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#7C4A1E", borderBottom: "1px solid #E8C99A", paddingBottom: "8px" }}>
            Working Time
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Label>Weeks off per year</Label>
              <NumberField value={state.weeksOff} onChange={(v) => set("weeksOff", v)} max={52} suffix="wks" />
            </div>
            <div>
              <Label>Working days per week</Label>
              <NumberField value={state.daysPerWeek} onChange={(v) => set("daysPerWeek", v)} max={7} suffix="days" />
            </div>
            <div>
              <Label>Billable hours per day</Label>
              <NumberField value={state.billableHoursPerDay} onChange={(v) => set("billableHoursPerDay", v)} max={24} suffix="hrs" />
            </div>
          </div>
          <p className="mt-2 text-xs" style={{ color: "#6B5E55" }}>
            Billable hours are hours you actually bill clients, not time spent on admin, marketing, or finding work. Most freelancers bill 4 to 6 hours out of an 8-hour day.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#7C4A1E", borderBottom: "1px solid #E8C99A", paddingBottom: "8px" }}>
            Project Estimator
          </p>
          <div className="max-w-xs">
            <Label>Estimated hours for a sample project</Label>
            <NumberField value={state.sampleProjectHours} onChange={(v) => set("sampleProjectHours", v)} suffix="hrs" />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-2" style={{ backgroundColor: "#2C2420" }}>
        <div className="px-6 py-8 sticky top-0">
          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#E8C99A" }}>
            Your Target Rate
          </p>
          <div className="text-4xl font-bold mb-1" style={{ color: "#F5EFE6" }}>
            {fmtMoney2(results.hourlyRate)}
            <span className="text-base font-normal" style={{ color: "#C8B8A8" }}> / hour</span>
          </div>
          <p className="text-xs mb-6" style={{ color: "#C8B8A8" }}>
            Based on {results.billableHoursPerYear.toLocaleString()} billable hours across {results.weeksWorked} working weeks.
          </p>

          <div className="space-y-3 mb-6">
            {[
              { label: "Day rate", value: fmtMoney2(results.dayRate) },
              { label: "Weekly rate", value: fmtMoney2(results.weeklyRate) },
              { label: "Annual revenue target", value: fmtMoney(results.revenueNeeded) },
              { label: `Sample project (${state.sampleProjectHours} hrs)`, value: fmtMoney2(results.sampleProjectRate) },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-2"
                style={{ borderBottom: "1px solid #3d3330" }}
              >
                <span className="text-sm" style={{ color: "#C8B8A8" }}>{row.label}</span>
                <span className="text-sm font-semibold" style={{ color: "#F5EFE6" }}>{row.value}</span>
              </div>
            ))}
          </div>

          <button
            onClick={copySummary}
            className="flex items-center justify-center gap-2 w-full rounded-md py-2.5 text-sm font-semibold transition-colors"
            style={{ backgroundColor: "#C47A3A", color: "#fff" }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy summary"}
          </button>
        </div>
      </div>
    </div>
  );
}
