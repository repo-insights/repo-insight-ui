"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Settings, CreditCard,
  Shield, ChevronDown, Hexagon,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useMe } from "@/features/user/hooks";
import { useTenant } from "@/features/user/tenant-hooks";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/teams", label: "Teams", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/billing", label: "Billing", icon: CreditCard },
];

const planColors: Record<string, string> = {
  free: "secondary",
  pro: "success",
  enterprise: "warning",
};

export function Sidebar() {
  const pathname = usePathname();
  const { data: user } = useMe();
  const { data: tenant, isLoading: tenantLoading } = useTenant();

  return (
    <aside className="flex h-screen w-56 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-border">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground">
          <Hexagon className="h-4 w-4 text-background" strokeWidth={2.5} />
        </div>
        <span className="text-sm font-semibold tracking-tight">
          Repo Insights
        </span>
      </div>

      {/* Workspace */}
      <div className="px-3 pt-3 pb-2">
        <button className="w-full flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-accent transition-colors group">
          <div className="h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex-shrink-0" />
          <div className="flex-1 text-left min-w-0">
            {tenantLoading ? (
              <Skeleton className="h-3 w-24" />
            ) : (
              <span className="text-xs font-medium truncate block">{tenant?.name ?? "Workspace"}</span>
            )}
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
        </button>
      </div>

      {/* Plan badge */}
      {tenant?.plan && (
        <div className="px-5 pb-2">
          <Badge
            variant={
              (planColors[tenant.plan] as "secondary" | "success" | "warning") ??
              "secondary"
            }
            className="text-[10px]"
          >
            {tenant.plan.toUpperCase()}
          </Badge>
        </div>
      )}

      <div className="mx-3 h-px bg-border mb-2" />

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                active
                  ? "bg-accent text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}

        {user?.role === "admin" && (
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
              pathname.startsWith("/admin")
                ? "bg-accent text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            <Shield className="h-4 w-4 flex-shrink-0" />
            Admin
          </Link>
        )}
      </nav>

      {/* User footer */}
      <div className="border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
            {user?.name?.[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{user?.name ?? "Loading..."}</p>
            <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
