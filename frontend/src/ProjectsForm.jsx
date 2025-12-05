import { useState } from "react"

export default function ProjectsForm(props) {
    const [projectData, setProjectData] = useState({
        project_title: "", public: false, status: ""
    })
    function handleChange(e) {
        const { name, value, type } = e.target;

        setProjectData(prev => ({
            ...prev,
            [name]: type === "radio" ? (value === "true") : value,
        }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("fetch is firing")
        let url = `https://fund-collab.onrender.com/users/1/projects/`
        const data = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
        })
        if (response.ok) {
            props.fetchProjects()
        }
    }

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