const BASE_URL = "https://fund-collab.onrender.com/users";

export async function getProjects(userId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${userId}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load projects");
  const data = await res.json();
  return data;
}

export async function deleteProject(userId, projectId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${userId}/projects/${projectId}`, {
    method: "DELETE",
    Authorization: `Bearer ${token}`,
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return;
}

export async function postProject(userId, projectData) {
  const token = localStorage.getItem("token");
  const data = await fetch(`${BASE_URL}/${userId}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  if (!data.ok) throw new Error("Failed to create project");
  return data.json();
}

export async function putProject(userId, projectData, projectId) {
  const token = localStorage.getItem("token");
  const data = await fetch(`${BASE_URL}/${userId}/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
  if (!data.ok) throw new Error("Failed to update project");
  return data.json();
}
