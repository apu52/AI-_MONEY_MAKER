import { Brain, Calculator, LogOut, PieChart, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", subtitle: "AI analysis workspace", url: "/dashboard/analysis", icon: Brain },
  { title: "Portfolio", subtitle: "Review scoring and X-ray", url: "/dashboard/portfolio", icon: PieChart },
  { title: "Tax Optimizer", subtitle: "Compare regimes and savings", url: "/dashboard/tax", icon: Calculator },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r-0 bg-transparent">
      <SidebarContent className={collapsed ? "px-1 py-3" : "p-4"}>
        <div className={`dashboard-panel h-full rounded-[26px] py-4 ${collapsed ? "px-1" : "px-3"}`}>
          <div className={`mb-6 flex items-center ${collapsed ? "justify-center px-0" : "gap-3 px-3"}`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(196,146,255,0.95),rgba(127,82,255,0.78))] text-white shadow-[0_14px_36px_rgba(127,82,255,0.28)]">
              <Sparkles className="h-5 w-5" />
            </div>
            {!collapsed && (
              <div>
                <div className="text-2xl font-semibold text-white">AI Money Mentor</div>
                <div className="text-xs uppercase tracking-[0.2em] text-white/42">Control Center</div>
              </div>
            )}
          </div>

          <SidebarGroup className={collapsed ? "px-0 py-2" : "p-2"}>
            <SidebarGroupLabel className={`${collapsed ? "justify-center px-0" : "px-3"} text-[11px] uppercase tracking-[0.22em] text-white/34`}>
              Main
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={collapsed ? item.title : undefined}
                      className={`h-auto rounded-2xl p-0 ${collapsed ? "justify-center" : ""}`}
                    >
                      <NavLink
                        to={item.url}
                        end
                        activeClassName=""
                        className={`group flex rounded-2xl transition-all duration-300 ${
                          isActive(item.url)
                            ? "bg-[linear-gradient(135deg,rgba(220,131,255,0.96),rgba(166,98,255,0.88))] text-white shadow-[0_20px_44px_rgba(153,92,255,0.3)]"
                            : "text-white/68 hover:bg-white/[0.05] hover:text-white"
                        } ${collapsed ? "mx-auto h-12 w-12 items-center justify-center p-0" : "items-start gap-3 px-3 py-3"}`}
                      >
                        <item.icon className={`h-4 w-4 shrink-0 ${collapsed ? "mt-0" : "mt-0.5"} ${isActive(item.url) ? "text-white" : "text-white/62"}`} />
                        {!collapsed && (
                          <div>
                            <div className="text-sm font-semibold">{item.title}</div>
                            <div className={`text-xs ${isActive(item.url) ? "text-white/80" : "text-white/38"}`}>{item.subtitle}</div>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="mt-auto pt-8">
            <SidebarGroup className={collapsed ? "px-0 py-2" : "p-2"}>
              <SidebarGroupLabel className={`${collapsed ? "justify-center px-0" : "px-3"} text-[11px] uppercase tracking-[0.22em] text-white/34`}>
                Session
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip={collapsed ? "Logout" : undefined} className={`h-auto rounded-2xl p-0 ${collapsed ? "justify-center" : ""}`}>
                      <NavLink
                        to="/login"
                        className={`flex rounded-2xl text-rose-200/84 transition-all duration-300 hover:bg-rose-500/14 hover:text-rose-100 ${
                          collapsed ? "mx-auto h-12 w-12 items-center justify-center p-0" : "items-center gap-3 px-3 py-3"
                        }`}
                        activeClassName=""
                      >
                        <LogOut className="h-4 w-4 shrink-0 text-rose-300" />
                        {!collapsed && <span className="text-sm font-medium">Logout</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
