// laboratorio/src/components/layouts/materials/MaterialsPage.tsx
"use client";

import { useState, useContext } from "react";
import Tabs from "@/components/tabs/Tabs";
import { UserContext } from "@/context/UserContext";
import InventoryAdminView from "./InventoryAdminView";
import InventoryTeacherView from "./InventoryTeacherView";
import AddMaterialModal from "./AddMaterialModal";
import {
  IconFlask2Filled,
  IconBox,
  IconDeviceDesktop,
  IconPuzzle,
} from "@tabler/icons-react";

export default function MaterialsPage() {
  const [viewType, setViewType] = useState<
    "reactivos" | "materiales" | "sensores" | "kits"
  >("reactivos");
  const { user } = useContext(UserContext);

  const tabs = [
    {
      id: "reactivos",
      label: "Reactivos",
      icon: <IconFlask2Filled className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
    },
    {
      id: "materiales",
      label: "Materiales",
      icon: <IconBox className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
    },
    {
      id: "sensores",
      label: "Sensores",
      icon: <IconDeviceDesktop className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
    },
    {
      id: "kits",
      label: "Kits",
      icon: <IconPuzzle className="text-neutral-700 dark:text-neutral-200 h-5 w-5" />,
    },
  ];

  return (
    <div className="p-4">
      {/* Header idéntico a Prácticas */}
      <div className="flex mb-7 w-full">
        <div className="flex justify-between items-center w-[90%]">
          <h1 className="text-2xl font-bold mb-2 font-sans">Inventario</h1>
        </div>
        <div className="flex flex-row right-0 space-x-2">
          {user?.rol === "administrador" && <AddMaterialModal />}
        </div>
      </div>

      {/* Tabs sin margen extra */}
      <Tabs
        tabs={tabs}
        activeTab={viewType}
        onTabChange={(id) =>
          setViewType(id as "reactivos" | "materiales" | "sensores" | "kits")
        }
      />

      {/* Tabla pegada justo debajo de las Tabs */}
      <div className="bg-bg-active-light dark:bg-bg-active-dark rounded-b-xl rounded-r-xl mr-3 px-5">
        {user?.rol === "administrador" ? (
          <InventoryAdminView viewType={viewType} />
        ) : (
          <InventoryTeacherView viewType={viewType} />
        )}
      </div>
    </div>
  );
}
