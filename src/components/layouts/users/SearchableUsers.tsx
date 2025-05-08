// src/components/layouts/users/UsersPage.tsx
"use client";

import { useState, useMemo, useContext, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { TableWithoutControls } from "@/components/table/TableWithoutControls";
import { useUsers } from "@/hooks/Users/useUser";
import { UserContext } from "@/context/UserContext";
import { columns } from "./columns";
import AddUserModal from "./addUserModal";
import type { User } from "@/types/user";

export default function UsersPage() {
  const { data: users = [] } = useUsers();
  const { user: me } = useContext(UserContext);
  const [q, setQ] = useState("");

  // Normalize active a boolean
  const normalized = useMemo(
    () => users.map((u) => ({ ...u, active: Boolean(u.active) })),
    [users]
  );

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return normalized.filter((u) =>
      [u.name, u.email, u.codigo, u.rol].some((f) =>
        String(f ?? "")
          .toLowerCase()
          .includes(term)
      )
    );
  }, [normalized, q]);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value);

  return (
    <div className="p-4 space-y-6">
      {/* Header: buscador y botón de agregar */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Buscar nombre, correo, boleta o rol…"
          className="max-w-md"
          value={q}
          onChange={onSearch}
          autoFocus
        />
        {me?.rol === "administrador" && <AddUserModal />}
      </div>

      {/* Si aún no hay término de búsqueda, nada más */}
      {!q && (
        <p className="text-center text-gray-500">
          Ingresa los datos del usuario a buscar...
        </p>
      )}

      {/* Si hay búsqueda pero no hay resultados */}
      {q && filtered.length === 0 && (
        <p className="text-center text-red-500">No se encontraron usuarios.</p>
      )}

      {/* Tabla sólo si hay resultados */}
      {q && filtered.length > 0 && (
        <div className="bg-bg-active-light dark:bg-bg-active-dark rounded-b-xl rounded-r-xl px-5 py-4">
          <TableWithoutControls<User>
            data={filtered}
            columns={columns}
            isLoading={false}
            isError={false}
            orderBy="name"
          />
        </div>
      )}
    </div>
  );
}
