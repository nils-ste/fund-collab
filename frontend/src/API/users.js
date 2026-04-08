const BASE_URL = "https://fund-collab.onrender.com";

export async function signUp(userData) {
  const res = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Signup error response:", text);
    throw new Error(text || "Failed to create user");
  }

  return JSON.parse(text);
}

export async function logIn(userData) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Server response:", text);
    throw new Error("Failed to login");
  }

  const data = await res.json();
  localStorage.setItem("token", data.access_token);
  return data.access_token;
}

export async function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    setUserId(null);
    return;
  }

  const data = await res.json();
  console.log(data)

  if (!res.ok) throw new Error(data.error || "Failed to retrieve user");

  return data;
}