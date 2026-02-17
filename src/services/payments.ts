import { apiRequest } from "./api";
import { getUserId } from "./auth";

export const createPaymentSession = async (plan: "premium" | "super") => {
  const userId = getUserId();

  if (!userId) {
    throw new Error("User not logged in");
  }

  const data = await apiRequest(
    "/api/payments/create-session",
    "POST",
    {
      userId: Number(userId),
      plan: plan === "super" ? "super_premium" : "premium",
    }
  );

  return data;
};
