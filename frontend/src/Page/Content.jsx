import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getContent, deleteContent } from "../API/content";
import { ContContext } from "../Context/contentContext";
import { ProjectsContext } from "../Context/projectContext";
import { Circle } from "lucide-react";
import ContentSelector from "../Components/Buttons/ContentSelector";
import ContentCard from "../Components/Cards/ContentCard";
import Funding from "./Funding";
import CollaboratorForm from "../Components/Forms/CollaboratorForm";

export default function Content() {
  const { projectId } = useParams();
  const fetchId = Number(projectId);
  const [addContent, setAddContent] = useState(false);
  const [addCollaborator, setAddColaborator] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const { content, setContent } = useContext(ContContext);
  const { projects, loadingProjects } = useContext(ProjectsContext);
  const [activeFunding, setActiveFunding] = useState(null);

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

  useEffect(() => {
    if (project && ["admin", "editor"].includes(project?.role)) {
      setHasPermission(true);
    }
  }, [project?.role]);

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
    <div className="md:mx-23 mt-5">
      <div className="flex justify-between items-center mb-5">
        <h2 className="mx-5 md:mx-0 items-center justify-start border-b border-(--color-border-primary) text-2xl font-medium text-(--color-font-primary)">
          {project?.project_title}
        </h2>
        <div className="flex">
          {hasPermission ? (
            <div className="flex justify-start">
              <button
                onClick={() => setAddColaborator((prev) => !prev)}
                className="text-(--color-button) hover:text-(--color-button-font) border border-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Share
              </button>
            </div>
          ) : (
            ""
          )}
          {addCollaborator ? (
            <CollaboratorForm
              projectId={fetchId}
              setAddCollaborator={setAddColaborator}
              addCollaborator={addCollaborator}
            />
          ) : (
            ""
          )}
          <div className="flex items-center justify-end">
            <Funding setActiveFunding={setActiveFunding} />
          </div>
        </div>
      </div>
      <div className="ml-4 md:ml-0 flex items-center justify-start mb-5 ">
      <Circle
          className={`w-2 h-2 mx-2 ${
            activeFunding
              ? "fill-green-500 text-green-500"
              : "fill-red-500 text-red-500"
          }`}
        />
      <h2 className="mx-0 items-center justify-start  text-l font-medium text-(--color-font-primary)">
        {activeFunding ? activeFunding: ""} {activeFunding === 0 ? "No active Funding": activeFunding === 1 ? " active Funding" : "active Fundings"}
      </h2>
      </div>
      <div className="flex justify-between items-center border-b border-(--color-border-primary)">
        <h2 className="mx-5  md:mx-0 items-center justify-start text-lg font-medium text-(--color-font-primary)">
          Text
        </h2>
        {addContent ? (
          <div className="flex justify-center">
            <ContentSelector
              projectId={fetchId}
              setAddContent={setAddContent}
              addContent={addContent}
            />
          </div>
        ) : hasPermission ? (
          <div className="flex justify-start">
            <button
              onClick={() => setAddContent((prev) => !prev)}
              className=" mx-5 mb-3 md:mx-0 text-(--color-button) hover:text-(--color-button-font) border border-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Add Section
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
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
              project={project}
              hasPermission={hasPermission}
              setHasPermission={setHasPermission}
            />
          ))
        )}
      </div>

      <div>
        <h2 className="mb-5 mx-5 md:mx-0 items-center justify-start border-b border-(--color-border-primary) text-lg font-medium text-(--color-font-primary) pb-5">
          Videos
        </h2>
      </div>

      <div>
        <h2 className="mb-5 mx-5 md:mx-0 items-center justify-start border-b border-(--color-border-primary) text-lg font-medium text-(--color-font-primary) pb-5">
          Documents
        </h2>
      </div>
    </div>
  );
}
