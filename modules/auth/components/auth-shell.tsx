import Link from "next/link";
import { Hexagon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type AuthShellStat = {
  label: string;
  value: string;
};

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  footerText: string;
  footerLinkHref: string;
  footerLinkLabel: string;
  children: React.ReactNode;
  sideTitle: string;
  sideDescription: string;
  stats: AuthShellStat[];
  sideNote: string;
  className?: string;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  footerText,
  footerLinkHref,
  footerLinkLabel,
  children,
  sideTitle,
  sideDescription,
  stats,
  sideNote,
  className,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,hsl(0_0%_100%_/_0.09),transparent_60%)]" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-border/80 bg-card/60 shadow-2xl backdrop-blur sm:min-h-[720px] lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative hidden border-r border-border/80 px-8 py-10 lg:flex lg:flex-col lg:justify-between xl:px-12">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-background/60 px-4 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground">
                  <Hexagon className="h-5 w-5 text-background" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                    Repo Insights
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Workspace access for modern teams
                  </p>
                </div>
              </div>

              <div className="mt-14 max-w-lg space-y-6">
                <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  {eyebrow}
                </p>
                <h2 className="text-4xl font-semibold leading-tight text-balance xl:text-5xl">
                  {sideTitle}
                </h2>
                <p className="max-w-md text-base leading-7 text-muted-foreground">
                  {sideDescription}
                </p>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-border/80 bg-background/50 p-4"
                  >
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-border/80 bg-background/50 p-6">
              <p className="text-sm leading-7 text-muted-foreground">{sideNote}</p>
            </div>
          </section>

          <section className="flex items-center justify-center px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
            <div className={cn("w-full max-w-md animate-fade-in", className)}>
              <div className="mb-8 flex items-center gap-3 lg:hidden">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground">
                  <Hexagon className="h-5 w-5 text-background" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-lg font-semibold tracking-tight">
                    Repo Insights
                  </p>
                  <p className="text-xs text-muted-foreground">{eyebrow}</p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-border/80 bg-card px-6 py-7 shadow-xl sm:px-8 sm:py-8">
                <div className="mb-6 space-y-3">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    {eyebrow}
                  </p>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-semibold tracking-tight text-balance">
                      {title}
                    </h1>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>

                {children}
              </div>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {footerText}{" "}
                <Link
                  href={footerLinkHref}
                  className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
                >
                  {footerLinkLabel}
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
