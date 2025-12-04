import { useState, useEffect } from "react"

export default function Projects(props) {
    const [projectData, setProjectData] = useState([])
    useEffect(() => {
        let url = `https://fund-collab.onrender.com/users/${props.userId}/projects`
        fetch(url, )
            .then(res => res.json())
            .then(data => setProjectData(data))
            .catch(error => {
                console.log("Error:", error);
            });
    }
        , [props.userId]
    )

    const printable = projectData.map(project => (
  <p key={project.id}>{project.project_title}</p>
));


    return (
        <>
            {printable}
        </>
    )
}

