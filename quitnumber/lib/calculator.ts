import { CalcInputs, CalcOutputs, WaterfallItem } from '@/types';
import { stateRate, federalEffectiveRate } from './tax-tables';

const PROCESSOR_RATES = { stripe: 0.065, paddle: 0.05, lemonsqueezy: 0.052 };
const INFRA_COSTS     = { solo: 50, growing: 150, scaling: 500 };
const API_COSTS       = { 'no-ai': 0, 'light-ai': 150, 'heavy-ai': null as null };
const CHURN_RATES     = { low: 0.03, typical: 0.05, high: 0.08 };
const RISK_MULT       = { lean: 1.0, moderate: 1.1, conservative: 1.25 };
const TOOL_SUBS       = 150;
const HEALTH_INS      = 800;

function seTax(netProfit: number): { tax: number; deduction: number } {
  const taxable = netProfit * 0.9235;
  const capped   = Math.min(taxable, 184_500);
  const excess   = Math.max(0, taxable - 184_500);
  const tax      = capped * 0.153 + excess * 0.029;
  return { tax, deduction: tax * 0.5 };
}

export function calculate(inputs: CalcInputs): CalcOutputs {
  const {
    grossSalary, state, employerHealthMonthly, employer401kMatchPct,
    monthlyExpenses, monthlySavingsTarget, riskBuffer,
    productType, processor, infraTier, annualBusinessCosts,
    currentMRR, monthlyGrowthPct, churnRate,
  } = inputs;

  const healthCost       = HEALTH_INS;
  const retirementMonthly = (grossSalary * employer401kMatchPct) / 12;
  const requiredNetMonthly = monthlyExpenses + monthlySavingsTarget + healthCost + retirementMonthly;

  // Iterative solve for required annual profit
  let annualProfit = requiredNetMonthly * 12 / 0.65;
  for (let i = 0; i < 5; i++) {
    const se          = seTax(annualProfit);
    const agi         = annualProfit - se.deduction - healthCost * 12;
    const fedTax      = federalEffectiveRate(agi) * agi;
    const stateTaxVal = stateRate(state) * agi;
    const netAfterTax = annualProfit - se.tax - fedTax - stateTaxVal - healthCost * 12 - retirementMonthly * 12;
    const deficit     = requiredNetMonthly * 12 - netAfterTax;
    annualProfit     += deficit * 0.8;
  }
  const requiredMonthlyProfit = annualProfit / 12;

  const infraMonthly  = INFRA_COSTS[infraTier];
  const apiMonthly    = productType === 'heavy-ai' ? null : (API_COSTS[productType] as number);
  const bizFixed      = infraMonthly + TOOL_SUBS + annualBusinessCosts / 12;
  const processorRate = PROCESSOR_RATES[processor];

  let grossMRR: number;
  if (productType === 'heavy-ai') {
    grossMRR = (requiredMonthlyProfit + bizFixed) / (1 - processorRate - 0.08);
  } else {
    grossMRR = (requiredMonthlyProfit + bizFixed + (apiMonthly ?? 0)) / (1 - processorRate);
  }

  // Churn buffer: MRR survives 3 months of zero new sales
  const cr              = CHURN_RATES[churnRate];
  const churnAdjusted   = grossMRR / Math.pow(1 - cr, 3);
  const quitNumber      = Math.ceil(churnAdjusted * RISK_MULT[riskBuffer] / 100) * 100;

  // Waterfall
  const processorFee    = quitNumber * processorRate;
  const apiCost         = productType === 'heavy-ai' ? quitNumber * 0.08 : (apiMonthly ?? 0);
  const netProfit       = quitNumber - processorFee - apiCost - bizFixed;
  const seResult        = seTax(netProfit * 12);
  const seMonthly       = seResult.tax / 12;
  const agi             = netProfit - seResult.deduction / 12;
  const fedTaxMonthly   = federalEffectiveRate(agi * 12) * agi;
  const stateTaxMonthly = stateRate(state) * agi;
  const afterTax        = netProfit - seMonthly - fedTaxMonthly - stateTaxMonthly;
  const pocketMoney     = afterTax - healthCost - retirementMonthly;

  const waterfall = ([
    { label: 'Gross MRR',          value: quitNumber,              type: 'revenue'   },
    { label: `${processor === 'lemonsqueezy' ? 'Lemon Squeezy' : processor.charAt(0).toUpperCase() + processor.slice(1)} fees`, value: -processorFee, type: 'deduction' },
    { label: 'AI API costs',       value: -apiCost,               type: 'deduction' },
    { label: 'Infra & tools',      value: -bizFixed,              type: 'deduction' },
    { label: 'Net business profit',value: netProfit,              type: 'total'     },
    { label: 'SE tax',             value: -seMonthly,             type: 'deduction' },
    { label: 'Federal income tax', value: -fedTaxMonthly,         type: 'deduction' },
    { label: 'State income tax',   value: -stateTaxMonthly,       type: 'deduction' },
    { label: 'Health insurance',   value: -healthCost,            type: 'deduction' },
    { label: 'Take-home',          value: pocketMoney,            type: 'total'     },
  ] as WaterfallItem[]).filter(item => Math.abs(item.value) > 0.5);

  const deductions      = waterfall.filter(w => w.type === 'deduction');
  const biggest         = deductions.sort((a, b) => a.value - b.value)[0];
  const surpriseCost    = { label: biggest?.label ?? 'SE tax', amount: Math.abs(biggest?.value ?? 0) };

  const gap             = Math.max(0, quitNumber - currentMRR);
  const monthsToQuit    = gap > 0 && monthlyGrowthPct > 0 && currentMRR > 0
    ? Math.ceil(Math.log(quitNumber / currentMRR) / Math.log(1 + monthlyGrowthPct / 100))
    : gap > 0 && monthlyGrowthPct > 0
    ? null
    : null;

  const equivalentSalary = Math.round(requiredMonthlyProfit * 12 * 1.35 / 1_000) * 1_000;

  return { quitNumber, waterfall, gap, monthsToQuit, surpriseCost, equivalentSalary, pocketMoney };
}
