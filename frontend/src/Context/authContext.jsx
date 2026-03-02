import { createContext, useState, useEffect } from "react";
import { getUser } from "../API/users";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);
  async function fetchUser() {
    try {
      const data = await getUser();
      console.log(data)
      setUserId(data.id);
    } catch (err) {
      console.error(err);
    }
  }


  useEffect(() => {
    fetchUser();
  }, []);

  console.log("Current userId:", userId);

  return (
    <AuthContext.Provider value={{ userId, fetchUser }}>{children}</AuthContext.Provider>
  );
}
