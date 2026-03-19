type LoyaltyAction =
  | "ppv_view"
  | "ppv_purchase"
  | "ppv_provider_click"
  | "merch_view"
  | "merch_purchase"
  | "audio_view"
  | "audio_listen";

export function recordLoyaltyAction(action: LoyaltyAction) {
  console.info(`[LOYALTY] Action recorded: ${action}`);
}