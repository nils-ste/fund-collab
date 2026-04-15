import { getProjects, deleteProject } from "../API/project";
import { useState, useContext } from "react";
import { ProjectsContext } from "../Context/projectContext";
import { AuthContext } from "../Context/authContext";
import { useSearchParams } from "react-router";
import ProjectForm from "../Components/Forms/ProjectForm";
import ProjectCard from "../Components/Cards/ProjectCard";
import DeleteModal from "../Components/Buttons/DeleteModal";

export default function Projects() {
  const { projects, setProjects, loadingProjects } =
    useContext(ProjectsContext);
  const { userId } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const statusFilter = searchParams.get("status");

  const [showForm, setShowForm] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(userId, projectToDelete.id);
      const updated = await getProjects(userId);
      setProjects(updated.length ? [...updated] : []);
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const filteredProjects = statusFilter
    ? projects.filter(
        (project) =>
          project.status.toLowerCase() === statusFilter.toLowerCase(),
      )
    : projects;

  const sortedProjects = [...filteredProjects].sort((a, b) => b.id - a.id);

  if (loadingProjects) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-xl text-(--color-font-secondary)">Loading...</h1>
      </div>
    );
  }

  if (sortedProjects.length === 0) {
    return (
      <div className="mt-5">
        <div className="px-4 flex items-center justify-end md:mx-23">
          <button
            onClick={() => setShowForm(true)}
            className="text-(--color-button-font) bg-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          >
            + Project
          </button>
        </div>
        <div className="flex items-center justify-center min-h-screen text-xl text-(--color-font-secondary)">
          No projects yet
        </div>

        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-(--color-primary) p-6 rounded-lg w-full max-w-lg relative">
              <button
                className="absolute top-2 right-2 text-(--color-font-secondary) hover:text-(--color-font-primary) text-lg font-bold"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
              <ProjectForm
                userId={userId}
                setProjects={setProjects}
                closeModal={() => setShowForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="mt-5 px-4 flex items-center justify-end md:mx-23">
        <button
          onClick={() => setShowForm(true)}
          className="text-(--color-button-font) bg-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          + Project
        </button>
      </div>

      <div className="flex flex-wrap justify-center md:justify-start md:mx-30">
        {sortedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEditClick={setModalProject}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </div>

      {/* Edit Modal */}
      {modalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-(--color-primary) p-6 rounded-lg w-full max-w-lg relative">
            <button
              onClick={() => setModalProject(null)}
              className="absolute top-2 right-2 text-(--color-font-secondary) hover:text-(--color-font-primary) text-lg font-bold"
            >
              ✕
            </button>
            <ProjectForm
              userId={userId}
              projectId={modalProject.id}
              projects={projects}
              setProjects={setProjects}
              closeModal={() => setModalProject(null)}
            />
          </div>
        </div>
      )}

      {/* Project Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-(--color-primary) p-6 rounded-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-(--color-font-secondary) hover:text-(--color-font-primary) text-lg font-bold"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>
            <ProjectForm
              userId={userId}
              setProjects={setProjects}
              closeModal={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <DeleteModal
          setIsOpen={setDeleteModalOpen}
          title={projectToDelete?.project_title}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
}
