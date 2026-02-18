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
      className="text-(--color-font-primary) max-w-md mx-auto p-3 bg-(--color-primary)"
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

      <div>
        <label
          htmlFor="status"
          className="block mb-2 text-sm text-(--color-font-primary)"
        >
          Project Status
        </label>

        <select
          id="status"
          name="status"
          defaultValue={project?.status || ""}
          onChange={handleChange}
          className="bg-(--color-primary) mb-5 border border-(--color-border-primary) text-(--color-font-primary) text-sm rounded-sm
                   focus:border-(--color-button) block w-full p-2.5"
        >
          <option value="" disabled>
            Select Project Status
          </option>
          <option value="Development">Development</option>
          <option value="Pre-Production">Pre-Production</option>
          <option value="Production">Production</option>
          <option value="Post-Production">Post-Production</option>
          <option value="Distribution">Distribution</option>
        </select>
      </div>

      <fieldset>
        <span className="block mb-2 text-sm">
          Set to Public?
        </span>
        <legend className="sr-only">Set to Public?</legend>

        <div className="flex items-center mb-2">
          <input
            id="public-true"
            type="radio"
            name="public"
            value="true"
            className="w-4 h-4 border-default-medium bg-(--color-primary) rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle"
            checked={projectData.public === true}
            onChange={handleChange}
          />
          <label
            htmlFor="public-true"
            className="select-none ms-2 text-sm text-heading"
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
            className="w-4 h-4 text-(--font-primary) border-default-medium bg-(--color-primary) rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle"
            checked={projectData.public === false}
            onChange={handleChange}
          />
          <label
            htmlFor="public-false"
            className="select-none ms-2 text-sm text-heading"
          >
            False
          </label>
        </div>
      </fieldset>

      <button
        type="submit"
        className="px-4 py-2 bg-(--color-button) text-(--color-primary) rounded hover:bg-(--color-button-hover) focus:outline-none"
      >
        {projectId ? "Update" : "Create"}
      </button>
    </form>
  );
}
