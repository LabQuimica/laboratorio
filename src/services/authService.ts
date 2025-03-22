import { Rol } from "@/types/user";
export interface LoginResponse {
  token: string;
  user: {
    id_user: number;
    name: string;
    email: string;
    date: string;
    rol: Rol;
    active: boolean;
    codigo: string;
  };
}

const API_BASE_URL = `http://${process.env.NEXT_PUBLIC_API_URL}`;

export async function login(email: string, password: string): Promise<LoginResponse> {
  const url = `${API_BASE_URL}/auth/login`;
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Error al iniciar sesión");
  }
  return data;
}
