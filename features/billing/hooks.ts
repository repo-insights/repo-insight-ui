import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api-client";
import { queryClient } from "@/shared/lib/query-client";
import type { Plan, Subscription } from "@/shared/lib/types";
import { tokenStore } from "@/shared/lib/token-store";

async function fetchPlans(): Promise<Plan[]> {
  const { data } = await apiClient.get<Plan[]>("/api/v1/plans/");
  return [...data].sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
}

async function fetchSubscription(): Promise<Subscription> {
  const { data } = await apiClient.get<Subscription>("/api/v1/plans/subscription");
  return data;
}

export function usePlans(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
    enabled: options?.enabled ?? true,
    staleTime: 10 * 60 * 1000,
  });
}

export function useSubscription() {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: fetchSubscription,
    enabled: !!tokenStore.get(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useChangePlan() {
  return useMutation({
    mutationFn: async () => {
      throw new Error("Plan changes are not available from the current billing API yet.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
      queryClient.invalidateQueries({ queryKey: ["tenant"] });
    },
  });
}

export function useCancelSubscription() {
  return useMutation({
    mutationFn: async () => {
      throw new Error("Subscription cancellation is not available from the current billing API yet.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription"] });
    },
  });
}
