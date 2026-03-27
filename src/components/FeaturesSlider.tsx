import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, HeartPulse, Pause, PiggyBank, Play, ReceiptIndianRupee, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";

const featureSlides = [
  {
    id: 1,
    icon: PiggyBank,
    eyebrow: "FIRE Planner",
    cardTitle: "Financial Independence Roadmap",
    title: "Build a month-by-month FIRE plan from your real numbers",
    description:
      "Input age, income, expenses, investments, and goals to get SIP guidance, asset allocation shifts, and emergency fund targets.",
    stat: "Planning horizon",
    value: "20 years",
  },
  {
    id: 2,
    icon: HeartPulse,
    eyebrow: "Health Score",
    cardTitle: "Money Wellness Check",
    title: "See your financial health across six practical dimensions",
    description:
      "Measure emergency preparedness, insurance cover, diversification, debt health, tax efficiency, and retirement readiness in one score.",
    stat: "Assessment areas",
    value: "6",
  },
  {
    id: 3,
    icon: ReceiptIndianRupee,
    eyebrow: "Tax Wizard",
    cardTitle: "Smarter Deduction Discovery",
    title: "Compare old vs new tax regime with personalized savings actions",
    description:
      "Upload Form 16 or salary details to uncover missed deductions, model both regimes, and rank tax-saving moves by liquidity and risk.",
    stat: "Tax scenarios",
    value: "2",
  },
  {
    id: 4,
    icon: WalletCards,
    eyebrow: "Portfolio X-Ray",
    cardTitle: "Fast MF Portfolio Reconstruction",
    title: "Turn CAMS and KFintech statements into portfolio intelligence",
    description:
      "Get XIRR, overlap analysis, expense drag review, benchmark comparisons, and AI-generated rebalancing suggestions in seconds.",
    stat: "Statement to insight",
    value: "10 sec",
  },
];

export const FeaturesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featureSlides.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [autoPlay]);

  const current = featureSlides[currentSlide];
  const Icon = current.icon;

  const goPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + featureSlides.length) % featureSlides.length);
    setAutoPlay(false);
  };

  const goNext = () => {
    setCurrentSlide((prev) => (prev + 1) % featureSlides.length);
    setAutoPlay(false);
  };

  return (
    <section id="features" className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="section-shell">
        <div className="glass-panel overflow-hidden rounded-[34px] border-violet-soft">
          <div className="relative overflow-hidden rounded-[34px] bg-[radial-gradient(circle_at_50%_100%,rgba(197,145,255,0.45),rgba(14,10,22,0.96)_32%),linear-gradient(180deg,#140f1d_0%,#0a0810_82%)] px-6 py-12 sm:px-8 lg:px-12">
            <div className="absolute inset-x-0 bottom-0 h-40 rounded-t-[100%] bg-black/55 blur-sm" />
            <div className="absolute inset-x-10 top-0 h-24 bg-violet-300/15 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <p className="violet-pill justify-center">Mentor Journeys</p>
              <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                The core flows inside
                <span className="headline-serif ml-2 text-[#f0ddff]">AI Money Mentor</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
                Each journey is presented with cleaner headings, more breathing room, and a premium card layout inspired
                by your reference image.
              </p>
            </div>

            <div className="relative z-10 mt-14 grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
              <div className="relative mx-auto flex min-h-[520px] w-full max-w-3xl items-center justify-center overflow-hidden py-6">
                <div className="absolute inset-x-6 bottom-3 h-20 rounded-[100%] bg-violet-300/25 blur-3xl" />
                <div className="absolute left-1/2 top-[84%] h-52 w-[120%] -translate-x-1/2 rounded-[100%] border border-white/10 bg-black/60" />

                <div className="relative z-10 grid w-full max-w-[760px] grid-cols-1 gap-5 md:grid-cols-2">
                  {featureSlides.map((slide, index) => {
                    const SlideIcon = slide.icon;
                    const isActive = index === currentSlide;

                    return (
                      <motion.button
                        key={slide.id}
                        type="button"
                        onClick={() => {
                          setCurrentSlide(index);
                          setAutoPlay(false);
                        }}
                        animate={{
                          y: isActive ? -8 : index % 2 === 0 ? 10 : -6,
                          opacity: isActive ? 1 : 0.84,
                          scale: isActive ? 1 : 0.97,
                        }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className={`flex min-h-[250px] w-full flex-col rounded-[30px] border px-6 py-6 text-left transition-all duration-500 ${
                          isActive
                            ? "border-white/20 bg-white/[0.08] shadow-[0_20px_70px_rgba(169,116,255,0.25)]"
                            : "border-white/8 bg-white/[0.03]"
                        }`}
                      >
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(180deg,rgba(181,125,255,0.42),rgba(83,42,162,0.18))] text-white">
                          <SlideIcon className="h-6 w-6" />
                        </div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/42">{slide.eyebrow}</p>
                        <h3 className="mt-3 text-[34px] font-semibold leading-[1.08] text-white">{slide.cardTitle}</h3>
                        <p className="mt-4 max-w-[26ch] text-base leading-7 text-white/58">{slide.description}</p>
                        <div className="mt-auto pt-6 text-xs uppercase tracking-[0.22em] text-white/36">{slide.stat}</div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="relative z-10 space-y-8 rounded-[30px] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-[22px] bg-violet-400/15 text-violet-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/42">Now showing</p>
                    <p className="mt-1 text-sm font-medium text-white/64">
                      {current.eyebrow} {currentSlide + 1} of {featureSlides.length}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-200/70">{current.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-bold leading-tight text-white">{current.title}</h3>
                  <p className="mt-4 text-base leading-8 text-white/62">{current.description}</p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">{current.stat}</p>
                  <p className="mt-2 text-4xl font-extrabold text-shimmer">{current.value}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    onClick={goPrevious}
                    variant="outline"
                    className="h-11 w-11 rounded-full border-white/12 bg-white/[0.04] p-0 text-white hover:bg-white/[0.08]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={goNext}
                    variant="outline"
                    className="h-11 w-11 rounded-full border-white/12 bg-white/[0.04] p-0 text-white hover:bg-white/[0.08]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setAutoPlay((value) => !value)}
                    variant="outline"
                    className="rounded-full border-white/12 bg-white/[0.04] px-4 text-white hover:bg-white/[0.08]"
                  >
                    {autoPlay ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                    {autoPlay ? "Pause" : "Resume"}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      key={current.id}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: autoPlay ? 4.5 : 0.4, ease: "linear" }}
                      className="h-full rounded-full bg-[linear-gradient(90deg,#efc8ff_0%,#be87ff_55%,#7d49ff_100%)]"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {featureSlides.map((slide, index) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => {
                          setCurrentSlide(index);
                          setAutoPlay(false);
                        }}
                        className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                          index === currentSlide
                            ? "border-violet-200/40 bg-violet-300/15 text-white"
                            : "border-white/10 bg-white/[0.03] text-white/48 hover:text-white/72"
                        }`}
                      >
                        {slide.eyebrow}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
