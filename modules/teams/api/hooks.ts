import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api-client";
import { queryClient } from "@/shared/lib/query-client";
import type { CreateTeamPayload, Team, TeamMember, User } from "@/shared/lib/types";
import { tokenStore } from "@/shared/lib/token-store";

async function fetchTeams(): Promise<Team[]> {
  const { data } = await apiClient.get<Team[]>("/api/v1/teams/");
  return data;
}

async function createTeam(payload: CreateTeamPayload): Promise<Team> {
  const { data } = await apiClient.post<Team>("/api/v1/teams/", payload);
  return data;
}

async function updateTeam(id: string, payload: CreateTeamPayload): Promise<Team> {
  const { data } = await apiClient.patch<Team>(`/api/v1/teams/${id}`, payload);
  return data;
}

async function deleteTeam(id: string): Promise<void> {
  await apiClient.delete(`/api/v1/teams/${id}`);
}

async function fetchTeamMembers(teamId: string): Promise<TeamMember[]> {
  const { data } = await apiClient.get<TeamMember[]>(`/api/v1/teams/${teamId}/members`);
  return data;
}

async function fetchWorkspaceUsers(): Promise<User[]> {
  const { data } = await apiClient.get<User[]>("/api/v1/users/");
  return data;
}

async function fetchPendingWorkspaceUsers(): Promise<User[]> {
  const { data } = await apiClient.get<User[]>("/api/v1/teams/pending-users");
  return data;
}

async function addMember(teamId: string, userId: string): Promise<void> {
  await apiClient.post(`/api/v1/teams/${teamId}/members`, { user_id: userId });
}

async function removeMember(teamId: string, memberId: string): Promise<void> {
  await apiClient.delete(`/api/v1/teams/${teamId}/members/${memberId}`);
}

export function useTeams() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: fetchTeams,
    enabled: !!tokenStore.get(),
    staleTime: 2 * 60 * 1000,
  });
}

export function useTeamMembers(teamId: string) {
  return useQuery({
    queryKey: ["team-members", teamId],
    queryFn: () => fetchTeamMembers(teamId),
    enabled: !!teamId && !!tokenStore.get(),
  });
}

export function useWorkspaceUsers() {
  return useQuery({
    queryKey: ["workspace-users"],
    queryFn: fetchWorkspaceUsers,
    enabled: !!tokenStore.get(),
    staleTime: 2 * 60 * 1000,
  });
}

export function usePendingWorkspaceUsers() {
  return useQuery({
    queryKey: ["workspace-pending-users"],
    queryFn: fetchPendingWorkspaceUsers,
    enabled: !!tokenStore.get(),
    staleTime: 30 * 1000,
  });
}

export function useCreateTeam() {
  return useMutation({
    mutationFn: createTeam,
    onMutate: async (newTeam) => {
      await queryClient.cancelQueries({ queryKey: ["teams"] });
      const prev = queryClient.getQueryData<Team[]>(["teams"]);
      queryClient.setQueryData<Team[]>(["teams"], (old) => [
        ...(old ?? []),
        { id: `temp-${Date.now()}`, ...newTeam, member_count: 0 },
      ]);
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["teams"], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}

export function useUpdateTeam() {
  return useMutation({
    mutationFn: ({ id, ...payload }: { id: string } & CreateTeamPayload) =>
      updateTeam(id, payload),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}

export function useDeleteTeam() {
  return useMutation({
    mutationFn: deleteTeam,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["teams"] });
      const prev = queryClient.getQueryData<Team[]>(["teams"]);
      queryClient.setQueryData<Team[]>(["teams"], (old) =>
        old?.filter((team) => team.id !== id) ?? []
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["teams"], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}

export function useAddMember() {
  return useMutation({
    mutationFn: ({ teamId, userId }: { teamId: string; userId: string }) =>
      addMember(teamId, userId),
    onSettled: (_data, _error, { teamId }) => {
      queryClient.invalidateQueries({ queryKey: ["team-members", teamId] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}

export function useRemoveMember() {
  return useMutation({
    mutationFn: ({ teamId, memberId }: { teamId: string; memberId: string }) =>
      removeMember(teamId, memberId),
    onSettled: (_data, _error, { teamId }) => {
      queryClient.invalidateQueries({ queryKey: ["team-members", teamId] });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}
