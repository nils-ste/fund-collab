import { createContext, useContext, useState, useEffect } from "react";
import { getProjects } from "../API/project";
import { AuthContext } from "./authContext";

export const ProjectsContext = createContext();

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (!userId) return;
    async function fetchProjects() {
      try {
        const data = await getProjects(userId);
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoadingProjects(false);
      }
    }

    fetchProjects();
  }, [userId, loadingProjects]);

  return (
    <ProjectsContext.Provider
      value={{ projects, setProjects, loadingProjects }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
