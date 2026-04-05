"use client";
import { Users, GitBranch, CreditCard, Activity, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";
import { Button } from "@/shared/ui/button";
import { useMe } from "@/features/user/hooks";
import { useTenant } from "@/features/user/tenant-hooks";
import { useTeams } from "@/modules/teams/api/hooks";
import { useSubscription } from "@/features/billing/hooks";
import Link from "next/link";

function StatCard({
  label,
  value,
  icon: Icon,
  loading,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  loading?: boolean;
  sub?: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">{label}</span>
          <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          <div>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const statusVariant: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
  active: "success",
  trialing: "warning",
  past_due: "destructive",
  canceled: "secondary",
};

export default function DashboardPage() {
  const { data: user, isLoading: userLoading } = useMe();
  const { data: tenant, isLoading: tenantLoading } = useTenant();
  const { data: teams, isLoading: teamsLoading } = useTeams();
  const { data: subscription, isLoading: subLoading } = useSubscription();
  const formattedSubscriptionEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        {userLoading ? (
          <Skeleton className="h-8 w-64" />
        ) : (
          <h1 className="text-2xl font-semibold tracking-tight">
            {greeting}, {user?.name?.split(" ")[0]} 👋
          </h1>
        )}
        <p className="text-muted-foreground text-sm mt-1">
          Here&apos;s what&apos;s happening in your workspace.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Teams"
          value={teams?.length ?? 0}
          icon={Users}
          loading={teamsLoading}
          sub="Active teams"
        />
        <StatCard
          label="Workspace"
          value={tenant?.name ?? "—"}
          icon={GitBranch}
          loading={tenantLoading}
          sub={tenant?.slug}
        />
        <StatCard
          label="Plan"
          value={tenant?.plan?.toUpperCase() ?? "—"}
          icon={CreditCard}
          loading={tenantLoading}
          sub={subscription?.status}
        />
        <StatCard
          label="Status"
          value={tenant?.subscription_status === "active" ? "Healthy" : "Check billing"}
          icon={Activity}
          loading={tenantLoading}
        />
      </div>

      {/* Two column section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Teams overview */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Your Teams</CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-xs text-muted-foreground">
                <Link href="/teams">
                  View all <ArrowUpRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
            <CardDescription>Active teams in this workspace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {teamsLoading ? (
              [...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-lg" />)
            ) : teams?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Users className="h-8 w-8 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">No teams yet</p>
                <Button variant="outline" size="sm" className="mt-3" asChild>
                  <Link href="/teams">Create your first team</Link>
                </Button>
              </div>
            ) : (
              teams?.slice(0, 4).map((team) => (
                <div
                  key={team.id}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-md bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20 flex items-center justify-center text-xs font-bold text-violet-400">
                      {team.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{team.name}</p>
                      <p className="text-xs text-muted-foreground">{team.description}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Subscription card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Subscription</CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-xs text-muted-foreground">
                <Link href="/billing">
                  Manage <ArrowUpRight className="h-3 w-3 ml-1" />
                </Link>
              </Button>
            </div>
            <CardDescription>Your current billing status</CardDescription>
          </CardHeader>
          <CardContent>
            {subLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-9 w-28" />
              </div>
            ) : subscription ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{subscription.plan_name}</span>
                  <Badge variant={statusVariant[subscription.status] ?? "secondary"}>
                    {subscription.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formattedSubscriptionEnd
                    ? `Billing period ends on ${formattedSubscriptionEnd}`
                    : "Billing period details are not available yet."}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/billing">Upgrade plan</Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CreditCard className="h-8 w-8 text-muted-foreground/50 mb-2" />
                <p className="text-sm text-muted-foreground">No active subscription</p>
                <Button variant="outline" size="sm" className="mt-3" asChild>
                  <Link href="/billing">Choose a plan</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
