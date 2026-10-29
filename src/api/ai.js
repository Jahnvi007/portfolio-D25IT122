import { getToken, logout } from "./auth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export async function generateDescription(title) {
  const token = getToken();

  let response;

  try {
    response = await fetch(`${BASE_URL}/api/ai/generate-description`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ title }),
    });
  } catch {
    throw new Error("Could not reach the server. Please try again.");
  }

  let data = {};

  try {
    data = await response.json();
  } catch {
    // Handle responses that do not contain JSON.
  }

  if (response.status === 401) {
    logout();
    window.location.href = "/login";

    throw new Error("Your session has expired. Please log in again.");
  }

  if (!response.ok) {
    const error = new Error(
      data.error || data.message || "Could not generate a description."
    );

    error.retryAfter = data.retryAfter;
    throw error;
  }

  return data;
}