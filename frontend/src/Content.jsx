import { useState, useEffect } from "react"
import { getContent } from "./API/content"

export default function Content() {
    const [content, setContent] = useState()
    let project_id = 1

    useEffect(() => {
        async function fetchContent() {
            try {
                const data = await getContent(project_id)
                setContent(data)
            }
            catch {
                console.log("Error")
            }
        }
        fetchContent()
    }, [])

}