import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LoaderCircle, RefreshCcw, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const manualSections = [
  {
    title: "1. Salary / Income",
    fields: [
      { key: "grossSalary", label: "Gross Salary", placeholder: "1500000" },
      { key: "basicSalary", label: "Basic Salary", placeholder: "600000" },
      { key: "hraReceived", label: "HRA Received", placeholder: "240000" },
      { key: "rentPaid", label: "Rent Paid", placeholder: "300000" },
    ],
  },
  {
    title: "2. Taxes Paid",
    fields: [{ key: "tdsDeducted", label: "TDS Deducted", placeholder: "85000" }],
  },
  {
    title: "4. Tax Deductions",
    fields: [
      { key: "investments80c", label: "80C Investments", placeholder: "150000" },
      { key: "healthInsurance80d", label: "Health Insurance (80D)", placeholder: "25000" },
      { key: "nps80ccd1b", label: "NPS (80CCD(1B))", placeholder: "50000" },
      { key: "homeLoanInterest", label: "Home Loan Interest (Section 24)", placeholder: "200000" },
      { key: "educationLoanInterest", label: "Education Loan Interest (80E)", placeholder: "0" },
      { key: "donations80g", label: "Donations (80G)", placeholder: "10000" },
      { key: "professionalTax", label: "Professional Tax", placeholder: "2500" },
    ],
  },
  {
    title: "5. Other Income",
    fields: [
      { key: "interestIncome", label: "Interest Income", placeholder: "12000" },
      { key: "dividendIncome", label: "Dividend Income", placeholder: "8000" },
      { key: "stockStcg", label: "Stock STCG", placeholder: "25000" },
      { key: "stockLtcg", label: "Stock LTCG", placeholder: "40000" },
      { key: "otherIncome", label: "Other Income", placeholder: "15000" },
    ],
  },
] as const;

const createManualForm = () => ({
  grossSalary: "",
  basicSalary: "",
  hraReceived: "",
  rentPaid: "",
  tdsDeducted: "",
  investments80c: "",
  healthInsurance80d: "",
  nps80ccd1b: "",
  homeLoanInterest: "",
  educationLoanInterest: "",
  donations80g: "",
  professionalTax: "",
  interestIncome: "",
  dividendIncome: "",
  stockStcg: "",
  stockLtcg: "",
  otherIncome: "",
});

