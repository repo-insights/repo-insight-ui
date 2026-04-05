import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api-client";
import type { Tenant } from "@/shared/lib/types";
import { tokenStore } from "@/shared/lib/token-store";

async function fetchTenant(): Promise<Tenant> {
  const { data } = await apiClient.get<Tenant>("/api/v1/tenants/me");
  return data;
}

export function useTenant() {
  return useQuery({
    queryKey: ["tenant"],
    queryFn: fetchTenant,
    enabled: !!tokenStore.get(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
