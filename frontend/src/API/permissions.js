const BASE_URL = "https://fund-collab.onrender.com/projects";

export async function getPermissions(projectId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${projectId}/permissions`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load permissions");
  const data = await res.json();
  return data;
}

export async function postPermissions(projectId, permissionsData) {
  const token = localStorage.getItem("token");
  const data = await fetch(`${BASE_URL}/${projectId}/permissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(permissionsData),
  });
  if (!data.ok) throw new Error("Failed to set new Collaborator");
  return data.json();
}
