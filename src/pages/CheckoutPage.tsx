import { useEffect } from "react";

declare global {
  interface Window {
    Paddle: any;
  }
}

const CheckoutPage = () => {

  useEffect(() => {

    console.log("🔥 CHECKOUT PAGE LOADED");

    const params = new URLSearchParams(window.location.search);
    const txn = params.get("_ptxn");

    console.log("🔍 TXN:", txn);

    // =====================================================
    // 🟢 PADDLE MODE
    // =====================================================
    if (txn) {

      console.log("🟢 Paddle mode — loading checkout");

      const script = document.createElement("script");
      script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
      script.async = true;

      document.body.appendChild(script);

      script.onload = () => {
        if (window.Paddle) {
          window.Paddle.Initialize({
            token: "live_1315bcf84802de1b59fc1bd1da5",
            eventCallback: async (event: any) => {

              console.log("🔥 PADDLE EVENT:", event);

              // ✅ PAYMENT COMPLETE
              if (event.name === "checkout.completed") {

                console.log("✅ PAYMENT COMPLETED — checking subscription");

                setTimeout(async () => {
                  await checkSubscriptionAndRedirect();
                }, 2000); // give webhook time
              }
            }
          });
        }
      };

      return;
    }

    // =====================================================
    // 🔁 FALLBACK (NO TXN)
    // =====================================================
    checkSubscriptionAndRedirect();

  }, []);

  // =====================================================
  // 🔁 SUBSCRIPTION CHECK
  // =====================================================
  const checkSubscriptionAndRedirect = async () => {

    try {
      const token = localStorage.getItem("raz_token");

      if (!token) {
        console.error("❌ No token found");
        return;
      }

      const res = await fetch(
        "https://rugby-anthem-backend.fly.dev/api/subscription",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Cache-Control": "no-cache"
          },
        }
      );

      const data = await res.json();

      console.log("✅ Subscription:", data);

      if (data.tier === "super") {
        window.location.href = "/home-super";
      } else if (data.tier === "premium") {
        window.location.href = "/home";
      } else {
        window.location.href = "/home-free";
      }

    } catch (err) {
      console.error("❌ Subscription check failed:", err);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h2>Processing your subscription...</h2>
      <p>Please wait while we complete checkout.</p>
    </div>
  );
};

export default CheckoutPage;