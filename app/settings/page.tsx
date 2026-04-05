"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2, User, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";
import { Separator } from "@/shared/ui/separator";
import { FormField } from "@/shared/forms/form-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useMe, useUpdateProfile } from "@/features/user/hooks";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  avatar_url: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
});

type FormValues = z.infer<typeof schema>;

export default function SettingsPage() {
  const { data: user, isLoading } = useMe();
  const updateMutation = useUpdateProfile();
  const isEmailVerified = user?.is_email_verified ?? user?.is_verified ?? false;
  const workspaceAccessStatus = user?.workspace_access_status ?? "approved";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", avatar_url: "" },
  });

  useEffect(() => {
    if (user) {
      reset({ name: user.name, avatar_url: user.avatar_url ?? "" });
    }
  }, [user, reset]);

  const avatarUrl = watch("avatar_url");

  const onSubmit = async (data: FormValues) => {
    await updateMutation.mutateAsync({
      name: data.name,
      avatar_url: data.avatar_url || null,
    });
    reset(data); // clears isDirty
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account and preferences.
        </p>
      </div>

      {/* Profile card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="h-4 w-4" /> Profile
          </CardTitle>
          <CardDescription>Update your name and avatar.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Avatar preview */}
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={avatarUrl || undefined} />
                  <AvatarFallback className="text-lg">
                    {user?.name?.[0]?.toUpperCase() ?? "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{user?.name}</p>
                  <p>{user?.email}</p>
                </div>
              </div>

              <Separator />

              <FormField label="Display name" error={errors.name?.message}>
                <Input
                  {...register("name")}
                  placeholder="Your name"
                  className={errors.name ? "border-destructive" : ""}
                />
              </FormField>

              <FormField
                label="Avatar URL"
                error={errors.avatar_url?.message}
                hint="Link to an image to use as your avatar"
              >
                <Input
                  {...register("avatar_url")}
                  placeholder="https://example.com/avatar.png"
                  className={errors.avatar_url ? "border-destructive" : ""}
                />
              </FormField>

              {updateMutation.isSuccess && (
                <div className="flex items-center gap-2 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  Profile updated successfully
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!isDirty || updateMutation.isPending}
                >
                  {updateMutation.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  Save changes
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Account info (read-only) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" /> Account
          </CardTitle>
          <CardDescription>Your account details and status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-9 w-full" />)}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Role</p>
                  <Badge variant="outline" className="capitalize">{user?.role}</Badge>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Verification</p>
                  <Badge variant={isEmailVerified ? "success" : "warning"}>
                    {isEmailVerified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Account status</p>
                  <Badge variant={user?.is_active !== false ? "success" : "destructive"}>
                    {user?.is_active !== false ? "Active" : "Suspended"}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Workspace access</p>
                  <Badge
                    variant={
                      workspaceAccessStatus === "approved"
                        ? "success"
                        : workspaceAccessStatus === "pending"
                          ? "warning"
                          : "secondary"
                    }
                    className="capitalize"
                  >
                    {workspaceAccessStatus}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="text-sm">
                <p className="text-muted-foreground mb-1">User ID</p>
                <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                  {user?.id}
                </code>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
