import { motion } from "framer-motion";
import { BarChart3, BookOpenText, CheckCircle2, Clapperboard, Landmark, Sparkles } from "lucide-react";

const formatCurrency = (value: number) => `Rs ${Math.round(value).toLocaleString("en-IN")}`;

const chapterCards = [
  {
    title: "Scene 1: Two tax paths",
    text: "India gives salaried taxpayers two main ways to calculate tax. The new regime is simpler, while the old regime can reward deduction planning.",
  },
  {
    title: "Scene 2: Deductions change outcomes",
    text: "Sections like 80C, 80D, 80CCD(1B), HRA, and home-loan benefits are the main reasons the old regime can sometimes save more.",
  },
  {
    title: "Scene 3: Learn before you choose",
    text: "This page is now a simple tax guide, designed like a blog so beginners can understand slabs, deductions, and regime comparisons without any calculator input.",
  },
] as const;

const deductionLimits = [
  {
    label: "80C",
    value: "Max Rs 1,50,000",
    note: "Covers EPF, PPF, ELSS, life insurance premium, tuition fees, and home-loan principal repayment.",
  },
  {
    label: "80D",
    value: "Max Rs 25,000",
    note: "Health insurance deduction. This can go up to Rs 50,000 for senior citizens.",
  },
  {
    label: "80CCD(1B)",
    value: "Extra Rs 50,000",
    note: "Additional deduction for NPS contributions beyond the standard 80C limit.",
  },
  {
    label: "HRA",
    value: "Depends on salary and rent",
    note: "Available in the old regime based on salary structure, HRA received, rent paid, and city type.",
  },
  {
    label: "Standard Deduction",
    value: "Rs 50,000 / Rs 75,000",
    note: "Common salaried deduction. Old regime commonly uses Rs 50,000, while the new regime uses Rs 75,000 in this dashboard explanation.",
  },
  {
    label: "Home Loan Interest",
    value: "Up to Rs 2,00,000",
    note: "Section 24 deduction for self-occupied house property under the old regime.",
  },
] as const;

const oldRegimeSlabs = [
  { label: "0-2.5L", rate: "0%" },
  { label: "2.5-5L", rate: "5%" },
  { label: "5-10L", rate: "20%" },
  { label: "Above 10L", rate: "30%" },
] as const;

const newRegimeSlabs = [
  { label: "0-3L", rate: "0%" },
  { label: "3-7L", rate: "5%" },
  { label: "7-10L", rate: "10%" },
  { label: "10-12L", rate: "15%" },
  { label: "12-15L", rate: "20%" },
  { label: "Above 15L", rate: "30%" },
] as const;

const oldExample = {
  income: 800000,
  taxableIncome: 620000,
  applicableSlab: "20%",
  effectiveTaxRate: "7.9%",
  finalTax: 48984,
  summary:
    "If your income is Rs 8L, the first Rs 2.5L has no tax, the next Rs 2.5L is taxed at 5%, and the remaining taxable portion is taxed at 20%.",
  segments: [
    { label: "0-2.5L", income: 250000, tax: 0, incomeShare: 40, taxShare: 0 },
    { label: "2.5-5L", income: 250000, tax: 12500, incomeShare: 40, taxShare: 25.5 },
    { label: "5-10L", income: 120000, tax: 24000, incomeShare: 20, taxShare: 49 },
    { label: "Health & Education Cess", income: 0, tax: 2464, incomeShare: 0, taxShare: 5.5 },
  ],
} as const;

const recommendationPoints = [
  {
    title: "Old regime is usually better when",
    text: "You actively use deductions like 80C, 80D, HRA, NPS, and home-loan benefits to reduce taxable income.",
  },
  {
    title: "New regime is usually better when",
    text: "You prefer simpler filing and do not claim many deductions, exemptions, or salary-structure based tax benefits.",
  },
  {
    title: "What to compare before choosing",
    text: "Check total deductions, taxable income after those deductions, final tax under both regimes, and the savings difference between them.",
  },
] as const;

