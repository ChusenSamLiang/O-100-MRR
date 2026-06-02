import { decodeInputs } from '@/lib/encode';
import { calculate } from '@/lib/calculator';
import ShareResult from './ShareResult';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SharePage({ params }: Props) {
  const { slug } = await params;
  const inputs = decodeInputs(slug);

  if (!inputs) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold mb-2">Invalid link</p>
          <a href="/" className="text-emerald-400 underline">Calculate your own quit number →</a>
        </div>
      </div>
    );
  }

  const result = calculate(inputs);

  return <ShareResult result={result} inputs={inputs} slug={slug} />;
}

export function generateMetadata() {
  return {
    title: 'My Quit Number — QuitNumber',
    description: 'The real MRR you need to quit your job. Not the optimistic one.',
    openGraph: {
      title: 'My Quit Number',
      description: 'See the full waterfall from MRR to take-home pay.',
    },
  };
}
