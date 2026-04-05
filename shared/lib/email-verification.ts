export const EMAIL_VERIFICATION_STORAGE_KEY =
  "repo_insights_email_verification";

export function markEmailVerificationComplete() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    EMAIL_VERIFICATION_STORAGE_KEY,
    JSON.stringify({ verifiedAt: Date.now() })
  );
}

export function readEmailVerificationSignal() {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(EMAIL_VERIFICATION_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as { verifiedAt?: number };
    return typeof parsed.verifiedAt === "number" ? parsed : null;
  } catch {
    return null;
  }
}

export function clearEmailVerificationSignal() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(EMAIL_VERIFICATION_STORAGE_KEY);
}
