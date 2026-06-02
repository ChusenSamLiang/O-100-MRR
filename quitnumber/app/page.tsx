import WizardContainer from '@/components/wizard/WizardContainer';

export default function Home() {
  return (
    <>
      <div className="bg-gray-950 text-white text-center pt-12 pb-0 px-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-medium px-3 py-1 rounded-full border border-emerald-500/20 mb-4">
          The real number. Not the optimistic one.
        </div>
        <h1 className="text-4xl font-black mb-3">
          What MRR do you actually need<br className="hidden sm:block" /> to quit your job?
        </h1>
        <p className="text-gray-400 max-w-md mx-auto text-sm mb-2">
          Most calculators say $8K. Ours says $14–20K. Here&apos;s why — and what your real number is.
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500 mb-8">
          <span>✦ SE tax (15.3%)</span>
          <span>✦ Stripe&apos;s effective 6.5%</span>
          <span>✦ Health insurance</span>
          <span>✦ Churn buffer</span>
        </div>
      </div>
      <WizardContainer />
    </>
  );
}
