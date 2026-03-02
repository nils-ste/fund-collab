import { createContext, useState, useEffect } from "react";
import { getUser } from "../API/users";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUser();
        setUserId(data.id);
      } catch (err) {
        console.error(err);
      }
    }

    fetchUser();
  }, []);

  console.log(userId)

  return (
    <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
  );
}
