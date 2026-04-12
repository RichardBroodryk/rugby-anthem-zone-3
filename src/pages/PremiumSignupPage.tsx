// src/pages/PremiumSignupPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FreemiumSignupPage.module.css";
import { registerUser, loginUser } from "../services/auth";

export default function PremiumSignupPage() {
  const navigate = useNavigate();

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword,setShowPassword]=useState(false);
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  const handleSignup = async () => {
    if(!email || !password) return setError("Enter email and password");

    setLoading(true);
    try {
      await registerUser(email,password);
      await loginUser(email,password);

      navigate("/terms",{ state:{ tier:"premium", email }});
    } catch {
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.page}>
      <h1>Premium Access</h1>

      <label>Email</label>
      <input value={email} onChange={e=>setEmail(e.target.value.toLowerCase())}/>

      <label>Password</label>
      <div style={{position:"relative"}}>
        <input
          type={showPassword ? "text":"password"}
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />
        <button onClick={()=>setShowPassword(!showPassword)}>
          {showPassword ? "Hide":"Show"}
        </button>
      </div>

      {error && <p>{error}</p>}

      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Loading..." : "Continue"}
      </button>
    </section>
  );
}