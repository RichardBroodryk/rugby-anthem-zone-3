import { apiRequest } from "./api";

const TOKEN_KEY = "raz_token";
const USER_ID_KEY = "raz_user_id";

export const registerUser = async (email: string, password: string) => {
  return apiRequest("/register", "POST", {
    email,
    password,
  });
};

export const loginUser = async (email: string, password: string) => {
  const data = await apiRequest("/login", "POST", {
    email,
    password,
  });

  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }

  if (data.user && data.user.id) {
    localStorage.setItem(USER_ID_KEY, String(data.user.id));
  }

  return data;
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
};

export const getUserTier = async () => {
  const token = getToken();
  if (!token) return "freemium";

  try {
    const data = await apiRequest(
      "/premium-content",
      "GET",
      undefined,
      token
    );

    return data.tier || "freemium";
  } catch {
    return "freemium";
  }
};
