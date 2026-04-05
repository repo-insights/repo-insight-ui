"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/modules/workspace/components/sidebar";
import { Topbar } from "@/modules/workspace/components/topbar";
import { Skeleton } from "@/shared/ui/skeleton";
import { useSessionBootstrap } from "@/modules/auth/api/hooks";
import { useMe } from "@/features/user/hooks";

function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isReady, isAuthenticated } = useSessionBootstrap();
  const { isLoading, isError } = useMe(isReady && isAuthenticated);

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isReady, router]);

  useEffect(() => {
    if (isReady && isError) {
      router.replace("/login");
    }
  }, [isError, isReady, router]);

  if (!isReady || (isAuthenticated && isLoading)) {
    return (
      <div className="flex h-screen bg-background">
        <div className="w-56 border-r border-border bg-card p-4 space-y-3">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-full mt-2" />
          <div className="space-y-1 pt-2">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-9 w-full rounded-lg" />)}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <Skeleton className="h-14 w-full" />
          <div className="p-8 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;
