import { useContext } from "react";
import { useParams } from "react-router";
import { getContent, deleteContent } from "../API/content";
import { ContContext } from "../Context/contentContext";
import { ProjectsContext } from "../Context/projectContext";
import ContentSelector from "../Components/Buttons/ContentSelector";
import ContentCard from "../Components/Cards/ContentCard";
import Funding from "./Funding";

export default function Content() {
  const { projectId } = useParams();
  const fetchId = Number(projectId);
  const { content, setContent } = useContext(ContContext);
  const { projects, loadingProjects } = useContext(ProjectsContext);

  const projectContent = content.filter(
    (c) => c.project_id === Number(projectId),
  );

  async function handleDelete(contentId) {
    try {
      await deleteContent(fetchId, contentId);
      const updated = await getContent(fetchId);
      setContent(updated.length ? [...updated] : []);
    } catch (err) {
      console.log("Error deleting project:", err);
    }
  }
  const sortedContent = [...projectContent].sort((a, b) => b.id - a.id);
  const project = projects.find((obj) => obj.id === fetchId);

  if (loadingProjects) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="flex items-center justify-center min-h-screen text-xl text-(--color-font-secondary)">
          Loading...
        </h1>
      </div>
    );
  }


  return (
    <div className="md:mx-23">
      <div className="flex items-center justify-end">
        <Funding />
      </div>
      <ContentSelector projectId={fetchId} />
      {sortedContent.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-xl text-(--color-font-secondary)">
          No content yet
        </div>
      ) : (
        sortedContent.map((cont) => (
          <ContentCard
            key={cont.id}
            cont={cont}
            onDelete={handleDelete}
            projectId={fetchId}
          />
        ))
      )}
    </div>
  );
}
