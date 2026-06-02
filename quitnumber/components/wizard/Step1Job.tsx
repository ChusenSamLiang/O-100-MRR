'use client';

import { CalcInputs } from '@/types';
import { US_STATES } from '@/lib/tax-tables';

interface Props {
  inputs: CalcInputs;
  update: (p: Partial<CalcInputs>) => void;
  onNext: () => void;
}

export default function Step1Job({ inputs, update, onNext }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Your current job</h2>
        <p className="text-gray-400 text-sm">We need your W-2 baseline to calculate what you're giving up.</p>
      </div>

      <Field label="Gross annual salary">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            className="input pl-7"
            value={inputs.grossSalary}
            onChange={e => update({ grossSalary: +e.target.value })}
          />
        </div>
      </Field>

      <Field label="State">
        <select
          className="input"
          value={inputs.state}
          onChange={e => update({ state: e.target.value })}
        >
          {US_STATES.map(s => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
      </Field>

      <Field label="What does your employer pay toward your health insurance? (monthly)">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            className="input pl-7"
            value={inputs.employerHealthMonthly}
            onChange={e => update({ employerHealthMonthly: +e.target.value })}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">Typical employer contribution: $400–$700/mo. Check your benefits portal.</p>
      </Field>

      <Field label="401K employer match (% of salary)">
        <div className="relative">
          <input
            type="number"
            className="input pr-7"
            step="0.5"
            min="0"
            max="20"
            value={inputs.employer401kMatchPct * 100}
            onChange={e => update({ employer401kMatchPct: +e.target.value / 100 })}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Common: 3–6%. Enter 0 if none.</p>
      </Field>

      <button onClick={onNext} className="btn-primary w-full">
        Next: Monthly Expenses →
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      {children}
    </div>
  );
}
