import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Binary,
  BriefcaseBusiness,
  Bug,
  ChartNoAxesCombined,
  CircleCheckBig,
  Globe,
  HeartHandshake,
  MapPinned,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { ProductBrand } from "@/shared/ui/product-brand";
import { PRODUCT_TAGLINE } from "@/shared/lib/brand";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";

const companyNav = [
  { id: "about", label: "About" },
  { id: "team", label: "Team" },
  { id: "diversity", label: "Diversity" },
  { id: "network-map", label: "Network Map" },
  { id: "impact", label: "Impact" },
] as const;

const benefits = [
  {
    title: "Faster engineering context",
    body: "Surface commit history, ownership, and repository behavior in one product view instead of chasing context across multiple tools.",
    icon: Rocket,
  },
  {
    title: "Lower debugging cost",
    body: "Give teams grounded repository insights so they spend less time reconstructing system intent and more time fixing the real issue.",
    icon: Bug,
  },
  {
    title: "Better organizational visibility",
    body: "Connect teams, repos, and change patterns so engineering leaders can see how delivery health and codebase complexity evolve.",
    icon: ChartNoAxesCombined,
  },
] as const;

const proofStats = [
  { label: "Engineering teams supported", value: "180+" },
  { label: "Repository events analyzed weekly", value: "42M" },
  { label: "Mean time to context reduced", value: "63%" },
  { label: "Countries with active users", value: "27" },
] as const;

const teamMembers = [
  {
    name: "Aarav Menon",
    role: "Co-founder & CEO",
    bio: "Former engineering leader focused on helping teams move faster without losing clarity across large codebases.",
    detail: "Favorite tools: Linear, Notion, Raycast",
  },
  {
    name: "Meera Shah",
    role: "Head of Product",
    bio: "Turns developer pain points into product systems that are calm, clear, and useful in daily work.",
    detail: "Weekend mode: pottery and long walks",
  },
  {
    name: "Ishaan Rao",
    role: "Founding Engineer",
    bio: "Builds the data and app foundations behind repository analytics, permissions, and engineering insights.",
    detail: "Favorite tools: Neovim, Docker, Postgres",
  },
  {
    name: "Naina Kapoor",
    role: "Design Lead",
    bio: "Designs interfaces that make technical complexity feel approachable without oversimplifying the work.",
    detail: "Loves: Figma, typography, field notes",
  },
] as const;

const diversityValues = [
  {
    title: "Inclusive hiring",
    body: "We evaluate for problem solving, collaboration, and product judgment rather than over-indexing on pedigree or narrow career paths.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Healthy team culture",
    body: "Clear writing, respectful feedback, and sustainable pace matter because they make the product and the team stronger over time.",
    icon: HeartHandshake,
  },
  {
    title: "Transparent progress",
    body: "We share where we are improving and where we still have work to do, especially around access, representation, and opportunity.",
    icon: CircleCheckBig,
  },
] as const;

const networkNodes = [
  { left: "12%", top: "30%", size: "h-3 w-3" },
  { left: "26%", top: "58%", size: "h-2.5 w-2.5" },
  { left: "38%", top: "20%", size: "h-4 w-4" },
  { left: "52%", top: "46%", size: "h-3 w-3" },
  { left: "65%", top: "28%", size: "h-2.5 w-2.5" },
  { left: "78%", top: "60%", size: "h-3.5 w-3.5" },
  { left: "88%", top: "34%", size: "h-2.5 w-2.5" },
] as const;

const networkStats = [
  { label: "Countries", value: "27" },
  { label: "Active users", value: "14.8k" },
  { label: "Repos tracked", value: "96k+" },
] as const;

const caseStudies = [
  {
    title: "Release confidence",
    outcome: "31% faster release preparation",
    body: "A platform team used Repo Insights to tie risky modules to historical changes and ownership before each release window.",
  },
  {
    title: "Bug investigation",
    outcome: "44% fewer repeat bug escalations",
    body: "Engineering managers used repository insight trails to spot fragile paths and clarify accountability across service boundaries.",
  },
] as const;

const comparisons = [
  {
    before: "PR history buried across tools, tribal knowledge, and ad-hoc spreadsheets.",
    after: "Searchable context linked directly to repos, commits, ownership, and engineering workflows.",
  },
  {
    before: "Debugging starts with guesswork and handoffs between teams.",
    after: "Teams begin with a shared understanding of code behavior and change lineage.",
  },
] as const;

const testimonials = [
  {
    quote: "Repo Insights cuts through the fog. New engineers get useful context in minutes instead of spending a week reconstructing history.",
    author: "VP Engineering, B2B Infra Platform",
  },
  {
    quote: "The value is not just analytics. It is the confidence teams gain when they can see how code, changes, and ownership connect.",
    author: "Director of Platform, Fintech SaaS",
  },
] as const;

