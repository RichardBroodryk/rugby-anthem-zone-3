import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Paddle: any;
  }
}

const CheckoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {

    const script = document.createElement("script");
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;

    document.body.appendChild(script);

    script.onload = async () => {

      window.Paddle.Initialize({
        token: "live_1315bcf84802de1b59fc1bd1da5"
      });

      // 🔴 Read transaction id
      const params = new URLSearchParams(window.location.search);
      const transactionId = params.get("_ptxn");

      if (transactionId) {
        try {
          console.log("🔍 Verifying txn:", transactionId);

          const res = await fetch(
            "https://rugby-anthem-backend.fly.dev/api/verify-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ txn: transactionId }),
            }
          );

          const data = await res.json();

          console.log("✅ Verify result:", data);

          if (data.success) {
            if (data.tier === "super") {
              navigate("/home-super", { replace: true });
            } else if (data.tier === "premium") {
              navigate("/home", { replace: true });
            } else {
              navigate("/home-free", { replace: true });
            }
          } else {
            console.error("Verification failed:", data);
          }

        } catch (err) {
          console.error("❌ Verify error:", err);
        }
      }

    };

    return () => {
      document.body.removeChild(script);
    };

  }, [navigate]);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <h2>Preparing secure checkout...</h2>
      <p>Loading Rugby Anthem Zone subscription.</p>
    </div>
  );
};

export default CheckoutPage;