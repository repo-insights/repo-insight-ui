"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { FormField } from "@/shared/forms/form-field";
import { useCreateTeam, useUpdateTeam } from "@/modules/teams/api/hooks";
import type { Team } from "@/shared/lib/types";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(1, "Description is required"),
});

type FormValues = z.infer<typeof schema>;

type TeamModalProps = {
  open: boolean;
  onClose: () => void;
  editTeam?: Team | null;
};

export function TeamModal({ open, onClose, editTeam }: TeamModalProps) {
  const createMutation = useCreateTeam();
  const updateMutation = useUpdateTeam();
  const isEditing = !!editTeam;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", description: "" },
  });

  useEffect(() => {
    reset(
      editTeam
        ? { name: editTeam.name, description: editTeam.description }
        : { name: "", description: "" }
    );
  }, [editTeam, reset, open]);

  const handleClose = () => {
    reset({ name: "", description: "" });
    onClose();
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (isEditing && editTeam) {
        await updateMutation.mutateAsync({ id: editTeam.id, ...data });
      } else {
        await createMutation.mutateAsync(data);
      }
      handleClose();
    } catch {
      // handled by mutation
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && handleClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit team" : "Create a team"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your team's details."
              : "Teams help you organize members from the same workspace."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <FormField label="Team name" error={errors.name?.message}>
            <Input
              {...register("name")}
              placeholder="e.g. Engineering"
              autoFocus
              className={errors.name ? "border-destructive" : ""}
            />
          </FormField>

          <FormField label="Description" error={errors.description?.message}>
            <Textarea
              {...register("description")}
              placeholder="What does this team work on?"
              rows={3}
              className={errors.description ? "border-destructive" : ""}
            />
          </FormField>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEditing ? "Save changes" : "Create team"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
