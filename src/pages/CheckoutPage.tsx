import { useEffect, useState } from "react";

declare global {
  interface Window {
    Paddle: any;
  }
}

const CheckoutPage = () => {
  const [status, setStatus] = useState("Loading secure checkout...");

  useEffect(() => {
    console.log("🔥 CheckoutPage loaded - Initializing Paddle");

    // If Paddle already exists, we still re-initialize (DO NOT return)
    if (window.Paddle) {
      console.log("⚠️ Paddle already loaded — reinitializing");
    }

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = () => {
      if (!window.Paddle) {
        console.error("❌ Paddle failed to attach to window");
        setStatus("Failed to initialize checkout. Please refresh.");
        return;
      }

      console.log("✅ Paddle script loaded successfully");

      window.Paddle.Initialize({
        token: "live_1315bcf84802de1b59fc1bd1da5",

        eventCallback: (event: any) => {
          console.log("📦 Paddle event:", event.name);

          if (event.name === "checkout.completed") {
            console.log("🎉 Checkout completed successfully");

            setStatus("Payment successful! Redirecting to your homepage...");

            // 🔥 RETRY LOGIC (FIXES FREEMIUM ISSUE)
            const checkTierAndRedirect = async () => {
              const token = localStorage.getItem("raz_token");

              for (let i = 0; i < 6; i++) {
                try {
                  const res = await fetch(
                    "https://rugby-anthem-backend.fly.dev/api/subscription",
                    {
                      headers: token
                        ? { Authorization: `Bearer ${token}` }
                        : {},
                    }
                  );

                  if (res.ok) {
                    const data = await res.json();
                    const tier = data.tier;

                    console.log(`🔁 Tier check attempt ${i}:`, tier);

                    if (tier === "super") {
                      window.location.href = "/home-super";
                      return;
                    }

                    if (tier === "premium") {
                      window.location.href = "/home";
                      return;
                    }
                  }
                } catch (err) {
                  console.error("Retry error:", err);
                }

                // wait 1 second before retry
                await new Promise((res) => setTimeout(res, 1000));
              }

              console.warn("⚠️ Tier never updated — fallback to free");
              window.location.href = "/home";
            };

            checkTierAndRedirect();
          }
        },
      });

      setStatus("Opening secure checkout...");
    };

    script.onerror = () => {
      console.error("❌ Failed to load Paddle script");
      setStatus("Network error loading checkout. Please refresh.");
    };

    // Cleanup on unmount
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#0a0a0a",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h2>{status}</h2>

      <p>Please wait while we open the secure payment page...</p>

      <p style={{ fontSize: "14px", opacity: 0.7, marginTop: "20px" }}>
        You will be redirected automatically after payment.
      </p>
    </div>
  );
};

export default CheckoutPage;