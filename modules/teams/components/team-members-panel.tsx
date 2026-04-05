"use client";

import { useMemo, useState } from "react";
import { Loader2, UserPlus, Users, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { useMe } from "@/features/user/hooks";
import {
  useAddMember,
  useRemoveMember,
  useTeamMembers,
  useWorkspaceUsers,
} from "@/modules/teams/api/hooks";

type TeamMembersPanelProps = {
  teamId: string;
};

export function TeamMembersPanel({ teamId }: TeamMembersPanelProps) {
  const { data: currentUser } = useMe();
  const { data: members, isLoading: membersLoading } = useTeamMembers(teamId);
  const { data: users, isLoading: usersLoading } = useWorkspaceUsers();
  const addMemberMutation = useAddMember();
  const removeMemberMutation = useRemoveMember();
  const [selectedUserId, setSelectedUserId] = useState("");

  const workspaceUsers = useMemo(() => {
    return (users ?? []).filter(
      (user) =>
        user.tenant_id === currentUser?.tenant_id &&
        user.workspace_access_status !== "pending"
    );
  }, [currentUser?.tenant_id, users]);

  const memberUserIds = useMemo(() => {
    return new Set((members ?? []).map((member) => member.user_id));
  }, [members]);

  const availableUsers = useMemo(() => {
    return workspaceUsers.filter((user) => !memberUserIds.has(user.id));
  }, [memberUserIds, workspaceUsers]);

  const handleAddMember = async () => {
    if (!selectedUserId) {
      return;
    }

    try {
      await addMemberMutation.mutateAsync({ teamId, userId: selectedUserId });
      setSelectedUserId("");
    } catch {
      // handled by mutation
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      await removeMemberMutation.mutateAsync({ teamId, memberId });
    } catch {
      // handled by mutation
    }
  };

  return (
    <div className="rounded-xl border border-border bg-background/40 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium">Team members</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Add users from the same workspace to this team.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(event.target.value)}
            className="h-10 min-w-[240px] rounded-md border border-border bg-input px-3 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
            disabled={usersLoading || availableUsers.length === 0 || addMemberMutation.isPending}
          >
            <option value="">
              {usersLoading
                ? "Loading workspace users..."
                : availableUsers.length === 0
                  ? "No more workspace users to add"
                  : "Select a workspace user"}
            </option>
            {availableUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>

          <Button
            type="button"
            onClick={handleAddMember}
            disabled={!selectedUserId || addMemberMutation.isPending}
          >
            {addMemberMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="h-4 w-4" />
            )}
            Add member
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {membersLoading ? (
          <>
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </>
        ) : members?.length ? (
          members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-lg border border-border/70 bg-card/60 px-3 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{member.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {member.email}
                </p>
              </div>

              <div className="ml-4 flex items-center gap-2">
                <span className="rounded-full border border-border px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {member.role}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleRemoveMember(member.id)}
                  disabled={removeMemberMutation.isPending}
                >
                  {removeMemberMutation.isPending ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <X className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border px-4 py-8 text-center">
            <Users className="mb-2 h-6 w-6 text-muted-foreground/60" />
            <p className="text-sm font-medium">No members yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Add users from your workspace to start collaborating in this team.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
