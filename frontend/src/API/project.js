const BASE_URL = "https://fund-collab.onrender.com/users"

export async function getProjects(user_id) {
    const res = await fetch(`${BASE_URL}/${user_id}/projects`);
    if (!res.ok) throw new Error("Failed to load projects");
    const data = await res.json();
    return (data);
}

export async function deleteProject(user_id, project_id) {
    const res = await fetch(`${BASE_URL}/${user_id}/projects/${project_id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete project");
    return true
}

export async function postProject(user_id, projectData) {
    const data = await fetch(`${BASE_URL}/${user_id}/projects`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
    })
    if (!data.ok) throw new Error("Failed to create project");
    return data.json();
}