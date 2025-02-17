"use client";
import {
  IconClockCheck,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react";
import { ValesAlumnoTable } from "./tableVale";
import { useState } from "react";
import Tabs from "@/components/tabs/Tabs";
import { EstadoVale } from "@/types/ValeTypes";

function ValeAlumno() {
  const [viewType, setViewType] = useState<EstadoVale>("pendiente");

  const tabs = [
    {
      id: "pendiente",
      label: "pendiente",
      icon: <IconClockCheck />,
    },
    {
      id: "progreso",
      label: "progreso",
      icon: <IconRosetteDiscountCheckFilled />,
    },
    {
      id: "completada",
      label: "completada",
      icon: <IconRosetteDiscountCheckFilled />,
    },
    {
      id: "cancelada",
      label: "cancelada",
      icon: <IconRosetteDiscountCheckFilled />,
    },
  ];

  return (
    <div className="p-4">
      {/* <div className="flex justify-between items-center mb-7">
        <h1 className="text-2xl font-bold mb-2 font-sans">Prácticas</h1>
      </div> */}

      {/* Boton para añadir práctica
    <div className="fixed top-20 right-12">
      <AddPractica />
    </div> */}

      <Tabs
        tabs={tabs}
        activeTab={viewType}
        onTabChange={(tabId) => setViewType(tabId as EstadoVale)}
      />

      <div
        className={
          "bg-bg-active-light dark:bg-bg-active-dark rounded-b-xl rounded-r-xl mr-3 px-5"
        }
      >
        <ValesAlumnoTable viewType={viewType} />
      </div>
    </div>
  );
}

export default ValeAlumno;
