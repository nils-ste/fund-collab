import { useState } from "react"

export default function ProjectsForm(props) {
    const [projectData, setProjectData] = useState({
        project_title: "", status: "", public: undefined
    })
    function handleChange(e) {
        const { name, value, type } = e.target
        setProjectData(prev => ({ ...prev, [name]: value }))
    }
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("fetch is firing")
        let url = `http://127.0.0.1:5000//users/${props.userId}/projects`
        const data = await fetch(url, { method: "POST", body: JSON.stringify(projectData), headers: {
                "Content-Type": "application/json",
            },})
        console.log(data)
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
                    id="true"
                    name="public"
                    value="true"
                    checked={projectData.public === true}
                    onChange={handleChange}
                />
                <label htmlFor="true">True</label>

                <input
                    type="radio"
                    id="false"
                    name="public"
                    value="false"
                    checked={projectData.public === false}
                    onChange={handleChange}
                />
                <label htmlFor="false">False</label>
            </div>
            <button type="submit">Submit</button>

        </form>
    )

}