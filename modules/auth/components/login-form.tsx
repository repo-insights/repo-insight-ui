"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { useLogin, useSessionBootstrap } from "@/modules/auth/api/hooks";
import { AuthShell } from "@/modules/auth/components/auth-shell";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { FormField } from "@/shared/forms/form-field";

const schema = z.object({
  tenant_slug: z.string().min(1, "Workspace is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

type LoginFormProps = {
  defaultEmail: string;
  defaultTenantSlug: string;
};

export default function LoginForm({
  defaultEmail,
  defaultTenantSlug,
}: LoginFormProps) {
  const router = useRouter();
  const loginMutation = useLogin();
  const { isReady, isAuthenticated } = useSessionBootstrap();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      tenant_slug: defaultTenantSlug,
      email: defaultEmail,
      password: "",
    },
  });

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isReady, router]);

  const onSubmit = async (data: FormValues) => {
    try {
      await loginMutation.mutateAsync(data);
      router.replace("/dashboard");
    } catch {
      // error shown below
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-background" />
    );
  }

  return (
    <AuthShell
      eyebrow="Secure sign in"
      title="Welcome back"
      description="Access your workspace with the same account and team slug you used during setup."
      footerText="Don't have an account?"
      footerLinkHref="/signup"
      footerLinkLabel="Sign up"
      sideTitle="Pick up where your team left off."
      sideDescription="Repo Insights keeps workspace access focused and fast, so teams can move from login to action without friction."
      stats={[
        { label: "Team spaces", value: "1K+" },
        { label: "Protected logins", value: "99.9%" },
        { label: "Daily sessions", value: "24/7" },
      ]}
      sideNote="Use your workspace slug to land in the right environment instantly. That keeps team data separated while making sign-in feel straightforward for every member."
    >
      {defaultEmail && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-border/80 bg-background/60 px-4 py-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-sm text-muted-foreground">
            Your email was verified. Sign in to continue with the same address
            {defaultTenantSlug ? ` and ${defaultTenantSlug} workspace.` : "."}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          label="Workspace slug"
          error={errors.tenant_slug?.message}
          hint="Use the slug, not the workspace display name"
        >
          <Input
            {...register("tenant_slug")}
            placeholder="acme-inc"
            autoComplete="organization"
            className={errors.tenant_slug ? "border-destructive" : "h-11 rounded-xl"}
          />
        </FormField>

        <FormField label="Email" error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            className={errors.email ? "border-destructive" : "h-11 rounded-xl"}
          />
        </FormField>

        <FormField label="Password" error={errors.password?.message}>
          <Input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className={errors.password ? "border-destructive" : "h-11 rounded-xl"}
          />
        </FormField>

        {loginMutation.error && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3">
            <p className="text-sm text-destructive">
              {(loginMutation.error as { message?: string })?.message ??
                "Invalid credentials. Please try again."}
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-border/80 bg-background/50 p-3">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-5 text-muted-foreground">
              Tip: if you just verified your email, use the same address here to
              avoid a second verification step.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="mt-2 h-11 w-full rounded-xl"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
