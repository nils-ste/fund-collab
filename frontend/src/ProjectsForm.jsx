import { useState } from "react"

export default function ProjectsForm(props) {
    const [projectData, setProjectData] = useState({
        project_title: "", public: "", status: ""
    })
    function handleChange(e) {
        const { name, value} = e.target
        setProjectData(prev => ({ ...prev, [name]: value }))
        console.log(projectData)
    }
    async function handleSubmit(e) {
        e.preventDefault();
        console.log("fetch is firing")
        let url = `https://fund-collab.onrender.com/users/1/projects`
        const data = await fetch(url, { method: "POST", body: projectData, headers: {
                "Content-Type": "application/json",
            },})
        console.log(data)
    }

    return (
        <form onSubmit={()=>handleSubmit}>
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
                    onChange={handleChange}
                />
                <label for="true">True</label>

                <input
                    type="radio"
                    id="false"
                    name="public"
                    value="false"
                    onChange={handleChange}
                />
                <label for="false">False</label>
            </div>
            <button type="submit">Submit</button>

        </form>
    )

}