const BASE_URL = "https://fund-collab.onrender.com/projects";

export async function getFunding(projectId) {
  const res = await fetch(`${BASE_URL}/${projectId}/funding`);
  if (!res.ok) throw new Error("Failed to load funding");
  const data = await res.json();
  return data;
}

export async function deleteFunding(projectId, fundingId) {
  const res = await fetch(`${BASE_URL}/${projectId}/funding/${fundingId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return true;
}

export async function postFunding(projectId, fundingData) {
  const data = await fetch(`${BASE_URL}/${projectId}/funding`, {
    method: "POST",
    headers: {
      "funding-Type": "application/json",
    },
    body: JSON.stringify(fundingData),
  });
  if (!data.ok) throw new Error ("Failed to create funding");
  return data.json()
}
