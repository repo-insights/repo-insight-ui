"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, CircleAlert, MailCheck, RefreshCcw } from "lucide-react";
import { AuthShell } from "@/modules/auth/components/auth-shell";
import { Button } from "@/shared/ui/button";
import {
  clearEmailVerificationSignal,
  EMAIL_VERIFICATION_STORAGE_KEY,
  readEmailVerificationSignal,
} from "@/shared/lib/email-verification";
import { useResendVerification, useSessionBootstrap } from "@/modules/auth/api/hooks";

type VerifyEmailClientProps = {
  email: string;
  tenantSlug: string;
  requiresWorkspaceApproval: boolean;
};

export default function VerifyEmailClient({
  email,
  tenantSlug,
  requiresWorkspaceApproval,
}: VerifyEmailClientProps) {
  const router = useRouter();
  const resendVerificationMutation = useResendVerification();
  const { isReady, isAuthenticated } = useSessionBootstrap();
  const [verificationDetected, setVerificationDetected] = useState(false);
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (isReady && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isReady, router]);

  useEffect(() => {
    const syncFromStorage = () => {
      const signal = readEmailVerificationSignal();
      setVerificationDetected(Boolean(signal));
    };

    syncFromStorage();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === EMAIL_VERIFICATION_STORAGE_KEY) {
        syncFromStorage();
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data?.type === "repo-insights-email-verified") {
        setVerificationDetected(true);
        setLocalError("");
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const openStateLabel = useMemo(() => {
    return verificationDetected ? "Verification detected" : "Waiting for verification";
  }, [verificationDetected]);

  const handleVerificationDone = () => {
    const signal = readEmailVerificationSignal();

    if (!signal) {
      setLocalError(
        "We could not confirm the verification in this browser yet. Finish the email verification tab first, then come back and try again."
      );
      return;
    }

    setLocalError("");
    clearEmailVerificationSignal();

    const params = new URLSearchParams();
    if (email) {
      params.set("email", email);
    }
    if (tenantSlug) {
      params.set("tenant_slug", tenantSlug);
    }

    const nextUrl = params.toString() ? `/login?${params.toString()}` : "/login";
    router.replace(nextUrl);
  };

  const handleResendVerification = async () => {
    if (!email) {
      setLocalError("We need an email address to resend the verification link.");
      return;
    }

    setLocalError("");

    try {
      clearEmailVerificationSignal();
      setVerificationDetected(false);
      await resendVerificationMutation.mutateAsync({ email });
    } catch {
      // handled by mutation state below
    }
  };

  if (!isReady) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <AuthShell
      eyebrow="Verify your email"
      title="Check your inbox"
      description={`We sent a verification link${email ? ` to ${email}` : ""}. Verify the account in your email tab, then come back here to continue${requiresWorkspaceApproval ? " and wait for workspace approval." : "."}`}
      footerText="Want to edit your details?"
      footerLinkHref="/signup"
      footerLinkLabel="Back to sign up"
      sideTitle="Verification unlocks your first sign-in."
      sideDescription={
        requiresWorkspaceApproval
          ? "After signup, the email link confirms the account. Once verified, your workspace admin still needs to approve your access before sign-in."
          : "After signup, the email link confirms the account. Once the verification callback succeeds, this page can move you into the sign-in step."
      }
      stats={[
        { label: "Status", value: verificationDetected ? "Ready" : "Pending" },
        { label: "Next stop", value: requiresWorkspaceApproval ? "Approval" : "Login" },
        { label: "Workspace", value: tenantSlug || "Pending" },
      ]}
      sideNote={
        requiresWorkspaceApproval
          ? "The verification link opens in a separate browser tab. After that succeeds, Repo Insights signals this page. If you requested access to an existing workspace, an admin must approve you before login will work."
          : "The verification link opens in a separate browser tab. When that tab completes successfully, Repo Insights tries to close it automatically and signals this page so you can continue."
      }
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-border/80 bg-background/50 p-4">
          <div className="flex items-start gap-3">
            <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">What to do now</p>
              <p className="text-sm leading-6 text-muted-foreground">
                Open the verification email, click the verify button, wait for the
                new tab to finish, then return here and confirm
                {requiresWorkspaceApproval ? ". After that, your workspace admin will review your request." : "."}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border/80 bg-background/50 p-4">
          <div className="flex items-start gap-3">
            {verificationDetected ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            ) : (
              <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
            )}
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">{openStateLabel}</p>
              <p className="text-sm leading-6 text-muted-foreground">
                {verificationDetected
                  ? "The verification tab reported success in this browser. You can continue to sign in now."
                  : "We have not received a success signal from the verification tab yet."}
              </p>
            </div>
          </div>
        </div>

        {(localError || resendVerificationMutation.error) && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3">
            <p className="text-sm text-destructive">
              {localError ||
                (resendVerificationMutation.error as { message?: string })?.message ||
                "We could not complete that action."}
            </p>
          </div>
        )}

        {resendVerificationMutation.data?.message && (
          <div className="rounded-2xl border border-border/80 bg-background/60 px-4 py-3">
            <p className="text-sm text-muted-foreground">
              {resendVerificationMutation.data.message}
            </p>
          </div>
        )}

        {requiresWorkspaceApproval && (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
            <p className="text-sm text-amber-200">
              This account is joining an existing workspace. After email
              verification, an admin must approve your access before you can
              sign in.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button
            type="button"
            className="h-11 w-full rounded-xl"
            onClick={handleVerificationDone}
          >
            {requiresWorkspaceApproval ? "Verification is done" : "Verification is done"}
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-xl"
            onClick={handleResendVerification}
            disabled={resendVerificationMutation.isPending}
          >
            <RefreshCcw className="h-4 w-4" />
            {resendVerificationMutation.isPending
              ? "Sending new email..."
              : "Resend verification email"}
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}
