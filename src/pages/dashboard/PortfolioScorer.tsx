import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart as PieIcon, Upload, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const sectorData = [
  { name: "Large Cap", value: 35, color: "#a873ff" },
  { name: "Mid Cap", value: 25, color: "#7f58f2" },
  { name: "Small Cap", value: 15, color: "#5ed8cf" },
  { name: "Debt", value: 15, color: "#7d7f92" },
  { name: "International", value: 10, color: "#d48cff" },
];

const benchmarkData = [
  { name: "Current", returns: 14.2, benchmark: 12.5 },
  { name: "1Y", returns: 18.5, benchmark: 15.2 },
  { name: "3Y", returns: 12.8, benchmark: 11.1 },
  { name: "5Y", returns: 14.2, benchmark: 12.5 },
];

const PortfolioScorer = () => {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="space-y-6">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-card rounded-[24px] p-6"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/36">Portfolio Workspace</p>
            <h1 className="mt-2 flex items-center gap-3 text-3xl font-semibold text-white">
              <PieIcon className="h-7 w-7 text-violet-200" />
              Portfolio Scorer
            </h1>
            <p className="mt-2 text-white/54">Analyze your mutual fund portfolio's performance and diversification.</p>
          </div>
          <div className="dashboard-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">Active Review</div>
        </div>

        <Tabs defaultValue="upload">
          <TabsList className="mb-6 h-auto rounded-full bg-white/[0.04] p-1">
            <TabsTrigger value="upload" className="rounded-full px-4 py-2">Upload CAMS</TabsTrigger>
            <TabsTrigger value="manual" className="rounded-full px-4 py-2">Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <div className="rounded-[24px] border border-dashed border-white/14 bg-white/[0.03] p-10 text-center">
              <Upload className="mx-auto mb-3 h-10 w-10 text-white/44" />
              <p className="text-white/72">Upload your CAMS or portfolio statement</p>
              <Button variant="outline" size="sm" className="mt-4 rounded-full border-white/12 bg-white/[0.04] text-white">
                Browse Files
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {["Fund Name", "Amount Invested (Rs)", "Current Value (Rs)", "Investment Date"].map((f) => (
                <div key={f} className="space-y-2">
                  <Label className="text-white/72">{f}</Label>
                  <Input placeholder={f} className="rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/24" />
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="rounded-full border-white/12 bg-white/[0.04] text-white">
              + Add Another Fund
            </Button>
          </TabsContent>
        </Tabs>

        <Button onClick={() => setShowResults(true)} className="primary-button mt-6 rounded-full px-8">
          <TrendingUp className="mr-2 h-4 w-4" /> Score My Portfolio
        </Button>
      </motion.section>

      {showResults && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "XIRR", value: "14.2%", color: "text-emerald-300" },
              { title: "Expense Ratio Drag", value: "0.8%", color: "text-violet-200" },
              { title: "Diversification Score", value: "78/100", color: "text-cyan-300" },
              { title: "Risk Exposure", value: "Moderate", color: "text-white" },
            ].map((m) => (
              <div key={m.title} className="dashboard-card dashboard-card-hover rounded-[22px] p-5 text-center">
                <p className="text-xs uppercase tracking-[0.18em] text-white/36">{m.title}</p>
                <p className={`mt-3 text-3xl font-semibold ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="dashboard-card rounded-[24px] p-6">
              <p className="mb-5 text-xl font-semibold text-white">Sector Allocation</p>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={sectorData} cx="50%" cy="50%" innerRadius={54} outerRadius={92} dataKey="value" stroke="none">
                    {sectorData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#120d1b",
                      border: "1px solid rgba(214,186,255,0.14)",
                      borderRadius: "14px",
                      color: "white",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 flex flex-wrap gap-3">
                {sectorData.map((s) => (
                  <div key={s.name} className="dashboard-pill rounded-full px-3 py-2 text-xs">
                    {s.name} ({s.value}%)
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card rounded-[24px] p-6">
              <p className="mb-5 text-xl font-semibold text-white">Benchmark Comparison</p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={benchmarkData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.58)", fontSize: 12 }} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.58)", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#120d1b",
                      border: "1px solid rgba(214,186,255,0.14)",
                      borderRadius: "14px",
                      color: "white",
                    }}
                  />
                  <Bar dataKey="returns" name="Your Returns" fill="#a873ff" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="benchmark" name="Benchmark" fill="#4ed6c7" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="dashboard-card rounded-[24px] p-6">
            <div className="mb-4 flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5 text-violet-200" />
              <p className="text-xl font-semibold">Rebalancing Suggestions</p>
            </div>
            <div className="grid gap-3">
              {[
                "Reduce large-cap exposure by 5% and increase international allocation for better diversification.",
                "Consider switching from regular to direct plans to save 0.5-1% in expense ratios annually.",
                "Add a debt allocation of 20% for stability if retirement is within 10 years.",
              ].map((s, i) => (
                <div key={i} className="dashboard-card-hover rounded-[18px] border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/62">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioScorer;
