
export default function Projects(props) {
    async function deleteElement(id) {
        const res = await fetch(`${props.url}${id}`, { method: "DELETE" })
        if (res.ok) {
            return ("Project deleted successfully")
        }
    }

    const data = props.projects
    const printable = data.map(project => (
        <div key={project.id}>
            <p>{project.project_title}</p>
            <button onClick={() => deleteElement(project.id)}>x</button>
        </div>
    ));


    return (
        <>
            {printable}
        </>
    )
}

