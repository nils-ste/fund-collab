const BASE_URL = "https://fund-collab.onrender.com/projects";

export async function getFiles(projectId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${projectId}/files`,
    {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },}
  );
  if (!res.ok) throw new Error("Failed to load file");
  const data = await res.json();
  return data;
}

export async function getFile(projectId, fileId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${projectId}/files/${fileId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to get file");
  const data = await res.json();
  return data;
}

export async function deleteFile(projectId, fileId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${projectId}/files/${fileId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete file");
  return true;
}

export async function postFile(projectId, formData) {
  const token = localStorage.getItem("token");
  const data = await fetch(`${BASE_URL}/${projectId}/files/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  if (!data.ok) throw new Error ("Failed to upload file");
  return data.json()
}