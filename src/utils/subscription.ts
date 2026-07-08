// src/utils/subscription.ts
// =====================================================
// SUBSCRIPTION / ENTITLEMENT HELPER
// Frontend access model is now only:
// - inactive
// - active
//
// Backend contract prefers:
// - access: "active" | "inactive"
// - hasAccess: boolean
//
// Legacy tier values are still supported as fallback while
// the backend/frontend transition is being completed.
// =====================================================

import { API_BASE_URL } from "../config/api";

export type SubscriptionTier = "active" | "inactive";

type BackendSubscriptionPayload = {
  access?: string;
  hasAccess?: boolean;
  tier?: string;
};

const STORAGE_KEY = "raz_subscription_status";

export function normalizeTier(raw: unknown): SubscriptionTier {
  if (raw === "premium" || raw === "super" || raw === "active") {
    return "active";
  }
  return "inactive";
}

export function normalizeAccessFromBackend(
  data: BackendSubscriptionPayload | null | undefined
): SubscriptionTier {
  if (!data) return "inactive";

  if (data.access === "active") return "active";
  if (data.access === "inactive") return "inactive";

  if (typeof data.hasAccess === "boolean") {
    return data.hasAccess ? "active" : "inactive";
  }

  return normalizeTier(data.tier);
}

export async function getSubscriptionTier(
  token?: string
): Promise<SubscriptionTier> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/subscription`, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch subscription");
    }

    const data = (await response.json()) as BackendSubscriptionPayload;
    const tier = normalizeAccessFromBackend(data);
    saveTierToLocal(tier);
    return tier;
  } catch (err) {
    console.warn(
      "Could not fetch subscription from server, falling back to localStorage"
    );

    const localTier = localStorage.getItem(STORAGE_KEY);
    return normalizeTier(localTier);
  }
}

export function saveTierToLocal(tier: SubscriptionTier) {
  localStorage.setItem(STORAGE_KEY, tier);
}

export function clearTierFromLocal() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getStoredSubscriptionTier(): SubscriptionTier {
  return normalizeTier(localStorage.getItem(STORAGE_KEY));
}

export function isActiveSubscriber(tier: SubscriptionTier): boolean {
  return tier === "active";
}