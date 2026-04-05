"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp, Pencil, Plus, Trash2, Users } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { useTeams } from "@/modules/teams/api/hooks";
import { DeleteTeamDialog } from "@/modules/teams/components/delete-team-dialog";
import { TeamMembersPanel } from "@/modules/teams/components/team-members-panel";
import { TeamModal } from "@/modules/teams/components/team-modal";
import type { Team } from "@/shared/lib/types";

export default function TeamsPage() {
  const { data: teams, isLoading } = useTeams();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTeam, setEditTeam] = useState<Team | null>(null);
  const [deleteTeam, setDeleteTeam] = useState<Team | null>(null);
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Teams</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage teams and their members.
          </p>
        </div>
        <Button onClick={() => { setEditTeam(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4" />
          New team
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : teams?.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="h-14 w-14 rounded-2xl bg-accent flex items-center justify-center mb-4">
              <Users className="h-7 w-7 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-1">No teams yet</h3>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Teams help you organize collaborators and manage access. Create your first team to get started.
            </p>
            <Button onClick={() => setModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Create your first team
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {teams?.map((team) => (
            <Card key={team.id} className="group overflow-hidden transition-colors hover:border-border/80">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 p-5">
                  <div className="brand-avatar flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold">
                    {team.name[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium">{team.name}</h3>
                    <p className="truncate text-sm text-muted-foreground">
                      {team.description || "No description"}
                    </p>
                  </div>
                  {team.member_count !== undefined && (
                    <div className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
                      <Users className="h-3.5 w-3.5" />
                      <span>{team.member_count}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setExpandedTeamId((current) =>
                          current === team.id ? null : team.id
                        )
                      }
                    >
                      {expandedTeamId === team.id ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={() => {
                        setEditTeam(team);
                        setModalOpen(true);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setDeleteTeam(team)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {expandedTeamId === team.id && (
                  <div className="border-t border-border/70 px-5 pb-5">
                    <div className="pt-5">
                      <TeamMembersPanel teamId={team.id} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <TeamModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditTeam(null); }}
        editTeam={editTeam}
      />
      <DeleteTeamDialog
        team={deleteTeam}
        onClose={() => setDeleteTeam(null)}
      />
    </div>
  );
}
