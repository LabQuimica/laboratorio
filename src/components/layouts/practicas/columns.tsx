import TruncatedCell from "@/components/table/TruncatedCell";
import { Practica } from "@/types/PracticaTypes";
import { ColumnDef } from "@tanstack/react-table";
import formatDateCell from "@/components/table/FormatedDate";
import NameBadge from "./NameBadge";
import { SortableHeader } from "@/components/table/SortableHeader";
import StatusPractica from "./StatusPractica";
import PracticaActions from "./AccionesPractica";
import { usePracticas } from "@/hooks/Practicas/usePractica";
import { useState } from "react";

export const docentecolumns: ColumnDef<Practica>[] = [
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
    //cell: ({ row }) => <TruncatedCell text={row.getValue("descripcion")} />,
  },
  {
    accessorKey: "fecha_creacion",
    size: 20,
    header: ({ column }) => (
      <SortableHeader column={column} title="Fecha Creación" className="justify-center" />
    ),
    cell: formatDateCell("fecha_creacion"),
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



export const asignadascolumns: ColumnDef<Practica>[] = [
    {
        accessorKey: "id_practica",
    },
    {
      accessorKey: "docente",
      header: "Docente",
      size: 8,
      cell: ({ row }) => <NameBadge nombre={row.getValue("docente")} />,
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "descripcion",
        header: "Descripcion",
        //cell: ({ row }) => <TruncatedCell text={row.getValue("descripcion")} />,
    },
    {
      accessorKey: "fecha_creacion",
      header: "Fecha Creación",
      cell: formatDateCell("fecha_creacion"),
    },
    {
      accessorKey: "grupo",
      header: "Grupo",
      cell: ({ row }) => (
        <span className="text-sm">
          {row.getValue("grupo")} - {row.original.semestre}
        </span>
      ),
    },
  ];