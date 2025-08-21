const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// GET /api/editions?..
export async function fetchEditions({
  page,
  limit,
  search,
  status,
  sortBy,
  order,
} = {}) {
  const params = new URLSearchParams();
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);
  if (search) params.set("search", search);
  if (status !== undefined) params.set("status", status);
  if (sortBy) params.set("sortBy", sortBy);
  if (order) params.set("order", order);

  const res = await fetch(`${API}/editions?${params.toString()}`);
  if (!res.ok) throw new Error("failed to load editions");
  return res.json();
}

// POST /api/editions
export async function createEdition(payload) {
  const res = await fetch(`${API}/editions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("failed to create");
  return res.json();
}

// PUT /api/editions/:id
export async function updateEdition(id, payload) {
  const res = await fetch(`${API}/editions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("failed to update");
  return res.json();
}

// DELETE /api/editions:id
export async function deleteEdition(id) {
  const res = await fetch(`${API}/editions/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("failed to delete");
  return res.json();
}

// GET /api/editions/:id
export async function fetchEditionById(id) {
  if (!id) throw new Error("edition id is required");

  const res = await fetch(`${API}/editions/${id}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "failed to fetch edition");
  }

  return res.json();
}
