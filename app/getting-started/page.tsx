"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  CircleHelp,
  CreditCard,
  MessageSquareMore,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";
import { ProductBrand } from "@/shared/ui/product-brand";
import { PRODUCT_TAGLINE } from "@/shared/lib/brand";
import { usePlans } from "@/features/billing/hooks";
import { Skeleton } from "@/shared/ui/skeleton";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

const gettingStartedNav = [
  { id: "plans", label: "Plans" },
  { id: "recommendation", label: "Recommendation" },
  { id: "request-demo", label: "Request demo" },
  { id: "contact-sales", label: "Contact sales" },
] as const;

const comparisonRows = [
  { label: "Repositories", key: "repos" },
  { label: "Team members", key: "members" },
  { label: "AI answers", key: "ai" },
  { label: "Collaboration", key: "collab" },
  { label: "Priority support", key: "support" },
] as const;

const faqItems = [
  {
    question: "Can I change plans later?",
    answer: "Yes. Teams can move between plans as their repository count, collaboration needs, and operational requirements change.",
  },
  {
    question: "Do you support annual pricing?",
    answer: "Yes. Yearly pricing is available for teams that want a lower effective monthly rate and simpler budget planning.",
  },
  {
    question: "Is there a good option for evaluation?",
    answer: "The recommendation section below helps identify whether you should start with a self-serve trial or a guided demo.",
  },
  {
    question: "What makes enterprise different?",
    answer: "Enterprise is designed for larger organizations that need rollout support, security controls, and a more direct relationship with the team.",
  },
] as const;

const trustSignals = ["Stripe", "Vercel", "Linear", "Notion", "Figma"] as const;

