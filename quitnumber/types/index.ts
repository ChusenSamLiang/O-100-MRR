export interface CalcInputs {
  // Step 1
  grossSalary: number;
  state: string;
  employerHealthMonthly: number;
  employer401kMatchPct: number;
  // Step 2
  monthlyExpenses: number;
  monthlySavingsTarget: number;
  riskBuffer: 'lean' | 'moderate' | 'conservative';
  // Step 3
  productType: 'no-ai' | 'light-ai' | 'heavy-ai';
  processor: 'stripe' | 'paddle' | 'lemonsqueezy';
  infraTier: 'solo' | 'growing' | 'scaling';
  annualBusinessCosts: number;
  // Step 4
  currentMRR: number;
  monthlyGrowthPct: number;
  churnRate: 'low' | 'typical' | 'high';
}

export interface WaterfallItem {
  label: string;
  value: number;
  type: 'revenue' | 'deduction' | 'total';
}

export interface CalcOutputs {
  quitNumber: number;
  waterfall: WaterfallItem[];
  gap: number;
  monthsToQuit: number | null;
  surpriseCost: { label: string; amount: number };
  equivalentSalary: number;
  pocketMoney: number;
}
