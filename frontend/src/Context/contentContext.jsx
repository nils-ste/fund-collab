import { createContext, useState, useEffect, useContext } from "react";
import { ProjectsContext } from "./projectContext";
import { getContent } from "../API/content";

export const ContContext = createContext();

export function ContentProvider({ children }) {
  const [content, setContent] = useState([]);
  const [loadingContent, setLoadingContent] = useState(true);
  const { projects, loadingProjects } = useContext(ProjectsContext);

  useEffect(() => {
    if (loadingProjects) return;
    if (!projects.length) return;

    async function fetchContent() {
      try {
        const allContent = await Promise.all(
          projects.map((p) => getContent(p.id)),
        );

        setContent(allContent.flat());
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingContent(false);
      }
    }

    fetchContent();
  }, [projects, loadingProjects]);

  return (
    <ContContext.Provider value={{ content, setContent }}>
      {children}
    </ContContext.Provider>
  );
}
