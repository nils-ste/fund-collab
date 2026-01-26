import { useState } from "react";
import { getProjects, postProject, putProject } from "../../API/project";
import TextInput from "../Inputs/TextInput";

export default function ProjectForm({
  userId,
  setProjects,
  projectId = null,
  projects = [],
  closeModal,
}) {
  const project = projectId
    ? projects.find((p) => p.id === Number(projectId))
    : null;

  const [projectData, setProjectData] = useState(() => ({
    project_title: project?.project_title || "",
    public: project ? Boolean(project.public) : false,
    status: project?.status || "",
  }));

  function handleChange(e) {
    const { name, value, type } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value === "true" : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (projectId) {
        await putProject(userId, projectData, projectId);
      } else {
        await postProject(userId, projectData);
      }

      const updated = await getProjects(userId);
      setProjects(updated.length ? [...updated] : []);

      if (!projectId) {
        setProjectData({ project_title: "", public: false, status: "" });
      }

      if (closeModal) closeModal();
    } catch (err) {
      console.error("Error submitting project:", err);
    }
  }

  return (
    <form
      className="max-w-md mx-auto border rounded-sm p-4 bg-white dark:bg-gray-800 dark:text-white"
      onSubmit={handleSubmit}
    >
      <h3 className="text-lg font-bold mb-4">
        {projectId ? "Update Project" : "Create Project"}
      </h3>

      <TextInput
        name="project_title"
        inputLabel="Enter Project Title:"
        data={projectData.project_title}
        handleChange={handleChange}
      />

      <TextInput
        name="status"
        inputLabel="Enter Project Status:"
        data={projectData.status}
        handleChange={handleChange}
      />

      <fieldset>
        <span>Set to Public?</span>
        <legend className="sr-only">Set to Public?</legend>

        <div className="flex items-center mb-2">
          <input
            id="public-true"
            type="radio"
            name="public"
            value="true"
            className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle"
            checked={projectData.public === true}
            onChange={handleChange}
          />
          <label
            htmlFor="public-true"
            className="select-none ms-2 text-sm font-medium text-heading"
          >
            True
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            id="public-false"
            type="radio"
            name="public"
            value="false"
            className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle"
            checked={projectData.public === false}
            onChange={handleChange}
          />
          <label
            htmlFor="public-false"
            className="select-none ms-2 text-sm font-medium text-heading"
          >
            False
          </label>
        </div>
      </fieldset>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
      >
        {projectId ? "Update" : "Create"}
      </button>
    </form>
  );
}
