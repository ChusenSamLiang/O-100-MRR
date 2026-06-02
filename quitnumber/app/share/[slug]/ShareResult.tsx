'use client';

import { CalcInputs, CalcOutputs } from '@/types';
import WaterfallChart from '@/components/result/WaterfallChart';

interface Props {
  result: CalcOutputs;
  inputs: CalcInputs;
  slug: string;
}

export default function ShareResult({ result, inputs }: Props) {
  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-xl mx-auto space-y-8">

        <div className="text-center">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Quit Number</p>
          <div className="text-6xl font-black text-emerald-400 tabular-nums">{fmt(result.quitNumber)}</div>
          <p className="text-gray-400 mt-1">MRR/month to safely leave your job</p>
        </div>

        <div className="bg-red-950/40 border border-red-800/50 rounded-xl p-4">
          <p className="text-xs text-red-400 uppercase tracking-wider mb-1">Biggest hidden cost</p>
          <p className="text-lg font-bold">{result.surpriseCost.label}</p>
          <p className="text-2xl font-black text-red-400">{fmt(result.surpriseCost.amount)}<span className="text-sm font-normal text-red-500">/mo</span></p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">MRR → Take-home Waterfall</h3>
          <WaterfallChart waterfall={result.waterfall} />
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Take-home / month</p>
            <p className="text-2xl font-bold text-emerald-400">{fmt(result.pocketMoney)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">= {fmt(result.equivalentSalary)}/yr salary</p>
          </div>
        </div>

        <div className="text-center space-y-3">
          <p className="text-gray-400 text-sm">What&apos;s your quit number?</p>
          <a href="/" className="btn-primary inline-block px-8 py-3">
            Calculate mine →
          </a>
          <p className="text-xs text-gray-600">
            Modeled for {inputs.state} • {inputs.processor} • {inputs.productType} product
          </p>
        </div>

      </div>
    </div>
  );
}
