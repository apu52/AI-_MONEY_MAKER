import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FileText, LoaderCircle, RefreshCcw, Sparkles, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type ManualFormState = ReturnType<typeof createManualForm>;

type ApiAnalysisResult = {
  success: boolean;
  total_income: number;
  old_tax: number;
  new_tax: number;
  better: "Old Regime" | "New Regime" | string;
  savings: number;
  missed_opportunities?: string[];
  investment_advice?: string[];
  ai_advice?: string;
  extracted_data?: Record<string, unknown>;
  message?: string;
};

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

const BASE_URL = import.meta.env.VITE_BASE_URL?.trim().replace(/\/+$/, "") ?? "";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const formatRiskLabel = (risk: string) => {
  if (risk === "low") return "Low";
  if (risk === "medium") return "Medium";
  if (risk === "high") return "High";
  return risk;
};

const toRiskEnum = (risk: string) => {
  if (risk === "low") return "Low";
  if (risk === "high") return "High";
  return "Medium";
};

const toNumber = (value: string) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();
    return data?.message || data?.error || "Something went wrong while running the analysis.";
  } catch {
    return "Something went wrong while running the analysis.";
  }
};

const AIAnalysis = () => {
  const [mode, setMode] = useState("manual");
  const [showResults, setShowResults] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState("");
  const [manualCityType, setManualCityType] = useState("");
  const [manualRiskAppetite, setManualRiskAppetite] = useState("");
  const [uploadAge, setUploadAge] = useState("");
  const [uploadCityType, setUploadCityType] = useState("");
  const [uploadRiskAppetite, setUploadRiskAppetite] = useState("");
  const [form, setForm] = useState<ManualFormState>(createManualForm);
  const [result, setResult] = useState<ApiAnalysisResult | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (selectedFileUrl) {
      URL.revokeObjectURL(selectedFileUrl);
      setSelectedFileUrl("");
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    return () => {
      if (selectedFileUrl) {
        URL.revokeObjectURL(selectedFileUrl);
      }
    };
  }, [selectedFileUrl]);

  const handleManualAnalyze = async () => {
    const payload = {
      gross_salary: toNumber(form.grossSalary),
      basic_salary: toNumber(form.basicSalary),
      hra_received: toNumber(form.hraReceived),
      rent_paid: toNumber(form.rentPaid),
      city_type: manualCityType,
      tds: toNumber(form.tdsDeducted),
      sec80c: toNumber(form.investments80c),
      sec80d: toNumber(form.healthInsurance80d),
      nps: toNumber(form.nps80ccd1b),
      home_loan_interest: toNumber(form.homeLoanInterest),
      education_loan_interest: toNumber(form.educationLoanInterest),
      donations_80g: toNumber(form.donations80g),
      professional_tax: toNumber(form.professionalTax),
      interest_income: toNumber(form.interestIncome),
      dividend_income: toNumber(form.dividendIncome),
      stock_stcg: toNumber(form.stockStcg),
      stock_ltcg: toNumber(form.stockLtcg),
      other_income: toNumber(form.otherIncome),
      risk: toRiskEnum(manualRiskAppetite),
    };

    const response = await fetch(`${BASE_URL}/analyze/manual`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    return (await response.json()) as ApiAnalysisResult;
  };

  const handleUploadAnalyze = async () => {
    if (!selectedFile) {
      throw new Error("Please upload a PDF before analysis.");
    }

    const payload = new FormData();
    payload.append("file", selectedFile);
    payload.append("risk", toRiskEnum(uploadRiskAppetite));
    payload.append("city_type", uploadCityType);

    if (uploadAge.trim()) {
      payload.append("age", String(toNumber(uploadAge)));
    }

    const response = await fetch(`${BASE_URL}/analyze/upload`, {
      method: "POST",
      body: payload,
    });

    if (!response.ok) {
      throw new Error(await getErrorMessage(response));
    }

    return (await response.json()) as ApiAnalysisResult;
  };

  const handleAnalyze = async () => {
    if (!BASE_URL) {
      toast({
        title: "Missing backend URL",
        description: "Set VITE_BASE_URL in your .env file and restart the Vite app.",
        variant: "destructive",
      });
      return;
    }

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
    } else if (!selectedFile || !uploadCityType || !uploadRiskAppetite) {
      toast({
        title: "Missing fields",
        description: "Upload a document and complete Risk Appetite and City Type before analysis.",
        variant: "destructive",
      });
      return;
    }

    setShowResults(true);
    setIsAnalyzing(true);
    setResult(null);

    try {
      const analysisResult = mode === "manual" ? await handleManualAnalyze() : await handleUploadAnalyze();
      setResult(analysisResult);
      toast({
        title: "Analysis complete",
        description: "Your AI financial analysis has been updated with live backend data.",
      });
    } catch (error) {
      const description = error instanceof Error ? error.message : "Unable to analyze finances right now.";
      toast({
        title: "Analysis failed",
        description,
        variant: "destructive",
      });
      setShowResults(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setShowResults(false);
    setIsAnalyzing(false);
    setResult(null);
    setManualCityType("");
    setManualRiskAppetite("");
    setUploadAge("");
    setUploadCityType("");
    setUploadRiskAppetite("");
    setForm(createManualForm());
    clearSelectedFile();
  };

  const insightCards = result
    ? [
        ["Total Income", formatCurrency(result.total_income)],
        ["Old Regime Tax", formatCurrency(result.old_tax)],
        ["New Regime Tax", formatCurrency(result.new_tax)],
        ["Better Regime", result.better],
        ["Potential Savings", formatCurrency(result.savings)],
        ["Risk Profile", formatRiskLabel(mode === "manual" ? manualRiskAppetite : uploadRiskAppetite)],
      ]
    : [];

  const extractedDataEntries = result?.extracted_data
    ? Object.entries(result.extracted_data).filter(([, value]) => value !== null && value !== undefined && value !== "")
    : [];

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
                <TabsTrigger value="manual" className="rounded-full px-4 py-2">
                  Manual Input
                </TabsTrigger>
                <TabsTrigger value="upload" className="rounded-full px-4 py-2">
                  File Upload
                </TabsTrigger>
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
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;

                    if (file && file.type && file.type !== "application/pdf") {
                      toast({
                        title: "Invalid file",
                        description: "Please upload a PDF document only.",
                        variant: "destructive",
                      });
                      event.target.value = "";
                      return;
                    }

                    setSelectedFile(file);
                    if (selectedFileUrl) {
                      URL.revokeObjectURL(selectedFileUrl);
                    }
                    setSelectedFileUrl(file ? URL.createObjectURL(file) : "");
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
                {selectedFile ? (
                  <div className="mx-auto mt-5 max-w-sm rounded-[20px] border border-white/10 bg-white/[0.04] p-4 text-left">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-400/16 text-violet-100">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">PDF Ready</p>
                          <p className="mt-1 max-w-[220px] truncate text-sm text-violet-100/72">{selectedFile.name}</p>
                          <p className="mt-1 text-xs text-white/38">Small PDF preview</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={clearSelectedFile}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-colors hover:bg-rose-500/14 hover:text-rose-200"
                        aria-label="Remove selected PDF"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    {selectedFileUrl && (
                      <div className="mt-4 overflow-hidden rounded-[16px] border border-white/10 bg-white">
                        <iframe
                          src={`${selectedFileUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                          title="Uploaded PDF preview"
                          className="h-44 w-full"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-violet-100/72">No file selected yet</p>
                )}
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
                        <p className="text-sm text-white/48">Sending data to the backend and preparing tax insights.</p>
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
              ) : result ? (
                <>
                  <div className="dashboard-card-hover rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="text-white/58">Recommended tax regime</p>
                      <span className="text-right text-3xl font-bold text-shimmer">{result.better}</span>
                    </div>
                    <Progress value={result.new_tax <= result.old_tax ? 100 : 65} className="h-3 bg-white/10" />
                    <p className="mt-3 text-sm text-white/46">
                      Estimated savings opportunity: {formatCurrency(result.savings)}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {insightCards.map(([label, value]) => (
                      <div key={label} className="dashboard-card-hover rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-white/36">{label}</p>
                        <p className="mt-2 text-sm leading-6 text-white/78">{value}</p>
                      </div>
                    ))}
                  </div>

                  {!!result.missed_opportunities?.length && (
                    <div className="rounded-[22px] border border-amber-200/12 bg-[linear-gradient(135deg,rgba(245,158,11,0.12),rgba(255,255,255,0.03))] p-5">
                      <p className="mb-3 text-lg font-semibold text-white">Missed Opportunities</p>
                      <div className="space-y-3">
                        {result.missed_opportunities.map((item) => (
                          <div key={item} className="rounded-[18px] border border-white/8 bg-black/20 p-4 text-sm leading-6 text-white/70">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(135,84,255,0.18),rgba(255,255,255,0.03))] p-5">
                    <p className="mb-3 text-lg font-semibold text-white">AI Recommendations</p>
                    <div className="space-y-3">
                      {result.investment_advice?.map((rec) => (
                        <div key={rec} className="rounded-[18px] border border-white/8 bg-black/20 p-4 text-sm leading-6 text-white/62">
                          {rec}
                        </div>
                      ))}
                      {result.ai_advice ? (
                        <div className="rounded-[18px] border border-violet-200/10 bg-black/20 p-4">
                          <div className="text-sm font-semibold text-violet-200">AI Advice</div>
                          <div className="mt-1 text-sm leading-6 text-white/68">{result.ai_advice}</div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {mode === "upload" && extractedDataEntries.length > 0 ? (
                    <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                      <p className="mb-3 text-lg font-semibold text-white">Extracted Data</p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {extractedDataEntries.map(([key, value]) => (
                          <div key={key} className="rounded-[18px] border border-white/8 bg-black/20 p-4">
                            <p className="text-xs uppercase tracking-[0.18em] text-white/36">
                              {key.replace(/_/g, " ")}
                            </p>
                            <p className="mt-2 break-words text-sm leading-6 text-white/72">{String(value)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="rounded-[24px] border border-dashed border-white/12 bg-white/[0.03] p-8 text-center text-white/42">
                  No analysis data available yet.
                </div>
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
