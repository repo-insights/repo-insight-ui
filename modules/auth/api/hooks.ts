"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/api-client";
import { queryClient } from "@/shared/lib/query-client";
import { tokenStore } from "@/shared/lib/token-store";
import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  SignupResponse,
} from "@/shared/lib/types";
import { fetchMe } from "@/features/user/hooks";

async function login(payload: LoginPayload): Promise<AuthResponse> {
  const { tenant_slug, ...credentials } = payload;
  const { data } = await apiClient.post<AuthResponse>(
    `/api/v1/auth/login/${encodeURIComponent(tenant_slug)}`,
    credentials
  );
  return data;
}

async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const { data } = await apiClient.post<SignupResponse>(
    "/api/v1/auth/signup",
    payload
  );
  return data;
}

async function logout(): Promise<void> {
  await apiClient.post("/api/v1/auth/logout");
}

async function refreshSession(): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>("/api/v1/auth/refresh");
  return data;
}

async function resendVerification(payload: { email: string }) {
  const { data } = await apiClient.post<{ message: string }>(
    "/api/v1/auth/resend-verification",
    payload
  );
  return data;
}

async function approveWorkspaceUser(userId: string) {
  const { data } = await apiClient.post<{ message: string }>(
    `/api/v1/teams/members/${userId}/approve`
  );
  return data;
}

async function syncAuthenticatedUser() {
  return queryClient.fetchQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      tokenStore.set(data.access_token);

      try {
        await syncAuthenticatedUser();
        queryClient.invalidateQueries({ queryKey: ["tenant"] });
      } catch (error) {
        tokenStore.clear();
        queryClient.clear();
        throw error;
      }
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      tokenStore.clear();
      queryClient.clear();
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      tokenStore.clear();
      queryClient.clear();
    },
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: resendVerification,
  });
}

export function useApproveWorkspaceUser() {
  return useMutation({
    mutationFn: approveWorkspaceUser,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-pending-users"] });
      queryClient.invalidateQueries({ queryKey: ["workspace-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
}

export function useSessionBootstrap() {
  const [isReady, setIsReady] = useState(() => !!tokenStore.get());
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!tokenStore.get());

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      if (tokenStore.get()) {
        setIsAuthenticated(true);
        setIsReady(true);
        return;
      }

      try {
        const data = await refreshSession();
        tokenStore.set(data.access_token);
        await syncAuthenticatedUser();

        if (!cancelled) {
          setIsAuthenticated(true);
        }
      } catch {
        tokenStore.clear();
        queryClient.removeQueries({ queryKey: ["me"] });

        if (!cancelled) {
          setIsAuthenticated(false);
        }
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    }

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  return { isReady, isAuthenticated };
}
