import Link from "next/link";
import {
  ArrowLeft,
  BookOpenText,
  FileCheck2,
  FileLock2,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { ProductBrand } from "@/shared/ui/product-brand";
import { PRODUCT_TAGLINE } from "@/shared/lib/brand";

const tocItems = [
  { id: "docs", label: "Documentation" },
  { id: "privacy-policy", label: "Privacy Policy" },
  { id: "terms-and-conditions", label: "Terms & Conditions" },
  { id: "acceptable-use-policy", label: "Acceptable Use Policy" },
] as const;

const docsSections = [
  {
    title: "Start here",
    body: "Repo Insights helps engineering teams understand repositories, commit history, ownership, and debugging context faster. The best first step is to explore pricing, onboarding flow, and the product walkthrough.",
  },
  {
    title: "What you can learn",
    body: "Documentation should make it easy to understand setup, plans, repository analytics, AI-assisted investigation, and collaboration workflows without forcing teams to guess how the platform fits their process.",
  },
  {
    title: "Who it is for",
    body: "The platform is built for engineering teams, managers, platform groups, and growing organizations that need better repository visibility and faster context-sharing.",
  },
] as const;

const privacySections = [
  {
    heading: "What data we collect",
    body: "We may collect account details such as name, work email, company, authentication identifiers, workspace metadata, and product usage information such as page activity, plan selections, and support requests. If your organization connects repositories, we may also process repository metadata and related operational context needed to power product features.",
  },
  {
    heading: "How we use it",
    body: "We use data to operate the service, secure accounts, improve product performance, support billing and customer communication, and generate repository analytics or engineering insights requested by authorized users. We do not believe in collecting data just because it is available.",
  },
  {
    heading: "Security practices",
    body: "We use access controls, authentication safeguards, scoped permissions, and infrastructure protections designed to reduce unauthorized access. Security is treated as a product and operational responsibility, not just a legal promise.",
  },
  {
    heading: "Your rights",
    body: "Users can ask about the personal data associated with their account, request updates when information is inaccurate, and ask for deletion or export where applicable. The exact process may depend on your region and your organization’s role as the data owner.",
  },
];

const termsSections = [
  {
    heading: "User responsibilities",
    body: "You are responsible for keeping account credentials secure, using the service through authorized access, and ensuring that the information you provide is accurate and current.",
  },
  {
    heading: "Service usage rules",
    body: "You may use Repo Insights only for lawful business or professional purposes related to understanding repositories, engineering workflows, and operational context. You may not use the service in ways that interfere with other customers or violate applicable law.",
  },
  {
    heading: "Liability limitations",
    body: "Repo Insights is provided on an evolving software basis. While we work hard to make the service reliable and useful, we cannot guarantee uninterrupted operation or that every output will be perfect for every use case. To the fullest extent permitted by law, liability is limited to the amount paid for the service during the relevant period.",
  },
  {
    heading: "Termination conditions",
    body: "We may suspend or terminate access if an account violates these terms, creates security risk, abuses the service, or fails to meet payment obligations. Customers may also stop using the service according to their plan terms and internal administration settings.",
  },
];

const acceptableUseAllowed = [
  "Using the platform to understand repositories, code history, ownership, and engineering workflows.",
  "Collaborating within your team on debugging, onboarding, and repository visibility.",
  "Connecting data sources that you are authorized to access.",
];

const acceptableUseProhibited = [
  "Spam, harassment, or abusive content submitted through forms, invites, or shared workspace areas.",
  "Unauthorized scraping, bulk extraction, or attempts to replicate the service at scale.",
  "Security testing against the platform without explicit permission.",
  "Using the service to access repositories, teams, or data you are not authorized to view.",
  "Automated misuse that degrades platform stability, reliability, or availability for others.",
];

const enforcementActions = [
  "Rate limiting or temporary access restrictions",
  "Suspension of affected users or workspaces",
  "Removal of abusive content or misuse patterns",
  "Permanent termination in serious or repeated cases",
];

export default function ResourcesCenterPage() {
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
        <section className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">Resources</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Documentation and policy center
          </h1>
          <p className="mt-5 text-base leading-8 text-[#9ca3af] sm:text-lg">
            A single place to learn how Repo Insights works and understand the rules, rights, and responsibilities that shape the platform.
          </p>
        </section>

        <section className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="interactive-tile rounded-[24px] border border-white/8 bg-[#0d0f10] p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#00e5ff]">On this page</p>
              <nav className="mt-4 flex flex-col gap-2 text-sm">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="rounded-lg px-3 py-2 text-[#9ca3af] transition hover:bg-white/[0.03] hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="mx-auto w-full max-w-3xl space-y-10">
            <section id="docs" className="scroll-mt-28 rounded-[28px] border border-white/8 bg-[#0d0f10] p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/10 text-[#00e5ff]">
                  <BookOpenText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#00e5ff]">Documentation</p>
                  <h2 className="mt-1 text-3xl font-semibold text-white">Start with the product fundamentals</h2>
                </div>
              </div>
              <div className="mt-6 space-y-5">
                {docsSections.map((section) => (
                  <div key={section.title} className="rounded-[22px] border border-white/8 bg-[#08090a] p-5">
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[#9ca3af]">{section.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/getting-started#plans" className="inline-flex items-center gap-2 rounded-xl bg-[#00e5ff] px-5 py-3 text-sm font-semibold text-[#08090a] transition hover:bg-[#33ecff]">
                  View getting started
                </Link>
                <Link href="/company#about" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-[#d1d5db] transition hover:border-white/20 hover:text-white">
                  Learn about the company
                </Link>
              </div>
            </section>

            <section id="privacy-policy" className="scroll-mt-28 rounded-[28px] border border-white/8 bg-[#0d0f10] p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/10 text-[#00e5ff]">
                  <FileLock2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#00e5ff]">Privacy Policy</p>
                  <h2 className="mt-1 text-3xl font-semibold text-white">A simple explanation of how we handle data</h2>
                </div>
              </div>
              <div className="mt-6 space-y-6">
                {privacySections.map((section) => (
                  <div key={section.heading}>
                    <h3 className="text-xl font-semibold text-white">{section.heading}</h3>
                    <p className="mt-3 text-sm leading-8 text-[#9ca3af]">{section.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="terms-and-conditions" className="scroll-mt-28 rounded-[28px] border border-white/8 bg-[#0d0f10] p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9ca3af]">Terms and Conditions</p>
                  <h2 className="mt-1 text-3xl font-semibold text-white">Clear rules for using the service</h2>
                </div>
              </div>
              <div className="mt-6 space-y-6">
                {termsSections.map((section) => (
                  <div key={section.heading}>
                    <h3 className="text-xl font-semibold text-white">{section.heading}</h3>
                    <p className="mt-3 text-sm leading-8 text-[#9ca3af]">{section.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="acceptable-use-policy" className="scroll-mt-28 rounded-[28px] border border-white/8 bg-[#0d0f10] p-7 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/14 bg-amber-300/8 text-amber-200">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-200">Acceptable Use Policy</p>
                  <h2 className="mt-1 text-3xl font-semibold text-white">Use the platform responsibly and keep it safe for everyone</h2>
                </div>
              </div>

              <div className="mt-6 space-y-8">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#00e5ff]" />
                    <h3 className="text-xl font-semibold text-white">Allowed behaviors</h3>
                  </div>
                  <ul className="space-y-3 text-sm leading-7 text-[#9ca3af]">
                    {acceptableUseAllowed.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#00e5ff]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-amber-200" />
                    <h3 className="text-xl font-semibold text-white">Prohibited behaviors</h3>
                  </div>
                  <ul className="space-y-3 text-sm leading-7 text-[#9ca3af]">
                    {acceptableUseProhibited.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-red-300" />
                    <h3 className="text-xl font-semibold text-white">Enforcement actions</h3>
                  </div>
                  <ul className="space-y-3 text-sm leading-7 text-[#9ca3af]">
                    {enforcementActions.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-red-300" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
