import { apiFetch } from "./api";

export async function syncAuthCookie(user) {
  if (!user) return false;

  try {
    await apiFetch("/auth/token", {
      method: "POST",
      body: JSON.stringify({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      })
    });

    return true;
  } catch {
    return false;
  }
}
