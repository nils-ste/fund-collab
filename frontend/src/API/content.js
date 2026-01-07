const BASE_URL = "https://fund-collab.onrender.com/projects";

export async function getContent(projectId) {
  const res = await fetch(`${BASE_URL}/${projectId}/content`);
  if (!res.ok) throw new Error("Failed to load content");
  const data = await res.json();
  return data;
}

export async function deleteContent(projectId, contentId) {
  const res = await fetch(`${BASE_URL}/${projectId}/content/${contentId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return true;
}

export async function postContent(projectId, contentData) {
  const data = await fetch(`${BASE_URL}/${projectId}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contentData),
  });
  if (!data.ok) throw new Error ("Failed to create content");
  return data.json()
}
