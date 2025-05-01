// laboratorio/src/components/layouts/users/SearchableUsers.tsx
"use client";

import { useState, useMemo, useContext, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { TableWithoutControls } from "@/components/table/TableWithoutControls";
import type { ColumnDef } from "@tanstack/react-table";
import { useUsers } from "@/hooks/Users/useUser";
import { UserContext } from "@/context/UserContext";
import type { User } from "@/types/user";
import AddUserModal from "./addUserModal";
import UserActions from "./UserActions";
// Importamos las columnas ya centradas
import { columns as userColumns } from "./columns";

export default function SearchableUsers() {
  const { data: users = [], isLoading, isError } = useUsers();
  const { user: me } = useContext(UserContext);
  const [q, setQ] = useState("");

  // Filtrado en tiempo real
  const filtered = useMemo(() => {
    const lq = q.trim().toLowerCase();
    if (!lq) return [];
    return users.filter((u) =>
      [u.name, u.email, u.codigo, u.rol]
        .some((f) => String(f ?? "").toLowerCase().includes(lq))
    );
  }, [users, q]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value);
  };

  // Quitamos la columna de acciones si no es administrador
  const visibleColumns: ColumnDef<User>[] = userColumns.filter(
    (col) => !(col.id === "actions" && me?.rol !== "administrador")
  );

  return (
    <div className="p-4">
      {/* Header al estilo de otras secciones */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-sans">Usuarios</h1>
        {me?.rol === "administrador" && <AddUserModal />}
      </div>

      {/* Input de búsqueda centrado */}
      <div className="flex justify-center mb-6">
        <Input
          placeholder="Buscar nombre, correo o boleta…"
          className="max-w-md border-gray-300 rounded-2xl"
          value={q}
          onChange={handleSearch}
        />
      </div>

      {isLoading && <p className="text-center">Cargando…</p>}
      {isError && <p className="text-center text-red-500">Error al cargar.</p>}

      {q && filtered.length === 0 && (
        <p className="text-center">No hay coincidencias.</p>
      )}

      {q && filtered.length > 0 && (
        <div className="bg-bg-active-light dark:bg-bg-active-dark rounded-b-xl rounded-r-xl px-5 py-4">
          <TableWithoutControls<User>
            data={filtered.map((u) => ({ ...u, active: Boolean(u.active) }))}
            columns={visibleColumns}
            isLoading={false}
            isError={false}
            orderBy="name"
          />
        </div>
      )}
    </div>
  );
}
