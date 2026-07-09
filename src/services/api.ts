import { API_BASE_URL } from "../config/api";

type ApiErrorPayload = {
  error?: string;
  message?: string;
};

export const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
  token?: string
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const payload = (data || {}) as ApiErrorPayload;
    const message =
      payload.error ||
      payload.message ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
};