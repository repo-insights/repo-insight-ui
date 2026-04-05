"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CircleAlert, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { apiClient } from "@/shared/lib/api-client";
import { markEmailVerificationComplete } from "@/shared/lib/email-verification";

type VerificationState =
  | { status: "loading"; message: string }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type VerifyEmailCallbackClientProps = {
  token: string;
};

export default function VerifyEmailCallbackClient({
  token,
}: VerifyEmailCallbackClientProps) {
  const [state, setState] = useState<VerificationState>(() =>
    token
      ? { status: "loading", message: "Verifying your email now..." }
      : {
          status: "error",
          message: "We could not find a verification token in this URL.",
        }
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    let cancelled = false;

    async function verifyEmail() {
      try {
        const { data } = await apiClient.post<{ message?: string }>(
          "/api/v1/auth/verify-email",
          { token }
        );

        if (cancelled) {
          return;
        }

        markEmailVerificationComplete();
        window.opener?.postMessage(
          { type: "repo-insights-email-verified" },
          window.location.origin
        );

        setState({
          status: "success",
          message:
            data.message ?? "Your email has been verified successfully.",
        });

        window.setTimeout(() => {
          window.close();
        }, 1200);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setState({
          status: "error",
          message:
            (error as { message?: string })?.message ??
            "This verification link is invalid or has expired.",
        });
      }
    }

    void verifyEmail();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const isLoading = state.status === "loading";
  const isSuccess = state.status === "success";

  return (
    <main className="min-h-screen bg-background px-4 py-10 flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div
            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${
              isLoading
                ? "bg-primary/10 text-primary"
                : isSuccess
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-amber-500/10 text-amber-500"
            }`}
          >
            {isLoading ? (
              <Loader2 className="h-7 w-7 animate-spin" />
            ) : isSuccess ? (
              <CheckCircle2 className="h-7 w-7" />
            ) : (
              <CircleAlert className="h-7 w-7" />
            )}
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl">
              {isLoading
                ? "Verifying email"
                : isSuccess
                  ? "Email verified"
                  : "Verification failed"}
            </CardTitle>
            <CardDescription className="text-sm">
              {state.message}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {isSuccess ? (
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Next step</p>
              <p className="mt-2">
                This tab will try to close automatically. If it stays open, go
                back to the original Repo Insights tab and continue from the
                verification screen.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">What to do next</p>
              <p className="mt-2">
                Return to the verification screen and request a new email if
                needed.
              </p>
            </div>
          )}

          {!isLoading && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1">
                <Link href="/login">
                  {isSuccess ? "Open sign in" : "Go to sign in"}
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/signup">
                  {isSuccess ? "Back to app" : "Sign up again"}
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
