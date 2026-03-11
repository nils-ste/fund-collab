import { useContext, useState } from "react";
import { useParams } from "react-router";
import { getContent, deleteContent } from "../API/content";
import { ContContext } from "../Context/contentContext";
import { ProjectsContext } from "../Context/projectContext";
import ContentSelector from "../Components/Buttons/ContentSelector";
import ContentCard from "../Components/Cards/ContentCard";
import Funding from "./Funding";
import CollaboratorForm from "../Components/Forms/CollaboratorForm";

export default function Content() {
  const { projectId } = useParams();
  const fetchId = Number(projectId);
  const [addContent, setAddContent] = useState(false);
  const [addCollaborator, setAddColaborator] = useState(false)
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
      <div className="flex justify-end items-center">
      {addCollaborator? (<CollaboratorForm projectId={fetchId} setAddCollaborator={setAddColaborator}/>) : (<div className="flex justify-start">
        <button
          onClick={() => setAddColaborator((prev) => !prev)}
          className="mx-2 self-end text-(--color-button-font) bg-(--color-button) border border-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-blue-500"
        >
          + Collaborator
        </button>
        </div>)}
      <div className="flex items-center justify-end">
        <Funding />
      </div>
      </div>
      <h2 className="mb-5 mx-5 items-center justify-start border-b border-(--color-border-primary) text-xl font-medium text-(--color-font-primary) pb-5">
        {project.project_title}
      </h2>
      {addContent ? (
        <div className="flex justify-center">
        <ContentSelector projectId={fetchId} setAddContent={setAddContent} />
        </div>
      ) : (
        <div className="flex justify-start">
        <button
          onClick={() => setAddContent((prev) => !prev)}
          className="mx-5 self-end text-(--color-button-font) bg-(--color-button) border border-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-blue-500"
        >
          Add Section
        </button>
        </div>
      )}
      <div>
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

      <div>
        <h2 className="mb-5 mx-5 md:mx-0 items-center justify-start border-b border-(--color-border-primary) text-lg font-medium text-(--color-font-primary) pb-5">
          Videos
        </h2>
        <div id="videoContainer" className="flex justify-center items-center">
          <iframe
            id="vimeo-player"
            src="https://player.vimeo.com/video/76979871?h=3f2ab4cd91"
            className="border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div>
        <h2 className="mb-5 mx-5 md:mx-0 items-center justify-start border-b border-(--color-border-primary) text-lg font-medium text-(--color-font-primary) pb-5">
          Documents
        </h2>
      </div>
    </div>
  );
}
