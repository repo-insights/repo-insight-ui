"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUp, Bug, Lightbulb, Wrench } from "lucide-react";
import { ProductBrand } from "@/shared/ui/product-brand";
import { PRODUCT_TAGLINE } from "@/shared/lib/brand";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";

type SuggestionCategory = "feature" | "bug" | "improvement";

type SuggestionItem = {
  id: string;
  title: string;
  description: string;
  category: SuggestionCategory;
  votes: number;
};

const initialSuggestions: SuggestionItem[] = [
  {
    id: "feedback-1",
    title: "Saved investigation views for recurring incidents",
    description: "Let teams pin a repository search plus ownership context as a reusable troubleshooting view.",
    category: "feature",
    votes: 24,
  },
  {
    id: "feedback-2",
    title: "Clearer loading state while repository analytics refresh",
    description: "Some pages feel abrupt during refresh. A more explicit loading indicator would reduce confusion.",
    category: "improvement",
    votes: 18,
  },
  {
    id: "feedback-3",
    title: "Fix sidebar active state on nested routes",
    description: "Certain deeper pages do not always highlight the right navigation item.",
    category: "bug",
    votes: 11,
  },
];

const categoryMeta = {
  feature: { label: "Feature", icon: Lightbulb },
  bug: { label: "Bug", icon: Bug },
  improvement: { label: "Improvement", icon: Wrench },
} as const;

export default function SuggestionsPage() {
  const [category, setCategory] = useState<SuggestionCategory>("feature");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const sortedSuggestions = useMemo(
    () => [...suggestions].sort((a, b) => b.votes - a.votes),
    [suggestions]
  );

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
            Feedback
          </p>
          <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Help shape what Repo Insights builds next
          </h1>
          <p className="mt-5 text-base leading-8 text-[#9ca3af] sm:text-lg">
            Share ideas, vote on what matters most, and tell us where the product can become more useful for engineering teams.
          </p>
        </section>

        <section className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="interactive-tile rounded-[32px] border border-white/8 bg-[#0d0f10] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00e5ff]">
              Submit an idea
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-white">Category</label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {(["feature", "bug", "improvement"] as SuggestionCategory[]).map((item) => {
                    const active = category === item;
                    const Icon = categoryMeta[item].icon;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCategory(item)}
                        className={`rounded-xl border px-4 py-3 text-sm transition ${
                          active
                            ? "border-[#00e5ff]/30 bg-[#00e5ff]/12 text-white"
                            : "border-white/10 bg-white/[0.02] text-[#9ca3af] hover:border-white/20 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Icon className="h-4 w-4" />
                          {categoryMeta[item].label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">Idea title</label>
                <Input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="What would make Repo Insights better?"
                  className="h-11 rounded-xl bg-white/[0.03]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white">More detail</label>
                <Textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the workflow, pain point, or bug you want us to solve."
                  className="min-h-36 rounded-xl bg-white/[0.03]"
                />
              </div>

              <Button
                className="h-11 w-full rounded-xl"
                onClick={() => {
                  if (!title.trim()) return;

                  setSuggestions((current) => [
                    {
                      id: `feedback-${current.length + 1}`,
                      title: title.trim(),
                      description: description.trim() || "No additional detail yet.",
                      category,
                      votes: 1,
                    },
                    ...current,
                  ]);
                  setTitle("");
                  setDescription("");
                  setCategory("feature");
                }}
              >
                Submit feedback
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {sortedSuggestions.map((item) => {
              const Icon = categoryMeta[item.category].icon;
              return (
                <div
                  key={item.id}
                  className="interactive-tile flex gap-4 rounded-[28px] border border-white/8 bg-[#0d0f10] p-5 sm:p-6"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setSuggestions((current) =>
                        current.map((entry) =>
                          entry.id === item.id
                            ? { ...entry, votes: entry.votes + 1 }
                            : entry
                        )
                      )
                    }
                    className="flex min-w-16 flex-col items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-4 text-[#d1d5db] transition hover:border-[#00e5ff]/30 hover:text-white"
                  >
                    <ArrowUp className="h-4 w-4" />
                    <span className="mt-2 text-sm font-semibold">{item.votes}</span>
                  </button>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs text-[#9ca3af]">
                        <Icon className="h-3.5 w-3.5" />
                        {categoryMeta[item.category].label}
                      </span>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[#9ca3af]">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
