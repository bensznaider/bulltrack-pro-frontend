const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AuthResponse {
  access_token: string;
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log("Login error data:", errorData);
    throw new Error(errorData.message || `El ingreso falló con el estado ${response.status}`);
  }

  return response.json();
}

export async function signupUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.log("Signup error data:", errorData);
    throw new Error(errorData.message || `El registro falló con el estado ${response.status}`);
  }

  return response.json();
}
