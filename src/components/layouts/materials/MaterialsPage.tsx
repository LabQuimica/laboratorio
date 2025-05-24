// laboratorio/src/components/layouts/materials/MaterialsPage.tsx
"use client";

import { useState, useContext } from "react";
import Tabs from "@/components/tabs/Tabs";
import { UserContext } from "@/context/UserContext";
import AddMaterialModal from "./AddMaterialModal";
import InventoryAdminView from "./InventoryAdminView";
import InventoryTeacherView from "./InventoryTeacherView";
import {
  IconFlask2Filled,
  IconBox,
  IconDeviceDesktop,
  IconPuzzle,
  IconDeviceLaptop,
  IconBrandAirtable,
} from "@tabler/icons-react";

export default function MaterialsPage() {
  const [viewType, setViewType] = useState<
    "reactivos" | "materiales" | "sensores" | "kits" | "equipos"
  >("reactivos");
  const { user } = useContext(UserContext);

  const tabs = [
    { id: "reactivos", label: "Reactivos", icon: <IconFlask2Filled /> },
    { id: "materiales",  label: "Materiales",  icon: <IconBox />            },
    { id: "sensores",    label: "Sensores",    icon: <IconDeviceDesktop /> },
    { id: "kits",        label: "Kits",        icon: <IconPuzzle />         },
    { id: "equipos",     label: "Equipos",     icon: <IconDeviceLaptop />   },
  ];

  return (
    <div className="p-4">
      {/* Header y botón */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventario</h1>
        {user?.rol === "administrador" && <AddMaterialModal />}
      </div>

      {/* Pestañas */}
      <Tabs
        tabs={tabs}
        activeTab={viewType}
        onTabChange={(id) => setViewType(id as any)}
      />

      {/* Contenido según rol */}
      <div className="bg-bg-active-light dark:bg-bg-active-dark rounded-b-xl rounded-r-xl mr-3 px-5 py-4">
        {user?.rol === "administrador" ? (
          <InventoryAdminView viewType={viewType} />
        ) : (
          <InventoryTeacherView viewType={viewType} />
        )}
      </div>
    </div>
  );
}
