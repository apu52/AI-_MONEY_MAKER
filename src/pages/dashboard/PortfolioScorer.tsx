import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calculator, CircleDollarSign, Landmark, SlidersHorizontal, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const formatCurrency = (value: number) => `Rs ${Math.round(value).toLocaleString("en-IN")}`;
const SliderField = ({
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
  helper,
}: {
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  helper: string;
}) => (
  <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-white/72">{label}</span>
      <span className="rounded-xl bg-emerald-300/12 px-4 py-2 text-sm font-semibold text-emerald-200">{valueLabel}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-400"
    />
    <p className="mt-3 text-sm text-white/48">{helper}</p>
  </div>
);

const PortfolioScorer = () => {
  const [mode, setMode] = useState("sip");
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [lumpsumAmount, setLumpsumAmount] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(10);

  const monthlyRate = useMemo(() => {
    if (annualReturn <= 0) return 0;
    return Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
  }, [annualReturn]);

  const sipMaturity = useMemo(() => {
    const months = years * 12;
    if (monthlyInvestment <= 0 || months <= 0) return 0;
    if (monthlyRate === 0) return monthlyInvestment * months;
    return monthlyInvestment * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
  }, [monthlyInvestment, years, monthlyRate]);

  const lumpsumMaturity = useMemo(() => {
    if (lumpsumAmount <= 0 || years <= 0) return 0;
    return lumpsumAmount * Math.pow(1 + annualReturn / 100, years);
  }, [lumpsumAmount, annualReturn, years]);

  const investedAmount = mode === "sip" ? monthlyInvestment * years * 12 : lumpsumAmount;
  const totalValue = mode === "sip" ? sipMaturity : lumpsumMaturity;
  const estimatedReturns = Math.max(0, totalValue - investedAmount);

  const chartData = [
    { name: "Invested amount", value: investedAmount, color: "#8f5eff" },
    { name: "Estimated returns", value: estimatedReturns, color: "#d18cff" },
  ];

  const formulaText =
    mode === "sip"
      ? "M = P x ({[1 + i]^n - 1} / i) x (1 + i)"
      : "A = P x (1 + r)^t";

  const explainerCards =
    mode === "sip"
      ? [
          {
            title: "What this means",
            text: "You invest a fixed amount every month, and each installment gets time to grow with compounding.",
          },
          {
            title: "Why SIP feels powerful",
            text: "Even small monthly investing can build a much larger amount over a long period because returns also earn returns.",
          },
          {
            title: "Important note",
            text: "This is an estimate only. Actual mutual fund returns can move up or down depending on market conditions.",
          },
        ]
      : [
          {
            title: "What this means",
            text: "You invest one amount upfront and let it grow every year using compounding.",
          },
          {
            title: "Why lump sum changes faster",
            text: "The full amount starts compounding from day one, so returns can look stronger when you stay invested longer.",
          },
          {
            title: "Important note",
            text: "This is still an estimate. Real returns depend on the actual investment performance over time.",
          },
        ];

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-card rounded-[24px] p-6"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/36">Compound Interest Workspace</p>
            <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white">
              <Calculator className="h-7 w-7 text-violet-200" />
              Portfolio Calculator
            </h1>
            <p className="mt-2 max-w-3xl text-white/54">
              This is a compound-interest calculator, not a portfolio scoring system. Use it to estimate SIP or lumpsum growth over time.
            </p>
          </div>
          <div className="dashboard-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">Compound Growth</div>
        </div>

        <Tabs value={mode} onValueChange={setMode}>
          <TabsList className="mb-6 h-auto rounded-full bg-white/[0.04] p-1">
            <TabsTrigger value="sip" className="rounded-full px-4 py-2">SIP</TabsTrigger>
            <TabsTrigger value="lumpsum" className="rounded-full px-4 py-2">Lumpsum</TabsTrigger>
          </TabsList>

          <TabsContent value="sip" className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <SliderField
                label="Monthly investment"
                valueLabel={formatCurrency(monthlyInvestment)}
                min={100}
                max={100000}
                step={100}
                value={monthlyInvestment}
                onChange={setMonthlyInvestment}
                helper="Start from Rs 100 and move upward like the Groww-style SIP flow."
              />
              <SliderField
                label="Expected return rate (p.a)"
                valueLabel={`${annualReturn}%`}
                min={1}
                max={30}
                step={0.5}
                value={annualReturn}
                onChange={setAnnualReturn}
                helper="Use the slider to adjust annual return assumptions visually."
              />
              <SliderField
                label="Time period"
                valueLabel={`${years} Yr`}
                min={1}
                max={40}
                step={1}
                value={years}
                onChange={setYears}
                helper="Longer time usually makes compounding work harder."
              />
            </div>
          </TabsContent>

          <TabsContent value="lumpsum" className="space-y-5">
            <div className="grid gap-4 lg:grid-cols-3">
              <SliderField
                label="Total investment"
                valueLabel={formatCurrency(lumpsumAmount)}
                min={500}
                max={10000000}
                step={100}
                value={lumpsumAmount}
                onChange={setLumpsumAmount}
                helper="This is the one-time amount you put in at the beginning. Lumpsum starts from Rs 500 here for consistent Groww-style behavior."
              />
              <SliderField
                label="Expected return rate (p.a)"
                valueLabel={`${annualReturn}%`}
                min={1}
                max={30}
                step={0.5}
                value={annualReturn}
                onChange={setAnnualReturn}
                helper="This updates the compound growth estimate live."
              />
              <SliderField
                label="Time period"
                valueLabel={`${years} Yr`}
                min={1}
                max={40}
                step={1}
                value={years}
                onChange={setYears}
                helper="Compounding becomes more visible as the duration increases."
              />
            </div>
          </TabsContent>
        </Tabs>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.04 }}
        className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]"
      >
        <div className="dashboard-card rounded-[24px] p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-400/16 text-violet-100">
              <SlidersHorizontal className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Live slider-based estimate</p>
              <p className="text-sm text-white/50">Results refresh instantly as you move the controls.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { title: "Invested amount", value: formatCurrency(investedAmount), icon: Landmark },
              { title: "Est. returns", value: formatCurrency(estimatedReturns), icon: TrendingUp },
              { title: "Total value", value: formatCurrency(totalValue), icon: CircleDollarSign },
            ].map((item) => (
              <div key={item.title} className="dashboard-card-hover rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                <item.icon className="h-5 w-5 text-violet-200" />
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-white/36">{item.title}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[24px] border border-violet-200/12 bg-[linear-gradient(135deg,rgba(137,84,255,0.14),rgba(255,255,255,0.03))] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-white/38">Formula used</p>
            <p className="mt-3 text-2xl font-semibold text-white">{formulaText}</p>
            <p className="mt-3 text-sm leading-7 text-white/58">
              {mode === "sip"
                ? "For SIP, the monthly return is derived from the annual return and then compounded across all monthly installments."
                : "For lumpsum, the one-time principal grows annually using the expected return rate and investment duration."}
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {explainerCards.map((card) => (
              <div key={card.title} className="rounded-[18px] border border-white/10 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-violet-100">{card.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/58">{card.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card rounded-[24px] p-6">
          <p className="text-xl font-semibold text-white">{mode === "sip" ? "Growth breakdown" : "Maturity breakdown"}</p>
          <div className="mt-5 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={72} outerRadius={110} dataKey="value" stroke="none">
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "#120d1b",
                    border: "1px solid rgba(214,186,255,0.14)",
                    borderRadius: "14px",
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 flex flex-wrap gap-3">
            {chartData.map((item) => (
              <div key={item.name} className="dashboard-pill rounded-full px-3 py-2 text-xs">
                {item.name}: {formatCurrency(item.value)}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-[20px] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm font-semibold text-white">How to read this</p>
            <p className="mt-2 text-sm leading-7 text-white/58">
              The chart splits your final value into the money you put in and the estimated wealth created by compounding. A longer time period usually increases the returns share.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="dashboard-card rounded-[24px] p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/36">Clarification</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Why this is not a portfolio scoring system</h2>
          </div>
          <Button variant="outline" className="rounded-full border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]">
            Compound interest only
          </Button>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {[
            "This page only estimates growth using compound interest formulas for SIP and lumpsum investing.",
            "Portfolio scoring is intentionally not implemented right now because it needs multiple parameters, advanced logic, and specialized storage/services.",
            "Use this calculator to understand potential growth, not diversification quality, risk score, or portfolio health.",
          ].map((text, index) => (
            <div key={index} className="dashboard-card-hover rounded-[20px] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/58">
              {text}
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default PortfolioScorer;
