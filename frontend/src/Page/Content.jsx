import { useEffect, useContext, useState } from "react";
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

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="self-center mb-4 ml-4 text-(--color-primary) text-2xl font-semibold whitespace-nowrap dark:text-white">
          {loadingProjects ? "Loading..." : project.project_title}
        </h1>
        <Funding />
      </div>
      <ContentSelector projectId={fetchId} />
      {sortedContent.map((cont) => (
        <ContentCard
          key={cont.id}
          cont={cont}
          onDelete={handleDelete}
          projectId={fetchId}
        />
      ))}
      {/*<ContentForm
        projectId={fetchId}
        setContent={setContent}
        sectionType={"directors statement"}
      />*/}
    </>
  );
}
