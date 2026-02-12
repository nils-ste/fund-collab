import { createContext, useState, useEffect, useContext } from "react";
import { ProjectsContext } from "./projectContext";
import { getFunding } from "../API/funding";

export const FundingContext = createContext();

export function FundingProvider({ children }) {
  const [funding, setFunding] = useState([]);
  const [loadingFunding, setLoadingFunding] = useState(true);
  const { projects, loadingProjects } = useContext(ProjectsContext);

  useEffect(() => {
    if (loadingProjects) return;
    if (!projects.length) return;

    async function fetchFunding() {
      try {
        const allFunding = await Promise.all(
          projects.map((p) => getFunding(p.id)),
        );

        setFunding(allFunding.flat());
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingFunding(false);
      }
    }

    fetchFunding();
  }, [projects, loadingProjects]);

  return (
    <FundingContext.Provider value={{ funding, setFunding }}>
      {children}
    </FundingContext.Provider>
  );
}