export default function CompanyPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090a] text-[#f0f2f4]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,229,255,0.09),transparent_32%)]" />
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
                Company
              </p>
              <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                We help engineering teams understand repositories with the same clarity they expect from production systems.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[#c4d3da] sm:text-lg">
                Repo Insights is a repository analytics and engineering intelligence platform that turns commits,
                pull requests, ownership, and code activity into practical context for faster decisions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {companyNav.map((item) => (
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
                  href="/#features"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#00e5ff] px-6 py-3 text-sm font-semibold text-[#08090a] transition hover:bg-[#33ecff]"
                >
                  Explore the platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/getting-started#plans"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[#d1d5db] transition hover:border-white/20 hover:text-white"
                >
                  View pricing
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {proofStats.map((stat) => (
                <div
                  key={stat.label}
                  className="interactive-tile rounded-[24px] border border-white/10 bg-[#0d1117]/88 p-6"
                >
                  <p className="font-mono text-3xl font-semibold tracking-[-0.04em] text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#9ca3af]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
                Why we built this
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Engineering organizations produce more code every quarter, but shared context does not scale the same way.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[#9ca3af]">
                We built Repo Insights because understanding a repository still depends too much on tribal knowledge,
                fragmented tooling, and expensive investigation time. Teams deserve a product that turns raw engineering
                activity into usable insight without slowing delivery down.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {benefits.map(({ title, body, icon: Icon }) => (
                  <div
                    key={title}
                    className="interactive-tile rounded-[24px] border border-white/8 bg-[#0d0f10] p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/10 text-[#00e5ff]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#9ca3af]">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="interactive-tile rounded-[32px] border border-white/8 bg-[#0d0f10] p-8">
              <div className="rounded-[28px] border border-white/8 bg-[#08090a] p-6">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/10 text-[#00e5ff]">
                    <Binary className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#6b7280]">
                      Repository analytics
                    </p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      Engineering context, not just dashboards
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    "Link code activity to ownership and change velocity.",
                    "Understand why systems evolved before touching a risky area.",
                    "Give leaders better visibility without adding reporting overhead.",
                    "Support onboarding with answers grounded in repository history.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4">
                      <CircleCheckBig className="mt-0.5 h-4 w-4 text-[#00e5ff]" />
                      <p className="text-sm leading-7 text-[#cbd5e1]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="team" className="scroll-mt-28 border-t border-white/5 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
              Team
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              The people behind the product care deeply about how engineering teams actually work.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#9ca3af]">
              Our culture is technical, collaborative, and product-minded. We value clarity, direct communication,
              thoughtful execution, and building tools that help teams make better decisions every day.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="interactive-tile group rounded-[28px] border border-white/8 bg-[#0d0f10] p-6"
              >
                <Avatar className="h-16 w-16 border border-[#00e5ff]/20 bg-[#00e5ff]/10">
                  <AvatarFallback className="bg-transparent text-base font-semibold text-[#8ef5ff]">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-5 text-xl font-semibold text-white">{member.name}</h3>
                <p className="mt-1 text-sm text-[#8ef5ff]">{member.role}</p>
                <p className="mt-4 text-sm leading-7 text-[#9ca3af]">{member.bio}</p>
                <div className="mt-5 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm text-[#cbd5e1] opacity-80 transition group-hover:opacity-100">
                  {member.detail}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[#d1d5db] transition hover:border-white/20 hover:text-white"
            >
              We&apos;re hiring
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section id="diversity" className="scroll-mt-28 border-t border-white/5 py-24">
          <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#9bd7b2]">
                Diversity
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                We want different voices, backgrounds, and working styles shaping both the product and the team.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#9ca3af]">
                Inclusive teams build better systems. We try to create a hiring and working environment where people can do strong work,
                communicate clearly, and grow without needing to match a narrow template for what a technical career should look like.
              </p>

              <div className="mt-8 rounded-[28px] border border-emerald-300/12 bg-[linear-gradient(135deg,rgba(125,211,170,0.08),rgba(13,15,16,0.9))] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9bd7b2]">
                  Transparency note
                </p>
                <p className="mt-4 text-sm leading-7 text-[#cbd5e1]">
                  We are committed to inclusive hiring, clear feedback, and creating opportunities for people who may not follow traditional routes into engineering.
                  We treat this as ongoing work, not a finished statement.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {diversityValues.map(({ title, body, icon: Icon }) => (
                <div
                  key={title}
                  className="interactive-tile rounded-[24px] border border-emerald-300/10 bg-[#0d0f10] p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/14 bg-emerald-300/8 text-[#9bd7b2]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{title}</h3>
                      <p className="mt-3 text-sm leading-7 text-[#9ca3af]">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#9bd7b2] px-6 py-3 text-sm font-semibold text-[#0d1117] transition hover:bg-[#b6e7c8]"
            >
              Talk to us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section id="network-map" className="scroll-mt-28 border-t border-white/5 py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
                Network Map
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Repo Insights is built for globally distributed engineering organizations.
              </h2>
              <p className="mt-5 text-base leading-8 text-[#9ca3af]">
                Our platform is designed to help teams understand repository activity across regions, time zones, and organizational boundaries.
                The goal is simple: make global engineering visibility feel as operationally reliable as production telemetry.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {networkStats.map((stat) => (
                  <div key={stat.label} className="interactive-tile rounded-[22px] border border-white/8 bg-[#0d0f10] p-5">
                    <p className="font-mono text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-[#9ca3af]">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[24px] border border-white/8 bg-[#0d0f10] p-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 text-[#8ef5ff]" />
                  <div>
                    <p className="text-base font-semibold text-white">Privacy stays part of the architecture</p>
                    <p className="mt-3 text-sm leading-7 text-[#9ca3af]">
                      We believe global reach only matters if trust scales with it. Repository and user data should be handled with clear boundaries,
                      explicit access controls, and infrastructure choices that respect team privacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="interactive-tile rounded-[32px] border border-white/8 bg-[#0b1016] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
              <div className="relative h-[420px] overflow-hidden rounded-[28px] border border-white/8 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.08),rgba(5,8,14,0.94)_58%)]">
                <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:22px_22px]" />

                <div className="absolute left-[14%] top-[34%] h-px w-[32%] rotate-[13deg] bg-gradient-to-r from-transparent via-[#00e5ff]/80 to-transparent" />
                <div className="absolute left-[30%] top-[53%] h-px w-[26%] -rotate-[18deg] bg-gradient-to-r from-transparent via-[#00e5ff]/60 to-transparent" />
                <div className="absolute left-[52%] top-[39%] h-px w-[28%] rotate-[20deg] bg-gradient-to-r from-transparent via-[#7dd3fc]/70 to-transparent" />
                <div className="absolute left-[38%] top-[26%] h-px w-[28%] bg-gradient-to-r from-transparent via-[#00e5ff]/70 to-transparent" />

                {networkNodes.map((node) => (
                  <div
                    key={`${node.left}-${node.top}`}
                    className={`absolute ${node.size} rounded-full bg-[#00e5ff] shadow-[0_0_20px_rgba(0,229,255,0.9)]`}
                    style={{ left: node.left, top: node.top }}
                  />
                ))}

                <div className="absolute left-6 top-6 rounded-2xl border border-white/8 bg-[#0d1117]/90 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#8ef5ff]" />
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#8ef5ff]">
                      Global reach
                    </p>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 rounded-2xl border border-white/8 bg-[#0d1117]/90 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <MapPinned className="h-4 w-4 text-[#8ef5ff]" />
                    <p className="text-sm text-[#d1d5db]">Teams operating across regions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="impact" className="scroll-mt-28 border-t border-white/5 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
              Impact
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              Better visibility leads to faster releases, fewer bugs, and stronger coordination.
            </h2>
            <p className="mt-5 text-base leading-8 text-[#9ca3af]">
              We focus on outcomes teams can feel in daily work: less uncertainty, better debugging, cleaner ownership signals, and faster delivery loops.
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {caseStudies.map((study) => (
              <div
                key={study.title}
                className="interactive-tile rounded-[28px] border border-white/8 bg-[#0d0f10] p-7"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6b7280]">
                  Case study
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">{study.title}</h3>
                <p className="mt-3 text-lg text-[#8ef5ff]">{study.outcome}</p>
                <p className="mt-4 text-sm leading-7 text-[#9ca3af]">{study.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {comparisons.map((item, index) => (
              <div
                key={index}
                className="interactive-tile rounded-[28px] border border-white/8 bg-[#0d0f10] p-7"
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-[22px] border border-red-300/12 bg-red-300/6 p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-red-200">
                      Before
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#d1d5db]">{item.before}</p>
                  </div>
                  <div className="rounded-[22px] border border-emerald-300/12 bg-emerald-300/6 p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-200">
                      After
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[#d1d5db]">{item.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {testimonials.map((item) => (
              <div
                key={item.author}
                className="interactive-tile rounded-[28px] border border-white/8 bg-[#0d0f10] p-7"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-[#00e5ff]" />
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#6b7280]">
                    Customer perspective
                  </p>
                </div>
                <p className="mt-5 text-lg leading-8 text-[#e6edf3]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-5 text-sm text-[#8ef5ff]">{item.author}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/#features"
              className="inline-flex items-center gap-2 rounded-xl bg-[#00e5ff] px-6 py-3 text-sm font-semibold text-[#08090a] transition hover:bg-[#33ecff]"
            >
              Explore the platform
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="border-t border-white/5 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-white/8 bg-[#0d0f10] px-6 py-5">
            <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
              <Users className="h-4 w-4 text-[#8ef5ff]" />
              Built for engineering teams that need sharper repository visibility.
            </div>
            <div className="flex items-center gap-3 text-sm text-[#9ca3af]">
              <ShieldCheck className="h-4 w-4 text-[#8ef5ff]" />
              Privacy-aware by design.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
