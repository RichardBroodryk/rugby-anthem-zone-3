import { apiRequest } from "./api";
import { API_BASE_URL } from "../config/api";

const TOKEN_KEY = "raz_token";
const USER_ID_KEY = "raz_user_id";
const TIER_KEY = "raz_tier";

// ================= REGISTER =================
export const registerUser = async (email: string, password: string) => {
  try {
    const data = await apiRequest("/api/register", "POST", {
      email,
      password,
    });

    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }

    const tier = await getUserTier();
    localStorage.setItem(TIER_KEY, tier);

    return { ...data, tier };

  } catch (err) {
    console.log("🔥 REGISTER ERROR:", err);

    // fallback login
    try {
      console.log("🔁 FALLBACK LOGIN");

      return await loginUser(email, password);

    } catch (loginErr) {
      console.log("❌ LOGIN FAILED:", loginErr);
      throw err;
    }
  }
};

// ================= LOGIN =================
export const loginUser = async (email: string, password: string) => {
  const data = await apiRequest("/api/login", "POST", {
    email,
    password,
  });

  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  const tier = await getUserTier();
  localStorage.setItem(TIER_KEY, tier);

  return { ...data, tier };
};

// ================= TOKEN =================
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// ================= LOGOUT =================
export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(TIER_KEY);
};

// ================= GET USER TIER =================
export const getUserTier = async () => {
  const token = getToken();
  if (!token) return "freemium";

  try {
    const res = await fetch(`${API_BASE_URL}/api/subscription`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Cache-Control": "no-cache",
      },
    });

    const data = await res.json();

    return data.tier || "freemium";

  } catch (err) {
    console.error("❌ Tier fetch failed:", err);
    return "freemium";
  }
};

// ================= LOCAL TIER =================
export const getStoredTier = () => {
  return localStorage.getItem(TIER_KEY) || "freemium";
};