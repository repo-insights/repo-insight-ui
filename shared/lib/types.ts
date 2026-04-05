export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "owner";
  auth_provider?: string;
  avatar_url: string | null;
  tenant_id: string;
  is_verified?: boolean;
  is_email_verified?: boolean;
  is_active?: boolean;
  workspace_access_status?: "pending" | "approved" | "rejected" | string;
  approved_by?: string | null;
  approved_at?: string | null;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: "free" | "pro" | "enterprise";
  subscription_status: "active" | "trialing" | "past_due" | "canceled";
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  member_count?: number;
  created_at?: string;
}

export interface TeamMember {
  id: string;
  user_id: string;
  name: string;
  email: string;
  role: string;
  avatar_url: string | null;
}

export interface Plan {
  id: string;
  name: string;
  display_name: string;
  plan_name?: string;
  permissions: string[];
  max_repos: number;
  max_members: number;
  description?: string;
  price?: string;
  price_monthly?: number;
  price_yearly?: number;
  button_text?: string;
  features?: string[];
  is_popular?: boolean;
  sort_order?: number;
}

export interface Subscription {
  id: string;
  tenant_id?: string;
  plan_id: string;
  plan_name: string;
  description?: string;
  button_text?: string;
  features?: string[];
  permissions?: string[];
  max_repos?: number;
  max_members?: number;
  is_popular?: boolean;
  sort_order?: number;
  status: "active" | "trialing" | "past_due" | "canceled";
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
  tenant_slug: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  tenant_name: string;
  join_existing_workspace?: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SignupResponse {
  user_id: string;
  email: string;
  tenant_id: string;
  tenant_slug: string;
  requires_workspace_approval?: boolean;
  message: string;
}

export interface UpdateProfilePayload {
  name: string;
  avatar_url?: string | null;
}

export interface CreateTeamPayload {
  name: string;
  description: string;
}
