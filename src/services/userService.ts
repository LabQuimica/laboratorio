import { jwtDecode } from "jwt-decode";
import { User, AddUserRequest} from "@/types/userTypes";

const URL = process.env.NEXT_PUBLIC_API_URL; 

export function getUserFromToken(token: string): User | null {
  try {
    const decoded: any = jwtDecode(token);
    const user: User = {
      id_user: decoded.id,
      name: decoded.name,
      email: decoded.email,
      password: "", // Password not available in token, set as empty string
      date: decoded.date || new Date().toISOString(),
      rol: decoded.rol,
      active: true,
      codigo: decoded.codigo,
      img: decoded.img,
    };
    return user;
  } catch (error) {
    return null;
  }
}

export async function addUser(newUser: AddUserRequest): Promise<User> {
  const response = await fetch(`http://${URL}/users/addUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al agregar usuario");
  }
  return response.json();
}

export async function deleteUser(userId: number): Promise<{ message: string }> {
  const response = await fetch(`http://${URL}/users/deleteUser/${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al eliminar usuario");
  }
  return response.json();
}

export async function updateUser(
  updatedUser: Partial<User> & { id_user: number }
): Promise<User> {
  const response = await fetch(`http://${URL}/users/updateUser/${updatedUser.id_user}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al actualizar usuario");
  }
  return response.json();
}

export async function updateUserAvatar(userId: number | undefined, avatar: string): Promise<{ img: string }> {
  const response = await fetch(`http://${URL}/users/updateUserAvatar?id=${userId}&avatar=${avatar}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al actualizar el avatar");
  }
  return response.json();
}
