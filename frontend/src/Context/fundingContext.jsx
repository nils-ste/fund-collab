import { createContext, useState } from "react";

export const FundingContext = createContext();

export function FundingProvider({ children }) {
  const [funding, setFunding] = useState([]);
  return (
    <FundingContext.Provider value={{ funding, setFunding }}>
      {children}
    </FundingContext.Provider>
  );
}