const AIAnalysis = () => {
  const [mode, setMode] = useState("manual");
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const [manualCityType, setManualCityType] = useState("");
  const [manualRiskAppetite, setManualRiskAppetite] = useState("");
  const [uploadAge, setUploadAge] = useState("");
  const [uploadCityType, setUploadCityType] = useState("");
  const [uploadRiskAppetite, setUploadRiskAppetite] = useState("");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState(createManualForm);

  useEffect(() => {
    if (!isAnalyzing) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsAnalyzing(false);
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [isAnalyzing]);

  const handleAnalyze = () => {
    if (mode === "manual") {
      const hasEmptyManualField = Object.values(form).some((value) => !value.trim());

      if (hasEmptyManualField || !manualCityType || !manualRiskAppetite) {
        toast({
          title: "Missing fields",
          description: "All manual input fields, City Type, and Investment Risk Appetite are mandatory.",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!selectedFile || !uploadCityType || !uploadRiskAppetite) {
        toast({
          title: "Missing fields",
          description: "Upload a document and complete Risk Appetite and City Type before analysis.",
          variant: "destructive",
        });
        return;
      }
    }

    setShowResults(true);
    setIsAnalyzing(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setIsAnalyzing(false);
    setSelectedFile("");
    setManualCityType("");
    setManualRiskAppetite("");
    setUploadAge("");
    setUploadCityType("");
    setUploadRiskAppetite("");
    setForm(createManualForm());

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const results = {
    healthScore: 72,
    monthlySavings: "Rs 75,000",
    investmentAllocation: "60% Equity, 25% Debt, 15% Gold",
    riskProfile:
      (mode === "manual" ? manualRiskAppetite : uploadRiskAppetite) === "high"
        ? "Aggressive"
        : (mode === "manual" ? manualRiskAppetite : uploadRiskAppetite) === "low"
          ? "Conservative"
          : "Balanced",
    emergencyFund: "4.2 months",
    insuranceGap: "Rs 1Cr cover recommended",
  };

  const recommendations = [
    { title: "SIP Suggestion", text: "Start Rs 15,000/month SIP in Nifty 50 index fund for long-term growth." },
    { title: "Tax Saving", text: "Invest Rs 1.5L in ELSS to save up to Rs 46,800 under Section 80C." },
    { title: "Expense Optimization", text: "Reduce discretionary spend by 15% to boost savings rate to 40%." },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="dashboard-card rounded-[24px] p-6"
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/36">Input Mode</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">AI Financial Analysis</h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="dashboard-pill rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em]">Live</div>
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="rounded-full border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          <Tabs value={mode} onValueChange={setMode}>
            <div className="mb-6 flex items-center justify-between gap-4">
              <TabsList className="h-auto rounded-full bg-white/[0.04] p-1">
                <TabsTrigger value="manual" className="rounded-full px-4 py-2">Manual Input</TabsTrigger>
                <TabsTrigger value="upload" className="rounded-full px-4 py-2">File Upload</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="manual" className="space-y-6">
              {manualSections.map((section) => (
                <div key={section.title} className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-violet-100/82">{section.title}</p>
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {section.fields.map((field) => (
                      <div key={field.key} className="space-y-2">
                        <Label className="text-white/72">
                          {field.label} <span className="text-violet-200">*</span>
                        </Label>
                        <Input
                          type="number"
                          placeholder={field.placeholder}
                          value={form[field.key]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          className="rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/24"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-violet-100/82">3. Investment Profile</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-white/72">
                      City Type <span className="text-violet-200">*</span>
                    </Label>
                    <Select value={manualCityType} onValueChange={setManualCityType}>
                      <SelectTrigger className="rounded-2xl border-white/10 bg-white/[0.04] text-white">
                        <SelectValue placeholder="Select city type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metro">Metro</SelectItem>
                        <SelectItem value="non-metro">Non-Metro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/72">
                      Investment Risk Appetite <span className="text-violet-200">*</span>
                    </Label>
                    <Select value={manualRiskAppetite} onValueChange={setManualRiskAppetite}>
                      <SelectTrigger className="rounded-2xl border-white/10 bg-white/[0.04] text-white">
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-6">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-violet-100/82">Upload Requirements</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label className="text-white/72">Age</Label>
                    <Input
                      type="number"
                      placeholder="28"
                      value={uploadAge}
                      onChange={(e) => setUploadAge(e.target.value)}
                      className="rounded-2xl border-white/10 bg-white/[0.04] text-white placeholder:text-white/24"
                    />
                    <p className="text-xs text-white/34">Optional for upload-based analysis.</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/72">
                      Risk Appetite <span className="text-violet-200">*</span>
                    </Label>
                    <Select value={uploadRiskAppetite} onValueChange={setUploadRiskAppetite}>
                      <SelectTrigger className="rounded-2xl border-white/10 bg-white/[0.04] text-white">
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/72">
                      City Type <span className="text-violet-200">*</span>
                    </Label>
                    <Select value={uploadCityType} onValueChange={setUploadCityType}>
                      <SelectTrigger className="rounded-2xl border-white/10 bg-white/[0.04] text-white">
                        <SelectValue placeholder="Select city type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metro">Metro</SelectItem>
                        <SelectItem value="non-metro">Non-Metro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="rounded-[24px] border border-dashed border-white/14 bg-white/[0.03] p-10 text-center">
                <Upload className="mx-auto mb-3 h-10 w-10 text-violet-200/70" />
                <p className="text-white/72">Upload Form-16 / Financial Document (PDF)</p>
                <p className="mt-1 text-sm text-white/38">PDF documents only for upload analysis</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setSelectedFile(file?.name ?? "");
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 rounded-full border-white/12 bg-white/[0.04] text-white"
                >
                  Browse PDF
                </Button>
                <p className="mt-3 text-sm text-violet-100/72">
                  {selectedFile ? `Selected: ${selectedFile}` : "No file selected yet"}
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <Button onClick={handleAnalyze} disabled={isAnalyzing} className="primary-button mt-6 rounded-full px-8 disabled:opacity-70">
            {isAnalyzing ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            {isAnalyzing ? "Analyzing..." : "Analyze My Finances"}
          </Button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="dashboard-card rounded-[24px] p-6"
        >
          <p className="text-xs uppercase tracking-[0.22em] text-white/36">Live Overview</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Financial Health Score</h3>

          {showResults ? (
            <div className="mt-6 space-y-6">
              {isAnalyzing ? (
                <div className="space-y-4">
                  <div className="rounded-[22px] border border-violet-200/12 bg-[linear-gradient(135deg,rgba(142,90,255,0.12),rgba(255,255,255,0.03))] p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(205,154,255,0.95),rgba(127,82,255,0.75))] shadow-[0_18px_40px_rgba(127,82,255,0.28)]">
                        <LoaderCircle className="h-5 w-5 animate-spin text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Running AI financial analysis</p>
                        <p className="text-sm text-white/48">Evaluating savings, risk profile, tax posture, and portfolio signals.</p>
                      </div>
                    </div>
                    <Progress value={68} className="mt-5 h-3 bg-white/10" />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                        <div className="h-3 w-24 rounded-full bg-white/10" />
                        <div className="mt-4 h-7 w-32 rounded-full bg-white/8" />
                        <div className="mt-3 h-3 w-full rounded-full bg-white/5" />
                        <div className="mt-2 h-3 w-4/5 rounded-full bg-white/5" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div className="dashboard-card-hover rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-white/58">Current score</p>
                      <span className="text-4xl font-bold text-shimmer">{results.healthScore}</span>
                    </div>
                    <Progress value={results.healthScore} className="h-3 bg-white/10" />
                    <p className="mt-3 text-sm text-white/46">Good room for improvement across protection and emergency readiness.</p>
                  </div>

                  <div className="grid gap-3">
                    {[
                      ["Monthly Savings", results.monthlySavings],
                      ["Investment Allocation", results.investmentAllocation],
                      ["Risk Profile", results.riskProfile],
                      ["Emergency Fund", results.emergencyFund],
                      ["Insurance Gap", results.insuranceGap],
                    ].map(([label, value]) => (
                      <div key={label} className="dashboard-card-hover rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-white/36">{label}</p>
                        <p className="mt-2 text-sm leading-6 text-white/78">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(135,84,255,0.18),rgba(255,255,255,0.03))] p-5">
                    <p className="mb-3 text-lg font-semibold text-white">AI Recommendations</p>
                    <div className="space-y-3">
                      {recommendations.map((rec) => (
                        <div key={rec.title} className="rounded-[18px] border border-white/8 bg-black/20 p-4">
                          <div className="text-sm font-semibold text-violet-200">{rec.title}</div>
                          <div className="mt-1 text-sm leading-6 text-white/62">{rec.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="mt-8 rounded-[24px] border border-dashed border-white/12 bg-white/[0.03] p-10 text-center text-white/42">
              Run an analysis to populate this insight panel.
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default AIAnalysis;
