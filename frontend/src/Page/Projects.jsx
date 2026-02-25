import { getProjects, deleteProject } from "../API/project";
import { useState, useContext } from "react";
import { ProjectsContext } from "../Context/projectContext";
import ProjectForm from "../Components/Forms/ProjectForm";
import ProjectCard from "../Components/Cards/ProjectCard";
import { AuthContext } from "../Context/authContext";
import { useSearchParams } from "react-router";

/**
 * Projects component
 * Fetches and displays an array of user projects.
 * Allows deletion and editing via modal.
 */

export default function Projects() {
  const { projects, setProjects, loadingProjects } = useContext(ProjectsContext);
  const { userId } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status");

  async function handleDelete(userId, projectId) {
    try {
      await deleteProject(userId, projectId);
      const updated = await getProjects(userId);
      setProjects(updated.length ? [...updated] : []);
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  }

  /* logic for conditional rendering of the update component. perhaps better as seperate component or headless component.*/
  const [modalProject, setModalProject] = useState(null);

  function closeModal() {
    setModalProject(null);
  }

  const filteredProjects = statusFilter ? projects.filter(project => project.status.toLowerCase() === statusFilter.toLowerCase()) : projects;
  console.log(filteredProjects)

  const sortedProjects = [...filteredProjects].sort((a, b) => b.id - a.id);

  if (loadingProjects) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="flex items-center justify-center min-h-screen text-xl text-(--color-font-secondary)">
        Loading...
      </h1>
    </div>
  );
}

if (sortedProjects.length === 0) {
  return (
    <div className="flex items-center justify-center min-h-screen text-xl text-(--color-font-secondary)">
      No projects yet
    </div>
  );
}

  return (
    <div className="flex flex-wrap justify-center md:justify-start md:mx-30">
      {sortedProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          userId={userId}
          onDelete={handleDelete}
          setModalProject={setModalProject}
        />
      ))}
      {modalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 transition-opacity duration-300 ease-out">
          <div className="bg-(--color-primary) p-6 rounded-lg w-full max-w-lg relative transform transition-transform duration-300 ease-out scale-95 animate-modalShow">
            {/* Close Button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-2 right-2 text-(--color-font-secondary) hover:text-(--color-font-primary) text-lg font-bold"
            >
              ✕
            </button>

            {/* Update Form */}
            <ProjectForm
              userId={userId}
              projectId={modalProject.id}
              projects={projects}
              setProjects={setProjects}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
