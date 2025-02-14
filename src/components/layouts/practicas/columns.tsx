import TruncatedCell from "@/components/table/TruncatedCell";
import { Practica } from "@/types/PracticaTypes";
import { ColumnDef } from "@tanstack/react-table";
import formatDateCell from "@/components/table/FormatedDate";
import NameBadge from "./NameBadge";
import { SortableHeader } from "@/components/table/SortableHeader";
import StatusPractica from "./StatusPractica";
import PracticaActions from "./AccionesPractica";
import { usePracticas } from "@/hooks/Practicas/usePractica";


export const docentecolumns: ColumnDef<Practica>[] = [
    {
    accessorKey: "id_practica",
    header: ({ column }) => (
      <SortableHeader column={column} title="id" className="justify-center" />
    ),
    size: 10,
    cell: ({ row }) => (
      <p className="text-center"> {row.getValue("id_practica")} </p>
    ),
  },
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "descripcion",
    header: "Descripcion",
    size: 60,
    cell: ({ row }) => <TruncatedCell text={row.getValue("descripcion")} />,
  },
  {
    accessorKey: "fecha_creacion",
    header: ({ column }) => (
      <SortableHeader column={column} title="Fecha Creación" className="justify-center" />
    ),
    cell: formatDateCell("fecha_creacion"),
  },
  {
    accessorKey: "fecha_modificacion",
    header: "Fecha Modificación",
    size: 40,
    cell: formatDateCell("fecha_modificacion"),
  },
  {
    accessorKey: "esta_asignada",
    header: "Estatus",
    size: 30,
    cell: ({ row }) => <StatusPractica value={row.getValue("esta_asignada")}/>,
  },
  {
    accessorKey: "acciones",
    header: "Acciones",
    size: 30,
    cell: ({ row }) => (
      <div className="items-center justify-center w-full">
        <PracticaActions idPractica={row.getValue("id_practica")}/>
      </div>
    ),
  }
];



export const asignadascolumns: ColumnDef<Practica>[] = [
    {
        accessorKey: "id_practica",
        header: ({ column }) => (
          <SortableHeader column={column} title="id" className="justify-center" />
        ),
        size: 10,
        cell: ({ row }) => (
          <p className="text-center"> {row.getValue("id_practica")} </p>
        ),
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
        size: 60,
        cell: ({ row }) => <TruncatedCell text={row.getValue("descripcion")} />,
    },
    {
      accessorKey: "fecha_creacion",
      header: "Fecha Creación",
      cell: formatDateCell("fecha_creacion"),
    },
    {
      accessorKey: "fecha_modificacion",
      header: "Fecha Modificación",
      cell: formatDateCell("fecha_modificacion"),
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