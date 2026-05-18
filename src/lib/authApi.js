export async function syncAuthCookie(user) {
  if (!user) return false;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      })
    });

    return response.ok;
  } catch {
    return false;
  }
}
