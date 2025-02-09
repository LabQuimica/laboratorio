"use client";
import { PracticasTable } from "./tablePractica";
import { useState } from 'react';
import TabsContainer from "@/components/tabs/TabsContainer";
import AddPractica from "./AddPractica";
import { IconRosetteDiscountCheckFilled, IconClockCheck } from "@tabler/icons-react";

const PracticasPage = () => {
  const [viewType, setViewType] = useState<'creadas' | 'asignadas'>('creadas');
  
  const tabs = [
    {
      id: 'creadas',
      label: 'Creadas',
      icon: <IconClockCheck />,
      content: <PracticasTable viewType="creadas" />
    },
    {
      id: 'asignadas',
      label: 'Asignadas',
      icon: <IconRosetteDiscountCheckFilled />,
      content: <PracticasTable viewType="asignadas" />
    }
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-2xl font-bold mb-2 font-sans">Prácticas</h1>
        <AddPractica />
      </div>

      <TabsContainer 
        tabs={tabs}
        activeTab={viewType}
        onTabChange={(tabId) => setViewType(tabId as 'creadas' | 'asignadas')}
      />
      
    </div>
  );
};

export default PracticasPage;