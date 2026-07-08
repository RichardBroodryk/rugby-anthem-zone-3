// src/services/auth.ts
// =====================================================
// AUTH SERVICE — ONE PAID PRODUCT MODEL
//
// Frontend entitlement model:
// - inactive
// - active
//
// Backend contract now prefers:
// - access: "active" | "inactive"
// - hasAccess: boolean
//
// Backend may still also return legacy tier values during
// transition, so frontend still supports that as fallback.
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
  userId?: string;
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

  if (data?.userId) {
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

// ================= TOKEN =================
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// ================= REGISTER =================
// If register fails because the user already exists,
// fall back to login so the flow stays smooth.
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
    try {
      return await loginUser(email, password);
    } catch {
      throw err;
    }
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

// ================= LOGOUT =================
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(USER_EMAIL_KEY);
  localStorage.removeItem("raz_avatar");
  clearTierFromLocal();

  // clear old legacy session keys as well
  sessionStorage.removeItem("raz_active_tier");
  sessionStorage.removeItem("raz_dev_tier");
};

// ================= GET USER TIER =================
// Keeps frontend state in sync with backend source of truth.
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

    if (!res.ok) {
      saveTierToLocal("inactive");
      return "inactive";
    }

    const data = (await res.json()) as BackendAccessPayload;
    const tier = normalizeAccessFromBackend(data);
    saveTierToLocal(tier);
    return tier;
  } catch (err) {
    console.error("Subscription fetch failed:", err);
    return "inactive";
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