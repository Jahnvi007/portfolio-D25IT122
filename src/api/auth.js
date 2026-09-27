const BASE_URL = "http://localhost:5000";
const TOKEN_KEY = "task_manager_token";

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error(
      "Could not reach the server. Is the backend running on http://localhost:5000?"
    );
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    // some error responses may not carry a JSON body
  }

  if (!res.ok) {
    throw new Error(data?.message || data?.error || `Request failed (${res.status})`);
  }

  return data;
}

export const register = (email, password) =>
  request("/auth/register", { method: "POST", body: JSON.stringify({ email, password }) });

export const login = async (email, password) => {
  const data = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem(TOKEN_KEY, data.token);
  return data;
};

export const logout = () => localStorage.removeItem(TOKEN_KEY);

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isLoggedIn = () => Boolean(getToken());
