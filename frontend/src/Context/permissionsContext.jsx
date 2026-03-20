import { createContext, useState, useEffect, useContext } from "react";
import { ProjectsContext } from "./projectContext";
import { getPermissions } from "../API/permissions";

export const PermissionsContext = createContext();

export function PermissionsProvider({ children }) {
  const [permissions, setPermissions] = useState([]);
  const [loadingPermissions, setLoadingPermissions] = useState(true);
  const { projects, loadingProjects } = useContext(ProjectsContext);

  useEffect(() => {
    if (loadingProjects) return;
    if (!projects.length) return;

    async function fetchPermissions() {
      try {
        const allPermissions = await Promise.all(
          projects.map((p) => getPermissions(p.id)),
        );

        setPermissions(allPermissions.flat());
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingPermissions(false);
      }
    }

    fetchPermissions();
  }, [projects, loadingProjects]);

  return (
    <PermissionsContext.Provider value={{ permissions, setPermissions, loadingPermissions }}>
      {children}
    </PermissionsContext.Provider>
  );
}
