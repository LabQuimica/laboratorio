"use client";
import { PracticasTable } from "./tablePractica";
import { useState } from 'react';
import Tabs from "@/components/tabs/Tabs";
import AddPractica from "./AddPractica";
import { IconRosetteDiscountCheckFilled, IconClockCheck } from "@tabler/icons-react";

const PracticasPage = () => {
  const [viewType, setViewType] = useState<'creadas' | 'asignadas'>('creadas');
  
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
    }
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-2xl font-bold mb-2 font-sans">Prácticas</h1>
      </div>

      {/* Boton para añadir práctica */}
      <div className="fixed top-20 right-12">
        <AddPractica />
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