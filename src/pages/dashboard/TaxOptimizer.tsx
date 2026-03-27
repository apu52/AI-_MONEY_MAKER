import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BookOpenText, CheckCircle2, Clapperboard, SlidersHorizontal } from "lucide-react";

const formatCurrency = (value: number) => `Rs ${Math.round(value).toLocaleString("en-IN")}`;

const chapterCards = [
  {
    title: "Scene 1: Two roads",
    text: "Think of tax regimes like two roads to the same destination. One road is simpler. The other gives more ways to save if you carry the right deduction tools.",
  },
  {
    title: "Scene 2: New regime",
    text: "The new regime is the cleaner road. Fewer deductions matter here, so it is easier to understand and often better when your deductions are low.",
  },
  {
    title: "Scene 3: Old regime",
    text: "The old regime is the smart-planning road. If you use 80C, 80D, HRA, and other deductions well, this road can save more tax.",
  },
] as const;

const deductionLimits = [
  { label: "80C", value: "Rs 1.5L", note: "Used for ELSS, PPF, EPF and other common tax-saving investments." },
  { label: "80D", value: "Rs 25K / Rs 50K", note: "Health insurance deduction depending on age and family structure." },
  { label: "Standard Deduction", value: "Rs 50K", note: "A basic salary deduction used in the old regime explanation." },
  { label: "HRA", value: "Salary structure based", note: "Depends on salary breakup, rent, and whether your city is metro or not." },
] as const;

