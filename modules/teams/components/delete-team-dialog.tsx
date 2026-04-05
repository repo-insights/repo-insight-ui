"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { useDeleteTeam } from "@/modules/teams/api/hooks";
import type { Team } from "@/shared/lib/types";

type DeleteTeamDialogProps = {
  team: Team | null;
  onClose: () => void;
};

export function DeleteTeamDialog({ team, onClose }: DeleteTeamDialogProps) {
  const deleteMutation = useDeleteTeam();

  const handleDelete = async () => {
    if (!team) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(team.id);
      onClose();
    } catch {
      // handled by mutation
    }
  };

  return (
    <Dialog open={!!team} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="mb-1 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <DialogTitle>Delete team</DialogTitle>
          </div>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">{team?.name}</span>? This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={onClose} disabled={deleteMutation.isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={deleteMutation.isPending}>
            {deleteMutation.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Delete team
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
