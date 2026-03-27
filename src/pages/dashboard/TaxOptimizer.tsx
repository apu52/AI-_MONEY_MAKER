import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TaxOptimizer = () => {
  const [salary, setSalary] = useState("");
  const [deductions, setDeductions] = useState("");
  const [investments, setInvestments] = useState("");
  const [showResults, setShowResults] = useState(false);

  const salaryNum = Number(salary) || 0;
  const deductionsNum = Number(deductions) || 0;
  const investmentsNum = Number(investments) || 0;

  const calcOldRegime = () => {
    const taxableIncome = Math.max(0, salaryNum - deductionsNum - investmentsNum - 50000);
    let tax = 0;
    if (taxableIncome > 1000000) tax += (taxableIncome - 1000000) * 0.3;
    if (taxableIncome > 500000) tax += Math.min(taxableIncome - 500000, 500000) * 0.2;
    if (taxableIncome > 250000) tax += Math.min(taxableIncome - 250000, 250000) * 0.05;
    return Math.round(tax + tax * 0.04);
  };

  const calcNewRegime = () => {
    const taxableIncome = Math.max(0, salaryNum - 75000);
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
    let prev = 0;
    for (const slab of slabs) {
      if (taxableIncome <= prev) break;
      const taxable = Math.min(taxableIncome, slab.limit) - prev;
      tax += taxable * slab.rate;
      prev = slab.limit;
    }
    return Math.round(tax + tax * 0.04);
  };

  const oldTax = calcOldRegime();
  const newTax = calcNewRegime();
  const savings = Math.abs(oldTax - newTax);
  const betterRegime = oldTax <= newTax ? "Old Regime" : "New Regime";

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-card rounded-[24px] p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/36">Tax Workspace</p>
            <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white">
              <Calculator className="h-7 w-7 text-violet-200" />
              Tax Optimizer
            </h1>
            <p className="mt-2 text-white/54">Compare old vs new tax regimes and find the best option.</p>
          </div>
          <div className="dashboard-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">FY Planning</div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-white/72">Annual Salary (Rs)</Label>
            <Input type="number" placeholder="1200000" value={salary} onChange={(e) => setSalary(e.target.value)} className="rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/24" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/72">Deductions - 80C, 80D etc. (Rs)</Label>
            <Input type="number" placeholder="200000" value={deductions} onChange={(e) => setDeductions(e.target.value)} className="rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/24" />
          </div>
          <div className="space-y-2">
            <Label className="text-white/72">Other Investments (Rs)</Label>
            <Input type="number" placeholder="50000" value={investments} onChange={(e) => setInvestments(e.target.value)} className="rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/24" />
          </div>
        </div>

        <Button onClick={() => setShowResults(true)} className="primary-button mt-6 rounded-full px-8" disabled={!salary}>
          <Calculator className="mr-2 h-4 w-4" /> Compare Tax Regimes
        </Button>
      </motion.section>

      {showResults && salaryNum > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { title: "Old Regime", tax: oldTax, isBetter: betterRegime === "Old Regime" },
              { title: "New Regime", tax: newTax, isBetter: betterRegime === "New Regime" },
            ].map((r) => (
              <div
                key={r.title}
                className={`dashboard-card dashboard-card-hover rounded-[24px] p-6 ${
                  r.isBetter ? "border-violet-200/18 shadow-[0_28px_80px_rgba(116,65,230,0.22)]" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold text-white">{r.title}</p>
                  {r.isBetter && <span className="rounded-full bg-violet-300/14 px-3 py-1 text-xs uppercase tracking-[0.16em] text-violet-100">Better</span>}
                </div>
                <p className={`mt-5 text-4xl font-semibold ${r.isBetter ? "text-shimmer" : "text-white"}`}>
                  Rs {r.tax.toLocaleString("en-IN")}
                </p>
                <p className="mt-2 text-sm text-white/46">Total tax payable including 4% cess.</p>
              </div>
            ))}
          </div>

          <div className="dashboard-card rounded-[24px] p-6">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="h-9 w-9 shrink-0 text-emerald-300" />
              <div>
                <p className="text-xl font-semibold text-white">
                  {betterRegime} saves you <span className="text-shimmer">Rs {savings.toLocaleString("en-IN")}</span>
                </p>
                <p className="mt-1 text-white/50">Based on your current income and deductions.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="dashboard-card rounded-[24px] p-6"
      >
        <h2 className="text-2xl font-semibold text-white">Understanding Tax Regimes</h2>
        <div className="mt-5 grid gap-4">
          {[
            {
              title: "Old Tax Regime",
              text: "The old tax regime allows deductions like Section 80C, 80D, HRA, LTA, and standard deduction. It works best when you actively use exemptions and deductions.",
            },
            {
              title: "New Tax Regime (FY 2024-25)",
              text: "The new regime offers lower slab rates but removes most deductions. It includes a Rs 75,000 standard deduction and is often better when deductions are limited.",
            },
            {
              title: "Which Should You Choose?",
              text: "If your total deductions exceed roughly Rs 3.75 lakh, the old regime may be better. Otherwise, the new regime may result in lower overall tax.",
            },
          ].map((section) => (
            <div key={section.title} className="dashboard-card-hover rounded-[18px] border border-white/10 bg-white/[0.03] p-4">
              <div className="text-lg font-semibold text-white">{section.title}</div>
              <div className="mt-2 text-sm leading-7 text-white/58">{section.text}</div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default TaxOptimizer;