const TaxOptimizer = () => {
  const [salary, setSalary] = useState(1200000);
  const [deductionLevel, setDeductionLevel] = useState(220000);
  const [hraSupport, setHraSupport] = useState(120000);

  const totalDeductions = deductionLevel + hraSupport;

  const oldTax = useMemo(() => {
    const taxableIncome = Math.max(0, salary - totalDeductions - 50000);
    let tax = 0;
    if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.3;
    if (taxableIncome > 500000) tax += Math.min(taxableIncome - 500000, 500000) * 0.2;
    if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 250000) * 0.05;
    return Math.round(tax + tax * 0.04);
  }, [salary, totalDeductions]);

  const newTax = useMemo(() => {
    const taxableIncome = Math.max(0, salary - 75000);
    let tax = 0;
    const slabs = [
      { limit: 400000, rate: 0 },
      { limit: 800000, rate: 0.05 },
      { limit: 1200000, rate: 0.1 },
      { limit: 1600000, rate: 0.15 },
      { limit: 2000000, rate: 0.2 },
      { limit: 2400000, rate: 0.25 },
      { limit: Infinity, rate: 0.3 },
    ];

    let previousLimit = 0;
    for (const slab of slabs) {
      if (taxableIncome <= previousLimit) break;
      const taxableSlice = Math.min(taxableIncome, slab.limit) - previousLimit;
      tax += taxableSlice * slab.rate;
      previousLimit = slab.limit;
    }

    return Math.round(tax + tax * 0.04);
  }, [salary]);

  const savings = Math.abs(oldTax - newTax);
  const betterRegime = oldTax <= newTax ? "Old Regime" : "New Regime";

  const guidance = useMemo(() => {
    if (salary <= 900000 && totalDeductions < 150000) {
      return {
        title: "For lower income with fewer deductions",
        text: "The new regime is usually easier and often better because you are not using many deduction benefits.",
      };
    }

    if (totalDeductions >= 300000) {
      return {
        title: "For higher deductions",
        text: "The old regime becomes more powerful because deductions and HRA start pulling taxable income down meaningfully.",
      };
    }

    return {
      title: "Middle zone",
      text: "Both sides stay close here. A little more deduction planning can push the old regime ahead, while low deduction usage keeps the new regime attractive.",
    };
  }, [salary, totalDeductions]);

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
            Old vs New Regime
          </h1>
          <p className="mt-2 max-w-3xl text-white/56">
            This page works like a short visual vlog. Move the sliders, watch the side-by-side change live, and understand which regime can be better without feeling like you are using a tax calculator.
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
            <SlidersHorizontal className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/36">Interactive View</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Move the story sliders</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-white/58">
              Slide income and deduction strength to see how the answer changes. This keeps the page visual, live, and easy to follow.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between text-sm text-white/56">
              <span>Annual income</span>
              <span>{formatCurrency(salary)}</span>
            </div>
            <input
              type="range"
              min="300000"
              max="5000000"
              step="50000"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-400"
            />
            <p className="mt-3 text-sm leading-6 text-white/50">Drag this to see how tax changes at different income levels.</p>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between text-sm text-white/56">
              <span>Deductions strength</span>
              <span>{formatCurrency(deductionLevel)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="400000"
              step="10000"
              value={deductionLevel}
              onChange={(e) => setDeductionLevel(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-400"
            />
            <p className="mt-3 text-sm leading-6 text-white/50">Higher deductions usually make the old regime more useful.</p>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between text-sm text-white/56">
              <span>HRA impact</span>
              <span>{formatCurrency(hraSupport)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="300000"
              step="10000"
              value={hraSupport}
              onChange={(e) => setHraSupport(Number(e.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-400"
            />
            <p className="mt-3 text-sm leading-6 text-white/50">This shows how salary structure and rent-related support can change the old regime story.</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              title: "Old Regime",
              tax: oldTax,
              isBetter: betterRegime === "Old Regime",
              description: "Best when deductions, HRA support, and salary structure are working hard for you.",
            },
            {
              title: "New Regime",
              tax: newTax,
              isBetter: betterRegime === "New Regime",
              description: "Best when deductions are low and you want a simpler tax route.",
            },
          ].map((regime) => (
            <div
              key={regime.title}
              className={`dashboard-card dashboard-card-hover rounded-[24px] p-6 ${
                regime.isBetter ? "border-violet-200/18 shadow-[0_28px_80px_rgba(116,65,230,0.22)]" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold text-white">{regime.title}</p>
                {regime.isBetter && (
                  <span className="rounded-full bg-violet-300/14 px-3 py-1 text-xs uppercase tracking-[0.16em] text-violet-100">
                    Better
                  </span>
                )}
              </div>
              <p className={`mt-5 text-4xl font-semibold ${regime.isBetter ? "text-shimmer" : "text-white"}`}>
                {formatCurrency(regime.tax)}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/54">{regime.description}</p>
            </div>
          ))}
        </div>

        <div className="dashboard-card rounded-[24px] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-white/36">Vlog narrator says</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">{guidance.title}</h3>
          <p className="mt-3 text-sm leading-7 text-white/62">{guidance.text}</p>

          <div className="mt-6 rounded-[20px] border border-violet-200/12 bg-[linear-gradient(135deg,rgba(137,84,255,0.16),rgba(255,255,255,0.02))] p-5">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="h-9 w-9 shrink-0 text-emerald-300" />
              <div>
                <p className="text-lg font-semibold text-white">
                  Right now, <span className="text-shimmer">{betterRegime}</span> leads by <span className="text-shimmer">{formatCurrency(savings)}</span>
                </p>
                <p className="mt-1 text-sm text-white/54">This number updates live as you move the sliders.</p>
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">Lower deductions</p>
              <p className="mt-1 text-sm leading-6 text-white/58">New regime is usually better because there are fewer deduction benefits to use in the old regime.</p>
            </div>
            <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">Higher deductions</p>
              <p className="mt-1 text-sm leading-6 text-white/58">Old regime often becomes better because deductions start reducing taxable income more strongly.</p>
            </div>
            <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-sm font-semibold text-white">For beginners</p>
              <p className="mt-1 text-sm leading-6 text-white/58">Simple rule: less deduction planning usually means new regime, more deduction planning usually means old regime.</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="dashboard-card rounded-[24px] p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-400/18 text-violet-100">
            <BookOpenText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/36">Deduction Limits</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Important numbers to remember</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-white/58">
              These are the key limits beginners usually need to remember before deciding between the two regimes.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {deductionLimits.map((item) => (
            <div key={item.label} className="dashboard-card-hover rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/36">{item.label}</p>
              <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-white/54">{item.note}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default TaxOptimizer;
