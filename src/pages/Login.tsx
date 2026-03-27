import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import AuthForm from "@/components/AuthForm";

const Login = () => {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
      <div className="absolute inset-0 hero-glow opacity-90" />
      <div className="absolute inset-0 soft-grid opacity-20" />
      <div className="absolute left-[8%] top-[14%] h-52 w-52 rounded-full bg-violet-400/12 blur-3xl" />
      <div className="absolute bottom-[10%] right-[10%] h-56 w-56 rounded-full bg-violet-300/10 blur-3xl" />

      <div className="section-shell relative z-10">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
              <ShieldCheck className="h-5 w-5 text-violet-100" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-white/48">AI Money Mentor</div>
              <div className="text-base font-semibold text-white/86">Secure Personal Finance Workspace</div>
            </div>
          </Link>

          <Link to="/" className="secondary-button gap-2 px-5 py-2.5">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="py-6 lg:py-10"
        >
          <div className="glass-panel rounded-[34px] border-violet-soft bg-deep-night p-4 sm:p-6 lg:p-8">
            <AuthForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
