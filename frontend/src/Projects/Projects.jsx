import { getProjects, deleteProject } from "../API/project";
import { useState, useEffect } from "react";
import ProjectsForm from "./ProjectsForm";
import Content from "../Content/Content";

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
    let updated = projects
    try {
      await deleteProject(userId, projectId);
      updated.length > 1 ? updated = await getProjects(userId): updated = [];
      setProjects(updated);
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  }

  const printable = projects.map((project) => (
    <div key={project.id}>
      <p>{project.project_title}</p>
      <button onClick={() => handleDelete(userId, project.id)}>x</button>
      {/* <Content projectId={project.id} /> */}
    </div>
  ));

  return (
    <>
      {printable}
      <ProjectsForm
        getProjects={getProjects}
        userId={userId}
        setProjects={setProjects}
      />
    </>
  );
}
