import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api-client";
import { queryClient } from "@/shared/lib/query-client";
import type { UpdateProfilePayload, User } from "@/shared/lib/types";
import { tokenStore } from "@/shared/lib/token-store";

export async function fetchMe(): Promise<User> {
  const { data } = await apiClient.get<User>("/api/v1/users/me");
  return data;
}

async function updateProfile(payload: UpdateProfilePayload): Promise<User> {
  const { data } = await apiClient.patch<User>("/api/v1/users/me", payload);
  return data;
}

export function useMe(enabled = true) {
  return useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
    enabled: enabled && !!tokenStore.get(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateProfile() {
  return useMutation({
    mutationFn: updateProfile,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["me"] });
      const prev = queryClient.getQueryData<User>(["me"]);
      queryClient.setQueryData<User>(["me"], (old) =>
        old ? { ...old, ...newData } : old
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["me"], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
