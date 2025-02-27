"use client";
import { PracticasTable } from "./tablePractica";
import { useState } from 'react';
import Tabs from "@/components/tabs/Tabs";
import AddPractica from "./AddPractica";
import { IconRosetteDiscountCheckFilled, IconClockCheck, IconArchiveOff } from "@tabler/icons-react";

const PracticasPage = () => {
  const [viewType, setViewType] = useState<'creadas' | 'asignadas' | 'archivadas'>('creadas');
  
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
        <div className="right-0">
            <AddPractica />
        </div>
      </div>

      {/* Pestañas para filtrado de prácticas */}
      <Tabs 
        tabs={tabs}
        activeTab={viewType}
        onTabChange={(tabId) => setViewType(tabId as 'creadas' | 'asignadas')}
      />

      {/* Tabla de prácticas envueltas en un fondo con estas clases de tailwind */}
      <div className={"bg-bg-active-light dark:bg-bg-active-dark rounded-b-xl rounded-r-xl mr-3 px-5"}>
        <PracticasTable viewType={viewType} />
      </div>
      
    </div>
  );
};

export default PracticasPage;