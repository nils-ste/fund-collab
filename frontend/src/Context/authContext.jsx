import { createContext, useState, useEffect } from "react";
import { getUser } from "../API/users";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  async function fetchUser() {
  setLoading(true);
  try {
    const data = await getUser();

    if (!data) {
      setUserId(null);
    } else {
      setUserId(data.id);
    }
  } catch (err) {
    console.error(err);
    setUserId(null);
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ userId, loading, setUserId, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}
