'use client';

import { CalcInputs } from '@/types';
import { US_STATES } from '@/lib/tax-tables';

interface Props {
  inputs: CalcInputs;
  onSubmit: () => void;
  onBack: () => void;
}

export default function Step5Confirm({ inputs, onSubmit, onBack }: Props) {
  const stateName = US_STATES.find(s => s.code === inputs.state)?.name ?? inputs.state;

  const rows = [
    ['Gross salary',        `$${inputs.grossSalary.toLocaleString()}/yr`],
    ['State',               stateName],
    ['Employer health',     `$${inputs.employerHealthMonthly}/mo`],
    ['401K match',          `${(inputs.employer401kMatchPct * 100).toFixed(1)}%`],
    ['Monthly expenses',    `$${inputs.monthlyExpenses.toLocaleString()}/mo`],
    ['Savings target',      `$${inputs.monthlySavingsTarget.toLocaleString()}/mo`],
    ['Risk buffer',         inputs.riskBuffer],
    ['Product type',        inputs.productType],
    ['Processor',           inputs.processor],
    ['Infra tier',          inputs.infraTier],
    ['Annual biz costs',    `$${inputs.annualBusinessCosts.toLocaleString()}/yr`],
    ['Current MRR',         `$${inputs.currentMRR.toLocaleString()}/mo`],
    ['MRR growth',          `${inputs.monthlyGrowthPct}%/mo`],
    ['Churn rate',          inputs.churnRate],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Ready to calculate</h2>
        <p className="text-gray-400 text-sm">Review your inputs, then get your real quit number.</p>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800 divide-y divide-gray-800 text-sm">
        {rows.map(([key, val]) => (
          <div key={key} className="flex justify-between px-4 py-2.5">
            <span className="text-gray-400">{key}</span>
            <span className="text-white font-medium capitalize">{val}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">← Back</button>
        <button onClick={onSubmit} className="btn-primary flex-1 text-base font-bold py-3">
          Calculate My Quit Number →
        </button>
      </div>
    </div>
  );
}
