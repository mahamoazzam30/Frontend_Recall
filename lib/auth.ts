const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

// Auth token is stored as an httpOnly cookie set by the backend on login,
// so client JS never touches the raw JWT — and can't clear it directly
// either. Logging out means asking the backend to delete the cookie.

export function redirectToLogin(): void {
  if (typeof window === "undefined") return;
  window.location.href = "/login";
}

export async function logout(): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, { method: "POST", credentials: "include" });
}
