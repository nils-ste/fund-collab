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
  const json = await data.json();
  return json
}

export async function deletePermission(projectId, permissionId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${projectId}/permissions/${permissionId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return true;
}

export async function putPermission(projectId, permissionId, role) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${BASE_URL}/${projectId}/permissions/${permissionId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({role}),
    }
  );

  if (!res.ok) throw new Error("Failed to update permission");

  return res.json();
}