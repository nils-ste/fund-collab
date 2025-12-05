import { useState, useEffect } from "react"

export default function Projects(props) {
    const printable = props.projects.map(project => (
        <p key={project.id}>{project.project_title}</p>
    ));


    return (
        <>
            {printable}
        </>
    )
}

