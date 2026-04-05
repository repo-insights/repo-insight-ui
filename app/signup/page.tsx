"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2, Sparkles } from "lucide-react";
import { useSessionBootstrap, useSignup } from "@/modules/auth/api/hooks";
import { AuthShell } from "@/modules/auth/components/auth-shell";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { FormField } from "@/shared/forms/form-field";
import { clearEmailVerificationSignal } from "@/shared/lib/email-verification";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  tenant_name: z.string().min(2, "Workspace name must be at least 2 characters"),
  join_existing_workspace: z.boolean(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[0-9]/, "Must include at least one number"),
});

type FormValues = z.infer<typeof schema>;

function PasswordRule({
  met,
  label,
}: {
  met: boolean;
  label: string;
}) {
  return (
    <div className={`flex items-center gap-1.5 text-xs ${met ? "text-emerald-400" : "text-muted-foreground"}`}>
      <Check className={`h-3 w-3 ${met ? "opacity-100" : "opacity-30"}`} />
      {label}
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const signupMutation = useSignup();
  const { isReady, isAuthenticated } = useSessionBootstrap();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      join_existing_workspace: false,
    },
  });

  const password = watch("password", "");
  const joinExistingWorkspace = watch("join_existing_workspace", false);

  const onSubmit = async (data: FormValues) => {
    try {
      clearEmailVerificationSignal();
      const result = await signupMutation.mutateAsync(data);
      router.replace(
        `/signup/verify?email=${encodeURIComponent(result.email)}&tenant_slug=${encodeURIComponent(result.tenant_slug)}&requires_workspace_approval=${String(Boolean(result.requires_workspace_approval))}`
      );
    } catch {
      // error shown below
    }
  };

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isReady, router]);

  if (!isReady) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <AuthShell
      eyebrow="Start your workspace"
      title="Create your account"
      description="Set up your team owner profile and create the workspace your teammates will join."
      footerText="Already have an account?"
      footerLinkHref="/login"
      footerLinkLabel="Sign in"
      sideTitle="Create the space your team will log into every day."
      sideDescription="The first account configures your workspace, invites your team, and unlocks the rest of the product flow without changing the visual language you already have."
      stats={[
        { label: "Free trial", value: "14 days" },
        { label: "Owner setup", value: "3 mins" },
        { label: "Team ready", value: "Day one" },
      ]}
      sideNote="Your workspace name becomes the team identifier during setup. After account creation, we send a verification email before the first sign-in."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="Full name" error={errors.name?.message}>
          <Input
            {...register("name")}
            placeholder="Alice Smith"
            autoComplete="name"
            className={errors.name ? "border-destructive" : "h-11 rounded-xl"}
          />
        </FormField>

        <FormField label="Work email" error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            placeholder="alice@company.com"
            autoComplete="email"
            className={errors.email ? "border-destructive" : "h-11 rounded-xl"}
          />
        </FormField>

        <FormField
          label="Workspace name"
          error={errors.tenant_name?.message}
          hint={
            joinExistingWorkspace
              ? "Use the exact workspace name you want to join"
              : "This will be your team's identifier"
          }
        >
          <Input
            {...register("tenant_name")}
            placeholder="Acme Inc."
            className={errors.tenant_name ? "border-destructive" : "h-11 rounded-xl"}
          />
        </FormField>

        <label className="flex items-start gap-3 rounded-2xl border border-border/80 bg-background/40 px-4 py-3">
          <input
            {...register("join_existing_workspace")}
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border border-border bg-input"
          />
          <div>
            <p className="text-sm font-medium">Join an existing workspace</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Turn this on if your company already has a workspace and you want
              to request access instead of creating a new one.
            </p>
          </div>
        </label>

        <FormField label="Password" error={errors.password?.message}>
          <Input
            {...register("password")}
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={errors.password ? "border-destructive" : "h-11 rounded-xl"}
          />
          <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-3">
            <PasswordRule met={password.length >= 8} label="8+ chars" />
            <PasswordRule met={/[A-Z]/.test(password)} label="Uppercase" />
            <PasswordRule met={/[0-9]/.test(password)} label="Number" />
          </div>
        </FormField>

        {signupMutation.error && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3">
            <p className="text-sm text-destructive">
              {(signupMutation.error as { message?: string })?.message ??
                "Something went wrong. Please try again."}
            </p>
          </div>
        )}

        <div className="rounded-2xl border border-border/80 bg-background/50 p-3">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-5 text-muted-foreground">
              We&apos;ll send a verification email right after signup. If
              you&apos;re joining an existing workspace, an admin may need to
              approve your access after verification.
            </p>
          </div>
        </div>

        <Button
          type="submit"
          className="mt-2 h-11 w-full rounded-xl"
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating request…
            </>
          ) : (
            "Create account"
          )}
        </Button>
      </form>

      <p className="mt-4 text-center text-xs leading-5 text-muted-foreground">
        By signing up you agree to our{" "}
        <span className="cursor-pointer underline underline-offset-2">Terms</span> and{" "}
        <span className="cursor-pointer underline underline-offset-2">
          Privacy Policy
        </span>
        .
      </p>
    </AuthShell>
  );
}
