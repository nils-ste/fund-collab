const BASE_URL = "https://fund-collab.onrender.com/projects";

export async function getContent(projectId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${projectId}/content`,
    {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },}
  );
  if (!res.ok) throw new Error("Failed to load content");
  const data = await res.json();
  return data;
}

export async function deleteContent(projectId, contentId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${projectId}/content/${contentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return true;
}

export async function postContent(projectId, contentData) {
  const token = localStorage.getItem("token");
  const data = await fetch(`${BASE_URL}/${projectId}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(contentData),
  });
  if (!data.ok) throw new Error ("Failed to create content");
  return data.json()
}

export async function putContent(projectId, contentData, contentId) {
  const token = localStorage.getItem("token");
  const data = await fetch(`${BASE_URL}/${projectId}/content/${contentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(contentData),
  });
  if (!data.ok) throw new Error("Failed to update content");
  return data.json();
}
