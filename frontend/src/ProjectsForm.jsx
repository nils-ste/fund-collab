import { useState } from "react"
import { getProjects, postProject } from "./API/project";

export default function ProjectsForm(props) {
    const [projectData, setProjectData] = useState({
        project_title: "", public: false, status: ""
    })
    function handleChange(e) {
        const { name, value, type } = e.target;

        setProjectData((prev) => ({
            ...prev,
            [name]: type === "radio" ? (value === "true") : value,
        }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        try 
        {
        await postProject(props.userId, projectData)
        const updated = await getProjects(props.userId)
        props.setProjects(updated)
        setProjectData({ project_title: "", public: false, status: "" });
        }
        catch (err) {
      console.error("Error posting project:", err);
    }}

    return (
        <form onSubmit={handleSubmit}>
            <label>Enter Project Title:
                <input
                    type="text"
                    name="project_title"
                    value={projectData.project_title}
                    onChange={handleChange}
                />
            </label>
            <label>Status:
                <input
                    type="text"
                    name="status"
                    value={projectData.status}
                    onChange={handleChange} />
            </label>
            <div>
                <span>Public:</span>

                <input
                    type="radio"
                    id="public-true"
                    name="public"
                    value="true"
                    checked={projectData.public === true}
                    onChange={handleChange}
                />
                <label htmlFor="public-true">True</label>

                <input
                    type="radio"
                    id="public-false"
                    name="public"
                    value="false"
                    checked={projectData.public === false}
                    onChange={handleChange}
                />
                <label htmlFor="public-false">False</label>
            </div>
            <button type="submit">Submit</button>

        </form>
    )

}