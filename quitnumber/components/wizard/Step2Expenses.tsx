'use client';

import { CalcInputs } from '@/types';

interface Props {
  inputs: CalcInputs;
  update: (p: Partial<CalcInputs>) => void;
  onNext: () => void;
  onBack: () => void;
}

const RISK_OPTIONS: { value: CalcInputs['riskBuffer']; label: string; desc: string }[] = [
  { value: 'lean',         label: 'Lean (×1.0)',         desc: 'Hit the number and jump immediately' },
  { value: 'moderate',     label: 'Moderate (×1.1)',     desc: '10% buffer — recommended' },
  { value: 'conservative', label: 'Conservative (×1.25)', desc: '3-month expense runway cushion' },
];

export default function Step2Expenses({ inputs, update, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Monthly expenses</h2>
        <p className="text-gray-400 text-sm">What does it cost to run your life each month?</p>
      </div>

      <Field label="Fixed monthly expenses (rent, food, transport, utilities)">
        <MoneyInput value={inputs.monthlyExpenses} onChange={v => update({ monthlyExpenses: v })} />
      </Field>

      <Field label="Monthly savings target">
        <MoneyInput value={inputs.monthlySavingsTarget} onChange={v => update({ monthlySavingsTarget: v })} />
        <p className="text-xs text-gray-500 mt-1">Include emergency fund top-up, retirement, etc.</p>
      </Field>

      <Field label="Risk buffer">
        <div className="space-y-2">
          {RISK_OPTIONS.map(opt => (
            <label
              key={opt.value}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                inputs.riskBuffer === opt.value
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                className="mt-0.5 accent-emerald-500"
                checked={inputs.riskBuffer === opt.value}
                onChange={() => update({ riskBuffer: opt.value })}
              />
              <div>
                <div className="text-sm font-medium">{opt.label}</div>
                <div className="text-xs text-gray-400">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </Field>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
        <button onClick={onNext} className="btn-primary flex-1">Next: Business Costs →</button>
      </div>
    </div>
  );
}

function MoneyInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
      <input
        type="number"
        className="input pl-7"
        value={value}
        onChange={e => onChange(+e.target.value)}
      />
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
