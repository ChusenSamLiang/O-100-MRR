'use client';

import { CalcInputs } from '@/types';

interface Props {
  inputs: CalcInputs;
  update: (p: Partial<CalcInputs>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CHURN_OPTIONS: { value: CalcInputs['churnRate']; label: string; desc: string }[] = [
  { value: 'low',     label: 'Low (<3%/mo)',     desc: 'Strong retention, sticky product' },
  { value: 'typical', label: 'Typical (~5%/mo)', desc: 'Average SaaS — be honest' },
  { value: 'high',    label: 'High (~8%/mo)',     desc: 'Early stage, still finding PMF' },
];

export default function Step4Stability({ inputs, update, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Revenue stability</h2>
        <p className="text-gray-400 text-sm">Churn means your MRR will erode. We model the buffer you need.</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">Current MRR (optional)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            className="input pl-7"
            value={inputs.currentMRR}
            onChange={e => update({ currentMRR: +e.target.value })}
          />
        </div>
        <p className="text-xs text-gray-500">Enter 0 if pre-revenue. Used to calculate the gap to your quit number.</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">Monthly MRR growth estimate</label>
        <div className="relative">
          <input
            type="number"
            className="input pr-7"
            step="1"
            min="0"
            max="100"
            value={inputs.monthlyGrowthPct}
            onChange={e => update({ monthlyGrowthPct: +e.target.value })}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
        </div>
        <p className="text-xs text-gray-500">Realistic indie hacker range: 5–15%/mo. Used for timeline projection.</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">Expected monthly churn rate</label>
        <div className="space-y-2">
          {CHURN_OPTIONS.map(opt => (
            <label
              key={opt.value}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                inputs.churnRate === opt.value
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <input
                type="radio"
                className="mt-0.5 accent-emerald-500"
                checked={inputs.churnRate === opt.value}
                onChange={() => update({ churnRate: opt.value })}
              />
              <div>
                <div className="text-sm font-medium">{opt.label}</div>
                <div className="text-xs text-gray-400">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
        <button onClick={onNext} className="btn-primary flex-1">Review →</button>
      </div>
    </div>
  );
}
