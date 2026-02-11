import { createContext, useState} from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userId, setuserId] = useState(1);

  return (
    <AuthContext.Provider value={{ userId }}>
      {children}
    </AuthContext.Provider>
  );
}
