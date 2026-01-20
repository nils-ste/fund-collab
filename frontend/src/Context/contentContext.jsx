import { createContext, useState } from "react";

export const ContContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState([]);
  return (
    <ContContext.Provider value={{ content, setContent }}>
      {children}
    </ContContext.Provider>
  );
}
