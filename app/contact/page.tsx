"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { ProductBrand } from "@/shared/ui/product-brand";
import { PRODUCT_TAGLINE } from "@/shared/lib/brand";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { FormField } from "@/shared/forms/form-field";

const reasonOptions = [
  "General question",
  "Sales inquiry",
  "Partnership",
  "Support",
  "Press",
] as const;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

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
        <section className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#00e5ff]">
            Contact
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            We would love to hear from you
          </h1>
          <p className="mt-5 text-base leading-8 text-[#9ca3af] sm:text-lg">
            Reach out with questions, partnership ideas, or anything else you want to explore with Repo Insights.
          </p>
        </section>

        <section className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-[0.72fr_1fr]">
          <div className="space-y-4">
            <div className="interactive-tile rounded-[28px] border border-white/8 bg-[#0d0f10] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/10 text-[#00e5ff]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Email</p>
                  <p className="mt-2 text-sm leading-7 text-[#9ca3af]">hello@repoinsights.dev</p>
                </div>
              </div>
            </div>

            <div className="interactive-tile rounded-[28px] border border-white/8 bg-[#0d0f10] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/10 text-[#00e5ff]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Phone</p>
                  <p className="mt-2 text-sm leading-7 text-[#9ca3af]">+1 (415) 555-0148</p>
                </div>
              </div>
            </div>

            <div className="interactive-tile rounded-[28px] border border-white/8 bg-[#0d0f10] p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/10 text-[#00e5ff]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Office</p>
                  <p className="mt-2 text-sm leading-7 text-[#9ca3af]">
                    548 Market Street, PMB 10291
                    <br />
                    San Francisco, CA 94104
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="interactive-tile rounded-[32px] border border-white/8 bg-[#0d0f10] p-6 sm:p-8">
            {!submitted ? (
              <form
                className="mx-auto max-w-xl space-y-5"
                onSubmit={(event) => {
                  event.preventDefault();
                  setSubmitted(true);
                }}
              >
                <FormField label="Name">
                  <Input placeholder="Your name" className="h-11 rounded-xl bg-white/[0.03]" />
                </FormField>

                <FormField label="Work email">
                  <Input type="email" placeholder="you@company.com" className="h-11 rounded-xl bg-white/[0.03]" />
                </FormField>

                <FormField label="Reason">
                  <select className="flex h-11 w-full rounded-xl border border-border bg-white/[0.03] px-3 text-sm shadow-sm outline-none transition focus-visible:ring-1 focus-visible:ring-ring">
                    {reasonOptions.map((option) => (
                      <option key={option} value={option} className="bg-[#0d0f10] text-white">
                        {option}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Message" hint="Tell us a little about what you need and we will route it to the right team.">
                  <Textarea
                    placeholder="How can we help?"
                    className="min-h-36 rounded-xl bg-white/[0.03]"
                  />
                </FormField>

                <Button type="submit" className="h-11 w-full rounded-xl">
                  Send message
                </Button>
              </form>
            ) : (
              <div className="mx-auto max-w-xl text-center">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00e5ff]">
                  Message received
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Thanks for reaching out</h2>
                <p className="mt-4 text-base leading-8 text-[#9ca3af]">
                  We have captured your note. In a real flow this would go to the right queue based on the reason you selected.
                </p>
                <Button className="mt-8 rounded-xl" onClick={() => setSubmitted(false)}>
                  Send another message
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
