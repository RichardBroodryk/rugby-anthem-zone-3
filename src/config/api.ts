// src/config/api.ts

const PROD_API = "https://rugby-anthem-backend.onrender.com";
const DEV_API = "http://localhost:4000";

export const API_BASE_URL =
  process.env.NODE_ENV === "production" ? PROD_API : DEV_API;