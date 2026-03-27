import { Outlet, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { LogOut } from "lucide-react";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="dashboard-shell min-h-screen w-full">
        <div className="mx-auto flex min-h-screen w-full max-w-[1480px] gap-2 p-3 sm:gap-3 sm:p-4">
          <AppSidebar />

          <div className="dashboard-panel relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-[28px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(153,94,255,0.12),transparent_18%),radial-gradient(circle_at_82%_18%,rgba(111,70,233,0.1),transparent_22%)]" />

            <header className="relative z-10 flex h-20 items-center justify-between border-b border-white/8 px-4 sm:px-6">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/72 hover:bg-white/[0.08] hover:text-white" />
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-white/42">AI Automation</div>
                  <div className="mt-1 text-sm text-white/66">Content • Campaigns • Analytics</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/52 sm:block">
                  Premium Workspace
                </div>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm font-medium text-rose-100 transition-all duration-300 hover:bg-rose-500/18 hover:text-white"
                >
                  <LogOut className="h-4 w-4 text-rose-300" />
                  Logout
                </Link>
              </div>
            </header>

            <main className="relative z-10 flex-1 overflow-auto p-4 sm:p-6">
              <Outlet />
            </main>

          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
