import { SortableHeader } from "@/components/table/SortableHeader";
import TruncatedCell from "@/components/table/TruncatedCell";
import { Vale } from "@/types/ValeTypes";
import { ColumnDef } from "@tanstack/react-table";
import ObservacionesVale from "../observacionesVale";
import { ActionValeAlumno } from "./ActionsVale";
import StatusValeAlumno from "./status/Status.vale.alumno";

export const columsAlumnoVale: ColumnDef<Vale>[] = [
  {
    accessorKey: "id_vale",
  },
  {
    accessorKey: "alumno",
    header: ({ column }) => <SortableHeader column={column} title="ALUMNO" />,
    size: 30,
  },
  {
    accessorKey: "nombre",
    header: "Materia",
    size: 50,
    cell: ({ row }) => <TruncatedCell text={row.getValue("nombre")} />,
  },
  {
    accessorKey: "semestre",
    header: "Semestre",
    size: 20,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <p className=" uppercase text-sm text-center leading-none">
          {row.getValue("semestre")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "estado_vale",
    header: "Estatus",
    size: 150,
    cell: ({ row }) => <StatusValeAlumno row={row} tableType="ValeAlumno" />,
  },
  {
    accessorKey: "observaciones_vale",
    header: "Observaciones",
    cell: ({ row }) => <ObservacionesVale row={row} tableType="ValeAlumno" />,
  },
  {
    accessorKey: "fecha_solicitada",
    header: ({ column }) => (
      <SortableHeader
        column={column}
        title="Fecha Solicitada"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("fecha_solicitada")}</div>
    ),
  },
  {
    accessorKey: "profesor",
    header: "Profesor",
    size: 50,
  },
  {
    accessorKey: "nombre_practica",
    header: "Nombre Práctica",
    size: 200,
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    size: 10,
    cell: ({ row }) => <ActionValeAlumno id_vale={row.getValue("id_vale")} />,
  },
];
