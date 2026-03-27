import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const workspaceTabs = ["FIRE Planner", "Health Score", "Tax Wizard", "Portfolio X-Ray"];
const supportActions = ["Upload Form 16", "Plan retirement", "Review portfolio", "Life-event advice"];

const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "login") {
        toast({ title: "Welcome back", description: "Opening AI Money Mentor..." });
        setTimeout(() => navigate("/dashboard/analysis"), 500);
      } else if (mode === "signup") {
        toast({ title: "Account created", description: "Your mentor workspace is ready." });
        setMode("login");
      } else {
        toast({ title: "Reset link sent", description: "Please check your inbox." });
        setMode("login");
      }
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const title =
    mode === "login" ? "Welcome back" : mode === "signup" ? "Create your AI Money Mentor account" : "Reset your password";
  const subtitle =
    mode === "login"
      ? "Continue with guided planning for FIRE, taxes, portfolio health, and life-event decisions."
      : mode === "signup"
        ? "Open your personal finance mentor and start building a clearer financial future."
        : "Enter your email and we will send a secure reset link right away.";

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[0.84fr_1.16fr]">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-[30px] border-violet-soft p-7 sm:p-8"
      >
        <div className="mb-8">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-300/12 text-violet-100">
            <ShieldCheck className="h-7 w-7" />
          </div>
          <h2 className="text-3xl font-bold leading-tight text-white">{title}</h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/58">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm text-white/72">
                Full name
              </Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aarav Kapoor"
                  required
                  className="h-[52px] rounded-2xl border-white/10 bg-white/[0.03] pl-11 text-white placeholder:text-white/28 focus-visible:ring-violet-300/40"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-white/72">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@aimoneymentor.ai"
                required
                className="h-[52px] rounded-2xl border-white/10 bg-white/[0.03] pl-11 text-white placeholder:text-white/28 focus-visible:ring-violet-300/40"
              />
            </div>
          </div>

          {mode !== "forgot" && (
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-white/72">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="h-[52px] rounded-2xl border-white/10 bg-white/[0.03] pl-11 pr-11 text-white placeholder:text-white/28 focus-visible:ring-violet-300/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white/72"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          )}

          {mode === "login" && (
            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-white/50">
                <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-white/5" />
                Keep me signed in
              </label>
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="font-medium text-violet-200 transition-colors hover:text-white"
              >
                Forgot password?
              </button>
            </div>
          )}

          <Button type="submit" disabled={loading} className="primary-button h-12 w-full rounded-2xl px-5">
            {loading
              ? "Processing..."
              : mode === "login"
                ? "Enter Workspace"
                : mode === "signup"
                  ? "Create account"
                  : "Send reset link"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <div className="mt-6 rounded-[22px] border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Inside your mentor</p>
          <p className="mt-3 text-sm leading-7 text-white/60">
            FIRE planning, money health scoring, tax optimization, portfolio X-ray, and decision support for marriage,
            bonuses, inheritance, and other life events.
          </p>
        </div>

        <div className="mt-7 space-y-4 border-t border-white/10 pt-6 text-sm text-white/55">
          {mode !== "login" && (
            <button type="button" onClick={() => setMode("login")} className="font-medium text-white/72 hover:text-white">
              Back to login
            </button>
          )}

          {mode === "login" && (
            <div className="flex items-center justify-between gap-3">
              <span>Don't have an account?</span>
              <button type="button" onClick={() => setMode("signup")} className="font-medium text-violet-200 hover:text-white">
                Sign up
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.08 }}
        className="glass-panel relative overflow-hidden rounded-[30px] border-violet-soft p-5 sm:p-7"
      >
        <div className="absolute inset-x-10 top-0 h-32 bg-violet-300/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full bg-violet-400/20 blur-3xl" />

        <div className="relative min-h-[600px] rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_50%_10%,rgba(241,219,255,0.4),rgba(171,114,255,0.22)_28%,rgba(28,18,46,0.96)_76%)] p-6 sm:p-8">
          <motion.div
            animate={{ y: [0, -8, 0], scale: [1, 1.04, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10"
          >
            <div className="h-10 w-10 rounded-full bg-[radial-gradient(circle,#fbf4ff_0%,#cf99ff_38%,#8a47ff_100%)] shadow-[0_0_30px_rgba(200,146,255,0.5)]" />
          </motion.div>

          <div className="mt-6 text-center">
            <h3 className="text-3xl font-bold text-white">Your personal AI money mentor</h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-white/62">
              Ask for a FIRE plan, check your money health score, compare tax regimes, or upload portfolio statements
              for a fast X-ray and action-ready guidance.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {workspaceTabs.map((tab) => (
              <span
                key={tab}
                className="rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70"
              >
                {tab}
              </span>
            ))}
          </div>

          <div className="mt-8 rounded-[26px] border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3 border-b border-white/8 pb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-300/12 text-violet-100">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Live mentor prompt</p>
                <p className="mt-1 text-sm text-white/68">What would you like to plan today?</p>
              </div>
            </div>

            <div className="mt-5 min-h-[210px] rounded-[20px] border border-white/8 bg-white/[0.03] p-5">
              <p className="text-sm leading-7 text-white/58">
                I can help you build a retirement roadmap, optimize taxes, analyze mutual fund statements, assess
                emergency readiness, or guide financial decisions around marriage, inheritance, and major expenses.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {supportActions.map((action) => (
                <button
                  key={action}
                  type="button"
                  className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white/65 transition-colors hover:text-white"
                >
                  {action}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/35">
                Ask about FIRE, taxes, SIPs, or portfolio overlap...
              </div>
              <button type="button" className="primary-button h-11 rounded-full px-5">
                Start
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
