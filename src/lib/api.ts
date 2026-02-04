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

export interface BullsListOptions {
  page?: number;
  limit?: number;
  search?: string;
  origen?: 'propio' | 'catalogo';
  uso?: 'vaquillona' | 'vaca';
  pelaje?: 'negro' | 'colorado';
  sort?: 'score_desc' | 'score_asc';
}

export interface Bull {
  id: number;
  caravana: string;
  nombre: string;
  uso: 'vaquillona' | 'vaca';
  origen: 'propio' | 'catalogo';
  pelaje: 'negro' | 'colorado';
  raza: string;
  edadMeses: number;
  caracteristicaDestacada: string | null;
  crecimiento: number;
  facilidadParto: number;
  reproduccion: number;
  moderacion: number;
  carcasa: number;
  bullScore: number;
  isFavorite?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BullsListResponse {
  data: Bull[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getBulls(
  options?: BullsListOptions,
  token?: string
): Promise<BullsListResponse> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const params = new URLSearchParams();
  
  if (options?.page !== undefined) params.append('page', options.page.toString());
  if (options?.limit !== undefined) params.append('limit', options.limit.toString());
  if (options?.search) params.append('search', options.search);
  if (options?.origen) params.append('origen', options.origen);
  if (options?.uso) params.append('uso', options.uso);
  if (options?.pelaje) params.append('pelaje', options.pelaje);
  if (options?.sort) params.append('sort', options.sort);

  const url = `${API_URL}/bulls${params.toString() ? `?${params.toString()}` : ''}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error al recuperar los toros: ${response.status}`);
  }
 const responseJson = await response.json();
  console.log("Bulls response:", responseJson);

  return responseJson;
}

export interface Favorite {
  id: number;
  userId: number;
  bullId: number;
}

export async function getFavorites(token: string): Promise<Favorite[]> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/favorites`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error al recuperar favoritos: ${response.status}`);
  }

  return response.json();
}

export async function toggleFavorite(bullId: number, token: string): Promise<Favorite> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_URL}/favorites/${bullId}`, {
    method: "POST",
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error al actualizar favorito: ${response.status}`);
  }

  return response.json();
}