const TaxOptimizer = () => {
  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-card rounded-[24px] p-6"
      >
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.22em] text-white/36">Tax Story</p>
          <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white">
            <Clapperboard className="h-7 w-7 text-violet-200" />
            Old vs New Tax Regime
          </h1>
          <p className="mt-2 max-w-3xl text-white/56">
            This page is a simple tax blog that explains deductions, tax slabs, and how your final tax is calculated in a clear beginner-friendly format.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {chapterCards.map((card) => (
            <div key={card.title} className="dashboard-card-hover rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold text-violet-100">{card.title}</p>
              <p className="mt-3 text-sm leading-7 text-white/62">{card.text}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04 }}
        className="dashboard-card rounded-[24px] p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/18 text-violet-100">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/36">Tax Guide</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">What changes between the two regimes</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-white/58">
              The new regime offers a cleaner structure with fewer deduction benefits, while the old regime rewards tax planning through deductions and exemptions.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {recommendationPoints.map((item) => (
            <div key={item.title} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
              <p className="text-lg font-semibold text-white">{item.title}</p>
              <p className="mt-3 text-sm leading-7 text-white/58">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[24px] border border-violet-200/12 bg-[linear-gradient(135deg,rgba(137,84,255,0.16),rgba(255,255,255,0.02))] p-5 shadow-[0_22px_70px_rgba(116,65,230,0.16)]">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-300/12 text-violet-100">
              <BookOpenText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/36">Deduction Details</p>
              <h3 className="mt-2 text-xl font-semibold text-white">Important yearly deduction limits</h3>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-white/58">
                These are the most common deduction limits people review before deciding whether the old regime is worth using.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {deductionLimits.map((item) => (
              <div key={item.label} className="dashboard-card-hover rounded-[20px] border border-white/10 bg-black/20 p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <span className="rounded-full border border-violet-200/20 bg-violet-300/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-violet-100">
                    Limit
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-white/54">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="dashboard-card rounded-[24px] p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/18 text-violet-100">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/36">Understand Your Tax</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Tax slab explanation</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-white/58">
              Each regime taxes income in layers. As income crosses a slab threshold, only the amount inside that slab is taxed at that slab rate.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {[
            { title: "Old Regime Slabs", slabs: oldRegimeSlabs },
            { title: "New Regime Slabs", slabs: newRegimeSlabs },
          ].map((group) => (
            <div key={group.title} className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-lg font-semibold text-white">{group.title}</p>
                {group.title === "New Regime Slabs" && (
                  <span className="rounded-full border border-violet-200/20 bg-violet-300/10 px-3 py-1 text-xs uppercase tracking-[0.14em] text-violet-100">
                    AY 2025-26
                  </span>
                )}
              </div>
              <div className="mt-5 space-y-3">
                {group.slabs.map((slab) => (
                  <div key={slab.label} className="flex items-center justify-between rounded-[18px] border border-white/8 bg-black/20 px-4 py-3">
                    <span className="text-sm text-white/68">{slab.label}</span>
                    <span className="text-sm font-semibold text-white">{slab.rate}</span>
                  </div>
                ))}
              </div>
              {group.title === "New Regime Slabs" && (
                <div className="mt-5 space-y-3 rounded-[20px] border border-violet-200/12 bg-[linear-gradient(135deg,rgba(137,84,255,0.16),rgba(255,255,255,0.02))] p-4">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                      Standard Deduction: Rs 75,000
                    </span>
                    <span className="rounded-full border border-emerald-300/18 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
                      Section 87A Rebate
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-white/60">
                    Resident individuals can get rebate under Section 87A in the new regime, so no tax is payable if total income does not exceed Rs 7,00,000.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]"
      >
        <div className="dashboard-card rounded-[24px] p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/18 text-violet-100">
              <BookOpenText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/36">How Your Tax Is Calculated</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Simple example for beginners</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-white/54">User Income</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(oldExample.income)}</p>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-white/54">Applicable Slab</p>
              <p className="mt-2 text-2xl font-semibold text-white">{oldExample.applicableSlab}</p>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-white/54">Tax Percentage</p>
              <p className="mt-2 text-2xl font-semibold text-white">{oldExample.effectiveTaxRate}</p>
            </div>
            <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm text-white/54">Final Tax</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(oldExample.finalTax)}</p>
            </div>
          </div>

          <div className="mt-5 rounded-[22px] border border-violet-200/12 bg-[linear-gradient(135deg,rgba(137,84,255,0.16),rgba(255,255,255,0.02))] p-5">
            <p className="text-sm font-semibold text-white">Easy explanation</p>
            <p className="mt-3 text-sm leading-7 text-white/62">{oldExample.summary}</p>
            <p className="mt-3 text-sm leading-7 text-white/62">
              In this example, taxable income is shown as <span className="text-white">{formatCurrency(oldExample.taxableIncome)}</span> after deductions.
            </p>
          </div>
        </div>

        <div className="dashboard-card rounded-[24px] p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/18 text-violet-100">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/36">Visual Tax Breakdown</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">How income is divided across slabs</h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {oldExample.segments.map((segment) => (
              <div key={segment.label} className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-white">{segment.label}</p>
                  <p className="text-sm text-white/56">
                    {segment.income > 0 ? `${formatCurrency(segment.income)} income` : `${formatCurrency(segment.tax)} added`}
                  </p>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-white/34">
                      <span>Income in layer</span>
                      <span>{segment.incomeShare}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#efc8ff_0%,#be87ff_55%,#7d49ff_100%)]"
                        style={{ width: `${Math.max(segment.incomeShare, segment.income > 0 ? 6 : 0)}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.14em] text-white/34">
                      <span>Tax from layer</span>
                      <span>{segment.taxShare}%</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,rgba(255,120,120,0.95),rgba(170,60,120,0.9))]"
                        style={{ width: `${Math.max(segment.taxShare, segment.tax > 0 ? 6 : 0)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-6 text-white/54">
                  Tax applied from this part: <span className="text-white">{formatCurrency(segment.tax)}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="dashboard-card rounded-[24px] p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/18 text-violet-100">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/36">Which Regime Can Be Better</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Simple conclusion</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-white/58">
              There is no single best regime for everyone. The better option depends on how much deduction value you can actually claim.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="dashboard-card-hover rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-lg font-semibold text-white">Choose old regime if</p>
            <p className="mt-3 text-sm leading-7 text-white/58">
              You have strong deduction planning, HRA benefit, insurance deductions, and investment-linked tax savings.
            </p>
          </div>
          <div className="dashboard-card-hover rounded-[22px] border border-violet-200/18 bg-[linear-gradient(135deg,rgba(137,84,255,0.16),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_70px_rgba(116,65,230,0.18)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-lg font-semibold text-white">Recommended idea</p>
              <span className="rounded-full bg-violet-300/14 px-3 py-1 text-xs uppercase tracking-[0.16em] text-violet-100">
                Compare both
              </span>
            </div>
            <p className="mt-3 text-sm leading-7 text-white/58">
              If your deductions are high, old regime often becomes stronger. If deductions are low, new regime often feels cleaner and lighter.
            </p>
          </div>
          <div className="dashboard-card-hover rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-lg font-semibold text-white">Choose new regime if</p>
            <p className="mt-3 text-sm leading-7 text-white/58">
              You want a simple structure and do not depend much on exemptions, HRA calculations, or multiple deduction categories.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default TaxOptimizer;
