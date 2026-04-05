"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Brain,
  Check,
  FileCode2,
  GitBranch,
  GitCommitHorizontal,
  Menu,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { useSessionBootstrap } from "@/modules/auth/api/hooks";
import {
  LANDING_FEATURES,
  LANDING_NAV_ITEMS,
  LANDING_PRICING,
  LANDING_WORKFLOW,
} from "@/modules/landing/lib/constants";

const rotatingWords = ["understand", "search", "debug", "navigate", "master"];

const landingDemoItems: Array<{ label: string; icon: LucideIcon }> = [
  { label: "Code explanations", icon: FileCode2 },
  { label: "PR and commit lineage", icon: GitCommitHorizontal },
  { label: "Semantic intent search", icon: Search },
  { label: "Secure workspace access", icon: ShieldCheck },
];

export function LandingPage() {
  const router = useRouter();
  const { isReady, isAuthenticated } = useSessionBootstrap();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isReady, router]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % rotatingWords.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  if (!isReady) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090a] text-[#f0f2f4]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.08),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px]" />

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#08090a]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00e5ff] text-[#08090a] shadow-[0_0_24px_rgba(0,229,255,0.25)]">
              <GitBranch className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-mono text-sm font-medium tracking-tight">
                Repo Insights
              </p>
              <p className="text-[11px] text-[#6b7280]">
                Developer intelligence platform
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {LANDING_NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-[#9ca3af] transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm text-[#9ca3af] transition hover:text-white"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[#d1d5db] transition hover:border-white/20 hover:text-white"
            >
              Sign up
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-[#00e5ff] px-4 py-2 text-sm font-semibold text-[#08090a] transition hover:bg-[#33ecff] hover:shadow-[0_0_28px_rgba(0,229,255,0.28)]"
            >
              Start for free
            </Link>
          </div>

          <button
            type="button"
            className="rounded-lg border border-white/10 p-2 text-[#9ca3af] md:hidden"
            onClick={() => setMobileOpen((current) => !current)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/5 bg-[#08090a] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {LANDING_NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-[#9ca3af] hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link href="/login" className="rounded-lg border border-white/10 px-4 py-3 text-center text-sm text-[#d1d5db]">
                Log in
              </Link>
              <Link href="/signup" className="rounded-lg bg-[#00e5ff] px-4 py-3 text-center text-sm font-semibold text-[#08090a]">
                Start free
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col justify-center px-4 pb-20 pt-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00e5ff]/15 bg-[#00e5ff]/8 px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-[#00e5ff]">
              <span className="h-2 w-2 rounded-full bg-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.8)]" />
              Now in public beta
            </div>

            <h1 className="mt-8 text-balance text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Understand any codebase in minutes,
              <span className="bg-gradient-to-r from-white via-[#8ef5ff] to-[#00e5ff] bg-clip-text text-transparent">
                {" "}not weeks.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#9ca3af]">
              Repo Insights connects AI to code, pull requests, and commit history
              so your team can{" "}
              <span className="font-mono text-[#00e5ff]">
                {rotatingWords[wordIndex]}
              </span>{" "}
              any repository with confidence.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00e5ff] px-6 py-3 text-sm font-semibold text-[#08090a] transition hover:bg-[#33ecff] hover:shadow-[0_0_32px_rgba(0,229,255,0.3)]"
              >
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#demo"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[#d1d5db] transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                View demo
              </a>
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-[#4b5563]">
              {["Stripe", "Vercel", "Linear", "Notion", "Figma"].map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mt-16 w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#0d0f10]/90 shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
            <div className="flex items-center gap-2 border-b border-white/5 px-5 py-4">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
              <span className="ml-4 font-mono text-xs text-[#6b7280]">
                repoinsights / checkout-service
              </span>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="border-b border-white/5 p-6 lg:border-b-0 lg:border-r">
                <div className="space-y-4 font-mono text-sm">
                  <div className="text-[#6b7280]">$ Why does the checkout flow sometimes skip 3DS?</div>
                  <div className="rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/6 p-4 text-[#cbd5e1]">
                    Found the issue in <span className="text-[#00e5ff]">src/api/checkout.ts:L147</span>.
                    A low-value transaction shortcut was introduced in PR #2190
                    and now conflicts with EU PSD2 flows for some customers.
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["PR #2190", "checkout.ts:147", "See commits"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-[#9ca3af]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="rounded-2xl border border-white/8 bg-[#08090a] p-5">
                  <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#6b7280]">
                    <Search className="h-3.5 w-3.5 text-[#00e5ff]" />
                    Semantic search
                  </div>
                  <div className="space-y-3">
                    {[
                      ["middleware/auth.ts", "verifyJWT(token)", "99%"],
                      ["api/routes.ts", "jwtMiddleware()", "94%"],
                      ["lib/session.ts", "validateSession()", "81%"],
                    ].map(([file, fn, score]) => (
                      <div
                        key={file}
                        className="flex items-center gap-4 rounded-xl border border-white/6 bg-white/[0.02] px-4 py-3"
                      >
                        <span className="w-10 text-right font-mono text-xs text-[#00e5ff]">
                          {score}
                        </span>
                        <div>
                          <p className="font-mono text-sm text-white">{fn}</p>
                          <p className="text-xs text-[#6b7280]">{file}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
              Features
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Everything you need to own any codebase
            </h2>
            <p className="mt-4 text-base leading-7 text-[#9ca3af]">
              The landing experience and the product app now live in one codebase,
              with the same module system ready for more pages later.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {LANDING_FEATURES.map((feature, index) => {
              const Icon = [Brain, GitCommitHorizontal, MessageSquareText][index];
              return (
                <div
                  key={feature.title}
                  className="rounded-[24px] border border-white/8 bg-[#0d0f10] p-7 transition hover:border-[#00e5ff]/20 hover:bg-[#111315]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/8 text-[#00e5ff]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-[#6b7280]">
                    {feature.eyebrow}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#9ca3af]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section id="workflow" className="border-y border-white/5 bg-white/[0.02] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
                  Workflow
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  Built for onboarding, debugging, and daily repo ownership
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#9ca3af]">
                  This structure is ready for more modules too. As you add pages later,
                  each feature can live under its own <code>modules/&lt;name&gt;</code>{" "}
                  folder instead of spreading logic across unrelated directories.
                </p>
              </div>

              <div className="space-y-4">
                {LANDING_WORKFLOW.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-[24px] border border-white/8 bg-[#0d0f10] p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-mono text-sm text-[#00e5ff]">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[#9ca3af]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
                Interactive demo
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                See search, AI context, and history working together
              </h2>
              <p className="mt-4 text-base leading-7 text-[#9ca3af]">
                The product is no longer hidden behind a redirect-only homepage.
                You now have a real marketing route at `/`, while authenticated
                users still move directly into the workspace.
              </p>

              <div className="mt-8 space-y-4">
                {landingDemoItems.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3 text-sm text-[#d1d5db]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-[#00e5ff]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-[#0d0f10] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
              <div className="mb-5 flex items-center gap-3 border-b border-white/5 pb-4">
                {["Explorer", "Chat", "Search"].map((tab, index) => (
                  <div
                    key={tab}
                    className={`rounded-full px-3 py-1.5 text-xs ${
                      index === 0
                        ? "bg-[#00e5ff] text-[#08090a]"
                        : "border border-white/8 text-[#9ca3af]"
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-[220px_1fr]">
                <div className="rounded-2xl border border-white/8 bg-[#08090a] p-3">
                  <p className="px-2 pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#6b7280]">
                    stripe-node / src
                  </p>
                  <div className="space-y-1">
                    {[
                      ["checkout.ts", "312 lines"],
                      ["payment.ts", "189 lines"],
                      ["webhooks.ts", "421 lines"],
                    ].map(([name, meta], index) => (
                      <div
                        key={name}
                        className={`rounded-xl px-3 py-3 ${
                          index === 0
                            ? "border border-[#00e5ff]/20 bg-[#00e5ff]/8"
                            : "border border-transparent text-[#9ca3af]"
                        }`}
                      >
                        <p className="font-mono text-sm text-white">{name}</p>
                        <p className="mt-1 text-xs text-[#6b7280]">{meta}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-[#08090a] p-4">
                  <div className="space-y-2 font-mono text-sm">
                    {[
                      [144, "const shouldSkipSCA = charge.amount < 3000 && !charge.is_eu_customer;"],
                      [147, "if (shouldSkipSCA) {"],
                      [148, "  return checkout.complete();"],
                    ].map(([line, code], index) => (
                      <div
                        key={line}
                        className={`flex gap-4 rounded-lg px-3 py-2 ${
                          index > 0 ? "border-l-2 border-[#fde68a]/40 bg-[#fde68a]/[0.04]" : ""
                        }`}
                      >
                        <span className="w-8 text-right text-[#374151]">{line}</span>
                        <span className="text-[#cbd5e1]">{code}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/6 p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="mt-0.5 h-4 w-4 text-[#00e5ff]" />
                      <p className="text-sm leading-7 text-[#cbd5e1]">
                        Repo Insights links these lines to PR #2190 and shows the
                        reasoning behind the shortcut before you touch the code.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
              Pricing
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Simple plans as the platform grows
            </h2>
            <p className="mt-4 text-base leading-7 text-[#9ca3af]">
              Start with the landing experience, move into auth, then expand into
              more product modules without rewriting the structure again.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {LANDING_PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[28px] p-8 ${
                  plan.featured
                    ? "border border-[#00e5ff]/25 bg-[#0d1117] shadow-[0_0_0_1px_rgba(0,229,255,0.08),0_24px_80px_rgba(0,0,0,0.45)]"
                    : "border border-white/8 bg-[#0d0f10]"
                }`}
              >
                <p className={`font-mono text-xs uppercase tracking-[0.22em] ${plan.featured ? "text-[#00e5ff]" : "text-[#6b7280]"}`}>
                  {plan.name}
                </p>
                <div className="mt-5 flex items-end gap-2">
                  <span className="font-mono text-5xl font-semibold tracking-[-0.05em] text-white">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && plan.price !== "Free" && (
                    <span className="pb-2 text-sm text-[#6b7280]">/ month</span>
                  )}
                </div>
                <p className="mt-4 min-h-14 text-sm leading-7 text-[#9ca3af]">
                  {plan.description}
                </p>
                <Link
                  href="/signup"
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                    plan.featured
                      ? "bg-[#00e5ff] text-[#08090a] hover:bg-[#33ecff]"
                      : "border border-white/10 bg-white/[0.03] text-[#d1d5db] hover:border-white/20 hover:text-white"
                  }`}
                >
                  {plan.featured ? "Start Pro trial" : "Start now"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="my-6 h-px bg-white/6" />
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-[#d1d5db]">
                      <Check className={`mt-0.5 h-4 w-4 ${plan.featured ? "text-[#00e5ff]" : "text-[#6b7280]"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-[32px] border border-[#00e5ff]/15 bg-[#0d0f10] px-8 py-16 text-center shadow-[0_24px_100px_rgba(0,0,0,0.45)] sm:px-12">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
              Get started today
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Stop reading code.
              <br />
              Start understanding it.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#9ca3af]">
              The landing experience is now inside the main product app, and the
              folder structure is ready for more modules like docs, blog, or new
              product surfaces.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-[#00e5ff] px-6 py-3 text-sm font-semibold text-[#08090a]"
              >
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[#d1d5db]"
              >
                Open workspace
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-[#08090a]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 text-sm text-[#6b7280] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="font-mono text-sm text-white">Repo Insights</p>
            <p className="mt-2">Developer intelligence for modern engineering teams.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <Link href="/login" className="hover:text-white">Login</Link>
            <Link href="/signup" className="hover:text-white">Signup</Link>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
