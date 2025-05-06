"use client";
import { PracticasTable } from "./tablePractica";
import { useState } from 'react';
import Tabs from "@/components/tabs/Tabs";
import AddPractica from "./AddPractica";
import { IconRosetteDiscountCheckFilled, IconClockCheck, IconArchiveOff } from "@tabler/icons-react";
import { DocentePracticasTable } from "./profesor/tableDocentePracticas";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { UpdatePracticaStatus } from "./UpdatePracticaStatus";
import InhabilitarTodoGrupo from "./actionsPractica/InhabilitarTodo";

const PracticasPage = () => {
  const [viewType, setViewType] = useState<'creadas' | 'asignadas' | 'archivadas'>('creadas');
  const { user } = useContext(UserContext);

  const tabs = [
    {
      id: 'creadas',
      label: 'Creadas',
      icon: <IconClockCheck />,
    },
    {
      id: 'asignadas',
      label: 'Asignadas',
      icon: <IconRosetteDiscountCheckFilled />,
    },
    {
      id: 'archivadas',
      'label': 'Archivadas',
      icon: <IconArchiveOff />,
    }
  ];

  return (
    <div className="p-4">
      <div className="flex mb-7 w-full">
        <div className="flex justify-between items-center w-[90%]">
          <h1 className="text-2xl font-bold mb-2 font-sans">Prácticas</h1>
        </div>

        {/* Boton para añadir práctica */}
        <div className="flex flex-row right-0 space-x-2">
            {/* Boton para agregar practica */}
            <AddPractica />
            {/* Boton para archivar todas las practicas de un grupo solo visible para el admin */}
            {user?.rol === "administrador" && (
              <InhabilitarTodoGrupo />
            )}
            {/* Boton para actualizar registros de practicas */}
            <div className="pr-4">
              <UpdatePracticaStatus />
            </div>
        </div>
      </div>

      {/* Pestañas para filtrado de prácticas */}
      <Tabs 
        tabs={tabs}
        activeTab={viewType}
        onTabChange={(tabId) => setViewType(tabId as 'creadas' | 'asignadas' | 'archivadas')}
      />

      {/* Tabla de prácticas envueltas en un fondo con estas clases de tailwind */}
      <div className={"bg-bg-active-light dark:bg-bg-active-dark rounded-b-xl rounded-r-xl mr-3 px-5"} key={user?.id_user}>
        {user?.rol === "administrador" ? (
          <PracticasTable viewType={viewType} />
        ) : user?.rol === "profesor" ? (
          <div>
            <DocentePracticasTable viewType={viewType} id_docente={user?.id_user} />
          </div>
        ) : (
          <p className="text-center p-4">No tienes permisos para ver esta sección.</p>
        )}
      </div>
      
    </div>
  );
};

export default PracticasPage;