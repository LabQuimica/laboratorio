<<<<<<< HEAD
// import { jwtDecode } from "jwt-decode";
// import { User } from "@/types/user";

// export function getUserFromToken(token: string): User | null {
//   try {
//     const decoded: any = jwtDecode(token);
//     const user: User = {
//       id_user: decoded.id,
//       name: decoded.name,
//       email: decoded.email,
//       date: decoded.date || new Date().toISOString(),
//       rol: decoded.rol,
//       active: true,
//       codigo: decoded.codigo,
//     };
//     return user;
//   } catch (error) {
//     return null;
//   }
// }

// export interface AddUserRequest {
//   name: string;
//   email: string;
//   password: string;
//   rol: "administrador" | "profesor" | "alumno";
//   codigo: string;
// }

// export async function addUser(newUser: AddUserRequest): Promise<User> {
//   const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/users/addUser`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newUser),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.error || "Error al agregar usuario");
//   }
//   return response.json();
// }

// export async function deleteUser(userId: number): Promise<{ message: string }> {
//   const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/users/deleteUser/${userId}`, {
//     method: "DELETE",
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.error || "Error al eliminar usuario");
//   }
//   return response.json();
// }

// export async function updateUser(
//   updatedUser: Partial<User> & { id_user: number }
// ): Promise<User> {
//   const response = await fetch(
//     `http://${process.env.NEXT_PUBLIC_API_URL}/users/updateUser/${updatedUser.id_user}`,
//     {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedUser),
//     }
//   );
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.error || "Error al actualizar usuario");
//   }
//   return response.json();
// }

=======
>>>>>>> 6425d9216ee23171113e4ab5de06ee00eeb56fae
import { jwtDecode } from "jwt-decode";
import { User } from "@/types/user";

export function getUserFromToken(token: string): User | null {
  try {
    const decoded: any = jwtDecode(token);
    const user: User = {
      id_user: decoded.id,
      name: decoded.name,
      email: decoded.email,
      date: decoded.date || new Date().toISOString(),
      rol: decoded.rol,
      active: true,
      codigo: decoded.codigo,
    };
    return user;
  } catch (error) {
    return null;
  }
}

export interface AddUserRequest {
  name: string;
  email: string;
  password: string;
  rol: "administrador" | "profesor" | "alumno";
  codigo: string;
}

export async function addUser(newUser: AddUserRequest): Promise<User> {
  const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/users/addUser`, {
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
  const response = await fetch(`http://${process.env.NEXT_PUBLIC_API_URL}/users/deleteUser/${userId}`, {
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
  const response = await fetch(
    `http://${process.env.NEXT_PUBLIC_API_URL}/users/updateUser/${updatedUser.id_user}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Error al actualizar usuario");
  }
  return response.json();
}
