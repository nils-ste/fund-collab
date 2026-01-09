import { getProjects, deleteProject } from "../API/project";
import { useState, useEffect } from "react";
import ProjectsForm from "../Components/Forms/ProjectsForm";
import ProjectUpdateForm from "../Components/Forms/ProjectUpdateForm";

export default function Projects({ userId }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects(userId);
        setProjects(data);
      } catch {
        console.log("Error");
      }
    }
    fetchProjects();
  }, [userId]);

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
  const [viewToggle, setViewToggle] = useState(null)

  function updateFormToggle(projectId) {
    setViewToggle(prev => (prev === projectId ? null : projectId))
  }

  const printable = projects.map((project) => (
    <div key={project.id}>
      <p>{project.project_title}</p>
      <button onClick={() => handleDelete(userId, project.id)}>x</button>
      <button onClick={() => updateFormToggle(project.id)}>?</button>
      {viewToggle === project.id ? <ProjectUpdateForm userId={userId} setProjects={setProjects} projectId={project.id} projects={projects}/>: ""}
    </div>
  ));

  return (
    <>
      {printable}
      <ProjectsForm userId={userId} setProjects={setProjects} />
    </>
  );
}
