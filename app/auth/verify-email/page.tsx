import VerifyEmailCallbackClient from "@/modules/auth/components/verify-email-callback-client";

type VerifyEmailCallbackPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function VerifyEmailCallbackPage({
  searchParams,
}: VerifyEmailCallbackPageProps) {
  const params = searchParams ? await searchParams : undefined;

  return <VerifyEmailCallbackClient token={getParam(params?.token)} />;
}
