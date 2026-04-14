import { useEffect } from "react";

declare global {
  interface Window {
    Paddle: any;
  }
}

const CheckoutPage = () => {

  useEffect(() => {

    console.log("🔥 CHECKOUT PAGE LOADED");

    // ✅ VERY IMPORTANT: detect Paddle transaction
    const params = new URLSearchParams(window.location.search);
    const txn = params.get("_ptxn");

    console.log("🔍 TXN:", txn);

    // =====================================================
    // ✅ IF _ptxn EXISTS → DO NOTHING (LET PADDLE OPEN)
    // =====================================================
    if (txn) {
      console.log("🟢 Paddle mode — waiting for checkout overlay");

      const script = document.createElement("script");
      script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
      script.async = true;

      document.body.appendChild(script);

      script.onload = () => {
        if (window.Paddle) {
          window.Paddle.Initialize({
            token: "live_1315bcf84802de1b59fc1bd1da5",
          });
        }
      };

      return;
    }

    // =====================================================
    // 🔁 AFTER PAYMENT RETURN (NO _ptxn)
    // =====================================================
    console.log("🔁 Checking subscription after payment");

    setTimeout(async () => {
      try {
        const token = localStorage.getItem("raz_token");

        if (!token) {
          console.error("❌ No token");
          return;
        }

        const res = await fetch(
          "https://rugby-anthem-backend.fly.dev/api/subscription",
          {
            headers: {
              Authorization: "Bearer " + token,
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
    }, 3000); // ⏳ give webhook time

  }, []);

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