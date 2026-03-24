const BASE_URL = "https://fund-collab.onrender.com/projects";

export async function getFunding(projectId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${projectId}/funding`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },});
  if (!res.ok) throw new Error("Failed to load funding");
  const data = await res.json();
  return data;
}

export async function deleteFunding(projectId, fundingId) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/${projectId}/funding/${fundingId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return true;
}

export async function postFunding(projectId, fundingData) {
  const token = localStorage.getItem("token");
  const data = await fetch(`${BASE_URL}/${projectId}/funding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fundingData),
  });
  if (!data.ok) throw new Error("Failed to create funding");
  return data.json();
}

export async function putFunding(projectId, fundingData, fundingId) {
  const token = localStorage.getItem("token");
  const data = await fetch(`${BASE_URL}/${projectId}/funding/${fundingId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fundingData),
  });
  if (!data.ok) throw new Error("Failed to update funding");
  return data.json();
}
