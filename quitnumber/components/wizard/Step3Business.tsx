'use client';

import { CalcInputs } from '@/types';

interface Props {
  inputs: CalcInputs;
  update: (p: Partial<CalcInputs>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Business({ inputs, update, onNext, onBack }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Business costs</h2>
        <p className="text-gray-400 text-sm">The costs most calculators ignore — but they eat your margins.</p>
      </div>

      <ToggleGroup
        label="Product type"
        options={[
          { value: 'no-ai',    label: 'No AI',    desc: '$0 API costs' },
          { value: 'light-ai', label: 'Light AI', desc: '~$150/mo APIs' },
          { value: 'heavy-ai', label: 'Heavy AI', desc: '~8% of MRR in APIs' },
        ]}
        value={inputs.productType}
        onChange={v => update({ productType: v as CalcInputs['productType'] })}
      />

      <ToggleGroup
        label="Payment processor"
        options={[
          { value: 'stripe',       label: 'Stripe',        desc: '~6.5% effective' },
          { value: 'paddle',       label: 'Paddle',        desc: '5% flat MOR' },
          { value: 'lemonsqueezy', label: 'Lemon Squeezy', desc: '5.2% effective' },
        ]}
        value={inputs.processor}
        onChange={v => update({ processor: v as CalcInputs['processor'] })}
      />

      <ToggleGroup
        label="Infrastructure tier"
        options={[
          { value: 'solo',    label: 'Solo',    desc: '$50/mo' },
          { value: 'growing', label: 'Growing', desc: '$150/mo' },
          { value: 'scaling', label: 'Scaling', desc: '$500/mo' },
        ]}
        value={inputs.infraTier}
        onChange={v => update({ infraTier: v as CalcInputs['infraTier'] })}
      />

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-300">Annual business costs (LLC, accountant, legal)</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input
            type="number"
            className="input pl-7"
            value={inputs.annualBusinessCosts}
            onChange={e => update({ annualBusinessCosts: +e.target.value })}
          />
        </div>
        <p className="text-xs text-gray-500">Typical: $800–$2,000/yr for LLC + accountant</p>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
        <button onClick={onNext} className="btn-primary flex-1">Next: Revenue Stability →</button>
      </div>
    </div>
  );
}

function ToggleGroup({
  label, options, value, onChange,
}: {
  label: string;
  options: { value: string; label: string; desc: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-300">{label}</label>
      <div className="grid grid-cols-3 gap-2">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`p-3 rounded-lg border text-left transition-colors ${
              value === opt.value
                ? 'border-emerald-500 bg-emerald-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="text-sm font-medium">{opt.label}</div>
            <div className="text-xs text-gray-400 mt-0.5">{opt.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
