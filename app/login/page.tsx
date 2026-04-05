import LoginForm from "@/modules/auth/components/login-form";

type LoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(
  value: string | string[] | undefined
): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const defaultEmail = getParam(params?.email);
  const defaultTenantSlug = getParam(params?.tenant_slug);

  return (
    <LoginForm
      defaultEmail={defaultEmail}
      defaultTenantSlug={defaultTenantSlug}
    />
  );
}
