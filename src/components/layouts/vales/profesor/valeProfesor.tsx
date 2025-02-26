"use client";
import {
  IconHourglassLow,
  IconSwitch2,
  IconCircleDashedCheck,
  IconSkull,
} from "@tabler/icons-react";
import { useState } from "react";
import Tabs from "@/components/tabs/Tabs";
import { EstadoValeProfesor } from "@/types/ValeTypes";
import { ValesProfesorTable } from "./ValesProfesorTable";

function ValeProfesor() {
  const [viewType, setViewType] = useState<EstadoValeProfesor>("pendiente");

  const tabs = [
    {
      id: "pendiente",
      label: "Pendiente",
      icon: <IconHourglassLow />,
    },
    {
      id: "progreso",
      label: "En progreso",
      icon: <IconSwitch2 />,
    },
    {
      id: "completada",
      label: "Completada",
      icon: <IconCircleDashedCheck />,
    },
    {
      id: "cancelada",
      label: "Cancelada",
      icon: <IconSkull />,
    },
  ];

  return (
    <div className="p-4">
      <Tabs
        tabs={tabs}
        activeTab={viewType}
        onTabChange={(tabId) => setViewType(tabId as EstadoValeProfesor)}
      />

      <div
        className={
          "bg-bg-active-light dark:bg-bg-active-dark rounded-b-xl rounded-r-xl mr-3 px-5"
        }
      >
        <ValesProfesorTable viewType={viewType} />
      </div>
    </div>
  );
}

export default ValeProfesor;
