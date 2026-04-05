import VerifyEmailClient from "@/modules/auth/components/verify-email-client";

type VerifyEmailPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  value: string | string[] | undefined
): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <VerifyEmailClient
      email={getParam(params?.email)}
      tenantSlug={getParam(params?.tenant_slug)}
      requiresWorkspaceApproval={getParam(params?.requires_workspace_approval) === "true"}
    />
  );
}
