"use client";
import { Check, CreditCard, Zap, Building2, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { Separator } from "@/shared/ui/separator";
import { usePlans, useSubscription } from "@/features/billing/hooks";
import type { Plan } from "@/shared/lib/types";

const planIcons: Record<string, React.ElementType> = {
  free: Sparkles,
  pro: Zap,
  enterprise: Building2,
};

const statusVariant: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
  active: "success",
  trialing: "warning",
  past_due: "destructive",
  canceled: "secondary",
};

function PlanCard({
  plan,
  isCurrent,
}: {
  plan: Plan;
  isCurrent: boolean;
}) {
  const Icon = planIcons[plan.name.toLowerCase()] ?? Sparkles;
  const planTitle = plan.display_name || plan.name;
  const planFeatures = plan.features?.length
    ? plan.features
    : [
        `${plan.max_repos} repositories`,
        `${plan.max_members} members`,
        ...plan.permissions,
      ];

  return (
    <Card className={`relative flex flex-col transition-colors ${isCurrent ? "border-foreground/50 shadow-lg" : "hover:border-border/80"}`}>
      {plan.is_popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-foreground text-background text-[10px] px-2 py-0.5">Most popular</Badge>
        </div>
      )}
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-7 w-7 rounded-lg bg-accent flex items-center justify-center">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardTitle className="text-base">{planTitle}</CardTitle>
        </div>
        {plan.price ? (
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold">{plan.price}</span>
          </div>
        ) : typeof plan.price_monthly === "number" ? (
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold">${plan.price_monthly}</span>
            <span className="text-muted-foreground text-sm">/mo</span>
          </div>
        ) : (
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-semibold">{plan.max_repos}</span>
            <span className="text-muted-foreground text-sm">repos</span>
          </div>
        )}
        <CardDescription>
          {plan.description ??
            `Includes up to ${plan.max_members} members with ${plan.permissions.length} permission set${plan.permissions.length === 1 ? "" : "s"}.`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {planFeatures.map((feat) => (
            <li key={feat} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              {feat}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={isCurrent ? "outline" : "default"}
          disabled
        >
          {isCurrent ? "Current plan" : "Plan changes coming soon"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function BillingPage() {
  const { data: plans, isLoading: plansLoading } = usePlans();
  const { data: subscription, isLoading: subLoading } = useSubscription();
  const formattedPeriodEnd = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your plan and billing details.
        </p>
      </div>

      {/* Current subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CreditCard className="h-4 w-4" /> Current Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-9 w-36" />
            </div>
          ) : subscription ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xl font-semibold">{subscription.plan_name}</span>
                <Badge variant={statusVariant[subscription.status] ?? "secondary"}>
                  {subscription.status}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                {formattedPeriodEnd ? (
                  <>
                    Billing period ends on{" "}
                    <span className="text-foreground font-medium">
                      {formattedPeriodEnd}
                    </span>
                  </>
                ) : (
                  "Billing period details are not available from the current API response."
                )}
              </p>

              <Separator />

              <div className="rounded-lg border border-border bg-muted/20 px-3 py-3 text-xs text-muted-foreground">
                The current backend exposes billing status and plan listings, but
                it does not yet expose plan-change or subscription-cancel actions.
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CreditCard className="h-8 w-8 text-muted-foreground/50 mb-3" />
              <p className="text-sm font-medium">No active subscription</p>
              <p className="text-xs text-muted-foreground mt-1">
                Choose a plan below to get started.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plans */}
      <div>
        <h2 className="text-base font-semibold mb-4">Available Plans</h2>
        {plansLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-72 w-full rounded-xl" />)}
          </div>
        ) : plans?.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-sm">No plans available at this time.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
            {plans?.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isCurrent={subscription?.plan_id === plan.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