export default function GettingStartedPage() {
  const { data: plans, isLoading: plansLoading } = usePlans();
  const [billingMode, setBillingMode] = useState<"monthly" | "yearly">("monthly");
  const [teamSize, setTeamSize] = useState<"1-5" | "6-20" | "21+">("1-5");
  const [repoCount, setRepoCount] = useState<"1-5" | "6-25" | "26+">("1-5");
  const [goal, setGoal] = useState<"onboarding" | "debugging" | "visibility">("onboarding");

  const recommendation = useMemo(() => {
    if (teamSize === "21+" || repoCount === "26+") {
      return {
        title: "Enterprise fit",
        body: "You likely need stronger rollout support, broader repository capacity, and a more structured onboarding path.",
        cta: "Talk to sales",
        href: "#contact-sales",
      };
    }

    if (teamSize === "6-20" || goal === "visibility") {
      return {
        title: "Professional fit",
        body: "You are likely in the sweet spot for a collaborative plan with repository analytics, AI context, and team workflows.",
        cta: "View plans",
        href: "#plans",
      };
    }

    return {
      title: "Starter fit",
      body: "A self-serve plan is probably the best way to explore onboarding, debugging, and repository understanding before expanding usage.",
      cta: "Start trial",
      href: "/signup",
    };
  }, [goal, repoCount, teamSize]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090a] text-[#f0f2f4]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.08),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px]" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#08090a]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <ProductBrand eyebrow={PRODUCT_TAGLINE} />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[#d1d5db] transition hover:border-white/20 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[36px] border border-white/8 bg-[linear-gradient(135deg,rgba(0,229,255,0.16),rgba(6,10,18,0.92)_38%,rgba(8,9,10,0.98))] px-6 py-12 shadow-[0_30px_120px_rgba(0,0,0,0.45)] sm:px-10 lg:px-12 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#8ef5ff]">
                Getting Started
              </p>
              <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                Choose the fastest path into Repo Insights for your team.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#c4d3da] sm:text-lg">
                Compare pricing, get a tailored recommendation, request a guided demo, or connect directly with sales for a more structured rollout.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {gettingStartedNav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[#d1d5db] transition hover:border-white/20 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#00e5ff] px-6 py-3 text-sm font-semibold text-[#08090a] transition hover:bg-[#33ecff]"
                >
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#request-demo"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[#d1d5db] transition hover:border-white/20 hover:text-white"
                >
                  Request a demo
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Plan clarity", value: "4 routes" },
                { label: "Typical rollout time", value: "< 2 weeks" },
                { label: "Self-serve friendly", value: "Yes" },
                { label: "Enterprise support", value: "Available" },
              ].map((stat) => (
                <div key={stat.label} className="interactive-tile rounded-[24px] border border-white/10 bg-[#0d1117]/88 p-6">
                  <p className="font-mono text-3xl font-semibold tracking-[-0.04em] text-white">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-[#9ca3af]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="plans" className="scroll-mt-28 py-24">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">Plans</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Clear pricing with a practical path from evaluation to scale.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#9ca3af]">
                Compare tiers, see what changes at each level, and choose the model that fits your team size, repository footprint, and collaboration needs.
              </p>
            </div>

            <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
              {(["monthly", "yearly"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setBillingMode(mode)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    billingMode === mode ? "bg-[#00e5ff] font-medium text-[#08090a]" : "text-[#9ca3af] hover:text-white"
                  }`}
                >
                  {mode === "monthly" ? "Monthly" : "Yearly"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plansLoading
              ? [...Array(3)].map((_, index) => (
                  <div key={index} className="interactive-tile rounded-[28px] border border-white/8 bg-[#0d0f10] p-8">
                    <Skeleton className="h-5 w-28 rounded-md bg-white/8" />
                    <Skeleton className="mt-5 h-12 w-32 rounded-md bg-white/8" />
                    <Skeleton className="mt-4 h-20 w-full rounded-md bg-white/8" />
                  </div>
                ))
              : plans?.map((plan) => {
                  const isPopular = !!plan.is_popular;
                  const monthlyLabel = plan.price ?? (typeof plan.price_monthly === "number" ? `$${plan.price_monthly}/month` : "Custom");
                  const yearlyLabel =
                    typeof plan.price_monthly === "number"
                      ? `$${Math.round(plan.price_monthly * 10.8)}/year`
                      : monthlyLabel;

                  return (
                    <div
                      key={plan.id}
                      className={`interactive-tile relative rounded-[28px] p-8 ${
                        isPopular
                          ? "border border-[#00e5ff]/25 bg-[#0d1117] shadow-[0_0_0_1px_rgba(0,229,255,0.08),0_24px_80px_rgba(0,0,0,0.45)]"
                          : "border border-white/8 bg-[#0d0f10]"
                      }`}
                    >
                      {isPopular && (
                        <div className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-full bg-[#00e5ff] px-3 py-1 text-xs font-semibold text-[#08090a]">
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Most popular
                        </div>
                      )}
                      <p className={`font-mono text-xs uppercase tracking-[0.22em] ${isPopular ? "text-[#00e5ff]" : "text-[#6b7280]"}`}>
                        {plan.plan_name ?? plan.display_name ?? plan.name}
                      </p>
                      <div className="mt-5 flex items-end gap-2">
                        <span className="font-mono text-4xl font-semibold tracking-[-0.05em] text-white">
                          {billingMode === "monthly" ? monthlyLabel : yearlyLabel}
                        </span>
                      </div>
                      <p className="mt-4 min-h-16 text-sm leading-7 text-[#9ca3af]">{plan.description}</p>
                      <Link
                        href="/signup"
                        className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                          isPopular
                            ? "bg-[#00e5ff] text-[#08090a] hover:bg-[#33ecff]"
                            : "border border-white/10 bg-white/[0.03] text-[#d1d5db] hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {plan.button_text ?? "Start now"}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  );
                })}
          </div>

          <div className="mt-8 overflow-hidden rounded-[28px] border border-white/8 bg-[#0d0f10]">
            <div className="grid grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] border-b border-white/8 px-6 py-4 text-sm text-[#9ca3af]">
              <div>Feature</div>
              {(plans ?? []).slice(0, 3).map((plan) => (
                <div key={plan.id} className="text-center text-white">
                  {plan.plan_name ?? plan.display_name ?? plan.name}
                </div>
              ))}
            </div>
            {comparisonRows.map((row) => (
              <div key={row.key} className="grid grid-cols-[1.2fr_repeat(3,minmax(0,1fr))] items-center border-b border-white/6 px-6 py-4 text-sm last:border-b-0">
                <div className="text-[#d1d5db]">{row.label}</div>
                {(plans ?? []).slice(0, 3).map((plan) => {
                  const value =
                    row.key === "repos"
                      ? plan.max_repos
                      : row.key === "members"
                        ? plan.max_members
                        : row.key === "ai"
                          ? plan.permissions.includes("ask_ai") ? "Included" : "Limited"
                          : row.key === "collab"
                            ? plan.features?.some((feature) => feature.toLowerCase().includes("collaboration")) ? "Yes" : "Basic"
                            : plan.is_popular || plan.name.toLowerCase().includes("enterprise") ? "Yes" : "Standard";

                  return (
                    <div key={`${plan.id}-${row.key}`} className="text-center text-[#9ca3af]">
                      {typeof value === "number" ? value : value}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqItems.map((item) => (
              <div key={item.question} className="interactive-tile rounded-[24px] border border-white/8 bg-[#0d0f10] p-6">
                <div className="flex items-start gap-3">
                  <CircleHelp className="mt-1 h-5 w-5 text-[#00e5ff]" />
                  <div>
                    <p className="text-lg font-semibold text-white">{item.question}</p>
                    <p className="mt-3 text-sm leading-7 text-[#9ca3af]">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="recommendation" className="scroll-mt-28 border-t border-white/5 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">Recommendation</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Answer a few quick questions and we will point you to the best starting path.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#9ca3af]">
              This is not a hard sales gate. It is a lightweight way to match plan complexity to your team shape and goals.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-[#00e5ff] via-[#63e0ff] to-[#8ef5ff]" />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="space-y-4">
                <div className="interactive-tile rounded-[28px] border border-white/8 bg-[#0d0f10] p-6">
                  <p className="text-lg font-semibold text-white">1. How large is your team?</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {(["1-5", "6-20", "21+"] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setTeamSize(value)}
                        className={`rounded-2xl border px-4 py-4 text-sm transition ${
                          teamSize === value
                            ? "border-[#00e5ff]/30 bg-[#00e5ff]/10 text-white"
                            : "border-white/10 bg-white/[0.02] text-[#9ca3af] hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="interactive-tile rounded-[28px] border border-white/8 bg-[#0d0f10] p-6">
                  <p className="text-lg font-semibold text-white">2. How many repositories matter right now?</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {(["1-5", "6-25", "26+"] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRepoCount(value)}
                        className={`rounded-2xl border px-4 py-4 text-sm transition ${
                          repoCount === value
                            ? "border-[#00e5ff]/30 bg-[#00e5ff]/10 text-white"
                            : "border-white/10 bg-white/[0.02] text-[#9ca3af] hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="interactive-tile rounded-[28px] border border-white/8 bg-[#0d0f10] p-6">
                  <p className="text-lg font-semibold text-white">3. What matters most today?</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {[
                      { value: "onboarding", label: "Onboarding" },
                      { value: "debugging", label: "Debugging" },
                      { value: "visibility", label: "Visibility" },
                    ].map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setGoal(item.value as typeof goal)}
                        className={`rounded-2xl border px-4 py-4 text-sm transition ${
                          goal === item.value
                            ? "border-[#00e5ff]/30 bg-[#00e5ff]/10 text-white"
                            : "border-white/10 bg-white/[0.02] text-[#9ca3af] hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="interactive-tile rounded-[32px] border border-[#00e5ff]/15 bg-[linear-gradient(135deg,rgba(0,229,255,0.12),rgba(13,15,16,0.94))] p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8ef5ff]">Suggested path</p>
                <h3 className="mt-4 text-3xl font-semibold text-white">{recommendation.title}</h3>
                <p className="mt-4 text-base leading-8 text-[#cbd5e1]">{recommendation.body}</p>
                <a
                  href={recommendation.href}
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#00e5ff] px-6 py-3 text-sm font-semibold text-[#08090a] transition hover:bg-[#33ecff]"
                >
                  {recommendation.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="request-demo" className="scroll-mt-28 border-t border-white/5 py-24">
          <div className="grid items-start gap-6 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="interactive-tile rounded-[32px] border border-white/8 bg-[#0d0f10] p-8">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">Request a demo</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                See how Repo Insights shortens the path from repository question to confident action.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#9ca3af]">
                A live demo is the fastest way to understand how repository analytics, engineering context, and collaboration fit your workflow.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "How repository analytics connect code, history, and ownership",
                  "What onboarding and debugging workflows look like in practice",
                  "How to evaluate pricing, rollout, and team fit",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4">
                    <Check className="mt-1 h-4 w-4 text-[#00e5ff]" />
                    <p className="text-sm leading-7 text-[#cbd5e1]">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#6b7280]">
                {trustSignals.map((signal) => (
                  <span key={signal} className="rounded-full border border-white/8 bg-white/[0.02] px-3 py-2">
                    {signal}
                  </span>
                ))}
              </div>
            </div>

            <div className="interactive-tile rounded-[32px] border border-white/8 bg-[#0d0f10] p-8">
              <div className="space-y-4">
                <Input placeholder="Name" className="h-11 rounded-xl bg-white/[0.03]" />
                <Input placeholder="Company" className="h-11 rounded-xl bg-white/[0.03]" />
                <Input placeholder="Role" className="h-11 rounded-xl bg-white/[0.03]" />
                <Input placeholder="Team size" className="h-11 rounded-xl bg-white/[0.03]" />
                <Button className="h-11 w-full rounded-xl">Request demo</Button>
              </div>
            </div>
          </div>
        </section>

        <section id="contact-sales" className="scroll-mt-28 border-t border-white/5 py-24">
          <div className="grid items-start gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">Contact sales</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Talk directly with us if you are evaluating Repo Insights for a larger organization.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#9ca3af]">
                We can help you assess rollout fit, security expectations, collaboration needs, and the right commercial path.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: Building2, text: "Enterprise rollout guidance" },
                  { icon: ShieldCheck, text: "Security and controls discussion" },
                  { icon: Users, text: "Cross-team adoption planning" },
                  { icon: CreditCard, text: "Commercial fit and pricing clarity" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4">
                    <Icon className="mt-1 h-4 w-4 text-[#00e5ff]" />
                    <p className="text-sm leading-7 text-[#cbd5e1]">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[24px] border border-white/8 bg-[#0d0f10] p-5">
                <div className="flex items-start gap-3">
                  <MessageSquareMore className="mt-1 h-5 w-5 text-[#8ef5ff]" />
                  <div>
                    <p className="text-base font-semibold text-white">Response time</p>
                    <p className="mt-2 text-sm leading-7 text-[#9ca3af]">We typically respond within one business day for qualified inquiries.</p>
                    <p className="mt-2 text-sm leading-7 text-[#8ef5ff]">sales@repoinsights.dev</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="interactive-tile rounded-[32px] border border-white/8 bg-[#0d0f10] p-8">
              <div className="space-y-4">
                <Input placeholder="Name" className="h-11 rounded-xl bg-white/[0.03]" />
                <Input placeholder="Company email" className="h-11 rounded-xl bg-white/[0.03]" />
                <Input placeholder="Company" className="h-11 rounded-xl bg-white/[0.03]" />
                <Input placeholder="Team size" className="h-11 rounded-xl bg-white/[0.03]" />
                <Button className="h-11 w-full rounded-xl">Contact sales</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
