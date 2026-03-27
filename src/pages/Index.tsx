import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BriefcaseBusiness, HeartPulse, Landmark, ReceiptIndianRupee, Target } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { FeaturesSlider } from "@/components/FeaturesSlider";

const coreFeatures = [
  {
    icon: Landmark,
    title: "FIRE path planning",
    description: "Convert salary, expenses, and goals into a long-range independence roadmap with monthly direction.",
  },
  {
    icon: HeartPulse,
    title: "Money health scoring",
    description: "Understand preparedness across emergency funds, insurance, debt, tax efficiency, and retirement.",
  },
  {
    icon: ReceiptIndianRupee,
    title: "Tax optimization",
    description: "Compare old and new regimes, uncover missed deductions, and prioritize better tax-saving actions.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Life-event guidance",
    description: "Get tailored financial advice around bonus, inheritance, marriage, children, and major decisions.",
  },
];

const aboutHighlights = [
  "Built for the 95% of Indians who do not yet have a clear financial plan",
  "Turns complex planning into conversational, guided decisions",
  "Supports FIRE, tax, portfolio, and life-event advice in one mentor experience",
  "Keeps home, features, login, signup, and forgot-password flows aligned in one premium UI",
];

const partnerMarks = ["FIRE Planner", "Money Health", "Tax Wizard", "Life Events", "Portfolio X-Ray", "Couple Planner"];

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="aurora-bg absolute inset-0 opacity-90" />
      <div className="absolute inset-0 soft-grid opacity-15" />
      <div className="ambient-gradient absolute inset-x-0 top-0 h-[420px] opacity-70 blur-3xl" />

      <nav className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="section-shell">
          <div className="glass-panel flex items-center justify-between rounded-full border-violet-soft px-5 py-3 transition-all duration-500 hover:border-violet-200/25 hover:bg-white/[0.06]">
            <Link to="/" className="flex items-center gap-3 text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-300/12 text-violet-100">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/42">AI Money Mentor</div>
                <div className="text-sm text-white/72">Personal Finance Mentor for India</div>
              </div>
            </Link>

            <div className="hidden items-center gap-7 text-sm text-white/60 lg:flex">
              <a href="#hero" className="transition-colors hover:text-white">Home</a>
              <a href="#about" className="transition-colors hover:text-white">About</a>
              <a href="#features" className="transition-colors hover:text-white">Features</a>
              <a href="#contact" className="transition-colors hover:text-white">Contact</a>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/login" className="hidden text-sm font-medium text-white/68 transition-colors hover:text-white sm:inline-flex">
                Login
              </Link>
              <Link to="/login" className="primary-button px-5 py-2.5 text-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div id="hero">
        <HeroSection />
      </div>

      <section className="px-4 pb-6 sm:px-6 lg:px-8">
        <div className="section-shell">
          <div className="glass-panel flex flex-wrap items-center justify-between gap-5 rounded-[30px] border-violet-soft px-6 py-5 text-white/40">
            {partnerMarks.map((partner) => (
              <span
                key={partner}
                className="rounded-full border border-transparent px-3 py-2 text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:border-violet-200/15 hover:bg-white/[0.05] hover:text-white/70"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
              className="glass-panel rounded-[34px] border-violet-soft p-7 sm:p-9 lg:p-10"
            >
              <p className="violet-pill">About AI Money Mentor</p>
              <h2 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Financial planning that feels
                <span className="headline-serif ml-2 text-[#f1ddff]">accessible and actionable</span>
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
                AI Money Mentor is designed to make financial planning as accessible as checking WhatsApp. Instead of
                generic dashboards, it guides users through the exact problems they need help solving.
              </p>

              <div className="mt-8 grid gap-4">
                {aboutHighlights.map((item) => (
                  <div key={item} className="interactive-card rounded-[22px] border border-white/10 bg-white/[0.03] px-5 py-4 text-white/72">
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/login" className="primary-button gap-2">
                  Launch Mentor
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#features" className="secondary-button">
                  View Journeys
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="glass-panel interactive-card rounded-[34px] border-violet-soft p-5 sm:p-6"
            >
              <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-violet-surface">
                <div className="absolute inset-x-0 top-0 h-24 bg-violet-300/14 blur-3xl" />
                <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
                  <div className="rounded-[24px] border border-white/10 bg-black/25 p-5 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/38">Problem statement</p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">From confusion to confident investing</h3>
                      </div>
                      <span className="rounded-full border border-violet-200/20 bg-violet-300/10 px-3 py-1 text-xs text-white/70">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/38">Advisory cost</p>
                    <p className="mt-3 text-3xl font-bold text-shimmer">₹25,000+</p>
                    <p className="mt-2 text-sm text-white/52">Typical annual access to a traditional financial advisor.</p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/38">Current reach</p>
                    <p className="mt-3 text-3xl font-bold text-shimmer">HNIs only</p>
                    <p className="mt-2 text-sm text-white/52">Professional advice still misses most aspiring savers.</p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-black/25 p-5 sm:col-span-2">
                    <div className="flex items-end gap-3">
                      {[36, 48, 60, 72, 84, 96].map((height, index) => (
                        <div key={height} className="flex flex-1 flex-col items-center gap-3">
                          <div
                            className={`w-full rounded-t-full bg-[linear-gradient(180deg,rgba(227,198,255,0.95),rgba(137,76,255,0.95))] ${
                              index % 2 === 0 ? "opacity-85" : "opacity-60"
                            }`}
                            style={{ height }}
                          />
                          <span className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                            {["FIRE", "Health", "Tax", "Life", "Couple", "X-Ray"][index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <FeaturesSlider />

      <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-20">
        <div className="section-shell">
          <div className="mb-10 max-w-2xl">
            <p className="violet-pill">Core Capabilities</p>
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Built around the exact journeys a
              <span className="headline-serif ml-2 text-[#f1ddff]">personal finance mentor</span>
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {coreFeatures.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="glass-panel interactive-card rounded-[28px] border-violet-soft p-6"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-violet-300/12 text-violet-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/58">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
        <div className="section-shell">
          <div className="glass-panel rounded-[34px] border-violet-soft px-6 py-10 text-center sm:px-10 lg:py-14">
            <p className="violet-pill justify-center">Ready to Start</p>
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Put professional planning tools into a
              <span className="headline-serif ml-2 text-[#f0ddff]">single guided experience</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              AI Money Mentor now reads and presents like the product in your brief, while keeping the darker premium
              UI direction you wanted from the references.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/login" className="primary-button gap-2">
                Continue to Login
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#hero" className="secondary-button">
                Back to top
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
