"use client";
import { useEffect, useState } from "react";

type User = {
  id_user: number;
  name: string;
  email: string;
  date: string;
  rol: "administrador" | "profesor" | "alumno";
  active: number;
};

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("../api/users") // ✅ Ahora llama a la API interna de Next.js
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
<div className="bg-light-bg dark:bg-dark-bg dark:text-white p-4">
  <h1 className="font-bold text-3xl my-6 ml-4">Usuarios registrados</h1>

  <div className="overflow-x-auto">
    <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-blue-600 text-white font-bold">
          <th className="py-2 px-4 text-left"><input type="checkbox" /></th>
          <th className="py-2 px-4 text-left">ID</th>
          <th className="py-2 px-4 text-left">Nombre</th>
          <th className="py-2 px-4 text-left">Email</th>
          <th className="py-2 px-4 text-left">Fecha</th>
          <th className="py-2 px-4 text-left">Rol</th>
          <th className="py-2 px-4 text-left">Activo</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user.id_user}
            className={`border-b ${
              index % 2 === 0 
                ? "bg-gray-100 dark:bg-gray-800" 
                : "bg-gray-200 dark:bg-gray-900"
            } text-black dark:text-white`}
          >
            <td className="py-2 px-4"><input type="checkbox" /></td>
            <td className="py-2 px-4">{user.id_user}</td>
            <td className="py-2 px-4">{user.name}</td>
            <td className="py-2 px-4">{user.email}</td>
            <td className="py-2 px-4">{user.date}</td>
            <td className="py-2 px-4">{user.rol}</td>
            <td className="py-2 px-4">{user.active ? "Sí" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}
