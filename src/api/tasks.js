import { getToken, logout } from "./auth";

const BASE_URL = "http://localhost:5000";

async function request(path, options = {}) {
  const token = getToken();

  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...options,
    });
  } catch {
    throw new Error(
      "Could not reach the server. Is the backend running on http://localhost:5000?"
    );
  }

  if (res.status === 204) return null; // DELETE has no body

  let data = null;
  try {
    data = await res.json();
  } catch {
    // some error responses may not carry a JSON body
  }

  if (res.status === 401) {
    // Token missing/expired/invalid — clear it and send the user back to login.
    logout();
    window.location.href = "/login";
    throw new Error(data?.message || data?.error || "Session expired. Please log in again.");
  }

  if (!res.ok) {
    throw new Error(data?.message || data?.error || `Request failed (${res.status})`);
  }

  return data;
}

export const getTasks = () => request("/tasks");

export const createTask = (task) =>
  request("/tasks", { method: "POST", body: JSON.stringify(task) });

export const updateTask = (id, task) =>
  request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(task) });

export const deleteTask = (id) => request(`/tasks/${id}`, { method: "DELETE" });
