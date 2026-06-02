'use client';

import { useState } from 'react';
import { CalcInputs, CalcOutputs } from '@/types';
import { calculate } from '@/lib/calculator';
import { encodeInputs } from '@/lib/encode';
import Step1Job from './Step1Job';
import Step2Expenses from './Step2Expenses';
import Step3Business from './Step3Business';
import Step4Stability from './Step4Stability';
import Step5Confirm from './Step5Confirm';
import ResultView from '../result/ResultView';

const STEPS = ['Your Job', 'Expenses', 'Business', 'Stability', 'Review'];

const DEFAULTS: CalcInputs = {
  grossSalary: 120000,
  state: 'CA',
  employerHealthMonthly: 500,
  employer401kMatchPct: 0.04,
  monthlyExpenses: 4000,
  monthlySavingsTarget: 500,
  riskBuffer: 'moderate',
  productType: 'no-ai',
  processor: 'stripe',
  infraTier: 'solo',
  annualBusinessCosts: 1200,
  currentMRR: 0,
  monthlyGrowthPct: 8,
  churnRate: 'typical',
};

export default function WizardContainer() {
  const [step, setStep] = useState(0);
  const [inputs, setInputs] = useState<CalcInputs>(DEFAULTS);
  const [result, setResult] = useState<CalcOutputs | null>(null);
  const [shareSlug, setShareSlug] = useState('');

  function update(partial: Partial<CalcInputs>) {
    setInputs(prev => ({ ...prev, ...partial }));
  }

  function next() { setStep(s => s + 1); }
  function back() { setStep(s => s - 1); }

  function submit() {
    const out = calculate(inputs);
    const slug = encodeInputs(inputs);
    setResult(out);
    setShareSlug(slug);
    setStep(5);
  }

  if (step === 5 && result) {
    return (
      <ResultView
        result={result}
        inputs={inputs}
        shareSlug={shareSlug}
        onReset={() => { setStep(0); setResult(null); }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            {STEPS.map((s, i) => (
              <span key={s} className={i === step ? 'text-emerald-400 font-semibold' : i < step ? 'text-gray-400' : ''}>
                {s}
              </span>
            ))}
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {step === 0 && <Step1Job inputs={inputs} update={update} onNext={next} />}
        {step === 1 && <Step2Expenses inputs={inputs} update={update} onNext={next} onBack={back} />}
        {step === 2 && <Step3Business inputs={inputs} update={update} onNext={next} onBack={back} />}
        {step === 3 && <Step4Stability inputs={inputs} update={update} onNext={next} onBack={back} />}
        {step === 4 && <Step5Confirm inputs={inputs} onSubmit={submit} onBack={back} />}
      </div>
    </div>
  );
}
