// laboratorio/src/components/layouts/users/user.tsx
"use client";

import { useState, useContext, useMemo } from "react";
import { useUsers } from "@/hooks/Users/useUser";
import { UserContext } from "@/context/UserContext";
import UserActions from "./UserActions";
import { User } from "@/types/user";

export default function UsersPage() {
  const { data: users = [], isLoading, isError } = useUsers();
  const { user: currentUser } = useContext(UserContext);
  const [search, setSearch] = useState("");

  const normalizedUsers = users.map(u => ({ ...u, active: Boolean(u.active) }));
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return normalizedUsers.filter((u) => {
      const name   = (u.name   ?? "").toLowerCase();
      const email  = (u.email  ?? "").toLowerCase();
      const codigo = (u.codigo ?? "").toLowerCase();
      const rol    = (u.rol    ?? "").toLowerCase();
      return (
        name.includes(q) ||
        email.includes(q) ||
        codigo.includes(q) ||
        rol.includes(q)
      );
    });
  }, [normalizedUsers, search]);

  return (
    <div className="p-4">
      {/* Campo de búsqueda centrado */}
      <div className="flex justify-center my-8">
        <input
          type="text"
          placeholder="Buscar por nombre, correo, boleta o rol…"
          className="
        w-full max-w-md p-3 border rounded-lg shadow-sm
        bg-white text-black
        dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500
          "
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
      </div>

      {/* Estados */}
      {isLoading && (
        <div className="text-center text-gray-600 dark:text-gray-300">
          Cargando usuarios…
        </div>
      )}
      {isError && (
        <div className="text-center text-red-500 dark:text-red-400">
          Error al cargar usuarios.
        </div>
      )}

      {/* Si hay búsqueda pero no hay resultados */}
      {search && !isLoading && filtered.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400">
          No se encontraron registros.
        </div>
      )}

      {/* Tabla de resultados */}
      {search && filtered.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                  Nombre
                </th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                  Correo
                </th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                  Boleta
                </th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                  Rol
                </th>
                <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                  Estado
                </th>
                {currentUser?.rol === "administrador" && (
                  <th className="px-4 py-2 text-center text-gray-700 dark:text-gray-200">
                    Acciones
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {filtered.map((u: User) => (
                <tr
                  key={u.id_user}
                  className="
                    hover:bg-gray-50 dark:hover:bg-gray-800
                    text-gray-800 dark:text-gray-100
                  "
                >
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2">{u.codigo}</td>
                  <td className="px-4 py-2 capitalize">{u.rol}</td>
                  <td className="px-4 py-2">
                    {u.active ? "Activo" : "Inactivo"}
                  </td>
                  {currentUser?.rol === "administrador" && (
                    <td className="px-4 py-2 text-center">
                      <UserActions user={u} />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
