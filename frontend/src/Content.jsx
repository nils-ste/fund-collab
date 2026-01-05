import { useState, useEffect } from "react"
import { getContent, deleteContent } from "./API/content"

export default function Content() {
    const [content, setContent] = useState([])
    let projectId = 1

    useEffect(() => {
        async function fetchContent() {
            try {
                const data = await getContent(projectId)
                setContent(data)
            }
            catch {
                console.log("Error")
            }
        }
        fetchContent()
    }, [])

    async function handleDelete(projectId, contentId) {
        try {
            await deleteContent(projectId, contentId);
            const updated = await getContent(projectId);
            setContent(updated);
        }
        catch (err) {
            console.log("Error deleting project:", err);
        }

    }

    const printable = content.map(cont => (
        <div key={cont.id}>
            <p>{cont.text_box}</p>
            <button onClick={() => handleDelete(projectId, cont.id) }>x</button>
        </div>
    )
    )

    return (
        <>
            {printable}
        </>
    )

}