"use client";
import {
  IconHourglassLow,
  IconSwitch2,
  IconCircleDashedCheck,
  IconSkull,
  IconCircleDashedX,
} from "@tabler/icons-react";
import { ValesAlumnoTable } from "./TableVale";
import { useState } from "react";
import Tabs from "@/components/tabs/Tabs";
import { EstadoVale } from "@/types/ValeTypes";

function ValeAlumno() {
  const [viewType, setViewType] = useState<EstadoVale>("pendiente");

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
    {
      id: "incompleto",
      label: "Incompleto",
      icon: <IconCircleDashedX />,
    },
  ];

  return (
    <div className="p-4">
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
