const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    localStorage.setItem("authToken", data.token);
    return data.token;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const isAuthenticated = () => {
  const token = getToken();
  return token ? true : false;
};

export const logout = () => {
  localStorage.removeItem("authToken");
};
