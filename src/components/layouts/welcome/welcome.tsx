"use client";

import { Shortcuts } from "./shortcuts";
import ItemsAlertList from "./itemsAlertList";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";

// para profesores
const ProfesorDashboard = ({ user }: { user: any }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Prácticas asignadas</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Puedes ver tus prácticas asignadas en la sección de Prácticas.
          </p>
          <Button className="mt-4" variant="outline" onClick={() => window.location.href = "/menu/practica"}>
            Ver mis prácticas
          </Button>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Vales pendientes</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Revisa los vales pendientes y en progreso en la sección de Vales.
          </p>
          <Button className="mt-4" variant="outline" onClick={() => window.location.href = "/menu/vale"}>
            Gestionar vales
          </Button>
        </div>
      </div>
    </div>
  );
};

// para administradores
const AdminDashboard = ({ user }: { user: any }) => {
  return (
    <div className="space-y-6">
      <ItemsAlertList />
    </div>
  );
};

const WelcomePage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="pt-10 text-3xl font-bold mb-4 font-sans text-neutral-700 dark:text-neutral-200">
        QuimiLab - Hola {user?.name}
      </h1>

      <div className="pt-6 flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          {user?.rol === "administrador" ? (
            <AdminDashboard user={user} />
          ) : user?.rol === "profesor" ? (
            <ProfesorDashboard user={user} />
          ) : (
            <div>No tienes acceso a esta página.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;