const BASE_URL = "https://fund-collab.onrender.com/projects"

export async function getContent(project_id) {
    const res = await fetch(`${BASE_URL}/${project_id}/content`);
    if (!res.ok) throw new Error("Failed to load content");
    const data = await res.json();
    return (data)
}