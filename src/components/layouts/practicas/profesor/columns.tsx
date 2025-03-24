import TruncatedCell from "@/components/table/TruncatedCell";
import { Practica } from "@/types/PracticaTypes";
import { ColumnDef } from "@tanstack/react-table";
import formatDateCell from "@/components/table/FormatedDate";
import { SortableHeader } from "@/components/table/SortableHeader";
import { usePracticas } from "@/hooks/Practicas/usePractica";
import { useState } from "react";
import StatusPractica from "../StatusPractica";
import PracticaActions from "../AccionesPractica";
import GroupBadge from "../GroupBadge";
import StatusPracticaAsignada from "./StatusPracticaAsignada";

// Columnas para el docente
// Columnas de practicas Creadas
export const creadascolumns: ColumnDef<Practica>[] = [
    {
      accessorKey: "id_practica",
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
      size: 70,
    },
    {
      accessorKey: "descripcion",
      header: "Descripcion",
    },
    {
      accessorKey: "fecha_creacion",
      size: 20,
      header: ({ column }) => (
        <SortableHeader column={column} title="Fecha Creación" className="justify-center" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.getValue("fecha_creacion")}
        </div>
      )
    },
    {
      accessorKey: "esta_asignada",
      header: "Estatus",
      size: 20,
      cell: ({ row }) => <StatusPractica value={row.getValue("esta_asignada")}/>,
    },
    {
      accessorKey: "acciones",
      header: "Acciones",
      size: 20,
      cell: ({ row }) => (
        <div className="items-center justify-center w-full">
          <PracticaActions idPractica={row.getValue("id_practica")} estaAsignada={row.getValue("esta_asignada")}/>
        </div>
      ),
    }
];


// Columnas de practicas Asignadas
export const asignadascolumns: ColumnDef<Practica>[] = [
    {
        accessorKey: "id_practica",
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "descripcion",
        header: "Descripcion",
        size: 350,
    },
    {
      accessorKey: "fecha_creacion",
      header: ({ column }) => (
        <SortableHeader column={column} title="Fecha Creación" className="justify-center" />
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          {row.getValue("fecha_creacion")}
        </div>
      )
    },
    {
      accessorKey: "status",
      header: "Estatus",
      size: 200,
      cell: ({ row }) => <StatusPracticaAsignada row={row}/>
    },
    {
      accessorKey: "grupo",
      header: "Grupo",
      size: 60,
      cell: ({ row }) => (
        <div className="flex flex-row row-span-2 gap-6 w-full">
          <GroupBadge grupo={row.getValue("grupo")} className="w-12 h-12" />
          <div className="flex flex-col">
            <p className="font-bold">{row.getValue("grupo")}</p>
            <p className="font-thin text-sm">{row.original.semestre}</p>
          </div>
        </div>
      ),
    },
];