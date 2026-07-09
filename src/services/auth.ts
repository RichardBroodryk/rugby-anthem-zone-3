// src/services/auth.ts
// =====================================================
// AUTH SERVICE — ONE PAID PRODUCT MODEL
//
// Frontend entitlement model:
// - inactive
// - active
//
// Backend contract:
// - access: "active" | "inactive"
// - hasAccess: boolean
//
// Transitional backend support:
// - tier may still be returned for compatibility
// =====================================================

import { apiRequest } from "./api";
import { API_BASE_URL } from "../config/api";
import {
  SubscriptionTier,
  clearTierFromLocal,
  saveTierToLocal,
} from "../utils/subscription";

const TOKEN_KEY = "raz_token";
const USER_ID_KEY = "raz_user_id";
const USER_EMAIL_KEY = "raz_user_email";

type BackendAccessPayload = {
  token?: string;
  userId?: string | number;
  email?: string;
  access?: string;
  hasAccess?: boolean;
  tier?: string;
};

function normalizeTier(raw: unknown): SubscriptionTier {
  if (raw === "premium" || raw === "super" || raw === "active") {
    return "active";
  }
  return "inactive";
}

function normalizeAccessFromBackend(
  data: Partial<BackendAccessPayload> | null | undefined
): SubscriptionTier {
  if (!data) return "inactive";

  if (data.access === "active") return "active";
  if (data.access === "inactive") return "inactive";

  if (typeof data.hasAccess === "boolean") {
    return data.hasAccess ? "active" : "inactive";
  }

  return normalizeTier(data.tier);
}

function persistAuthSession(
  data: Partial<BackendAccessPayload>,
  fallbackEmail?: string
): SubscriptionTier {
  if (data?.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  if (data?.userId !== undefined && data?.userId !== null) {
    localStorage.setItem(USER_ID_KEY, String(data.userId));
  }

  const resolvedEmail =
    (typeof data?.email === "string" && data.email.trim()) ||
    (fallbackEmail ? fallbackEmail.toLowerCase().trim() : "");

  if (resolvedEmail) {
    localStorage.setItem(USER_EMAIL_KEY, resolvedEmail);
  }

  const access = normalizeAccessFromBackend(data);
  saveTierToLocal(access);

  return access;
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
  localStorage.removeItem("raz_avatar");
  clearTierFromLocal();

  // legacy session keys cleanup
  sessionStorage.removeItem("raz_active_tier");
  sessionStorage.removeItem("raz_dev_tier");
};

// ================= REGISTER =================
// Register should only fall back to login when the backend
// explicitly says the account already exists.
export const registerUser = async (email: string, password: string) => {
  try {
    const data = (await apiRequest("/api/register", "POST", {
      email,
      password,
    })) as BackendAccessPayload;

    const tier = persistAuthSession(data, email);

    return {
      ...data,
      tier,
      access: tier,
      hasAccess: tier === "active",
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message.toLowerCase() : "";

    if (message.includes("already exists")) {
      return await loginUser(email, password);
    }

    throw err;
  }
};

// ================= LOGIN =================
export const loginUser = async (email: string, password: string) => {
  const data = (await apiRequest("/api/login", "POST", {
    email,
    password,
  })) as BackendAccessPayload;

  const tier = persistAuthSession(data, email);

  return {
    ...data,
    tier,
    access: tier,
    hasAccess: tier === "active",
  };
};

// ================= GET USER TIER =================
// Source of truth after login / checkout / account refresh
export const getUserTier = async (): Promise<SubscriptionTier> => {
  const token = getToken();

  if (!token) {
    saveTierToLocal("inactive");
    return "inactive";
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/subscription`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      },
      credentials: "include",
    });

    let data: BackendAccessPayload | null = null;

    try {
      data = (await res.json()) as BackendAccessPayload;
    } catch {
      data = null;
    }

    if (!res.ok) {
      const message =
        data && typeof data === "object"
          ? (data as any).error || (data as any).message || "Subscription lookup failed"
          : "Subscription lookup failed";

      console.warn("Subscription fetch failed:", message);

      // Important:
      // login may already have succeeded and token may be valid.
      // We keep the locally stored tier from login payload rather than
      // forcibly wiping the user to inactive on a transient subscription failure.
      return normalizeTier(localStorage.getItem("raz_subscription_status"));
    }

    const tier = normalizeAccessFromBackend(data);
    saveTierToLocal(tier);
    return tier;
  } catch (err) {
    console.error("Subscription fetch failed:", err);

    // Preserve whatever access state we already have locally rather than
    // hard-forcing inactive on a network failure right after login.
    return normalizeTier(localStorage.getItem("raz_subscription_status"));
  }
};

// ================= LOCAL ACCESS STATE =================
export const getStoredTier = (): SubscriptionTier => {
  const raw = localStorage.getItem("raz_subscription_status");
  return normalizeTier(raw);
};

export const getStoredEmail = (): string | null => {
  return localStorage.getItem(USER_EMAIL_KEY);
};