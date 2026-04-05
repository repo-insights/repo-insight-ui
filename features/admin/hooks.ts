import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api-client";
import type { User } from "@/shared/lib/types";
import { tokenStore } from "@/shared/lib/token-store";

async function fetchAllUsers(): Promise<User[]> {
  const { data } = await apiClient.get<User[]>("/api/v1/users/");
  return data;
}

export function useAllUsers() {
  return useQuery({
    queryKey: ["admin", "users"],
    queryFn: fetchAllUsers,
    enabled: !!tokenStore.get(),
    staleTime: 2 * 60 * 1000,
  });
}
