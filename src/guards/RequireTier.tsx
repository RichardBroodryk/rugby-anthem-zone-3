import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { getStoredTier } from "../services/auth";

/**
 * REQUIRE ACTIVE SUBSCRIPTION
 * One paid entitlement model only:
 * - inactive
 * - active
 *
 * If inactive, redirect the user into the onboarding / purchase flow.
 */

type RequireActiveSubscriptionProps = {
  children: ReactNode;
};

export default function RequireTier({
  children,
}: RequireActiveSubscriptionProps) {
  const location = useLocation();
  const tier = getStoredTier();

  if (tier !== "active") {
    return (
      <Navigate
        to="/welcome"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return <>{children}</>;
}