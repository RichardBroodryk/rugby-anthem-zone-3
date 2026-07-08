// src/services/payments.ts
// =====================================================
// PAYMENTS SERVICE — ONE PRODUCT RESET
// Web checkout remains Paddle-backed via backend.
// Frontend now exposes a single checkout entry:
// startPremiumCheckout()
// =====================================================

import { apiRequest } from "./api";
import { getToken } from "./auth";

export type CheckoutProvider = "paddle" | "google";
export type AccessProduct = "raz-premium";

export type CreatePaymentSessionResponse = {
  checkoutUrl?: string;
  provider?: CheckoutProvider;
};

export async function createPaymentSession(): Promise<CreatePaymentSessionResponse> {
  const token = getToken();

  if (!token) {
    throw new Error("No auth token found. Please log in again.");
  }

  // One product only.
  // Backend may still internally map legacy paid users,
  // but the frontend no longer exposes plan branching.
  const data = await apiRequest(
    "/api/payments",
    "POST",
    {
      product: "raz-premium",
    },
    token
  );

  return data;
}

/**
 * Shared checkout entry point for the app.
 * Today:
 * - web => backend returns Paddle checkout URL
 *
 * Future:
 * - Android/Google Play build can branch internally here
 *   without changing the rest of the app flow.
 */
export async function startPremiumCheckout(): Promise<void> {
  const session = await createPaymentSession();

  if (!session?.checkoutUrl) {
    throw new Error("Unable to start checkout.");
  }

  window.location.href = session.checkoutUrl;
}