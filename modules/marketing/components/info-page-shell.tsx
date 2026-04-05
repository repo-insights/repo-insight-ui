import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductBrand } from "@/shared/ui/product-brand";
import { PRODUCT_TAGLINE } from "@/shared/lib/brand";

type InfoPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  ctaTitle: string;
  ctaDescription: string;
  ctaHref: string;
  ctaLabel: string;
};

export function InfoPageShell({
  eyebrow,
  title,
  description,
  sections,
  ctaTitle,
  ctaDescription,
  ctaHref,
  ctaLabel,
}: InfoPageShellProps) {
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

      <main className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <section className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-base leading-8 text-[#9ca3af] sm:text-lg">
            {description}
          </p>
        </section>

        <section className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="interactive-tile rounded-[24px] border border-white/8 bg-[#0d0f10] p-7"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#00e5ff]">
                {section.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-[#cbd5e1]">
                {section.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mx-auto mt-16 max-w-4xl">
          <div className="interactive-tile rounded-[32px] border border-[#00e5ff]/15 bg-[#0d0f10] px-6 py-12 text-center shadow-[0_24px_100px_rgba(0,0,0,0.45)] sm:px-10">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
              Next step
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              {ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#9ca3af]">
              {ctaDescription}
            </p>
            <div className="mt-8">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-xl bg-[#00e5ff] px-6 py-3 text-sm font-semibold text-[#08090a] transition hover:bg-[#33ecff]"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
