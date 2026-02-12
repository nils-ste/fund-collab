import { getProjects, deleteProject } from "../API/project";
import { useState, useEffect, useContext } from "react";
import { ProjectsContext } from "../Context/projectContext";
import ProjectForm from "../Components/Forms/ProjectForm";
import ProjectCard from "../Components/Cards/ProjectCard";
import { AuthContext } from "../Context/authContext";

/**
 * Projects component
 * Fetches and displays an array of user projects.
 * Allows deletion and editing via modal.
 */

export default function Projects() {
  const { projects, setProjects } = useContext(ProjectsContext);
  const {userId} = useContext(AuthContext)

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

  const sortedProjects = [...projects].sort((a, b) => b.id - a.id);

  return (
    <div className="flex flex-wrap justify-center md:justify-start">
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
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative transform transition-transform duration-300 ease-out scale-95 animate-modalShow dark:bg-gray-800 dark:text-white">
            {/* Close Button */}
            <button
              onClick={() => closeModal()}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white text-lg font-bold"
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
