import { useState, useEffect } from "react";
import { getProjects, putProject } from "../../API/project";
import TextInput from "../Inputs/TextInput";

export default function ProjectUpdateForm({
  userId,
  setProjects,
  projectId,
  projects,
}) {
  const project = projects.find((project) => project.id === Number(projectId));
  console.log(project);
  const [projectData, setProjectData] = useState({
    project_title: "",
    public: false,
    status: "",
  });

  useEffect(() => {
    if (project) {
      setProjectData({
        project_title: project.project_title,
        public: Boolean(project.public),
        status: project.status,
      });
    }
  }, [project]);
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
      await putProject(userId, projectData, projectId);
      const updated = await getProjects(userId);
      setProjects(updated.length ? [...updated] : []);
      setProjectData({ project_title: "", public: false, status: "" });
    } catch (err) {
      console.error("Error posting project:", err);
    }
  }

  return (
    <form
      className="max-w-md mx-auto border rounded-sm"
      onSubmit={handleSubmit}
    >
      Update Form
      <TextInput
        name={"project_title"}
        inputLabel={"Enter Project Title:"}
        data={projectData.project_title}
        handleChange={handleChange}
      />
      <TextInput
        name={"status"}
        inputLabel={"Enter Project Status:"}
        label={projectData.status}
        data={projectData.status}
        handleChange={handleChange}
      />
      <fieldset>
        <span>Set to Public?</span>
        <legend className="sr-only">Set to Public?</legend>

        <div className="flex items-center mb-4">
          <input
            id="public-true"
            type="radio"
            name="public"
            value="true"
            className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default "
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
            className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default "
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
      <button type="submit">Submit</button>
    </form>
  );
}
