export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-3xl font-black">QuitNumber Pro</h1>
        <p className="text-gray-400">The real number. Not the optimistic one — with scenario modeling.</p>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 text-left space-y-3">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-xl">Pro</span>
            <span className="text-3xl font-black text-emerald-400">$12<span className="text-sm font-normal text-gray-400">/mo</span></span>
          </div>
          {[
            '"What if" scenario sliders',
            'Churn sensitivity chart',
            'Monthly MRR progress emails',
            'Milestone alerts at 50%, 75%, 90%',
            'PDF export with full breakdown',
            'Save & compare multiple scenarios',
          ].map(f => (
            <div key={f} className="flex gap-2 text-sm">
              <span className="text-emerald-400">✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>
        <a href="/api/stripe/checkout" className="btn-primary block w-full py-3 text-base font-bold">
          Get Pro — $12/mo →
        </a>
        <a href="/" className="text-sm text-gray-500 hover:text-gray-300">← Back to calculator</a>
      </div>
    </div>
  );
}
