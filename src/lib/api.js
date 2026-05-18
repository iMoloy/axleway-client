const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path, options = {}) {
  if (!apiUrl) {
    throw new Error("API URL is not configured.");
  }

  const response = await fetch(`${apiUrl}${path}`, {
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }

  return data;
}
