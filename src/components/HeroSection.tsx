import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const metrics = [
  { value: "95%", label: "Indians still planning without a clear financial system" },
  { value: "6", label: "Core mentor journeys from FIRE to portfolio X-ray" },
  { value: "10s", label: "To turn uploaded statements into guided analysis" },
];

const heroSlides = [
  {
    title: "Financial confidence starts with visible clarity",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Tax-ready workflows for smarter year-round decisions",
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Portfolio reviews designed like a premium private dashboard",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Make life-event planning feel guided, not overwhelming",
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80",
  },
];

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-32">
      <div className="absolute inset-0 hero-glow opacity-90" />
      <div className="absolute inset-0 soft-grid opacity-20" />
      <div className="aurora-bg absolute inset-0 opacity-65" />

      <div className="section-shell relative z-10">
        <div className="glass-panel rounded-[34px] border-violet-soft bg-deep-night px-6 py-8 shadow-[0_34px_120px_rgba(72,38,138,0.34)] sm:px-8 lg:px-10 lg:py-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="violet-pill mb-6 gap-2">
                <Sparkles className="h-3.5 w-3.5 text-violet-200" />
                AI Money Mentor for everyday Indian savers
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl lg:text-[64px]">
                Turn confused savers into
                <span className="headline-serif ml-3 text-[1.06em] text-[#f2ddff]">confident investors</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-white/68 sm:text-lg">
                AI Money Mentor brings financial planning into one guided workspace with FIRE planning, money health
                scoring, life-event advice, tax guidance, and portfolio X-ray flows that feel as simple as messaging.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link to="/login" className="primary-button gap-2">
                  Start Planning
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="#about" className="secondary-button">
                  See What It Solves
                </a>
              </div>

              <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <motion.div
                    key={metric.label}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(168,98,255,0.03))] px-4 py-5 shadow-[0_16px_50px_rgba(35,20,66,0.24)] hover:border-violet-200/18 hover:shadow-[0_26px_80px_rgba(121,67,243,0.24)]"
                  >
                    <div className="text-2xl font-extrabold text-shimmer">{metric.value}</div>
                    <div className="mt-1 text-sm leading-6 text-white/58">{metric.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative min-h-[420px] lg:min-h-[460px]"
            >
              <div className="absolute inset-0 ambient-gradient rounded-[34px] opacity-70 blur-3xl" />
              <div className="absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_18%_20%,rgba(228,162,255,0.12),transparent_20%),radial-gradient(circle_at_78%_18%,rgba(131,89,255,0.14),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(159,77,255,0.18),transparent_28%)]" />
              <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/22 blur-3xl" />

              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="relative mx-auto max-w-[540px] overflow-hidden rounded-[34px] border border-violet-200/14 bg-[linear-gradient(180deg,rgba(31,20,48,0.96),rgba(15,10,26,0.98))] p-4 shadow-[0_34px_110px_rgba(71,39,138,0.42)] hover:border-violet-200/24 hover:shadow-[0_40px_130px_rgba(116,65,230,0.48)]"
              >
                <div className="absolute inset-x-12 top-0 h-24 bg-violet-200/14 blur-3xl" />
                <div className="absolute inset-x-10 bottom-0 h-24 bg-violet-500/16 blur-3xl" />
                <div className="absolute right-6 top-6 h-20 w-20 rounded-full bg-fuchsia-400/10 blur-2xl" />

                <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-black/20">
                  <motion.div
                    animate={{ x: `-${currentSlide * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex"
                  >
                    {heroSlides.map((slide) => (
                      <motion.div
                        key={slide.title}
                        whileHover={{ scale: 1.01 }}
                        className="w-full shrink-0"
                      >
                        <div className="flex aspect-[16/10] items-center justify-center bg-[radial-gradient(circle_at_50%_50%,rgba(163,102,255,0.12),rgba(10,8,16,0.95)_76%)] p-5">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="h-full w-full rounded-[20px] object-contain shadow-[0_24px_70px_rgba(0,0,0,0.42)] transition-all duration-500 hover:shadow-[0_28px_80px_rgba(126,70,255,0.26)]"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="flex gap-2">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.title}
                        type="button"
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "w-10 bg-[linear-gradient(90deg,#efcfff_0%,#c18cff_50%,#8e52ff_100%)] shadow-[0_10px_24px_rgba(141,82,255,0.34)]"
                            : "w-2.5 bg-white/20 hover:bg-white/40"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-white/55">{heroSlides[currentSlide].title}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
