import styles from "./AccountSettingsPage.module.css";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { API_BASE_URL } from "../config/api";
import { getStoredEmail, getStoredTier, logoutUser } from "../services/auth";

type CancelSubscriptionResponse = {
  success?: boolean;
  alreadyPendingCancellation?: boolean;
  subscriptionStatus?: string | null;
  nextBillingDate?: string | null;
  cancelledAt?: string | null;
  message?: string;
  error?: string;
};

function formatDate(value?: string | null): string | null {
  if (!value) return null;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function AccountSettingsPage() {
  const navigate = useNavigate();

  /* ================= USER ================= */
  const email = getStoredEmail() || "No email";
  const tier = getStoredTier();
  const hasPaidAccess = tier === "active";

  /* ================= SUBSCRIPTION STATE ================= */
  const [isCancelling, setIsCancelling] = useState(false);
  const [cancelStatus, setCancelStatus] = useState<string | null>(null);
  const [cancelledAt, setCancelledAt] = useState<string | null>(null);
  const [nextBillingDate, setNextBillingDate] = useState<string | null>(null);

  const isCancellationPending = useMemo(() => {
    if (!cancelStatus) return false;

    const normalized = cancelStatus.toLowerCase();
    return (
      normalized === "canceling" ||
      normalized === "cancelling" ||
      normalized === "canceled" ||
      normalized === "cancelled"
    );
  }, [cancelStatus]);

  const formattedCancelledAt = formatDate(cancelledAt);
  const formattedNextBillingDate = formatDate(nextBillingDate);

  /* ================= AVATAR ================= */
  const [avatar, setAvatar] = useState<string | null>(
    localStorage.getItem("raz_avatar")
  );

  function handleAvatarUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      setAvatar(result);
      localStorage.setItem("raz_avatar", result);
    };

    reader.readAsDataURL(file);
  }

  function removeAvatar() {
    localStorage.removeItem("raz_avatar");
    setAvatar(null);
  }

  /* ================= CANCEL SUBSCRIPTION ================= */
  const handleCancelSubscription = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel your Rugby Anthem Zone subscription?\n\nYou will keep access until the end of your current billing period."
    );

    if (!confirmCancel) return;

    try {
      setIsCancelling(true);

      const token = localStorage.getItem("raz_token");

      if (!token) {
        alert("You must be logged in.");
        return;
      }

      const res = await fetch(`${API_BASE_URL}/api/cancel-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = (await res.json()) as CancelSubscriptionResponse;

      if (!res.ok) {
        throw new Error(data.error || "Cancellation failed");
      }

      setCancelStatus(data.subscriptionStatus || "canceling");
      setCancelledAt(data.cancelledAt || null);
      setNextBillingDate(data.nextBillingDate || null);

      if (data.alreadyPendingCancellation) {
        alert(
          data.message ||
            "Your subscription is already scheduled for cancellation."
        );
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    } finally {
      setIsCancelling(false);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logoutUser();
    navigate("/welcome");
  };

  return (
    <main className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>Account Settings</h1>
        <p>Manage your profile and Rugby Anthem Zone access</p>
      </header>

      {/* ACCOUNT OVERVIEW */}
      <section className={styles.section}>
        <h2>Account Overview</h2>

        <div className={styles.card}>
          <p>
            <strong>Email:</strong> {email}
          </p>

          <p>
            <strong>Access:</strong>{" "}
            {hasPaidAccess
              ? "Active Rugby Anthem Zone Access"
              : "No Active Rugby Anthem Zone Access"}
          </p>
        </div>
      </section>

      {/* SUBSCRIPTION */}
      <section className={styles.section}>
        <h2>Subscription</h2>

        <div className={styles.card}>
          {hasPaidAccess ? (
            <>
              <p>You currently have active Rugby Anthem Zone access.</p>

              {isCancellationPending ? (
                <div className={styles.successBox}>
                  <p>✅ Your subscription is scheduled for cancellation.</p>

                  {formattedNextBillingDate ? (
                    <p>
                      Your Rugby Anthem Zone access should remain available
                      until the end of your current billing period on{" "}
                      <strong>{formattedNextBillingDate}</strong>.
                    </p>
                  ) : (
                    <p>
                      Your Rugby Anthem Zone access will remain available until
                      the end of your current billing period.
                    </p>
                  )}

                  {formattedCancelledAt && (
                    <p>
                      Cancellation requested on{" "}
                      <strong>{formattedCancelledAt}</strong>.
                    </p>
                  )}
                </div>
              ) : (
                <>
                  <p>
                    Your subscription renews automatically where applicable.
                    You can cancel at any time and access will remain active
                    until the end of your current billing period.
                  </p>

                  <button
                    className={styles.dangerButton}
                    onClick={handleCancelSubscription}
                    disabled={isCancelling}
                  >
                    {isCancelling
                      ? "Cancelling..."
                      : "Cancel Subscription"}
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <p>No active Rugby Anthem Zone subscription was found.</p>

              <button
                className={styles.button}
                onClick={() => navigate("/welcome")}
              >
                Go to Access Flow
              </button>
            </>
          )}
        </div>
      </section>

      {/* PROFILE IMAGE */}
      <section className={styles.section}>
        <h2>Profile Image</h2>

        <div className={styles.card}>
          <div className={styles.avatarWrap}>
            {avatar ? (
              <img
                src={avatar}
                alt="Profile avatar"
                className={styles.avatar}
              />
            ) : (
              <div className={styles.avatarPlaceholder}>👤</div>
            )}
          </div>

          <div className={styles.avatarActions}>
            <label className={styles.button}>
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                hidden
              />
            </label>

            {avatar && (
              <button
                className={styles.secondaryButton}
                onClick={removeAvatar}
              >
                Remove Photo
              </button>
            )}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className={styles.section}>
        <h2>Security</h2>

        <div className={styles.card}>
          <p>Password management will be available soon.</p>

          <button className={styles.disabledButton} disabled>
            Coming Soon
          </button>
        </div>
      </section>

      {/* SESSION */}
      <section className={styles.section}>
        <h2>Session</h2>

        <div className={styles.card}>
          <p>Sign out of Rugby Anthem Zone on this device.</p>

          <button className={styles.dangerButton} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>

      {/* NAVIGATION */}
      <section className={styles.section}>
        <button
          className={styles.backButton}
          onClick={() => navigate("/profile")}
        >
          ← Back to Profile
        </button>
      </section>
    </main>
  );
}