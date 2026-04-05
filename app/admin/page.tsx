"use client";
import { useState } from "react";
import { CheckCircle2, Loader2, Shield, Search, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";
import { Input } from "@/shared/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { useApproveWorkspaceUser } from "@/modules/auth/api/hooks";
import { usePendingWorkspaceUsers } from "@/modules/teams/api/hooks";
import { useAllUsers } from "@/features/admin/hooks";
import { useMe } from "@/features/user/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const roleVariant: Record<string, "secondary" | "warning" | "outline"> = {
  admin: "warning",
  owner: "warning",
  user: "secondary",
};

export default function AdminPage() {
  const router = useRouter();
  const { data: currentUser, isLoading: userLoading } = useMe();
  const { data: users, isLoading } = useAllUsers();
  const { data: pendingUsers, isLoading: pendingLoading } = usePendingWorkspaceUsers();
  const approveWorkspaceUserMutation = useApproveWorkspaceUser();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!userLoading && currentUser && currentUser.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [currentUser, userLoading, router]);

  const filtered = users?.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <Shield className="h-4 w-4 text-amber-400" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
          <p className="text-sm text-muted-foreground">
            Manage all users in this workspace.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Pending Workspace Access</CardTitle>
          <CardDescription>
            Approve verified users who requested access to this workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {pendingLoading ? (
            <div className="divide-y divide-border">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-4 px-6 py-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
              ))}
            </div>
          ) : pendingUsers?.length ? (
            <div className="divide-y divide-border">
              {pendingUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-accent/30"
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={user.avatar_url ?? undefined} />
                    <AvatarFallback className="text-xs">
                      {user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                  </div>

                  <Badge
                    variant={user.is_email_verified ? "success" : "warning"}
                    className="flex-shrink-0"
                  >
                    {user.is_email_verified ? "Verified" : "Awaiting email verify"}
                  </Badge>

                  <Button
                    size="sm"
                    onClick={() => approveWorkspaceUserMutation.mutateAsync(user.id)}
                    disabled={
                      approveWorkspaceUserMutation.isPending || !user.is_email_verified
                    }
                  >
                    {approveWorkspaceUserMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    Approve
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm font-medium">No pending requests</p>
              <p className="mt-1 text-xs text-muted-foreground">
                New workspace join requests will appear here after email verification.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base">All Users</CardTitle>
              <CardDescription>
                {isLoading ? "Loading…" : `${users?.length ?? 0} total users`}
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search users…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-8 text-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="divide-y divide-border">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              ))}
            </div>
          ) : filtered?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="h-8 w-8 text-muted-foreground/50 mb-3" />
              <p className="text-sm font-medium">No users found</p>
              <p className="text-xs text-muted-foreground mt-1">
                {search ? "Try a different search term" : "No users have joined yet"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filtered?.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-accent/30 transition-colors"
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={user.avatar_url ?? undefined} />
                    <AvatarFallback className="text-xs">
                      {user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>

                  <code className="text-xs text-muted-foreground font-mono hidden md:block">
                    {user.id}
                  </code>

                  <Badge variant={roleVariant[user.role] ?? "secondary"} className="capitalize flex-shrink-0">
                    {user.role}
                  </Badge>

                  <Badge
                    variant={user.is_active !== false ? "success" : "destructive"}
                    className="flex-shrink-0"
                  >
                    {user.is_active !== false ? "Active" : "Suspended"}
                  </Badge>

                  <Badge
                    variant={
                      user.workspace_access_status === "approved"
                        ? "success"
                        : user.workspace_access_status === "pending"
                          ? "warning"
                          : "secondary"
                    }
                    className="capitalize flex-shrink-0"
                  >
                    {user.workspace_access_status ?? "approved"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
