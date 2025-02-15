"use client";
import { PracticasTable } from "./tablePractica";
import { useState } from 'react';
import Tabs from "./Tabs";
import AddPractica from "./AddPractica";

const PracticasPage = () => {
  const [viewType, setViewType] = useState<'creadas' | 'asignadas'>('creadas');
  
  return (
    <div className="p-4">
        {/* Header para título y otros botones */}
        <div className="flex justify-between items-center mb-7">
            <h1 className="text-2xl font-bold mb-2 font-sans">Prácticas</h1>

            {/* Boton para añadir practica */}
            <AddPractica />
        </div>

        {/* Pestañas para practicas creadas o asignadad */}
        <Tabs viewType={viewType} setViewType={setViewType} />

        {/* Seccion de tabla */}
        <div className="bg-bg-active-light dark:bg-bg-active-dark rounded-b-xl rounded-r-xl mr-3 pr-5 pt-5 pl-5">
            <PracticasTable viewType={viewType} />
        </div>
        
    </div>
  );
};
export default PracticasPage;
