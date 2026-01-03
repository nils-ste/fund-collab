import { useState, useEffect } from "react"
import { getContent } from "./API/content"

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

    const printable = content.map(cont => (
        <div key={cont.id}>
            <p>{cont.text_box}</p>
        </div>
    )
    )

    return(
        <>
        {printable}
        </>
    )

}