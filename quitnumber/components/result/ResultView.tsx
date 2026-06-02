'use client';

import { useState } from 'react';
import { CalcInputs, CalcOutputs } from '@/types';
import WaterfallChart from './WaterfallChart';

interface Props {
  result: CalcOutputs;
  inputs: CalcInputs;
  shareSlug: string;
  onReset: () => void;
}

export default function ResultView({ result, inputs, shareSlug, onReset }: Props) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/share/${shareSlug}`
    : `/share/${shareSlug}`;

  async function copyShare() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function captureEmail(e: React.FormEvent) {
    e.preventDefault();
    await fetch('/api/email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
    setEmailSent(true);
  }

  const fmt = (n: number) => `$${Math.round(n).toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-12">
      <div className="max-w-xl mx-auto space-y-8">

        {/* Hero number */}
        <div className="text-center">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Your Quit Number</p>
          <div className="text-6xl font-black text-emerald-400 tabular-nums">
            {fmt(result.quitNumber)}
          </div>
          <p className="text-gray-400 mt-1">MRR/month to safely leave your job</p>
          <p className="text-xs text-gray-600 mt-1">
            = {fmt(result.equivalentSalary)}/yr equivalent salary
          </p>
        </div>

        {/* Surprise cost */}
        <div className="bg-red-950/40 border border-red-800/50 rounded-xl p-4">
          <p className="text-xs text-red-400 uppercase tracking-wider mb-1">Biggest hidden cost</p>
          <p className="text-lg font-bold text-white">{result.surpriseCost.label}</p>
          <p className="text-2xl font-black text-red-400">{fmt(result.surpriseCost.amount)}<span className="text-sm font-normal text-red-500">/mo</span></p>
        </div>

        {/* Gap card */}
        {result.gap > 0 && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Gap to quit</p>
              <p className="text-2xl font-bold text-amber-400">{fmt(result.gap)}<span className="text-xs text-amber-500">/mo</span></p>
              <p className="text-xs text-gray-500 mt-0.5">from current {fmt(inputs.currentMRR)} MRR</p>
            </div>
            {result.monthsToQuit && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Estimated timeline</p>
                <p className="text-2xl font-bold text-blue-400">{result.monthsToQuit}<span className="text-xs text-blue-500"> months</span></p>
                <p className="text-xs text-gray-500 mt-0.5">at {inputs.monthlyGrowthPct}% monthly growth</p>
              </div>
            )}
          </div>
        )}

        {result.gap === 0 && (
          <div className="bg-emerald-950/40 border border-emerald-700/50 rounded-xl p-4 text-center">
            <p className="text-emerald-400 font-bold text-lg">You&apos;re already there. 🎉</p>
            <p className="text-gray-400 text-sm">Your current MRR covers your quit number.</p>
          </div>
        )}

        {/* Waterfall */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-gray-300 mb-4">MRR → Pocket Money Waterfall</h3>
          <WaterfallChart waterfall={result.waterfall} />
        </div>

        {/* Take-home summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Take-home after all costs & taxes</p>
            <p className="text-2xl font-bold text-emerald-400">{fmt(result.pocketMoney)}<span className="text-sm font-normal text-gray-400">/mo</span></p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Gross MRR needed</p>
            <p className="text-xl font-bold">{fmt(result.quitNumber)}<span className="text-sm font-normal text-gray-400">/mo</span></p>
          </div>
        </div>

        {/* Share */}
        <div className="space-y-3">
          <button onClick={copyShare} className="btn-primary w-full">
            {copied ? '✓ Link copied!' : '📋 Copy shareable link'}
          </button>
          <button onClick={onReset} className="btn-secondary w-full text-sm">
            ← Recalculate with different inputs
          </button>
        </div>

        {/* Email capture */}
        {!emailSent ? (
          <form onSubmit={captureEmail} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
            <p className="text-sm font-medium">Get a monthly check-in when your MRR changes</p>
            <p className="text-xs text-gray-500">We&apos;ll email you your progress toward your quit number. No spam.</p>
            <div className="flex gap-2">
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="input flex-1 text-sm"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button type="submit" className="btn-primary px-4 text-sm whitespace-nowrap">Remind me</button>
            </div>
          </form>
        ) : (
          <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4 text-center text-sm text-emerald-400">
            ✓ You&apos;re on the list. We&apos;ll check in monthly.
          </div>
        )}

        {/* Pro upsell */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="font-bold text-white">QuitNumber Pro</p>
              <p className="text-xs text-gray-400">Scenario modeling + milestone alerts</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-emerald-400">$12<span className="text-xs font-normal text-gray-400">/mo</span></p>
            </div>
          </div>
          <ul className="text-sm text-gray-300 space-y-1 mb-4">
            <li>✦ &quot;What if&quot; scenario sliders — adjust inputs instantly</li>
            <li>✦ Churn sensitivity chart — visualize risk scenarios</li>
            <li>✦ Monthly progress email with milestone alerts</li>
            <li>✦ PDF export with full breakdown</li>
            <li>✦ Save & compare multiple scenarios</li>
          </ul>
          <a href="/api/stripe/checkout" className="btn-primary w-full text-center block">
            Unlock Pro — $12/mo →
          </a>
        </div>

      </div>
    </div>
  );
}

